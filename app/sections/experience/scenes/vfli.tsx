// Earth · VFLI: the promised arrival, what I obtained at any hour in 3×8 shifts, and the years before it.
import { Fragment } from 'react';
import { at, route } from '~/drawings/france';
import { Inspectable } from '~/drawings/Inspectable';
import { CaseChip, T, vars, type Pt } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Crew, Line, TrainMarker } from '~/drawings/ops';
import { Panel, RailBase, RailCities } from '~/drawings/rail';

const freight = route(['Lille', 'Paris', 'Dijon', 'Lyon', 'Marseille']);
const abroad = [
  route(['Dijon', 'Mulhouse', 'Basel']),
  route(['Lyon', 'Geneva']),
  route(['Lyon', 'Turin', 'Milan']),
];
const [dx, dy] = at('Dijon');
const [mx, my] = at('Marseille');
const shifts = [
  ['06:00', '14:00'],
  ['14:00', '22:00'],
  ['22:00', '06:00'],
];

function PromisedArrival() {
  return (
    <Layer steps={[0]}>
      <Inspectable
        id="promise"
        title="Promised arrival"
        body="The customer pays for a train that reaches a given place at a given hour."
      >
        <g transform={`translate(${mx} ${my})`}>
          <circle className="promise-ring" r="15" />
          <path className="promise-hand" d="M0 0V-8M0 0l6 3" />
        </g>
      </Inspectable>
      <Inspectable
        id="pays"
        title="What the customer pays for"
        body="A freight train at a given place and a given hour. Route illustrative."
      >
        <g>
          <Panel x={700} y={110} w={270} h={120} />
          <T x={720} y={140} className="mini-label warm">
            WHAT THE CUSTOMER PAYS FOR
          </T>
          <T x={720} y={170} className="card-title">
            A train at a given place
          </T>
          <T x={720} y={194} className="card-title">
            and a given hour
          </T>
          <T x={720} y={216} className="mini-label muted-label">
            Lille → Marseille, illustrative
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

const Stamp = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle className="fx-stamp" r="13" />
    <path className="fx-tick" d="M-6 0l4 4 8-9" />
  </g>
);

/** The four things obtained, each played out on the map while its row is lit. */
function Effects() {
  const [px, py] = at('Paris');
  const [lx, ly] = at('Lyon');
  const [bx, by] = at('Basel');
  const [gx, gy] = at('Geneva');
  const [ix, iy] = at('Milan');
  const ev: Pt = [(px + dx) / 2, (py + dy) / 2];
  return (
    <>
      <g className="fx fx-ob-0">
        {abroad.map((d, i) => (
          <circle key={i} className="fx-packet" r="5">
            <animateMotion path={d} dur="2.4s" repeatCount="indefinite" />
          </circle>
        ))}
        <Stamp x={bx} y={by - 22} />
        <Stamp x={gx} y={gy - 22} />
        <Stamp x={ix} y={iy - 22} />
        <T x={ix + 20} y={iy - 34} className="mini-label fx-label">
          AGREED, LAST MINUTE
        </T>
      </g>
      <g className="fx fx-ob-1">
        <path className="fx-trail" d={`M${lx} ${ly}L${dx} ${dy}`} />
        <g className="fx-loco">
          <rect x="-11" y="-6" width="22" height="12" rx="3" />
          <animateMotion path={`M${lx} ${ly}L${dx} ${dy}`} dur="2s" repeatCount="indefinite" />
        </g>
        <T x={lx + 14} y={ly + 28} className="mini-label fx-label">
          LOCOMOTIVE FROM ANOTHER COMPANY
        </T>
      </g>
      <g className="fx fx-ob-2">
        <path className="fx-trail" d={`M${px} ${py}L${dx} ${dy}`} />
        <g className="fx-driver">
          <Crew x={0} y={0} s={0.75} />
          <animateMotion path={`M${px} ${py}L${dx} ${dy}`} dur="2s" repeatCount="indefinite" />
        </g>
        <T x={px + 14} y={py - 14} className="mini-label fx-label">
          DRIVER FROM ANOTHER COMPANY
        </T>
      </g>
      <g className="fx fx-ob-3">
        <g transform={`translate(${ev[0]} ${ev[1]})`}>
          <circle className="fx-alarm" r="16" />
          <path className="fx-warn" d="M0-12L11 8H-11Z" />
        </g>
        {[at('Lyon'), at('Paris')].map(([x, y], i) => (
          <Fragment key={i}>
            <circle className="fx-coord" cx={x} cy={y} r="14" />
            <path className="fx-call" d={`M${x} ${y}L${ev[0]} ${ev[1]}`} />
          </Fragment>
        ))}
        <T x={ev[0] + 22} y={ev[1] + 4} className="mini-label fx-label">
          EVENT HANDLED WITH THE COORDINATORS
        </T>
      </g>
    </>
  );
}

const obtained: [string, string][] = [
  ['Circulation agreements', 'Last minute, France and abroad'],
  ['A shunting locomotive', 'I convinced a company to provide one'],
  ['A driver', 'I convinced a company to provide one'],
  ['Every unexpected event', 'Handled with regional coordinators'],
];

function ObtainIt() {
  return (
    <Layer steps={[1]}>
      {abroad.map((d, i) => (
        <Fragment key={i}>
          <Line d={d} c="route-glow" />
          <Line d={d} c="international-route" />
        </Fragment>
      ))}
      <Effects />
      <circle className="partner-ring" cx={dx} cy={dy} r="18" />
      <Line d={`M${dx + 18} ${dy - 4}L650 170`} c="leader" />
      <Panel x={650} y={96} w={320} h={264} />
      <T x={670} y={124} className="mini-label warm">
        WHAT I OBTAINED, AT ANY HOUR
      </T>
      {obtained.map(([t, s2], i) => (
        <Inspectable key={t} id={`ob-${i}`} title={t} body={`${s2}.`}>
          <g transform={`translate(670 ${150 + i * 52})`}>
            <rect
              className="tm-loco"
              x="0"
              y="-2"
              width="14"
              height="8"
              rx="2"
              style={i === 3 ? vars({ fill: 'var(--data)' }) : undefined}
            />
            <T x={24} y={6} className="card-title small-title">
              {t}
            </T>
            <T x={24} y={26} className="card-body">
              {s2}
            </T>
          </g>
        </Inspectable>
      ))}
      <Panel x={40} y={560} w={920} h={120} />
      <T x={60} y={590} className="mini-label">
        3×8 · DAY AND NIGHT
      </T>
      {shifts.map(([a, b], i) => (
        <g key={a} transform={`translate(${60 + i * 300} 610)`}>
          <rect className="shift" width="280" height="40" rx="3" />
          <T x={14} y={26} className="chip-label strong">{`${a} → ${b}`}</T>
        </g>
      ))}
    </Layer>
  );
}

const ticks: [string, number][] = [
  ['Y−3', 60],
  ['Y−2', 290],
  ['Y−1', 520],
  ['D−1', 800],
  ['D', 940],
];
const clockPath =
  'M60 66H310C322 66 322 92 334 92H476C488 92 488 66 500 66H566C574 66 574 92 586 92H694C706 92 706 66 718 66H940';
const clockNodes: [number, string, string][] = [
  [60, 'REQUEST', 'The customer’s need, two or three years ahead.'],
  [520, 'NEGOTIATE', 'Defended before the entity granting the agreements.'],
  [800, 'AGREED', 'I obtained the path and kept it until the day the train runs.'],
];

function YearsBefore() {
  return (
    <Layer steps={[2]} transform="translate(0 470)">
      <Panel x={40} y={0} w={920} h={180} />
      <T x={60} y={32} className="mini-label warm">
        THE YEARS BEFORE · ONE CUSTOMER PATH
      </T>
      <Line d="M60 82H940" c="clock-axis" />
      {ticks.map(([l, x]) => (
        <Fragment key={l}>
          <Line d={`M${x} 76V88`} c="clock-axis" />
          <T x={x} y={110} className="center axis-label">
            {l}
          </T>
        </Fragment>
      ))}
      <Inspectable
        id="wk-v"
        title="Engineering works"
        body="Works close sections of the network for a period: paths are built around them years ahead."
      >
        <g>
          <rect className="works-window" x="330" y="56" width="150" height="20" rx="2" />
          <T x={405} y={50} className="center mini-label warm">
            WORKS
          </T>
        </g>
      </Inspectable>
      <Inspectable id="ot-v" title="Other traffic" body="Other operators want the same capacity.">
        <g>
          <rect className="other-use" x="580" y="56" width="120" height="20" rx="2" />
          <T x={640} y={50} className="center mini-label">
            OTHER TRAFFIC
          </T>
        </g>
      </Inspectable>
      <Line d={clockPath} c="clock-path" />
      <circle className="clock-dot" r="6">
        <animateMotion path={clockPath} dur="7s" repeatCount="indefinite" />
      </circle>
      {clockNodes.map(([x, l, body]) => (
        <Inspectable key={l} id={`ck-${l}`} title={l.charAt(0) + l.slice(1).toLowerCase()} body={body}>
          <g>
            <circle className="clock-node" cx={x} cy="66" r="5" />
            <T x={x + 8} y={140} className="mini-label">
              {l}
            </T>
          </g>
        </Inspectable>
      ))}
    </Layer>
  );
}

export default function VfliScene() {
  return (
    <>
      <RailBase network={[0, 1, 2]} />
      <Line d={freight} c="route-glow" />
      <Line d={freight} c="active-route" />
      <TrainMarker path={freight} dur={24} begin={0} />
      <RailCities />
      <PromisedArrival />
      <ObtainIt />
      <YearsBefore />
      <Layer steps={[2]}>
        <CaseChip
          x={640}
          y={96}
          w={320}
          to="rail"
          kicker="NEXT · SNCF RÉSEAU"
          sub="Network capacity, years ahead"
        />
      </Layer>
    </>
  );
}
