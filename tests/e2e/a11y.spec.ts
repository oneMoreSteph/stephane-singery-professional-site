// Accessibility: axe checks each kind of page against WCAG 2.2 A and AA.
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { builtPages } from './pages';

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function audit(page: Page) {
  // Fades and transitions must finish first: a half-faded element has a lower contrast than it will have.
  // The highlight tour starts a new fade every 2 s, so the wait is capped.
  await page
    .waitForFunction(
      () =>
        document
          .getAnimations()
          .every((a) => a.playState !== 'running' || a.effect?.getComputedTiming().iterations === Infinity),
      undefined,
      { timeout: 6000 },
    )
    .catch(() => {});
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  return violations.map(
    (v) =>
      `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length}× e.g. ${v.nodes[0].target.join(' ')} ${v.nodes[0].html.slice(0, 300)} ${v.nodes[0].failureSummary}`,
  );
}

const views: [string, string, (page: Page) => Promise<void>][] = [
  ['cockpit', '/', async (page) => void (await expect(page.locator('#opening-title')).toBeVisible())],
  [
    'map',
    '/map',
    async (page) => void (await expect(page.locator('#map-title')).toBeVisible({ timeout: 30_000 })),
  ],
  [
    'chapter',
    '/experience',
    async (page) => void (await expect(page.locator('#chapter-title')).not.toBeEmpty({ timeout: 30_000 })),
  ],
  [
    'case window',
    '/experience/rail',
    async (page) => void (await expect(page.getByRole('dialog')).toBeVisible({ timeout: 30_000 })),
  ],
  [
    'career timeline view',
    '/experience?view=track',
    async (page) => void (await expect(page.locator('.tv-panel')).toBeVisible({ timeout: 30_000 })),
  ],
  [
    'study orbits view',
    '/education?view=orbit',
    async (page) => void (await expect(page.locator('.tv-panel')).toBeVisible({ timeout: 30_000 })),
  ],
  ['how I build', '/how-i-build', async (page) => void (await expect(page.locator('h1')).toBeVisible())],
  ['courses', '/courses', async (page) => void (await expect(page.locator('h1')).toBeVisible())],
  [
    'NYC Taxi investigation',
    '/courses/nyc-taxi',
    async (page) => {
      await expect(page.locator('.taxi-case__visual')).toContainText('97,408', {
        timeout: 30_000,
      });
    },
  ],
  ['contact', '/contact', async (page) => void (await expect(page.locator('h1')).toBeVisible())],
  ['404', '/no-such-page', async (page) => void (await expect(page.locator('h1')).toBeVisible())],
];

for (const [name, path, ready] of views) {
  test(`${name} meets WCAG 2.2 AA`, async ({ page }) => {
    await page.goto(path);
    await ready(page);
    await page.waitForTimeout(1500);
    expect(await audit(page)).toEqual([]);
  });
}

// axe itself needs JavaScript, so the site's own scripts are blocked instead: the page shows its plain-text version.
test('the case page without the site scripts meets WCAG 2.2 AA', async ({ page }) => {
  await page.route(/\.js($|\?)/, (route) => route.abort());
  await page.goto('/experience/rail');
  await expect(page.locator('.page-text h1')).toBeVisible();
  expect(await audit(page)).toEqual([]);
});

// Every case window and "Why this destination?" page, each with its own drawing.
// Course project pages are full pages with their own test above, not journey windows.
const detailPages = builtPages
  .map((p) => p.path)
  .filter((p) => p.split('/').filter(Boolean).length === 2 && !p.startsWith('/courses/'));
for (const path of detailPages) {
  test(`${path} window meets WCAG 2.2 AA`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('#detail-overlay')).toBeVisible({ timeout: 30_000 });
    await page.waitForTimeout(1500);
    expect(await audit(page)).toEqual([]);
  });
}
