// ISS · FoodChéri, six weeks: one wall of 600+ Tableau dashboards, what had to exist on day one, the build, the result.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { Header, OpsDefs, T, vars } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Crew, FlowArrow } from '~/drawings/ops';
import { SvgButton } from '~/drawings/spokenName';

const COLS = 30;
const ROWS = 20;
const X0 = 60;
const Y0 = 160;
const CELL = 13;
const used = (i: number) => (i * 53 + 17) % 100 < 10;
const usedList = Array.from({ length: COLS * ROWS }, (_, i) => i).filter(used);
const critical = (i: number) => usedList.indexOf(i) % 10 === 4;

function Wall() {
  return (
    <g className="dash-wall">
      {Array.from({ length: COLS * ROWS }, (_, i) => (
        <rect
          key={i}
          className={`dw ${used(i) ? 'dw-used' : ''} ${critical(i) ? 'dw-crit' : ''}`}
          style={vars({ '--i': i % 37 })}
          x={X0 + (i % COLS) * CELL}
          y={Y0 + Math.floor(i / COLS) * CELL}
          width="10"
          height="10"
          rx="1.5"
        />
      ))}
    </g>
  );
}
/** The same wall, read differently at each step. */
function WallHint({ title, body }: { title: string; body: string }) {
  return (
    <Inspectable id="wall" title={title} body={body}>
      <rect x={X0 - 6} y={Y0 - 6} width={COLS * CELL + 9} height={ROWS * CELL + 9} className="hit-box" />
    </Inspectable>
  );
}

