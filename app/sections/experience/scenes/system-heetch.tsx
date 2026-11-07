// Earth · Heetch: why Heetch, the daily stack, the platform I built most of, the models, operational workflows, the result.
// Tag names, hours and values are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  DataChain,
  Arrow,
  Bars,
  CaseChip,
  Code,
  Db,
  Graph,
  Header,
  Lab,
  Link,
  Move,
  OpsDefs,
  Sub,
  T,
  User,
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

/** 24 hourly slots; `lit` lists the slots with fresh Data. */
const Hours = ({ x, y, lit, w = 16 }: { x: number; y: number; lit: number[] | 'all'; w?: number }) => (
  <g>
    {Array.from({ length: 24 }, (_, i) => (
      <rect
        key={i}
        className={`tx-track${lit === 'all' || lit.includes(i) ? ' done' : ''}`}
        x={x + i * (w + 3)}
        y={y}
        width={w}
        height="18"
        rx="2"
      />
    ))}
  </g>
);

function WhyHeetch() {
  return (
    <Layer steps={[0]}>
      <Inspectable
        id="ht-interview"
        title="The first interview"
        body="My first conversations with Heetch’s Data team.|They showed a clear gap in Data maturity."
      >
        <Win x={40} y={100} w={250} h={190} title="FIRST INTERVIEW">
          <User x={110} y={220} s={1.3} />
          <User x={220} y={220} s={1.3} c="on" />
          <path className="tx-bubble" d="M120 140h70v34h-44l-10 10v-10h-16z" />
          <path className="tx-grid" d="M130 152H180M130 162H168" />
        </Win>
      </Inspectable>
      <Arrow from={[298, 195]} to={[346, 195]} />
      <Inspectable
        id="ht-test"
        title="The technical test"
        body="A hands-on test on Heetch’s Data problems.|It confirmed the level I would work at."
      >
        <Win x={352} y={100} w={260} h={190} title="TECHNICAL TEST">
          <Code
            x={368}
            y={146}
            lh={22}
            lines={[
              'SELECT city, rides',
              'FROM raw.rides',
              'WHERE day = CURRENT_DATE',
              'ORDER BY rides DESC',
            ]}
          />
        </Win>
      </Inspectable>
      <Arrow from={[620, 195]} to={[668, 195]} />
      <Inspectable
        id="ht-joined"
        title="Data Engineer, August 2022"
        body="I joined Heetch as a Data Engineer.|To work at that level of maturity."
      >
        <g>
          <circle className="tx-stage on" cx={760} cy={195} r="18" />
          <Lab x={800} y={190} t="DATA ENGINEER" c="warm" />
          <Sub x={800} y={212} t="August 2022" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-gap"
        title="A clear gap in Data maturity"
        body="Heetch worked with Data engineering practices beyond what I had used so far.|The reason I chose it."
      >
        <g>
          <Lab x={40} y={380} t="DATA MATURITY · A CLEAR GAP" />
          {(
            [
              ['BEFORE HEETCH', 0.45],
              ['HEETCH', 0.85],
            ] as const
          ).map(([t, v], i) => (
            <Fragment key={t}>
              <Sub x={40} y={424 + i * 50} t={t.charAt(0) + t.slice(1).toLowerCase()} />
              <rect className="tx-gauge" x={240} y={410 + i * 50} width="520" height="18" rx="3" />
              <rect className="tx-gauge-on" x={240} y={410 + i * 50} width={520 * v} height="18" rx="3" />
            </Fragment>
          ))}
          <path className="tx-promise dashed" d="M474 470V500M682 470V500" />
          <Sub x={240} y={528} t="Illustrative" />
        </g>
      </Inspectable>
    </Layer>
  );
}

