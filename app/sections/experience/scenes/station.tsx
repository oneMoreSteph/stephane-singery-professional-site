// Earth · Transilien Ligne C: the line on top; below, one picture per step: communication, the plans, the ground, the measure.
// Station layout, plan content and indicator values are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Bars,
  CaseChip,
  Lab,
  OpsDefs,
  Packet,
  Spark,
  Sub,
  T,
  User,
  vars,
  Win,
  type Pt,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Line } from '~/drawings/ops';

// ---------- The line: schematic, 42 station marks ----------
const trunk: Pt[] = Array.from({ length: 17 }, (_, i) => [240 + (520 * (i + 1)) / 18, 100]);
const branches: Pt[] = (
  [
    [80, 52],
    [80, 100],
    [80, 148],
    [920, 58],
    [920, 142],
  ] as Pt[]
).flatMap(([x2, y2]) => {
  const x1 = x2 < 500 ? 240 : 760;
  return Array.from({ length: 5 }, (_, i): Pt => {
    const t = (i + 1) / 6;
    return [x1 + (x2 - x1) * t, 100 + (y2 - 100) * t];
  });
});
const stops = [...trunk, ...branches];
const lens = trunk[12];

function Line42() {
  return (
    <g className="rer">
      <path className="seine" d="M200 122C330 110 420 128 520 116S700 104 800 124" />
      <T x={214} y={141} className="mini-label seine-label">
        SEINE
      </T>
      <Line d="M240 100H760" c="rer-line" />
      {(
        [
          [80, 52],
          [80, 100],
          [80, 148],
        ] as Pt[]
      ).map(([x, y]) => (
        <Line key={y} d={`M240 100L${x} ${y}`} c="rer-line branch" />
      ))}
      {(
        [
          [920, 58],
          [920, 142],
        ] as Pt[]
      ).map(([x, y]) => (
        <Line key={y} d={`M760 100L${x} ${y}`} c="rer-line branch" />
      ))}
      {stops.map(([x, y], i) => (
        <Fragment key={i}>
          <circle className="rer-stop" cx={x.toFixed(1)} cy={y.toFixed(1)} r="4" />
          <g className="ind-mark" style={vars({ '--i': i })}>
            <rect x={(x - 5).toFixed(1)} y={(y + 8).toFixed(1)} width="4" height="9" />
            <rect
              className="ind-mark__equip"
              x={(x + 1).toFixed(1)}
              y={(y + 8).toFixed(1)}
              width="4"
              height="9"
            />
          </g>
        </Fragment>
      ))}
      <circle className="rer-stop is-named" cx={trunk[7][0].toFixed(1)} cy="100" r="6" />
      <circle className="rer-stop is-named" cx={trunk[8][0].toFixed(1)} cy="100" r="6" />
      <T x={trunk[7][0] - 8} y={80} className="end mini-label named">
        SAINT-MICHEL NOTRE-DAME
      </T>
      <T x={trunk[8][0] + 8} y={128} className="mini-label named">
        AUSTERLITZ
      </T>
      <T x={40} y={30} className="mini-label rer-tag">
        TRANSILIEN LIGNE C · 42 STATIONS IN MY SCOPE · SCHEMATIC
      </T>
      <Layer steps={[0, 1, 2]} bare className="lens">
        <circle className="lens-ring" cx={lens[0].toFixed(1)} cy="100" r="11" />
      </Layer>
    </g>
  );
}

// ---------- Small domain objects ----------
const Radio = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <rect x="-9" y="-14" width="18" height="30" rx="3" />
    <path d="M-4-14V-26M-4-6H4M-4 0H4" />
  </g>
);
const Speaker = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <path d="M-12-6H-5L5-14V14L-5 6H-12Z" />
    <path d="M10-8C14-4 14 4 10 8M14-13C21-6 21 6 14 13" />
  </g>
);
const Sheet = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect className="tx-doc" width="16" height="20" rx="2" />
    <path className="tx-grid" d="M3 6H13M3 11H13M3 16H10" />
  </g>
);

// ---------- The station in cross-section: street, ticket hall, platforms ----------
// Levels, in scene units.
const ST = {
  street: 236,
  hallTop: 262,
  hallBottom: 336,
  t1: 386,
  platTop: 398,
  platBottom: 446,
  t2: 458,
  bottom: 482,
};