function Clock() {
  return (
    <Layer steps={[0]}>
      <WallHint
        title="600+ Tableau dashboards"
        body="Everything the company had built on Tableau, plus scattered personal reports. All of it would stop with the licence."
      />
      <T x={X0} y={Y0 - 18} className="mini-label">
        600+ TABLEAU DASHBOARDS
      </T>
      <Inspectable
        id="countdown"
        title="Six weeks"
        body="The Tableau licence ended six weeks later. The reporting the company relied on had to run elsewhere by then."
      >
        <g transform="translate(730 300)">
          <circle className="cd-track" r="112" />
          <circle className="cd-ring" r="112" pathLength={1} transform="rotate(-90)">
            <animate attributeName="stroke-dashoffset" values="0;1" dur="10s" repeatCount="indefinite" />
          </circle>
          <T x={0} y={-4} className="center cd-value">
            6 WEEKS
          </T>
          <T x={0} y={24} className="center mini-label warm">
            TABLEAU LICENCE ENDS
          </T>
        </g>
      </Inspectable>
      <Inspectable
        id="depend"
        title="Who depended on it"
        body="The board’s monitoring and finance ran on these dashboards."
      >
        <g transform="translate(60 470)">
          <Crew x={16} y={22} s={0.9} />
          <Crew x={52} y={22} s={0.9} />
          <Crew x={88} y={22} s={0.9} />
          <T x={120} y={18} className="mini-label">
            BOARD · FINANCE · TEAMS
          </T>
          <T x={120} y={40} className="label small">
            All reporting ran on Tableau
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

const ranks: [string, string, string, string][] = [
  ['1', 'Board-level monitoring', 'crit', 'First: the board steers the company with it.'],
  ['2', 'Finance', 'crit', 'Finance at the top of the ranking: it cannot stop.'],
  ['3', 'Other views in regular use', 'used', 'Next, once the critical views run.'],
  ['…', 'Everything else: the full migration', 'rest', 'Moved later, with the full migration.'],
];

function Triage() {
  return (
    <Layer steps={[1]}>
      <WallHint
        title="About 10% in regular use"
        body="My audit had shown that about one dashboard in ten was used regularly. Those were the ones that mattered."
      />
      <T x={X0} y={Y0 - 18} className="mini-label warm">
        ABOUT 10% USED REGULARLY
      </T>
      <g transform="translate(560 170)">
        <T x={0} y={0} className="mini-label warm">
          WHAT MUST EXIST ON DAY ONE
        </T>
        {ranks.map(([n, t, c, body], i) => (
          <Inspectable key={t} id={`rank-${i}`} title={t} body={body}>
            <g transform={`translate(0 ${24 + i * 70})`}>
              <rect className={`rank rank--${c}`} width="380" height="56" rx="3" />
              <T x={18} y={35} className="rank-n">
                {n}
              </T>
              <T x={54} y={35} className="label small">
                {t}
              </T>
            </g>
          </Inspectable>
        ))}
      </g>
    </Layer>
  );
}

const stages: [string, string, string][] = [
  ['RAW DATA', 'Source databases', 'The data behind the critical views, at the source.'],
  ['INGESTION', 'Ready-made tool', 'Raw data brought in with a ready-made tool selected after an audit.'],
  [
    'SQL MODELS',
    'Curated tables',
    'The SQL models I wrote to turn raw data into the tables behind each view.',
  ],
  ['METABASE', 'The critical views', 'The board and finance views, rebuilt in Metabase.'],
];

function Build() {
  return (
    <Layer steps={[2]}>
      <Inspectable
        id="weeks"
        title="Six weeks of building"
        body="Week by week until the critical views were live. Sequence illustrative."
      >
        <g transform="translate(60 160)">
          {Array.from({ length: 6 }, (_, i) => (
            <Fragment key={i}>
              <rect
                className="wk-fill"
                style={vars({ '--i': i })}
                x={i * 148}
                y="0"
                width="138"
                height="40"
                rx="3"
              />
              <T x={i * 148 + 69} y={25} className="center mini-label">{`WEEK ${i + 1}`}</T>
            </Fragment>
          ))}
        </g>
      </Inspectable>
      {stages.map(([t, sub, body], i) => (
        <Inspectable key={t} id={`stage-${i}`} title={t} body={body}>
          <g transform={`translate(${60 + i * 232} 300)`}>
            <rect className={`stage-box ${i === 3 ? 'is-lit' : ''}`} width="196" height="84" rx="4" />
            <T x={16} y={34} className="mini-label">
              {t}
            </T>
            <T x={16} y={60} className="label small">
              {sub}
            </T>
          </g>
        </Inspectable>
      ))}
      {[0, 1, 2].map((i) => (
        <FlowArrow key={i} d={`M${258 + i * 232} 342H${290 + i * 232}`} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <circle key={k} className="packet" r="5">
          <animateMotion path="M80 342H900" dur="4s" begin={`${-k}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <Inspectable
        id="hours"
        title="Holding the date"
        body="Weeks of 75 to 80 hours, weekends included, until the critical views were live."
      >
        <g transform="translate(60 450)">
          <T x={0} y={0} className="mini-label warm">
            75–80 HOURS A WEEK · WEEKENDS INCLUDED
          </T>
          <rect className="hours-track" y="16" width="880" height="16" rx="2" />
          <rect className="hours-bar" y="16" width="880" height="16" rx="2" />
        </g>
      </Inspectable>
    </Layer>
  );
}

function Delivered() {
  return (
    <Layer steps={[3]}>
      <WallHint
        title="Tableau, switched off"
        body="The licence ended. Nothing critical was lost: the views the company needed already ran on the new stack."
      />
      <T x={X0} y={Y0 - 18} className="mini-label muted-label">
        TABLEAU · LICENCE ENDED
      </T>
      <Inspectable
        id="live"
        title="Live before the licence ended"
        body="The board and finance views ran in Metabase before the Tableau licence ended. The date held."
      >
        <g transform="translate(560 160)">
          <T x={0} y={0} className="mini-label warm">
            LIVE IN METABASE, ON TIME
          </T>
          {['Board-level monitoring', 'Finance'].map((t, i) => (
            <g key={t} transform={`translate(0 ${20 + i * 66})`}>
              <rect className="view-live" width="380" height="54" rx="3" />
              <path className="view-check" d="M18 27l7 7 13-15" />
              <T x={52} y={33} className="label small">
                {t}
              </T>
            </g>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="wider"
        title="Then, access for every team"
        body="Once the critical views were safe, access widened to the teams: the start of the move from 2 to 25 active analysis producers."
      >
        <g transform="translate(560 330)">
          <T x={0} y={0} className="mini-label">
            THEN, ACCESS WIDENED
          </T>
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} className="team-pop" style={vars({ '--i': i })}>
              <Crew x={24 + i * 44} y={34} s={0.8} />
            </g>
          ))}
        </g>
      </Inspectable>
      <SvgButton
        className="case-link"
        transform="translate(560 420)"
        data-open-case="food-data"
        purpose="open the FoodChéri Data experience"
      >
        <rect width="380" height="58" rx="3" />
        <T x={16} y={24} className="mini-label">
          FOODCHÉRI · THE FULL STORY
        </T>
        <T x={16} y={44} className="label small">
          From 2 to 25 active analysis producers
        </T>
        <T x={362} y={36} className="chip-arrow end">
          ↗
        </T>
      </SvgButton>
    </Layer>
  );
}

export default function DeadlineScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="FOODCHÉRI · SIX WEEKS" />
      <Wall />
      <Clock />
      <Triage />
      <Build />
      <Delivered />
    </>
  );
}