function StartingPoint() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={100} t="BEFORE · A DAILY ANALYTICAL STACK" c="strong" />
      <Inspectable
        id="ht-s3"
        title="S3 · raw storage"
        body="S3: Amazon’s object storage, where raw Data arrived as files.|The first stop of the Data before the warehouse."
      >
        <g>
          <Lab x={40} y={160} t="S3 · RAW" />
          <path className="tx-bucket" d="M44 182H164L154 252H54Z" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${62 + i * 32} 196)`}>
              <path className="tx-doc" d="M0 0H18L24 6V30H0Z" />
              <path className="tx-grid" d="M4 12H20M4 19H20M4 26H14" />
            </g>
          ))}
          <Sub x={40} y={276} t="Object storage" />
        </g>
      </Inspectable>
      <Arrow from={[168, 250]} to={[220, 250]} />
      <g transform="translate(170 0)">
        <Inspectable
          id="ht-redshift"
          title="Redshift · the Data warehouse"
          body="Redshift: Amazon’s cloud Data warehouse, where all the Data was stored.|Raw and curated Data were mixed in it."
        >
          <g>
            <Lab x={40} y={160} t="REDSHIFT · DATA WAREHOUSE" />
            <Db cx={130} y={176} w={150} h={150} />
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                className={`tx-gantt${i % 2 ? ' late' : ''}`}
                x={82}
                y={232 + i * 18}
                width="96"
                height="10"
                rx="2"
              />
            ))}
            <Sub x={40} y={350} t="Raw and curated, mixed" />
          </g>
        </Inspectable>
        <Arrow from={[212, 250]} to={[268, 250]} />
        <Inspectable
          id="ht-dataiku"
          title="Dataiku"
          body="Dataiku: a Data science platform used for most transformations.|Where I developed a lot."
        >
          <Win x={274} y={160} w={240} h={180} title="DATAIKU · TRANSFORMATIONS">
            <Graph
              nodes={[
                [310, 220],
                [310, 290],
                [390, 255],
                [470, 220],
                [470, 290],
              ]}
              edges={[
                [0, 2],
                [1, 2],
                [2, 3],
                [2, 4],
              ]}
            />
            <Sub x={290} y={330} t="Where I developed a lot" />
          </Win>
        </Inspectable>
        <Arrow from={[520, 250]} to={[576, 250]} />
        <Inspectable
          id="ht-looker"
          title="Looker, refreshed once a day"
          body="Looker: the BI tool for dashboards.|Its Data was refreshed once a day."
        >
          <Win x={582} y={160} w={200} h={180} title="LOOKER · DASHBOARDS">
            <Bars x={600} y={196} w={164} h={110} vals={[0.4, 0.6, 0.5, 0.75, 0.7]} />
            <Sub x={600} y={330} t="Refreshed once a day" />
          </Win>
        </Inspectable>
      </g>
      <Inspectable
        id="ht-daily"
        title="One refresh a day"
        body="Fresh Data arrived once, early in the day.|Decisions during the day used yesterday’s figures."
      >
        <g>
          <Lab x={40} y={430} t="ONE REFRESH A DAY" />
          <Hours x={40} y={446} lit={[6]} w={30} />
          {['00:00', '06:00', '12:00', '18:00'].map((t, i) => (
            <T key={t} x={40 + i * 6 * 33} y={486} className="tx-win-t">
              {t}
            </T>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="ht-need"
        title="The need: every hour"
        body="The company needed fresh Data every hour.|The stack refreshed once a day."
      >
        <g>
          <Lab x={40} y={540} t="THE NEED · EVERY HOUR" c="warm" />
          <Hours x={40} y={556} lit="all" w={30} />
        </g>
      </Inspectable>
    </Layer>
  );
}

function ThePlatform() {
  return (
    <Layer steps={[2]}>
      <DataChain
        id="ht-chain"
        steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']}
        on={[0, 1, 2, 3]}
      />
      <Inspectable
        id="ht-gcp"
        title="On Google Cloud"
        body="The new platform runs on Google Cloud.|I built most of it."
      >
        <g>
          <rect className="tx-layer" x="40" y="90" width="720" height="440" rx="6" />
          <Lab x={60} y={120} t="GOOGLE CLOUD · THE NEW PLATFORM" c="strong" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-gcs"
        title="GCS · object storage"
        body="Google Cloud Storage: object storage, where Data arrives as files (objects) in buckets, whatever its structure: structured, semi-structured or unstructured.|A source loaded into the raw layer of the Data warehouse."
      >
        <g>
          <Lab x={60} y={150} t="SOURCE · GCS" />
          <path className="tx-bucket" d="M76 166H204L194 236H86Z" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${96 + i * 34} 180)`}>
              <path className="tx-doc" d="M0 0H18L24 6V30H0Z" />
              <path className="tx-grid" d="M4 12H20M4 19H20M4 26H14" />
            </g>
          ))}
          <Sub x={214} y={198} t="Object storage" />
          <Sub x={214} y={218} t="Any structure" />
          <Arrow from={[140, 242]} to={[140, 298]} />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-orch"
        title="Orchestration · Dataform schedules"
        body="Dataform schedules run every step in the right order, at the right time.|Hour after hour, without manual runs."
      >
        <Win x={390} y={140} w={306} h={84} title="ORCHESTRATION · DATAFORM SCHEDULES">
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              className="tx-gantt"
              x={406 + i * 76}
              y={176 + (i % 2) * 18}
              width="88"
              height="12"
              rx="2"
            />
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="ht-bq"
        title="BigQuery · the Data warehouse"
        body="BigQuery: Google’s cloud Data warehouse.|Raw and curated Data, each in its own layer."
      >
        <g>
          <rect className="tx-layer-q" x="60" y="250" width="680" height="250" rx="6" />
          <Lab x={724} y={276} t="BIGQUERY · DATA WAREHOUSE" c="end warm" />
          <Lab x={150} y={318} t="RAW" c="center" />
          <Db cx={150} y={332} w={100} h={120} />
          <Lab x={650} y={318} t="CURATED" c="center" />
          <Db cx={650} y={332} w={100} h={120} />
        </g>
      </Inspectable>
      <Arrow from={[204, 392]} to={[290, 392]} />
      <Inspectable
        id="ht-dataform"
        title="Dataform"
        body="Dataform: SQL transformations as code, the equivalent of dbt.|Raw Data in, curated tables out, tested."
      >
        <Win x={296} y={322} w={210} h={150} title="DATAFORM · SQL">
          <Code
            x={312}
            y={370}
            lh={22}
            lines={['config {', '  type: "incremental"', '}', 'SELECT … FROM raw']}
          />
        </Win>
      </Inspectable>
      <Arrow from={[512, 392]} to={[594, 392]} />
      <Inspectable
        id="ht-bi"
        title="BI through Looker"
        body="Looker reads the curated tables.|Dashboards with fresher Data."
      >
        <Win x={800} y={150} w={160} h={150} title="LOOKER · BI">
          <Bars x={816} y={186} w={126} h={90} vals={[0.5, 0.7, 0.6, 0.9]} />
        </Win>
      </Inspectable>
      <Inspectable
        id="ht-ai"
        title="AI through Vertex AI"
        body="Vertex AI: Google’s platform for AI models.|It reads the same curated Data."
      >
        <Win x={800} y={330} w={160} h={150} title="VERTEX AI · AI">
          <Graph
            nodes={[
              [830, 380],
              [830, 440],
              [880, 365],
              [880, 410],
              [880, 455],
              [930, 410],
            ]}
            edges={[
              [0, 2],
              [0, 3],
              [1, 3],
              [1, 4],
              [2, 5],
              [3, 5],
              [4, 5],
            ]}
          />
        </Win>
      </Inspectable>
      <Link d="M706 360C760 360 750 225 796 225" />
      <Link d="M706 420C760 420 750 405 796 405" />
      <Inspectable
        id="ht-most"
        title="Most of it built by me"
        body="I built most of the new platform.|From raw storage to BI and AI access."
      >
        <g>
          <path className="tx-promise" d="M40 556V572H960V556" />
          <Lab x={500} y={600} t="I BUILT MOST OF THE NEW PLATFORM" c="center warm" />
        </g>
      </Inspectable>
    </Layer>
  );
}

