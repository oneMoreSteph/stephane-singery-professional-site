// Earth · Verisure: why Verisure, errors found by the business first, what I understood, the platform, in operation, observability, the result.
// Locations, days, the run's anomalies and trends are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  CaseChip,
  DataChain,
  Header,
  Lab,
  Move,
  OpsDefs,
  Sub,
  T,
  User,
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

// ---------- shared vocabulary: medallions with line icons, and the closing line ----------
const icon = {
  cap: <path d="M-16-4L0-11 16-4 0 3ZM-9 0V7C-5 11 5 11 9 7V0" />,
  shield: (
    <>
      <path d="M0-17L14-11V-1C14 8 8 14 0 17C-8 14-14 8-14-1V-11Z" />
      <path d="M-6 0L-1 5 7-5" />
    </>
  ),
  db: (
    <>
      <ellipse cy="-11" rx="14" ry="5" />
      <path d="M-14-11V11A14 5 0 0 0 14 11V-11M-14 0A14 5 0 0 0 14 0" />
    </>
  ),
  report: (
    <>
      <rect x="-17" y="-14" width="34" height="23" rx="2" />
      <path d="M-11 3L-4-4 2 0 11-9M-6 16H6M0 9V16" />
    </>
  ),
  person: (
    <>
      <circle cy="-10" r="6" />
      <path d="M-13 16V8A13 11 0 0 1 13 8V16" />
    </>
  ),
  lens: (
    <>
      <circle cx="-3" cy="-3" r="10" />
      <path d="M4 4L14 14" />
    </>
  ),
  check: (
    <>
      <circle r="15" />
      <path d="M-6 0L-2 5 7-5" />
    </>
  ),
  tag: (
    <>
      <path d="M-15-15H0L15 0 0 15-15 0Z" />
      <circle cx="-8" cy="-8" r="2" />
    </>
  ),
  flag: <path d="M-11 16V-15M-11-15H11L5-7 11 1H-11" />,
  clock: (
    <>
      <circle r="15" />
      <path d="M0-9V0L7 4" />
    </>
  ),
  bell: (
    <>
      <path d="M-11 6V-2A11 11 0 0 1 11-2V6L14 10H-14Z" />
      <path d="M-3 15H3" />
    </>
  ),
  code: <path d="M-8-11L-17 0-8 11M8-11L17 0 8 11M3-13L-3 13" />,
  list: <path d="M-5-9H15M-5 0H15M-5 9H15M-15-9H-11M-15 0H-11M-15 9H-11" />,
  globe: (
    <>
      <circle r="15" />
      <ellipse rx="6" ry="15" />
      <path d="M-15 0H15M-13-7H13M-13 7H13" />
    </>
  ),
  growth: <path d="M-15 13H15M-11 13V5M-3 13V-1M5 13V-6M13 13V-13" />,
  wrench: <path d="M9-15A8 8 0 0 0-1-5L-14 8A3.5 3.5 0 0 0-9 13L4 0A8 8 0 0 0 14-10L9-5 3-6 4-11Z" />,
  chart: (
    <>
      <path d="M-15-14V13H15" />
      <path d="M-10 6L-3-2 3 3 13-9" />
    </>
  ),
};

function Medal({
  x,
  y,
  r = 44,
  i,
  dashed,
  on,
}: {
  x: number;
  y: number;
  r?: number;
  i: React.ReactNode;
  dashed?: boolean;
  on?: boolean;
}) {
  return (
    <>
      <circle className={`tx-stage${dashed ? ' vs-dashed' : ''}${on ? ' vs-on' : ''}`} cx={x} cy={y} r={r} />
      <g
        className={`tx-icon${dashed ? ' vs-faint' : ''}`}
        transform={`translate(${x} ${y}) scale(${(r / 44) * 1.25})`}
      >
        {i}
      </g>
    </>
  );
}

function Close({ t, s, children }: { t: string; s: string; children?: React.ReactNode }) {
  return (
    <>
      <path className="tx-div" d="M40 566H960" />
      <Lab x={40} y={600} t={t} c="warm" />
      <Sub x={40} y={624} t={s} />
      {children}
    </>
  );
}

// ---------- 1 · Why Verisure ----------
const G = { x: 640, y: 300, r: 170 };
const sites: [number, number][] = [
  [-60, -70],
  [-30, -40],
  [10, -60],
  [40, -20],
  [-80, 10],
  [-20, 30],
  [60, 40],
  [100, -40],
  [20, 90],
  [-100, -30],
  [120, 20],
  [-40, 100],
];

