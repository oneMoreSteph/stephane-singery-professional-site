// Juice · How my experience transfers: what each role gives me, and where it plugs into a space system.
import { Fragment } from 'react';
import { at, FranceRail, mid, route } from '~/drawings/france';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  CaseChip,
  Check,
  Db,
  Graph,
  Header,
  Lab,
  Move,
  OpsDefs,
  Spark,
  Sub,
  T,
  User,
  vars,
  Win,
  type Pt,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

/** The band at the bottom of each step: what I bring, and the case that proves it. */
function Bring({ t, children }: { t: string; children: React.ReactNode }) {
  return (
    <>
      <path className="tx-div" d="M40 566H960" />
      <Lab x={40} y={600} t="WHAT I BRING" c="strong" />
      <Sub x={40} y={624} t={t} />
      {children}
    </>
  );
}

const rows: [string, string, string, string, React.ReactNode][] = [
  [
    'tr-cap',
    'Freight capacity',
    'FREIGHT CAPACITY',
    'Two or three years ahead',
    <>
      <rect x="-16" y="-14" width="32" height="30" rx="2" />
      <path d="M-16-5H16M-8-20V-10M8-20V-10" />
    </>,
  ],
  [
    'tr-rec',
    'Live recovery',
    'LIVE RECOVERY',
    'Day and night, trains moving',
    <path d="M15-6A16 16 0 1 0 16 6M15-16V-6H5" />,
  ],
  [
    'tr-care',
    'Passenger care',
    'PASSENGER CARE',
    'Ligne C, 42 stations',
    <>
      <circle cy="-11" r="6" />
      <path d="M-13 16V8A13 11 0 0 1 13 8V16" />
    </>,
  ],
];
const rowY = (i: number) => 150 + i * 120;
const trips = [
  ['Paris', 'Dijon', 'Lyon', 'Marseille'],
  ['Lille', 'Paris', 'Rennes', 'Nantes', 'Bordeaux'],
  ['Bordeaux', 'Lyon'],
];
const cityLabels: [string, number, number][] = [
  ['Paris', 12, -8],
  ['Lyon', 12, 16],
  ['Bordeaux', -68, 18],
  ['Marseille', -30, 26],
  ['Lille', 12, 0],
];
const [pingX, pingY] = mid('Dijon', 'Lyon');

function Network() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={92} t="THE SNCF NETWORK, LIVE" c="strong" />
      <Inspectable id="tr-net" title="A moving system">
        <g>
          <g transform="translate(-40 40) scale(.82)">
            <FranceRail />
            {trips.map((r, i) => (
              <Move key={i} path={route(r)} dur={14 + i * 3} begin={i * 3}>
                <circle className="tx-alert" r="7" />
              </Move>
            ))}
            <circle className="tx-ping" cx={pingX} cy={pingY} r="20" />
          </g>
          {cityLabels.map(([c, dx, dy]) => {
            const [x, y] = at(c);
            return (
              <Fragment key={c}>
                <circle
                  className="tx-stop"
                  cx={(x * 0.82 - 40).toFixed(1)}
                  cy={(y * 0.82 + 40).toFixed(1)}
                  r="4"
                />
                <Sub x={(x * 0.82 - 40 + dx).toFixed(1)} y={(y * 0.82 + 40 + dy).toFixed(1)} t={c} />
              </Fragment>
            );
          })}
        </g>
      </Inspectable>
      {rows.map(([id, title, t, s, icon], i) => (
        <Fragment key={id}>
          <Arrow from={[462, 300]} to={[500, rowY(i)]} />
          <Inspectable id={id} title={title}>
            <g>
              <circle className="tx-stage" cx="545" cy={rowY(i)} r="38" />
              <g className="tx-icon" transform={`translate(545 ${rowY(i)})`}>
                {icon}
              </g>
              <Lab x={598} y={rowY(i) - 4} t={t} />
              <Sub x={598} y={rowY(i) + 18} t={s} />
            </g>
          </Inspectable>
          <Arrow from={[792, rowY(i)]} to={[866, rowY(i)]} />
        </Fragment>
      ))}
      <Inspectable id="tr-people" title="The people acting">
        <g>
          <Lab x={905} y={96} t="PEOPLE" c="center" />
          <Lab x={905} y={114} t="ACTING" c="center" />
          {[0, 1, 2].map((i) => (
            <User key={i} x={905} y={rowY(i) + 18} c="on" />
          ))}
        </g>
      </Inspectable>
      <Bring t="Decisions inside moving systems, that reach the people acting.">
        <CaseChip x={560} y={578} w={400} to="rail" kicker="EARTH · SNCF" sub="The proof, where it lives" />
      </Bring>
    </Layer>
  );
}

