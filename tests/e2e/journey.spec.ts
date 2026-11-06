// The journey and the case windows, as a visitor uses them.
import { expect, test, type Page } from '@playwright/test';

// The journey animates into place, and headless 3D is software-rendered: allow it time to arrive.
const ARRIVE = { timeout: 30_000 };

const errors = (page: Page) => {
  const list: string[] = [];
  page.on('pageerror', (e) => list.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') list.push(m.text());
  });
  return list;
};

test('the cockpit opens the map, the map opens a stop', async ({ page }) => {
  const seen = errors(page);
  await page.goto('/');
  await expect(page.locator('#opening-title')).toBeVisible();
  await page.locator('#open-map').click();
  await expect(page).toHaveURL('/map');
  await expect(page.locator('#map-title')).toBeVisible(ARRIVE);
  await page.locator('#brief-action').click();
  await expect(page).toHaveURL(/\/experience$/);
  await expect(page.locator('#chapter-title')).not.toBeEmpty(ARRIVE);
  expect(seen).toEqual([]);
});

test('a case window: steps, tour, inspection, sources, close', async ({ page }) => {
  const seen = errors(page);
  await page.goto('/experience/rail');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible(ARRIVE);
  await expect(dialog.getByRole('heading', { name: 'Rail Capacity Consultation Officer' })).toBeVisible();

  const steps = dialog.locator('.case-stages button');
  await expect(steps).toHaveCount(4);
  await expect(steps.nth(0)).toHaveAttribute('aria-pressed', 'true');

  // The tour lights one element at a time.
  await expect(dialog.locator('[data-inspect].is-toured')).toHaveCount(1, { timeout: 5000 });

  await steps.nth(1).click();
  await expect(steps.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(dialog.getByText('A portfolio of freight customers.')).toBeVisible();

  // Clicking an element explains it.
  await dialog.locator('[data-inspect="defend"]').click();
  await expect(dialog.locator('.scene-inspection')).toContainText(
    'Before the entity granting the agreements',
  );

  await expect(dialog.getByRole('link', { name: /Map sources/ })).toHaveAttribute(
    'href',
    '/assets/geography/README.md',
  );

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/\/experience$/);
  expect(seen).toEqual([]);
});

test('old addresses move to the new ones', async ({ page }) => {
  await page.goto('/mission-journey.html#earth?case=rail');
  await expect(page).toHaveURL(/\/experience\/rail$/);
  await expect(page.getByRole('dialog')).toBeVisible(ARRIVE);
});

test('the contact page gives email, LinkedIn and GitHub', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('main a[href^="mailto:stephane.sing@gmail.com"]')).toBeVisible();
  await expect(page.locator('main a[href="https://www.linkedin.com/in/stephane-singery/"]')).toBeVisible();
  await expect(page.locator('main a[href="https://github.com/oneMoreSteph"]')).toBeVisible();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('a case page is still readable', async ({ page }) => {
    await page.goto('/experience/rail');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Rail Capacity Consultation Officer' }),
    ).toBeVisible();
    await expect(page.getByText('I obtained the schedules.')).toBeVisible();
  });
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  for (const path of ['/', '/contact', '/experience/rail']) {
    test(`${path} has no sideways scroll`, async ({ page }) => {
      await page.goto(path);
      await page.waitForTimeout(1500);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
