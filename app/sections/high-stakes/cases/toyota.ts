import type { Case } from '../../types';

export default {
  slug: 'toyota',
  logo: '/assets/sncf-logo.svg',
  tag: 'SNCF RÉSEAU · FREIGHT',
  title: 'Toyota Europe: a network response in one afternoon',
  summary:
    'Weeks of disruption, many constraints: I coordinated several regional teams to a solution in under a day.',
  category: 'TOYOTA EUROPE',
  takeaway:
    'In one afternoon, I coordinated several regional SNCF Réseau teams to find a solution across many constraints, then presented it to Toyota Europe’s logistics leadership the next morning.',
  beats: [
    [
      '01 / THE STAKES',
      'Weeks of disruption. A customer relationship at risk.',
      [
        'Vehicle trains for Toyota Europe, from the Netherlands to the south-west of France.',
        'Repeated disruption for weeks, strongest in the south-west, at heavy cost.',
        'Toyota Europe was considering another freight operator.',
        'A meeting set for the next morning.',
      ],
    ],
    [
      '02 / ONE AFTERNOON',
      'Many constraints, several regions, one answer.',
      [
        'I took the meeting.',
        'The line crossed several regions: one SNCF Réseau team for each, each with its own constraints.',
        'That afternoon, I coordinated all of them.',
        'Together we traced the causes, section by section.',
        'I drafted a solution that held across every constraint, and obtained validation for part of it before the meeting.',
      ],
    ],
    [
      '03 / NEXT MORNING',
      'Represent the network with a workable answer.',
      [
        'Around the table: my main contact, the freight company’s director, Toyota Europe’s European CLO.',
        'I explained why the disruption happened.',
        'I presented the solutions for them to validate.',
      ],
    ],
    [
      '04 / AFTERWARDS',
      'A solution that worked, in under a day.',
      [
        'I followed the solutions through the teams.',
        'Circulation improved.',
        'Found through the coordination of several regional teams, across many constraints.',
        'From first call to validated answer: one afternoon and one morning.',
      ],
    ],
  ],
  drawing: {
    scene: 'toyota',
    labels: ['The stakes', 'One afternoon', 'Next morning', 'Afterwards'],
    note: 'Sequence and roles from my account. French rail network: SNCF Réseau open data. Trains and timings are illustrative.',
    mapSources: true,
  },
} satisfies Case;