function WhyVerisure() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={92} t="ANALYTICS ENGINEER · APPRENTICE" c="strong" />
      <Inspectable
        id="vs-efrei"
        title="EFREI · engineering degree"
        body="My engineering degree at EFREI, in apprenticeship.|School and work feed each other, week after week."
      >
        <g>
          <Medal x={110} y={200} i={icon.cap} />
          <Lab x={172} y={196} t="EFREI" />
          <Sub x={172} y={218} t="Engineering degree" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-apprentice"
        title="Verisure · Analytics Engineer"
        body="Analytics Engineer apprentice at Verisure, alongside the degree.|Real Data, real stakes, from the first week."
      >
        <g>
          <Medal x={110} y={400} i={icon.shield} on />
          <Lab x={172} y={396} t="VERISURE" c="warm" />
          <Sub x={172} y={418} t="Analytics Engineer" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-rhythm"
        title="Alternating weeks"
        body="Weeks at school, weeks at Verisure.|Each side feeds the other."
      >
        <g>
          <path className="tx-link" d="M110 250V350" />
          <Move path="M110 252V348" dur={4}>
            <circle className="tx-alert" r="6" />
          </Move>
          <Sub x={126} y={304} t="Alternating weeks" />
        </g>
      </Inspectable>
      <Arrow from={[300, 400]} to={[452, 340]} />
      <Inspectable
        id="vs-scale"
        title="A company at scale"
        body="Verisure operates worldwide and grows year after year.|I chose it for that scale: Data that many decisions rely on."
      >
        <g>
          <circle className="tx-ring" cx={G.x} cy={G.y} r={G.r} />
          <ellipse className="vs-mer" cx={G.x} cy={G.y} rx={70} ry={G.r} />
          <ellipse className="vs-mer" cx={G.x} cy={G.y} rx={140} ry={G.r} />
          <path
            className="vs-mer"
            d={`M${G.x - G.r} ${G.y}H${G.x + G.r}M${G.x - 150} ${G.y - 80}H${G.x + 150}M${G.x - 150} ${G.y + 80}H${G.x + 150}`}
          />
          {sites.map(([dx, dy], i) => (
            <circle
              key={i}
              className="vs-site"
              style={vars({ '--i': i })}
              cx={G.x + dx}
              cy={G.y + dy}
              r="7"
            />
          ))}
          <Lab x={G.x} y={G.y - G.r - 22} t="A COMPANY AT SCALE" c="center" />
          <Sub x={G.x} y={G.y + G.r + 30} t="Worldwide · locations illustrative" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-growth"
        title="Growing year after year"
        body="Verisure grows year after year.|More customers, more Data, more decisions on it."
      >
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              className="vs-grow"
              style={vars({ '--i': i })}
              x={850 + i * 28}
              y={400 - 40 - i * 30}
              width="18"
              height={40 + i * 30}
              rx="2"
            />
          ))}
          <path className="tx-axis" d="M842 402H956" />
          <Lab x={899} y={430} t="GROWING" c="center" />
          <Sub x={899} y={452} t="Year after year" c="center" />
        </g>
      </Inspectable>
      <Close t="CHOSEN FOR ITS SCALE" s="Data that many decisions rely on, worldwide." />
    </Layer>
  );
}

// ---------- 2 · Starting point ----------
const chainX = [130, 370, 610, 850];
const before: [string, string, string, string, React.ReactNode, string][] = [
  [
    'vs-marts',
    'Data marts',
    'DATA MARTS',
    'Checked by eye',
    icon.db,
    'Some Data marts were checked manually, or by eye.|Slow, and easy to miss.',
  ],
  [
    'vs-report',
    'A business report',
    'BUSINESS REPORT',
    'An incoherent KPI',
    icon.report,
    'Incidents often surfaced in a business report or an incoherent KPI.|The anomaly had already reached decisions.',
  ],
  [
    'vs-user',
    'A business user',
    'BUSINESS USER',
    'Spots it, days later',
    icon.person,
    'A business user noticed the figure looked wrong.|The business found it before the Data team.',
  ],
  [
    'vs-team',
    'The Data team',
    'DATA TEAM',
    'Searches for the cause',
    icon.lens,
    'The Data team then searched for the cause.|Reactive: after the fact.',
  ],
];
const days = ['DAY 1', 'DAY 3', 'DAY 5', 'DAY 6'];

