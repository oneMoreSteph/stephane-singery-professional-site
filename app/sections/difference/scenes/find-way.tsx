// Sentinel · Find a way: each step shows one constraint and the way through it. A dot travels the way, on a loop.
import { Inspectable } from '~/drawings/Inspectable';
import { CaseChip, Header, OpsDefs, seqN, T } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Line } from '~/drawings/ops';

function Traveller({ d, dur = 5 }: { d: string; dur?: number }) {
  return (
    <circle className="fw-dot" r="8">
      <animateMotion path={d} dur={`${dur}s`} repeatCount="indefinite" />
    </circle>
  );
}
function Node(p: { id: string; x: number; y: number; t: string; sub: string; body: string; c?: string }) {
  return (
    <Inspectable id={p.id} title={p.t} body={p.body}>
      <g transform={`translate(${p.x} ${p.y})`}>
        <rect className={`fw-node ${p.c ?? ''}`} x="-95" y="-30" width="190" height="60" rx="4" />
        <T x={0} y={-4} className="center mini-label">
          {p.t}
        </T>
        <T x={0} y={16} className="center label tiny">
          {p.sub}
        </T>
      </g>
    </Inspectable>
  );
}
function Wall({
  id,
  x,
  y,
  h,
  t,
  body,
}: {
  id: string;
  x: number;
  y: number;
  h: number;
  t: string;
  body: string;
}) {
  return (
    <Inspectable id={id} title={t} body={body}>
      <g>
        <rect className="fw-wall" x={x - 12} y={y} width="24" height={h} rx="3" />
        <T x={x} y={y - 12} className="center mini-label warm">
          {t}
        </T>
      </g>
    </Inspectable>
  );
}

function Vfli() {
  return (
    <Layer steps={[0]}>
      <Node
        id="fw-need0"
        x={140}
        y={430}
        t="A TRAIN TO RUN"
        sub="Tonight, as promised"
        body="A customer’s freight train, due at a given place and hour."
      />
      <Wall
        id="fw-wall0"
        x={500}
        y={330}
        h={200}
        t="NO LOCOMOTIVE · NO DRIVER"
        body="The resource the train needed was missing, at the last minute."
      />
      <Node
        id="fw-way0"
        x={500}
        y={260}
        t="ANOTHER COMPANY"
        sub="Convinced to make one available"
        body="I convinced another company to make a shunting locomotive or a driver available."
        c="is-way"
      />
      <Node
        id="fw-done0"
        x={860}
        y={430}
        t="THE TRAIN RUNS"
        sub="Agreement obtained"
        body="With the last-minute circulation agreement obtained, the train ran."
        c="is-done"
      />
      <Line d="M235 430H488" c="fw-path blocked" />
      <Line d="M235 430C330 430 360 260 405 260M595 260C640 260 670 430 765 430" c="fw-path" />
      <Traveller d="M235 430C330 430 360 260 500 260C640 260 670 430 765 430" />
    </Layer>
  );
}

const years = ['Y−3', 'Y−2', 'Y−1', 'D'];
const walls1: [number, number, string][] = [
  [300, 380, 'WORKS'],
  [560, 250, 'COMPETING DEMAND'],
  [720, 420, 'WORKS'],
];
const rffPath =
  'M235 300C270 300 270 540 330 540S420 300 470 300 520 540 600 540 680 330 760 330 820 560 765 560';

function Rff() {
  return (
    <Layer steps={[1]}>
      <Line d="M120 640H900" c="fw-axis" />
      {years.map((y, i) => (
        <T key={y} x={120 + i * 260} y={664} className="center mini-label">
          {y}
        </T>
      ))}
      <Node
        id="fw-need1"
        x={140}
        y={300}
        t="A CAPACITY REQUEST"
        sub="For a freight customer"
        body="The train paths a customer needs, requested two or three years ahead."
      />
      {walls1.map(([x, y, t], i) => (
        <Wall
          key={i}
          id={`fw-wall1-${i}`}
          x={x}
          y={y}
          h={120}
          t={t}
          body={
            i === 1
              ? 'Other operators want the same capacity.'
              : 'Engineering works take capacity away for a period.'
          }
        />
      ))}
      <Node
        id="fw-done1"
        x={860}
        y={560}
        t="THE TRAIN RUNS"
        sub="On the day"
        body="I kept the request alive until the train ran."
        c="is-done"
      />
      <Line d={rffPath} c="fw-path" />
      <Traveller d={rffPath} dur={7} />
    </Layer>
  );
}

