import type { Case } from '../../types';

export default {
  slug: 'tour',
  logo: '/assets/sncf-logo.svg',
  tag: 'SNCF RÉSEAU · NATIONAL EVENT',
  title: 'Tour de France: five years of rail coordination',
  summary: 'Align changing race stages, level crossings and live regional rail regulation.',
  category: 'TOUR DE FRANCE',
  takeaway:
    'For five years, I brought a moving national race route and live rail regulation into the same operational plan.',
  beats: [
    [
      '01 / THE MEETING POINT',
      'Where the race meets the railway.',
      [
        'Each stage route crossed active rail lines at level crossings.',
        'At every crossing, the race and the trains needed the same point at different moments.',
      ],
    ],
    [
      '02 / FIVE YEARS',
      'Every stage, for five years.',
      [
        'Five years with ASO, the race organiser.',
        'For each stage, I identified the crossings.',
        'I orchestrated the regulation teams of every area the route crossed.',
      ],
    ],
    [
      '03 / AT THE CROSSING',
      'Race first, trains after.',
      [
        'Each year, I asked each region concerned to hold or retime the trains.',
        'The riders passed undisturbed.',
        'The plan reached the teams running live traffic, at the right crossing, at the right moment.',
      ],
    ],
  ],
  value: {
    org: 'SNCF RÉSEAU',
    levers: ['Commitments met'],
    line: 'Five Tours de France crossed active rail lines at full race pace, with live traffic regulated around them.',
  },
  drawing: {
    scene: 'crossing',
    labels: ['The meeting point', 'Every stage, five years', 'At the crossing'],
    note: 'Rail network: SNCF Réseau open data. Illustrative stages, crossings and timings. Not a specific edition or a signalling procedure.',
    mapSources: true,
  },
} satisfies Case;
