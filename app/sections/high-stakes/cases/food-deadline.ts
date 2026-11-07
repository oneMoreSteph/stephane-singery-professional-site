import type { Case } from '../../types';

export default {
  slug: 'food-deadline',
  logo: '/assets/foodcheri-logo.svg',
  tag: 'FOODCHÉRI · SIX WEEKS',
  title: 'Six weeks, 600 dashboards',
  summary: 'The licence was ending: I rebuilt only what the company could not run without.',
  category: 'SIX WEEKS',
  takeaway:
    'Six weeks before the Tableau licence ended, I rebuilt the reporting the company could not run without. The board kept its views on day one.',
  beats: [
    [
      '01 / THE CLOCK',
      'Six weeks, then the licence ends.',
      [
        'The Tableau licence ended in six weeks.',
        'More than 600 dashboards ran on it.',
        'The board and finance steered with some of them.',
      ],
    ],
    [
      '02 / THE WAY',
      'Rebuild what the company needs, not what exists.',
      [
        'My audit: about one dashboard in ten used regularly.',
        'Views ranked by who depended on them.',
        'Board-level monitoring first, finance at the top.',
        'Everything else: the full migration, later.',
      ],
    ],
    [
      '03 / THE BUILD',
      'Six weeks of building.',
      [
        'Tools validated.',
        'I built the ingestion pipelines and the SQL models behind those views.',
        'I rebuilt the views in Metabase.',
        'Weeks of 75 to 80 hours, weekends included.',
      ],
    ],
    [
      '04 / DELIVERED',
      'The board kept its views on day one.',
      [
        'The critical views ran on the new stack before the licence ended.',
        'The date held: the Tableau renewal avoided.',
        'Then access for every team: the start of the move from 2 to 25 active analysis producers.',
      ],
    ],
  ],
  value: {
    org: 'FOODCHÉRI',
    levers: ['Commitments met', 'Continuity', 'Cost'],
    line: 'The board steered on day one. The Tableau licence ended on its date, its renewal avoided.',
  },
  drawing: {
    scene: 'deadline',
    labels: ['The clock', 'The way', 'The build', 'Delivered'],
    note: 'Dashboard wall and week-by-week sequence are illustrative; figures and the order of the work are from my account.',
  },
} satisfies Case;