// ---------- shared vocabulary (European Space style) ----------
const icon = {
  db: (
    <>
      <ellipse cy="-10" rx="13" ry="5" />
      <path d="M-13-10V10A13 5 0 0 0 13 10V-10M-13 0A13 5 0 0 0 13 0" />
    </>
  ),
  table: (
    <>
      <rect x="-15" y="-12" width="30" height="24" rx="2" />
      <path d="M-15-4H15M-15 4H15M-5-12V12" />
    </>
  ),
  sql: <path d="M-8-11L-17 0-8 11M8-11L17 0 8 11M3-13L-3 13" />,
  tests: (
    <>
      <path d="M0-15L13-10V0C13 8 7 13 0 16C-7 13-13 8-13 0V-10Z" />
      <path d="M-6 0L-2 5 7-5" />
    </>
  ),
  etl: (
    <>
      <ellipse cx="-7" cy="-9" rx="8" ry="3" />
      <path d="M-15-9V7A8 3 0 0 0 1 7V-9M4 0H16M10-6L16 0 10 6" />
    </>
  ),
  micro: (
    <>
      <rect x="-16" y="-14" width="12" height="12" rx="2" />
      <rect x="4" y="-14" width="12" height="12" rx="2" />
      <rect x="-6" y="4" width="12" height="12" rx="2" />
      <path d="M-4-8H4M-10-2L-4 6M10-2L4 6" />
    </>
  ),
  flow: (
    <>
      <rect x="-16" y="-15" width="14" height="10" rx="2" />
      <rect x="2" y="5" width="14" height="10" rx="2" />
      <path d="M-9-5V10H-1M-4 7L-1 10-4 13M-2-10H9V1M6-2L9 1 12-2" />
    </>
  ),
  team: (
    <>
      <circle cx="-7" cy="-7" r="5" />
      <circle cx="8" cy="-7" r="5" />
      <path d="M-16 12C-16 2-12-1-7-1S2 2 2 12M2 12C2 3 4-1 8-1S16 2 16 12" />
    </>
  ),
};

