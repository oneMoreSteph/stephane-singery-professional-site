// Sentinel · The need behind the need: asked, seen, needed, built, in three roles.
// Test names, tables and curves are illustrative; figures are from each role.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  CaseChip,
  Check,
  Db,
  Header,
  Lab,
  Link,
  Move,
  OpsDefs,
  Spark,
  Sub,
  T,
  User,
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

// ---------- shared ----------
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
function Medal({
  x,
  y,
  r = 30,
  i,
  on,
}: {
  x: number;
  y: number;
  r?: number;
  i: React.ReactNode;
  on?: boolean;
}) {
  return (
    <>
      <circle className={`tx-stage${on ? ' vs-on' : ''}`} cx={x} cy={y} r={r} />
      <g className="tx-icon" transform={`translate(${x} ${y}) scale(${(r / 44) * 1.6})`}>
        {i}
      </g>
    </>
  );
}
/** The gold line between what was asked and what was built. */
function Needed({ t }: { t: string }) {
  const w = t.length * 8.4 + 40;
  return (
    <>
      <path className="tx-div" d={`M40 300H${500 - w / 2}M${500 + w / 2} 300H960`} />
      <Lab x={500} y={305} t={t} c="center warm" />
    </>
  );
}
function Built({ s }: { s: string }) {
  return (
    <>
      <Lab x={40} y={342} t="BUILT" />
      <Sub x={100} y={342} t={s} />
    </>
  );
}
const Sheet = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="tx-doc" d="M0 0H16L21 5V28H0Z" />
    <path className="tx-grid" d="M4 11H17M4 17H17M4 23H12" />
  </g>
);
const icon = {
  lens: (
    <>
      <circle cx="-3" cy="-3" r="10" />
      <path d="M4 4L14 14" />
    </>
  ),
  training: <path d="M-16-4L0-11 16-4 0 3ZM-9 0V7C-5 11 5 11 9 7V0M14-3V7" />,
  phone: (
    <>
      <rect x="-7" y="-12" width="14" height="24" rx="2" />
      <path d="M-2 8H2" />
    </>
  ),
  badge: (
    <>
      <circle cy="-6" r="5" />
      <path d="M-10 12V8A10 8 0 0 1 10 8V12M4 0H10V6H4Z" />
    </>
  ),
  building: <path d="M-12 12V-4L0-12 12-4V12ZM-5 12V3H5V12" />,
  board: (
    <>
      <rect x="-13" y="-10" width="26" height="16" rx="2" />
      <path d="M-8-4H8M-8 1H4M0 6V12" />
    </>
  ),
  speaker: <path d="M-12-5H-6L2-11V11L-6 5H-12ZM6-6C9-3 9 3 6 6M9-9C14-4 14 4 9 9" />,
  detect: (
    <>
      <circle r="12" />
      <circle r="5" />
      <path d="M0-16V-8M0 8V16M-16 0H-8M8 0H16" />
    </>
  ),
  qualify: (
    <>
      <path d="M-13-10H3L13 0 3 10H-13Z" />
      <circle cx="-6" cy="0" r="2.5" />
    </>
  ),
  prioritise: <path d="M-12-8H12M-12-1H6M-12 6H0M-12 13H-6" />,
  notify: <path d="M-10 6V-1A10 10 0 0 1 10-1V6L13 10H-13ZM-3 13A3 3 0 0 0 3 13" />,
  fix: <path d="M8-13A7 7 0 0 0 2-3L-11 10A2.5 2.5 0 0 0-7 14L6 1A7 7 0 0 0 13-8L8-4 4-8Z" />,
  govern: (
    <>
      <path d="M0-14L12-9V0C12 7 7 12 0 15C-7 12-12 7-12 0V-9Z" />
      <path d="M-5 0L-1 4 6-4" />
    </>
  ),
};