function StartingPoint() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={92} t="BEFORE · ERRORS FOUND BY THE BUSINESS FIRST" c="strong" />
      {before.map(([id, title, t, s, i, body], k) => (
        <Inspectable key={id} id={id} title={title} body={body}>
          <g>
            <Medal x={chainX[k]} y={230} i={i} on={k === 2} />
            <Lab x={chainX[k]} y={166} t={t} c={`center${k === 2 ? ' warm' : ''}`} />
            <Sub x={chainX[k]} y={304} t={s} c="center" />
          </g>
        </Inspectable>
      ))}
      {[0, 1, 2].map((k) => (
        <Arrow key={k} from={[chainX[k] + 52, 230]} to={[chainX[k + 1] - 54, 230]} />
      ))}
      <Move path="M130 230H850" dur={9}>
        <circle className="vs-anom" r="8" />
      </Move>
      <circle className="tx-ping" cx={chainX[2]} cy={230} r="54" />
      <Inspectable
        id="vs-lag"
        title="Found days later"
        body="An anomaly could travel from the load to a business report before anyone saw it.|Each day it stayed, more decisions used it."
      >
        <g>
          <path className="tx-axis" d="M130 400H850" />
          <path className="vs-lag" d="M130 400H850" />
          {days.map((d, k) => (
            <Fragment key={d}>
              <path className="tx-tick" d={`M${chainX[k]} 392V408`} />
              <Lab x={chainX[k]} y={436} t={d} c="center" />
            </Fragment>
          ))}
          <Sub x={490} y={466} t="Days illustrative" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-request"
        title="The request"
        body="A mechanism to test Data and detect anomalies proactively.|What I was asked to build."
      >
        <Close t="THE REQUEST" s="Test Data and detect anomalies, proactively." />
      </Inspectable>
    </Layer>
  );
}

// ---------- 3 · What I understood ----------
const H = { x: 620, y: 300, r: 160 };
const needs: [string, React.ReactNode][] = [
  ['DETECT', icon.lens],
  ['QUALIFY', icon.tag],
  ['PRIORITISE', icon.flag],
  ['NOTIFY', icon.bell],
  ['FIX', icon.wrench],
  ['HISTORY', icon.clock],
  ['GOVERN', icon.shield],
];
const signals: [string, string, boolean][] = [
  ['DATA TESTS', 'One signal', true],
  ['MORE SIGNALS', 'Later', false],
  ['MORE SIGNALS', 'Later', false],
];

function Understood() {
  return (
    <Layer steps={[2]}>
      <Lab x={40} y={92} t="THE REAL NEED · OBSERVE DATA HEALTH" c="strong" />
      <Inspectable
        id="vs-signals"
        title="Tests are one signal among others"
        body="Data tests are one source of signals about Data health.|The design leaves room for other signals."
      >
        <g>
          {signals.map(([t, s, on], k) => (
            <Fragment key={k}>
              <Medal x={90} y={180 + k * 120} r={34} i={icon.check} dashed={!on} />
              <Lab x={136} y={176 + k * 120} t={t} c={on ? 'warm' : ''} />
              <Sub x={136} y={198 + k * 120} t={s} />
              <path
                className={on ? 'tx-link' : 'tx-link vs-faint'}
                d={`M286 ${180 + k * 120}L${H.x - H.r - 8} ${H.y}`}
              />
            </Fragment>
          ))}
          <Move path={`M286 180L${H.x - H.r - 8} ${H.y}`} dur={3}>
            <circle className="tx-alert" r="6" />
          </Move>
        </g>
      </Inspectable>
      <Inspectable
        id="vs-health"
        title="Data health"
        body="The real need: observe Data health, beyond running tests.|One view of whether the Data can be trusted."
      >
        <g>
          <circle className="tx-ring" cx={H.x} cy={H.y} r={H.r} />
          <circle className="vs-core" cx={H.x} cy={H.y} r="78" />
          <path
            className="vs-pulse"
            pathLength={1}
            d={`M${H.x - 60} ${H.y + 10}H${H.x - 28}L${H.x - 16} ${H.y - 24}L${H.x} ${H.y + 34}L${H.x + 14} ${H.y - 8}L${H.x + 22} ${H.y + 10}H${H.x + 60}`}
          />
          <Lab x={H.x} y={H.y - 38} t="DATA HEALTH" c="center strong" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-needs"
        title="Seven needs"
        body="Detect, qualify, prioritise, notify, fix, keep the history, govern.|An alert only matters once it leads to a fix."
      >
        <g>
          {needs.map(([t, i], k) => {
            // Rotated so the signals enter through the gap at the left.
            const a = (k / needs.length) * Math.PI * 2 - Math.PI / 2 - Math.PI / (2 * needs.length);
            const x = H.x + H.r * Math.cos(a);
            const y = H.y + H.r * Math.sin(a);
            const c = Math.cos(a);
            return (
              <g key={t} className="vs-need" style={vars({ '--i': k })}>
                <Medal x={x} y={y} r={28} i={i} />
                <Lab
                  x={x + (c > 0.3 ? 40 : 0)}
                  y={y + (c > 0.3 ? 5 : Math.sin(a) < 0 ? -40 : 52)}
                  t={t}
                  c={c > 0.3 ? '' : 'center'}
                />
              </g>
            );
          })}
        </g>
      </Inspectable>
      <Inspectable
        id="vs-cost"
        title="Why it matters"
        body="The more decisions depend on Data, the more an undetected anomaly costs.|The reason to observe, not only test."
      >
        <Close
          t="WHY IT MATTERS"
          s="The more decisions depend on Data, the more an undetected anomaly costs."
        />
      </Inspectable>
    </Layer>
  );
}

