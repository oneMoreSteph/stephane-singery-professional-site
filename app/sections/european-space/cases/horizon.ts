import type { Case } from '../../types';

export default {
  slug: 'horizon',
  symbol: '✦',
  tag: 'MY CAREER GOAL',
  title: 'European space ambition',
  summary: 'Why I want to contribute to Europe’s technological sovereignty.',
  category: 'EUROPEAN SPACE / MY GOAL',
  takeaway: 'I want my next work to strengthen Europe’s capacity to build and operate its own technology.',
  beats: [
    [
      '01 / LONG-STANDING INTEREST',
      'Space has always pulled me forward.',
      [
        'The universe, exploration and science fiction, since childhood.',
        'Work that serves something larger than one person.',
      ],
    ],
    [
      '02 / THE SYSTEMS',
      'Move toward the systems that produce Data.',
      [
        'My experience so far: where Data is processed and used.',
        'Next: further upstream.',
        'The environment: Big Data, the field of my engineering degree.',
        'The production systems that generate, transport, process and use Data at scale.',
      ],
    ],
    [
      '03 / EUROPEAN PURPOSE',
      'A European citizen, contributing.',
      [
        'I am a European citizen.',
        'I want to help preserve Europe’s positive influence in the world.',
        'Through space-related systems and capabilities Europe can understand, operate and rely on for itself.',
      ],
    ],
  ],
  drawing: {
    scene: 'ambition',
    labels: ['The pull', 'The systems', 'Why Europe'],
    note: 'My professional direction: Europe’s technological sovereignty.',
  },
} satisfies Case;
