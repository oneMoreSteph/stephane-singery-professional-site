import type { Case } from '../../types';

export default {
  slug: 'ligne-c',
  logo: '/assets/sncf-logo.svg',
  tag: 'SNCF · TRANSILIEN LIGNE C · NOV 2016–AUG 2019',
  title: 'Passenger Care and Information Manager',
  summary: 'Passenger-care plans for 42 stations, and the first way to measure them.',
  category: 'TRANSILIEN LIGNE C',
  takeaway: 'I built the passenger-care plans of 42 Ligne C stations and the first mechanism to assess them.',
  beats: [
    [
      '01 / WHY THIS ROLE',
      'A role built on communication.',
      [
        'After capacity planning, a role built on communication, internal and external.',
        'Action, reaction, planning and coordination, every day.',
      ],
    ],
    [
      '02 / THE PLANS',
      'Care plans for 42 stations.',
      [
        'Passenger-care plans for 42 Ligne C stations, such as Saint-Michel Notre-Dame and Austerlitz.',
        'For planned events: festive public events, engineering works.',
        'For unexpected incidents affecting circulation.',
        'Each plan: passengers’ safety, their redirection, their experience in our stations.',
      ],
    ],
    [
      '03 / ON THE GROUND',
      'I put the plans into action on the ground.',
      [
        'Local authorities and welcome service providers: I negotiated what each would do.',
        'I obtained their commitment, or coordinated an existing arrangement.',
        'The station staff concerned, coordinated.',
        'Each of them with the tools and information to act.',
      ],
    ],
    [
      '04 / THE MEASURE',
      'The first way to assess the plans.',
      [
        'The first mechanism to assess the plans.',
        'Indicators defined and monitored: staff work and fixed equipment.',
        'A way to follow the measures required and incentivised by Île-de-France Mobilités.',
        'Measuring whether a system does its job: a question I met again in Data.',
      ],
    ],
  ],
  drawing: {
    scene: 'station',
    labels: ['Why this role', 'The plans', 'On the ground', 'The measure'],
    note: 'Schematic line: 42 station marks, two named as examples. The station and the measures drawn on it are illustrative. Indicators are shown without values.',
  },
  timeline: {
    lane: 'ops',
    from: 2016.85,
    to: 2019.7,
    label: 'SNCF VOYAGEURS',
    tight: true,
    passenger: true,
    org: 'SNCF · TRANSILIEN LIGNE C',
    period: 'Nov 2016–Aug 2019',
    title: 'Passenger Care and Information Manager',
    fact: 'Care plans for works, events and incidents, and the first mechanism to assess them.',
    metric: ['42', 'Covered by care plans', 'stations'],
  },
} satisfies Case;
