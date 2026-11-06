// ISS · FoodChéri, six weeks: the clock, the way, the build, delivered on day one.
// Which dashboards are used, the weekly rhythm and the order on the track are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { Arrow, CaseChip, Check, Header, Lab, Move, OpsDefs, Sub, T, User, vars, Win } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

// ---------- shared vocabulary ----------
const icon = {
  board: (
    <>
      <rect x="-14" y="-4" width="28" height="12" rx="6" />
      <circle cx="-8" cy="-12" r="3.5" />
      <circle cx="8" cy="-12" r="3.5" />
      <circle cy="15" r="3.5" />
    </>
  ),
  finance: (
    <>
      <path d="M-15 14H15M-11 14V2M-3 14V-4M5 14V-1M13 14V-10" />
      <path d="M-13-6L-3-12 5-9 13-16" />
    </>
  ),
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
  check: (
    <>
      <circle r="14" />
      <path d="M-6 0L-2 5 7-5" />
    </>
  ),
  ingest: (
    <>
      <ellipse cx="-7" cy="-9" rx="8" ry="3" />
      <path d="M-15-9V7A8 3 0 0 0 1 7V-9M4 0H16M10-6L16 0 10 6" />
    </>
  ),
  sql: <path d="M-8-11L-17 0-8 11M8-11L17 0 8 11M3-13L-3 13" />,
  chart: (
    <>
      <path d="M-15-14V13H15" />
      <path d="M-10 6L-3-2 3 3 13-9" />
    </>
  ),
  tableau: <path d="M0-14V14M-14 0H14M-9-9V-3M-12-6H-6M9 3V9M6 6H12" />,
};

