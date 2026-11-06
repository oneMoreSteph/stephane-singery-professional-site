// Sentinel · The need behind the need: in each role, what was asked on top, what I built below.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  Check,
  Code,
  Db,
  Divider,
  Header,
  Lab,
  Lane,
  Link,
  Move,
  OpsDefs,
  Server,
  Spark,
  Sub,
  T,
  User,
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

const usedTiles = [3, 14, 21, 28, 37, 46];

function FoodCheri() {
  return (
    <Layer steps={[0]}>
      <Lane y={92} t="ASKED" s="More dashboards" />
      <Inspectable id="nb-queue" title="A bottleneck">
        <g>
          <Lab x={60} y={160} t="DASHBOARD REQUESTS" />
          <path className="tx-funnel" d="M225 172L316 196M225 248L316 224" />
          {[0, 1, 2, 3, 4].map((i) => (
            <Move key={i} path="M60 210H292" dur={5} begin={i}>
              <rect className="tx-ticket" x="-11" y="-8" width="22" height="16" rx="2" />
            </Move>
          ))}
          <User x={345} y={226} c="on" />
          <User x={388} y={226} c="on" />
          <Lab x={366} y={160} t="2 PRODUCERS" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[415, 210]} to={[468, 210]} />
      <Inspectable id="nb-stones" title="A graveyard of dashboards">
        <g>
          <Lab x={480} y={110} t="TABLEAU · 600+ DASHBOARDS" />
          {Array.from({ length: 60 }, (_, i) => {
            const x = 480 + (i % 10) * 46;
            const y = 122 + Math.floor(i / 10) * 32;
            return (
              <g key={i} className={`tx-tile ${usedTiles.includes(i) ? 'used' : ''}`}>
                <rect x={x} y={y} width="40" height="26" rx="2" />
                <path
                  d={`M${x + 6} ${y + 20}V${y + 14}M${x + 14} ${y + 20}V${y + 9}M${x + 22} ${y + 20}V${y + 12}M${x + 30} ${y + 20}V${y + 6}`}
                />
              </g>
            );
          })}
          <Sub x={480} y={334} t="Lit: about 1 in 10, used regularly" />
        </g>
      </Inspectable>
      <Divider y={352} t="NEEDED: TEAMS BUILDING THEIR OWN ANALYSES" />
      <Lane y={392} t="BUILT" s="A platform, a tool and training" />
      <Inspectable id="nb-platform" title="The Data Platform">
        <g>
          <Lab x={120} y={428} t="DATA PLATFORM" c="center" />
          <Db cx={120} y={440} w={130} h={110} />
          <Sub x={120} y={572} t="Curated tables" c="center" />
          <Sub x={120} y={592} t="In a Data warehouse" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[190, 495]} to={[278, 495]} />
      <Inspectable id="nb-metabase" title="Metabase">
        <Win x={285} y={420} w={280} h={190} title="METABASE · SELF-SERVICE BI">
          <Bars x={310} y={460} w={230} h={130} vals={[0.35, 0.6, 0.45, 0.8, 0.55, 0.95, 0.7]} />
        </Win>
      </Inspectable>
      <Inspectable id="nb-training" title="Training">
        <g>
          <Lab x={612} y={478} t="TRAINING" c="center" />
          <Arrow from={[572, 495]} to={[652, 495]} />
        </g>
      </Inspectable>
      <Inspectable id="nb-seats" title="Teams building their own analyses">
        <g>
          {Array.from({ length: 25 }, (_, i) => (
            <User
              key={i}
              x={676 + (i % 5) * 36}
              y={448 + Math.floor(i / 5) * 36}
              s={0.72}
              c={i < 2 ? 'on' : 'tx-lit-seq'}
              style={vars({ '--i': i })}
            />
          ))}
          <T x={900} y={480} className="tx-big center">
            2 → 25
          </T>
          <Lab x={900} y={508} t="ACTIVE ANALYSIS" c="center" />
          <Lab x={900} y={528} t="PRODUCERS" c="center" />
        </g>
      </Inspectable>
    </Layer>
  );
}

