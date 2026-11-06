// ISS · Tour de France: where the race meets the railway, five years of stages, and one crossing played out.
import { Fragment } from 'react';
import { at, cities, connections, franceOutline, project, RfnLines, Squash } from '~/drawings/france';
import { Inspectable } from '~/drawings/Inspectable';
import { Arrow, Header, Lab, OpsDefs, Sub, T, vars, Win, type Pt, seqN } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Console, CrossingSign, crossings, Line, Peloton, sample, smooth } from '~/drawings/ops';

// ---------- Step 1: one illustrative stage meets three rail lines in two regulation areas ----------
const road: Pt[] = [
  [40, 520],
  [190, 360],
  [330, 320],
  [470, 460],
  [610, 470],
  [760, 270],
  [960, 230],
];
const roadPath = smooth(road);
const roadPoly = sample(road);
const rails: [Pt, Pt][] = [
  [
    [150, 82],
    [330, 640],
  ],
  [
    [560, 82],
    [490, 640],
  ],
  [
    [960, 560],
    [690, 82],
  ],
];
const hits = rails.flatMap(([a, b]) => crossings(roadPoly, a, b));
// Where the race is along its route (0–1) when it reaches a point: the peloton moves at constant speed.
const cum = roadPoly.reduce<number[]>(
  (acc, p, i) =>
    acc.concat(i ? acc[i - 1] + Math.hypot(p[0] - roadPoly[i - 1][0], p[1] - roadPoly[i - 1][1]) : 0),
  [],
);
function raceAt([x, y]: Pt) {
  let best = 0;
  roadPoly.forEach((p, i) => {
    if (Math.hypot(p[0] - x, p[1] - y) < Math.hypot(roadPoly[best][0] - x, roadPoly[best][1] - y)) best = i;
  });
  return cum[best] / cum[cum.length - 1];
}
const LAP = 26;

/** A train that runs to a hold point short of its crossing, waits while the riders pass, then continues. */
function HeldTrain({ a, b }: { a: Pt; b: Pt }) {
  const [h] = crossings(roadPoly, a, b);
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const fc = Math.hypot(h[0] - a[0], h[1] - a[1]) / len;
  const fh = Math.max(0.05, fc - 46 / len);
  const tr = raceAt(h);
  const arrive = Math.max(0.04, tr - 0.14);
  const leave = Math.min(0.96, tr + 0.1);
  return (
    <g className="train-marker on-track">
      <rect className="tm-car" x="-27" y="-3.5" width="11" height="7" rx="1.5" />
      <rect className="tm-car" x="-14" y="-3.5" width="11" height="7" rx="1.5" />
      <rect className="tm-loco" x="-1" y="-4" width="12" height="8" rx="2" />
      <animateMotion
        dur={`${LAP}s`}
        repeatCount="indefinite"
        rotate="auto"
        calcMode="linear"
        keyPoints={`0;${fh.toFixed(3)};${fh.toFixed(3)};1`}
        keyTimes={`0;${arrive.toFixed(3)};${leave.toFixed(3)};1`}
        path={`M${a.join(' ')}L${b.join(' ')}`}
      />
    </g>
  );
}

