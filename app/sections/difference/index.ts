import type { Section } from '../types';
import findAWay from './cases/find-a-way';
import needBehind from './cases/need-behind';
import dataSystem from './cases/data-system';

const section: Section = {
  slug: 'difference',
  kind: 'stop',
  title: 'What makes the difference',
  description:
    'Three habits that run through every role: find a way, the need behind the need, build for production.',
  stop: {
    key: 'sentinel',
    label: 'SENTINEL-6',
    name: 'Sentinel-6',
    tagline: 'WHAT I BRING',
    spokenName: 'Sentinel-6',
    action: 'VIEW WHAT I BRING',
    eyebrow: 'ACROSS EVERY ROLE',
    titleHtml: 'What makes<br><em>the difference.</em>',
    intro:
      'Three habits, from rail operations to Data: find a way, look for the need behind the need, and build for production.',
    hardware: 'SENTINEL-6',
    position: [3.45, 1.7, 0.45],
    camera: [4.8, 1.85, 4.8],
    look: [4.15, 1.7, 0.45],
    device: {
      kind: 'billboard',
      image: '/assets/nasa/sentinel-6-render.webp',
      aspect: 3000 / 1688,
      mapScale: 3,
      chapterScale: 2.05,
      hitRadius: 0.68,
      phase: 1.6,
    },
    visual: {
      image: '/assets/nasa/sentinel-6-render.webp',
      alt: 'Detailed Sentinel-6 spacecraft rendering showing the satellite bus, instruments and solar array',
      credit: 'Sentinel-6 rendering: NASA',
    },
    about: {
      title: 'Why Sentinel-6 opens what makes the difference',
      url: 'https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-6/Facts_and_figures',
      beats: [
        [
          'THE SPACECRAFT',
          'A reference measurement of the sea.',
          'Sentinel-6 Michael Freilich, launched in November 2020 for Copernicus, measures sea-surface height by radar altimetry. It extends a reference record that began in 1992.',
        ],
        [
          'WHY IT OPENS THIS CHAPTER',
          'A record others build on.',
          'A record that long holds only if every measurement does its job. The habits in this chapter are what make my work hold.',
        ],
      ],
    },
  },
  cases: [findAWay, needBehind, dataSystem],
};

export default section;
