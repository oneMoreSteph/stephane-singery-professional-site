// Sentinel · Build for production: one Data system, three layers, one role each.
// SQL, table names, node counts and curves are illustrative; tools and facts are from each role.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  CaseChip,
  Check,
  Code,
  DataChain,
  Db,
  Graph,
  Header,
  Lab,
  Link,
  Move,
  OpsDefs,
  Server,
  Spark,
  Sub,
  T,
  User,
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
const Flow = ({ d, dur = 2.4, begin = 0 }: { d: string; dur?: number; begin?: number }) => (
  <Move path={d} dur={dur} begin={begin}>
    <circle className="tx-alert" r="5" />
  </Move>
);
const Bucket = ({ x, y, w = 100 }: { x: number; y: number; w?: number }) => (
  <g>
    <path className="tx-bucket" d={`M${x} ${y}H${x + w}L${x + w - 10} ${y + 58}H${x + 10}Z`} />
    {[0, 1, 2].map((i) => (
      <path key={i} className="tx-doc" d={`M${x + w / 2 - 36 + i * 25} ${y + 12}h15l5 5v25h-20Z`} />
    ))}
  </g>
);
/** The three layers of one Data system; the current one lit. */
const LAYERS: [string, number][] = [
  ['ACCESS', 86],
  ['TRANSFORMATION', 140],
  ['OBSERVABILITY', 132],
];
const LEFTS = LAYERS.map((_, i) => 960 - LAYERS.slice(i).reduce((a, [, w]) => a + w + 8, -8));
function Layers({ on }: { on: number }) {
  return (
    <g>
      {LAYERS.map(([t, w], i) => (
        <Fragment key={t}>
          <rect
            className={`tx-track${i === on ? ' done' : ' next'}`}
            x={LEFTS[i]}
            y={76}
            width={w}
            height="24"
            rx="12"
          />
          <T x={LEFTS[i] + w / 2} y={92} className={`center tx-win-t${i === on ? '' : ' dim'}`}>
            {`${i + 1} · ${t}`}
          </T>
        </Fragment>
      ))}
    </g>
  );
}
const icon = {
  plug: (
    <>
      <path d="M-15-9L0-17 15-9V9L0 17-15 9Z" />
      <path d="M-5-6V-1M5-6V-1M-8-1H8V3A8 8 0 0 1-8 3ZM0 11V15" />
    </>
  ),
  clock: (
    <>
      <circle r="14" />
      <path d="M0-8V0L6 4" />
    </>
  ),
  fix: <path d="M8-13A7 7 0 0 0 2-3L-11 10A2.5 2.5 0 0 0-7 14L6 1A7 7 0 0 0 13-8L8-4 4-8Z" />,
};