// ---------- 4 · The platform ----------
const stack: [string, string, string, string, React.ReactNode, string][] = [
  [
    'vs-snowflake',
    'Snowflake · the Data warehouse',
    'SNOWFLAKE',
    'Data warehouse · the marts',
    icon.db,
    'Snowflake: the cloud Data warehouse where the Data marts live.|What the platform watches.',
  ],
  [
    'vs-dbt',
    'dbt Core tests',
    'DBT CORE',
    'Tests on the marts',
    icon.code,
    'dbt Core runs the Data tests on the marts.|The first observability domain.',
  ],
  [
    'vs-elementary',
    'Elementary',
    'ELEMENTARY',
    'Results and history',
    icon.list,
    'Elementary collects every test result and keeps its history.|The base for alerts and monitoring.',
  ],
];
const px = [130, 340, 550];

function ThePlatform() {
  return (
    <Layer steps={[3]}>
      <DataChain id="vs-chain" steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']} on={[2]} />
      <Lab x={40} y={92} t="DATA QUALITY AND OBSERVABILITY PLATFORM" c="strong" />
      {stack.map(([id, title, t, s, i, body], k) => (
        <Inspectable key={id} id={id} title={title} body={body}>
          <g>
            <Medal x={px[k]} y={210} i={i} on={k === 0} />
            <Lab x={px[k]} y={148} t={t} c={`center${k === 0 ? ' warm' : ''}`} />
            <Sub x={px[k]} y={282} t={s} c="center" />
          </g>
        </Inspectable>
      ))}
      {[0, 1].map((k) => (
        <Arrow key={k} from={[px[k] + 52, 210]} to={[px[k + 1] - 54, 210]} />
      ))}
      <Move path="M130 210H550V360" dur={7}>
        <circle className="tx-alert" r="6" />
      </Move>
      <Arrow from={[550, 300]} to={[550, 352]} />
      <Inspectable
        id="vs-layer"
        title="A common alert model, in a transverse layer"
        body="One alert model shared by every observability domain.|Alerts look and behave the same, whatever their source."
      >
        <g>
          <path className="tx-operate" d="M60 360H940V406H60Z" />
          <Lab x={500} y={388} t="COMMON ALERT MODEL · TRANSVERSE LAYER" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-out"
        title="Alerts and dashboards"
        body="Qualified alerts reach the team concerned; two dashboards show the Data health.|Each anomaly reaches the people who can act."
      >
        <g>
          <Arrow from={[850, 352]} to={[850, 300]} />
          <Medal x={850} y={210} i={icon.bell} />
          <Lab x={850} y={148} t="ALERTS · DASHBOARDS" c="center" />
          <Sub x={850} y={282} t="To the teams" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-domains"
        title="Room for new domains"
        body="dbt tests are the first observability domain.|Others plug into the same layer, without redesign."
      >
        <g>
          {['DBT TESTS', 'NEXT DOMAIN', 'NEXT DOMAIN'].map((t, k) => (
            <Fragment key={k}>
              <Arrow from={[200 + k * 300, 456]} to={[200 + k * 300, 414]} />
              <rect
                className={k ? 'tx-app dashed' : 'tx-app'}
                x={100 + k * 300}
                y={462}
                width="200"
                height="44"
                rx="4"
              />
              <Lab x={200 + k * 300} y={490} t={t} c={`center${k ? '' : ' warm'}`} />
            </Fragment>
          ))}
          <Sub x={500} y={532} t="Observability domains · the first one live, room for others" c="center" />
        </g>
      </Inspectable>
      <Close
        t="DESIGNED WITHIN THE EXISTING TOOLS"
        s="dbt Core, Snowflake (the Data warehouse) and Elementary."
      />
    </Layer>
  );
}

