import type { Case } from '../../types';

export default {
  slug: 'verisure',
  logo: '/assets/verisure-logo.webp',
  tag: 'VERISURE · APPRENTICESHIP WITH EFREI · 2025–PRESENT',
  title: 'Analytics Engineer',
  summary: 'From a request for Data tests to a Data Quality and Observability platform.',
  category: 'VERISURE / ANALYTICS ENGINEER · APPRENTICESHIP',
  takeaway:
    'I turned a request for Data tests into an automated platform that watches the health of Verisure’s Data.',
  beats: [
    [
      '01 / WHY VERISURE',
      'A company at scale.',
      [
        'Analytics Engineer apprentice, alongside my engineering degree at EFREI.',
        'Chosen for its scale: worldwide, growing year after year.',
      ],
    ],
    [
      '02 / THE STARTING POINT',
      'Errors found by the business first.',
      [
        'Anomaly detection was mostly reactive.',
        'Some data marts checked manually or by eye.',
        'Incidents often surfaced through a business report or an incoherent KPI.',
        'The request: a mechanism to test Data and detect anomalies proactively.',
      ],
    ],
    [
      '03 / WHAT I UNDERSTOOD',
      'Tests are one signal among others.',
      [
        'Tests are one signal among others.',
        'The need: observe Data health. Detect, qualify, prioritise, keep the history, notify, govern.',
        'The more decisions depend on Data, the more an undetected anomaly costs.',
      ],
    ],
    [
      '04 / THE PLATFORM',
      'A Data Quality and Observability platform.',
      [
        'Designed within the existing tools and constraints.',
        'A common alert model in a transverse layer.',
        'dbt tests as the first observability domain, room for others without redesign.',
        'Built with dbt Core, Snowflake (the Data warehouse) and Elementary.',
      ],
    ],
    [
      '05 / IN OPERATION',
      '525 tests, every day.',
      [
        'Tests industrialised and automated: 525 a day, about 60,000 executions so far.',
        'Qualification, prioritisation and automatic alerts: teams treat each anomaly quickly.',
        'Monitoring: what is happening, the trends, where to focus effort.',
      ],
    ],
    [
      '06 / RESULT',
      'Trust in Data, across the company.',
      [
        'Issues surface earlier, with fewer manual controls.',
        'Trust in Data improved at every level of the company.',
        'Ready for new observability domains as Data usage grows.',
      ],
    ],
  ],
  drawing: {
    scene: 'system-verisure',
    labels: [
      'Why Verisure',
      'The starting point',
      'What I understood',
      'The platform',
      'In operation',
      'Result',
    ],
    note: 'Illustrative signal and operating model. Portfolio scope: Data quality and observability.',
  },
  timeline: {
    lane: 'data',
    from: 2025.7,
    to: 'now',
    label: 'VERISURE',
    labelPos: 'above',
    live: true,
    org: 'VERISURE',
    period: '2025–present',
    title: 'Analytics Engineer · apprenticeship',
    fact: 'From a request for Data tests to a Data Quality and Observability platform.',
    metric: ['525', 'One square: 5 tests', 'automated Data tests a day'],
  },
} satisfies Case;