function Medal({ x, y, r = 44, i }: { x: number; y: number; r?: number; i: React.ReactNode }) {
  return (
    <>
      <circle className="tx-stage" cx={x} cy={y} r={r} />
      <g className="tx-icon" transform={`translate(${x} ${y}) scale(${(r / 44) * 1.25})`}>
        {i}
      </g>
    </>
  );
}

function Close({ t, s }: { t: string; s: string }) {
  return (
    <>
      <path className="tx-div" d="M40 566H960" />
      <Lab x={40} y={600} t={t} c="warm" />
      <Sub x={40} y={624} t={s} />
    </>
  );
}

// ---------- 4 · The models ----------
const MY = 220;
const model: [string, number, string, string, string, string, React.ReactNode][] = [
  [
    'ht-raw',
    130,
    'RAW · BIGQUERY',
    'Rows arrive',
    'The raw layer of BigQuery, the Data warehouse.|New rows land in it every hour.',
    'Raw · BigQuery',
    icon.db,
  ],
  [
    'ht-incremental',
    370,
    'INCREMENTAL MODEL',
    'Only new, updated, late rows',
    'An incremental model processes only new, updated or late rows.|Fresh results each hour, without rebuilding everything.',
    'Incremental model · Dataform',
    icon.sql,
  ],
  [
    'ht-tests',
    610,
    'REUSABLE DATA TESTS',
    'Written once, on every model',
    'Data tests written once in Dataform, reused on many models.|My first step into observability.',
    'Reusable Data tests',
    icon.tests,
  ],
  [
    'ht-curated',
    850,
    'CURATED · BIGQUERY',
    'Fresh each hour',
    'The curated layer: tested tables, ready for BI and AI.|Updated each hour.',
    'Curated · BigQuery',
    icon.table,
  ],
];
const HX = 170;
const hx = (i: number) => HX + i * 32;

