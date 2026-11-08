import type { Case } from '../../types';

export default {
  slug: 'find-a-way',
  icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="ic-muted" d="M4 34h14"/><rect class="ic-wall" x="20" y="24" width="5" height="18" rx="1"/><path d="M4 34h8c6 0 6-22 14-22h18"/><circle class="ic-fill" cx="42" cy="12" r="3.5"/></svg>',
  tag: 'VFLI · SNCF RÉSEAU · TOUR DE FRANCE · FOODCHÉRI',
  title: 'Find a way',
  summary: 'Whatever the constraint, obtain what the operation needs.',
  category: 'HOW I HAVE BEEN WORKING / FIND A WAY',
  takeaway: 'Whatever the constraint, my job has been to obtain what the operation needs.',
  beats: [
    [
      '01 / VFLI',
      'A locomotive, a driver, an agreement.',
      [
        '3×8 shifts: last-minute circulation agreements.',
        'A locomotive or a driver missing: I convinced another company to make one available.',
      ],
    ],
    [
      '02 / SNCF RÉSEAU',
      'Capacity kept alive for years.',
      [
        'Each freight request kept alive for two or three years.',
        'Through engineering works and competing demands.',
        'Until the train ran.',
      ],
    ],
    [
      '03 / TOUR DE FRANCE',
      'The race and the trains, at the same point.',
      [
        'Five years, stage after stage.',
        'The race timing turned into crossing-by-crossing needs for every region concerned.',
      ],
    ],
    [
      '04 / FOODCHÉRI',
      'Six weeks for what matters.',
      [
        'The Tableau licence ending in six weeks.',
        'I rebuilt only the views the company could not run without.',
        'The board kept them on day one.',
      ],
    ],
  ],
  drawing: {
    scene: 'find-way',
    labels: ['VFLI', 'SNCF Réseau', 'Tour de France', 'FoodChéri'],
    note: 'Each step: one constraint and the way through it. Positions illustrative.',
  },
} satisfies Case;
