// Captures every view and every case step of a running site, for before/after comparison.
// Usage: node tests/capture.mjs <base-url> <out-dir> <legacy|new>
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const [base, out, mode = 'new'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const stops = {
  earth: ['vfli', 'rail', 'ligne-c', 'hubs', 'food-data', 'heetch', 'verisure'],
  iss: ['toyota', 'tour', 'food-deadline', 'signal'],
  sentinel: ['find-a-way', 'need-behind', 'data-system'],
  galileo: ['study-logistics', 'study-data', 'study-efrei'],
  juice: ['horizon', 'transfer'],
};
const slug = { earth: 'experience', iss: 'high-stakes', sentinel: 'difference', galileo: 'education', juice: 'european-space' };
const url = (stop, kase, view) => {
  if (mode === 'legacy') {
    if (stop === 'cockpit') return `${base}/mission-journey.html#cockpit`;
    if (stop === 'map') return `${base}/mission-journey.html#map`;
    const q = new URLSearchParams(); if (view) q.set('view', view); if (kase) q.set('case', kase);
    return `${base}/mission-journey.html#${stop}${q.size ? '?' + q : ''}`;
  }
  if (stop === 'cockpit') return `${base}/`;
  if (stop === 'map') return `${base}/map`;
  return `${base}/${slug[stop]}${kase ? '/' + kase : ''}${view ? '?view=' + view : ''}`;
};

const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
const errors = [];
const shot = async (name, target, after) => {
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`${name}: ${m.text()}`); });
  await page.goto(target, { waitUntil: 'load' });
  await page.waitForTimeout(4500);
  if (after) await after(page);
  await page.screenshot({ path: `${out}/${name}.png` });
  await page.close();
};

await shot('cockpit', url('cockpit'));
await shot('map', url('map'));
for (const stop of Object.keys(stops)) await shot(`chapter-${stop}`, url(stop));
await shot('view-track', url('earth', null, 'track'));
await shot('view-orbit', url('galileo', null, 'orbit'));
for (const [stop, cases] of Object.entries(stops)) {
  for (const kase of cases) {
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(`${kase}: ${e.message}`));
    await page.goto(url(stop, kase), { waitUntil: 'load' });
    await page.waitForTimeout(4500);
    const steps = await page.locator('.case-stages button').count();
    for (let i = 0; i < Math.max(steps, 1); i++) {
      if (steps) { await page.locator('.case-stages button').nth(i).click(); await page.waitForTimeout(900); }
      await page.screenshot({ path: `${out}/case-${kase}-${i + 1}.png` });
    }
    await page.close();
  }
}
await browser.close();
console.log(errors.length ? `ERRORS\n${errors.join('\n')}` : 'no page errors');
