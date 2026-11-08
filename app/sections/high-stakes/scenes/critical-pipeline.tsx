// ISS · Heetch, a critical pipeline: the stakes, the break, the way, the result.
// Run timings, lineage steps and dashboards are illustrative; durations and frequency are from Stéphane's account.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  CaseChip,
  Check,
  DataChain,
  Db,
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
const Flow = ({ d, dur = 2.4, begin = 0 }: { d: string; dur?: number; begin?: number }) => (
  <Move path={d} dur={dur} begin={begin}>
    <circle className="tx-alert" r="5" />
  </Move>
);
const Bucket = ({ x, y, w = 110 }: { x: number; y: number; w?: number }) => (
  <g>
    <path className="tx-bucket" d={`M${x} ${y}H${x + w}L${x + w - 10} ${y + 60}H${x + 10}Z`} />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${x + w / 2 - 38 + i * 27} ${y + 12})`}>
        <path className="tx-doc" d="M0 0H16L21 5V30H0Z" />
      </g>
    ))}
  </g>
);
const Node = ({ x, y, t, w = 84 }: { x: number; y: number; t: string; w?: number }) => (
  <>
    <rect className="tx-app" x={x - w / 2} y={y - 14} width={w} height="28" rx="5" />
    <T x={x} y={y + 4} className="center tx-win-t">
      {t}
    </T>
  </>
);
const icon = {
  lens: (
    <>
      <circle cx="-3" cy="-3" r="10" />
      <path d="M4 4L14 14" />
    </>
  ),
  clock: (
    <>
      <circle r="14" />
      <path d="M0-8V0L6 4" />
    </>
  ),
};
function Medal({
  x,
  y,
  r = 40,
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
      <g className="tx-icon" transform={`translate(${x} ${y}) scale(${(r / 44) * 1.25})`}>
        {i}
      </g>
    </>
  );
}

// ---------- 1 · The stakes ----------
function TheStakes() {
  return (
    <Layer steps={[0]}>
      <DataChain id="cp-chain" steps={['SOURCE', 'ETL', 'BI / ANALYTICS']} on={[0, 1, 2]} />
      <Lab x={40} y={92} t="ONE OF THE MOST CRITICAL PIPELINES" c="strong" />
      <Inspectable
        id="cp-sources"
        title="Several sources"
        body="Redshift (Amazon’s Data warehouse), S3 (Amazon’s object storage) and a third-party service platform.|Three sources, joined every hour."
      >
        <g>
          <Lab x={105} y={134} t="REDSHIFT" c="center" />
          <Db cx={105} y={146} w={96} h={70} />
          <Lab x={105} y={262} t="S3" c="center" />
          <Bucket x={50} y={274} />
          <Lab x={105} y={384} t="THIRD-PARTY" c="center" />
          <Win x={50} y={396} w={110} h={66} title="PLATFORM">
            <path className="tx-grid" d="M62 436H148M62 448H130" />
          </Win>
        </g>
      </Inspectable>
      {(
        [
          [156, 182, 254, 262],
          [160, 304, 254, 290],
          [164, 428, 254, 318],
        ] as const
      ).map(([x1, y1, x2, y2], k) => (
        <Fragment key={k}>
          <Arrow from={[x1, y1]} to={[x2, y2]} />
          <Flow d={`M${x1} ${y1}L${x2} ${y2}`} dur={1.6} begin={k * 0.5} />
        </Fragment>
      ))}
      <Inspectable
        id="cp-volume"
        title="A large hourly volume, growing"
        body="Every hour brought more Data to process.|A pipeline built for yesterday’s volume."
      >
        <g>
          <Lab x={262} y={128} t="HOURLY VOLUME, GROWING" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect
              key={i}
              className="vs-grow"
              style={vars({ '--i': i })}
              x={262 + i * 27}
              y={196 - (12 + i * 6)}
              width="20"
              height={12 + i * 6}
              rx="2"
            />
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="cp-etl"
        title="The ETL pipeline"
        body="An ETL pipeline: it extracts the Data from the sources, transforms it, then loads it.|Orchestrated to run every hour."
      >
        <g>
          <Win x={260} y={220} w={220} h={140} title="ETL PIPELINE · HOURLY">
            <Server x={278} y={256} w={184} n={3} />
          </Win>
          <Sub x={370} y={384} t="I inherited it to maintain" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[486, 290]} to={[546, 290]} />
      <Flow d="M486 290H546" dur={1.6} />
      <Inspectable
        id="cp-detect"
        title="Driver behaviour, analysed"
        body="The pipeline analyses driver behaviour automatically.|A critical side of a ride-hailing company’s activity."
      >
        <g>
          <Win x={552} y={200} w={210} h={180} title="DRIVER BEHAVIOUR">
            {[0, 1, 2, 3].map((i) => (
              <Fragment key={i}>
                <g transform={`translate(574 ${246 + i * 34})`}>
                  <rect className="tx-app" x="0" y="-8" width="26" height="12" rx="3" />
                  <circle className="tx-stop" cx="6" cy="6" r="3" />
                  <circle className="tx-stop" cx="20" cy="6" r="3" />
                </g>
                <path className="tx-grid" d={`M612 ${244 + i * 34}H712`} />
                {(i === 1 || i === 3) && <circle className="vs-anom" cx={736} cy={244 + i * 34} r="6" />}
              </Fragment>
            ))}
          </Win>
          <Sub x={657} y={404} t="Analysed automatically" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[768, 290]} to={[812, 290]} />
      <Inspectable
        id="cp-teams"
        title="Country operations teams"
        body="Each country’s operations team reads its dashboards.|They act on what the detection finds."
      >
        <g>
          <Win x={818} y={224} w={142} h={96} title="DASHBOARD">
            <Bars x={832} y={254} w={114} h={56} vals={[0.5, 0.8, 0.6, 0.9]} />
          </Win>
          {[0, 1, 2].map((i) => (
            <User key={i} x={856 + i * 32} y={376} s={0.8} />
          ))}
          <Sub x={889} y={404} t="Country operations" c="center" />
        </g>
      </Inspectable>
      <Close
        t="ONE OF THE MOST CRITICAL PIPELINES"
        s="Driver behaviour, analysed automatically, every hour."
      />
    </Layer>
  );
}

// ---------- 2 · The break ----------
const H0 = 100;
const HW = 64; // one hour
function TheBreak() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={92} t="BUILT FOR EACH HOUR, OUTGROWN BY THE VOLUME" c="strong" />
      <Inspectable
        id="cp-runs"
        title="Hourly runs of 90 minutes"
        body="A run started every hour and took 90 minutes for one hour of Data.|Each run blocked the next hour’s run: the pipeline failed every two hours."
      >
        <g>
          <path className="tx-promise" d={`M${H0} 140V132H${H0 + HW * 1.5}V140`} />
          <Lab x={H0 + HW * 0.75} y={124} t="90 MIN" c="center warm" />
          {Array.from({ length: 12 }, (_, i) => {
            const ko = i % 2 === 1;
            const y = 156 + (i % 2) * 38;
            return (
              <Fragment key={i}>
                <rect
                  className={`cp-run${ko ? ' ko' : ''}`}
                  style={vars({ '--i': i })}
                  x={H0 + i * HW}
                  y={y}
                  width={HW * 1.5 - 4}
                  height="24"
                  rx="4"
                />
                <Check x={H0 + i * HW + HW * 1.5 - 18} y={y + 12} ok={!ko} />
              </Fragment>
            );
          })}
          <path className="tx-axis" d={`M${H0} 240H${H0 + HW * 12}`} />
          {Array.from({ length: 7 }, (_, k) => (
            <Fragment key={k}>
              <path className="tx-tick" d={`M${H0 + k * 2 * HW} 234V246`} />
              <T
                x={H0 + k * 2 * HW}
                y={264}
                className="center tx-win-t dim"
              >{`${String(k * 2).padStart(2, '0')}:00`}</T>
            </Fragment>
          ))}
          <Lab x={40} y={174} t="RUNS" />
        </g>
      </Inspectable>
      <Inspectable
        id="cp-missing"
        title="Half of the day’s Data, missing"
        body="Each failed run left its hour empty.|By evening, half of the day’s Data was missing."
      >
        <g>
          <Lab x={40} y={334} t="THE DAY’S DATA" />
          {Array.from({ length: 24 }, (_, i) => (
            <rect
              key={i}
              className={i % 2 ? 'cp-miss' : 'tx-track done'}
              x={250 + i * 29}
              y={318}
              width="26"
              height="22"
              rx="3"
            />
          ))}
          <Sub x={250} y={364} t="By evening, half of it missing" c="warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="cp-late"
        title="Dashboards filled a day late"
        body="The critical operational dashboards received the Data the day after.|Teams looked at yesterday, half complete."
      >
        <g>
          <Lab x={40} y={444} t="CRITICAL DASHBOARDS" />
          <Win x={250} y={404} w={170} h={110} title="DAY D">
            <rect className="cp-miss" x={266} y={440} width="138" height="60" rx="3" />
            <T x={335} y={474} className="center tx-win-t late">
              WAITING
            </T>
          </Win>
          <Arrow from={[426, 459]} to={[478, 459]} />
          <Win x={484} y={404} w={170} h={110} title="DAY D + 1">
            <Bars x={500} y={436} w={138} h={66} vals={[0.5, 0.3, 0.6, 0.35, 0.55]} />
          </Win>
          <Sub x={674} y={464} t="Filled a day late, half complete" />
        </g>
      </Inspectable>
      <Close t="HALF THE DAY’S DATA, MISSING" s="Critical dashboards filled a day late." />
    </Layer>
  );
}

// ---------- 3 · The way ----------
const before = ['REDSHIFT', 'S3', 'PLATFORM', 'JOIN', 'DETECT', 'LOAD'];
const par: Record<string, [number, number, string]> = {
  r: [86, 312, 'REDSHIFT'],
  s: [86, 362, 'S3'],
  p: [86, 412, 'PLATFORM'],
  c1: [256, 337, 'COMPUTE'],
  c2: [256, 397, 'COMPUTE'],
  d: [416, 367, 'DETECT'],
  l: [560, 367, 'LOAD'],
};
const parEdges: [string, string][] = [
  ['r', 'c1'],
  ['s', 'c1'],
  ['s', 'c2'],
  ['p', 'c2'],
  ['c1', 'd'],
  ['c2', 'd'],
  ['d', 'l'],
];
const edgeD = (a: string, b: string) => {
  const [x1, y1] = par[a];
  const [x2, y2] = par[b];
  const m = (x1 + x2) / 2;
  return `M${x1 + 42} ${y1}C${m} ${y1} ${m} ${y2} ${x2 - 42} ${y2}`;
};

function TheWay() {
  return (
    <Layer steps={[2]}>
      <Lab x={40} y={92} t="I WAS ASKED TO FIND A WAY" c="strong" />
      <Inspectable
        id="cp-before"
        title="One step after another"
        body="Before: every step waited for the previous one.|The run grew with the volume."
      >
        <g className="ht-faint">
          <Lab x={40} y={136} t="BEFORE · ONE STEP AFTER ANOTHER" />
          {before.map((t, i) => (
            <Fragment key={t}>
              <Node x={82 + i * 96} y={170} t={t} />
              {i < 5 && <path className="tx-link" d={`M${124 + i * 96} 170H${136 + i * 96}`} />}
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="cp-lineage"
        title="Lineage, explored"
        body="Lineage: what each step reads and what depends on it.|It showed which steps could run at the same time."
      >
        <g>
          <Arrow from={[606, 170]} to={[700, 170]} />
          <Medal x={746} y={170} i={icon.lens} on />
          <Lab x={800} y={166} t="LINEAGE" c="warm" />
          <Sub x={800} y={188} t="What depends on what" />
        </g>
      </Inspectable>
      <Inspectable
        id="cp-parallel"
        title="In parallel, wherever possible"
        body="The sources are ingested at the same time; independent computations run side by side.|The run no longer grows step by step."
      >
        <g>
          <Lab x={40} y={274} t="AFTER · IN PARALLEL WHERE POSSIBLE" c="warm" />
          {parEdges.map(([a, b]) => (
            <Link key={a + b} d={edgeD(a, b)} />
          ))}
          {Object.entries(par).map(([k, [x, y, t]]) => (
            <Node key={k} x={x} y={y} t={t} />
          ))}
          {(['r', 's', 'p'] as const).map((k, i) => (
            <Flow key={k} d={edgeD(k, i === 0 ? 'c1' : 'c2')} dur={2} />
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="cp-need"
        title="The need behind the need"
        body="I asked what the teams really needed: the Data every morning.|Delivered daily, at the frequency they use it."
      >
        <g>
          <Lab x={680} y={274} t="THE NEED BEHIND" />
          <path className="tx-bubble" d="M690 300H850V340H730L716 352V340H690Z" />
          <T x={770} y={325} className="center tx-win-t">
            EVERY MORNING
          </T>
          {[0, 1, 2].map((i) => (
            <User key={i} x={706 + i * 30} y={420} s={0.8} />
          ))}
          <Sub x={736} y={446} t="Country teams" c="center" />
          <Arrow from={[790, 396]} to={[838, 396]} />
          <Medal x={884} y={396} r={36} i={icon.clock} on />
          <Lab x={884} y={456} t="DAILY" c="center warm" />
        </g>
      </Inspectable>
      <Close
        t="LINEAGE, PARALLELISM, THE REAL NEED"
        s="Delivered at the frequency the teams needed: daily."
      />
    </Layer>
  );
}

// ---------- 4 · The result ----------
const PX = 8; // units per minute
function TheResult() {
  return (
    <Layer steps={[3]}>
      <Lab x={40} y={92} t="THE RESULT · DRAWN TO SCALE" c="strong" />
      <Inspectable
        id="cp-scale"
        title="From 90 minutes to 11"
        body="Before: 90 minutes for one hour of Data. After: 11 minutes for a full day.|Drawn to the same scale."
      >
        <g>
          <Lab x={40} y={150} t="BEFORE" />
          <Sub x={40} y={170} t="One hour of Data" />
          <rect className="cp-run ko" x={200} y={136} width={90 * PX} height="30" rx="4" />
          <Lab x={200 + 90 * PX - 10} y={190} t="90 MIN" c="end" />
          <Lab x={40} y={240} t="AFTER" c="warm" />
          <Sub x={40} y={260} t="A full day of Data" />
          <rect className="cp-fast" x={200} y={226} width={11 * PX} height="30" rx="4" />
          <Lab x={200 + 11 * PX + 14} y={247} t="11 MIN" c="warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="cp-morning"
        title="Ready every morning"
        body="The daily run finishes before the teams start.|Complete, correct Data at the start of the day."
      >
        <g>
          <Lab x={110} y={330} t="EVERY MORNING" c="center" />
          <Medal x={110} y={402} i={icon.clock} on />
          <Arrow from={[156, 402]} to={[212, 402]} />
          {[0, 1, 2].map((i) => (
            <Win key={i} x={220 + i * 190} y={352} w={170} h={100} title="COUNTRY TEAM">
              <Bars x={236 + i * 190} y={384} w={110} h={56} vals={[0.6, 0.8, 0.7, 0.9]} />
              <Check x={366 + i * 190} y={392} />
            </Win>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <User key={i} x={836 + i * 30} y={424} s={0.8} />
          ))}
          <Sub x={880} y={452} t="Country operations" c="center" />
          <Sub x={220} y={486} t="Complete, correct Data at the start of the day" />
        </g>
      </Inspectable>
      <Close t="11 MINUTES FOR A FULL DAY" s="A critical side of the business, seen every morning.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="heetch"
          kicker="EARTH · EXPERIENCE · HEETCH"
          sub="The Data Engineer role, in full"
        />
      </Close>
    </Layer>
  );
}

export default function CriticalPipelineScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="HEETCH · A CRITICAL PIPELINE" />
      <TheStakes />
      <TheBreak />
      <TheWay />
      <TheResult />
    </>
  );
}