// ---------- 5 · In operation ----------
const D = { x: 240, y: 300, r: 150 };
const N = 525;
const bad = [137, 402];
const flow: [string, string, React.ReactNode][] = [
  ['DETECT', 'In the run, automatically', icon.lens],
  ['QUALIFY', 'What failed, where', icon.tag],
  ['PRIORITISE', 'High, medium, low', icon.flag],
  ['NOTIFY', 'The team concerned', icon.bell],
  ['FIX', 'Then the next run confirms', icon.wrench],
];
const fy = (k: number) => 132 + k * 90;

function InOperation() {
  return (
    <Layer steps={[4]}>
      <Lab x={40} y={92} t="TODAY'S RUN" c="strong" />
      <Inspectable
        id="vs-525"
        title="525 tests a day"
        body="525 automated tests run every day; about 60,000 executions so far.|Industrialised: no manual run."
      >
        <g>
          {Array.from({ length: N }, (_, i) => {
            const a = (i / N) * Math.PI * 2 - Math.PI / 2;
            const c = Math.cos(a);
            const s = Math.sin(a);
            return (
              <path
                key={i}
                className={bad.includes(i) ? 'vs-tick ko' : 'vs-tick'}
                style={vars({ '--i': i / N })}
                d={`M${(D.x + (D.r - 18) * c).toFixed(1)} ${(D.y + (D.r - 18) * s).toFixed(1)}L${(D.x + D.r * c).toFixed(1)} ${(D.y + D.r * s).toFixed(1)}`}
              />
            );
          })}
          <path className="vs-hand" d={`M${D.x} ${D.y}V${D.y - D.r + 24}`}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${D.x} ${D.y}`}
              to={`360 ${D.x} ${D.y}`}
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
          <circle className="tx-stop" cx={D.x} cy={D.y} r="5" />
          <T x={D.x} y={D.y + 52} className="tx-big center">
            525
          </T>
          <Sub x={D.x} y={D.y + 76} t="Tests a day" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-60k"
        title="About 60,000 executions"
        body="About 60,000 test executions so far.|A platform in daily use."
      >
        <g>
          <T x={D.x} y={510} className="tx-big center">
            ~60,000
          </T>
          <Sub x={D.x} y={536} t="Executions so far" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[400, 230]} to={[530, fy(0)]} />
      <Inspectable
        id="vs-flow"
        title="Detected, qualified, prioritised, notified"
        body="Each anomaly is detected, qualified, prioritised, then sent to the team concerned.|Teams treat each anomaly quickly."
      >
        <g>
          {flow.slice(0, 4).map(([t, s, i], k) => (
            <Fragment key={t}>
              <Medal x={580} y={fy(k)} r={32} i={i} />
              <Lab x={628} y={fy(k) - 4} t={t} />
              <Sub x={628} y={fy(k) + 18} t={s} />
              <Arrow from={[580, fy(k) + 35]} to={[580, fy(k + 1) - 37]} />
            </Fragment>
          ))}
          <Move path={`M580 ${fy(0)}V${fy(3)}H880V${fy(4)}H580`} dur={10}>
            <circle className="vs-anom" r="7" />
          </Move>
          <Arrow from={[800, fy(3)]} to={[876, fy(3) + 26]} />
          <User x={905} y={fy(3) + 62} c="on" />
          <Sub x={940} y={fy(3) + 50} t="Team" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-fix"
        title="An alert is worth its fix"
        body="Each anomaly is fixed, then the next run confirms the fix.|Alerts without fixes bring almost nothing."
      >
        <g>
          <Arrow from={[876, fy(4) - 6]} to={[800, fy(4)]} />
          <Medal x={580} y={fy(4)} r={32} i={flow[4][2]} on />
          <Lab x={628} y={fy(4) - 4} t={flow[4][0]} c="warm" />
          <Sub x={628} y={fy(4) + 18} t={flow[4][1]} />
          <Arrow from={[546, fy(4)]} c="vs-back" to={[392, 420]} />
          <Sub x={410} y={fy(4) + 30} t="Next run" />
        </g>
      </Inspectable>
      <Close t="AN ALERT IS WORTH ITS FIX" s="Each anomaly fixed, then confirmed by the next run." />
    </Layer>
  );
}

// ---------- 6 · Observability ----------
const domains: [string, number][] = [
  ['Domain A', 0.92],
  ['Domain B', 0.74],
  ['Domain C', 0.58],
  ['Domain D', 0.36],
];
const days7 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Observability() {
  return (
    <Layer steps={[5]}>
      <Lab x={40} y={92} t="OBSERVABILITY · TWO DASHBOARDS ON DATA HEALTH" c="strong" />
      <Inspectable
        id="vs-deploy"
        title="Data test deployment monitoring"
        body="A dashboard on the deployment of Data tests across the platform.|Shows where the tests are deployed, and where coverage can grow."
      >
        <Win x={40} y={120} w={440} h={300} title="1 · DATA TEST DEPLOYMENT · MONITORING">
          <Lab x={60} y={176} t="TESTS DEPLOYED" />
          <path className="tx-axis" d="M60 190V392H300" />
          <path
            className="tx-draw"
            pathLength={1}
            d="M60 384H94V362H128V346H162V318H196V290H230V262H264V230H298V206"
          />
          <circle className="tx-stop" cx={298} cy={206} r="5" />
          <Lab x={290} y={192} t="525" c="end warm" />
          <Lab x={336} y={176} t="BY DOMAIN" />
          {domains.map(([d, v], k) => (
            <Fragment key={d}>
              <Sub x={336} y={210 + k * 46} t={d} />
              <rect className="vs-track" x={336} y={220 + k * 46} width="124" height="9" rx="4" />
              <rect
                className="vs-fill"
                style={vars({ '--i': k })}
                x={336}
                y={220 + k * 46}
                width={(124 * v).toFixed(0)}
                height="9"
                rx="4"
              />
            </Fragment>
          ))}
          <Sub x={60} y={410} t="Illustrative" />
        </Win>
      </Inspectable>
      <Inspectable
        id="vs-results"
        title="Data test results, operational monitoring"
        body="A dashboard describing the Data test results, run after run.|What passed, what failed, the trends, where to focus effort."
      >
        <Win x={520} y={120} w={440} h={300} title="2 · DATA TEST RESULTS · OPERATIONS">
          {(
            [
              ['PASSED', 'ok'],
              ['WARNINGS', 'warn'],
              ['FAILED', 'ko'],
            ] as const
          ).map(([t, k], i) => (
            <Fragment key={t}>
              <rect className="tx-table-row" x={540 + i * 136} y={160} width="124" height="44" rx="4" />
              <circle className={`vs-dot ${k}`} cx={558 + i * 136} cy={182} r="6" />
              <Lab x={572 + i * 136} y={187} t={t} />
            </Fragment>
          ))}
          <path className="tx-axis" d="M540 392H940" />
          {days7.map((d) => {
            const h = 110 + ((d * 37) % 50);
            const ko = d === 3 || d === 7 ? 14 : 0;
            const warn = d % 3 === 1 ? 10 : 0;
            const x = 548 + d * 39;
            return (
              <g key={d} className="vs-col" style={vars({ '--i': d })}>
                <rect className="vs-pass" x={x} y={390 - h} width="24" height={h} rx="2" />
                {warn > 0 && (
                  <rect className="vs-warn" x={x} y={388 - h - warn} width="24" height={warn} rx="2" />
                )}
                {ko > 0 && (
                  <rect className="vs-ko" x={x} y={386 - h - warn - ko} width="24" height={ko} rx="2" />
                )}
              </g>
            );
          })}
          <Sub x={540} y={410} t="Run after run · illustrative" />
        </Win>
      </Inspectable>
      <Inspectable
        id="vs-ae"
        title="The Analytics Engineer, walked through Data health"
        body="The two dashboards walk the Analytics Engineer through the Data health of the platform.|From deployment to results: one path, every run."
      >
        <g>
          <Arrow from={[466, 486]} to={[300, 428]} />
          <Arrow from={[534, 486]} to={[700, 428]} />
          <Move path="M260 424L500 492L740 424" dur={6}>
            <circle className="tx-alert" r="6" />
          </Move>
          <User x={500} y={520} s={1.1} c="on" />
          <Lab x={560} y={514} t="ANALYTICS ENGINEER" />
        </g>
      </Inspectable>
      <Close t="OBSERVABILITY" s="Two dashboards, one view of the Data health of the platform." />
    </Layer>
  );
}

// ---------- 7 · Result ----------
const runX = [130, 370, 610, 850];
const runs: [string, React.ReactNode][] = [
  ['LOAD', icon.db],
  ['TEST', icon.check],
  ['MART', icon.list],
  ['REPORT', icon.report],
];
const tiers: [string, number][] = [
  ['LEADERSHIP', 1],
  ['MANAGERS', 3],
  ['TEAMS', 5],
];

function Result() {
  return (
    <Layer steps={[6]}>
      <Inspectable
        id="vs-earlier"
        title="Issues surface earlier"
        body="Anomalies are caught by the tests in the run, then fixed, before a report shows them.|Fewer manual controls."
      >
        <g>
          <Lab x={40} y={92} t="WHERE AN ISSUE IS FOUND" c="strong" />
          {runs.map(([t, i], k) => (
            <Fragment key={t}>
              <Medal x={runX[k]} y={200} r={30} i={i} on={k === 1} dashed={k === 3} />
              <Lab x={runX[k]} y={256} t={t} c="center" />
            </Fragment>
          ))}
          {[0, 1, 2].map((k) => (
            <Arrow key={k} from={[runX[k] + 38, 200]} to={[runX[k + 1] - 40, 200]} />
          ))}
          <path className="tx-promise dashed" d="M850 162C850 110 370 110 370 162" />
          <Lab x={610} y={110} t="EARLIER" c="center warm" />
          <Sub x={370} y={282} t="Now · in the run" c="center" />
          <Sub x={850} y={282} t="Before · in a report" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-trust"
        title="Trust at every level"
        body="Teams, managers and leadership rely on the same Data with more confidence.|Trust in Data improved across the company."
      >
        <g>
          <Lab x={40} y={334} t="TRUST AT EVERY LEVEL" />
          {tiers.map(([t, n], r) => (
            <Fragment key={t}>
              {Array.from({ length: n }, (_, k) => (
                <User key={k} x={250 - (n - 1) * 26 + k * 52} y={392 + r * 58} s={0.8} c="on" />
              ))}
              <g className="vs-ok" style={vars({ '--i': r })}>
                <circle cx={430} cy={380 + r * 58} r="11" />
                <path d={`M425 ${380 + r * 58}L429 ${385 + r * 58} 436 ${375 + r * 58}`} />
              </g>
              <Sub x={452} y={385 + r * 58} t={t.charAt(0) + t.slice(1).toLowerCase()} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="vs-ready"
        title="Ready for new domains"
        body="New observability domains plug into the same layer.|Ready as Data usage grows."
      >
        <g>
          <Lab x={600} y={334} t="READY AS DATA USAGE GROWS" />
          <path className="tx-operate" d="M600 356H960V396H600Z" />
          <Lab x={780} y={381} t="COMMON ALERT MODEL" c="center" />
          {[0, 1, 2].map((k) => (
            <Fragment key={k}>
              <Arrow from={[660 + k * 120, 446]} to={[660 + k * 120, 404]} />
              <rect
                className={k ? 'tx-app dashed' : 'tx-app'}
                x={608 + k * 120}
                y={452}
                width="104"
                height="40"
                rx="4"
              />
              <Lab x={660 + k * 120} y={477} t={k ? 'NEXT' : 'DBT TESTS'} c={`center${k ? '' : ' warm'}`} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Close t="TRUST IN DATA" s="Across the company.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="signal"
          kicker="HIGH-STAKES · SIGNAL OR NOISE"
          sub="Governed alert exceptions"
        />
      </Close>
    </Layer>
  );
}

export default function SystemVerisureScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="VERISURE · ANALYTICS ENGINEER" />
      <WhyVerisure />
      <StartingPoint />
      <Understood />
      <ThePlatform />
      <InOperation />
      <Observability />
      <Result />
    </>
  );
}
