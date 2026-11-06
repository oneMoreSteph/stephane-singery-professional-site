// The France rail map shared by the two SNCF freight roles. Everything drawn over it sits in a solid panel.
import { Fragment } from 'react';
import { cities, connections, CountryMap, project, route } from './france';
import { OpsDefs, T } from './kit';
import { Line } from './ops';

export function RailBase() {
  return (
    <>
      <OpsDefs />
      <CountryMap />
      <T x={292} y={345} className="country-name">
        F R A N C E
      </T>
      <T x={574} y={300} className="country-name foreign">
        SWITZERLAND
      </T>
      <T x={650} y={440} className="country-name foreign">
        ITALY
      </T>
      <T x={150} y={520} className="sea-label">
        BAY OF BISCAY
      </T>
      <g className="rail-links">
        {connections.map((c) => (
          <Fragment key={c.join('-')}>
            <Line d={route(c)} c="rail-bed" />
            <Line d={route(c)} c="rail-sleeper" />
          </Fragment>
        ))}
      </g>
    </>
  );
}

const foreign = ['Geneva', 'Basel', 'Turin', 'Milan'];
const offsets: Record<string, [number, number]> = {
  Mulhouse: [-70, -6],
  Basel: [12, 14],
  Strasbourg: [10, -8],
  Metz: [-34, -12],
  Dijon: [10, -10],
  Geneva: [10, -8],
  Lyon: [10, 18],
  Turin: [8, 18],
  Milan: [8, -8],
};

export function RailCities() {
  return (
    <g className="city-layer">
      {Object.entries(cities).map(([name, p]) => {
        const [x, y] = project(p);
        const [ox, oy] = offsets[name] || [9, 20];
        return (
          <Fragment key={name}>
            <circle
              cx={x}
              cy={y}
              r={name === 'Paris' ? 6 : 4}
              className={`city-dot ${foreign.includes(name) ? 'city-foreign' : ''}`}
            />
            <T x={x + ox} y={y + oy} className="city-label">
              {name}
            </T>
          </Fragment>
        );
      })}
    </g>
  );
}

/** A solid panel drawn over the map. */
export const Panel = ({ x, y, w, h, c = '' }: { x: number; y: number; w: number; h: number; c?: string }) => (
  <rect className={`map-panel ${c}`} x={x} y={y} width={w} height={h} rx="4" />
);