function MeetingPoint() {
  return (
    <Layer steps={[0]}>
      <Inspectable
        id="tr-areas"
        title="Two regulation areas"
        body="Each regional regulation area runs the trains on its own lines.|A stage often crosses more than one."
      >
        <g className="seq4" {...seqN(2)}>
          <rect className="area area-a" x="40" y="82" width="470" height="558" />
          <rect className="area area-b" x="510" y="82" width="450" height="558" />
          <Line d="M510 82V640" c="area-edge" />
          <Lab x={56} y={108} t="REGULATION AREA A" />
          <Lab x={944} y={108} t="REGULATION AREA B" c="end" />
        </g>
      </Inspectable>
      <Inspectable
        id="tr-rails"
        title="Rail lines in service"
        body="Trains keep running on the day of the stage.|Each line belongs to the area it crosses."
      >
        <g className="seq4" {...seqN(1)}>
          {rails.map(([a, b], i) => (
            <Fragment key={i}>
              <Line d={`M${a.join(' ')}L${b.join(' ')}`} c="track-bed" />
              <Line d={`M${a.join(' ')}L${b.join(' ')}`} c="track-ties" />
              <HeldTrain a={a} b={b} />
            </Fragment>
          ))}
          <Lab x={600} y={600} t="RAIL LINES IN SERVICE" />
        </g>
      </Inspectable>
      <Inspectable
        id="tr-route"
        title="The stage route"
        body="Set by the race organiser, new for every stage.|It crosses active rail lines at level crossings."
      >
        <g className="seq4" {...seqN(0)}>
          <Line d={roadPath} c="race-road" />
          <Line d={roadPath} c="race-line" />
          <g className="peloton-move">
            <Peloton n={5} />
            <animateMotion dur={`${LAP}s`} repeatCount="indefinite" rotate="0" path={roadPath} />
          </g>
          <Lab x={56} y={600} t="THE STAGE ROUTE" c="warm" />
          <Sub x={56} y={622} t="Set by the race organiser, new every stage" />
        </g>
      </Inspectable>
      <g className="seq4" {...seqN(3)}>
        {hits.map(([x, y], i) => (
          <Inspectable
            key={i}
            id={`lc-${i}`}
            title="Level crossing"
            body="Where the stage route crosses an active line: the race and the trains need the same point at different moments.|The area that owns the line holds its trains until the race has passed."
          >
            <g className="lc" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <circle className="lc-ring" r="17" />
              <circle className="lc-dot" r="5" />
            </g>
          </Inspectable>
        ))}
      </g>
    </Layer>
  );
}

// ---------- Step 2: five years of changing stages, then the loop repeated for every stage ----------
const years: [string, string][][] = [
  [
    ['Rennes', 'Nantes'],
    ['Toulouse', 'Marseille'],
    ['Dijon', 'Lyon'],
  ],
  [
    ['Lille', 'Rouen'],
    ['Bordeaux', 'Toulouse'],
    ['Strasbourg', 'Mulhouse'],
  ],
  [
    ['Nantes', 'Bordeaux'],
    ['Lyon', 'Marseille'],
    ['Metz', 'Strasbourg'],
  ],
  [
    ['Rouen', 'Rennes'],
    ['Bordeaux', 'Lyon'],
    ['Mulhouse', 'Dijon'],
  ],
  [
    ['Paris', 'Metz'],
    ['Marseille', 'Lyon'],
    ['Toulouse', 'Bordeaux'],
  ],
];
const railSegs: [Pt, Pt][] = connections.flatMap((c) =>
  c.slice(1).map((n, i): [Pt, Pt] => [project(cities[c[i]]), project(cities[n])]),
);
const stage = ([a, b]: [string, string], k: number): Pt[] => {
  const p = at(a);
  const q = at(b);
  return [p, [(p[0] + q[0]) / 2 + (k % 2 ? 34 : -34), (p[1] + q[1]) / 2 + (k % 2 ? -26 : 26)], q];
};
const S = 0.27;

function YearPanel({ segs, i }: { segs: [string, string][]; i: number }) {
  const pts = segs.map(stage);
  const dots = pts.flatMap((pp) => {
    const poly = sample(pp);
    return railSegs.flatMap(([a, b]) => crossings(poly, a, b));
  });
  return (
    <g className="year-panel" style={vars({ '--i': i })} transform={`translate(${52 + i * 182} 104)`}>
      <rect className="year-frame" width="168" height="182" rx="3" />
      <T x={12} y={22} className="mini-label">{`YEAR ${i + 1}`}</T>
      <g transform={`translate(${(84 - 365 * S).toFixed(1)} ${(36 - 80 * S).toFixed(1)}) scale(${S})`}>
        <Squash>
          <path className="mini-france" d={franceOutline} />
        </Squash>
        <RfnLines c="mini" />
        {railSegs.map(([a, b], j) => (
          <Line key={`r${j}`} d={`M${a.join(' ')}L${b.join(' ')}`} c="mini-rail" />
        ))}
        {pts.map((pp, j) => (
          <Line key={`s${j}`} d={smooth(pp)} c="mini-stage" />
        ))}
        {dots.map(([dx, dy], j) => (
          <circle key={`d${j}`} className="mini-lc" cx={dx.toFixed(1)} cy={dy.toFixed(1)} r="11" />
        ))}
      </g>
    </g>
  );
}