const stops = Array.from({ length: 42 }, (_, i) => 60 + (i * 880) / 41);
const ends: [string, string, string, string][] = [
  ['nb-agent', 'Station staff', 'STATION STAFF', 'M-9-13H9V13H-9ZM-5 8H5'],
  ['nb-prov', 'Welcome providers', 'WELCOME PROVIDERS', 'M-7-13H7V13H-7ZM-3 8H3'],
  ['nb-auth', 'Local authorities', 'LOCAL AUTHORITIES', 'M-11 12V-4L0-12 11-4V12ZM-4 12V3H4V12'],
  ['nb-board', 'Platform boards', 'PLATFORM BOARDS', 'M-14-10H14V8H-14ZM-9-4H9M-9 2H3M0 8V14'],
  ['nb-speak', 'Announcements', 'ANNOUNCEMENTS', 'M-12-4H-5L4-11V11L-5 4H-12ZM8-5Q12 0 8 5'],
];
const rowY = (i: number) => 442 + i * 48;
const train = <rect className="tx-train" x="-22" y="-7" width="44" height="14" rx="4" />;

function LigneC() {
  return (
    <Layer steps={[1]}>
      <Lane y={92} t="ASKED" s="Care plans for 42 stations" />
      <Inspectable id="nb-line" title="RER C">
        <g>
          <Lab x={60} y={138} t="RER C · 42 STATIONS" />
          <path className="tx-line-rail" d="M60 170H940" />
          {stops.map((x, i) => (
            <circle key={i} className="tx-stop" cx={x.toFixed(1)} cy="170" r={i % 10 === 0 ? 6 : 4} />
          ))}
          <Move path="M60 170H940" dur={16}>
            {train}
          </Move>
          <Move path="M940 170H60" dur={16} begin={7}>
            {train}
          </Move>
        </g>
      </Inspectable>
      <Inspectable id="nb-binder" title="A care plan per station">
        <g>
          {stops.map((x, i) => (
            <path key={i} className="tx-doc" d={`M${(x - 6).toFixed(1)} 190h9l3 3v13h-12z`} />
          ))}
          <Lab x={60} y={240} t="ONE CARE PLAN PER STATION, ON PAPER" />
          <Lab
            x={500}
            y={300}
            t="SEEN: A PLAN WORKS ONLY IF PEOPLE ON THE GROUND CAN CARRY IT OUT"
            c="center"
          />
        </g>
      </Inspectable>
      <Divider y={352} t="NEEDED: PEOPLE ABLE TO ACT" />
      <Lane y={392} t="BUILT" s="Tools and information for each of them" />
      <Inspectable id="nb-source" title="Disruption information">
        <g>
          <Lab x={120} y={465} t="DISRUPTION INFO" c="center" />
          <Server x={70} y={482} w={100} />
        </g>
      </Inspectable>
      {ends.map(([id, title, t, d], i) => (
        <Fragment key={id}>
          <Link d={`M178 530L322 ${rowY(i)}`} />
          <Link d={`M545 ${rowY(i)}L660 530`} />
          <Inspectable id={id} title={title}>
            <g>
              <g className="tx-icon" transform={`translate(350 ${rowY(i)})`}>
                <path d={d} />
              </g>
              <Lab x={382} y={rowY(i) + 5} t={t} />
            </g>
          </Inspectable>
        </Fragment>
      ))}
      <Inspectable id="nb-assess" title="The first way to assess the plans">
        <Win x={665} y={430} w={295} h={205} title="INDICATORS · FIRST ASSESSMENT">
          <Sub x={685} y={482} t="Plan carried out" />
          <rect className="tx-gauge" x="685" y="492" width="255" height="12" rx="3" />
          <rect className="tx-gauge-on" x="685" y="492" width="200" height="12" rx="3" />
          <Sub x={685} y={538} t="Equipment did its job" />
          <rect className="tx-gauge" x="685" y="548" width="255" height="12" rx="3" />
          <rect className="tx-gauge-on" x="685" y="548" width="165" height="12" rx="3" />
          <Spark x={685} y={575} w={255} h={45} vals={[0.2, 0.35, 0.3, 0.5, 0.55, 0.7, 0.8]} />
        </Win>
      </Inspectable>
    </Layer>
  );
}

