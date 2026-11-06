// Earth · Verisure: why Verisure, errors found by the business first, what I understood, the platform, in operation, the result.
// Rhythm, values and incident examples are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  CaseChip,
  Check,
  Code,
  Db,
  Header,
  Lab,
  Link,
  OpsDefs,
  Spark,
  Sub,
  T,
  User,
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

const Eye = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <path d="M-16 0C-8-10 8-10 16 0C8 10-8 10-16 0Z" />
    <circle r="4" />
  </g>
);
const Bell = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <path d="M-10 6V-2A10 10 0 0 1 10-2V6L13 10H-13Z" />
    <path d="M-3 14H3" />
  </g>
);
const Globe = ({ x, y, r = 46 }: { x: number; y: number; r?: number }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <circle r={r} />
    <ellipse rx={r * 0.45} ry={r} />
    <path d={`M${-r} 0H${r}M${-r * 0.86} ${-r / 2}H${r * 0.86}M${-r * 0.86} ${r / 2}H${r * 0.86}`} />
  </g>
);

function WhyVerisure() {
  return (
    <Layer steps={[0]}>
      <Inspectable
        id="vs-apprentice"
        title="Apprentice, alongside EFREI"
        body="Analytics Engineer apprentice at Verisure, alongside my engineering degree at EFREI.|Work and study, each feeding the other."
      >
        <g>
          <Lab x={40} y={110} t="ANALYTICS ENGINEER · APPRENTICE" c="warm" />
          <Sub x={40} y={132} t="Alongside my engineering degree" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              className={`tx-gantt${i % 4 === 3 ? ' evening' : ''}`}
              x={40 + i * 36}
              y={156}
              width="30"
              height="22"
              rx="2"
            />
          ))}
          <rect className="tx-gantt" x={40} y={198} width="16" height="12" rx="2" />
          <Sub x={64} y={209} t="Verisure" />
          <rect className="tx-gantt evening" x={160} y={198} width="16" height="12" rx="2" />
          <Sub x={184} y={209} t="EFREI" />
          <Sub x={260} y={209} t="Rhythm illustrative" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-scale"
        title="A company at scale"
        body="Verisure operates worldwide and grows year after year.|Chosen for that scale: Data that matters to many."
      >
        <g>
          <Globe x={170} y={400} r={90} />
          {[
            [130, 360],
            [200, 380],
            [160, 440],
            [220, 430],
            [110, 410],
          ].map(([x, y], i) => (
            <circle key={i} className="tx-led" cx={x} cy={y} r="5" style={vars({ '--i': i })} />
          ))}
          <Lab x={290} y={370} t="WORLDWIDE" />
          <Win x={520} y={280} w={300} h={200} title="GROWING YEAR AFTER YEAR">
            <Bars x={540} y={316} w={260} h={140} vals={[0.35, 0.45, 0.55, 0.68, 0.8, 0.95]} />
          </Win>
          <Sub x={520} y={504} t="Illustrative" />
        </g>
      </Inspectable>
    </Layer>
  );
}

function StartingPoint() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={100} t="BEFORE · ERRORS FOUND BY THE BUSINESS FIRST" c="strong" />
      <Inspectable
        id="vs-marts"
        title="Data marts checked by eye"
        body="Some Data marts were checked manually, or by eye.|Slow, and easy to miss."
      >
        <g>
          {[0, 1, 2].map((i) => (
            <Fragment key={i}>
              <Db cx={90 + i * 120} y={160} w={80} h={90} />
              <Eye x={90 + i * 120} y={290} />
            </Fragment>
          ))}
          <Lab x={40} y={340} t="DATA MARTS" />
          <Sub x={40} y={362} t="Checked manually or by eye" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-report"
        title="An incoherent KPI"
        body="An anomaly often surfaced in a business report, through a KPI that made no sense.|The business found it before the Data team did."
      >
        <g>
          <Win x={460} y={140} w={260} h={180} title="BUSINESS REPORT">
            <Spark x={480} y={180} w={220} h={90} vals={[0.5, 0.55, 0.52, 0.58, 0.05, 0.6]} c="on" />
            <circle className="tx-ping" cx={656} cy={265} r="12" />
          </Win>
          <User x={790} y={260} s={1.2} c="on" />
          <path className="tx-bubble" d="M770 168h80v34h-50l-10 10v-10h-20z" />
          <T x={810} y={190} className="center tx-big small">
            ?
          </T>
          <Sub x={460} y={344} t="Found through a report" />
        </g>
      </Inspectable>
      <path className="tx-link" d="M800 290C800 420 300 420 300 390" />
      <path className="tx-head" transform="translate(300 392) rotate(-90)" d="M2 0L-9-6V6Z" />
      <Sub x={480} y={440} t="Back to the Data team, after the fact" />
      <Inspectable
        id="vs-request"
        title="The request"
        body="A mechanism to test Data and detect anomalies proactively.|What I was asked to build."
      >
        <g>
          <rect className="tx-layer-q" x="40" y="500" width="920" height="90" rx="4" />
          <Lab x={60} y={534} t="THE REQUEST" c="warm" />
          <T x={60} y={566} className="card-title">
            Test Data and detect anomalies, proactively
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

