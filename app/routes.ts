import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';
import { ABOUT_SLUG, pageSections, stopSections } from './content';

// Routes are generated from the section list: adding a section adds its pages.
export default [
  layout('routes/journey.tsx', [
    index('routes/home.tsx'),
    route('map', 'routes/home.tsx', { id: 'map' }),
    ...stopSections.flatMap((s) => [
      route(s.slug, 'routes/section.tsx', { id: `section-${s.slug}` }),
      route(`${s.slug}/${ABOUT_SLUG}`, 'routes/about.tsx', { id: `about-${s.slug}` }),
      ...s.cases.map((c) => route(`${s.slug}/${c.slug}`, 'routes/case.tsx', { id: `case-${c.slug}` })),
    ]),
  ]),
  ...pageSections.map((s) => route(s.slug, `sections/${s.slug}/page.tsx`)),
  route('mission-journey.html', 'routes/old-entry.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
