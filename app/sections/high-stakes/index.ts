import type { Section } from '../types';
import toyota from './cases/toyota';
import tour from './cases/tour';
import foodDeadline from './cases/food-deadline';
import signal from './cases/signal';
import criticalPipeline from './cases/critical-pipeline';
import castor from './cases/castor';

const section: Section = {
  slug: 'high-stakes',
  kind: 'stop',
  title: 'High-stakes case studies',
  description:
    'Six situations where a decision had consequences: one afternoon, five years of race stages, central Paris closed every summer, a six-week deadline, a pipeline failing one run in two, an alert that was right and still noise.',
  stop: {
    key: 'iss',
    label: 'ISS / COLUMBUS',
    name: 'ISS / Columbus',
    tagline: 'HIGH-STAKES CASES',
    spokenName: 'ISS and Columbus',
    action: 'VIEW CASE STUDIES',
    eyebrow: 'UNDER PRESSURE',
    titleHtml: 'High-stakes<br><em>case studies.</em>',
    intro:
      'Six situations, six shapes: one afternoon, five years of race stages, central Paris closed every summer, a six-week deadline, a pipeline failing one run in two and an alert that was right and still noise.',
    hardware: 'ISS / COLUMBUS',
    position: [-3.4, 1.65, 0.6],
    camera: [-2.1, 1.8, 4.9],
    look: [-2.65, 1.65, 0.6],
    device: {
      kind: 'billboard',
      image: '/assets/nasa/iss-render.webp',
      aspect: 3000 / 1569,
      mapScale: 2.85,
      chapterScale: 2.25,
      hitRadius: 0.85,
      phase: 0,
    },
    visual: {
      image: '/assets/nasa/iss-photograph.webp',
      alt: 'The International Space Station photographed in orbit, with its modules and solar arrays visible',
      credit: 'ISS photograph: NASA',
    },
    about: {
      title: 'Why ISS / Columbus opens high-stakes cases',
      url: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Columbus/Columbus_laboratory',
      beats: [
        [
          'THE SPACECRAFT',
          'Europe’s laboratory on the station.',
          'Columbus is ESA’s research module on the International Space Station, attached in February 2008. A control centre in Oberpfaffenhofen, Germany, runs it day and night with the crew on board.',
        ],
        [
          'WHY IT OPENS THIS CHAPTER',
          'Live operations, real consequences.',
          'Crew and ground teams decide together while the station keeps moving. The cases in this chapter share that shape.',
        ],
      ],
    },
  },
  cases: [toyota, tour, castor, foodDeadline, criticalPipeline, signal],
};

export default section;