// ---------- 1 · Access · FoodChéri ----------
function Access() {
  return (
    <Layer steps={[0]}>
      <DataChain
        id="st-chain-a"
        steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']}
        on={[0, 1, 2, 3]}
      />
      <Lab x={40} y={92} t="ONE DATA SYSTEM · FOODCHÉRI" c="strong" />
      <Layers on={0} />
      <Inspectable
        id="st-sources"
        title="Two sources, side by side"
        body="Redshift (FoodChéri, structured) and MongoDB (Seazon, NoSQL, semi-structured).|Two companies’ Data, in one platform."
      >
        <g>
          <Lab x={95} y={146} t="REDSHIFT" c="center" />
          <Db cx={95} y={158} w={90} h={80} />
          <Sub x={95} y={258} t="FoodChéri" c="center" />
          <Lab x={95} y={300} t="MONGODB · NOSQL" c="center" />
          <Db cx={95} y={312} w={90} h={80} />
          <Sub x={95} y={412} t="Seazon" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[144, 200]} to={[214, 262]} />
      <Arrow from={[144, 352]} to={[214, 290]} />
      <Flow d="M144 200L214 262" />
      <Flow d="M144 352L214 290" begin={1.2} />
      <Inspectable
        id="st-ingest"
        title="Ingestion, a ready-made tool"
        body="A ready-made ingestion tool, chosen after an audit, loads both sources into the warehouse (ELT).|No ingestion code to maintain."
      >
        <g>
          <Medal x={250} y={276} r={34} i={icon.plug} />
          <Lab x={250} y={226} t="INGESTION" c="center" />
          <Sub x={250} y={358} t="Chosen after an audit" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[288, 276]} to={[338, 276]} />
      <Inspectable
        id="st-raw"
        title="BigQuery · raw"
        body="BigQuery: Google’s cloud Data warehouse. The raw layer keeps the Data as loaded.|The base every model reads."
      >
        <g>
          <Lab x={390} y={216} t="BIGQUERY · RAW" c="center" />
          <Db cx={390} y={228} w={90} h={96} />
        </g>
      </Inspectable>
      <Arrow from={[440, 276]} to={[474, 276]} />
      <Inspectable
        id="st-sql"
        title="SQL models"
        body="SQL transformations from raw tables to curated tables.|The figures, defined once for every team."
      >
        <Win x={480} y={210} w={176} h={132} title="SQL MODELS">
          <Code
            x={494}
            y={254}
            lh={20}
            lines={['SELECT order_id,', '  hub, total', 'FROM raw.orders', 'WHERE …']}
          />
        </Win>
      </Inspectable>
      <Arrow from={[662, 276]} to={[692, 276]} />
      <Inspectable
        id="st-curated"
        title="BigQuery · curated"
        body="Curated tables, ready to analyse.|What every team queries."
      >
        <g>
          <Lab x={740} y={216} t="CURATED" c="center warm" />
          <Db cx={740} y={228} w={90} h={96} />
        </g>
      </Inspectable>
      <Arrow from={[790, 276]} to={[816, 276]} />
      <Inspectable
        id="st-metabase"
        title="Metabase, self-service BI"
        body="Open-source Metabase, deployed by me in a container on App Engine.|Teams build their own analyses."
      >
        <g>
          <Win x={822} y={210} w={138} h={132} title="METABASE">
            <Bars x={836} y={242} w={110} h={84} vals={[0.5, 0.8, 0.6, 0.9]} />
          </Win>
          <Sub x={891} y={362} t="On App Engine" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[891, 372]} to={[891, 402]} />
      <Inspectable
        id="st-teams"
        title="Every team"
        body="Operations, supply, marketing, finance, customer care, product.|From 2 to 25 active analysis producers."
      >
        <g>
          {[0, 1, 2, 3].map((i) => (
            <User key={i} x={852 + i * 26} y={444} s={0.7} />
          ))}
          <Sub x={891} y={470} t="Business teams" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="st-mine-a"
        title="What I built"
        body="I built the pipelines and the models, and deployed the BI tool.|FoodChéri’s first end-to-end Data Platform."
      >
        <g>
          <path className="tx-promise" d="M210 442V452H790V442" />
          <Lab x={500} y={478} t="I BUILT THE PIPELINES AND THE MODELS" c="center warm" />
        </g>
      </Inspectable>
      <Close t="ACCESS · DATA EVERY TEAM CAN USE" s="Curated tables and self-service BI.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="food-data"
          kicker="EARTH · FOODCHÉRI DATA"
          sub="The first Data Platform"
        />
      </Close>
    </Layer>
  );
}

