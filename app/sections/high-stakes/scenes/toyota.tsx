// ISS · Toyota Europe, summer 2013: weeks of disruption, one afternoon of coordination, the meeting, and after.
import { Fragment } from 'react';
import { CountryMap, project } from '~/drawings/france';
import { Inspectable } from '~/drawings/Inspectable';
import { pad } from '~/content';
import { Header, OpsDefs, T, vars, type Pt } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Actor, Console, FlowArrow, Line, Pill } from '~/drawings/ops';

const phases = ['WEEKS OF DISRUPTION', 'ONE AFTERNOON', 'NEXT MORNING', 'AFTERWARDS'];
// The line the vehicle trains ran on: from the Dutch border, through Belgium and France, to the south-west. Schematic.
const stops: [string, Pt][] = [
  ['Roosendaal', [4.46, 51.53]],
  ['Antwerp', [4.4, 51.22]],
  ['Brussels', [4.35, 50.85]],
  ['Lille', [3.06, 50.63]],
  ['Paris', [2.35, 48.86]],
  ['Orléans', [1.9, 47.9]],
  ['Tours', [0.69, 47.39]],
  ['Poitiers', [0.34, 46.58]],
  ['Bordeaux', [-0.58, 44.84]],
  ['', [-1.05, 43.75]],
  ['', [-1.45, 43.45]],
];
const pts = stops.map(([, ll]) => project(ll));
const routeD = `M${pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join('L')}`;
const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
const total = lens.reduce((a, b) => a + b, 0);
const swFrom = lens.slice(0, 7).reduce((a, b) => a + b, 0) / total;
const sw = project([-0.9, 44.3]);
const labelled = ['Roosendaal', 'Brussels', 'Lille', 'Paris', 'Bordeaux'];

/** The map frame: shifted and clipped to the line's corridor. */
function M({ children }: { children: React.ReactNode }) {
  return (
    <g transform="translate(-70 140)">
      <clipPath id="tyClip">
        <rect x="90" y="10" width="500" height="500" />
      </clipPath>
      <g clipPath="url(#tyClip)">{children}</g>
    </g>
  );
}

/** A vehicle train along the line; a stuck one stops in the south-west. */
function Train({ c, stuck, begin }: { c: string; stuck: boolean; begin?: number }) {
  return (
    <g className={`train-marker ${c}`}>
      <rect className="tm-car" x="-27" y="-3.5" width="11" height="7" rx="1.5" />
      <rect className="tm-car" x="-14" y="-3.5" width="11" height="7" rx="1.5" />
      <rect className="tm-loco" x="-1" y="-4" width="12" height="8" rx="2" />
      <animateMotion
        dur="12s"
        begin={begin ? `-${begin}s` : undefined}
        repeatCount="indefinite"
        rotate="auto"
        calcMode="linear"
        {...(stuck && {
          keyPoints: `0;${(swFrom + 0.03).toFixed(3)};${(swFrom + 0.08).toFixed(3)};1`,
          keyTimes: '0;.45;.9;1',
        })}
        path={routeD}
      />
    </g>
  );
}

function MapBase() {
  return (
    <M>
      <CountryMap />
      <Line d={routeD} c="route-glow" />
      <Line d={routeD} c="active-route" />
      {stops.map(([n], i) =>
        n ? (
          <Fragment key={n}>
            <circle
              className="city-dot"
              cx={pts[i][0].toFixed(1)}
              cy={pts[i][1].toFixed(1)}
              r={n === 'Roosendaal' ? 5 : 3.5}
            />
            {labelled.includes(n) &&
              (n === 'Roosendaal' ? (
                <T x={pts[i][0] - 9} y={pts[i][1] + 4} className="city-label small-city end">
                  Roosendaal · NL border
                </T>
              ) : (
                <T x={pts[i][0] + 9} y={pts[i][1] + 4} className="city-label small-city">
                  {n}
                </T>
              ))}
          </Fragment>
        ) : null,
      )}
    </M>
  );
}

const runs = (bad: number[], y = 0) =>
  Array.from({ length: 20 }, (_, i) => (
    <rect
      key={`${y}-${i}`}
      className={`run ${bad.includes(i) ? 'run-bad' : ''}`}
      x={i * 20}
      y={y}
      width="15"
      height="15"
      rx="2"
    />
  ));

