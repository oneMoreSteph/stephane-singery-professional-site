import type { Case } from '../../types';

export default {
  slug: 'vfli',
  logo: '/assets/sncf-logo.svg',
  tag: 'SNCF · VFLI · 2010–2012',
  title: 'Rail Resources Manager · Production Department',
  summary: 'Keeping freight trains moving, day and night.',
  category: 'SNCF · VFLI / RAIL RESOURCES',
  takeaway:
    'In 3×8 shifts, I obtained what customers’ freight trains needed to run, whatever the constraints.',
  beats: [
    [
      '01 / A PROMISED ARRIVAL',
      'A train must arrive at the promised place and hour.',
      [
        'Freight customers pay for a train at a given place and a given hour.',
        'The network keeps moving: a plan can break at any moment.',
      ],
    ],
    [
      '02 / OBTAIN IT',
      'Obtain what the train needs, whatever the constraints.',
      [
        'My job: obtain what our trains needed to run, whatever the constraints.',
        '3×8 shifts, day and night.',
        'Last-minute circulation agreements, across France and beyond.',
        'A shunting locomotive or a driver missing: I convinced another company to make one available.',
        'Every unexpected event on our trains, handled with the regional network coordinators.',
      ],
    ],
    [
      '03 / NEXT',
      'From the day itself to the years before it.',
      [
        '2012: I moved to SNCF Réseau, the manager of the French rail network.',
        'Goal: secure network capacity for freight customers.',
      ],
    ],
  ],
} satisfies Case;