const signals: [string, number[]][] = [
  ['Test results', [0.9, 0.9, 0.4, 0.9, 0.9, 0.9, 0.9, 0.5, 0.9]],
  ['Freshness', [0.6, 0.6, 0.6, 0.2, 0.6, 0.6, 0.6, 0.6, 0.6]],
  ['Volume', [0.4, 0.5, 0.45, 0.55, 0.5, 0.9, 0.5, 0.45, 0.5]],
  ['Schema changes', [0.2, 0.2, 0.2, 0.2, 0.7, 0.2, 0.2, 0.2, 0.2]],
];
const stages: [string, string, string, React.ReactNode][] = [
  [
    'nb-detect',
    'Detect',
    'DETECT',
    <>
      <circle r="14" />
      <circle r="6" />
      <path d="M0 0L13-6" />
    </>,
  ],
  [
    'nb-qualify',
    'Qualify',
    'QUALIFY',
    <>
      <path d="M-15-15H2L15 0 2 15H-15Z" />
      <circle cx="-7" cy="-7" r="2.5" />
    </>,
  ],
  ['nb-prio', 'Prioritise', 'PRIORITISE', <path d="M-14-11H14M-14 0H6M-14 11H-2" />],
  ['nb-oncall', 'Notify', 'NOTIFY', <path d="M-13 10C-9 3-11-13 0-13S9 3 13 10ZM-3 14H3" />],
  [
    'nb-govern',
    'Govern',
    'GOVERN',
    <path d="M0-16L14-10V2C14 9 6 14 0 17-6 14-14 9-14 2V-10ZM-6 0L-1 5 7-5" />,
  ],
];

function Verisure() {
  return (
    <Layer steps={[2]}>
      <Lane y={92} t="ASKED" s="Data tests" />
      <Inspectable id="nb-iv" title="Automated Data tests">
        <Win x={40} y={108} w={440} h={222} title="ELEMENTARY · DAILY TEST RUN">
          <Check x={66} y={152} />
          <Check x={66} y={180} />
          <Check x={66} y={208} ok={false} />
          <Check x={66} y={236} />
          <Code
            x={86}
            y={156}
            lh={28}
            lines={[
              'not_null   orders.id',
              'unique     customers.id',
              'freshness  payments',
              'accepted   alarms.status',
            ]}
          />
          <Lab x={60} y={300} t="525 TESTS A DAY" />
        </Win>
      </Inspectable>
      <Arrow from={[110, 332]} to={[110, 444]} />
      <Inspectable id="nb-thermo" title="One signal among others">
        <g>
          <Lab x={530} y={118} t="SEEN: A TEST IS ONE SIGNAL AMONG OTHERS" />
          {signals.map(([t, v], i) => (
            <Fragment key={t}>
              <Sub x={530} y={160 + i * 46} t={t} />
              <Spark x={680} y={142 + i * 46} w={270} h={30} vals={v} c={i === 0 ? 'on' : ''} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Divider y={352} t="NEEDED: TO SEE DATA HEALTH" />
      <Lane y={392} t="BUILT" s="A Data Quality and Observability platform" />
      <path className="tx-link" d="M110 484H830" />
      <path className="tx-flow" d="M110 484H830" />
      {stages.map(([id, title, t, icon], i) => (
        <Inspectable key={id} id={id} title={title}>
          <g>
            <circle className="tx-stage" cx={110 + i * 180} cy="484" r="38" />
            <g className="tx-icon" transform={`translate(${110 + i * 180} 484)`}>
              {icon}
            </g>
            <Lab x={110 + i * 180} y={544} t={t} c="center" />
          </g>
        </Inspectable>
      ))}
      <Move path="M72 484H870" dur={7}>
        <circle className="tx-alert" r="7" />
      </Move>
      <Inspectable id="nb-monitor" title="Data health">
        <g>
          <Lab x={40} y={600} t="DATA HEALTH" />
          <Sub x={40} y={620} t="And its trends" />
          <Spark
            x={180}
            y={575}
            w={780}
            h={70}
            vals={[0.5, 0.55, 0.45, 0.6, 0.35, 0.55, 0.65, 0.6, 0.7, 0.68, 0.75, 0.72, 0.8, 0.78, 0.85]}
          />
          <path className="tx-axis" d="M180 575V645H960" />
        </g>
      </Inspectable>
    </Layer>
  );
}

export default function NeedScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="THE NEED BEHIND THE NEED · ASKED, THEN BUILT" />
      <FoodCheri />
      <LigneC />
      <Verisure />
    </>
  );
}
