// Earth · Heetch: why Heetch, the daily stack, the platform I built most of, the models, operational workflows, the result.
// Table contents, SQL, hours and node counts are illustrative.
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

/** A packet running along an arrow. */
const Flow = ({ d, dur = 2.4, begin = 0 }: { d: string; dur?: number; begin?: number }) => (
  <Move path={d} dur={dur} begin={begin}>
    <circle className="tx-alert" r="5" />
  </Move>
);

/** An object storage bucket with files in it. */
const Bucket = ({ x, y, w = 120 }: { x: number; y: number; w?: number }) => (
  <g>
    <path className="tx-bucket" d={`M${x} ${y}H${x + w}L${x + w - 10} ${y + 66}H${x + 10}Z`} />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${x + w / 2 - 41 + i * 30} ${y + 14})`}>
        <path className="tx-doc" d="M0 0H18L24 6V34H0Z" />
        <path className="tx-grid" d="M4 13H20M4 20H20M4 27H14" />
      </g>
    ))}
  </g>
);

/** 24 hourly slots; `lit` lists the slots with fresh Data. */
const Hours = ({ x, y, lit, sweep }: { x: number; y: number; lit: number[] | 'all'; sweep?: boolean }) => (
  <g>
    {Array.from({ length: 24 }, (_, i) => (
      <rect
        key={i}
        className={`tx-track${lit === 'all' || lit.includes(i) ? ' done' : ''}${sweep ? ' ht-hour' : ''}`}
        style={sweep ? vars({ '--i': i }) : undefined}
        x={x + i * 29}
        y={y}
        width="26"
        height="22"
        rx="3"
      />
    ))}
  </g>
);

// ---------- 1 · Why Heetch ----------
function WhyHeetch() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={92} t="WHY HEETCH · A MORE MATURE DATA ORGANISATION" c="strong" />
      <Inspectable
        id="ht-interview"
        title="The first interview"
        body="My first conversations with Heetch’s Data team.|They showed a clear gap in Data maturity."
      >
        <Win x={40} y={128} w={250} h={196} title="FIRST INTERVIEW">
          <path className="tx-bubble" d="M178 160h80v36h-50l-10 10v-10h-20z" />
          <path className="tx-grid" d="M190 174H246M190 184H232" />
          <User x={100} y={282} s={1.4} />
          <User x={226} y={282} s={1.4} c="on" />
          <rect className="tx-layer top" x={74} y={284} width={180} height="10" rx="3" />
        </Win>
      </Inspectable>
      <Arrow from={[298, 226]} to={[350, 226]} />
      <Flow d="M298 226H350" dur={2} />
      <Inspectable
        id="ht-test"
        title="The technical test"
        body="A hands-on test on Heetch’s Data problems.|It confirmed the level I would work at."
      >
        <Win x={356} y={128} w={270} h={196} title="TECHNICAL TEST">
          <Code
            x={372}
            y={176}
            lh={26}
            lines={['SELECT city, COUNT(*)', 'FROM rides', 'GROUP BY city', 'ORDER BY 2 DESC']}
          />
          {[0, 1, 2].map((i) => (
            <Check key={i} x={600} y={171 + i * 26} />
          ))}
        </Win>
      </Inspectable>
      <Arrow from={[634, 226]} to={[686, 226]} />
      <Flow d="M634 226H686" dur={2} begin={1} />
      <Inspectable
        id="ht-joined"
        title="Data Engineer, August 2022"
        body="I joined Heetch as a Data Engineer.|To work at that level of maturity."
      >
        <g>
          <rect className="tx-app" x={694} y={140} width="266" height="172" rx="12" />
          <rect className="tx-layer top" x={805} y={150} width="44" height="8" rx="4" />
          <User x={752} y={262} s={1.7} c="on" />
          <Lab x={800} y={214} t="HEETCH" />
          <Lab x={800} y={242} t="DATA ENGINEER" c="warm" />
          <Sub x={800} y={266} t="August 2022" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-gap"
        title="A clear gap in Data maturity"
        body="Heetch worked with Data engineering practices beyond what I had used so far.|The reason I chose it."
      >
        <g>
          <rect className="ht-gap" x={474} y={398} width={208} height={100} rx="4" />
          <Lab x={578} y={390} t="THE GAP" c="center warm" />
          {(
            [
              ['Before Heetch', 0.45],
              ['Heetch', 0.85],
            ] as const
          ).map(([t, v], i) => (
            <Fragment key={t}>
              <Sub x={40} y={428 + i * 50} t={t} />
              <rect className="tx-gauge" x={240} y={414 + i * 50} width="520" height="20" rx="3" />
              <rect className="tx-gauge-on" x={240} y={414 + i * 50} width={520 * v} height="20" rx="3" />
            </Fragment>
          ))}
          <Sub x={780} y={478} t="Illustrative" />
        </g>
      </Inspectable>
      <Close t="MATURITY · A CLEAR GAP" s="I joined as a Data Engineer to work at that level." />
    </Layer>
  );
}

// ---------- 2 · The starting point ----------
function StartingPoint() {
  return (
    <Layer steps={[1]}>
      <DataChain
        id="ht-chain-0"
        steps={['SOURCE', 'ETL', 'DATA WAREHOUSE', 'BI / ANALYTICS']}
        on={[0, 1, 2, 3]}
      />
      <Lab x={40} y={92} t="BEFORE · A DAILY ANALYTICAL STACK" c="strong" />
      <g className="ht-before">
        <Inspectable
          id="ht-s3"
          title="S3 · raw files"
          body="S3: Amazon’s object storage, where raw Data arrived as files.|The first stop of the Data before the warehouse."
        >
          <g>
            <Lab x={100} y={168} t="S3 · RAW FILES" c="center" />
            <Bucket x={40} y={196} />
            <Sub x={100} y={300} t="Object storage" c="center" />
          </g>
        </Inspectable>
        <Arrow from={[166, 230]} to={[226, 230]} />
        <Inspectable
          id="ht-redshift"
          title="Redshift · the Data warehouse"
          body="Redshift: Amazon’s cloud Data warehouse, where all the Data was stored.|Raw and curated Data were mixed in it."
        >
          <g>
            <Lab x={300} y={168} t="REDSHIFT" c="center" />
            <Db cx={300} y={180} w={130} h={110} />
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                className={`tx-gantt${i % 2 ? ' late' : ''}`}
                x={258}
                y={226 + i * 14}
                width="84"
                height="8"
                rx="2"
              />
            ))}
            <Sub x={300} y={318} t="Raw and curated, mixed" c="center" />
          </g>
        </Inspectable>
        <Arrow from={[372, 230]} to={[426, 230]} />
        <Inspectable
          id="ht-dataiku"
          title="Dataiku"
          body="Dataiku: a Data science platform used for most transformations.|Where I developed a lot."
        >
          <g>
            <Win x={432} y={168} w={220} h={126} title="DATAIKU · FLOWS">
              <Graph
                nodes={[
                  [466, 222],
                  [466, 268],
                  [540, 245],
                  [618, 222],
                  [618, 268],
                ]}
                edges={[
                  [0, 2],
                  [1, 2],
                  [2, 3],
                  [2, 4],
                ]}
              />
            </Win>
            <Sub x={542} y={318} t="Where I developed a lot" c="center" />
          </g>
        </Inspectable>
        <Arrow from={[658, 230]} to={[712, 230]} />
        <Inspectable
          id="ht-looker"
          title="Looker, refreshed once a day"
          body="Looker: the BI tool for dashboards.|Its Data was refreshed once a day."
        >
          <g>
            <Win x={718} y={168} w={170} h={126} title="LOOKER">
              <Bars x={734} y={200} w={138} h={80} vals={[0.4, 0.6, 0.5, 0.75, 0.7]} />
            </Win>
            <Sub x={803} y={318} t="Refreshed once a day" c="center" />
          </g>
        </Inspectable>
        {[196, 232, 268].map((y) => (
          <User key={y} x={930} y={y + 12} s={0.75} />
        ))}
      </g>
      <Flow d="M166 230H226" dur={8} />
      <Flow d="M372 230H426" dur={8} begin={6} />
      <Flow d="M658 230H712" dur={8} begin={4} />
      <Inspectable
        id="ht-daily"
        title="One refresh a day"
        body="Fresh Data arrived once, early in the day.|Decisions during the day used yesterday’s figures."
      >
        <g>
          <Lab x={40} y={386} t="REFRESH · ONCE A DAY" />
          <Hours x={250} y={370} lit={[6]} />
          {['00:00', '06:00', '12:00', '18:00'].map((t, i) => (
            <T key={t} x={250 + i * 6 * 29} y={414} className="tx-win-t dim">
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
          <Lab x={40} y={466} t="NEED · EVERY HOUR" c="warm" />
          <Hours x={250} y={450} lit="all" sweep />
        </g>
      </Inspectable>
      <Close t="A DAILY REFRESH" s="The company needed Data every hour." />
    </Layer>
  );
}

// ---------- 3 · The platform ----------
function ThePlatform() {
  return (
    <Layer steps={[2]}>
      <DataChain
        id="ht-chain"
        steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']}
        on={[0, 1, 2, 3]}
      />
      <Lab x={40} y={92} t="THE NEW PLATFORM · EVERY HOUR" c="strong" />
      <Inspectable
        id="ht-gcp"
        title="On Google Cloud"
        body="The new platform runs on Google Cloud.|I built most of it."
      >
        <g>
          <rect className="tx-layer" x="150" y="116" width="810" height="402" rx="8" />
          <Lab x={168} y={142} t="GOOGLE CLOUD" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-sources"
        title="Sources"
        body="Heetch’s systems produce the raw Data.|It is loaded as it arrives into the raw layer of BigQuery (ELT)."
      >
        <g>
          <Lab x={80} y={184} t="SOURCES" c="center" />
          <Server x={40} y={198} w={80} n={3} />
          <Sub x={80} y={312} t="Raw arrivals" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[124, 240]} to={[198, 240]} />
      <Flow d="M124 240H198" />
      <Inspectable
        id="ht-raw"
        title="BigQuery · the raw layer"
        body="BigQuery: Google’s cloud Data warehouse. The raw layer keeps the Data as it was loaded.|Raw and curated Data, each in its own layer."
      >
        <g>
          <Lab x={250} y={176} t="BIGQUERY · RAW" c="center" />
          <Db cx={250} y={188} w={90} h={100} />
          <Sub x={250} y={312} t="Loaded as it arrives" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-gcs"
        title="GCS · a source beside the raw layer"
        body="Google Cloud Storage: object storage, where Data lands as files, whatever its structure.|The models read its objects directly, every hour, like the raw tables."
      >
        <g>
          <Lab x={250} y={352} t="GCS · OBJECT STORAGE" c="center" />
          <Bucket x={196} y={364} w={108} />
          <Sub x={250} y={456} t="Read directly by the models" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[300, 240]} to={[374, 262]} />
      <Arrow from={[300, 396]} to={[374, 334]} />
      <Flow d="M300 240L374 262" begin={0.6} />
      <Flow d="M300 396L374 334" begin={1.4} />
      <Inspectable
        id="ht-orch"
        title="Orchestration · every hour"
        body="Dataform schedules run every model in the right order, every hour, GCS objects included.|Hour after hour, without manual runs."
      >
        <g>
          <circle className="tx-stage" cx={392} cy={168} r="12" />
          <path className="ht-hand" d="M392 168V160">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 392 168"
              to="360 392 168"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          <Lab x={412} y={173} t="EVERY HOUR" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-dataform"
        title="Dataform · SQL models"
        body="Dataform: SQL transformations as code, the equivalent of dbt.|Raw tables and GCS objects in, curated tables out, tested."
      >
        <Win x={380} y={196} w={200} h={180} title="DATAFORM · SQL MODELS">
          <Code
            x={394}
            y={240}
            lh={22}
            lines={['config {', '  type: "incremental"', '}', 'SELECT …', 'FROM raw, gcs']}
          />
        </Win>
      </Inspectable>
      <Arrow from={[586, 250]} to={[640, 250]} />
      <Flow d="M586 250H640" begin={0.3} />
      <Inspectable
        id="ht-curated"
        title="BigQuery · the curated layer"
        body="Tested tables, ready to use, refreshed every hour.|What BI and AI read."
      >
        <g>
          <Lab x={690} y={186} t="BIGQUERY · CURATED" c="center warm" />
          <Db cx={690} y={198} w={90} h={100} />
          <Sub x={690} y={322} t="Tested, each hour" c="center" />
        </g>
      </Inspectable>
      <Link d="M740 232C770 232 770 206 796 206" />
      <Link d="M740 268C770 268 770 340 796 340" />
      <Flow d="M740 232C770 232 770 206 796 206" begin={1} />
      <Flow d="M740 268C770 268 770 340 796 340" begin={2} />
      <Inspectable
        id="ht-bi"
        title="BI through Looker"
        body="Looker reads the curated tables.|Dashboards with fresher Data."
      >
        <Win x={800} y={152} w={145} h={110} title="LOOKER · BI">
          <Bars x={814} y={184} w={116} h={64} vals={[0.5, 0.7, 0.6, 0.9]} />
        </Win>
      </Inspectable>
      <Inspectable
        id="ht-ai"
        title="AI through Vertex AI"
        body="Vertex AI: Google’s platform for AI models.|It reads the same curated Data."
      >
        <Win x={800} y={286} w={145} h={110} title="VERTEX AI">
          <Graph
            nodes={[
              [826, 330],
              [826, 372],
              [872, 318],
              [872, 351],
              [872, 384],
              [918, 351],
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
      <Arrow from={[872, 402]} to={[872, 430]} />
      <Inspectable
        id="ht-people"
        title="The teams"
        body="Business and Data teams read the dashboards and use the models.|With Data from the last hour."
      >
        <g>
          {[0, 1, 2, 3].map((i) => (
            <User key={i} x={830 + i * 28} y={472} s={0.75} />
          ))}
          <Sub x={872} y={496} t="BI and AI users" c="center" />
        </g>
      </Inspectable>
      <Close
        t="BUILT BY ME · MOST OF THE NEW PLATFORM"
        s="On Google Cloud, from the raw layer to BI and AI access."
      />
    </Layer>
  );
}

// ---------- 4 · The models ----------
const col = { src: 100, a: 255, b: 395, c: 530 };
const nodes: Record<string, [number, number, string, boolean]> = {
  s0: [col.src, 210, 'RAW', false],
  s1: [col.src, 270, 'RAW', false],
  s2: [col.src, 330, 'RAW', false],
  s3: [col.src, 390, 'GCS', false],
  a0: [col.a, 230, 'MODEL', true],
  a1: [col.a, 310, 'MODEL', true],
  a2: [col.a, 390, 'MODEL', false],
  b0: [col.b, 270, 'MODEL', true],
  b1: [col.b, 350, 'MODEL', true],
  c0: [col.c, 250, 'CURATED', true],
  c1: [col.c, 330, 'CURATED', true],
  c2: [col.c, 410, 'CURATED', true],
};
const edges = [
  ['s0', 'a0'],
  ['s1', 'a0'],
  ['s1', 'a1'],
  ['s2', 'a1'],
  ['s3', 'a2'],
  ['a0', 'b0'],
  ['a1', 'b0'],
  ['a1', 'b1'],
  ['a2', 'b1'],
  ['b0', 'c0'],
  ['b0', 'c1'],
  ['b1', 'c1'],
  ['b1', 'c2'],
];
const NW = 80;
const rowsIn: [string, string][] = [
  ['', ''],
  ['', ''],
  ['', ''],
  ['upd', 'UPDATED'],
  ['', ''],
  ['late', 'LATE'],
  ['', ''],
  ['new', 'NEW'],
  ['new', 'NEW'],
];

function TheModels() {
  return (
    <Layer steps={[3]}>
      <DataChain id="ht-chain-m" steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']} on={[1, 2]} />
      <Lab x={40} y={92} t="DATAFORM · NEARLY ALL THE SQL MODELS" c="strong" />
      <Inspectable
        id="ht-graph"
        title="Nearly all the SQL models"
        body="The Dataform graph: raw tables and GCS objects on the left, curated tables on the right.|I wrote nearly all the models in between (gold)."
      >
        <g>
          <Win x={40} y={116} w={560} h={404} title="DATAFORM · DEPENDENCY GRAPH" />
          {(
            [
              ['RAW + GCS', col.src],
              ['MODELS', (col.a + col.b) / 2],
              ['CURATED', col.c],
            ] as const
          ).map(([t, x]) => (
            <T key={t} x={x} y={168} className="center tx-win-t dim">
              {t}
            </T>
          ))}
          {edges.map(([a, b]) => {
            const [x1, y1] = nodes[a];
            const [x2, y2] = nodes[b];
            const m = (x1 + x2) / 2;
            return (
              <Link key={a + b} d={`M${x1 + NW / 2} ${y1}C${m} ${y1} ${m} ${y2} ${x2 - NW / 2} ${y2}`} />
            );
          })}
          {Object.entries(nodes).map(([k, [x, y, t, mine]]) => (
            <Fragment key={k}>
              <rect
                className={`tx-app${mine ? ' ht-mine' : ''}`}
                x={x - NW / 2}
                y={y - 13}
                width={NW}
                height="26"
                rx="5"
              />
              <T x={x} y={y + 4} className={`center tx-win-t${mine ? '' : ' dim'}`}>
                {t}
              </T>
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="ht-tests"
        title="Reusable Data tests"
        body="Data tests written once in Dataform, reused on many models.|My first step into observability."
      >
        <g>
          {Object.entries(nodes)
            .filter(([k]) => !k.startsWith('s'))
            .map(([k, [x, y]], i) => (
              <g key={k} className="ht-test" style={vars({ '--i': i })}>
                <Check x={x + NW / 2} y={y - 13} />
              </g>
            ))}
          <Check x={64} y={482} />
          <Sub x={80} y={487} t="Reusable Data test" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-tags"
        title="Orchestration and a tag policy"
        body="Each model carries a tag that says when it runs; Dataform schedules run each tag, every hour.|Logic safer to change, easier to maintain."
      >
        <g>
          <rect className="tx-ticket" x={512} y={120} width="80" height="17" rx="8.5" />
          <T x={552} y={133} className="center tx-win-t dark">
            #hourly
          </T>
          <rect className="tx-ticket" x={240} y={472} width="80" height="17" rx="8.5" />
          <T x={280} y={485} className="center tx-win-t dark">
            #hourly
          </T>
          <Sub x={332} y={487} t="Tag policy: every hour" />
        </g>
      </Inspectable>
      <path className="tx-grid" d="M570 317L640 140M570 343L640 520" />
      <Inspectable
        id="ht-incremental"
        title="One incremental model"
        body="An incremental model processes only new, updated or late rows, then merges them into the table.|Fresh results each hour, without rebuilding everything."
      >
        <g>
          <Win x={640} y={140} w={320} h={380} title="ONE INCREMENTAL MODEL · EACH HOUR" />
          {rowsIn.map(([k, t], i) => (
            <Fragment key={i}>
              <rect
                className={k ? `ht-row ${k}` : 'tx-track'}
                style={k ? vars({ '--i': i }) : undefined}
                x={664}
                y={182 + i * 26}
                width="190"
                height="18"
                rx="3"
              />
              {t && (
                <T x={866} y={195 + i * 26} className={`tx-win-t${k === 'late' ? ' late' : ''}`}>
                  {t}
                </T>
              )}
            </Fragment>
          ))}
          <Sub x={664} y={442} t="Only new, updated and late rows" />
          <Sub x={664} y={464} t="The rest of the table stays as it is" />
          <Sub x={664} y={500} t="Illustrative" />
        </g>
      </Inspectable>
      <Close t="INCREMENTAL MODELS, SAFE TO CHANGE" s="Reusable tests and a tag policy on every model." />
    </Layer>
  );
}

// ---------- 5 · Operational workflows ----------
const life: [string, React.ReactNode][] = [
  [
    'REQUIREMENTS',
    <>
      <path d="M-11-15H6L12-9V15H-11Z" />
      <path d="M-6-5H7M-6 1H7M-6 7H3" />
    </>,
  ],
  [
    'DESIGN',
    <>
      <rect x="-15" y="-13" width="12" height="10" rx="2" />
      <rect x="3" y="3" width="12" height="10" rx="2" />
      <path d="M-9-3V8H3" />
    </>,
  ],
  ['BUILD', <path d="M-7-10L-15 0-7 10M7-10L15 0 7 10M3-13L-3 13" />],
  [
    'PRODUCTION',
    <>
      <rect x="-14" y="-14" width="28" height="11" rx="2" />
      <rect x="-14" y="3" width="28" height="11" rx="2" />
      <path d="M-8-8.5H-6M-8 8.5H-6M0-8.5H8M0 8.5H8" />
    </>,
  ],
  [
    'SUPPORT',
    <>
      <path d="M-12 6V0A12 12 0 0 1 12 0V6" />
      <rect x="-15" y="3" width="7" height="11" rx="2" />
      <rect x="8" y="3" width="7" height="11" rx="2" />
    </>,
  ],
];
const lx = (k: number) => 100 + k * 190;
const LY = 488;

function Workflows() {
  return (
    <Layer steps={[4]}>
      <DataChain id="ht-chain-w" steps={['SOURCE', 'ETL', 'OPERATIONAL WORKFLOWS']} on={[0, 1, 2]} />
      <Lab x={40} y={92} t="BEYOND THE PLATFORM · OPERATIONAL WORKFLOWS" c="strong" />
      <Inspectable
        id="ht-analytics"
        title="The platform: analytics"
        body="The Data Platform served dashboards and AI.|My work went further, into operations."
      >
        <g className="ht-faint">
          <Lab x={40} y={140} t="ANALYTICS · THE PLATFORM" />
          <Db cx={80} y={156} w={70} h={56} />
          <Arrow from={[120, 184]} to={[168, 184]} />
          <Win x={174} y={156} w={130} h={56} title="LOOKER · BI" />
          <Sub x={320} y={189} t="Dashboards and AI" />
        </g>
      </Inspectable>
      <Lab x={40} y={262} t="OPERATIONS · BEYOND THE PLATFORM" c="warm" />
      <Inspectable
        id="ht-src"
        title="Sources"
        body="The systems where operational Data starts.|What each workflow reads."
      >
        <g>
          <Db cx={84} y={290} w={80} h={90} />
          <Sub x={84} y={404} t="Sources" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[128, 336]} to={[180, 336]} />
      <Flow d="M128 336H180" dur={2} />
      <Inspectable
        id="ht-etl"
        title="ETL pipelines"
        body="ETL pipelines extract, transform, then load Data for business operations.|The Data each workflow needs, where it needs it."
      >
        <Win x={186} y={284} w={200} h={110} title="ETL PIPELINE">
          {['E', 'T', 'L'].map((t, i) => (
            <Fragment key={t}>
              <circle className="tx-stage" cx={226 + i * 60} cy={340} r="16" />
              <T x={226 + i * 60} y={345} className="center tx-win-t">
                {t}
              </T>
              {i < 2 && <path className="tx-link" d={`M${244 + i * 60} 340H${266 + i * 60}`} />}
            </Fragment>
          ))}
          <Sub x={286} y={382} t="Extract, transform, load" c="center" />
        </Win>
      </Inspectable>
      <Arrow from={[392, 336]} to={[436, 336]} />
      <Flow d="M392 336H436" dur={2} begin={0.7} />
      <Inspectable
        id="ht-micro"
        title="Microservices"
        body="Small services, each doing one job, called by other systems.|They serve operational workflows directly."
      >
        <g>
          <T x={526} y={286} className="center tx-win-t">
            MICROSERVICES
          </T>
          <path className="tx-link" d="M516 316H536M494 334L508 354M558 334L544 354" />
          {(
            [
              [446, 298],
              [536, 298],
              [491, 354],
            ] as const
          ).map(([x, y], i) => (
            <Fragment key={i}>
              <rect className="tx-app" x={x} y={y} width="70" height="36" rx="5" />
              <T x={x + 35} y={y + 22} className="center tx-win-t">
                SERVICE
              </T>
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Arrow from={[612, 336]} to={[656, 336]} />
      <Flow d="M612 336H656" dur={2} begin={1.4} />
      <Inspectable
        id="ht-ops"
        title="Operational business workflows"
        body="The daily processes business teams run on Data.|Beyond analytics: Data that runs operations."
      >
        <g>
          <Win x={662} y={284} w={178} h={110} title="BUSINESS WORKFLOW">
            {[0, 1, 2].map((i) => (
              <Fragment key={i}>
                <Check x={684} y={320 + i * 24} />
                <path className="tx-grid" d={`M700 ${320 + i * 24}H820`} />
              </Fragment>
            ))}
          </Win>
          {[0, 1, 2].map((i) => (
            <User key={i} x={872 + i * 32} y={350} s={0.85} />
          ))}
          <Sub x={904} y={378} t="Business teams" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-e2e"
        title="Owned end to end"
        body="From requirements to production support, I owned each workflow.|One person accountable from the need to the running system."
      >
        <g>
          <path className="tx-route" d={`M${lx(0)} ${LY}H${lx(4)}`} />
          <path className="tx-draw" pathLength={1} d={`M${lx(0)} ${LY}H${lx(4)}`} />
          {life.map(([t, i], k) => (
            <Fragment key={t}>
              <circle className="tx-stage" cx={lx(k)} cy={LY} r="24" />
              <g className="tx-icon" transform={`translate(${lx(k)} ${LY})`}>
                {i}
              </g>
              <Lab x={lx(k)} y={LY + 46} t={t} c={`center${k === 4 ? ' warm' : ''}`} />
            </Fragment>
          ))}
          <Move path={`M${lx(0)} ${LY - 32}H${lx(4)}`} dur={10}>
            <circle className="tx-alert" r="5" />
          </Move>
        </g>
      </Inspectable>
      <Close t="END TO END" s="I owned each workflow, from requirements to production support." />
    </Layer>
  );
}

// ---------- 6 · Result and next ----------
const D = { x: 230, y: 330, r: 150 };
const pol = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [D.x + r * Math.cos(a), D.y + r * Math.sin(a)] as const;
};
const tick = (i: number, r0: number, r1: number) => {
  const [x0, y0] = pol(i * 15, r0);
  const [x1, y1] = pol(i * 15, r1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`;
};
const cycle = ['GENERATE', 'INGEST', 'STORE', 'TRANSFORM', 'SERVE', 'OBSERVE'];