function Tour() {
  return (
    <Layer steps={[2]}>
      <Line d="M80 420H920" c="race-road" />
      <Line d="M80 420H920" c="race-line" />
      <Line d="M500 230V640" c="track-bed" />
      <Line d="M500 230V640" c="track-ties" />
      <Wall
        id="fw-wall2"
        x={500}
        y={380}
        h={80}
        t="THE RACE AT THE CROSSING"
        body="The race and the train need the same point."
      />
      <Node
        id="fw-need2"
        x={220}
        y={300}
        t="STAGE ROUTE + TIMING"
        sub="From the race organiser"
        body="The race organiser’s schedule for each stage."
      />
      <Node
        id="fw-way2"
        x={780}
        y={300}
        t="EACH REGION CONCERNED"
        sub="Train held, then released"
        body="I turned the stage timing into crossing-by-crossing needs for each region."
        c="is-way"
      />
      <Node
        id="fw-done2"
        x={780}
        y={560}
        t="FIVE YEARS"
        sub="Every stage"
        body="Five years of Tour de France stages coordinated this way."
        c="is-done"
      />
      <g className="fw-train">
        <rect x="-8" y="-20" width="16" height="40" rx="3" />
        <animateMotion
          path="M500 240V640"
          calcMode="linear"
          keyPoints="0;.3;.3;1"
          keyTimes="0;.3;.7;1"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
      <g className="fw-race">
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={-i * 14} r="5" />
        ))}
        <animateMotion
          path="M80 420H920"
          calcMode="linear"
          keyPoints="0;0;1"
          keyTimes="0;.3;.7"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
    </Layer>
  );
}

function Food() {
  return (
    <Layer steps={[3]}>
      <Inspectable
        id="fw-need3"
        title="600+ dashboards"
        body="Everything on Tableau, with the licence ending in six weeks."
      >
        <g>
          {Array.from({ length: 120 }, (_, i) => (
            <rect
              key={i}
              className="fw-tile"
              x={80 + (i % 12) * 20}
              y={250 + Math.floor(i / 12) * 20}
              width="14"
              height="14"
              rx="2"
            />
          ))}
          <T x={80} y={236} className="mini-label">
            600+ DASHBOARDS
          </T>
        </g>
      </Inspectable>
      <Inspectable
        id="fw-wall3"
        title="Six weeks"
        body="The licence ended in six weeks: everything could not move in time."
      >
        <g transform="translate(420 260)">
          <path className="fw-funnel" d="M0 0H160L100 120V200H60V120Z" />
          <T x={80} y={-12} className="center mini-label warm">
            SIX WEEKS
          </T>
        </g>
      </Inspectable>
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <rect key={k} className={`fw-bit ${k % 3 === 0 ? 'is-kept' : ''}`} width="12" height="12" rx="2">
          <animateMotion
            path={k % 3 === 0 ? 'M330 300L500 300L500 470L700 470' : 'M330 300L470 300L470 320'}
            dur="3s"
            begin={`-${(k * 0.5).toFixed(1)}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      <Node
        id="fw-done3"
        x={800}
        y={470}
        t="THE CRITICAL VIEWS"
        sub="Live on day one"
        body="The board and finance views ran in Metabase before the licence ended."
        c="is-done"
      />
      <CaseChip
        x={600}
        y={560}
        w={320}
        to="food-deadline"
        kicker="HIGH-STAKES · SIX WEEKS"
        sub="The full case"
      />
    </Layer>
  );
}

export default function FindWayScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="FIND A WAY · WHATEVER THE CONSTRAINT" />
      {['THE NEED', 'THE CONSTRAINT', 'THE WAY', 'DELIVERED'].map((t, i) => (
        <g key={t} className="seq4" {...seqN(i)} transform={`translate(${40 + i * 232} 150)`}>
          <rect className="fw-chip" width="216" height="36" rx="3" />
          <T x={108} y={23} className="center mini-label">
            {t}
          </T>
        </g>
      ))}
      <Vfli />
      <Rff />
      <Tour />
      <Food />
    </>
  );
}
