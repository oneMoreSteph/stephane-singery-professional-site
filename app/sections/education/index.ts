import type { Section } from '../types';
import studyLogistics from './cases/study-logistics';
import studyData from './cases/study-data';
import studyEfrei from './cases/study-efrei';

const section: Section = {
  slug: 'education',
  kind: 'stop',
  title: 'Education and development',
  description:
    'Three study periods: logistics and transport, self-taught Data then a state-recognised programme, an engineering degree at EFREI.',
  stop: {
    key: 'galileo',
    label: 'GALILEO',
    name: 'Galileo',
    tagline: 'EDUCATION',
    spokenName: 'Galileo',
    action: 'VIEW EDUCATION',
    eyebrow: 'HOW I LEARNED',
    titleHtml: 'Education and<br><em>development.</em>',
    intro: 'Three study periods drawn as orbits, each with what it taught me and where it led.',
    hardware: 'GALILEO',
    position: [3.6, -1.6, -0.35],
    camera: [4.9, -1.45, 4],
    look: [4.48, -1.6, -0.35],
    device: {
      kind: 'model',
      preset: 'galileo',
      mapScale: 3.05,
      chapterScale: 1.9,
      hitRadius: 0.68,
      phase: 2.8,
    },
    visual: {
      image: '/assets/esa/galileo/galileo-in-orbit.webp',
      alt: 'ESA rendering of a Galileo navigation satellite above Europe',
      credit: 'Galileo rendering: ESA / P. Carril',
    },
    about: {
      title: 'Why Galileo opens education',
      url: 'https://gssc.esa.int/education/galileo3d/',
      beats: [
        [
          'THE SPACECRAFT',
          'A constellation built launch by launch.',
          'Galileo is Europe’s global navigation satellite system. Its first operational satellites launched in 2011, and initial services began in 2016 while the constellation kept growing.',
        ],
        [
          'WHY IT OPENS THIS CHAPTER',
          'Capability added in steps.',
          'Each launch widened what the system could do. Each study period here did the same for me.',
        ],
      ],
    },
    instrument: 'orbit',
  },
  cases: [studyLogistics, studyData, studyEfrei],
};

export default section;