/** A suburban train moving along a track. `mode`: stops at the platform, or is held short of it. */
function StationTrain({ y, mode, begin = 0 }: { y: number; mode: 'stop' | 'held'; begin?: number }) {
  const path = `M-300 ${y}H1300`;
  const timing =
    mode === 'stop'
      ? { keyPoints: '0;0.45;0.45;1', keyTimes: '0;0.35;0.65;1' }
      : { keyPoints: '0;0.27;0.27;0', keyTimes: '0;0.35;0.8;1' };
  return (
    <g className="st-train" clipPath="url(#stClip)">
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-260 + i * 66} y="-9" width="62" height="18" rx="3" />
        ))}
        <animateMotion
          dur="12s"
          begin={`-${begin}s`}
          repeatCount="indefinite"
          calcMode="linear"
          path={path}
          {...timing}
        />
      </g>
    </g>
  );
}

/** An information screen; `alert` shows a disruption message. */
const Screen = ({ x, y, alert }: { x: number; y: number; alert?: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect className="tx-app" width="128" height="30" rx="3" />
    <T x={8} y={19} className={`tx-win-t${alert ? ' late' : ''}`}>
      {alert ?? 'C · ON TIME'}
    </T>
  </g>
);

function StationSection({ closed = false }: { closed?: boolean }) {
  return (
    <g>
      <rect className="tx-layer" x="40" y="170" width="920" height="320" rx="4" />
      {/* Street */}
      <T x={56} y={192} className="tx-win-t">
        STREET
      </T>
      {[
        [300, 196, 40],
        [350, 208, 28],
        [400, 190, 46],
      ].map(([x, y, w]) => (
        <rect key={x} className="st-building" x={x} y={y} width={w} height={ST.street - y} />
      ))}
      <path className="tx-route" d={`M40 ${ST.street}H960`} />
      <path className="st-stop" d={`M890 ${ST.street}V200M876 200H904V214H876Z`} />
      <T x={890} y={ST.street + 16} className="center tx-win-t">
        BUS STOP
      </T>
      {/* Exits and stairs */}
      {[
        [170, 'A'],
        [720, 'B'],
      ].map(([x, t]) => (
        <Fragment key={t}>
          <path className="st-stairs" d={`M${x} ${ST.street}l12 8h12l0 8h12l0 8h12V${ST.hallTop}`} />
          <T x={(x as number) - 12} y={ST.street - 6} className="tx-win-t">
            {t as string}
          </T>
        </Fragment>
      ))}
      {/* Ticket hall */}
      <rect
        className="st-hall"
        x="150"
        y={ST.hallTop}
        width="660"
        height={ST.hallBottom - ST.hallTop}
        rx="3"
      />
      <T x={796} y={ST.hallTop + 18} className="end tx-win-t">
        TICKET HALL
      </T>
      <path className="tx-gates" d="M440 326V300M458 326V300M476 326V300M494 326V300" />
      <Screen x={250} y={ST.hallTop + 14} alert={closed ? 'TRACK 2 · BUS' : undefined} />
      <path className="st-stairs" d={`M600 ${ST.hallBottom}l12 10h12l0 10h12V${ST.platTop - 12}`} />
      {/* Platform level */}
      <path className="st-rail" d={`M40 ${ST.t1}H960`} />
      <rect
        className="st-platform"
        x="140"
        y={ST.platTop}
        width="700"
        height={ST.platBottom - ST.platTop}
        rx="2"
      />
      <path className="st-edge" d={`M140 ${ST.platTop + 4}H840M140 ${ST.platBottom - 4}H840`} />
      <T x={152} y={ST.platTop + 30} className="tx-win-t">
        PLATFORM
      </T>
      <Screen x={250} y={ST.platTop + 9} alert={closed ? 'NO TRAIN · BUS' : undefined} />
      <path className="st-rail" d={`M40 ${ST.t2}H960`} />
      <T x={950} y={ST.t1 - 6} className="end tx-win-t">
        TRACK 1
      </T>
      <T x={950} y={ST.t2 + 18} className="end tx-win-t">
        TRACK 2
      </T>
      <T x={56} y={ST.bottom + 2} className="tx-win-t dim">
        ILLUSTRATIVE STATION
      </T>
    </g>
  );
}

/** A person in the station, with a name tag. */
function Actor({ x, y, label, sheet }: { x: number; y: number; label?: string; sheet?: boolean }) {
  return (
    <g>
      <User x={x} y={y} s={0.7} c="on" />
      {sheet && <Sheet x={x + 10} y={y - 24} />}
      {label && (
        <T x={x} y={y - 30} className="center tx-win-t">
          {label}
        </T>
      )}
    </g>
  );
}

function WhyThisRole() {
  return (
    <Layer steps={[0]}>
      <StationSection />
      <StationTrain y={ST.t1} mode="stop" />
      <StationTrain y={ST.t2} mode="stop" begin={6} />
      <Inspectable
        id="lc-internal"
        title="Internal communication"
        body="Radio, phone and briefings with the station staff and SNCF teams.|Everyone in the station acts on the same information."
      >
        <g>
          <Actor x={560} y={322} label="STATION STAFF" />
          <Actor x={680} y={322} label="SNCF TEAMS" />
          <Radio x={586} y={308} />
          <Actor x={480} y={440} label="STAFF" />
        </g>
      </Inspectable>
      <Inspectable
        id="lc-external"
        title="External communication"
        body="Information screens, announcements, local authorities and welcome providers.|Passengers know what happens and where to go."
      >
        <g>
          <Actor x={520} y={230} label="LOCAL AUTHORITIES" />
          <Actor x={800} y={230} label="WELCOME PROVIDERS" />
          <Speaker x={380} y={290} />
        </g>
      </Inspectable>
      <Lab x={40} y={540} t="AFTER CAPACITY PLANNING · A ROLE BUILT ON COMMUNICATION" c="strong" />
      {(
        [
          ['ACTION', 'Act on what happens now'],
          ['REACTION', 'Answer the unexpected'],
          ['PLANNING', 'Prepare known events'],
          ['COORDINATION', 'Bring every team together'],
        ] as const
      ).map(([t, sub], i) => (
        <Inspectable
          key={t}
          id={`lc-mode-${i}`}
          title={t.charAt(0) + t.slice(1).toLowerCase()}
          body={`${sub}.|One of the four parts of the role, every day.`}
        >
          <g>
            <circle className="tx-stage" cx={56 + i * 230} cy={590} r="12" />
            <Lab x={78 + i * 230} y={586} t={t} />
            <Sub x={78 + i * 230} y={608} t={sub} />
          </g>
        </Inspectable>
      ))}
    </Layer>
  );
}

const redirect = `M520 ${ST.platTop + 24}H610V${ST.hallBottom + 8}L600 ${ST.hallBottom}H200L182 ${ST.street}H860`;

function Plans() {
  return (
    <Layer steps={[1]}>
      <StationSection closed />
      <StationTrain y={ST.t1} mode="stop" />
      <StationTrain y={ST.t2} mode="held" begin={3} />
      <Inspectable
        id="lc-works"
        title="Track 2 closed for works"
        body="Planned engineering works close a track for a period.|Its train does not come: the plan takes over."
      >
        <g>
          <rect className="works-window" x="140" y={ST.t2 - 9} width="700" height="18" rx="2" />
          <Lab x={490} y={ST.t2 + 5} t="CLOSED FOR WORKS · NO TRAIN" c="center warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="lc-redirect"
        title="Redirection"
        body="Passengers are guided out of the station, to the replacement bus.|Planned in advance, station by station."
      >
        <g>
          <path className="tx-link" d={redirect} />
          <path className="tx-flow" d={redirect} />
          {[0, 1, 2].map((i) => (
            <Packet key={i} path={redirect} delay={i * 2} />
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="lc-train-ok"
        title="Track 1: the train comes"
        body="On the open track, trains run as planned.|The plan only changes what the event touches."
      >
        <g>
          <Lab x={46} y={ST.t1 - 8} t="COMES" c="warm" />
        </g>
      </Inspectable>
      <Inspectable
        id="lc-plan"
        title="A plan for each station"
        body="Passenger-care plans for 42 Ligne C stations: safety, redirection, experience.|For planned events and unexpected incidents."
      >
        <g>
          <Lab x={40} y={530} t="A PLAN FOR EACH STATION" c="strong" />
          {(
            [
              ['SAFETY', 'Passengers’ safety'],
              ['REDIRECTION', 'Where passengers go instead'],
              ['EXPERIENCE', 'Their experience in our stations'],
            ] as const
          ).map(([t, sub], i) => (
            <Fragment key={t}>
              <Lab x={40 + i * 310} y={566} t={t} c="warm" />
              <Sub x={40 + i * 310} y={588} t={sub} />
            </Fragment>
          ))}
          <Sub
            x={40}
            y={624}
            t="For planned events (festive public events, works) and unexpected incidents"
          />
        </g>
      </Inspectable>
    </Layer>
  );
}

const ground: [string, string, string, [number, number, string][]][] = [
  [
    'lc-staff',
    'Station staff',
    'The station staff concerned, at the gates and on the platforms.|I coordinated them, each with the tools and information to act.',
    [
      [580, 322, 'STATION STAFF'],
      [470, 440, 'STATION STAFF'],
      [760, 440, ''],
    ],
  ],
  [
    'lc-welcome',
    'Welcome providers',
    'Teams who greet and guide passengers at the entrances.|I negotiated what each would do and obtained their commitment.',
    [
      [130, 230, 'WELCOME'],
      [760, 230, 'WELCOME'],
    ],
  ],
  [
    'lc-authorities',
    'Local authorities',
    'The town authorities around the station.|I obtained their commitment, or coordinated an existing arrangement.',
    [[560, 230, 'LOCAL AUTHORITIES']],
  ],
];

function OnTheGround() {
  return (
    <Layer steps={[2]}>
      <StationSection />
      <StationTrain y={ST.t1} mode="stop" begin={2} />
      {ground.map(([id, title, body, people]) => (
        <Inspectable key={id} id={id} title={title} body={body}>
          <g>
            {people.map(([x, y, label], j) => (
              <Actor key={j} x={x} y={y} label={label || undefined} sheet />
            ))}
          </g>
        </Inspectable>
      ))}
      <Inspectable
        id="lc-tools"
        title="In everyone’s hands"
        body="The plan I built, with the tools and information to act.|Each person knew their part."
      >
        <g>
          <Sheet x={40} y={522} />
          <Lab x={66} y={538} t="IN EVERYONE’S HANDS" c="warm" />
          <Sub x={66} y={560} t="The plan I built, with the tools and information to act" />
        </g>
      </Inspectable>
      <Lab x={40} y={612} t="NEGOTIATED · COMMITMENT OBTAINED · COORDINATED" />
    </Layer>
  );
}

const rows: [string, number, number][] = [
  ['Saint-Michel N.-D.', 0.9, 0.8],
  ['Austerlitz', 0.75, 0.95],
  ['Station 3', 0.6, 0.7],
  ['Station 4', 0.85, 0.55],
];

function Measure() {
  return (
    <Layer steps={[3]}>
      <Inspectable
        id="lc-indicators"
        title="Indicators for each station"
        body="Two indicators per station: staff work, and fixed equipment doing its job.|The first mechanism to assess the plans."
      >
        <Win x={40} y={186} w={520} h={300} title="INDICATORS · FIRST ASSESSMENT">
          <Lab x={250} y={232} t="STAFF WORK" c="center" />
          <Lab x={430} y={232} t="FIXED EQUIPMENT" c="center" />
          {rows.map(([t, a, b], i) => (
            <Fragment key={t}>
              <Sub x={58} y={272 + i * 52} t={t} />
              {[a, b].map((v, j) => (
                <Fragment key={j}>
                  <rect
                    className="tx-gauge"
                    x={180 + j * 180}
                    y={260 + i * 52}
                    width="140"
                    height="14"
                    rx="3"
                  />
                  <rect
                    className="tx-gauge-on"
                    x={180 + j * 180}
                    y={260 + i * 52}
                    width={140 * v}
                    height="14"
                    rx="3"
                  />
                </Fragment>
              ))}
            </Fragment>
          ))}
          <Sub x={58} y={470} t="… for each of the 42 stations · illustrative values" />
        </Win>
      </Inspectable>
      <Inspectable
        id="lc-idfm"
        title="Measures required by Île-de-France Mobilités"
        body="The transport authority requires and incentivises some measures.|The indicators let us follow them."
      >
        <Win x={600} y={186} w={360} h={190} title="ÎLE-DE-FRANCE MOBILITÉS · FOLLOW-UP">
          <Bars x={620} y={226} w={150} h={120} vals={[0.55, 0.62, 0.7, 0.78]} />
          <Spark x={790} y={230} w={150} h={110} vals={[0.3, 0.45, 0.5, 0.7, 0.82]} c="on" />
        </Win>
      </Inspectable>
      <Inspectable
        id="lc-question"
        title="Does the system do its job?"
        body="Measuring whether a system does its job.|A question I met again in Data."
      >
        <g>
          <Lab x={600} y={420} t="DOES THE SYSTEM DO ITS JOB?" c="warm" />
          <Sub x={600} y={442} t="A question I met again in Data" />
        </g>
      </Inspectable>
      <CaseChip
        x={40}
        y={560}
        w={560}
        to="verisure"
        kicker="THE SAME QUESTION, LATER IN DATA"
        sub="Data Quality and Observability at Verisure"
      />
    </Layer>
  );
}

export default function StationScene() {
  return (
    <>
      <OpsDefs />
      <defs>
        <clipPath id="stClip">
          <rect x="40" y="170" width="920" height="320" />
        </clipPath>
      </defs>
      <Line42 />
      <WhyThisRole />
      <Plans />
      <OnTheGround />
      <Measure />
    </>
  );
}
