import type { Section } from '../types';

export default {
  slug: 'courses',
  kind: 'page',
  title: 'Courses',
  description: 'Engineering courses at EFREI: each course, its teacher, and the projects built for it.',
  cases: [
    {
      slug: 'nyc-taxi',
      tag: 'EFREI · DATA VISUALISATION & BI',
      title: 'NYC Taxi: one day, different journeys',
      summary: 'One sampled day, 97,986 trips: when people travel, where they go, how long it takes.',
      category: 'DATA VISUALISATION PROJECT',
      takeaway:
        'An interactive, reproducible reading of one day of New York taxi trips: data quality, hours, places, travel time and fares.',
      beats: [],
    },
  ],
} satisfies Section;
