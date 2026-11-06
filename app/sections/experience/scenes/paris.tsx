// Earth · FoodChéri hubs: six delivery hubs on real Paris arrondissements, the service, and each order to the right hub.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { Packet, T, vars, type Pt } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Crew, Line } from '~/drawings/ops';
import { arrondissements } from '~/drawings/data/geography';

/** An isometric building: a hub, or a plain building. */
function Building({
  x,
  y,
  s = 1,
  kind = 'hub',
}: {
  x: number;
  y: number;
  s?: number;
  kind?: 'hub' | 'other';
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-40 12L5 30l39-22V-28L0-43l-40 20Z" fill="#172d3b" />
      <path d="M-40-23L0-43l44 15L1-6Z" fill="#517c87" />
      <path d="M1-6l43-22V8L5 30Z" fill="#244654" />
      <path d="M-40-23L1-6v34l-41-16Z" fill="#355764" />
      <path d="M-30-10l22 8v20l-22-8z" fill="#a6d9dc" />
      <path d="M10-1l24-13v20L10 19z" fill="#0a2635" />
      {kind === 'hub' ? (
        <path d="M-32-22l22 8M12-13l21-11" stroke="#ffd29d" strokeWidth="4" />
      ) : (
        <path d="M-31-6l21 8m-21 8l21 8" stroke="#dcbb79" strokeWidth="3" />
      )}
    </g>
  );
}
function Bike({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="bike">
      <circle cx="-15" cy="9" r="10" />
      <circle cx="18" cy="9" r="10" />
      <path d="M-15 9l9-20L4 9h-19L8-7l10 16M8-7l-3-8h7" />
      <circle className="bike-rider" cx="2" cy="-24" r="5" />
      <rect className="bike-box" x="-21" y="-23" width="12" height="11" rx="1" />
    </g>
  );
}
const Person = ({
  x,
  y,
  color = '#8ad9de',
  scale = 1,
}: {
  x: number;
  y: number;
  color?: string;
  scale?: number;
}) => <Crew x={x} y={y} s={scale * 1.15} color={color} />;

const hubs: Pt[] = [
  [270, 235],
  [420, 180],
  [595, 250],
  [600, 410],
  [415, 465],
  [240, 390],
];
const roads = [
  'M180 350Q310 270 420 180T630 220',
  'M240 390Q390 315 595 250',
  'M270 235Q355 395 415 465',
  'M180 300L600 410',
  'M300 150L600 470',
  'M185 445L630 180',
  'M160 230Q410 130 660 340',
];
const rounds = [
  'M270 235Q310 235 330 280T370 330Q330 360 295 332',
  'M600 410Q640 375 615 340T560 310Q525 360 550 390',
  'M415 465Q385 420 420 390T470 330',
];
const orders: Pt[] = [
  [300, 190],
  [365, 250],
  [455, 215],
  [520, 190],
  [560, 300],
  [640, 330],
  [660, 445],
  [560, 470],
  [480, 420],
  [360, 430],
  [300, 350],
  [220, 300],
  [205, 440],
  [470, 320],
];
const near = ([x, y]: Pt) =>
  hubs.reduce((b, h) => (Math.hypot(h[0] - x, h[1] - y) < Math.hypot(b[0] - x, b[1] - y) ? h : b));
const seine = 'M170 310C240 270 220 425 320 421S350 320 430 330S490 410 560 370S620 340 690 400';
const homes: Pt[] = [
  [330, 280],
  [370, 330],
  [560, 310],
  [550, 390],
  [470, 330],
];

