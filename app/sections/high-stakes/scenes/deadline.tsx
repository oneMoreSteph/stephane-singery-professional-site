// ISS · FoodChéri, six weeks: the clock, the priorities, the build, delivered on day one.
// Calendar positions and values are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  CaseChip,
  Check,
  Header,
  Lab,
  OpsDefs,
  Spark,
  Sub,
  T,
  User,
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/** Six weeks of days; `upTo` days are past, the last one is the licence end. */
function Calendar({ x, y, upTo = 0, cell = 30 }: { x: number; y: number; upTo?: number; cell?: number }) {
  return (
    <g>
      {days.map((d, i) => (
        <T key={i} x={x + i * (cell + 4) + cell / 2} y={y - 8} className="center tx-win-t">
          {d}
        </T>
      ))}
      {Array.from({ length: 42 }, (_, i) => (
        <rect
          key={i}
          className={`tx-track${i === 41 ? ' late-day' : i < upTo ? ' done' : ''}`}
          x={x + (i % 7) * (cell + 4)}
          y={y + Math.floor(i / 7) * (cell + 4)}
          width={cell}
          height={cell}
          rx="3"
        />
      ))}
    </g>
  );
}

function TheClock() {
  return (
    <Layer steps={[0]}>
      <Inspectable
        id="sw-calendar"
        title="Six weeks"
        body="The Tableau licence ended in six weeks.|A fixed date: the reporting had to run elsewhere by then."
      >
        <g>
          <Lab x={40} y={110} t="SIX WEEKS · THEN THE LICENCE ENDS" c="warm" />
          <Calendar x={40} y={146} upTo={1} />
          <Lab x={270} y={380} t="LICENCE ENDS" c="end warm" />
          <T x={40} y={470} className="tx-big">
            6 WEEKS
          </T>
          <Sub x={40} y={496} t="From the first day to the licence end" />
        </g>
      </Inspectable>
      <Inspectable
        id="sw-tableau"
        title="600+ dashboards on Tableau"
        body="More than 600 dashboards ran on Tableau.|All of them would stop with the licence."
      >
        <Win x={380} y={96} w={300} h={250} title="TABLEAU · 600+ DASHBOARDS">
          {Array.from({ length: 80 }, (_, i) => (
            <rect
              key={i}
              className="tx-tile-dim"
              x={396 + (i % 10) * 27}
              y={132 + Math.floor(i / 10) * 25}
              width="22"
              height="18"
              rx="2"
            />
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="sw-board"
        title="The board and finance steered with them"
        body="The board and finance steered the company with some of these dashboards.|Losing them meant steering blind."
      >
        <g>
          <rect className="tx-app" x="740" y="140" width="200" height="80" rx="40" />
          {[0, 1, 2].map((i) => (
            <User key={i} x={790 + i * 50} y={132} s={0.8} c="on" />
          ))}
          <Lab x={840} y={250} t="BOARD" c="center" />
          {[0, 1].map((i) => (
            <User key={i} x={810 + i * 60} y={330} s={0.8} c="on" />
          ))}
          <Lab x={840} y={364} t="FINANCE" c="center" />
          <Arrow from={[736, 200]} to={[690, 220]} />
          <Arrow from={[780, 320]} to={[690, 300]} />
        </g>
      </Inspectable>
    </Layer>
  );
}

const ranked: [string, string, string][] = [
  ['1', 'BOARD-LEVEL MONITORING', 'Steers the company'],
  ['2', 'FINANCE', 'Steers the money'],
  ['3', 'OTHER VIEWS IN REGULAR USE', 'Used every week'],
];

function TheWay() {
  return (
    <Layer steps={[1]}>
      <Inspectable
        id="sw-audit"
        title="About one in ten used regularly"
        body="My audit: about one dashboard in ten was used regularly.|The rest could wait for the full migration."
      >
        <g>
          <Lab x={40} y={110} t="MY AUDIT" />
          <rect className="tx-gauge" x="40" y="130" width="300" height="22" rx="3" />
          <rect className="tx-gauge-on" x="40" y="130" width="30" height="22" rx="3" />
          <Sub x={40} y={176} t="About one dashboard in ten used regularly" />
        </g>
      </Inspectable>
      <Inspectable
        id="sw-ranked"
        title="Ranked by who depends on them"
        body="I ranked the views by who depended on them.|Board-level monitoring first, finance at the top."
      >
        <Win x={40} y={220} w={560} h={270} title="VIEWS · RANKED BY WHO DEPENDS ON THEM">
          {ranked.map(([n, t, s], i) => (
            <Fragment key={n}>
              <rect
                className={`tx-table-row${i < 2 ? ' top' : ''}`}
                x="58"
                y={258 + i * 72}
                width="524"
                height="58"
                rx="3"
              />
              <T x={84} y={294 + i * 72} className="tx-big small center">
                {n}
              </T>
              <Lab x={116} y={284 + i * 72} t={t} c={i < 2 ? 'warm' : ''} />
              <Sub x={116} y={306 + i * 72} t={s} />
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Inspectable
        id="sw-later"
        title="Everything else: later"
        body="Every other dashboard went to the full migration, after the deadline.|Nothing critical was left behind."
      >
        <g>
          <rect className="tx-app dashed" x="640" y="258" width="320" height="58" rx="4" />
          <Lab x={660} y={284} t="EVERYTHING ELSE" />
          <Sub x={660} y={306} t="The full migration, later" />
        </g>
      </Inspectable>
      <Lab x={640} y={400} t="WHAT THE COMPANY NEEDS" c="warm" />
      <Sub x={640} y={422} t="Not what exists" />
    </Layer>
  );
}

const plan: [string, number, number][] = [
  ['TOOLS VALIDATED', 0, 1],
  ['INGESTION PIPELINES', 0.6, 3],
  ['SQL MODELS', 1.6, 3.4],
  ['VIEWS IN METABASE', 3, 5.8],
];

function TheBuild() {
  return (
    <Layer steps={[2]}>
      <Inspectable
        id="sw-plan"
        title="Six weeks of building"
        body="Tools validated; I built the ingestion pipelines and the SQL models; I rebuilt the views in Metabase.|In that order, overlapping, within six weeks."
      >
        <g>
          <Lab x={40} y={110} t="THE BUILD · SIX WEEKS" c="warm" />
          {Array.from({ length: 6 }, (_, w) => (
            <Fragment key={w}>
              <T x={290 + w * 110 + 55} y={138} className="center tx-win-t">{`WEEK ${w + 1}`}</T>
              <path className="tx-grid" d={`M${290 + w * 110} 146V420`} />
            </Fragment>
          ))}
          {plan.map(([t, a, b], i) => (
            <Fragment key={t}>
              <Lab x={40} y={186 + i * 66} t={t} />
              <rect
                className="tx-gantt"
                x={290 + a * 110}
                y={170 + i * 66}
                width={(b - a) * 110}
                height="22"
                rx="3"
              />
            </Fragment>
          ))}
          <path className="tx-promise" d="M950 146V420" />
          <Lab x={944} y={442} t="LICENCE ENDS" c="end" />
        </g>
      </Inspectable>
      <Inspectable
        id="sw-hours"
        title="75 to 80 hours a week"
        body="Weeks of 75 to 80 hours, weekends included.|What the date required."
      >
        <g>
          <Lab x={40} y={500} t="75–80 HOURS A WEEK · WEEKENDS INCLUDED" />
          {days.map((d, i) => (
            <Fragment key={i}>
              <rect className="tx-gantt evening" x={40 + i * 64} y={520} width="56" height="40" rx="3" />
              <T x={68 + i * 64} y={545} className="center tx-win-t dark">
                {d}
              </T>
            </Fragment>
          ))}
        </g>
      </Inspectable>
    </Layer>
  );
}

function Delivered() {
  return (
    <Layer steps={[3]}>
      <Inspectable
        id="sw-ended"
        title="Tableau, licence ended"
        body="The licence ended on the date.|Nothing the board relied on depended on it any more."
      >
        <g>
          <Win x={40} y={96} w={250} h={170} title="TABLEAU · LICENCE ENDED">
            {Array.from({ length: 40 }, (_, i) => (
              <rect
                key={i}
                className="tx-tile-dim off"
                x={56 + (i % 8) * 27}
                y={132 + Math.floor(i / 8) * 25}
                width="22"
                height="18"
                rx="2"
              />
            ))}
          </Win>
        </g>
      </Inspectable>
      <Arrow from={[298, 180]} to={[352, 180]} />
      <Inspectable
        id="sw-live"
        title="Live before the licence ended"
        body="The critical views ran on the new stack before the licence ended.|The date held: the board kept its views on day one."
      >
        <g>
          <Win x={358} y={96} w={360} h={250} title="METABASE · BOARD AND FINANCE">
            <Bars x={378} y={136} w={150} h={160} vals={[0.5, 0.75, 0.6, 0.9]} />
            <Spark x={548} y={140} w={150} h={150} vals={[0.3, 0.45, 0.4, 0.7, 0.85]} c="on" />
          </Win>
          {['Board-level monitoring', 'Finance'].map((t, i) => (
            <Fragment key={t}>
              <Check x={770} y={140 + i * 40} />
              <Sub x={790} y={145 + i * 40} t={t} />
            </Fragment>
          ))}
          <Lab x={760} y={250} t="DAY ONE · THE DATE HELD" c="warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="sw-access"
        title="Then access for every team"
        body="Then access for every team.|The start of the move from 2 to 25 active analysis producers."
      >
        <g>
          <Lab x={40} y={420} t="THEN, ACCESS FOR EVERY TEAM" />
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i} className="tx-lit-seq" style={vars({ '--i': i })}>
              <User x={60 + i * 44} y={480} s={0.8} />
            </g>
          ))}
        </g>
      </Inspectable>
      <CaseChip
        x={40}
        y={540}
        w={420}
        to="food-data"
        kicker="FOODCHÉRI · THE FULL STORY"
        sub="From 2 to 25 active analysis producers"
      />
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
