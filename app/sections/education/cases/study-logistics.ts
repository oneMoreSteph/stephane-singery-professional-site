import type { Case } from '../../types';

export default {
  slug: 'study-logistics',
  symbol: '01',
  tag: 'IUT DE CHARTRES · 2008–2010',
  title: 'Logistics and transport',
  summary: 'Thinking in flows: a promise to keep, resources to secure, constraints to work around.',
  category: 'EDUCATION / LOGISTICS & TRANSPORT',
  takeaway:
    'Logistics taught me to think in flows: a promise to keep, resources to secure, constraints to work around. I still reason that way, now about Data.',
  beats: [
    [
      '01 / THE DISCIPLINE',
      'The right thing, at the right place, at the right time.',
      [
        'IUT de Chartres: logistics and transport management.',
        'Flows of goods, stock and costs.',
        'The five modes of transport and the rules that bind them.',
        'One promise behind every lesson: deliver on time, at the right cost.',
      ],
    ],
    [
      '02 / THE MATURITY',
      'Each block a constraint to work with.',
      [
        'Cost control, accounting, transport law, negotiation.',
        'Languages for international logistics.',
        'A company internship.',
        'Two years planning against real constraints, with real counterparts.',
      ],
    ],
    [
      '03 / WHAT IT STILL GIVES ME',
      'How I reason, about trains and about Data.',
      [
        'I start from the promise: what must arrive, where, when, for whom.',
        'I follow the whole chain: a delay upstream lands downstream.',
        'I plan with constraints as they are.',
        'I weigh every choice: time against cost.',
        'I negotiate what I need with those who hold it.',
      ],
    ],
  ],
  drawing: {
    scene: 'logistics',
    labels: ['The discipline', 'The maturity', 'What it still gives me'],
    note: 'Illustrative views. Programme content as taught in logistics and transport DUTs; pipeline times are examples.',
  },
  timeline: {
    lane: 'study',
    from: 2008.7,
    to: 2010.5,
    label: 'IUT CHARTRES',
    labelPos: 'below',
    org: 'IUT CHARTRES',
    period: '2008–2010',
    title: 'Logistics and transport',
    fact: 'University diploma in logistics and transportation management. It opened the way to rail operations.',
  },
  orbit: {
    r: 150,
    label: 'IUT CHARTRES',
    period: '2008–2010',
    led: 'Led to SNCF rail operations, 2010',
    angle: -150,
  },
} satisfies Case;
