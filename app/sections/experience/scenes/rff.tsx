// Earth · SNCF Réseau: one shared network, my portfolio of freight customers, the years each request lasted, and next.
import { Fragment } from 'react';
import { mid, route } from '~/drawings/france';
import { Inspectable } from '~/drawings/Inspectable';
import { CaseChip, Lab, Sub, T, User } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Line, TrainMarker } from '~/drawings/ops';
import { Panel, RailBase, RailCities } from '~/drawings/rail';

const lines = [
  route(['Lille', 'Paris', 'Dijon', 'Lyon', 'Marseille']),
  route(['Paris', 'Metz', 'Strasbourg']),
  route(['Bordeaux', 'Lyon']),
];
const others = [
  route(['Paris', 'Rennes', 'Nantes', 'Bordeaux', 'Toulouse']),
  route(['Paris', 'Metz', 'Strasbourg', 'Mulhouse']),
  route(['Toulouse', 'Marseille']),
];
const works = [mid('Dijon', 'Lyon'), mid('Bordeaux', 'Toulouse')];
// The right-hand column, clear of the map.
const X = 700;

/** Train-path graph: time across, distance down. Each line is one train path on the same line. */
function PathGraph() {
  const paths: [number, string][] = [
    [0, 'other'],
    [40, 'mine'],
    [70, 'other'],
    [112, 'other'],
    [150, 'mine'],
    [160, 'other'],
  ];
  return (
    <g>
      <rect className="tx-win-bg" x={X} y={300} width="256" height="170" rx="5" />
      <path className="tx-axis" d={`M${X + 34} 316V452H${X + 244}`} />
      {['A', 'B', 'C'].map((s, i) => (
        <Fragment key={s}>
          <T x={X + 16} y={326 + i * 60} className="tx-win-t">
            {s}
          </T>
          <path className="tx-grid" d={`M${X + 34} ${322 + i * 60}H${X + 244}`} />
        </Fragment>
      ))}
      {paths.map(([t, k]) => (
        <path key={t} className={`tx-tpath ${k}`} d={`M${X + 40 + t} 322L${X + 88 + t} 442`} />
      ))}
      <rect className="tx-conflict" x={X + 96} y={368} width="70" height="28" rx="3" />
    </g>
  );
}

function SharedNetwork() {
  return (
    <Layer steps={[0]}>
      <g>
        {others.map((d, i) => (
          <TrainMarker key={i} path={d} dur={18 + i * 4} begin={i * 5} c="other-op" />
        ))}
        <TrainMarker path={lines[0]} dur={24} begin={2} />
        <TrainMarker path={lines[1]} dur={16} begin={6} />
      </g>
      <Inspectable
        id="rr-works"
        title="Engineering works"
        body="Works close sections of the network for a period.|They take capacity away from every operator."
      >
        <g>
          {works.map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect className="works-mark" x="-12" y="-6" width="24" height="12" rx="2" />
              <circle className="works-ping" r="16" />
            </g>
          ))}
        </g>
      </Inspectable>
      {/* The panel sits in the map’s emptiest corner: bottom right, over the sea */}
      <g transform="translate(0 184)">
        <Panel x={X - 16} y={86} w={290} h={420} />
        <Inspectable
          id="rr-operators"
          title="Every operator, the same network"
          body="Freight and passenger trains of every operator share the same lines.|Each wants the same capacity, at the same hours."
        >
          <g>
            <Lab x={X} y={116} t="ONE NETWORK, SHARED" c="warm" />
            {(
              [
                ['tm-loco', 'Freight trains', 'My customers’ trains'],
                ['tm-car other', 'Other operators', 'Passenger and freight'],
                ['works-mark', 'Engineering works', 'Capacity taken away'],
              ] as const
            ).map(([c, t, s], i) => (
              <Fragment key={t}>
                <rect className={c} x={X} y={140 + i * 46} width="22" height="11" rx="2" />
                <Lab x={X + 36} y={150 + i * 46} t={t.toUpperCase()} />
                <Sub x={X + 36} y={170 + i * 46} t={s} />
              </Fragment>
            ))}
          </g>
        </Inspectable>
        <Inspectable
          id="rr-paths"
          title="Train paths on one line"
          body="A train path: one train’s slot on a line, in time and distance.|Operators compete for the same paths: where they collide, only one can run."
        >
          <g>
            <Lab x={X} y={288} t="TRAIN PATHS · ONE LINE" />
            <PathGraph />
            <Sub x={X} y={494} t="Same paths, same hours" />
          </g>
        </Inspectable>
      </g>
    </Layer>
  );
}

