import type { Case } from '../../types';

export default {
  slug: 'castor',
  logo: '/assets/sncf-logo.svg',
  tag: 'SNCF · TRANSILIEN LIGNE C · CASTOR WORKS',
  title: 'Castor: central Paris closed, every summer',
  summary: 'One of the biggest disruptions in Île-de-France: I managed its entire passenger-care plan.',
  category: 'CASTOR WORKS',
  takeaway:
    'Every summer, I managed the entire passenger-care plan of the Castor works: RER C closed for six weeks in central Paris, several hundred thousand passengers rerouted.',
  beats: [
    [
      '01 / THE STAKES',
      'One of the biggest disruptions in Île-de-France.',
      [
        'Castor: works on the RER C tunnel under central Paris, every summer.',
        'The shared central section closed for six weeks.',
        '7 stations closed, from Paris-Austerlitz to Javel and Avenue Henri-Martin.',
        'Several hundred thousand passengers to reroute.',
      ],
    ],
    [
      '02 / SIX MONTHS',
      'One plan, many partners.',
      [
        'I managed the entire passenger-care plan.',
        'Six months of preparation, on top of my day-to-day mission.',
        'With the Ligne C management, SNCF Réseau, the authorities and the partners concerned.',
      ],
    ],
    [
      '03 / THE SIX WEEKS',
      'Every passenger rerouted.',
      [
        'At the closed stations: SNCF station agents, service-provider agents and security agents.',
        'Passengers rerouted outside the stations, toward the alternatives.',
        'Several hundred thousand passengers over the six weeks.',
      ],
    ],
    [
      '04 / RECOGNISED',
      'Plans others came to study.',
      [
        'The plan, every summer of my role: 2017, 2018, 2019.',
        'Other Transilien lines sent counterparts to benchmark our plans.',
        'RATP’s RER B recognised the quality of our plans and of our operational follow-up.',
      ],
    ],
  ],
  value: {
    org: 'SNCF · LIGNE C',
    levers: ['Customers', 'Commitments met', 'Team autonomy', 'Trust and risk'],
    line: 'Several hundred thousand passengers kept moving through six weeks of closure in central Paris, every summer.',
  },
  drawing: {
    scene: 'castor',
    labels: ['The stakes', 'Six months', 'The six weeks', 'Recognised'],
    note: 'Schematic of the closed central section from the public works notices; positions are not to scale. Agents, flows and passenger figures are from my account.',
  },
} satisfies Case;
