// Every built page: reachable, titled, described, with readable text before any JavaScript runs.
import { expect, test } from '@playwright/test';
import { builtPages } from './pages';

const between = (html: string, re: RegExp) => html.match(re)?.[1]?.trim() ?? '';

test('the build has every page of the site', () => {
  expect(builtPages.length).toBeGreaterThanOrEqual(30);
});

test('each page has its own title and description', () => {
  const titles = new Map<string, string>();
  for (const { path, html } of builtPages) {
    const title = between(html, /<title>([^<]*)<\/title>/);
    expect(title, `${path} title`).not.toBe('');
    expect(titles.get(title), `${path} shares its title with ${titles.get(title)}`).toBeUndefined();
    titles.set(title, path);
    expect(between(html, /<meta name="description" content="([^"]*)"/), `${path} description`).not.toBe('');
    expect(html, `${path} language`).toContain('<html lang="en"');
  }
});

test('each page carries its text in the HTML', () => {
  for (const { path, html } of builtPages) {
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ');
    expect(text.split(' ').length, `${path} words`).toBeGreaterThan(60);
  }
});

for (const { path } of builtPages) {
  test(`serves ${path}`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
  });
}

test('unknown addresses get the 404 page, kept out of search results', async ({ page }) => {
  const response = await page.goto('/no-such-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This page does not exist.' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await page.getByRole('link', { name: 'Back to the cockpit' }).click();
  await expect(page).toHaveURL('/');
});

test('robots.txt allows the whole site', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain('Allow: /');
});

test('the sitemap, when published, lists every page', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  const declared = robots.match(/Sitemap: (\S+)/)?.[1];
  test.skip(!declared, 'No sitemap until site.url is set at publication');
  const xml = await (await request.get('/sitemap.xml')).text();
  const base = new URL(declared!).origin;
  for (const { path } of builtPages) expect(xml).toContain(`<loc>${base}${path}</loc>`);
});
