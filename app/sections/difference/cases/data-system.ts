import type { Case } from '../../types';

export default {
  slug: 'data-system',
  icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="ic-fill-soft" d="M24 6l18 8-18 8-18-8z"/><path d="M6 22l18 8 18-8"/><path d="M6 30l18 8 18-8"/></svg>',
  tag: 'FOODCHÉRI · HEETCH · VERISURE',
  title: 'Build for production',
  summary: 'One Data system, three layers: access, transformation, observability.',
  category: 'HOW I HAVE BEEN WORKING / BUILD FOR PRODUCTION',
  takeaway: 'One Data system, three layers: what I built at each, technically.',
  beats: [
    [
      '01 / ACCESS',
      'Ingestion, curated tables and self-service BI.',
      [
        'FoodChéri.',
        'Raw Data from Redshift, ingested with a ready-made tool.',
        'SQL models into curated BigQuery tables.',
        'Served through Metabase.',
      ],
    ],
    [
      '02 / TRANSFORMATION',
      'Incremental SQL models, tested and orchestrated.',
      [
        'Heetch.',
        'SQL models in Dataform on BigQuery, incremental logic adapted to the ingestion.',
        'Reusable Data tests in Dataform.',
        'Orchestration and a tag policy, feeding Looker and Vertex AI.',
      ],
    ],
    [
      '03 / OBSERVABILITY',
      'Automated monitoring of the marts.',
      [
        'Verisure.',
        'dbt Core models and Snowflake marts.',
        'Monitored by Elementary tests.',
        'Anomalies prioritised in one shared observability model.',
      ],
    ],
  ],
  drawing: {
    scene: 'stack',
    labels: ['Access', 'Transformation', 'Observability'],
    note: 'Simplified architecture. Tools named where they belong to the role; table names and code are illustrative.',
  },
} satisfies Case;
