import type { Case } from '../../types';

export default {
  slug: 'critical-pipeline',
  logo: '/assets/heetch-logo.svg',
  tag: 'HEETCH · A CRITICAL PIPELINE',
  title: 'From 90 minutes an hour to 11 minutes a day',
  summary:
    'A critical pipeline failing one run in two: I found a way, and delivered at the frequency really needed.',
  category: 'A CRITICAL PIPELINE',
  takeaway:
    'I took a critical pipeline from 90 minutes for each hour of Data, failing one run in two, to 11 minutes for a full day, ready every morning.',
  beats: [
    [
      '01 / THE STAKES',
      'One of the most critical pipelines.',
      [
        'At Heetch, I inherited several ETL pipelines to maintain.',
        'One of the most critical: the automatic analysis of driver behaviour.',
        'Several sources: Redshift, S3 and a third-party service platform.',
        'A large hourly volume, growing.',
      ],
    ],
    [
      '02 / THE BREAK',
      'Built for each hour, outgrown by the volume.',
      [
        'Orchestrated to run every hour, on the last hour’s Data.',
        'Each run took 90 minutes for one hour of Data.',
        'Each 90-minute run blocked the next hour’s run: the pipeline failed every two hours.',
        'By evening, half of the day’s Data was missing.',
        'Critical operational dashboards filled a day late.',
      ],
    ],
    [
      '03 / THE WAY',
      'Lineage, parallelism, and the real need.',
      [
        'I was asked to find a way.',
        'I explored the lineage, step by step.',
        'Ingestion and computing in parallel wherever possible.',
        'I audited the need behind: the teams needed the Data every morning.',
        'I set the delivery to that frequency: daily.',
      ],
    ],
    [
      '04 / THE RESULT',
      '11 minutes for a full day.',
      [
        'From 90 minutes for one hour of Data to 11 minutes for a full day.',
        'Complete, correct Data every morning.',
        'Country operations teams and their dashboards ready at the start of the day.',
        'The company sees a critical side of its activity.',
      ],
    ],
  ],
  value: {
    org: 'HEETCH',
    levers: ['Continuity', 'Trust and risk', 'Speed of decision'],
    line: 'Country operations teams start each morning with complete, correct Data on a critical side of the business.',
  },
  drawing: {
    scene: 'critical-pipeline',
    labels: ['The stakes', 'The break', 'The way', 'The result'],
    note: 'Run timings, lineage steps and dashboards are illustrative; durations and the frequency are from my account.',
  },
} satisfies Case;
