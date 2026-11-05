import type { Case } from '../../types';

export default {
  slug: 'need-behind',
  icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M17 20l7-12 7 12z"/><path class="ic-muted" d="M4 22c4-2 6 2 10 0s6 2 10 0 6 2 10 0 6 2 10 0"/><path class="ic-fill-soft" d="M12 26h24l-6 16H18z"/></svg>',
  tag: 'FOODCHÉRI · LIGNE C · VERISURE',
  title: 'The need behind the need',
  summary: 'Go past the request to the problem, then solve that problem.',
  category: 'WHAT MAKES THE DIFFERENCE / THE NEED BEHIND THE NEED',
  takeaway: 'I go past the request to the problem behind it, then build what solves that problem.',
  beats: [
    [
      '01 / FOODCHÉRI',
      'Asked: dashboards.\nNeeded: autonomy.',
      [
        'Asked: more dashboards.',
        'Seen: a graveyard of 600, and a bottleneck.',
        'Needed: teams building their own analyses.',
        'Built: the Data Platform, Metabase, training. 2 → 25 active analysis producers.',
      ],
    ],
    [
      '02 / LIGNE C',
      'Asked: plans.\nNeeded: people able to act.',
      [
        'Asked: care plans for 42 stations.',
        'Seen: a plan works only if people on the ground can carry it out.',
        'Built: tools and information for each of them, and the first way to assess the plans.',
      ],
    ],
    [
      '03 / VERISURE',
      'Asked: Data tests.\nNeeded: to see Data health.',
      [
        'Asked: Data tests.',
        'Seen: tests are one signal among others.',
        'Built: a Data Quality and Observability platform. Detect, qualify, prioritise, notify, govern.',
        '525 tests a day.',
      ],
    ],
  ],
} satisfies Case;