function Stakes() {
  return (
    <Layer steps={[0]}>
      <M>
        <Inspectable
          id="sw"
          title="Strong disruption in the south-west"
          body="The trains lost time in the south-west of the network, week after week."
        >
          <g transform={`translate(${sw[0].toFixed(1)} ${sw[1].toFixed(1)})`}>
            <circle className="sw-zone" r="46" />
            <circle className="sw-pulse" r="46" />
          </g>
        </Inspectable>
        <Inspectable
          id="line"
          title="The line of the vehicle trains"
          body="From the Dutch border, through Belgium and France, to the south-west. Schematic route."
        >
          <path d={routeD} className="hit-line" />
        </Inspectable>
        <Train c="vehicle" stuck />
        <g style={vars({ '--d': '4s' })}>
          <Train c="vehicle" stuck begin={4} />
        </g>
        <Train c="vehicle" stuck begin={8} />
        <T x={sw[0] - 52} y={sw[1] + 72} className="mini-label warm">
          STRONG DISRUPTION
        </T>
      </M>
      <Actor
        id="toyota-eu"
        x={640}
        y={196}
        title="Toyota Europe"
        sub="Ships its vehicles by rail"
        body="Toyota Europe was the customer of the freight company, not SNCF’s direct customer."
      />
      <Actor
        id="freight-co"
        x={640}
        y={336}
        title="Freight customer"
        sub="Moves the vehicles"
        body="The freight company running the trains: the customer I represented within the network."
      />
      <Actor
        id="network"
        x={640}
        y={476}
        title="SNCF Réseau"
        sub="The network · my side"
        body="The infrastructure manager, where I handled this customer’s capacity."
        kind="console"
        c="is-me"
      />
      <FlowArrow d="M640 262V286" />
      <T x={652} y={278} className="flow-label">
        contracts
      </T>
      <FlowArrow d="M640 402V426" />
      <T x={652} y={418} className="flow-label">
        runs its trains on
      </T>
      <Inspectable
        id="risk"
        title="A customer relationship at risk"
        body="Toyota Europe was considering another freight operator. A meeting was set for the next morning."
      >
        <g>
          <FlowArrow d="M712 186C760 186 780 170 790 160" c="risk-arrow" />
          <Pill x={760} y={134} w={210} label="ANOTHER OPERATOR?" c="pill-risk" />
        </g>
      </Inspectable>
      <g transform="translate(560 600)">
        <T x={0} y={-14} className="mini-label muted-label">
          TRAINS · AMBER: DISRUPTED · ILLUSTRATIVE
        </T>
        {runs([3, 4, 9, 12, 13, 17])}
      </g>
    </Layer>
  );
}

// One afternoon: I coordinate the teams concerned along the line while the clock runs.
const teams = [3, 4, 7, 8].map((i) => pts[i]);
const steps: [string, string, string][] = [
  ['14:00', 'I take the meeting', 'Set for the next morning, with Toyota Europe.'],
  ['15:00', 'Regional teams, together', 'One SNCF Réseau team per region the line crosses.'],
  ['16:00', 'Constraints, everywhere', 'Each region brings its own.'],
  ['17:00', 'Causes traced', 'Section by section, with each team.'],
  ['18:00', 'One solution across all', 'Drafted by me, part validated by the teams.'],
  ['19:00', 'Ready for the morning', 'Causes and solution, one answer.'],
];
const rowY = (i: number) => 192 + i * 78;

function Afternoon() {
  return (
    <Layer steps={[1]}>
      <M>
        {teams.map(([x, y], i) => (
          <Fragment key={i}>
            <path
              className="coord-link"
              d={`M${x.toFixed(1)} ${y.toFixed(1)}C${(x + 200).toFixed(1)} ${y.toFixed(1)} 560 ${rowY(1) - 140} 662 ${rowY(1) - 140}`}
            />
            <Inspectable
              id={`team-${i}`}
              title={`Regional team ${i + 1}`}
              body="One SNCF Réseau regional team along the line, with its own constraints, coordinated in the same afternoon. Positions illustrative."
            >
              <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                <circle className="team-node" r="11" />
                <Console x={0} y={-6} s={0.45} />
                <g className="team-constraint" transform="translate(-16 18)">
                  <rect width="32" height="14" rx="2" />
                  <path d="M4 3l8 8M12 3l-8 8" />
                  <T x={20} y={11} className="">
                    {''}
                  </T>
                </g>
                <T x={-16} y={-16} className="end mini-label team-tag">{`REGION ${i + 1}`}</T>
              </g>
            </Inspectable>
          </Fragment>
        ))}
      </M>
      <T x={600} y={160} className="mini-label warm">
        THE AFTERNOON BEFORE THE MEETING · ILLUSTRATIVE HOURS
      </T>
      <path className="tl-rail" d={`M610 ${rowY(0)}V${rowY(5)}`} />
      {steps.map(([h, t, sub], i) => (
        <Inspectable key={h} id={`hour-${i}`} title={`${h} · ${t}`} body={sub}>
          <g className="tl-row" transform={`translate(610 ${rowY(i)})`}>
            <rect className="tl-row-bg" x="22" y="-26" width="328" height="56" rx="3" />
            <circle className="tl-dot" r="8" />
            <T x={36} y={-4} className="mini-label tl-hour">
              {h}
            </T>
            <T x={100} y={-4} className="label small tl-title">
              {t}
            </T>
            <T x={100} y={16} className="label tiny tl-sub">
              {sub}
            </T>
          </g>
        </Inspectable>
      ))}
    </Layer>
  );
}

