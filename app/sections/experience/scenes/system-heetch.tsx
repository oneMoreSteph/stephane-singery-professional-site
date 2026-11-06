// Earth · Heetch: why Heetch, the daily stack, the platform I built most of, the models, operational workflows, the result.
// Tag names, hours and values are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  CaseChip,
  Check,
  Code,
  Db,
  Graph,
  Header,
  Lab,
  Link,
  OpsDefs,
  Server,
  Sub,
  T,
  User,
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
        id="ht-orch"
        title="Orchestration"
        body="Orchestration runs every step in the right order, at the right time.|Hour after hour, without manual runs."
      >
        <Win x={250} y={140} w={300} h={84} title="ORCHESTRATION">
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              className="tx-gantt"
              x={266 + i * 80}
              y={176 + (i % 2) * 18}
              width="96"
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
          <Lab x={76} y={276} t="BIGQUERY · DATA WAREHOUSE" c="warm" />
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

function TheModels() {
  return (
    <Layer steps={[3]}>
      <Inspectable
        id="ht-incremental"
        title="Incremental models"
        body="An incremental model processes only new, updated or late rows.|Fresh results each hour, without rebuilding everything."
      >
        <g>
          <Win x={40} y={96} w={380} h={230} title="DATAFORM · INCREMENTAL MODEL">
            <Code
              x={56}
              y={144}
              lh={22}
              lines={[
                'config { type: "incremental",',
                '         tags: ["hourly"] }',
                'SELECT * FROM ${ref("rides")}',
                '${when(incremental(),',
                '  `WHERE updated_at >',
                '   (SELECT MAX(updated_at)',
                '    FROM ${self()})`)}',
              ]}
            />
          </Win>
          <Lab x={470} y={120} t="ONLY WHAT CHANGED" />
          {(
            [
              ['NEW', ''],
              ['UPDATED', ''],
              ['LATE', ' late'],
            ] as const
          ).map(([t, c], i) => (
            <Fragment key={t}>
              <rect className={`tx-gantt${c}`} x={470} y={140 + i * 40} width="90" height="22" rx="3" />
              <T x={515} y={156 + i * 40} className="center tx-win-t dark">
                {t}
              </T>
              <Link d={`M564 ${151 + i * 40}C620 ${151 + i * 40} 620 190 680 190`} />
            </Fragment>
          ))}
          <Db cx={740} y={140} w={110} h={110} />
          <Sub x={740} y={274} t="Curated table" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-tests"
        title="Reusable Data tests"
        body="Data tests written once, applied to many models in Dataform.|My first step into observability."
      >
        <g>
          <Lab x={40} y={380} t="REUSABLE DATA TESTS" />
          {['Not null', 'Unique key', 'Accepted values'].map((t, i) => (
            <Fragment key={t}>
              <Check x={52} y={414 + i * 34} />
              <Sub x={72} y={419 + i * 34} t={t} />
            </Fragment>
          ))}
          <Sub x={40} y={540} t="My first step into observability" c="warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-tags"
        title="Orchestration and a tag policy"
        body="Each model carries tags that say when and with what it runs.|Logic safer to change, easier to maintain."
      >
        <g>
          <Lab x={470} y={380} t="ORCHESTRATION · TAG POLICY" />
          {['hourly', 'daily', 'finance', 'rides'].map((t, i) => (
            <Fragment key={t}>
              <rect className="tx-ticket" x={470 + i * 112} y={398} width="100" height="26" rx="13" />
              <T x={520 + i * 112} y={416} className="center tx-win-t dark">{`#${t}`}</T>
            </Fragment>
          ))}
          <Sub x={470} y={584} t="Illustrative tags" />
          <Win x={470} y={444} w={440} h={110} title="RUNS BY TAG">
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                className="tx-gantt"
                x={490 + i * 120}
                y={484 + (i % 2) * 22}
                width="140"
                height="14"
                rx="2"
              />
            ))}
          </Win>
        </g>
      </Inspectable>
    </Layer>
  );
}

function Workflows() {
  return (
    <Layer steps={[4]}>
      <Lab x={40} y={100} t="OPERATIONAL BUSINESS WORKFLOWS · BEYOND THE PLATFORM" c="strong" />
      <Inspectable
        id="ht-etl"
        title="ETL pipelines"
        body="Pipelines that extract, transform and load Data for business operations.|They run the workflows teams rely on."
      >
        <g>
          <Lab x={40} y={160} t="ETL PIPELINES" />
          <Db cx={90} y={180} w={80} h={80} />
          <Arrow from={[136, 220]} to={[186, 220]} />
          <Server x={192} y={186} w={100} n={3} />
          <Arrow from={[298, 220]} to={[348, 220]} />
          <Db cx={400} y={180} w={80} h={80} />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-micro"
        title="Microservices"
        body="Small services, each doing one job, called by other systems.|They serve operational workflows directly."
      >
        <g>
          <Lab x={520} y={160} t="MICROSERVICES" />
          {[0, 1, 2].map((i) => (
            <Fragment key={i}>
              <rect className="tx-app" x={520 + i * 140} y={186} width="110" height="66" rx="6" />
              <T x={575 + i * 140} y={224} className="center tx-win-t">{`SERVICE ${i + 1}`}</T>
            </Fragment>
          ))}
          <Link d="M630 219H660M770 219H800" />
        </g>
      </Inspectable>
      <Inspectable
        id="ht-e2e"
        title="Owned end to end"
        body="From requirements to production support, I owned each workflow.|One person accountable from the need to the running system."
      >
        <g>
          <Lab x={40} y={380} t="OWNED END TO END" c="warm" />
          {['REQUIREMENTS', 'DESIGN', 'BUILD', 'PRODUCTION', 'SUPPORT'].map((t, i) => (
            <Fragment key={t}>
              <circle className={`tx-stage${i === 4 ? ' on' : ''}`} cx={80 + i * 200} cy={430} r="12" />
              <Lab x={80 + i * 200} y={470} t={t} c="center" />
              {i < 4 && <Arrow from={[98 + i * 200, 430]} to={[262 + i * 200, 430]} />}
            </Fragment>
          ))}
        </g>
      </Inspectable>
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
