import type { Case } from '../../types';

export default {
  slug: 'food-data',
  logo: '/assets/foodcheri-logo.svg',
  tag: 'FOODCHÉRI / SEAZON · FEB 2021–AUG 2022',
  title: 'BI Engineer / Data Product Owner',
  summary: 'A first Data Platform, and analysis opened to the whole company.',
  category: 'FOODCHÉRI & SEAZON / BI ENGINEER · DATA PRODUCT OWNER',
  takeaway:
    'I designed FoodChéri’s first Data Platform and led the BI migration that took active analysis producers from 2 to 25.',
  beats: [
    [
      '01 / THE AUDIT',
      'A graveyard of dashboards.',
      [
        'From day one: Data delivery across the company.',
        'First, an audit: 250 employees, 600+ Tableau dashboards, scattered personal reports.',
        'About 10% used regularly.',
        'All built by the Data team alone.',
      ],
    ],
    [
      '02 / THE CONCLUSION',
      'The bottleneck was the real problem.',
      [
        'Demand for analysis grew every day.',
        'The capacity to produce it stayed with a small team.',
        'More dashboards would only feed the graveyard.',
        'Two things had to change: how Data was made available, and the BI tool.',
      ],
    ],
    [
      '03 / THE PLATFORM',
      'A Data Platform, block by block.',
      [
        'FoodChéri’s first end-to-end Data Platform, designed block by block: source, ELT, Data warehouse, BI.',
        'Raw Data from FoodChéri’s Redshift and Seazon’s MongoDB (NoSQL), ingested with a ready-made tool chosen after an audit.',
        'SQL transformations into curated tables in BigQuery, the Data warehouse.',
        'I built the pipelines and the models.',
      ],
    ],
    [
      '04 / THE BI MIGRATION',
      'From benchmark to board decision to delivery.',
      [
        'Tableau: too complex for a company of this size.',
        'Market explored, tools benchmarked and trialled.',
        'Metabase defended before the board.',
        'I deployed and maintained Metabase on Google App Engine, Google Cloud’s application hosting.',
        'The whole migration led, critical board dashboards delivered within six weeks.',
      ],
    ],
    [
      '05 / ADOPTION',
      'From 2 to 25 active analysis producers.',
      [
        'Metabase: usable after a short training.',
        'Documentation, how-to videos, training for each team.',
        'Pedagogy is the art of repetition.',
        'New analysis axes so teams could monitor their activity.',
        'Active analysis producers: from 2 to 25.',
      ],
    ],
    [
      '06 / NEXT',
      'Drawn to what happens beneath.',
      ['Drawn toward what happens beneath Data analysis.', 'August 2022: Data Engineering at Heetch.'],
    ],
  ],
  drawing: {
    scene: 'system-food',
    labels: ['The audit', 'The conclusion', 'The platform', 'The BI migration', 'Adoption', 'Next'],
    note: 'Platform reconstruction. Data examples illustrate the architecture, not company records.',
  },
  timeline: {
    lane: 'data',
    from: 2021.1,
    to: 2022.5,
    label: 'FOODCHÉRI',
    labelPos: 'above',
    org: 'FOODCHÉRI / SEAZON',
    period: 'Feb 2021–2022',
    title: 'BI Engineer / Data Product Owner',
    fact: 'A first Data Platform, and analysis opened to the whole company.',
    metric: ['2 → 25', '', 'active analysis producers'],
  },
} satisfies Case;