const portfolio: [string, string][] = [
  ['Greenmodal (CMA CGM)', 'Freight customer'],
  ['Freight customer', 'Illustrative'],
  ['Freight customer', 'Illustrative'],
];
const process: [string, string, string, React.ReactNode][] = [
  [
    'BUILT THE REQUESTS',
    'Schedules that fit their business',
    'A request: the train schedules a customer needs on the network.|I built each one around the customer’s business.',
    <g>
      <rect className="tx-doc" x="0" y="-26" width="30" height="38" rx="3" />
      <path className="tx-grid" d="M5-16H25M5-8H25M5 0H18" />
    </g>,
  ],
  [
    'DEFENDED THEM',
    'Before the granting entity',
    'The entity that grants the network capacity.|I defended each request before it.',
    <g>
      <rect className="tx-app" x="-2" y="-14" width="36" height="20" rx="10" />
      <User x={4} y={-16} s={0.5} />
      <User x={28} y={-16} s={0.5} />
    </g>,
  ],
  [
    'OBTAINED THE SCHEDULES',
    'Agreed train paths',
    'The agreed train paths, at the times requested.|What each customer needed to run its business.',
    <g>
      <rect className="tx-doc" x="0" y="-26" width="30" height="38" rx="3" />
      <circle className="tx-stage on" cx="24" cy="4" r="7" />
    </g>,
  ],
];