const hub: Pt = [500, 270];
const ringR = 130;
const onRing = (deg: number): Pt =>
  [hub[0] + ringR * Math.cos((deg * Math.PI) / 180), hub[1] + ringR * Math.sin((deg * Math.PI) / 180)].map(
    (v) => +v.toFixed(1),
  ) as Pt;
const Draw = ({ d, i }: { d: string; i: number }) => (
  <path className="tx-draw" style={vars({ '--i': i })} pathLength={1} d={d} />
);
const productPoints: Pt[] = [
  [790, 480],
  [815, 455],
  [842, 470],
  [860, 440],
  [890, 448],
  [915, 428],
  [935, 436],
];
const teams: [string, number, number, number, React.ReactNode][] = [
  ['OPERATIONS', 40, 110, 200, <Draw d="M58 210L90 180 122 195 154 160 186 170 222 148" i={0} />],
  ['SUPPLY', 40, 250, 160, <Bars x={58} y={288} w={164} h={70} vals={[0.5, 0.8, 0.35, 0.9, 0.6, 0.75]} />],
  [
    'MARKETING',
    40,
    390,
    160,
    <>
      <circle className="tx-donut" cx="140" cy="466" r="30" />
      <circle className="tx-donut on" style={vars({ '--i': 2 })} pathLength={100} cx="140" cy="466" r="30" />
    </>,
  ],
  [
    'FINANCE',
    760,
    110,
    160,
    <>
      <path className="tx-axis" d="M778 148V212H942" />
      <Draw d="M778 200L815 188 852 192 889 165 942 152" i={3} />
    </>,
  ],
  [
    'CUSTOMER CARE',
    760,
    250,
    200,
    <g className="tx-rows">
      {[0, 1, 2, 3].map((i) => (
        <Fragment key={i}>
          <path d={`M778 ${292 + i * 18}H${[900, 870, 915, 840][i]}`} />
          <circle cx="932" cy={292 + i * 18} r="4" />
        </Fragment>
      ))}
    </g>,
  ],
  [
    'PRODUCT',
    760,
    390,
    180,
    <g className="tx-graph">
      {productPoints.map(([x, y], i) => (
        <circle key={i} style={vars({ '--i': i })} cx={x} cy={y} r="5" />
      ))}
    </g>,
  ],
];
const spokes: [number, number, number][] = [
  [200, 243, 170],
  [180, 243, 310],
  [160, 243, 450],
  [-20, 757, 170],
  [0, 757, 310],
  [20, 757, 450],
];
const enablers: [string, string, string, number, number, number, React.ReactNode][] = [
  [
    'tr-tool',
    'Tool choice',
    'TOOL CHOICE',
    -90,
    0,
    -34,
    <>
      <rect x="-12" y="-11" width="24" height="18" rx="2" />
      <path d="M-6 3V-2M0 3V-6M6 3V-3M-5 12H5" />
    </>,
  ],
  [
    'tr-train',
    'Training',
    'TRAINING',
    125,
    0,
    42,
    <path d="M-14-4L0-10 14-4 0 2ZM-8 0V6C-4 10 4 10 8 6V0" />,
  ],
  [
    'tr-support',
    'Support',
    'SUPPORT',
    55,
    0,
    42,
    <path d="M-11 2V-1A11 11 0 0 1 11-1V2M-13 2H-8V10H-13ZM8 2H13V10H8Z" />,
  ],
];