// ---------- 1 · FoodChéri ----------
function FoodCheri() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={92} t="FOODCHÉRI · ASKED: MORE DASHBOARDS" c="strong" />
      <Inspectable
        id="nd-requests"
        title="Requests, one by one"
        body="Every team asked the Data team for more dashboards.|Each request waited for one of two people."
      >
        <g>
          <Lab x={40} y={134} t="REQUESTS" />
          {[0, 1, 2, 3, 4].map((i) => (
            <Sheet key={i} x={40 + i * 30} y={152} />
          ))}
          <Move path="M40 166H226" dur={4}>
            <circle className="tx-alert" r="5" />
          </Move>
          <Arrow from={[196, 166]} to={[226, 166]} />
          {[0, 1].map((i) => (
            <User key={i} x={250 + i * 34} y={190} s={1.1} c="on" />
          ))}
          <Lab x={267} y={134} t="2 PRODUCERS" c="center" />
          <Sub x={267} y={216} t="The Data team" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[306, 166]} to={[346, 166]} />
      <Inspectable
        id="nd-graveyard"
        title="A graveyard of 600"
        body="More than 600 Tableau dashboards, about one in ten used regularly.|More dashboards would only feed it."
      >
        <g>
          <Win x={352} y={112} w={300} h={150} title="TABLEAU · 600+ DASHBOARDS">
            {Array.from({ length: 75 }, (_, i) => (
              <rect
                key={i}
                className={i % 10 === 6 ? 'dl-tenth' : 'dl-cell'}
                style={i % 10 === 6 ? vars({ '--i': Math.floor(i / 10) }) : undefined}
                x={368 + (i % 15) * 18.5}
                y={146 + Math.floor(i / 15) * 21}
                width="14"
                height="14"
                rx="2"
              />
            ))}
          </Win>
          <Sub x={352} y={282} t="A graveyard: about 1 in 10 used" />
        </g>
      </Inspectable>
      <Inspectable
        id="nd-seen"
        title="Seen: a bottleneck"
        body="The problem was not the number of dashboards: it was two people producing all of them.|The need behind the request."
      >
        <g>
          <Medal x={724} y={186} r={30} i={icon.lens} on />
          <Lab x={768} y={180} t="SEEN" c="warm" />
          <Sub x={768} y={200} t="A bottleneck of two people" />
        </g>
      </Inspectable>
      <Needed t="NEEDED · TEAMS BUILDING THEIR OWN ANALYSES" />
      <Built s="A platform, a tool and training" />
      <Inspectable
        id="nd-platform"
        title="The Data Platform"
        body="FoodChéri’s first Data Platform: curated tables in BigQuery, the Data warehouse.|Clean Data anyone can query."
      >
        <g>
          <Db cx={100} y={368} w={100} h={96} />
          <Sub x={100} y={488} t="BigQuery · curated" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[154, 416]} to={[208, 416]} />
      <Inspectable
        id="nd-metabase"
        title="Metabase, self-service BI"
        body="Metabase: a BI tool usable after a short training.|Teams build their own questions and dashboards."
      >
        <Win x={214} y={360} w={220} h={136} title="METABASE · SELF-SERVICE">
          <Bars x={230} y={392} w={188} h={92} vals={[0.4, 0.6, 0.5, 0.75, 0.7, 0.9]} />
        </Win>
      </Inspectable>
      <Arrow from={[440, 428]} to={[484, 428]} />
      <Inspectable
        id="nd-training"
        title="Training, team by team"
        body="Documentation, how-to videos and training for each team.|Pedagogy is the art of repetition."
      >
        <g>
          <Medal x={520} y={428} r={30} i={icon.training} on />
          <Lab x={520} y={482} t="TRAINING" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[556, 428]} to={[596, 428]} />
      <Inspectable
        id="nd-producers"
        title="From 2 to 25"
        body="Active analysis producers went from 2 to 25.|Teams answer their own questions."
      >
        <g>
          {Array.from({ length: 25 }, (_, i) => (
            <User
              key={i}
              x={618 + (i % 5) * 28}
              y={386 + Math.floor(i / 5) * 26}
              s={0.55}
              c={i < 2 ? 'on' : 'tx-lit-seq'}
              style={vars({ '--i': i })}
            />
          ))}
          <T x={780} y={436} className="tx-big">
            2 → 25
          </T>
          <Sub x={780} y={462} t="Active analysis producers" />
        </g>
      </Inspectable>
      <Close t="ASKED: DASHBOARDS. NEEDED: AUTONOMY." s="From 2 to 25 active analysis producers.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="food-data"
          kicker="EARTH · FOODCHÉRI DATA"
          sub="BI Engineer / Data Product Owner"
        />
      </Close>
    </Layer>
  );
}

