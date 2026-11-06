// The site's pages, read from the build: every prerendered folder with an index.html.
import { readdirSync, readFileSync } from 'node:fs';
import { join, sep } from 'node:path';

const dir = join(import.meta.dirname, '../../build/client');

export interface BuiltPage {
  path: string;
  html: string;
}

export const builtPages: BuiltPage[] = readdirSync(dir, { recursive: true, encoding: 'utf8' })
  .filter((f) => f === 'index.html' || f.endsWith(`${sep}index.html`))
  .map((f) => {
    const folders = f.split(sep).slice(0, -1);
    return {
      path: folders.length ? `/${folders.join('/')}/` : '/',
      html: readFileSync(join(dir, f), 'utf8'),
    };
  })
  .filter((p) => !/<meta name="robots" content="[^"]*noindex/.test(p.html))
  .sort((a, b) => (a.path < b.path ? -1 : 1));

/** One page of each kind, for the slower browser checks. */
export const samplePages = [
  '/',
  '/map/',
  '/experience/',
  '/experience/why-this-destination/',
  '/experience/rail/',
  '/contact/',
];
