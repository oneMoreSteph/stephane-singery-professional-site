import { expect, test } from '@playwright/test';

test('the cockpit leads through Courses to the NYC Taxi case and back', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.locator('#cockpit').getByRole('link', { name: 'COURSES' }).click();
  await expect(page).toHaveURL(/\/courses\/?$/);
  // The cockpit locks scrolling; a page reached from it must scroll again.
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden');
  await expect(page.getByRole('heading', { name: 'Data Visualisation & BI' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'mathew.mano@gmail.com' })).toBeVisible();
  // Projects are collapsed by default: open the course's projects first.
  await expect(page.getByRole('link', { name: /Open the project/ })).toBeHidden();
  await page.locator('.course__projects-title').first().click();
  await page.mouse.wheel(0, 400);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.getByRole('link', { name: /Open the project/ }).click();
  await expect(page).toHaveURL(/\/courses\/nyc-taxi\/?$/);
  await expect(page.getByRole('heading', { name: /One day/ })).toBeVisible();
  await expect(page.locator('.taxi-steps button')).toHaveCount(9);
  await expect(page.locator('.taxi-case__visual')).toContainText('97,408');

  await page.getByRole('button', { name: /Hours/ }).click();
  await expect(page).toHaveURL(/#hours$/);
  const visual = page.locator('.taxi-case__visual');
  await expect(visual.locator('.taxi-plot.js-plotly-plot').first()).toBeVisible({ timeout: 30_000 });
  await expect(visual.locator('.taxi-plot').first()).toHaveAttribute(
    'aria-label',
    /Trips per covered minute/,
  );
  await visual.locator('.taxi-controls select').nth(1).selectOption('8');
  await expect(visual.locator('.taxi-readout').first()).toContainText('08:00');

  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/#map$/);
  await expect(visual.locator('.taxi-plot.js-plotly-plot').first()).toBeVisible({ timeout: 30_000 });

  await page.getByRole('link', { name: 'Data Visualisation & BI' }).click();
  await expect(page).toHaveURL(/\/courses\/?#data-visualisation-bi$/);
  await page.getByRole('link', { name: '← Cockpit' }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(errors).toEqual([]);
});

test.describe('NYC Taxi on a phone', () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  test('has no sideways scroll and keeps the steps usable', async ({ page }) => {
    await page.goto('/courses/nyc-taxi#duration');
    await expect(page.getByRole('heading', { name: /Same trip, twice the time/ })).toBeVisible();
    await page.getByRole('button', { name: /Next/ }).click();
    await expect(page).toHaveURL(/#weight$/);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
