import type { Case } from '../../types';

export default {
  slug: 'hubs',
  logo: '/assets/foodcheri-logo.svg',
  tag: 'FOODCHÉRI · 2016–2019 · EVENINGS AND WEEKENDS',
  title: 'Hub Manager',
  summary: 'Six Paris delivery hubs, my door into a tech company.',
  category: 'HUB MANAGER',
  takeaway: 'Alongside SNCF, I ran six FoodChéri delivery hubs in the evenings and at weekends.',
  beats: [
    [
      '01 / WHY',
      'A second job, for a personal goal.',
      ['2016 to 2019, evenings and weekends.', 'A second job, to reach a personal goal.'],
    ],
    [
      '02 / THE HUBS',
      'Stock, orders, riders, customers.',
      [
        'Food stock of six Paris hubs.',
        'Each order dispatched to the right hub.',
        'Multi-order rides planned for riders on bicycles and motorbikes.',
        'Customer-care exchanges.',
      ],
    ],
    [
      '03 / WHAT IT OPENED',
      'My door into a tech company.',
      ['My first experience inside a food-tech company.', 'Where I joined the Data team, in February 2021.'],
    ],
  ],
  value: {
    org: 'FOODCHÉRI',
    levers: ['Continuity'],
    line: 'Six hubs delivered every evening and weekend: stock, orders, riders, customers.',
  },
  drawing: {
    scene: 'paris',
    labels: ['Why', 'The hubs', 'What it opened'],
    note: 'Real Paris arrondissement boundaries. Hub positions and rounds are illustrative.',
    mapSources: true,
  },
  timeline: {
    lane: 'ops',
    from: 2016,
    to: 2020,
    thin: true,
    label: 'FOODCHÉRI HUBS',
    org: 'FOODCHÉRI · HUB MANAGER',
    period: '2016–2019 · evenings and weekends',
    title: 'Hub Manager',
    fact: 'Stock, order dispatch and multi-order rider routes, connected in a live service.',
    metric: ['6', '', 'Paris delivery hubs'],
  },
} satisfies Case;
