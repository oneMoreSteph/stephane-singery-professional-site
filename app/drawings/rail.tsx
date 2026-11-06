// The France rail map shared by the two SNCF freight roles. Everything drawn over it sits in a solid panel.
import { Fragment } from 'react';
import { rfnNetwork } from './data/rfn';
import { useDrawing } from './context';
import { cities, connections, CountryMap, project, route } from './france';
import { Inspectable } from './Inspectable';
import { OpsDefs, T } from './kit';
import { Line } from './ops';

/** The real lines in operation of the national rail network, from SNCF Réseau open data. Clickable at the `focus` steps. */
export function RfnNetwork({ focus }: { focus: number[] }) {
  const { step } = useDrawing();
  const lines = <path d={rfnNetwork} className="rfn-line" fill="none" />;
  return (
    <g className="rfn-network">
      {focus.includes(step) ? (
        <Inspectable
          id="rfn"
          title="The national rail network"
          body="The lines in operation of the French national rail network, from SNCF Réseau open data.|Every request I built had to fit on these lines, shared by every operator."
        >
          {lines}
        </Inspectable>
      ) : (
        lines
      )}
    </g>
  );
}

/** `network`: the steps at which the real network is clickable; without it, the map keeps only the schematic links. */
export function RailBase({ network }: { network?: number[] }) {
  return (
    <>
      <OpsDefs />
      <CountryMap />
      {network && <RfnNetwork focus={network} />}
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
