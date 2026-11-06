// Earth · Transilien Ligne C: step 1, a role built on communication; then the line on top and one picture per step: the plans, the ground, the measure.
// Station layout, plan content and indicator values are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { Arrow, CaseChip, Lab, Move, OpsDefs, Packet, Sub, T, User, vars, type Pt } from '~/drawings/kit';
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
      <Layer steps={[1, 2]} bare className="lens">
        <circle className="lens-ring" cx={lens[0].toFixed(1)} cy="100" r="11" />
      </Layer>
    </g>
  );
}

// ---------- Small domain objects ----------
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

/**
 * A suburban train moving along a track. `mode`: stops at the platform, or is held short of it.
 * `dir`: east on track 1, west on track 2, as on a real double-track line.
 */
function StationTrain({
  y,
  mode,
  begin = 0,
  dir = 'east',
}: {
  y: number;
  mode: 'stop' | 'held';
  begin?: number;
  dir?: 'east' | 'west';
}) {
  const path = dir === 'east' ? `M-300 ${y}H1300` : `M1300 ${y}H-300`;
  const timing =
    mode === 'stop'
      ? { keyPoints: '0;0.45;0.45;1', keyTimes: '0;0.35;0.65;1' }
      : { keyPoints: '0;0.27;0.27;0', keyTimes: '0;0.35;0.8;1' };
  return (
    <g className="st-train" clipPath="url(#stClip)">
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={dir === 'east' ? -260 + i * 66 : 4 + i * 66}
            y="-9"
            width="62"
            height="18"
            rx="3"
          />
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

// Step 1: passengers at the centre, the four parts of the role around them, internal and external communication.
const hub = { x: 500, y: 320, r: 130 };
const roleIcon = {
  action: <path d="M3-15L-9 3H0L-3 15 9-3H0Z" />,
  reaction: <path d="M12-5A13 13 0 1 0 13 5M12-13V-5H4" />,
  planning: (
    <>
      <rect x="-13" y="-11" width="26" height="25" rx="2" />
      <path d="M-13-3H13M-6-16V-7M6-16V-7" />
    </>
  ),
  coordination: (
    <>
      <circle cy="-10" r="4" />
      <circle cx="-11" cy="9" r="4" />
      <circle cx="11" cy="9" r="4" />
      <path d="M-2-6L-9 5M2-6L9 5M-7 9H7" />
    </>
  ),
  person: (
    <>
      <circle cy="-8" r="5" />
      <path d="M-11 13V7A11 9 0 0 1 11 7V13" />
    </>
  ),
  team: (
    <>
      <circle cx="-8" cy="-6" r="4" />
      <circle cx="8" cy="-6" r="4" />
      <path d="M-16 11V6A8 7 0 0 1 0 6V11M0 11V6A8 7 0 0 1 16 6V11" />
    </>
  ),
  town: <path d="M-14 13H14M-11 13V-1M11 13V-1M-14-1H14L0-12ZM-4 13V4H4V13" />,
  info: (
    <>
      <circle r="13" />
      <path d="M0-1V8M0-7V-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="-12" y="-10" width="24" height="22" rx="2" />
      <path d="M-12-2H12M-6-14V-6M6-14V-6" />
    </>
  ),
  crowd: (
    <>
      <circle cx="-14" cy="-4" r="5" />
      <circle cy="-8" r="6" />
      <circle cx="14" cy="-4" r="5" />
      <path d="M-24 14V9A10 8 0 0 1-6 7M6 7A10 8 0 0 1 24 9V14M-10 14V7A10 9 0 0 1 10 7V14" />
    </>
  ),
};
const modes: [string, string, number, React.ReactNode][] = [
  ['ACTION', 'Act on what happens now', -90, roleIcon.action],
  ['REACTION', 'Answer the unexpected', 0, roleIcon.reaction],
  ['PLANNING', 'Prepare known events', 90, roleIcon.planning],
  ['COORDINATION', 'Bring every team together', 180, roleIcon.coordination],
];
const onHub = (deg: number, r = hub.r): Pt => {
  const a = (deg * Math.PI) / 180;
  return [+(hub.x + r * Math.cos(a)).toFixed(1), +(hub.y + r * Math.sin(a)).toFixed(1)];
};
const sides: [string, string, string, string, [string, string, React.ReactNode, number][]][] = [
  [
    'lc-internal',
    'Internal communication',
    'Radio, phone and briefings with the station staff and SNCF teams.|Everyone acts on the same information.',
    'INTERNAL',
    [
      ['STATION STAFF', 'In the stations', roleIcon.person, 230],
      ['SNCF TEAMS', 'Across the line', roleIcon.team, 410],
    ],
  ],
  [
    'lc-external',
    'External communication',
    'Local authorities, welcome providers, and information for passengers.|Passengers know what happens and where to go.',
    'EXTERNAL',
    [
      ['LOCAL AUTHORITIES', 'Around the stations', roleIcon.town, 230],
      ['WELCOME PROVIDERS', 'Passenger welcome', roleIcon.info, 410],
    ],
  ],
];

function WhyThisRole() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={92} t="A ROLE BUILT ON COMMUNICATION" c="strong" />
      <circle className="tx-ring" cx={hub.x} cy={hub.y} r={hub.r} />
      <Move
        path={`M${hub.x} ${hub.y - hub.r}A${hub.r} ${hub.r} 0 1 1 ${hub.x - 0.1} ${hub.y - hub.r}Z`}
        dur={8}
      >
        <circle className="tx-alert" r="6" />
      </Move>
      <Inspectable
        id="lc-passengers"
        title="Passengers"
        body="Passengers of 42 Ligne C stations: their safety, their information, their experience.|The centre of every decision in the role."
      >
        <g>
          <circle className="fd-core" cx={hub.x} cy={hub.y} r="62" />
          <g className="tx-icon" transform={`translate(${hub.x} ${hub.y - 12})`}>
            {roleIcon.crowd}
          </g>
          <Lab x={hub.x} y={hub.y + 34} t="PASSENGERS" c="center warm" />
        </g>
      </Inspectable>
      {modes.map(([t, sub, deg, icon], i) => {
        const [x, y] = onHub(deg);
        const side = deg === 0 ? 1 : deg === 180 ? -1 : 0;
        return (
          <Inspectable
            key={t}
            id={`lc-mode-${i}`}
            title={t.charAt(0) + t.slice(1).toLowerCase()}
            body={`${sub}.|One of the four parts of the role, every day.`}
          >
            <g className="lc-mode" style={vars({ '--i': i })}>
              <circle className="tx-stage" cx={x} cy={y} r="30" />
              <g className="tx-icon" transform={`translate(${x} ${y})`}>
                {icon}
              </g>
              <Lab
                x={side ? x + side * 42 : x}
                y={side ? y + 5 : deg < 0 ? y - 44 : y + 54}
                t={t}
                c={side > 0 ? '' : side < 0 ? 'end' : 'center'}
              />
            </g>
          </Inspectable>
        );
      })}
      {sides.map(([id, title, body, head, actors], s) => {
        const left = s === 0;
        const cx = left ? 66 : 800;
        return (
          <Inspectable key={id} id={id} title={title} body={body}>
            <g>
              <Lab x={left ? 40 : 774} y={180} t={head} c="warm" />
              {actors.map(([t, sub, icon, y]) => {
                const [hx, hy] = onHub(left ? (y < hub.y ? 220 : 140) : y < hub.y ? -40 : 40, hub.r + 6);
                const d = left ? `M232 ${y}L${hx} ${hy}` : `M${hx} ${hy}L774 ${y}`;
                return (
                  <Fragment key={t}>
                    <circle className="tx-stage" cx={cx} cy={y} r="26" />
                    <g className="tx-icon" transform={`translate(${cx} ${y}) scale(.9)`}>
                      {icon}
                    </g>
                    <Lab x={cx + 36} y={y - 4} t={t} />
                    <Sub x={cx + 36} y={y + 16} t={sub} />
                    <path className="tx-link" d={d} />
                    <Packet path={d} delay={y > hub.y ? 2 : 0} />
                  </Fragment>
                );
              })}
            </g>
          </Inspectable>
        );
      })}
      <path className="tx-div" d="M40 566H960" />
      <Inspectable
        id="lc-sides"
        title="Both sides of rail"
        body="From capacity planning for rail companies to passenger transport.|I know rail from both sides: capacity and passengers."
      >
        <g>
          <Lab x={40} y={600} t="BOTH SIDES OF RAIL" c="warm" />
          <Sub x={40} y={624} t="From capacity planning to passenger transport." />
          <circle className="tx-stage" cx={620} cy={604} r="22" />
          <g className="tx-icon" transform="translate(620 604) scale(.8)">
            {roleIcon.calendar}
          </g>
          <Sub x={652} y={609} t="Capacity" />
          <Arrow from={[730, 604]} to={[800, 604]} />
          <circle className="tx-stage vs-on" cx={836} cy={604} r="22" />
          <g className="tx-icon" transform="translate(836 604) scale(.8)">
            {roleIcon.person}
          </g>
          <Sub x={868} y={609} t="Passengers" />
        </g>
      </Inspectable>
    </Layer>
  );
}