function Medal({
  x,
  y,
  r = 44,
  i,
  on,
  dashed,
}: {
  x: number;
  y: number;
  r?: number;
  i: React.ReactNode;
  on?: boolean;
  dashed?: boolean;
}) {
  return (
    <>
      <circle className={`tx-stage${on ? ' vs-on' : ''}${dashed ? ' vs-dashed' : ''}`} cx={x} cy={y} r={r} />
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

// ---------- 1 · The clock ----------
const R = { x: 210, y: 330, r: 130 };
const arc = (k: number) => {
  const a0 = ((-90 + k * 60 + 4) * Math.PI) / 180;
  const a1 = ((-90 + (k + 1) * 60 - 4) * Math.PI) / 180;
  const p = (a: number) => `${(R.x + R.r * Math.cos(a)).toFixed(1)} ${(R.y + R.r * Math.sin(a)).toFixed(1)}`;
  return `M${p(a0)}A${R.r} ${R.r} 0 0 1 ${p(a1)}`;
};
const weekLabel = (k: number) => {
  const a = ((-90 + k * 60 + 30) * Math.PI) / 180;
  return [R.x + (R.r + 30) * Math.cos(a), R.y + (R.r + 30) * Math.sin(a) + 4] as const;
};
const steering = new Set([33, 47, 98, 151, 212, 266, 318, 371, 405, 462, 517, 574]);

function TheClock() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={92} t="SIX WEEKS · THEN THE TABLEAU LICENCE ENDS" c="strong" />
      <Inspectable
        id="sw-calendar"
        title="Six weeks"
        body="Six weeks before the Tableau licence ended.|The date the reporting had to be ready for."
      >
        <g>
          {Array.from({ length: 6 }, (_, k) => {
            const [lx, ly] = weekLabel(k);
            return (
              <Fragment key={k}>
                <path className="dl-week" style={vars({ '--i': k })} d={arc(k)} />
                <T x={lx} y={ly} className="center tx-win-t">{`W${k + 1}`}</T>
              </Fragment>
            );
          })}
          <T x={R.x} y={R.y + 4} className="tx-big center">
            6
          </T>
          <Lab x={R.x} y={R.y + 32} t="WEEKS" c="center" />
          <Sub x={R.x} y={R.y + 54} t="Then the licence ends" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="sw-tableau"
        title="600+ dashboards on Tableau"
        body="More than 600 dashboards ran on Tableau.|All of them stopped with the licence."
      >
        <Win x={420} y={116} w={540} h={320} title="TABLEAU · 600+ DASHBOARDS">
          {Array.from({ length: 600 }, (_, i) => (
            <rect
              key={i}
              className={steering.has(i) ? 'dl-cell used' : 'dl-cell'}
              style={steering.has(i) ? vars({ '--i': [...steering].indexOf(i) }) : undefined}
              x={438 + (i % 30) * 17}
              y={146 + Math.floor(i / 30) * 13.5}
              width="13"
              height="10"
              rx="1.5"
            />
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="sw-board"
        title="The board and finance"
        body="The board and finance steered the company with some of these dashboards.|The views that could not stop."
      >
        <g>
          {(
            [
              ['BOARD', icon.board, 560],
              ['FINANCE', icon.finance, 780],
            ] as const
          ).map(([t, i, x]) => (
            <Fragment key={t}>
              <Arrow from={[x, 440]} to={[x, 466]} />
              <Medal x={x} y={500} r={28} i={i} on />
              <Lab x={x + 40} y={505} t={t} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Close t="600+ DASHBOARDS, SIX WEEKS" s="The board and finance steered with some of them." />
    </Layer>
  );
}

// ---------- 2 · The way ----------
const ranked: [string, string, React.ReactNode][] = [
  ['BOARD-LEVEL MONITORING', 'First', icon.board],
  ['FINANCE', 'At the top', icon.finance],
  ['OTHER VIEWS IN REGULAR USE', 'Used every week', icon.chart],
];
const ry = (k: number) => 160 + k * 100;

function TheWay() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={92} t="MY AUDIT · WHAT THE COMPANY NEEDS FIRST" c="strong" />
      <Inspectable
        id="sw-audit"
        title="My audit"
        body="About one dashboard in ten was used regularly.|The real scope: far smaller than 600."
      >
        <g>
          <Lab x={40} y={142} t="600+ DASHBOARDS" />
          {Array.from({ length: 120 }, (_, i) => (
            <rect
              key={i}
              className={i % 10 === 3 ? 'dl-tenth' : 'dl-cell'}
              style={i % 10 === 3 ? vars({ '--i': Math.floor(i / 10) }) : undefined}
              x={40 + (i % 12) * 18}
              y={158 + Math.floor(i / 12) * 18}
              width="14"
              height="14"
              rx="2"
            />
          ))}
          <Sub x={40} y={364} t="About one in ten used regularly" />
          <Arrow from={[262, 250]} to={[310, 250]} />
          <Medal x={360} y={250} i={icon.lens} on />
          <Lab x={360} y={188} t="MY AUDIT" c="center warm" />
          <Sub x={360} y={322} t="Who depends on each view" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="sw-ranked"
        title="Ranked by who depends on them"
        body="Board-level monitoring first, finance at the top, then the other views in regular use.|Rebuilt in that order."
      >
        <g>
          {ranked.map(([t, s, i], k) => (
            <Fragment key={t}>
              <Arrow from={[408, 250]} to={[500, ry(k)]} />
              <g className="dl-rank" style={vars({ '--i': k })}>
                <Medal x={540} y={ry(k)} r={32} i={i} />
              </g>
              <Lab x={588} y={ry(k) + 2} t={`${k + 1} · ${t}`} c={k ? '' : 'warm'} />
              <Sub x={588} y={ry(k) + 22} t={s} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="sw-later"
        title="Everything else, later"
        body="The other dashboards waited for the full migration.|Six weeks went to what the company needed."
      >
        <g>
          <path className="tx-link vs-faint" d="M360 336V438" />
          <Medal x={360} y={472} r={28} i={icon.clock} dashed />
          <Lab x={402} y={468} t="EVERYTHING ELSE" />
          <Sub x={402} y={488} t="The full migration, later" />
        </g>
      </Inspectable>
      <Close t="WHAT THE COMPANY NEEDS" s="Ranked by who depended on each view." />
    </Layer>
  );
}

// ---------- 3 · The build ----------
const bx = [130, 370, 610, 850];
const build: [string, string, string, string, React.ReactNode][] = [
  [
    'sw-tools',
    'TOOLS VALIDATED',
    'First',
    'The new tools, validated before building.|Six weeks left no room to change course.',
    icon.check,
  ],
  [
    'sw-pipes',
    'INGESTION PIPELINES',
    'Sources to the warehouse',
    'I built the ingestion pipelines.|The Data the views need, loaded every day.',
    icon.ingest,
  ],
  [
    'sw-sql',
    'SQL MODELS',
    'Behind each view',
    'I built the SQL models behind those views.|The figures, defined once.',
    icon.sql,
  ],
  [
    'sw-views',
    'VIEWS IN METABASE',
    'Board and finance',
    'I rebuilt the views in Metabase.|What the board and finance read.',
    icon.chart,
  ],
];
const TY = 390;

function TheBuild() {
  return (
    <Layer steps={[2]}>
      <Lab x={40} y={92} t="SIX WEEKS OF BUILDING" c="strong" />
      {build.map(([id, t, s, body, i], k) => (
        <Inspectable key={id} id={id} title={t.charAt(0) + t.slice(1).toLowerCase()} body={body}>
          <g>
            <Medal x={bx[k]} y={210} i={i} on={k === 3} />
            <Lab x={bx[k]} y={148} t={t} c={`center${k === 3 ? ' warm' : ''}`} />
            <Sub x={bx[k]} y={282} t={s} c="center" />
          </g>
        </Inspectable>
      ))}
      {[0, 1, 2].map((k) => (
        <Arrow key={k} from={[bx[k] + 52, 210]} to={[bx[k + 1] - 54, 210]} />
      ))}
      <Move path="M130 210H850" dur={7}>
        <circle className="tx-alert" r="6" />
      </Move>
      <Inspectable
        id="sw-plan"
        title="Six weeks, one track"
        body="Week after week, from validated tools to live views.|The licence end fixed the last day."
      >
        <g>
          <path className="tx-route" d={`M130 ${TY}H850`} />
          <path className="tx-draw" pathLength={1} d={`M130 ${TY}H850`} />
          {Array.from({ length: 6 }, (_, k) => (
            <Fragment key={k}>
              <path className="tx-tick" d={`M${130 + k * 120} ${TY - 8}V${TY + 8}`} />
              <T x={190 + k * 120} y={TY + 28} className="center tx-win-t">{`WEEK ${k + 1}`}</T>
            </Fragment>
          ))}
          <path className="tx-promise" d={`M850 ${TY - 26}V${TY + 14}`} />
          <Lab x={850} y={TY - 38} t="LICENCE ENDS" c="center warm" />
          <Move path={`M130 ${TY}H850`} dur={12}>
            <circle className="tx-alert" r="7" />
          </Move>
        </g>
      </Inspectable>
      <Inspectable
        id="sw-hours"
        title="75 to 80 hours a week"
        body="Weeks of 75 to 80 hours, weekends included.|The price of holding the date."
      >
        <Close t="75 TO 80 HOURS A WEEK" s="Weekends included.">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, k) => (
            <Fragment key={k}>
              <rect
                className="dl-day"
                style={vars({ '--i': k })}
                x={600 + k * 52}
                y={584}
                width="42"
                height="36"
                rx="4"
              />
              <T x={621 + k * 52} y={607} className="center tx-win-t dark">
                {d}
              </T>
            </Fragment>
          ))}
        </Close>
      </Inspectable>
    </Layer>
  );
}

// ---------- 4 · Delivered ----------
const lanes: [string, number][] = [
  ['Board-level monitoring', 206],
  ['Finance', 262],
];

function Delivered() {
  return (
    <Layer steps={[3]}>
      <Lab x={40} y={92} t="DAY ONE · THE DATE HELD" c="strong" />
      <Inspectable
        id="sw-ended"
        title="Tableau, licence ended"
        body="The Tableau licence ended on the planned date.|Nothing critical depended on it any more."
      >
        <g>
          <Medal x={100} y={234} r={40} i={icon.tableau} dashed />
          <Lab x={100} y={300} t="TABLEAU" c="center" />
          <Sub x={100} y={320} t="Licence ended" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="sw-live"
        title="The critical views, live on Metabase"
        body="Board-level monitoring and finance ran on the new stack before the licence ended.|The board kept its views on day one."
      >
        <g>
          {lanes.map(([t, y]) => (
            <Fragment key={t}>
              <path className="dl-lane old" d={`M146 ${y}H500`} />
              <path className="dl-lane new" d={`M500 ${y}H854`} />
              <Sub x={170} y={y - 12} t={t} />
              <Check x={524} y={y} />
              <Move path={`M146 ${y}H854`} dur={7}>
                <circle className="tx-alert" r="6" />
              </Move>
            </Fragment>
          ))}
          <path className="tx-promise dashed" d="M500 168V300" />
          <Lab x={500} y={154} t="LICENCE ENDS" c="center warm" />
          <Medal x={900} y={234} r={40} i={icon.chart} on />
          <Lab x={900} y={300} t="METABASE" c="center warm" />
          <Sub x={900} y={320} t="Live on day one" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="sw-access"
        title="Then, access for every team"
        body="After the critical views, every team got access.|The start of the move from 2 to 25 active analysis producers."
      >
        <g>
          <Lab x={40} y={386} t="THEN, ACCESS FOR EVERY TEAM" />
          {Array.from({ length: 25 }, (_, i) => (
            <g key={i} className={i < 2 ? '' : 'tx-lit-seq'} style={vars({ '--i': i - 2 })}>
              <User x={60 + i * 36.5} y={448} s={0.7} c={i < 2 ? 'on' : ''} />
            </g>
          ))}
          <Sub x={40} y={486} t="The start of the move from 2 to 25 active analysis producers" />
        </g>
      </Inspectable>
      <Close t="THE BOARD KEPT ITS VIEWS ON DAY ONE" s="The critical views ran before the licence ended.">
        <CaseChip
          x={560}
          y={578}
          w={400}
          to="food-data"
          kicker="FOODCHÉRI · THE FULL STORY"
          sub="From 2 to 25 active analysis producers"
        />
      </Close>
    </Layer>
  );
}

export default function DeadlineScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="FOODCHÉRI · SIX WEEKS" />
      <TheClock />
      <TheWay />
      <TheBuild />
      <Delivered />
    </>
  );
}