// ---------- 2 · Ligne C ----------
const people: [string, React.ReactNode][] = [
  ['STATION STAFF', icon.phone],
  ['WELCOME PROVIDERS', icon.badge],
  ['LOCAL AUTHORITIES', icon.building],
  ['PLATFORM BOARDS', icon.board],
  ['ANNOUNCEMENTS', icon.speaker],
];
const py = (k: number) => 368 + k * 34;
function LigneC() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={92} t="LIGNE C · ASKED: CARE PLANS FOR 42 STATIONS" c="strong" />
      <Inspectable
        id="nd-plans"
        title="42 care plans"
        body="One passenger-care plan per station, for works, events and incidents.|What was asked: plans, on paper."
      >
        <g>
          {Array.from({ length: 42 }, (_, i) => (
            <Sheet key={i} x={40 + (i % 21) * 28} y={120 + Math.floor(i / 21) * 44} />
          ))}
          <Sub x={40} y={226} t="One plan per station, on paper" />
        </g>
      </Inspectable>
      <Inspectable
        id="nd-seen-c"
        title="Seen: people make a plan work"
        body="A plan works only if the people on the ground can carry it out.|The need behind the request."
      >
        <g>
          <Medal x={680} y={170} r={30} i={icon.lens} on />
          <Lab x={724} y={164} t="SEEN" c="warm" />
          <Sub x={724} y={184} t="A plan works only if people" />
          <Sub x={724} y={204} t="on the ground can carry it out" />
        </g>
      </Inspectable>
      <Needed t="NEEDED · PEOPLE ABLE TO ACT" />
      <Built s="Tools and information for each of them" />
      <Inspectable
        id="nd-plan"
        title="One plan, many hands"
        body="Each plan says who does what, where and when.|Shared with every person who acts on it."
      >
        <Win x={40} y={370} w={160} h={136} title="CARE PLAN">
          {[0, 1, 2, 3].map((i) => (
            <Fragment key={i}>
              <Check x={60} y={412 + i * 24} />
              <path className="tx-grid" d={`M76 ${412 + i * 24}H186`} />
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="nd-people"
        title="Tools and information for each"
        body="Station staff, welcome providers, local authorities, platform boards and announcements: each with what it needs to act.|I negotiated each one’s part, or coordinated an existing arrangement."
      >
        <g>
          {people.map(([t, i], k) => (
            <Fragment key={t}>
              <Link d={`M206 438C260 438 270 ${py(k)} 316 ${py(k)}`} />
              <g className="tx-icon" transform={`translate(334 ${py(k)}) scale(.8)`}>
                {i}
              </g>
              <T x={356} y={py(k) + 4} className="tx-win-t">
                {t}
              </T>
              <Link d={`M486 ${py(k)}C560 ${py(k)} 580 438 640 438`} />
            </Fragment>
          ))}
          <Move path="M206 438C260 438 270 368 316 368" dur={2.4}>
            <circle className="tx-alert" r="5" />
          </Move>
          <Move path="M486 504C560 504 580 438 640 438" dur={2.4} begin={1.2}>
            <circle className="tx-alert" r="5" />
          </Move>
        </g>
      </Inspectable>
      <Inspectable
        id="nd-assess"
        title="The first assessment"
        body="Indicators on staff work and fixed equipment, followed as Île-de-France Mobilités requires.|The first way to know whether the plans did their job."
      >
        <Win x={646} y={368} w={314} h={140} title="FIRST ASSESSMENT · INDICATORS">
          {['Staff work', 'Fixed equipment'].map((t, k) => (
            <Fragment key={t}>
              <Sub x={664} y={414 + k * 44} t={t} />
              <rect className="tx-gauge" x={790} y={402 + k * 44} width="150" height="14" rx="3" />
              <rect
                className="vs-fill"
                style={vars({ '--i': k })}
                x={790}
                y={402 + k * 44}
                width="150"
                height="14"
                rx="3"
              />
            </Fragment>
          ))}
          <Sub x={664} y={496} t="Shown without values" />
        </Win>
      </Inspectable>
      <Close
        t="ASKED: PLANS. NEEDED: PEOPLE ABLE TO ACT."
        s="Benchmarked by other Transilien lines; recognised by RATP’s RER B."
      >
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="ligne-c"
          kicker="EARTH · LIGNE C"
          sub="Passenger Care and Information Manager"
        />
      </Close>
    </Layer>
  );
}

// ---------- 3 · Verisure ----------
const tests: [string, string, boolean][] = [
  ['not_null', 'orders.id', true],
  ['unique', 'customers.id', true],
  ['freshness', 'payments', false],
  ['accepted', 'alarms.status', true],
];
const signals: [string, number[]][] = [
  ['Test results', [0.7, 0.7, 0.4, 0.7, 0.7, 0.7, 0.5, 0.7]],
  ['Freshness', [0.6, 0.6, 0.6, 0.3, 0.6, 0.6, 0.6, 0.6]],
  ['Volume', [0.5, 0.55, 0.5, 0.6, 0.55, 0.9, 0.55, 0.6]],
  ['Schema changes', [0.4, 0.4, 0.4, 0.4, 0.8, 0.4, 0.4, 0.4]],
];
const chain: [string, React.ReactNode][] = [
  ['DETECT', icon.detect],
  ['QUALIFY', icon.qualify],
  ['PRIORITISE', icon.prioritise],
  ['NOTIFY', icon.notify],
  ['FIX', icon.fix],
  ['GOVERN', icon.govern],
];
const cx = (k: number) => 90 + k * 164;
function Verisure() {
  return (
    <Layer steps={[2]}>
      <Lab x={40} y={92} t="VERISURE · ASKED: DATA TESTS" c="strong" />
      <Inspectable
        id="nd-tests"
        title="Data tests"
        body="Automated tests on the Data: not null, unique, fresh, accepted values.|What was asked."
      >
        <Win x={40} y={112} w={300} h={164} title="ELEMENTARY · TEST RUN">
          {tests.map(([t, tb, ok], i) => (
            <Fragment key={t}>
              <Check x={60} y={152 + i * 26} ok={ok} />
              <T x={78} y={156 + i * 26} className="tx-win-t">
                {t}
              </T>
              <T x={176} y={156 + i * 26} className="tx-win-t dim">
                {tb}
              </T>
            </Fragment>
          ))}
          <T x={60} y={262} className="tx-win-t">
            525 TESTS A DAY
          </T>
        </Win>
      </Inspectable>
      <Inspectable
        id="nd-signals"
        title="Seen: one signal among others"
        body="A test result is one signal; freshness, volume and schema changes are others.|To see the health of the Data, all of them together."
      >
        <g>
          <Lab x={380} y={124} t="SEEN · ONE SIGNAL AMONG OTHERS" c="warm" />
          {signals.map(([t, v], i) => (
            <Fragment key={t}>
              <Sub x={380} y={160 + i * 32} t={t} />
              <Spark x={540} y={146 + i * 32} w={410} h={20} vals={v} c={i === 0 ? 'on' : ''} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Needed t="NEEDED · TO SEE DATA HEALTH" />
      <Built s="A Data Quality and Observability platform" />
      <Inspectable
        id="nd-platform-v"
        title="Detect, qualify, prioritise, notify, fix, govern"
        body="Each anomaly detected, qualified, prioritised and sent to the team that owns it, then fixed; rules governed.|An alert is worth its fix."
      >
        <g>
          {chain.map(([t, i], k) => (
            <Fragment key={t}>
              <Medal x={cx(k)} y={392} r={26} i={i} on={t === 'FIX'} />
              <Lab x={cx(k)} y={436} t={t} c={`center${t === 'FIX' ? ' warm' : ''}`} />
              {k < 5 && <Arrow from={[cx(k) + 30, 392]} to={[cx(k + 1) - 32, 392]} />}
            </Fragment>
          ))}
          <Move path={`M${cx(0)} 392H${cx(5)}`} dur={8}>
            <circle className="tx-alert" r="5" />
          </Move>
        </g>
      </Inspectable>
      <Inspectable
        id="nd-health"
        title="Data health, visible"
        body="Dashboards on the health of the Data Platform, and its trends.|What the teams needed to see."
      >
        <Win x={40} y={456} w={920} h={92} title="DATA HEALTH · DASHBOARD">
          <Spark
            x={60}
            y={488}
            w={880}
            h={48}
            vals={[0.4, 0.45, 0.35, 0.5, 0.55, 0.5, 0.62, 0.7, 0.68, 0.78, 0.82, 0.86]}
            c="on"
          />
        </Win>
      </Inspectable>
      <Close
        t="ASKED: DATA TESTS. NEEDED: TO SEE DATA HEALTH."
        s="Each alert qualified, then fixed, before the business finds it."
      >
        <CaseChip x={560} y={578} w={400} to="verisure" kicker="EARTH · VERISURE" sub="Analytics Engineer" />
      </Close>
    </Layer>
  );
}

export default function NeedScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="ACROSS EVERY ROLE · THE NEED BEHIND THE NEED" />
      <FoodCheri />
      <LigneC />
      <Verisure />
    </>
  );
}
