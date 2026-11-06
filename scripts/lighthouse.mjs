// Lighthouse on key pages of the built site, phone and desktop, checked against the limits below.
// Usage: node scripts/lighthouse.mjs [--report]   (--report keeps the HTML reports in lighthouse-report/)
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PORT = 8904;
const PAGES = ['/', '/experience/', '/experience/rail/', '/contact/'];
/** Lowest accepted score per category, 0–100, on every page. */
const LIMITS = { accessibility: 95, 'best-practices': 95, seo: 95 };
/**
 * Lowest accepted performance score, where it is stable enough to hold on a shared CI machine. Journey pages load the
 * 3D scene and are reported only: their score swings with the machine's graphics.
 */
const PERFORMANCE = { 'desktop /': 85, 'desktop /contact/': 85 };

const root = fileURLToPath(new URL('..', import.meta.url));
const out = `${root}lighthouse-report/`;
mkdirSync(out, { recursive: true });
const server = spawn('node', ['scripts/serve.mjs', String(PORT)], { cwd: root, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));

const rows = [];
let failed = false;
try {
  for (const preset of ['mobile', 'desktop']) {
    for (const page of PAGES) {
      const name = `${preset}${page.replaceAll('/', '-').replace(/-$/, '') || '-home'}`;
      const run = spawnSync(
        `${root}node_modules/.bin/lighthouse`,
        [
          `http://127.0.0.1:${PORT}${page}`,
          '--quiet',
          '--output=json',
          '--output=html',
          `--output-path=${out}${name}`,
          '--chrome-flags=--headless=new --use-angle=swiftshader --enable-unsafe-swiftshader',
          ...(preset === 'desktop' ? ['--preset=desktop'] : []),
        ],
        { encoding: 'utf8' },
      );
      if (run.status !== 0) throw new Error(`Lighthouse failed on ${page}: ${run.stderr}`);
      const report = JSON.parse(readFileSync(`${out}${name}.report.json`, 'utf8'));
      const limits = { performance: PERFORMANCE[`${preset} ${page}`] ?? 0, ...LIMITS };
      const scores = Object.fromEntries(
        Object.keys(limits).map((k) => [k, Math.round((report.categories[k]?.score ?? 0) * 100)]),
      );
      const low = Object.entries(scores).filter(([k, v]) => v < limits[k]);
      if (low.length) failed = true;
      rows.push({ preset, page, ...scores, below: low.map(([k]) => k).join(', ') || '—' });
    }
  }
} finally {
  server.kill();
}
console.table(rows);
console.log(failed ? 'Some scores are below the limits.' : `All scores meet the limits. Reports in ${out}`);
process.exit(failed ? 1 : 0);
