// Runs after the build, on build/client:
// - 404.html: GitHub Pages serves it for unknown addresses; it is the SPA fallback, which renders the app's own 404 page.
// - sitemap.xml: every prerendered page that search engines may index, written like its canonical address (with a
//   trailing slash, as GitHub Pages serves folders). Its base address comes from the canonical tag,
//   which the pages carry once site.url is set (app/site.ts). Until then, no sitemap is written.
// - robots.txt: allows everything and points to the sitemap when there is one.
import { readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../build/client/', import.meta.url));

await rename(join(dir, '__spa-fallback.html'), join(dir, '404.html'));
console.log('404.html written');

/** Page addresses, from each folder's index.html, leaving out pages marked noindex. */
async function pages() {
  const found = [];
  for (const file of await readdir(dir, { recursive: true })) {
    if (file !== 'index.html' && !file.endsWith(`${sep}index.html`)) continue;
    const html = await readFile(join(dir, file), 'utf8');
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
    const folders = file.split(sep).slice(0, -1);
    found.push({ path: folders.length ? `/${folders.join('/')}/` : '/', html });
  }
  return found.sort((a, b) => (a.path < b.path ? -1 : 1));
}

const list = await pages();
const base = list
  .find((p) => p.path === '/')
  ?.html.match(/<link rel="canonical" href="(https?:\/\/[^"/]+)/)?.[1];

let robots = 'User-agent: *\nAllow: /\n';
if (base) {
  const urls = list.map((p) => `  <url><loc>${base}${p.path}</loc></url>`);
  await writeFile(
    join(dir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  );
  robots += `\nSitemap: ${base}/sitemap.xml\n`;
  console.log(`sitemap.xml written: ${list.length} pages`);
} else {
  await rm(join(dir, 'sitemap.xml'), { force: true });
  console.log('sitemap.xml skipped: set site.url in app/site.ts to publish one');
}
await writeFile(join(dir, 'robots.txt'), robots);
console.log('robots.txt written');
