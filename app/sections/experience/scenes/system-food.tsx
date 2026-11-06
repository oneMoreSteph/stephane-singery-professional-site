// Earth · FoodChéri / Seazon Data: the audit, the bottleneck, the platform, the BI migration, adoption, and beneath.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  DataChain,
  Arrow,
  Bars,
  CaseChip,
  Check,
  Code,
  Db,
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
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

/** A small dashboard thumbnail; `used` ones are lit. */
const Tile = ({ x, y, used = false }: { x: number; y: number; used?: boolean }) => (
  <g className={`tx-tile${used ? ' used' : ''}`}>
    <rect x={x} y={y} width="26" height="20" rx="2" />
    <path d={`M${x + 5} ${y + 15}V${y + 10}M${x + 11} ${y + 15}V${y + 6}M${x + 17} ${y + 15}V${y + 9}`} />
  </g>
);

// 16 × 10 tiles stand for the 600+ dashboards; one in ten is lit.
const used = new Set([3, 9, 21, 38, 50, 67, 74, 84, 91, 105, 112, 119, 127, 133, 146, 152]);

function Audit() {
  return (
    <Layer steps={[0]}>
      <Inspectable
        id="fd-tableau"
        title="600+ Tableau dashboards"
        body="Tableau: the BI tool in place.|My audit counted more than 600 dashboards on it."
      >
        <Win x={40} y={86} w={560} h={330} title="TABLEAU · 600+ DASHBOARDS">
          {Array.from({ length: 160 }, (_, i) => (
            <Tile key={i} x={58 + (i % 16) * 33} y={124 + Math.floor(i / 16) * 27} used={used.has(i)} />
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="fd-used"
        title="About 10% used regularly"
        body="The lit dashboards: about one in ten was used regularly.|The rest were built, then left aside."
      >
        <g>
          <Tile x={40} y={438} used />
          <Lab x={78} y={454} t="USED REGULARLY · ABOUT 10%" c="warm" />
          <Tile x={40} y={472} />
          <Lab x={78} y={488} t="BUILT, THEN LEFT ASIDE" />
        </g>
      </Inspectable>
      <Inspectable
        id="fd-reports"
        title="Scattered personal reports"
        body="Reports each person kept for their own needs.|Each one a separate version of the figures."
      >
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(${660 + i * 52} ${120 + (i % 2) * 18}) rotate(${(i - 2) * 6})`}>
              <rect className="tx-doc" width="40" height="52" rx="3" />
              <path className="tx-grid" d="M6 14H34M6 24H34M6 34H34M6 44H26" />
            </g>
          ))}
          <Lab x={660} y={220} t="PERSONAL REPORTS" />
          <Sub x={660} y={242} t="Scattered, one per person" />
        </g>
      </Inspectable>
      <Inspectable
        id="fd-staff"
        title="250 employees"
        body="Everyone who needed figures to steer their activity.|All of them waited on the Data team for analysis."
      >
        <g>
          {Array.from({ length: 30 }, (_, i) => (
            <User key={i} x={672 + (i % 10) * 28} y={310 + Math.floor(i / 10) * 34} s={0.55} />
          ))}
          <Lab x={660} y={410} t="250 EMPLOYEES" />
        </g>
      </Inspectable>
      <Inspectable
        id="fd-team"
        title="Built by the Data team alone"
        body="The Data team built every dashboard.|Analysis depended on its capacity alone."
      >
        <g>
          <User x={680} y={560} s={1.2} c="on" />
          <User x={730} y={560} s={1.2} c="on" />
          <Lab x={660} y={600} t="DATA TEAM" />
          <Sub x={660} y={622} t="Built every dashboard" />
          <Arrow from={[650, 540]} to={[612, 420]} />
        </g>
      </Inspectable>
      <Lab x={40} y={560} t="MY AUDIT · FROM DAY ONE" c="strong" />
      <Sub x={40} y={584} t="Data delivery across the company" />
    </Layer>
  );
}

const teams = ['Operations', 'Finance', 'Supply', 'Marketing', 'Product', 'Customer care'];

function Bottleneck() {
  return (
    <Layer steps={[1]}>
      <Inspectable
        id="fd-demand"
        title="Demand grew every day"
        body="Requests for analysis from every team.|Each new question waited in the same queue."
      >
        <g>
          <Lab x={40} y={100} t="REQUESTS FROM EVERY TEAM" />
          {teams.map((t, i) => (
            <Fragment key={t}>
              <User x={58} y={152 + i * 52} s={0.8} c="on" />
              <Sub x={80} y={146 + i * 52} t={t} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      {teams.map((t, i) => {
        const d = `M190 ${142 + i * 52}C300 ${142 + i * 52} 300 290 412 290`;
        return (
          <Fragment key={t}>
            <path className="tx-link" d={d} />
            <Move path={d} dur={4} begin={i * 0.7}>
              <rect className="tx-ticket" x="-9" y="-6" width="18" height="12" rx="1.5" />
            </Move>
          </Fragment>
        );
      })}
      <Inspectable
        id="fd-queue"
        title="The requests queue"
        body="Every request landed in one queue.|It grew faster than it could be served."
      >
        <Win x={420} y={180} w={210} h={220} title="REQUESTS QUEUE">
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <rect className="tx-ticket" x="436" y={216 + i * 21} width="178" height="15" rx="2" />
              <path className="tx-grid" d={`M444 ${224 + i * 21}H${520 + (i % 3) * 25}`} />
            </g>
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="fd-capacity"
        title="Capacity stayed with a small team"
        body="The capacity to produce analysis stayed with a small team.|More dashboards would only add to the unused ones."
      >
        <g>
          <path className="tx-funnel" d="M630 230L700 270V310L630 350" />
          <Link d="M700 290H760" />
          <User x={790} y={300} s={1.2} c="on" />
          <User x={840} y={300} s={1.2} c="on" />
          <Lab x={815} y={340} t="DATA TEAM" c="center" />
          <Sub x={815} y={362} t="A small team" c="center" />
          <Arrow from={[870, 286]} to={[926, 286]} />
          <Tile x={932} y={262} />
          <Tile x={932} y={288} />
        </g>
      </Inspectable>
      <Lab x={500} y={470} t="THE BOTTLENECK WAS THE REAL PROBLEM" c="center strong" />
      <Inspectable
        id="fd-change1"
        title="Change 1 · How Data is made available"
        body="Curated, documented tables any team can query.|Analysis no longer waits for the Data team."
      >
        <g>
          <rect className="tx-layer-q" x="40" y="520" width="440" height="110" rx="4" />
          <Lab x={60} y={556} t="MUST CHANGE · 1" c="warm" />
          <T x={60} y={590} className="card-title">
            How Data is made available
          </T>
          <Db cx={430} y={540} w={56} h={70} />
        </g>
      </Inspectable>
      <Inspectable
        id="fd-change2"
        title="Change 2 · The BI tool"
        body="A tool teams can use themselves after a short training.|The condition for analysis by every team."
      >
        <g>
          <rect className="tx-layer-q" x="520" y="520" width="440" height="110" rx="4" />
          <Lab x={540} y={556} t="MUST CHANGE · 2" c="warm" />
          <T x={540} y={590} className="card-title">
            The BI tool
          </T>
          <Win x={850} y={538} w={90} h={74} title="BI">
            <Bars x={862} y={570} w={66} h={34} vals={[0.4, 0.7, 0.55, 0.9]} />
          </Win>
        </g>
      </Inspectable>
    </Layer>
  );
}

function Platform() {
  return (
    <Layer steps={[2]}>
      <DataChain
        id="fd-chain"
        steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']}
        on={[0, 1, 2, 3]}
      />
      <Lab x={40} y={100} t="FOODCHÉRI’S FIRST END-TO-END DATA PLATFORM" c="strong" />
      <Sub x={40} y={124} t="Designed block by block · one company, two brands" />
      <Inspectable
        id="fd-redshift"
        title="FoodChéri · Redshift"
        body="Redshift: Amazon’s cloud Data warehouse, holding FoodChéri’s raw Data in SQL tables: structured Data.|One of the two sources of the platform."
      >
        <g>
          <Lab x={40} y={170} t="FOODCHÉRI · REDSHIFT" />
          <Db cx={90} y={184} w={92} h={84} />
          <Sub x={90} y={292} t="Structured · SQL tables" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="fd-mongo"
        title="Seazon · MongoDB"
        body="MongoDB: a NoSQL database storing Seazon’s Data as JSON documents: semi-structured Data.|The second source: same company, a different structure to bring in."
      >
        <g>
          <Lab x={40} y={320} t="SEAZON · MONGODB" />
          <Win x={40} y={334} w={150} h={104} title="NOSQL · JSON">
            <Code x={52} y={376} lh={18} lines={['{ "meal": "…",', '  "qty": 2,', '  "tags": […] }']} />
          </Win>
          <Sub x={40} y={458} t="Semi-structured" />
        </g>
      </Inspectable>
      <Link d="M140 226C200 226 200 300 252 300" />
      <Link d="M196 386C230 386 226 316 252 316" />
      <Inspectable
        id="fd-ingest"
        title="Ingestion"
        body="A ready-made ingestion tool, chosen after an audit.|It brings structured (SQL) and semi-structured (NoSQL) Data into the Data warehouse, on schedule."
      >
        <g>
          <Lab x={306} y={244} t="INGESTION" c="center" />
          <Server x={260} y={262} w={92} n={3} />
          <Sub x={306} y={382} t="Ready-made tool" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[358, 306]} to={[406, 306]} />
      <Inspectable
        id="fd-warehouse"
        title="BigQuery · the Data warehouse"
        body="A Data warehouse: one place where all the company’s Data is stored for analysis. Here, BigQuery, on Google Cloud.|Both brands’ Data, side by side, raw then curated."
      >
        <g>
          <rect className="tx-layer-q" x="412" y="180" width="460" height="230" rx="6" />
          <Lab x={428} y={204} t="BIGQUERY · DATA WAREHOUSE" c="warm" />
          <Lab x={470} y={244} t="RAW" c="center" />
          <Db cx={470} y={258} w={84} h={96} />
          <Sub x={470} y={378} t="As it arrives" c="center" />
          <Lab x={800} y={244} t="CURATED" c="center" />
          <Db cx={800} y={258} w={84} h={96} />
          <Sub x={800} y={378} t="Ready to analyse" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[514, 306]} to={[556, 306]} />
      <Inspectable
        id="fd-models"
        title="SQL models"
        body="SQL transformations that clean and join the raw Data.|They write the curated tables, inside the warehouse."
      >
        <Win x={560} y={240} w={150} h={132} title="SQL MODELS">
          <Code
            x={572}
            y={286}
            lh={22}
            lines={['SELECT', '  order_id,', '  brand, total', 'FROM raw.orders']}
          />
        </Win>
      </Inspectable>
      <Arrow from={[714, 306]} to={[756, 306]} />
      <Arrow from={[844, 306]} to={[884, 306]} />
      <Inspectable
        id="fd-bi"
        title="BI"
        body="The BI tool reads the curated tables.|Teams build their analysis on them."
      >
        <Win x={888} y={256} w={72} h={100} title="BI">
          <Bars x={898} y={290} w={52} h={52} vals={[0.35, 0.6, 0.5, 0.85]} />
        </Win>
      </Inspectable>
      <Inspectable
        id="fd-built"
        title="I built the pipelines and the models"
        body="I designed the platform block by block.|I built its pipelines and its SQL models."
      >
        <g>
          <path className="tx-promise" d="M260 440V456H872V440" />
          <Lab x={566} y={484} t="I BUILT THE PIPELINES AND THE MODELS" c="center warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="fd-choice"
        title="Chosen after an audit"
        body="I audited the ingestion tools available.|A ready-made tool, chosen on the audit’s result."
      >
        <g>
          <Lab x={40} y={560} t="INGESTION TOOL · CHOSEN AFTER AN AUDIT" />
          {[0, 1, 2].map((i) => (
            <Fragment key={i}>
              <Server x={40 + i * 130} y={580} w={96} n={2} />
              <Check x={150 + i * 130} y={596} ok={i === 1} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
    </Layer>
  );
}

function Migration() {
  return (
    <Layer steps={[3]}>
      <Inspectable
        id="fd-bench"
        title="Tools benchmarked and trialled"
        body="I explored the market, benchmarked the tools and trialled them.|Tableau was too complex for a company of this size."
      >
        <Win x={40} y={96} w={300} h={250} title="BENCHMARK · TRIALS">
          {(
            [
              ['TABLEAU', 'Too complex for our size', false],
              ['OTHER TOOLS', 'Benchmarked, trialled', false],
              ['METABASE', 'Usable after a short training', true],
            ] as const
          ).map(([t, s, ok], i) => (
            <Fragment key={t}>
              <Lab x={60} y={152 + i * 64} t={t} c={ok ? 'warm' : ''} />
              <Sub x={60} y={174 + i * 64} t={s} />
              <Check x={316} y={160 + i * 64} ok={ok} />
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Arrow from={[348, 220]} to={[396, 220]} />
      <Inspectable
        id="fd-board"
        title="Metabase defended before the board"
        body="I defended the choice of Metabase before the board.|Its decision launched the migration."
      >
        <g>
          <Win x={455} y={96} w={180} h={64} title="METABASE">
            <Spark x={470} y={130} w={150} h={22} vals={[0.2, 0.5, 0.35, 0.8, 0.9]} c="on" />
          </Win>
          <rect className="tx-app" x="470" y="214" width="150" height="70" rx="35" />
          {(
            [
              [495, 206],
              [545, 198],
              [595, 206],
              [495, 316],
              [545, 324],
              [595, 316],
            ] as const
          ).map(([x, y], i) => (
            <User key={i} x={x} y={y} s={0.75} />
          ))}
          <Lab x={545} y={356} t="BEFORE THE BOARD" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[650, 220]} to={[698, 220]} />
      <Inspectable
        id="fd-weeks"
        title="Critical board dashboards in six weeks"
        body="I led the whole migration.|The critical board dashboards were delivered within six weeks."
      >
        <g>
          <Lab x={706} y={100} t="SIX WEEKS" />
          {Array.from({ length: 6 }, (_, i) => (
            <Fragment key={i}>
              <rect
                className={`tx-track${i < 5 ? ' done' : ' now'}`}
                x={706 + i * 42}
                y="116"
                width="38"
                height="26"
                rx="2"
              />
              <T x={725 + i * 42} y={134} className="center tx-win-t">{`W${i + 1}`}</T>
            </Fragment>
          ))}
          <Win x={706} y={170} w={250} h={150} title="BOARD DASHBOARDS">
            <Bars x={722} y={206} w={110} h={90} vals={[0.5, 0.8, 0.6, 0.95]} />
            <Spark x={846} y={210} w={96} h={80} vals={[0.3, 0.45, 0.4, 0.7, 0.85]} c="on" />
          </Win>
          <Check x={944} y={154} />
          <Lab x={706} y={356} t="DELIVERED" c="warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="fd-led"
        title="The whole migration led"
        body="From benchmark to board decision to delivery.|I led each stage."
      >
        <g>
          <path className="tx-promise" d="M40 400V416H956V400" />
          <Lab x={498} y={446} t="THE WHOLE MIGRATION LED · FROM BENCHMARK TO DELIVERY" c="center warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="fd-appengine"
        title="Metabase on Google App Engine"
        body="Google App Engine: Google Cloud’s managed hosting for applications.|I deployed Metabase on it and maintained it in production."
      >
        <g>
          <Win x={520} y={486} w={440} h={130} title="GOOGLE APP ENGINE · METABASE">
            {[0, 1].map((i) => (
              <Fragment key={i}>
                <rect className="tx-app" x={540 + i * 130} y={524} width="116" height="40" rx="4" />
                <T x={598 + i * 130} y={549} className="center tx-win-t">
                  METABASE
                </T>
              </Fragment>
            ))}
            <circle className="tx-led" cx={820} cy={540} r="5" />
            <Sub x={834} y={545} t="Running" />
            <Sub x={540} y={598} t="Deployed and maintained by me, in production" />
          </Win>
        </g>
      </Inspectable>
      <CaseChip
        x={40}
        y={540}
        w={420}
        to="food-deadline"
        kicker="HIGH-STAKES · SIX WEEKS"
        sub="Critical board dashboards, on time"
      />
    </Layer>
  );
}

const kit: [string, string, string, React.ReactNode][] = [
  [
    'fd-docs',
    'DOCUMENTATION',
    'What each table and figure means|Anyone finds the right figure without asking.',
    <g>
      <rect className="tx-doc" x="56" y="120" width="64" height="82" rx="3" />
      <path className="tx-grid" d="M66 140H110M66 156H110M66 172H110M66 188H96" />
    </g>,
  ],
  [
    'fd-videos',
    'HOW-TO VIDEOS',
    'Short videos for common tasks|Teams watch them again when they need to.',
    <g>
      <rect className="tx-app" x="56" y="268" width="96" height="64" rx="4" />
      <path className="tx-head" d="M96 286L118 300 96 314Z" />
    </g>,
  ],
  [
    'fd-training',
    'TRAINING · EACH TEAM',
    'Sessions with each team|Pedagogy is the art of repetition.',
    <g>
      <rect className="tx-app" x="56" y="404" width="100" height="26" rx="3" />
      {[0, 1, 2].map((i) => (
        <User key={i} x={72 + i * 34} y={470} s={0.8} c="on" />
      ))}
    </g>,
  ],
];

function Adoption() {
  return (
    <Layer steps={[4]}>
      {kit.map(([id, t, body, icon], i) => (
        <Inspectable key={id} id={id} title={t.charAt(0) + t.slice(1).toLowerCase()} body={body}>
          <g>
            {icon}
            <Lab x={176} y={160 + i * 145} t={t} />
            <Sub x={176} y={182 + i * 145} t={body.split('|')[0]} />
          </g>
        </Inspectable>
      ))}
      <Inspectable
        id="fd-metabase"
        title="Metabase"
        body="The new BI tool, usable after a short training.|Teams build their own analysis on the curated tables."
      >
        <Win x={440} y={96} w={270} h={240} title="METABASE · NEW QUESTION">
          {(['Orders', 'by hub', 'per week'] as const).map((t, i) => (
            <Fragment key={t}>
              <rect className="tx-ticket" x={456 + i * 82} y="134" width="74" height="22" rx="3" />
              <T x={493 + i * 82} y={149} className="center tx-win-t dark">
                {t}
              </T>
            </Fragment>
          ))}
          <Bars x={462} y={180} w={226} h={136} vals={[0.3, 0.45, 0.4, 0.6, 0.75, 0.7, 0.9]} />
        </Win>
      </Inspectable>
      <Inspectable
        id="fd-axes"
        title="New analysis axes"
        body="New ways to slice the Data, added with the teams.|Each team monitors its own activity."
      >
        <g>
          <Lab x={440} y={380} t="NEW ANALYSIS AXES" />
          {[0, 1, 2].map((i) => (
            <Win key={i} x={440 + i * 92} y={396} w={82} h={62} title="">
              <Spark
                x={452 + i * 92}
                y={426}
                w={58}
                h={22}
                vals={
                  [
                    [0.2, 0.6, 0.4, 0.9],
                    [0.7, 0.5, 0.6, 0.3],
                    [0.3, 0.4, 0.7, 0.8],
                  ][i]
                }
                c="on"
              />
            </Win>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="fd-producers"
        title="From 2 to 25 active analysis producers"
        body="People who build their own analysis, beyond reading it.|From 2 to 25 after the migration and the training."
      >
        <g>
          <T x={770} y={132} className="tx-big">
            2 → 25
          </T>
          <Lab x={770} y={160} t="ACTIVE ANALYSIS PRODUCERS" />
          {Array.from({ length: 25 }, (_, i) => (
            <g key={i} className={i < 2 ? '' : 'tx-lit-seq'} style={vars({ '--i': i - 2 })}>
              <User x={786 + (i % 5) * 38} y={222 + Math.floor(i / 5) * 46} s={0.7} c={i < 2 ? 'on' : ''} />
            </g>
          ))}
        </g>
      </Inspectable>
      <Lab x={176} y={520} t="REPEATED WITH EACH TEAM" c="warm" />
    </Layer>
  );
}

function Beneath() {
  return (
    <Layer steps={[5]}>
      <DataChain
        id="fd-chain-b"
        steps={['SOURCE', 'ELT', 'DATA WAREHOUSE', 'BI / ANALYTICS']}
        on={[0, 1, 2]}
      />
      <Inspectable
        id="fd-surface"
        title="Data analysis"
        body="What teams see: dashboards and questions.|Where my work had been so far."
      >
        <g>
          <Lab x={40} y={100} t="DATA ANALYSIS" />
          <Win x={40} y={116} w={210} h={110} title="DASHBOARD">
            <Bars x={56} y={148} w={110} h={64} vals={[0.4, 0.7, 0.55, 0.9]} />
            <Spark x={176} y={152} w={60} h={56} vals={[0.3, 0.6, 0.5, 0.8]} c="on" />
          </Win>
          {[0, 1, 2].map((i) => (
            <User key={i} x={300 + i * 40} y={210} c="on" />
          ))}
        </g>
      </Inspectable>
      <path className="tx-earth-l" d="M40 262H960" />
      <Inspectable
        id="fd-beneath"
        title="What happens beneath"
        body="The Data warehouse, pipelines, models and orchestration: the engineering under every analysis.|What drew me toward Data Engineering."
      >
        <g>
          <rect className="tx-layer" x="40" y="286" width="920" height="250" rx="4" />
          <Lab x={60} y={318} t="BENEATH DATA ANALYSIS" c="warm" />
          <Win x={110} y={350} w={180} h={120} title="SQL MODELS">
            <Code x={124} y={398} lh={22} lines={['SELECT *', 'FROM raw', 'WHERE …']} />
          </Win>
          <Arrow from={[296, 410]} to={[370, 410]} />
          <Server x={376} y={366} w={110} n={3} />
          <Sub x={431} y={490} t="Pipelines" c="center" />
          <Arrow from={[492, 410]} to={[566, 410]} />
          <Db cx={630} y={356} w={110} h={110} />
          <Sub x={630} y={490} t="Data warehouse" c="center" />
          <Arrow from={[690, 410]} to={[764, 410]} />
          <Win x={770} y={350} w={160} h={120} title="ORCHESTRATION">
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                className="tx-gantt"
                x={786 + i * 30}
                y={386 + i * 22}
                width={60}
                height="12"
                rx="2"
              />
            ))}
          </Win>
        </g>
      </Inspectable>
      <CaseChip x={40} y={580} w={420} to="heetch" kicker="NEXT · HEETCH · AUGUST 2022" sub="Data Engineer" />
    </Layer>
  );
}

export default function SystemFoodScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="FOODCHÉRI / SEAZON · BI ENGINEER, DATA PRODUCT OWNER" />
      <Audit />
      <Bottleneck />
      <Platform />
      <Migration />
      <Adoption />
      <Beneath />
    </>
  );
}
