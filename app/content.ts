// Everything derived from the section list: stops, numbers, addresses, lookups.
import { sections } from './sections';
import type { Case, Section, Stop } from './sections/types';

export type StopSection = Section & { stop: Stop };

export const stopSections: StopSection[] = sections.filter(
  (s): s is StopSection => s.kind === 'stop' && !!s.stop,
);
export const pageSections: Section[] = sections.filter((s) => s.kind === 'page');

/** Slug of the "Why this destination?" page inside each stop. */
export const ABOUT_SLUG = 'why-this-destination';

const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const countWord = (n: number) => words[n] ?? String(n);
export const stopCount = stopSections.length;
export const pad = (n: number) => String(n).padStart(2, '0');

export const sectionPath = (s: Section) => `/${s.slug}`;
export const casePath = (s: Section, c: Case) => `/${s.slug}/${c.slug}`;
export const aboutPath = (s: Section) => `/${s.slug}/${ABOUT_SLUG}`;

export const findSection = (slug?: string) => sections.find((s) => s.slug === slug);
export const findStopByKey = (key: string) => stopSections.find((s) => s.stop.key === key);

export function findCase(slug?: string): { section: Section; item: Case } | undefined {
  for (const section of sections) {
    const item = section.cases.find((c) => c.slug === slug);
    if (item) return { section, item };
  }
  return undefined;
}

/** Every address of the site, for routes, prerendering and the sitemap. */
export function allPaths(): string[] {
  const paths = ['/', '/map'];
  for (const s of sections) {
    paths.push(sectionPath(s));
    if (s.stop) paths.push(aboutPath(s));
    for (const c of s.cases) paths.push(casePath(s, c));
  }
  return paths;
}

/** Plain text of a heading that may contain <br> and <em>. */
export const plain = (html: string) =>
  html
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Bullet lines of a beat, whether stored as a list or as one paragraph. */
export const lines = (body: string[] | string) =>
  Array.isArray(body) ? body : body.split(/(?<=[.!?])\s+(?=[A-Z0-9À-Ý‘“])/);
