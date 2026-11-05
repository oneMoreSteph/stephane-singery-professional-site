import type { Case } from '../../types';

export default {
  slug: 'heetch',
  logo: '/assets/heetch-logo.svg',
  tag: 'HEETCH · AUG 2022–AUG 2025',
  title: 'Data Engineer',
  summary: 'The transformation core of a near-real-time Data Platform.',
  category: 'HEETCH / DATA ENGINEER',
  takeaway: 'I built most of Heetch’s new Data Platform, taking its Data from a daily refresh toward hourly.',
  beats: [
    [
      '01 / WHY HEETCH',
      'A more mature Data organisation.',
      [
        'From the first interview and the technical test: a clear gap in Data maturity.',
        'I joined as a Data Engineer to work at that level.',
      ],
    ],
    [
      '02 / THE STARTING POINT',
      'A daily analytical stack.',
      [
        'Raw and curated Data mixed in Redshift.',
        'Transformations mostly in Dataiku, where I developed a lot.',
        'Looker dashboards refreshed once a day.',
        'The company needed Data every hour.',
      ],
    ],
    [
      '03 / THE PLATFORM',
      'A new platform on BigQuery.',
      [
        'I built most of the new platform, on Google Cloud.',
        'Raw and curated Data, both in BigQuery.',
        'SQL transformations in Dataform, the equivalent of dbt.',
        'Orchestration.',
        'BI access through Looker, AI access through Vertex AI.',
      ],
    ],
    [
      '04 / THE MODELS',
      'Incremental models, safe to change.',
      [
        'Nearly all the SQL models in Dataform, with complex incremental logic.',
        'Data tests turned into reusable tests in Dataform: my first step into observability.',
        'Orchestration and a tag policy: logic safer to change, easier to maintain.',
      ],
    ],
    [
      '05 / OPERATIONAL WORKFLOWS',
      'Beyond the platform.',
      [
        'ETL pipelines and microservices for operational business workflows.',
        'Owned end to end, from requirements to production support.',
      ],
    ],
    [
      '06 / RESULT AND NEXT',
      'From daily toward hourly, then EFREI.',
      [
        'Data availability: from daily toward hourly and near real time.',
        'Faster BI and AI uses.',
        'Experienced engineers around me showed how much of the lifecycle I still had to master.',
        'Most had studied at EFREI: I enrolled in its engineering programme.',
      ],
    ],
  ],
} satisfies Case;
