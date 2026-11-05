import type { Section } from '../types';
import horizon from './cases/horizon';
import transfer from './cases/transfer';

const section: Section = {
  slug: 'european-space',
  kind: 'stop',
  title: 'Why European space',
  description: 'The next step: why European space, and how this experience transfers to it.',
  stop: {
    key: 'juice',
    label: 'JUICE',
    name: 'Juice',
    tagline: 'EUROPEAN SPACE GOAL',
    spokenName: 'Juice',
    action: 'VIEW SPACE GOAL',
    eyebrow: 'WHY SPACE · WHAT I BRING',
    titleHtml: 'Why European<br><em>space.</em>',
    intro:
      'Where the interest comes from, the systems I want to work on, and how my experience maps onto them.',
    hardware: 'JUICE',
    position: [-3.55, -1.75, -0.6],
    camera: [-2.2, -1.6, 3.8],
    look: [-2.65, -1.75, -0.6],
    device: {
      kind: 'billboard',
      image: '/assets/nasa/juice-render.png',
      aspect: 691 / 649,
      mapScale: 2.4,
      chapterScale: 1.6,
      hitRadius: 0.68,
      phase: 4.2,
    },
    visual: {
      image: '/assets/esa/juice/juice-deployed.jpg',
      alt: 'ESA rendering of the Juice spacecraft with its deployed solar arrays and antennas',
      credit: 'Juice rendering: ESA / ATG Medialab',
    },
    about: {
      title: 'Why Juice opens my European space goal',
      url: 'https://juicesoc.esac.esa.int/help/82_spacecraft_model.html',
      beats: [
        [
          'THE SPACECRAFT',
          'A long road to Jupiter.',
          'ESA’s Jupiter Icy Moons Explorer launched in April 2023. After flybys of the Earth, the Moon and Venus, it is due at Jupiter in 2031 to study Ganymede, Callisto and Europa.',
        ],
        [
          'WHY IT OPENS THIS CHAPTER',
          'A destination worth a long trajectory.',
          'Juice reaches its goal through a sequence of planned steps. This chapter is about mine.',
        ],
      ],
    },
  },
  cases: [horizon, transfer],
};

export default section;
