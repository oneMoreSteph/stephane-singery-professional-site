// The career timeline and the study orbits, read from the case files.
import { sections } from '~/sections';
import type { StudyOrbit, TimelineSpan } from '~/sections/types';

export type Span = TimelineSpan & { key: string };
export type Orbit = StudyOrbit & { key: string };

export const spans: Span[] = sections.flatMap((s) =>
  s.cases.flatMap((c) => (c.timeline ? [{ ...c.timeline, key: c.slug }] : [])),
);
export const orbits: Orbit[] = sections.flatMap((s) =>
  s.cases.flatMap((c) => (c.orbit ? [{ ...c.orbit, key: c.slug }] : [])),
);
export const byKey = (key: string) => spans.find((s) => s.key === key)!;
export const chronological = [...spans].sort((a, b) => a.from - b.from).map((s) => s.key);
export const laneName = { ops: 'OPERATIONS', data: 'DATA', study: 'STUDY' } as const;

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
/** Today as a decimal year, capped at the end of the timeline. */
export const nowYear = () => {
  const d = new Date();
  return Math.min(2028.6, d.getFullYear() + d.getMonth() / 12);
};