export default function ParisScene() {
  return (
    <g className="paris-map">
      {arrondissements.map((a) => (
        <Fragment key={a.number}>
          <path d={a.d} className="paris-arr" />
          <T x={a.center[0]} y={a.center[1]} className="arr-label">
            {a.number}
          </T>
        </Fragment>
      ))}
      {roads.map((d) => (
        <Line key={d} d={d} c="paris-road" />
      ))}
      <Line d={seine} c="seine-bank" />
      <Line d={seine} c="seine" />
      <T x={368} y={350} className="sea-label">
        SEINE
      </T>
      <Layer steps={[1]}>
        {hubs.map(([x, y]) => (
          <Fragment key={x}>
            <Line d={`M82 510Q${x - 100} ${y + 100} ${x} ${y}`} c="stock-flow" />
            <Packet path={`M82 510Q${x - 100} ${y + 100} ${x} ${y}`} delay={x / 100} colour="#f3c88c" />
          </Fragment>
        ))}
      </Layer>
      <Layer steps={[1]}>
        <g transform="translate(860 470)" className="care-bubble">
          <path d="M0 0h96v34H24l-10 10V34H0z" />
          <T x={48} y={22} className="center chip-label strong">
            CUSTOMER CARE
          </T>
        </g>
        {rounds.map((d) => (
          <Fragment key={d}>
            <Line d={d} c="delivery-route" />
            <Packet path={d} delay={1} />
          </Fragment>
        ))}
        <Bike x={345} y={307} s={0.8} />
        <Bike x={590} y={350} s={0.8} />
        <Bike x={444} y={397} s={0.8} />
        {homes.map(([x, y]) => (
          <Fragment key={`${x}${y}`}>
            <Building x={x} y={y} s={0.22} />
            <Person x={x + 12} y={y + 5} color="#e7ba88" scale={0.4} />
          </Fragment>
        ))}
      </Layer>
      <Layer steps={[0]}>
        <rect className="map-panel" x="300" y="596" width="420" height="80" rx="4" />
        <T x={320} y={626} className="mini-label warm">
          EVENINGS AND WEEKENDS · 2016–2019
        </T>
        <T x={320} y={654} className="card-title">
          Alongside my days at SNCF
        </T>
      </Layer>
      <Layer steps={[2]}>
        <g
          className="case-link"
          transform="translate(330 600)"
          data-open-case="food-data"
          tabIndex={0}
          role="button"
          aria-label="Open the FoodChéri Data role"
        >
          <rect width="380" height="58" rx="3" />
          <T x={16} y={24} className="mini-label">
            FEB 2021 · FOODCHÉRI / SEAZON
          </T>
          <T x={16} y={44} className="label small">
            Where I later started in Data
          </T>
          <T x={362} y={36} className="chip-arrow end">
            ↗
          </T>
        </g>
      </Layer>
      <Layer steps={[1]}>
        {orders.map((o, i) => {
          const [hx, hy] = near(o);
          return (
            <Fragment key={i}>
              <Line d={`M${o[0]} ${o[1]}L${hx} ${hy}`} c="order-link" />
              <circle className="order-pin" cx={o[0]} cy={o[1]} r="5" style={vars({ '--i': i })} />
            </Fragment>
          );
        })}
        <T x={330} y={640} className="mini-label">
          EACH ORDER → THE RIGHT HUB
        </T>
      </Layer>
      {hubs.map(([x, y], i) => (
        <Inspectable
          key={i}
          id={`hub${i}`}
          title={`Delivery hub ${i + 1}`}
          body="One of the six FoodChéri hubs in Paris. Positions are illustrative."
        >
          <Building x={x} y={y} s={0.65} />
          <T x={x} y={y + 44} className="center label">{`HUB ${i + 1}`}</T>
        </Inspectable>
      ))}
      <Inspectable
        id="stock"
        title="Supply and stock"
        body="The supply point feeding the hubs. Illustrative position."
      >
        <Building x={85} y={510} s={1.05} />
        <T x={85} y={578} className="center label">
          STOCK / SUPPLY
        </T>
      </Inspectable>
      <g transform="translate(750 160)">
        <T x={0} y={0} className="mini-label">
          THE SERVICE
        </T>
        <Inspectable
          id="Hub team"
          title="Hub team"
          body="Every order depends on stock, allocation and a prepared handover."
        >
          <g transform="translate(70 70)">
            <Person x={0} y={-5} color="#a8e1e0" scale={1.1} />
            <T x={0} y={55} className="center label">
              Hub team
            </T>
          </g>
        </Inspectable>
        <Bike x={70} y={220} s={1.35} />
        <T x={70} y={269} className="center label">
          Delivery rider
        </T>
        <Person x={70} y={360} color="#d6b584" scale={1.6} />
        <T x={70} y={416} className="center label">
          Customer
        </T>
        <Line d="M70 145v30M70 290v40" c="handover" />
      </g>
    </g>
  );
}
