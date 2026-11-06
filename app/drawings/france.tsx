// France at true proportions, with the main rail links. Shared by the rail and network scenes.
import { Fragment } from 'react';
import { countries } from '~/legacy/mission-geography.js';
import type { Pt } from './kit';

export const cities: Record<string, Pt> = {
  Lille: [3.06, 50.63],
  Paris: [2.35, 48.86],
  Rouen: [1.1, 49.44],
  Rennes: [-1.68, 48.11],
  Nantes: [-1.55, 47.22],
  Bordeaux: [-0.58, 44.84],
  Toulouse: [1.44, 43.6],
  Lyon: [4.84, 45.76],
  Marseille: [5.37, 43.3],
  Dijon: [5.04, 47.32],
  Strasbourg: [7.75, 48.58],
  Metz: [6.18, 49.12],
  Mulhouse: [7.34, 47.75],
  Geneva: [6.14, 46.2],
  Basel: [7.59, 47.56],
  Turin: [7.69, 45.07],
  Milan: [9.19, 45.46],
};
export const connections: string[][] = [
  ['Lille', 'Paris'],
  ['Paris', 'Rouen'],
  ['Paris', 'Rennes', 'Nantes', 'Bordeaux', 'Toulouse'],
  ['Paris', 'Dijon', 'Lyon', 'Marseille'],
  ['Paris', 'Metz', 'Strasbourg', 'Mulhouse'],
  ['Bordeaux', 'Lyon'],
  ['Toulouse', 'Marseille'],
  ['Dijon', 'Mulhouse', 'Basel'],
  ['Lyon', 'Geneva'],
  ['Lyon', 'Turin', 'Milan'],
];
const foreign = ['Geneva', 'Basel', 'Turin', 'Milan'];

// Longitude is narrowed by cos(46.5°) so France keeps its true proportions; country outlines get the same correction.
const SQUASH = 0.795;
const MID = 365;
export const project = ([lon, lat]: Pt): Pt => [
  ((lon + 6) * 44 + 30 - MID) * SQUASH + MID,
  (52.5 - lat) * 51 + 15,
];
export const at = (city: string) => project(cities[city]);
export const mid = (a: string, b: string): Pt => {
  const [x1, y1] = at(a);
  const [x2, y2] = at(b);
  return [(x1 + x2) / 2, (y1 + y2) / 2];
};
export const route = (names: string[]) => names.map((n, i) => `${i ? 'L' : 'M'}${at(n).join(' ')}`).join(' ');

/** Applies the longitude correction to raw outline coordinates. */
export const Squash = ({ children }: { children: React.ReactNode }) => (
  <g transform={`translate(${MID} 0) scale(${SQUASH} 1) translate(${-MID} 0)`}>{children}</g>
);

type Country = { name: string; d: string };
const slug = (name: string) => name.toLowerCase().replaceAll(' ', '-');

/** France and its neighbours. */
export function CountryMap() {
  return (
    <g className="country-map">
      <Squash>
        {(countries as Country[]).map((c) => (
          <path key={c.name} d={c.d} className={`country country--${slug(c.name)}`} />
        ))}
      </Squash>
    </g>
  );
}

/** France alone, with its domestic rail links. */
export function FranceRail() {
  return (
    <>
      <g className="country-map">
        <Squash>
          {(countries as Country[])
            .filter((c) => c.name === 'France')
            .map((c) => (
              <path key={c.name} d={c.d} className="country country--france" />
            ))}
        </Squash>
      </g>
      <g className="rail-links">
        {connections
          .filter((c) => !c.some((n) => foreign.includes(n)))
          .map((c) => (
            <Fragment key={c.join('-')}>
              <path d={route(c)} className="rail-bed" fill="none" />
              <path d={route(c)} className="rail-sleeper" fill="none" />
            </Fragment>
          ))}
      </g>
    </>
  );
}
