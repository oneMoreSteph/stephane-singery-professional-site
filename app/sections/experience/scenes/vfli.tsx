// Earth · VFLI: the promised arrival, what I obtained in 3×8 shifts whatever the constraints, and the years before it.
import { Fragment } from 'react';
import { at, mid, route } from '~/drawings/france';
import { Inspectable } from '~/drawings/Inspectable';
import { CaseChip, Lab, Sub, T, User, vars } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Console, Line, TrainMarker } from '~/drawings/ops';
import { Panel, RailBase, RailCities } from '~/drawings/rail';

const freight = route(['Lille', 'Paris', 'Dijon', 'Lyon', 'Marseille']);
const abroad = [
  route(['Dijon', 'Mulhouse', 'Basel']),
  route(['Lyon', 'Geneva']),
  route(['Lyon', 'Turin', 'Milan']),
];
const [mx, my] = at('Marseille');
// The right-hand column, clear of the map.
const X = 700;

/** A small locomotive, side view. */
const Loco = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-veh" transform={`translate(${x} ${y})`}>
    <rect x="0" y="6" width="54" height="18" rx="2" />
    <rect x="34" y="-6" width="20" height="14" rx="2" />
    <circle cx="12" cy="27" r="5" />
    <circle cx="42" cy="27" r="5" />
  </g>
);

/** A signed document: the circulation agreement. */
const Agreement = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect className="tx-doc" width="40" height="50" rx="3" />
    <path className="tx-grid" d="M7 12H33M7 21H33M7 30H26" />
    <circle className="tx-stage on" cx="31" cy="41" r="7" />
  </g>
);

function PromisedArrival() {
  return (
    <Layer steps={[0]}>
      {/* The panel sits in the map’s emptiest corner: top right, above the labels */}
      <g transform="translate(0 -56)">
        <Panel x={X - 16} y={96} w={292} h={300} />
        <Inspectable
          id="vf-order"
          title="A transport order"
          body="What a freight customer buys: a train at a given place and a given hour.|The promise every shift worked to keep."
        >
          <g>
            <Lab x={X} y={126} t="TRANSPORT ORDER" c="warm" />
            {(
              [
                ['TRAIN', 'Freight train'],
                ['TO', 'A given place'],
                ['ARRIVAL', 'A given hour'],
              ] as const
            ).map(([k, v], i) => (
              <Fragment key={k}>
                <rect className="tx-table-row" x={X} y={144 + i * 44} width="260" height="36" rx="3" />
                <Lab x={X + 12} y={167 + i * 44} t={k} />
                <Sub x={X + 110} y={167 + i * 44} t={v} />
              </Fragment>
            ))}
            <Sub x={X} y={300} t="Lille → Marseille, illustrative" />
          </g>
        </Inspectable>
        <Inspectable
          id="vf-arrival"
          title="The promised arrival"
          body="The place and hour the customer paid for.|Every disruption on the way put it at risk."
        >
          {/* Drawn on the map: undo the panel’s offset. */}
          <g transform={`translate(${mx} ${my + 56})`}>
            <circle className="tx-promise" r="16" />
            <path className="tx-promise" d="M0 0V-9M0 0l7 4" />
          </g>
        </Inspectable>
        <Inspectable
          id="vf-breaks"
          title="A plan can break at any moment"
          body="Incidents, works, missing resources: the network keeps moving.|Each one can stop a train short of its promise."
        >
          <g>
            {[mid('Paris', 'Dijon'), mid('Lyon', 'Marseille'), mid('Lille', 'Paris')].map(([x, y], i) => (
              <circle
                key={i}
                className="tx-ping"
                cx={x}
                cy={y + 56}
                r="12"
                style={vars({ animationDelay: `${i * 0.5}s` })}
              />
            ))}
            <Lab x={X} y={350} t="THE NETWORK KEEPS MOVING" />
            <Sub x={X} y={372} t="A plan can break at any moment" />
          </g>
        </Inspectable>
      </g>
    </Layer>
  );
}

const obtained: [string, string, string, string, React.ReactNode][] = [
  [
    'vf-agreement',
    'CIRCULATION AGREEMENTS',
    'Last minute, France and abroad',
    'Permission for a train to run on a given route and time.|I obtained them at the last minute, in France and abroad.',
    <Agreement x={X} y={0} />,
  ],
  [
    'vf-loco',
    'A SHUNTING LOCOMOTIVE',
    'Provided by a company I convinced',
    'The engine that moves wagons in a yard.|When ours was missing, I convinced another company to make one available.',
    <Loco x={X - 6} y={10} />,
  ],
  [
    'vf-driver',
    'A DRIVER',
    'Provided by a company I convinced',
    'A qualified driver for the route and the engine.|When one was missing, I convinced another company to make one available.',
    <User x={X + 20} y={42} s={1.1} c="on" />,
  ],
  [
    'vf-agents',
    'PREPARATION AGENTS',
    'Ready to leave, received on arrival',
    'Agents who prepare a train for departure, or receive it on arrival.|I obtained them where our trains needed them.',
    <g>
      <User x={X + 8} y={42} s={0.9} c="on" />
      <User x={X + 36} y={42} s={0.9} c="on" />
    </g>,
  ],
  [
    'vf-yard',
    'A YARD',
    'To store the trains safely',
    'A marshalling yard: tracks where trains and wagons wait between runs.|I obtained a place to store our trains safely.',
    <g className="tx-icon">
      <path d={`M${X} 36L${X + 22} 24H${X + 56}M${X} 36H${X + 56}M${X} 36L${X + 22} 48H${X + 56}`} />
      <rect x={X + 30} y={19} width="18" height="9" rx="2" />
      <rect x={X + 30} y={43} width="18" height="9" rx="2" />
    </g>,
  ],
  [
    'vf-events',
    'EVERY UNEXPECTED EVENT',
    'With the regional coordinators',
    'Incidents on our trains, day and night.|I handled each one with the regional network coordinators.',
    <Console x={X + 20} y={26} s={0.8} />,
  ],
];