function TheModels() {
  return (
    <Layer steps={[3]}>
      <DataChain id="ht-chain-m" steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']} on={[1, 2]} />
      <Lab x={40} y={92} t="DATAFORM · INCREMENTAL MODELS, EACH HOUR" c="strong" />
      {model.map(([id, x, t, s, body, title, i], k) => (
        <Inspectable key={id} id={id} title={title} body={body}>
          <g className="ht-seq" style={vars({ '--i': k })}>
            <Medal x={x} y={MY} i={i} />
            <Lab x={x} y={152} t={t} c={`center${k === 1 ? ' warm' : ''}`} />
            <Sub x={x} y={290} t={s} c="center" />
          </g>
        </Inspectable>
      ))}
      {[0, 1, 2].map((k) => (
        <Arrow key={k} from={[model[k][1] + 52, MY]} to={[model[k + 1][1] - 54, MY]} />
      ))}
      <Move path={`M130 ${MY}H850`} dur={7}>
        <circle className="tx-alert" r="6" />
      </Move>
      <Inspectable
        id="ht-tags"
        title="Orchestration and a tag policy"
        body="Each model carries tags that say when it runs, and Dataform schedules run each tag.|Logic safer to change, easier to maintain."
      >
        <g>
          <Lab x={40} y={360} t="ORCHESTRATION · TAG POLICY" />
          <Sub x={40} y={382} t="Each tag sets when its models run" />
          {(
            [
              ['#hourly', 412, 'all'],
              ['#daily', 462, 6],
            ] as const
          ).map(([t, y, lit]) => (
            <Fragment key={t}>
              <rect className="tx-ticket" x={40} y={y} width="104" height="26" rx="13" />
              <T x={92} y={y + 18} className="center tx-win-t dark">
                {t}
              </T>
              {Array.from({ length: 24 }, (_, i) => (
                <rect
                  key={i}
                  className={`tx-track${lit === 'all' ? ' done ht-hour' : i === lit ? ' done' : ''}`}
                  style={lit === 'all' ? vars({ '--i': i }) : undefined}
                  x={hx(i)}
                  y={y}
                  width="26"
                  height="26"
                  rx="3"
                />
              ))}
            </Fragment>
          ))}
          {['00:00', '06:00', '12:00', '18:00'].map((t, i) => (
            <T key={t} x={hx(i * 6)} y={512} className="tx-win-t">
              {t}
            </T>
          ))}
          <Sub x={40} y={512} t="Illustrative tags" />
        </g>
      </Inspectable>
      <Close t="INCREMENTAL MODELS, SAFE TO CHANGE" s="I wrote nearly all the SQL models in Dataform." />
    </Layer>
  );
}

// ---------- 5 · Operational workflows ----------
const W = { src: [110, 260], etl: [380, 180], micro: [380, 340], ops: [650, 260], team: [880, 260] } as const;
const stages = ['REQUIREMENTS', 'DESIGN', 'BUILD', 'PRODUCTION', 'SUPPORT'];
const sx = (k: number) => 120 + k * 190;
const SY = 484;

