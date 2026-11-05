import type { Section } from '../types';
import vfli from './cases/vfli';
import rail from './cases/rail';
import ligneC from './cases/ligne-c';
import hubs from './cases/hubs';
import foodData from './cases/food-data';
import heetch from './cases/heetch';
import verisure from './cases/verisure';

const section: Section = {
  slug: 'experience',
  kind: 'stop',
  title: 'Professional experience',
  description:
    'Start here. Seven roles since 2010 on one timeline: rail operations at SNCF, then Data at FoodChéri, Heetch and Verisure.',
  stop: {
    key: 'earth',
    label: 'EARTH',
    name: 'Earth',
    tagline: 'ALL EXPERIENCE',
    spokenName: 'Earth',
    action: 'VIEW EXPERIENCE',
    eyebrow: 'WHERE AND WHEN',
    titleHtml: 'Professional<br><em>experience.</em>',
    intro:
      'From keeping freight trains running to building the Data systems behind decisions: seven experiences, in order.',
    hardware: 'EARTH',
    position: [0, 0, 0],
    camera: [1.8, 0.2, 7.1],
    look: [1.9, 0, 0],
    device: {
      kind: 'globe',
    },
    about: {
      title: 'Why Earth opens professional experience',
      url: 'https://svs.gsfc.nasa.gov/2915',
      beats: [
        [
          'THE PLANET',
          'Where every system ran.',
          'Rail networks, delivery hubs and Data platforms: every role on this site took place on the ground, inside systems people relied on that day.',
        ],
        [
          'WHY IT OPENS THIS CHAPTER',
          'The ground truth comes first.',
          'Before any orbit, the record: who I worked for, when, and what overlapped.',
        ],
      ],
    },
    instrument: 'track',
  },
  cases: [vfli, rail, ligneC, hubs, foodData, heetch, verisure],
};

export default section;