function Customers() {
  return (
    <Layer steps={[1]}>
      {lines.map((d, i) => (
        <g key={i}>
          <Line d={d} c="route-glow" />
          <Line d={d} c="active-route" />
          <TrainMarker path={d} dur={[24, 14, 16][i]} begin={i * 3} />
        </g>
      ))}
      {/* The panel sits in the map’s emptiest corner: bottom right, over the sea */}
      <g transform="translate(0 98)">
        <Panel x={X - 16} y={86} w={290} h={506} />
        <Lab x={X} y={116} t="MY PORTFOLIO" c="warm" />
        {portfolio.map(([t, s], i) => (
          <Inspectable
            key={i}
            id={`rr-cust-${i}`}
            title={t}
            body={
              i
                ? 'A freight customer of my portfolio. Illustrative row.|Each one with its own schedules to secure.'
                : 'Greenmodal (CMA CGM): a freight customer of my portfolio.|I represented its capacity needs on the network.'
            }
          >
            <g>
              <rect className="tx-table-row" x={X} y={132 + i * 50} width="258" height="42" rx="3" />
              <rect className="tm-loco" x={X + 12} y={148 + i * 50} width="16" height="9" rx="2" />
              <Lab x={X + 40} y={150 + i * 50} t={t} />
              <Sub x={X + 40} y={168 + i * 50} t={s} />
            </g>
          </Inspectable>
        ))}
        <Lab x={X} y={318} t="FOR EACH ONE" c="strong" />
        {process.map(([t, s, body, icon], i) => (
          <Inspectable key={t} id={`rr-proc-${i}`} title={t.charAt(0) + t.slice(1).toLowerCase()} body={body}>
            <g>
              <g transform={`translate(${X + 4} ${376 + i * 90})`}>{icon}</g>
              <Lab x={X + 54} y={366 + i * 90} t={t} />
              <Sub x={X + 54} y={388 + i * 90} t={s} />
              {i < 2 && <path className="tx-link" d={`M${X + 18} ${394 + i * 90}V${436 + i * 90}`} />}
            </g>
          </Inspectable>
        ))}
      </g>
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

function LongMissions() {
  return (
    <Layer steps={[2]}>
      <Line d={lines[0]} c="route-glow" />
      <Line d={lines[0]} c="active-route" />
      <TrainMarker path={lines[0]} dur={24} begin={6} />
      <Panel x={X - 16} y={86} w={290} h={200} />
      <Lab x={X} y={116} t="MOMENTS FROM THESE YEARS" c="warm" />
      <CaseChip x={X - 4} y={132} w={266} to="toyota" kicker="HIGH-STAKES · TOYOTA" sub="Europe, 2013" />
      <CaseChip
        x={X - 4}
        y={200}
        w={266}
        to="tour"
        kicker="HIGH-STAKES · TOUR"
        sub="Level crossings, five years"
      />
      <g transform="translate(0 520)">
        <Panel x={40} y={0} w={920} h={170} />
        <Lab x={60} y={30} t="ONE CUSTOMER REQUEST · YEARS AHEAD" c="warm" />
        <Inspectable
          id="rr-years"
          title="Two or three years ahead"
          body="Each request started two or three years before the train ran.|I kept it alive until the day of circulation."
        >
          <g>
            <path className="tx-route" d="M60 100H940" />
            {ticks.map(([l, x]) => (
              <Fragment key={l}>
                <circle className={l === 'D' ? 'tx-stage on' : 'tx-stage'} cx={x} cy={100} r="7" />
                <T x={x} y={132} className="center tx-win-t">
                  {l}
                </T>
              </Fragment>
            ))}
          </g>
        </Inspectable>
        <Inspectable
          id="rr-wk"
          title="Engineering works"
          body="Works take capacity away for a period.|The request had to hold through them."
        >
          <g>
            <rect className="works-window" x="330" y="64" width="150" height="20" rx="2" />
            <Lab x={405} y={56} t="WORKS" c="center" />
          </g>
        </Inspectable>
        <Inspectable
          id="rr-od"
          title="Competing demands"
          body="Other operators wanted the same capacity.|The request had to hold against them."
        >
          <g>
            <rect className="tx-conflict" x="580" y="64" width="120" height="20" rx="2" />
            <Lab x={640} y={56} t="COMPETING DEMANDS" c="center" />
          </g>
        </Inspectable>
        <Inspectable
          id="rr-runs"
          title="Until the train ran"
          body="The day of circulation: the train runs on its agreed path.|The end of years of work on one request."
        >
          <g>
            <path className="tx-promise" d="M60 100H940" />
            <Lab x={940} y={160} t="THE TRAIN RUNS" c="end warm" />
          </g>
        </Inspectable>
      </g>
    </Layer>
  );
}

function Next() {
  return (
    <Layer steps={[3]}>
      {/* The panel sits in the map’s emptiest corner: bottom right, over the sea */}
      <g transform="translate(0 354)">
        <Panel x={X - 16} y={86} w={290} h={250} />
        <Inspectable
          id="rr-nov16"
          title="November 2016"
          body="I moved to the passenger side of the railway: Transilien Ligne C.|From capacity years ahead to passengers, every day."
        >
          <g>
            <Lab x={X} y={116} t="NOVEMBER 2016" c="warm" />
            <T x={X} y={150} className="card-title">
              Toward passengers
            </T>
            <Sub x={X} y={176} t="From capacity years ahead" />
            <Sub x={X} y={196} t="to passengers, every day" />
          </g>
        </Inspectable>
        <CaseChip
          x={X - 4}
          y={232}
          w={266}
          to="ligne-c"
          kicker="NEXT · TRANSILIEN LIGNE C"
          sub="Passenger care, 42 stations"
        />
      </g>
    </Layer>
  );
}

export default function RffScene() {
  return (
    <>
      <RailBase network={[0, 1, 2]} />
      <SharedNetwork />
      <Customers />
      <LongMissions />
      <Next />
      <RailCities />
    </>
  );
}