function SharedCapability() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={92} t="FOODCHÉRI · ONE PLATFORM, EVERY TEAM" c="strong" />
      <circle className="tx-ring" cx={hub[0]} cy={hub[1]} r={ringR} />
      {spokes.map(([deg, x, y]) => (
        <Arrow key={`${x}${y}`} from={onRing(deg)} to={[x, y]} />
      ))}
      <Inspectable id="tr-plat" title="The first Data Platform">
        <g>
          <Lab x={500} y={192} t="DATA PLATFORM" c="center strong" />
          <Db cx={500} y={204} w={130} h={118} />
          <Sub x={500} y={344} t="The first one" c="center" />
        </g>
      </Inspectable>
      {enablers.map(([id, title, t, deg, dx, dy, icon]) => {
        const [x, y] = onRing(deg);
        return (
          <Inspectable key={id} id={id} title={title}>
            <g>
              <circle className="tx-stage" cx={x} cy={y} r="23" />
              <g className="tx-icon" transform={`translate(${x} ${y})`}>
                {icon}
              </g>
              <Lab x={x + dx} y={y + dy + 5} t={t} c="center" />
            </g>
          </Inspectable>
        );
      })}
      {teams.map(([t, x, y, h, chart], i) => (
        <Inspectable key={t} id={`tr-team-${i}`} title={t.charAt(0) + t.slice(1).toLowerCase()}>
          <Win x={x} y={y} w={200} h={Math.min(h, 120)} title={t}>
            {chart}
          </Win>
        </Inspectable>
      ))}
      <Inspectable id="tr-users" title="People building analyses">
        <g>
          {Array.from({ length: 25 }, (_, i) => (
            <User
              key={i}
              x={284 + i * 18}
              y={472}
              s={0.5}
              c={i < 2 ? 'on' : 'tx-lit-seq'}
              style={vars({ '--i': i })}
            />
          ))}
          <Lab x={500} y={500} t="ACTIVE ANALYSIS PRODUCERS" c="center" />
          <T x={500} y={544} className="tx-big center">
            2 → 25
          </T>
        </g>
      </Inspectable>
      <Bring t="Capabilities other people can use.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="food-data"
          kicker="EARTH · FOODCHÉRI DATA"
          sub="The proof, where it lives"
        />
      </Bring>
    </Layer>
  );
}