function ResultAndNext() {
  return (
    <Layer steps={[5]}>
      <Lab x={40} y={92} t="DATA AVAILABILITY · OVER 24 HOURS" c="strong" />
      <Inspectable
        id="ht-hourly"
        title="From daily toward hourly"
        body="Data availability went from once a day toward every hour, and near real time.|Faster BI and AI uses."
      >
        <g>
          <circle className="ht-inner" cx={D.x} cy={D.y} r="104" />
          {Array.from({ length: 24 }, (_, i) => (
            <path key={i} className="ht-tick" style={vars({ '--i': i })} d={tick(i, 136, 162)} />
          ))}
          <path className="ht-tick before" d={tick(6, 92, 116)} />
          <path className="ht-hand" d={`M${D.x} ${D.y}V${D.y - 128}`}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${D.x} ${D.y}`}
              to={`360 ${D.x} ${D.y}`}
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
          <circle className="vs-core" cx={D.x} cy={D.y} r="62" />
          <T x={D.x} y={D.y + 8} className="tx-big center">
            1→24
          </T>
          <Sub x={D.x} y={D.y + 32} t="Refreshes a day" c="center" />
          {['00', '06', '12', '18'].map((t, i) => {
            const [x, y] = pol(i * 90, 182);
            return (
              <T key={t} x={x} y={y + 4} className="center tx-win-t dim">
                {t}
              </T>
            );
          })}
          <path className="ht-tick" d="M440 150H462" />
          <Lab x={474} y={155} t="AFTER · EVERY HOUR" c="warm" />
          <Sub x={474} y={176} t="Toward near real time" />
          <path className="ht-tick before" d="M440 210H462" />
          <Lab x={474} y={215} t="BEFORE · ONCE A DAY" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-faster"
        title="Faster BI and AI uses"
        body="Dashboards and AI models read Data from the last hour.|Decisions on fresher figures."
      >
        <g>
          <Win x={440} y={244} w={160} h={84} title="LOOKER · BI">
            <Bars x={454} y={274} w={130} h={44} vals={[0.5, 0.7, 0.6, 0.9, 0.8]} />
          </Win>
          <Win x={620} y={244} w={160} h={84} title="VERTEX AI · AI">
            <Graph
              nodes={[
                [650, 296],
                [700, 280],
                [700, 312],
                [750, 296],
              ]}
              edges={[
                [0, 1],
                [0, 2],
                [1, 3],
                [2, 3],
              ]}
            />
          </Win>
          <Sub x={800} y={292} t="Faster BI and AI uses" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-lifecycle"
        title="The lifecycle still to master"
        body="Experienced engineers around me showed how much of the Data engineering lifecycle I still had to master.|What led me to an engineering degree."
      >
        <g>
          <Lab x={440} y={386} t="THE DATA LIFECYCLE · STILL TO MASTER" />
          {cycle.map((t, i) => (
            <Fragment key={t}>
              <rect
                className={`tx-track${i === 3 ? ' done' : ' next'}`}
                x={440 + i * 88}
                y={402}
                width="80"
                height="30"
                rx="15"
              />
              <T x={480 + i * 88} y={421} className={`center tx-win-t${i === 3 ? '' : ' dim'}`}>
                {t}
              </T>
            </Fragment>
          ))}
          <Sub x={440} y={462} t="Engineers around me showed me the rest." />
        </g>
      </Inspectable>
      <Close t="→ HOURLY · THEN EFREI" s="Most of those engineers had studied at EFREI.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="study-efrei"
          kicker="NEXT · EFREI"
          sub="The engineering programme most of them had studied"
        />
      </Close>
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