const crossingRows: [string, string, string][] = [
  ['Stage 1 · crossing 1', 'Line A', '14:20'],
  ['Stage 1 · crossing 2', 'Line B', '14:55'],
  ['Stage 1 · crossing 3', 'Line C', '15:40'],
];

function FiveYears() {
  return (
    <Layer steps={[1]}>
      {years.map((segs, i) => (
        <YearPanel key={i} segs={segs} i={i} />
      ))}
      <Sub x={52} y={318} t="Each stage brings new places, new crossings and new regional teams." />
      <Inspectable
        id="tr-aso"
        title="ASO · the race organiser"
        body="ASO sets each stage route and the race timing.|Five years working with them."
      >
        <Win x={40} y={350} w={250} h={160} title="ASO · STAGE ROUTE + TIMING">
          <Line d="M60 470C100 400 150 460 190 410S250 420 270 390" c="race-line" />
          {[
            [100, 430, '13:50'],
            [190, 410, '14:30'],
          ].map(([x, y, t]) => (
            <Fragment key={t as string}>
              <circle className="tx-stop" cx={x} cy={y} r="5" />
              <T x={(x as number) - 10} y={(y as number) + 22} className="tx-win-t">
                {t as string}
              </T>
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Arrow from={[296, 430]} to={[346, 430]} />
      <Inspectable
        id="tr-identified"
        title="Crossings identified, stage by stage"
        body="For each stage, I identified every level crossing on the route and when the race would reach it.|The input each region needed."
      >
        <Win x={352} y={350} w={300} h={160} title="CROSSINGS TO PROTECT">
          {crossingRows.map(([c, l, t], i) => (
            <Fragment key={c}>
              <rect className="tx-table-row" x="366" y={384 + i * 38} width="272" height="30" rx="2" />
              <T x={376} y={404 + i * 38} className="tx-win-t">
                {c}
              </T>
              <T x={540} y={404 + i * 38} className="tx-win-t">
                {l}
              </T>
              <T x={626} y={404 + i * 38} className="end tx-win-t late">
                {t}
              </T>
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Arrow from={[658, 430]} to={[708, 430]} />
      <Inspectable
        id="tr-regions"
        title="Every regulation team crossed"
        body="I orchestrated the regulation teams of every area the route crossed.|Each one adjusted the trains on its lines."
      >
        <g>
          {[0, 1, 2].map((i) => (
            <Console key={i} x={750 + i * 80} y={450} s={0.8} />
          ))}
          <Lab x={830} y={500} t="ONE TEAM PER AREA" c="center" />
        </g>
      </Inspectable>
      <path className="tx-link" d="M830 520C830 600 165 600 165 520" />
      <path className="tx-head" transform="translate(165 520) rotate(-90)" d="M2 0L-9-6V6Z" />
      <Lab x={420} y={628} t="REPEATED FOR EVERY STAGE, EVERY YEAR" c="center warm" />
      <Inspectable
        id="tr-years"
        title="Five years"
        body="Five Tour de France editions, with ASO.|Every stage, every year."
      >
        <g>
          <T x={760} y={660} className="tx-big">
            5 YEARS
          </T>
          <Sub x={760} y={684} t="Of Tour de France editions" />
        </g>
      </Inspectable>
    </Layer>
  );
}

// ---------- Step 3: one crossing, played out on a 12 s loop; every moving part shares the SVG clock ----------
const CYCLE = 12;
const kt = (values: string, keyTimes: string) => ({
  values,
  keyTimes,
  dur: `${CYCLE}s`,
  repeatCount: 'indefinite',
});
const phase = (i: number, on = '1', off = '0') => {
  const a = i / 4;
  const b = (i + 1) / 4;
  return kt(
    [off, off, on, on, off, off].join(';'),
    [0, Math.max(0, a - 0.001), a, b - 0.001, b, 1].map((v) => v.toFixed(3)).join(';'),
  );
};
const phases: [string, string][] = [
  ['1 · THE PLAN', 'Known in advance'],
  ['2 · TRAIN HELD', 'At the signal'],
  ['3 · RACE PASSES', 'Undisturbed'],
  ['4 · TRAIN RELEASED', 'Signal clears'],
];
const ROAD_Y = 400;
const RAIL_X = 560;
function AtTheCrossing() {
  return (
    <Layer steps={[2]}>
      <rect className="area area-a" x="40" y="140" width="920" height="420" rx="3" />
      <Line d={`M40 ${ROAD_Y}H960`} c="race-road" />
      <Line d={`M40 ${ROAD_Y}H960`} c="race-line" />
      <Line d={`M${RAIL_X} 140V560`} c="track-bed" />
      <Line d={`M${RAIL_X} 140V560`} c="track-ties" />
      <Inspectable
        id="lc-x"
        title="The level crossing"
        body="Where the stage route crosses an active line. The race and the train need this point at different moments."
      >
        <g>
          <CrossingSign x={RAIL_X - 34} y={ROAD_Y - 24} s={1.1} />
          <circle className="lc-ring" cx={RAIL_X} cy={ROAD_Y} r="20" />
        </g>
      </Inspectable>
      <Inspectable
        id="signal"
        title="The signal"
        body="Regional regulation holds the train here, short of the crossing, while the race passes."
      >
        <g transform={`translate(${RAIL_X + 34} 290)`}>
          <path className="sig-mast" d="M0 0V-46" />
          <rect className="sig-head" x="-9" y="-70" width="18" height="30" rx="4" />
          <circle className="sig-lamp" cy="-55" r="6">
            <animate attributeName="fill" {...kt('#f07a68;#f07a68;#7fe0b0;#7fe0b0', '0;.749;.75;1')} />
          </circle>
        </g>
      </Inspectable>
      <Inspectable
        id="train-x"
        title="The train"
        body="Retimed by regional regulation: it waits for the race, then continues."
      >
        <g className="train-v">
          <g transform="rotate(90)">
            <rect className="tm-car" x="-40" y="-6" width="18" height="12" rx="2" />
            <rect className="tm-car" x="-20" y="-6" width="18" height="12" rx="2" />
            <rect className="tm-loco" x="0" y="-7" width="20" height="14" rx="3" />
          </g>
          <animateMotion
            path={`M${RAIL_X} 120V600`}
            calcMode="linear"
            keyPoints="0;.36;.36;1"
            keyTimes="0;.25;.78;1"
            dur={`${CYCLE}s`}
            repeatCount="indefinite"
          />
        </g>
      </Inspectable>
      <Inspectable
        id="race-x"
        title="The race"
        body="The riders keep the road; the crossing is theirs for the moment they pass."
      >
        <g className="peloton-move">
          <Peloton n={6} />
          <animateMotion
            path={`M-60 ${ROAD_Y - 6}H1080`}
            calcMode="linear"
            keyPoints="0;0;1;1"
            keyTimes="0;.3;.78;1"
            dur={`${CYCLE}s`}
            repeatCount="indefinite"
          />
        </g>
      </Inspectable>
      <Lab x={944} y={548} t="ONE CROSSING · ILLUSTRATIVE TIMING" c="end" />
      <Inspectable
        id="tr-live"
        title="The plan reached live traffic"
        body="Each year, I asked each region concerned to hold or retime its trains.|The plan reached the teams running live traffic, at the right crossing, at the right moment."
      >
        <g>
          <Console x={760} y={250} s={1} />
          <Lab x={800} y={210} t="REGIONAL REGULATION" />
          <Sub x={800} y={232} t="Running live traffic" />
          <path className="tx-beam" d={`M740 260C700 270 640 280 ${RAIL_X + 40} 280`} />
        </g>
      </Inspectable>
      {phases.map(([t, sub], i) => (
        <Inspectable
          key={t}
          id={`tr-phase-${i}`}
          title={t.slice(4).charAt(0) + t.slice(5).toLowerCase()}
          body={`${sub}.|Phase ${i + 1} of the crossing.`}
        >
          <g>
            <circle className="tx-stage" cx={60 + i * 228} cy={622} r="12" />
            <circle className="tx-stage on" cx={60 + i * 228} cy={622} r="12" opacity="0">
              <animate attributeName="opacity" {...phase(i)} />
            </circle>
            <Lab x={80 + i * 228} y={618} t={t} />
            <Sub x={80 + i * 228} y={640} t={sub} />
          </g>
        </Inspectable>
      ))}
    </Layer>
  );
}

export default function CrossingScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="TOUR DE FRANCE · LEVEL CROSSINGS" />
      <MeetingPoint />
      <FiveYears />
      <AtTheCrossing />
    </>
  );
}