function Beneath() {
  return (
    <Layer steps={[2]}>
      <Inspectable id="tr-answer" title="The visible answer">
        <g>
          <Win x={390} y={76} w={220} h={104} title="THE VISIBLE ANSWER">
            <Bars x={406} y={108} w={188} h={62} vals={[0.4, 0.7, 0.5, 0.9, 0.65, 0.8]} />
          </Win>
          <User x={655} y={180} c="on" />
        </g>
      </Inspectable>
      <path className="tx-route" d="M40 188H960" />
      <Lab x={40} y={222} t="BENEATH THE VISIBLE ANSWER" c="strong" />
      <Arrow from={[250, 262]} to={[400, 196]} />
      <Arrow from={[740, 262]} to={[600, 196]} />
      <Lab x={40} y={254} t="HEETCH" />
      <Lab x={520} y={254} t="VERISURE" />
      <Inspectable id="tr-logic" title="Transformation logic">
        <Win x={40} y={266} w={270} h={280} title="TRANSFORMATION LOGIC">
          <Graph
            nodes={[
              [75, 340],
              [75, 410],
              [75, 480],
              [175, 370],
              [175, 450],
              [275, 410],
            ]}
            edges={[
              [0, 3],
              [1, 3],
              [1, 4],
              [2, 4],
              [3, 5],
              [4, 5],
            ]}
          />
        </Win>
      </Inspectable>
      <Inspectable id="tr-tests" title="Tests">
        <g>
          <Lab x={330} y={300} t="TESTS" />
          <Check x={342} y={326} />
          <Check x={372} y={326} />
          <Check x={402} y={326} ok={false} />
        </g>
      </Inspectable>
      <Inspectable id="tr-orch" title="Orchestration">
        <g>
          <Lab x={330} y={400} t="ORCHESTRATION" />
          <path className="tx-axis" d="M330 430H480" />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} className="tx-tick" d={`M${340 + i * 44} 423V437`} />
          ))}
          <Move path="M335 430H475" dur={5}>
            <circle className="tx-alert" r="6" />
          </Move>
        </g>
      </Inspectable>
      <Inspectable id="tr-monitor" title="Shared monitoring">
        <Win x={520} y={266} w={440} h={150} title="A SHARED WAY TO MONITOR DATA HEALTH">
          <path className="tx-axis" d="M540 306V400H940" />
          <Spark
            x={540}
            y={306}
            w={400}
            h={90}
            vals={[0.5, 0.55, 0.4, 0.6, 0.35, 0.6, 0.7, 0.65, 0.75, 0.8, 0.78, 0.85]}
            c="on"
          />
        </Win>
      </Inspectable>
      <Inspectable id="tr-qualify" title="Qualifying alerts">
        <g>
          <Lab x={520} y={452} t="QUALIFY" />
          {['HIGH', 'MEDIUM', 'LOW'].map((t, i) => (
            <Fragment key={t}>
              <circle className={i === 0 ? 'tx-alert' : 'tx-stop'} cx={530 + i * 150} cy="490" r="7" />
              <Lab x={546 + i * 150} y={495} t={t} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Bring t="The engineering beneath reliable information.">
        <CaseChip x={560} y={578} w={195} to="heetch" kicker="HEETCH" sub="The proof" />
        <CaseChip x={765} y={578} w={195} to="verisure" kicker="VERISURE" sub="The proof" />
      </Bring>
    </Layer>
  );
}

const cx = [130, 350, 590, 810];
const items: [string, React.ReactNode][] = [
  [
    'GENERATE',
    <g transform="scale(1.1)">
      <rect x="-9" y="-7" width="18" height="14" rx="2" />
      <path d="M-9 0H-32M9 0H32" />
      <rect x="-44" y="-7" width="14" height="14" />
      <rect x="30" y="-7" width="14" height="14" />
    </g>,
  ],
  ['MOVE', <path d="M-22-14A24 24 0 0 0 16 22ZM-3 3L12-14M-3 3L-6 26H10" />],
  [
    'PROCESS',
    <>
      <rect x="-30" y="-24" width="60" height="16" rx="2" />
      <rect x="-30" y="-4" width="60" height="16" rx="2" />
      <rect x="-30" y="16" width="60" height="16" rx="2" />
    </>,
  ],
  [
    'USE',
    <>
      <rect x="-30" y="-24" width="60" height="42" rx="3" />
      <path d="M-20 8L-8-6 4 2 20-14M-12 30H12M0 18V30" />
    </>,
  ],
];

function EuropeanSpace() {
  return (
    <Layer steps={[3]}>
      <Lab x={40} y={92} t="A SPACE SYSTEM, AND WHAT I WOULD PLUG INTO IT" c="strong" />
      {items.map(([t, icon], i) => (
        <Inspectable key={t} id={`col-${i}`} title={t.charAt(0) + t.slice(1).toLowerCase()}>
          <g>
            <circle className="tx-stage" cx={cx[i]} cy="186" r="48" />
            <g className="tx-icon" transform={`translate(${cx[i]} 186)`}>
              {icon}
            </g>
            <Lab x={cx[i]} y={126} t={t} c="center" />
          </g>
        </Inspectable>
      ))}
      {[0, 1, 2].map((i) => (
        <Arrow key={i} from={[cx[i] + 54, 186]} to={[cx[i + 1] - 56, 186]} />
      ))}
      <Inspectable id="mx-3" title="Still learning">
        <g>
          <path className="tx-promise dashed" d={`M${cx[0]} 240V262H${cx[1]}V240`} />
          <Lab x={240} y={292} t="TO LEARN · EFREI" c="center warm" />
          <Sub x={240} y={314} t="Not prior space experience" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="mx-2" title="Engineering under the answer">
        <g>
          <Arrow from={[cx[2], 276]} to={[cx[2], 240]} />
          <Lab x={cx[2]} y={300} t="HEETCH · VERISURE" c="center" />
          <Sub x={cx[2]} y={322} t="Transformation, tests, monitoring" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="mx-1" title="Capabilities others can use">
        <g>
          <Arrow from={[cx[3], 276]} to={[cx[3], 240]} />
          <Lab x={cx[3]} y={300} t="FOODCHÉRI" c="center" />
          <Sub x={cx[3]} y={322} t="Access, training, support" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="col-4" title="Operate">
        <g>
          <path className="tx-operate" d="M60 372H940V416H60Z" />
          <Lab x={500} y={399} t="OPERATE: THE WHOLE SYSTEM, LIVE" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="mx-0" title="Decisions inside moving systems">
        <g>
          <Arrow from={[500, 458]} to={[500, 422]} />
          <Lab x={500} y={482} t="SNCF" c="center" />
          <Sub x={500} y={504} t="Decisions while the system runs" c="center" />
        </g>
      </Inspectable>
      <path className="tx-div" d="M40 566H960" />
      <Lab x={40} y={600} t="FOR EUROPE’S TECHNOLOGICAL SOVEREIGNTY" c="warm" />
      <CaseChip x={560} y={578} w={400} to="study-efrei" kicker="GALILEO · EFREI" sub="What I am learning" />
    </Layer>
  );
}

export default function TransferScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="WHAT I BRING · FROM MY WORK TO EUROPEAN SPACE" />
      <Network />
      <SharedCapability />
      <Beneath />
      <EuropeanSpace />
    </>
  );
}
