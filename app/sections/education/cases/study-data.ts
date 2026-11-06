import type { Case } from '../../types';

export default {
  slug: 'study-data',
  symbol: '02',
  tag: '2019–2021',
  title: 'Self-taught in Data, then a Data Science Developer programme',
  summary: 'Self-taught, then a certified programme: the method that took me into a Data team.',
  category: 'EDUCATION / DATA SCIENCE',
  takeaway:
    'I taught myself, then completed a certified Data Science Developer programme: the method that took me from operations into a Data team.',
  beats: [
    [
      '01 / SELF-TAUGHT',
      'Learning alone, first.',
      [
        'From 2019: Python, SQL and statistics, self-taught.',
        'A goal, a method, practice, again, until it holds.',
      ],
    ],
    [
      '02 / JEDHA',
      'An intensive, certified programme.',
      [
        'Jedha’s Data Science Developer programme: a state-recognised certification.',
        'About 450 intensive hours.',
        'Python, analysis and visualisation, machine learning, deep learning, Data engineering.',
        'Closed by a final project.',
      ],
    ],
    [
      '03 / THE MATURITY',
      'From a question to something used.',
      [
        'Turn a business question into a Data problem.',
        'Test an answer, then ship it.',
        'Beneath every model: Data that must be reliable.',
      ],
    ],
    [
      '04 / WHERE IT LED',
      'The FoodChéri Data team, February 2021.',
      [
        'February 2021: FoodChéri’s Data team.',
        'Applied with real users, from ingestion to self-service analytics.',
      ],
    ],
  ],
  drawing: {
    scene: 'learning',
    labels: ['Self-taught', 'Jedha', 'The maturity', 'Where it led'],
    note: 'Illustrative views and code. Programme blocks as described by Jedha; hours approximate.',
  },
  timeline: {
    lane: 'study',
    from: 2019.5,
    to: 2021.1,
    label: 'SELF-TAUGHT · DATA',
    labelPos: 'below',
    org: 'SELF-TAUGHT, THEN JEDHA',
    period: '2019–2021',
    title: 'Self-taught in Data, then a Data Science Developer programme',
    fact: 'Self-directed Python first, then the Jedha Data Science Developer programme.',
    metric: ['~450', 'Intensive, certified programme', 'hours'],
  },
  orbit: {
    r: 205,
    label: 'SELF-TAUGHT · DATA',
    period: '2019–2021',
    led: 'Led to the FoodChéri Data team, Feb 2021',
    angle: -40,
  },
} satisfies Case;