// ---------- 2 · Transformation · Heetch ----------
function Transformation() {
  return (
    <Layer steps={[1]}>
      <DataChain id="st-chain-t" steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']} on={[1, 2]} />
      <Lab x={40} y={92} t="ONE DATA SYSTEM · HEETCH" c="strong" />
      <Layers on={1} />
      <Inspectable
        id="st-inputs"
        title="Raw tables and GCS files"
        body="Sources loaded into BigQuery’s raw layer; GCS files beside it, read directly by the models.|Every input, every hour."
      >
        <g>
          <Server x={40} y={170} w={64} n={3} />
          <Sub x={72} y={286} t="Sources" c="center" />
          <Arrow from={[108, 202]} to={[148, 202]} />
          <Lab x={200} y={150} t="BIGQUERY · RAW" c="center" />
          <Db cx={200} y={162} w={90} h={86} />
          <Lab x={200} y={324} t="GCS · FILES" c="center" />
          <Bucket x={150} y={336} />
          <Sub x={200} y={418} t="Read directly" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[250, 206]} to={[314, 232]} />
      <Arrow from={[252, 364]} to={[314, 330]} />
      <Flow d="M250 206L314 232" />
      <Flow d="M252 364L314 330" begin={1.2} />
      <Inspectable
        id="st-hourly"
        title="Every hour"
        body="Dataform schedules run every model in order, every hour, GCS objects included, with a tag policy.|Fresh results each hour."
      >
        <g>
          <Medal x={340} y={146} r={20} i={icon.clock} on />
          <Lab x={368} y={151} t="EVERY HOUR · TAG POLICY" />
        </g>
      </Inspectable>
      <Inspectable
        id="st-dataform"
        title="Dataform · incremental SQL models"
        body="Incremental models process only new, updated and late rows; reusable tests run on each.|Logic safe to change, easy to maintain."
      >
        <g>
          <Win x={320} y={176} w={330} h={240} title="DATAFORM · INCREMENTAL SQL MODELS" />
          <Graph
            nodes={[
              [356, 230],
              [356, 300],
              [356, 370],
              [470, 265],
              [470, 345],
              [600, 305],
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
          {[
            [470, 265],
            [470, 345],
            [600, 305],
          ].map(([x, y]) => (
            <Check key={`${x}${y}`} x={x + 14} y={y - 14} />
          ))}
          <Sub x={336} y={404} t="Only new, updated and late rows" />
        </g>
      </Inspectable>
      <Arrow from={[656, 296]} to={[690, 296]} />
      <Inspectable
        id="st-curated-t"
        title="BigQuery · curated"
        body="Tested tables, refreshed every hour.|What BI and AI read."
      >
        <g>
          <Lab x={736} y={236} t="CURATED" c="center warm" />
          <Db cx={736} y={248} w={84} h={96} />
        </g>
      </Inspectable>
      <Link d="M782 280C800 280 800 220 822 220" />
      <Link d="M782 312C800 312 800 372 822 372" />
      <Inspectable
        id="st-bi"
        title="BI through Looker"
        body="Looker reads the curated tables.|Dashboards on the last hour’s Data."
      >
        <Win x={826} y={166} w={134} h={104} title="LOOKER · BI">
          <Bars x={840} y={196} w={106} h={62} vals={[0.5, 0.7, 0.6, 0.9]} />
        </Win>
      </Inspectable>
      <Inspectable
        id="st-ai"
        title="AI through Vertex AI"
        body="Vertex AI reads the same curated Data.|Models on fresher Data."
      >
        <Win x={826} y={318} w={134} h={104} title="VERTEX AI">
          <Graph
            nodes={[
              [852, 362],
              [852, 400],
              [892, 352],
              [892, 384],
              [932, 372],
            ]}
            edges={[
              [0, 2],
              [0, 3],
              [1, 3],
              [2, 4],
              [3, 4],
            ]}
          />
        </Win>
      </Inspectable>
      <Inspectable
        id="st-mine-t"
        title="What I built"
        body="I wrote nearly all the SQL models in Dataform, with their incremental logic and tests.|The transformation core of the platform."
      >
        <g>
          <path className="tx-promise" d="M320 442V452H650V442" />
          <Lab x={485} y={478} t="I WROTE NEARLY ALL THE SQL MODELS" c="center warm" />
        </g>
      </Inspectable>
      <Close t="TRANSFORMATION · TESTED, EVERY HOUR" s="Incremental SQL models, from daily toward hourly.">
        <CaseChip x={560} y={578} w={400} to="heetch" kicker="EARTH · HEETCH" sub="Data Engineer" />
      </Close>
    </Layer>
  );
}

// ---------- 3 · Observability · Verisure ----------
const marts = [300, 390, 480];
function Observability() {
  return (
    <Layer steps={[2]}>
      <DataChain id="st-chain-o" steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']} on={[2]} />
      <Lab x={40} y={92} t="ONE DATA SYSTEM · VERISURE" c="strong" />
      <Layers on={2} />
      <Inspectable
        id="st-dbt"
        title="dbt Core models"
        body="dbt Core: SQL models that build the marts in Snowflake.|The Data under watch."
      >
        <Win x={40} y={150} w={190} h={176} title="DBT CORE · MODELS">
          <Graph
            nodes={[
              [70, 200],
              [70, 250],
              [70, 300],
              [140, 225],
              [140, 285],
              [204, 255],
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
      <Arrow from={[236, 238]} to={[256, 238]} />
      <Inspectable
        id="st-marts"
        title="Snowflake marts, tested"
        body="Elementary tests run on the Snowflake marts: 525 a day.|One mart shows an anomaly."
      >
        <g>
          <Lab x={390} y={150} t="SNOWFLAKE · MARTS" c="center" />
          {marts.map((x, i) => (
            <Fragment key={x}>
              <Db cx={x} y={190} w={72} h={86} />
              {i === 2 ? <circle className="vs-anom" cx={x} cy={240} r="7" /> : <Check x={x} y={176} />}
            </Fragment>
          ))}
          <Lab x={480} y={176} t="!" c="center warm" />
          <Sub x={390} y={300} t="Elementary tests · 525 a day" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[522, 238]} to={[556, 238]} />
      <Inspectable
        id="st-model"
        title="One shared observability model"
        body="Every anomaly detected, qualified, prioritised and sent to the team that owns it.|One model for every domain."
      >
        <Win x={562} y={150} w={220} h={176} title="OBSERVABILITY MODEL">
          {['DETECT', 'QUALIFY', 'PRIORITISE', 'NOTIFY'].map((t, i) => (
            <Fragment key={t}>
              <circle className="tx-stage" cx={588} cy={196 + i * 34} r="9" />
              <T x={606} y={200 + i * 34} className="tx-win-t">
                {t}
              </T>
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="st-dash"
        title="Two dashboards"
        body="One on the deployment of Data tests, one on their results.|Data health, visible to the Analytics Engineers."
      >
        <g>
          <Arrow from={[788, 200]} to={[818, 200]} />
          <Win x={822} y={150} w={138} h={80} title="DEPLOYMENT">
            <Bars x={836} y={178} w={110} h={42} vals={[0.6, 0.7, 0.8, 0.9]} />
          </Win>
          <Arrow from={[788, 290]} to={[818, 290]} />
          <Win x={822} y={248} w={138} h={80} title="RESULTS">
            <Spark x={836} y={278} w={110} h={40} vals={[0.6, 0.65, 0.4, 0.7, 0.75, 0.8]} c="on" />
          </Win>
        </g>
      </Inspectable>
      <Inspectable
        id="st-fix"
        title="Then, the fix"
        body="The owning team fixes the anomaly; the next run confirms it.|An alert is worth its fix."
      >
        <g>
          <Arrow from={[672, 332]} to={[672, 392]} />
          {[0, 1, 2].map((i) => (
            <User key={i} x={646 + i * 26} y={432} s={0.75} />
          ))}
          <Sub x={672} y={458} t="Data teams" c="center" />
          <Arrow from={[620, 420]} to={[538, 420]} />
          <Medal x={500} y={420} r={30} i={icon.fix} on />
          <Lab x={500} y={470} t="FIX" c="center warm" />
          <path className="tx-link vs-back" d="M470 420H420C400 420 390 400 390 380V314" />
          <path className="tx-head vs-back" d="M384 324L390 312 396 324Z" />
          <Sub x={374} y={372} t="Confirmed by the next run" c="end" />
        </g>
      </Inspectable>
      <Close t="OBSERVABILITY · EVERY ALERT FIXED" s="525 tests a day; each anomaly qualified, then fixed.">
        <CaseChip x={560} y={578} w={400} to="verisure" kicker="EARTH · VERISURE" sub="Analytics Engineer" />
      </Close>
    </Layer>
  );
}

export default function StackScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="ACROSS EVERY ROLE · BUILD FOR PRODUCTION" />
      <Access />
      <Transformation />
      <Observability />
    </>
  );
}
