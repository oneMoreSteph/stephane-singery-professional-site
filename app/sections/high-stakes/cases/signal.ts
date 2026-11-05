import type { Case } from '../../types';

export default {
  slug: 'signal',
  logo: '/assets/verisure-logo.webp',
  tag: 'VERISURE · DATA QUALITY & OBSERVABILITY',
  title: 'Signal or noise',
  summary: 'Governed overrides: harmless alerts stop flooding the teams, nothing is silenced for good.',
  category: 'VERISURE / SIGNAL OR NOISE',
  takeaway:
    'I made overrides a governed part of the platform: harmless alerts stop flooding the teams, nothing is silenced for good, and the alerts that remain are trusted.',
  beats: [
    [
      '01 / THE STAKES',
      'An alert can be right and still be noise.',
      [
        'Some tests raised alerts technically valid but operationally harmless.',
        'Left as they were: they flooded the teams and buried the alerts on business-critical Data.',
        'Silenced: they would hide real problems.',
      ],
    ],
    [
      '02 / WHY AN OVERRIDE',
      'Separate detection from qualification.',
      [
        'Requalifying an alert became a capability of the common layer.',
        'Available to every observability domain, not a workaround for only one of them.',
        'The test keeps running and detecting.',
        'The override only changes how its alert is qualified.',
      ],
    ],
    [
      '03 / WHAT IT BRINGS',
      'An exception that is owned, reviewed and visible.',
      [
        'Each override: a justification, an owner, a review date, a duration.',
        'Always traceable.',
        'When the duration ends, the alert returns to its normal qualification.',
        'Nothing silenced for good.',
      ],
    ],
    [
      '04 / THE RESULT',
      'Alerts teams act on.',
      [
        '525 tests a day, about 60,000 executions so far.',
        'Harmless alerts leave the teams’ queue and stay on record.',
        'What reaches the teams is worth acting on.',
        'Teams trust their alerts.',
      ],
    ],
  ],
} satisfies Case;