function Workflows() {
  return (
    <Layer steps={[4]}>
      <DataChain id="ht-chain-w" steps={['SOURCE', 'ETL', 'OPERATIONAL WORKFLOWS']} on={[0, 1, 2]} />
      <Lab x={40} y={92} t="OPERATIONAL BUSINESS WORKFLOWS · BEYOND THE PLATFORM" c="strong" />
      <Inspectable
        id="ht-src"
        title="Sources"
        body="The systems where operational Data starts.|What each workflow reads."
      >
        <g className="ht-seq" style={vars({ '--i': 0 })}>
          <Medal x={W.src[0]} y={W.src[1]} r={40} i={icon.db} />
          <Lab x={W.src[0]} y={198} t="SOURCES" c="center" />
          <Sub x={W.src[0]} y={322} t="Operational Data" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-etl"
        title="ETL pipelines"
        body="ETL pipelines extract, transform, then load Data for business operations.|The Data each workflow needs, where it needs it."
      >
        <g className="ht-seq" style={vars({ '--i': 1 })}>
          <Medal x={W.etl[0]} y={W.etl[1]} r={40} i={icon.etl} />
          <Lab x={W.etl[0]} y={124} t="ETL PIPELINES" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-micro"
        title="Microservices"
        body="Small services, each doing one job, called by other systems.|They serve operational workflows directly."
      >
        <g className="ht-seq" style={vars({ '--i': 2 })}>
          <Medal x={W.micro[0]} y={W.micro[1]} r={40} i={icon.micro} />
          <Lab x={W.micro[0]} y={406} t="MICROSERVICES" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-ops"
        title="Operational business workflows"
        body="The daily processes business teams run on Data.|Beyond analytics: Data that runs operations."
      >
        <g className="ht-seq" style={vars({ '--i': 3 })}>
          <Medal x={W.ops[0]} y={W.ops[1]} i={icon.flow} />
          <Lab x={W.ops[0]} y={198} t="OPERATIONAL WORKFLOWS" c="center warm" />
          <Sub x={W.ops[0]} y={326} t="Business processes" c="center" />
          <Arrow from={[698, 260]} to={[832, 260]} />
          <Medal x={W.team[0]} y={W.team[1]} r={40} i={icon.team} />
          <Lab x={W.team[0]} y={198} t="BUSINESS TEAMS" c="center" />
          <Sub x={W.team[0]} y={322} t="Who rely on them" c="center" />
        </g>
      </Inspectable>
      {(
        [
          [152, 246, 338, 194],
          [152, 274, 338, 326],
          [422, 194, 604, 246],
          [422, 326, 604, 274],
        ] as const
      ).map(([x1, y1, x2, y2], k) => (
        <Fragment key={k}>
          <Arrow from={[x1, y1]} to={[x2, y2]} />
          <Move path={`M${x1} ${y1}L${x2} ${y2}`} dur={3} begin={(k % 2) * 1.5 + (k > 1 ? 3 : 0)}>
            <circle className="tx-alert" r="5" />
          </Move>
        </Fragment>
      ))}
      <Inspectable
        id="ht-e2e"
        title="Owned end to end"
        body="From requirements to production support, I owned each workflow.|One person accountable from the need to the running system."
      >
        <g>
          <path className="tx-route" d={`M${sx(0)} ${SY}H${sx(4)}`} />
          <path className="tx-draw" pathLength={1} d={`M${sx(0)} ${SY}H${sx(4)}`} />
          {stages.map((t, k) => (
            <g key={t} className="ht-stage" style={vars({ '--i': k })}>
              <circle className="tx-stage" cx={sx(k)} cy={SY} r="10" />
              <Lab x={sx(k)} y={SY + 36} t={t} c={`center${k === 4 ? ' warm' : ''}`} />
            </g>
          ))}
          <Move path={`M${sx(0)} ${SY}H${sx(4)}`} dur={10}>
            <circle className="tx-alert" r="6" />
          </Move>
        </g>
      </Inspectable>
      <Close t="OWNED END TO END" s="From requirements to production support." />
    </Layer>
  );
}

function ResultAndNext() {
  return (
    <Layer steps={[5]}>
      <Inspectable
        id="ht-hourly"
        title="From daily toward hourly"
        body="Data availability went from once a day toward every hour, and near real time.|Faster BI and AI uses."
      >
        <g>
          <Lab x={40} y={110} t="BEFORE · ONE REFRESH A DAY" />
          <Hours x={40} y={126} lit={[6]} w={30} />
          <Lab x={40} y={196} t="AFTER · EVERY HOUR, TOWARD NEAR REAL TIME" c="warm" />
          <Hours x={40} y={212} lit="all" w={30} />
          <Sub x={40} y={268} t="Faster BI and AI uses" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-lifecycle"
        title="The lifecycle still to master"
        body="Experienced engineers around me showed how much of the Data engineering lifecycle I still had to master.|What led me to an engineering degree."
      >
        <g>
          <Lab x={40} y={380} t="THE DATA LIFECYCLE · STILL TO MASTER" />
          {['GENERATE', 'INGEST', 'STORE', 'TRANSFORM', 'SERVE', 'OBSERVE'].map((t, i) => (
            <Fragment key={t}>
              <rect
                className={`tx-track${i === 3 ? ' done' : ' next'}`}
                x={40 + i * 152}
                y={398}
                width="138"
                height="34"
                rx="17"
              />
              <T x={109 + i * 152} y={420} className="center tx-win-t">
                {t}
              </T>
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <CaseChip
        x={40}
        y={500}
        w={460}
        to="study-efrei"
        kicker="NEXT · EFREI"
        sub="The engineering programme most of them had studied"
      />
    </Layer>
  );
}

export default function SystemHeetchScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="HEETCH · DATA ENGINEER" />
      <WhyHeetch />
      <StartingPoint />
      <ThePlatform />
      <TheModels />
      <Workflows />
      <ResultAndNext />
    </>
  );
}
