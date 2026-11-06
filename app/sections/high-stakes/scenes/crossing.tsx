// ISS · Tour de France: where the race meets the railway, five years of stages, and one crossing played out.
import { Fragment } from 'react';
import { at, cities, connections, franceOutline, project, RfnLines, Squash } from '~/drawings/france';
import { Inspectable } from '~/drawings/Inspectable';
import { Header, OpsDefs, T, vars, type Pt, seqN } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import {
  Actor,
  CrossingSign,
  crossings,
  FlowArrow,
  Line,
  Peloton,
  ReadoutChip,
  sample,
  smooth,
} from '~/drawings/ops';

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

const captions: [string, string][] = [
  ['THE STAGE ROUTE', 'Set by the race organiser, new every stage'],
  ['RAIL LINES IN SERVICE', 'Trains keep running on the day of the stage'],
  ['TWO REGULATION AREAS', 'Each one runs the trains on its own lines'],
  ['LEVEL CROSSINGS', 'The race and the trains need the same point'],
];

function MeetingPoint() {
  return (
    <Layer steps={[0]}>
      <g className="seq4" {...seqN(2)}>
        <rect className="area area-a" x="40" y="82" width="470" height="558" />
        <rect className="area area-b" x="510" y="82" width="450" height="558" />
        <Line d="M510 82V640" c="area-edge" />
        <T x={56} y={106} className="mini-label area-label">
          REGULATION AREA A
        </T>
        <T x={944} y={106} className="mini-label area-label end">
          REGULATION AREA B
        </T>
      </g>
      <g className="seq4" {...seqN(1)}>
        {rails.map(([a, b], i) => (
          <Fragment key={i}>
            <Line d={`M${a.join(' ')}L${b.join(' ')}`} c="track-bed" />
            <Line d={`M${a.join(' ')}L${b.join(' ')}`} c="track-ties" />
            <HeldTrain a={a} b={b} />
          </Fragment>
        ))}
      </g>
      <g className="seq4" {...seqN(0)}>
        <Line d={roadPath} c="race-road" />
        <Line d={roadPath} c="race-line" />
        <g className="peloton-move">
          <Peloton n={5} />
          <animateMotion dur={`${LAP}s`} repeatCount="indefinite" rotate="0" path={roadPath} />
        </g>
      </g>
      <g className="seq4" {...seqN(3)}>
        {hits.map(([x, y], i) => (
          <Inspectable
            key={i}
            id={`lc-${i}`}
            title="Level crossing"
            body="Where the stage route crosses an active line, the race and the trains need the same point at different moments. The regulation area that owns the line holds its trains until the race has passed."
          >
            <g className="lc" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <circle className="lc-ring" r="17" />
              <circle className="lc-dot" r="5" />
            </g>
          </Inspectable>
        ))}
      </g>
      <g className="seq-caption">
        {captions.map(([t, sub], i) => (
          <g key={t} className="cap4" {...seqN(i)}>
            <rect className="map-panel" x="560" y="560" width="384" height="64" rx="3" />
            <T x={578} y={584} className="mini-label seq-head">{`${i + 1} / 4 · ${t}`}</T>
            <T x={578} y={608} className="label tiny">
              {sub}
            </T>
          </g>
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

function FiveYears() {
  return (
    <Layer steps={[1]}>
      {years.map((segs, i) => (
        <YearPanel key={i} segs={segs} i={i} />
      ))}
      <T x={52} y={322} className="label">
        Each stage brings new places, new crossings and new regional teams.
      </T>
      <g transform="translate(0 0)">
        <Actor
          id="aso"
          x={210}
          y={448}
          title="ASO"
          sub="Race organiser"
          body="ASO sets the stage route and the timing of the race. It is the event organiser, the collaborator in this work."
        />
        <Actor
          id="me-tour"
          x={500}
          y={448}
          title="Rail coordination"
          sub="My role"
          body="One counterpart for the race organiser, many regional teams on the railway: I was the link between them."
          kind="console"
          c="is-me"
        />
        <Actor
          id="regions"
          x={790}
          y={448}
          title="Regional regulation"
          sub="One team per area crossed"
          body="Each regional team adjusts the trains on its lines while the race passes."
          kind="console"
        />
        <FlowArrow d="M262 420H440" />
        <T x={351} y={408} className="center flow-label">
          stage route + timing
        </T>
        <FlowArrow d="M560 420H730" />
        <T x={645} y={408} className="center flow-label">
          crossings to protect
        </T>
        <FlowArrow d="M790 530C790 600 210 600 210 530" c="loop-arrow" />
        <T x={500} y={616} className="center mini-label race-label">
          REPEATED FOR EVERY STAGE, EVERY YEAR
        </T>
      </g>
      <ReadoutChip x={730} y={640} value="5 years" label="OF TOUR DE FRANCE EDITIONS" w={230} />
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
  ['1 · THE PLAN', 'Regional regulation knows when the race reaches this crossing'],
  ['2 · THE TRAIN IS HELD', 'Stopped at the signal, short of the crossing'],
  ['3 · THE RACE PASSES', 'Riders cross undisturbed'],
  ['4 · THE TRAIN IS RELEASED', 'The signal clears; the train continues'],
];
const ROAD_Y = 400;
const RAIL_X = 560;
const chain: [string, string, number, string][] = [
  ['ASO', 'Race organiser', 200, 'The race organiser’s schedule says when the race reaches each crossing.'],
  [
    'Rail coordination',
    'My role',
    500,
    'I turned the stage timing into crossing-by-crossing needs for each region concerned.',
  ],
  [
    'Regional regulation',
    'Live trains',
    800,
    'The regional team holds, then releases, the trains in service.',
  ],
];

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
      <g className="phase-caps">
        {phases.map(([t, sub], i) => (
          <g key={t} opacity="0">
            <animate attributeName="opacity" {...phase(i)} />
            <rect className="map-panel cap-gold" x="56" y="156" width="400" height="62" rx="3" />
            <T x={74} y={180} className="mini-label seq-head">
              {t}
            </T>
            <T x={74} y={204} className="label tiny">
              {sub}
            </T>
          </g>
        ))}
      </g>
      <T x={944} y={548} className="end mini-label muted-label">
        ONE CROSSING · ILLUSTRATIVE TIMING
      </T>
      {chain.map(([t, sub, x, body], i) => (
        <g key={t} className="chain-actor">
          <Actor
            id={`chain-${i}`}
            x={x}
            y={630}
            title={t}
            sub={sub}
            body={body}
            kind={i ? 'console' : 'crew'}
            c={i === 1 ? 'is-me' : ''}
          />
          <circle className="chain-glow" cx={x} cy="622" r="44" opacity="0">
            <animate
              attributeName="opacity"
              {...(i < 2 ? phase(0) : kt('0;0;1;1;0;0;1;1', '0;.249;.25;.499;.5;.749;.75;1'))}
            />
          </circle>
        </g>
      ))}
      <FlowArrow d="M252 610H440" />
      <FlowArrow d="M560 610H740" />
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
