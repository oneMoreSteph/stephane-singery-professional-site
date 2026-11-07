import type { Case } from '../../types';

export default {
  slug: 'rail',
  logo: '/assets/sncf-logo.svg',
  tag: 'SNCF RÉSEAU · 2012–2016',
  title: 'Rail Capacity Consultation Officer',
  summary: 'Securing freight customers’ capacity, two or three years ahead.',
  category: 'NETWORK CAPACITY',
  takeaway:
    'I represented freight customers’ capacity needs on a shared national network, from two or three years ahead to the day of circulation.',
  beats: [
    [
      '01 / A CONTESTED NETWORK',
      'Every operator wants the same capacity.',
      ['Operators compete for the same train paths.', 'Engineering works take capacity away.'],
    ],
    [
      '02 / MY CUSTOMERS',
      'A portfolio of rail customers.',
      [
        'A portfolio of freight customers, such as Greenmodal (CMA CGM).',
        'And Thello, a passenger rail company: trains between Paris, Milan and Venice, among the first non-French operators in France.',
        'For each one, I built the requests: the train schedules that best fit their business.',
        'I defended them before the entity granting the agreements.',
        'I obtained the schedules.',
      ],
    ],
    [
      '03 / THE LONG MISSIONS',
      'Years of work for one day of circulation.',
      [
        'Each request started two or three years ahead.',
        'I kept it alive through works, competing demands and changes.',
        'Until the train ran.',
        'Toyota Europe (2013) and the Tour de France level crossings belong to these years.',
      ],
    ],
    [
      '04 / NEXT',
      'Toward passengers.',
      [
        'June 2016: a role on the passenger side of the railway, Transilien Ligne C.',
        'Until November 2016, both roles: two jobs in one day.',
      ],
    ],
  ],
  value: {
    org: 'SNCF RÉSEAU',
    levers: ['Customers'],
    line: 'Freight customers ran the schedules their business needed, on a contested network.',
  },
  drawing: {
    scene: 'rff',
    labels: ['A contested network', 'My customers', 'The long missions', 'Next'],
    note: 'Real network: lines in operation, SNCF Réseau open data. Train routes are schematic links between cities; timings and customer rows beyond the named ones are illustrative.',
    mapSources: true,
  },
  timeline: {
    lane: 'ops',
    from: 2012,
    to: 2016.85,
    label: 'SNCF RÉSEAU',
    org: 'SNCF RÉSEAU',
    period: '2012–2016',
    title: 'Rail Capacity Consultation Officer',
    fact: 'Securing freight customers’ capacity, two or three years ahead.',
    metric: ['2–3', 'From two or three years ahead to the day of circulation', 'years ahead'],
  },
} satisfies Case;