function ObtainIt() {
  return (
    <Layer steps={[1]}>
      {abroad.map((d, i) => (
        <Fragment key={i}>
          <Line d={d} c="route-glow" />
          <Line d={d} c="active-route warm-route" />
        </Fragment>
      ))}
      {/* The panel sits in the map’s emptiest corner: top right, above the labels */}
      <g transform="translate(0 -46)">
        <Panel x={682} y={86} w={290} h={590} />
        <Inspectable
          id="vf-shifts"
          title="3×8 shifts, day and night"
          body="Three eight-hour shifts covered the whole day.|Trains run at any hour: so did my job."
        >
          <g>
            <Lab x={X} y={114} t="3×8 · DAY AND NIGHT" c="warm" />
            {[0, 1, 2].map((i) => {
              const a0 = (i * 120 - 90) * (Math.PI / 180);
              const a1 = ((i + 1) * 120 - 92) * (Math.PI / 180);
              const [cx, cy, r] = [X + 60, 186, 46];
              return (
                <path
                  key={i}
                  className={`tx-arc${i === 2 ? ' night' : ''}`}
                  d={`M${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)}A${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}`}
                />
              );
            })}
            <circle className="tx-stop" cx={X + 60} cy={186} r="4" />
            {['06–14', '14–22', '22–06'].map((t, i) => (
              <Sub key={t} x={X + 140} y={160 + i * 26} t={t} />
            ))}
          </g>
        </Inspectable>
        <Lab x={X} y={270} t="WHAT I OBTAINED" c="strong" />
        {obtained.map(([id, t, s, body, icon], i) => (
          <Inspectable key={id} id={id} title={t.charAt(0) + t.slice(1).toLowerCase()} body={body}>
            <g>
              <g transform={`translate(694 ${296 + i * 64}) scale(0.75) translate(${-X} 0)`}>{icon}</g>
              <Lab x={748} y={310 + i * 64} t={t} />
              <Sub x={748} y={332 + i * 64} t={s} />
            </g>
          </Inspectable>
        ))}
      </g>
    </Layer>
  );
}

const ahead: [string, number][] = [
  ['Y−3', 0],
  ['Y−2', 1],
  ['Y−1', 2],
  ['D', 3.4],
];

function YearsBefore() {
  return (
    <Layer steps={[2]}>
      {/* The panel sits in the map’s emptiest corner: top right, above the labels */}
      <g transform="translate(0 -46)">
        <Panel x={X - 16} y={86} w={292} h={330} />
        <Inspectable
          id="vf-day"
          title="The day itself"
          body="At VFLI: the day of circulation, live.|Where I learned what a train needs to run."
        >
          <g>
            <Lab x={X} y={114} t="AT VFLI · THE DAY ITSELF" />
            <circle className="tx-stage on" cx={X + 250} cy={160} r="10" />
          </g>
        </Inspectable>
        <Inspectable
          id="vf-years"
          title="The years before it"
          body="Network capacity is planned two or three years ahead.|My next role started there."
        >
          <g>
            <path className="tx-route" d={`M${X} 160H${X + 250}`} />
            {ahead.map(([t, k]) => (
              <Fragment key={t}>
                <circle className={k === 3.4 ? 'tx-stop' : 'tx-stage'} cx={X + k * 73} cy={160} r="6" />
                <T x={X + k * 73} y={190} className="center tx-win-t">
                  {t}
                </T>
              </Fragment>
            ))}
            <path className="tx-beam" d={`M${X + 240} 216H${X + 10}`} />
            <Lab x={X} y={250} t="2012 · SNCF RÉSEAU" c="warm" />
            <Sub x={X} y={272} t="Manager of the French rail network" />
            <Sub x={X} y={294} t="Goal: network capacity for freight" />
          </g>
        </Inspectable>
        <CaseChip
          x={X - 6}
          y={330}
          w={272}
          to="rail"
          kicker="NEXT · SNCF RÉSEAU"
          sub="Network capacity, years ahead"
        />
      </g>
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
    </>
  );
}