const seats: [number, number, string, string, boolean][] = [
  [500, 236, 'Me', 'SNCF Réseau', true],
  [250, 400, 'Main contact', 'Freight customer', false],
  [500, 580, 'Director', 'Freight customer', false],
  [750, 400, 'European CLO', 'Toyota Europe', false],
];

function Meeting() {
  return (
    <Layer steps={[2]}>
      <rect className="table" x="330" y="316" width="340" height="208" rx="104" />
      {seats.map(([x, y, t, s, me], i) => (
        <Actor
          key={t}
          id={`seat-${i}`}
          x={x}
          y={y}
          title={t}
          sub={s}
          body={
            me
              ? 'I represented SNCF Réseau: the causes of the disruption and the solutions to validate.'
              : `${t}, ${s}. One of the three people the answer had to convince.`
          }
          kind={me ? 'console' : 'crew'}
          c={me ? 'is-me' : ''}
        />
      ))}
      <Inspectable
        id="why"
        title="Why it failed"
        body="I explained the causes of the disruption traced the afternoon before."
      >
        <g transform="translate(372 384)">
          <rect className="out-card" width="118" height="72" rx="3" />
          <T x={14} y={28} className="mini-label">
            CAUSES
          </T>
          <T x={14} y={52} className="label small">
            Why it failed
          </T>
        </g>
      </Inspectable>
      <FlowArrow d="M496 420H518" />
      <Inspectable
        id="to-validate"
        title="Measures to validate"
        body="I presented the solutions for the customer and Toyota Europe to validate."
      >
        <g transform="translate(522 384)">
          <rect className="out-card is-lit" width="118" height="72" rx="3" />
          <T x={14} y={28} className="mini-label">
            MEASURES
          </T>
          <T x={14} y={52} className="label small">
            To validate
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

function Afterwards() {
  return (
    <Layer steps={[3]}>
      <M>
        <Inspectable
          id="sw-ok"
          title="The south-west, back on time"
          body="I followed the solutions through the teams, and the vehicle trains ran through the south-west again."
        >
          <g transform={`translate(${sw[0].toFixed(1)} ${sw[1].toFixed(1)})`}>
            <circle className="sw-zone ok" r="46" />
            <path className="sw-check" d="M-12 0l8 8 16-18" />
          </g>
        </Inspectable>
        <Train c="vehicle ok" stuck={false} />
        <Train c="vehicle ok" stuck={false} begin={4} />
        <Train c="vehicle ok" stuck={false} begin={8} />
      </M>
      <Inspectable
        id="speed"
        title="A solution in under a day"
        body="From the first call to an answer validated by the customer and Toyota Europe: one afternoon and one morning."
      >
        <g transform="translate(560 170)">
          <T x={0} y={0} className="mini-label warm">
            FROM FIRST CALL TO VALIDATED ANSWER
          </T>
          <rect className="speed-bar" x="0" y="18" width="270" height="26" rx="2" />
          <T x={10} y={36} className="mini-label">
            ONE AFTERNOON
          </T>
          <rect className="speed-bar is-me" x="276" y="18" width="130" height="26" rx="2" />
          <T x={286} y={36} className="mini-label">
            ONE MORNING
          </T>
        </g>
      </Inspectable>
      <Inspectable
        id="applied"
        title="Solutions followed through"
        body="I followed the solutions through the teams, and circulation improved."
      >
        <g transform="translate(560 300)">
          <T x={0} y={-10} className="mini-label">
            BEFORE
          </T>
          {runs([1, 4, 5, 8, 11])}
          <T x={0} y={56} className="mini-label">
            AFTER
          </T>
          {runs([], 66)}
          <T x={0} y={112} className="mini-label muted-label">
            ILLUSTRATIVE
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

export default function ToyotaScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="TOYOTA EUROPE · SUMMER 2013" />
      {phases.map((p, i) => (
        <g key={p} className={`phase ph-${i}`} transform={`translate(${40 + i * 232} 70)`}>
          <rect width="216" height="40" rx="3" />
          <T x={14} y={25} className="mini-label phase-text">{`${pad(i + 1)}  ${p}`}</T>
        </g>
      ))}
      <Line d="M256 90h16M488 90h16M720 90h16" c="phase-link" />
      <Layer steps={[0, 1, 3]} bare className="ty-map">
        <MapBase />
      </Layer>
      <Stakes />
      <Afternoon />
      <Meeting />
      <Afterwards />
    </>
  );
}