const needs = ['DETECT', 'QUALIFY', 'PRIORITISE', 'HISTORY', 'NOTIFY', 'GOVERN'];

function Understood() {
  return (
    <Layer steps={[2]}>
      <Inspectable
        id="vs-signals"
        title="Tests are one signal among others"
        body="Data tests are one source of signals about Data health.|Other signals can join later."
      >
        <g>
          <Lab x={40} y={110} t="SIGNALS" />
          <rect className="tx-app" x="40" y="130" width="170" height="44" rx="4" />
          <Lab x={58} y={158} t="DATA TESTS" c="warm" />
          {[0, 1].map((i) => (
            <Fragment key={i}>
              <rect className="tx-app dashed" x="40" y={190 + i * 60} width="170" height="44" rx="4" />
              <Sub x={58} y={218 + i * 60} t="Other signal" />
            </Fragment>
          ))}
          {[152, 212, 272].map((y) => (
            <Link key={y} d={`M214 ${y}C260 ${y} 260 212 300 212`} />
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="vs-health"
        title="Observe Data health"
        body="The real need: observe Data health, beyond running tests.|Detect, qualify, prioritise, keep the history, notify, govern."
      >
        <g>
          <rect className="tx-layer" x="306" y="130" width="654" height="164" rx="4" />
          <Lab x={326} y={160} t="THE NEED · OBSERVE DATA HEALTH" c="warm" />
          {needs.map((t, i) => (
            <Fragment key={t}>
              <circle className="tx-stage" cx={350 + i * 106} cy={220} r="12" />
              <Lab x={350 + i * 106} y={262} t={t} c="center" />
              {i < 5 && <path className="tx-link" d={`M${364 + i * 106} 220H${442 + i * 106}`} />}
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="vs-cost"
        title="The cost of an undetected anomaly"
        body="The more decisions depend on Data, the more an undetected anomaly costs.|The reason to observe, not only test."
      >
        <g>
          <Lab x={40} y={380} t="DECISIONS ON DATA → COST OF AN UNDETECTED ANOMALY" />
          <path className="tx-axis" d="M60 410V580H600" />
          <path className="tx-spark on" d="M60 570C220 560 380 520 590 420" />
          <Sub x={600} y={596} t="Decisions that depend on Data" c="end" />
          <Sub x={70} y={426} t="Cost" />
        </g>
      </Inspectable>
    </Layer>
  );
}

function ThePlatform() {
  return (
    <Layer steps={[3]}>
      <Lab x={40} y={100} t="DATA QUALITY AND OBSERVABILITY PLATFORM" c="strong" />
      <Sub x={40} y={124} t="Designed within the existing tools and constraints" />
      <Inspectable
        id="vs-snowflake"
        title="Snowflake · the Data warehouse"
        body="Snowflake: the cloud Data warehouse where Verisure’s Data marts live.|What the platform watches."
      >
        <g>
          <Lab x={40} y={156} t="SNOWFLAKE · DATA WAREHOUSE" c="warm" />
          <Db cx={130} y={186} w={150} h={140} />
          <Sub x={130} y={350} t="Data marts" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[212, 256]} to={[268, 256]} />
      <Inspectable
        id="vs-dbt"
        title="dbt Core tests"
        body="dbt Core runs the Data tests on the marts.|The first observability domain."
      >
        <Win x={274} y={170} w={220} h={170} title="DBT CORE · TESTS">
          <Code
            x={290}
            y={216}
            lh={22}
            lines={['tests:', '  - not_null', '  - unique', '  - relationships']}
          />
        </Win>
      </Inspectable>
      <Arrow from={[500, 256]} to={[556, 256]} />
      <Inspectable
        id="vs-elementary"
        title="Elementary"
        body="Elementary collects every test result and its history.|The base for alerts and monitoring."
      >
        <Win x={562} y={170} w={200} h={170} title="ELEMENTARY · RESULTS">
          {[0, 1, 2, 3].map((i) => (
            <Fragment key={i}>
              <Check x={584} y={212 + i * 30} ok={i !== 2} />
              <rect className="tx-gauge" x={602} y={206 + i * 30} width="140" height="12" rx="2" />
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="vs-layer"
        title="A common alert model, in a transverse layer"
        body="One alert model shared by every observability domain.|Alerts look and behave the same, whatever their source."
      >
        <g>
          <rect className="tx-layer top" x="40" y="400" width="920" height="64" rx="4" />
          <Lab x={60} y={438} t="COMMON ALERT MODEL · TRANSVERSE LAYER" c="warm" />
          <path className="tx-link" d="M384 340V400M662 340V400" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-domains"
        title="Room for new domains"
        body="dbt tests are the first observability domain.|Others plug into the same layer, without redesign."
      >
        <g>
          <rect className="tx-app" x="40" y="500" width="280" height="60" rx="4" />
          <Lab x={60} y={536} t="DOMAIN 1 · DBT TESTS" />
          {[0, 1].map((i) => (
            <Fragment key={i}>
              <rect className="tx-app dashed" x={360 + i * 300} y="500" width="260" height="60" rx="4" />
              <Sub x={380 + i * 300} y={536} t="Next domain · same model" />
            </Fragment>
          ))}
          <path className="tx-link" d="M180 464V500M490 464V500M790 464V500" />
        </g>
      </Inspectable>
    </Layer>
  );
}

function InOperation() {
  return (
    <Layer steps={[4]}>
      <Inspectable
        id="vs-525"
        title="525 tests a day"
        body="525 automated tests run every day; about 60,000 executions so far.|Industrialised: no manual run."
      >
        <g>
          <Lab x={40} y={100} t="TODAY · 525 TESTS" c="warm" />
          {Array.from({ length: 525 }, (_, i) => (
            <rect
              key={i}
              className={`tx-run${i === 137 || i === 402 ? ' ko' : ''}`}
              x={40 + (i % 35) * 12}
              y={116 + Math.floor(i / 35) * 12}
              width="9"
              height="9"
              rx="1"
            />
          ))}
          <T x={40} y={340} className="tx-big">
            ~60,000
          </T>
          <Sub x={40} y={366} t="Executions so far" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-alert"
        title="Qualified, prioritised, sent"
        body="Each anomaly is qualified and prioritised, then sent to the team concerned.|Teams treat each anomaly quickly."
      >
        <g>
          <Win x={520} y={96} w={260} h={140} title="ALERT · ILLUSTRATIVE">
            <Lab x={536} y={140} t="QUALIFIED · HIGH PRIORITY" c="warm" />
            <Sub x={536} y={164} t="orders_mart · unique key" />
            <Sub x={536} y={186} t="Owner: the team concerned" />
          </Win>
          <Arrow from={[786, 166]} to={[836, 166]} />
          <Bell x={866} y={160} />
          <User x={916} y={190} s={0.9} c="on" />
          <Sub x={842} y={226} t="Team notified" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-monitor"
        title="Monitoring"
        body="What is happening, the trends, where to focus effort.|One view for the teams and their managers."
      >
        <Win x={520} y={276} w={440} h={220} title="MONITORING · TRENDS">
          <Spark x={540} y={316} w={220} h={150} vals={[0.7, 0.55, 0.6, 0.4, 0.35, 0.25]} c="on" />
          <Bars x={780} y={316} w={160} h={150} vals={[0.9, 0.5, 0.3, 0.2]} />
          <Sub x={540} y={486} t="Where to focus effort" />
        </Win>
      </Inspectable>
    </Layer>
  );
}

function Result() {
  return (
    <Layer steps={[5]}>
      <Inspectable
        id="vs-earlier"
        title="Issues surface earlier"
        body="Anomalies are caught by tests, before a business report shows them.|Fewer manual controls."
      >
        <g>
          <Lab x={40} y={110} t="WHEN AN ISSUE SURFACES" />
          <path className="tx-route" d="M40 160H600" />
          {['LOAD', 'TEST', 'MART', 'REPORT'].map((t, i) => (
            <Fragment key={t}>
              <circle className="tx-stage" cx={60 + i * 170} cy={160} r="9" />
              <T x={60 + i * 170} y={190} className="center tx-win-t">
                {t}
              </T>
            </Fragment>
          ))}
          <circle className="tx-stage on" cx={230} cy={160} r="12" />
          <Lab x={230} y={136} t="NOW" c="center warm" />
          <Lab x={570} y={136} t="BEFORE" c="center" />
          <path className="tx-beam" d="M560 170C460 220 330 220 240 172" />
        </g>
      </Inspectable>
      <Inspectable
        id="vs-trust"
        title="Trust at every level"
        body="Teams, managers and leadership rely on the same Data with more confidence.|Trust in Data improved across the company."
      >
        <g>
          <Lab x={40} y={290} t="TRUST IN DATA · EVERY LEVEL" c="warm" />
          {(
            [
              ['LEADERSHIP', 1],
              ['MANAGERS', 3],
              ['TEAMS', 6],
            ] as const
          ).map(([t, n], r) => (
            <Fragment key={t}>
              {Array.from({ length: n }, (_, i) => (
                <User key={i} x={330 - (n - 1) * 22 + i * 44} y={340 + r * 60} s={0.8} c="on" />
              ))}
              <Check x={520} y={330 + r * 60} />
              <Sub x={540} y={335 + r * 60} t={t.charAt(0) + t.slice(1).toLowerCase()} />
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
          <Lab x={680} y={290} t="READY FOR NEW DOMAINS" />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              className={`tx-app${i ? ' dashed' : ''}`}
              x={680}
              y={310 + i * 54}
              width="260"
              height="42"
              rx="4"
            />
          ))}
          <Sub x={698} y={336} t="dbt tests" />
          <Sub x={698} y={390} t="Next domain" />
          <Sub x={698} y={444} t="Next domain" />
        </g>
      </Inspectable>
      <CaseChip
        x={40}
        y={560}
        w={460}
        to="signal"
        kicker="HIGH-STAKES · SIGNAL OR NOISE"
        sub="Governed alert exceptions"
      />
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
      <Result />
    </>
  );
}