const redirect = `M520 ${ST.platTop + 24}H610V${ST.hallBottom + 8}L600 ${ST.hallBottom}H200L182 ${ST.street}H860`;

function Plans() {
  return (
    <Layer steps={[1]}>
      <StationSection closed />
      <StationTrain y={ST.t1} mode="stop" />
      <StationTrain y={ST.t2} mode="held" begin={3} dir="west" />
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
      <StationTrain y={ST.t2} mode="stop" begin={8} dir="west" />
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

// Step 4: plans → indicators → assessment → follow-up; two gauges and the 42 stations; the question met again in Data.
const mx = [130, 370, 610, 850];
const measureIcon = {
  plans: <path d="M-11-15H6L12-9V15H-11ZM6-15V-9H12M-6-3H7M-6 3H7M-6 9H3" />,
  gauge: (
    <>
      <path d="M-15 8A15 15 0 0 1 15 8" />
      <path d="M0 8L8-5" />
    </>
  ),
  check: (
    <>
      <circle r="14" />
      <path d="M-6 0L-2 5 7-5" />
    </>
  ),
  chart: (
    <>
      <path d="M-15-14V13H15" />
      <path d="M-10 6L-3-2 3 3 13-9" />
    </>
  ),
};
const chain: [string, string, React.ReactNode][] = [
  ['THE PLANS', '42 stations', measureIcon.plans],
  ['INDICATORS', 'Defined and monitored', measureIcon.gauge],
  ['ASSESSMENT', 'Station by station', measureIcon.check],
  ['FOLLOW-UP', 'Île-de-France Mobilités', measureIcon.chart],
];
const gauges: [string, string, number, string][] = [
  ['STAFF WORK', 'On the ground', 250, '-50;20;-10;35;-50'],
  ['FIXED EQUIPMENT', 'In the stations', 490, '30;-20;40;0;30'],
];
const GY = 440;

function Measure() {
  return (
    <Layer steps={[3]}>
      <Lab x={40} y={92} t="THE FIRST MECHANISM TO ASSESS THE PLANS" c="strong" />
      {[0, 1, 2].map((k) => (
        <Arrow key={k} from={[mx[k] + 52, 200]} to={[mx[k + 1] - 54, 200]} />
      ))}
      <Move path="M130 200H850" dur={8}>
        <circle className="tx-alert" r="6" />
      </Move>
      <Inspectable
        id="lc-plans-in"
        title="The plans"
        body="The passenger-care plans of 42 Ligne C stations.|What the mechanism assesses."
      >
        <g>
          <circle className="tx-stage" cx={mx[0]} cy={200} r="44" />
          <g className="tx-icon" transform={`translate(${mx[0]} 200) scale(1.3)`}>
            {chain[0][2]}
          </g>
          <Lab x={mx[0]} y={138} t={chain[0][0]} c="center" />
          <Sub x={mx[0]} y={272} t={chain[0][1]} c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="lc-indicators"
        title="Indicators for each station"
        body="Two indicators, defined and monitored: staff work, and fixed equipment.|The first mechanism to assess the plans."
      >
        <g>
          <circle className="tx-stage vs-on" cx={mx[1]} cy={200} r="44" />
          <g className="tx-icon" transform={`translate(${mx[1]} 200) scale(1.3)`}>
            {chain[1][2]}
          </g>
          <Lab x={mx[1]} y={138} t={chain[1][0]} c="center warm" />
          <Sub x={mx[1]} y={272} t={chain[1][1]} c="center" />
          <Arrow from={[mx[1], 290]} to={[mx[1], 340]} />
          {gauges.map(([t, sub, x, vals]) => (
            <Fragment key={t}>
              <path className="lc-gauge" d={`M${x - 80} ${GY}A80 80 0 0 1 ${x + 80} ${GY}`} />
              <path
                className="lc-gauge-on"
                pathLength={1}
                d={`M${x - 80} ${GY}A80 80 0 0 1 ${x + 80} ${GY}`}
              />
              <path className="lc-needle" d={`M${x} ${GY}V${GY - 62}`}>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={vals
                    .split(';')
                    .map((v) => `${v} ${x} ${GY}`)
                    .join(';')}
                  dur="10s"
                  repeatCount="indefinite"
                />
              </path>
              <circle className="tx-stop" cx={x} cy={GY} r="6" />
              <Lab x={x} y={GY + 34} t={t} c="center" />
              <Sub x={x} y={GY + 56} t={sub} c="center" />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="lc-assess"
        title="Each of the 42 stations"
        body="Every station assessed against the same indicators.|One comparable view across the line."
      >
        <g>
          <circle className="tx-stage" cx={mx[2]} cy={200} r="44" />
          <g className="tx-icon" transform={`translate(${mx[2]} 200) scale(1.3)`}>
            {chain[2][2]}
          </g>
          <Lab x={mx[2]} y={138} t={chain[2][0]} c="center" />
          <Sub x={mx[2]} y={272} t={chain[2][1]} c="center" />
          <Arrow from={[mx[2], 290]} to={[mx[2], 340]} />
          {Array.from({ length: 42 }, (_, i) => (
            <circle
              key={i}
              className="lc-station"
              style={vars({ '--i': i })}
              cx={610 + (i % 14) * 24}
              cy={370 + Math.floor(i / 14) * 32}
              r="7"
            />
          ))}
          <Lab x={610} y={GY + 34} t="EACH OF THE 42 STATIONS" />
          <Sub x={610} y={GY + 56} t="Assessed in turn · illustrative" />
        </g>
      </Inspectable>
      <Inspectable
        id="lc-idfm"
        title="Measures required by Île-de-France Mobilités"
        body="The transport authority requires and incentivises some measures.|The indicators let us follow them."
      >
        <g>
          <circle className="tx-stage" cx={mx[3]} cy={200} r="44" />
          <g className="tx-icon" transform={`translate(${mx[3]} 200) scale(1.3)`}>
            {chain[3][2]}
          </g>
          <Lab x={mx[3]} y={138} t={chain[3][0]} c="center" />
          <Sub x={mx[3]} y={272} t={chain[3][1]} c="center" />
        </g>
      </Inspectable>
      <path className="tx-div" d="M40 566H960" />
      <Inspectable
        id="lc-question"
        title="Does the system do its job?"
        body="Measuring whether a system does its job.|A question I met again in Data."
      >
        <g>
          <Lab x={40} y={600} t="DOES THE SYSTEM DO ITS JOB?" c="warm" />
          <Sub x={40} y={624} t="A question I met again in Data." />
        </g>
      </Inspectable>
      <CaseChip
        x={560}
        y={578}
        w={400}
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
      <Layer steps={[1, 2]} bare>
        <Line42 />
      </Layer>
      <WhyThisRole />
      <Plans />
      <OnTheGround />
      <Measure />
    </>
  );
}
