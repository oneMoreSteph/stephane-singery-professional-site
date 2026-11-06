// Earth · Transilien Ligne C: the line on top; below, one picture per step: communication, the plans, the ground, the measure.
// Station layout, plan content and indicator values are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { Arrow, Bars, CaseChip, Lab, OpsDefs, Spark, Sub, T, User, vars, Win, type Pt } from '~/drawings/kit';
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
const Phone = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <rect x="-10" y="-17" width="20" height="34" rx="4" />
    <path d="M-3 11H3" />
  </g>
);
const Speaker = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <path d="M-12-6H-5L5-14V14L-5 6H-12Z" />
    <path d="M10-8C14-4 14 4 10 8M14-13C21-6 21 6 14 13" />
  </g>
);
const TownHall = ({ x, y }: { x: number; y: number }) => (
  <g className="tx-icon" transform={`translate(${x} ${y})`}>
    <path d="M-18-6L0-18 18-6Z" />
    <path d="M-15-6V14M-5-6V14M5-6V14M15-6V14M-19 14H19" />
  </g>
);
const Sheet = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect className="tx-doc" width="16" height="20" rx="2" />
    <path className="tx-grid" d="M3 6H13M3 11H13M3 16H10" />
  </g>
);

const internal: [string, string, React.ReactNode][] = [
  ['Radio', 'Station staff', <Radio key="r" x={70} y={276} />],
  ['Phone', 'SNCF teams', <Phone key="p" x={70} y={344} />],
  [
    'Briefing',
    'Before each shift',
    <g key="b" transform="translate(58 398)">
      <rect className="tx-doc" width="26" height="32" rx="2" />
      <path className="tx-grid" d="M5 9H21M5 16H21M5 23H16" />
    </g>,
  ],
];

function WhyThisRole() {
  return (
    <Layer steps={[0]}>
      <Lab x={40} y={200} t="AFTER CAPACITY PLANNING · A ROLE BUILT ON COMMUNICATION" c="strong" />
      <Inspectable
        id="lc-internal"
        title="Internal communication"
        body="Radio, phone and briefings with the station staff and SNCF teams.|Everyone on the line acts on the same information."
      >
        <g>
          <Lab x={40} y={236} t="INTERNAL" c="warm" />
          {internal.map(([t, s, icon], i) => (
            <Fragment key={t}>
              {icon}
              <Lab x={110} y={272 + i * 68} t={t.toUpperCase()} />
              <Sub x={110} y={292 + i * 68} t={s} />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      <Inspectable
        id="lc-external"
        title="External communication"
        body="Information screens, announcements, local authorities and welcome providers.|Passengers know what happens and where to go."
      >
        <g>
          <Lab x={520} y={236} t="EXTERNAL" c="warm" />
          <Win x={520} y={250} w={200} h={110} title="NEXT TRAINS">
            {['C · 14:02 · On time', 'C · 14:09 · Delayed', 'C · 14:17 · On time'].map((t, i) => (
              <Fragment key={t}>
                <rect className="tx-table-row" x="532" y={284 + i * 24} width="176" height="18" rx="2" />
                <T x={540} y={297 + i * 24} className={`tx-win-t${i === 1 ? ' late' : ''}`}>
                  {t}
                </T>
              </Fragment>
            ))}
          </Win>
          <Speaker x={760} y={280} />
          <Sub x={786} y={285} t="Announcements" />
          <TownHall x={760} y={334} />
          <Sub x={786} y={339} t="Local authorities" />
          <User x={760} y={402} s={0.8} c="on" />
          <Sub x={786} y={393} t="Welcome providers" />
          <Sub x={520} y={384} t="Passenger information" />
        </g>
      </Inspectable>
      <Lab x={40} y={500} t="EVERY DAY" />
      {(
        [
          ['ACTION', 'Act on what happens now'],
          ['REACTION', 'Answer the unexpected'],
          ['PLANNING', 'Prepare known events'],
          ['COORDINATION', 'Bring every team together'],
        ] as const
      ).map(([t, s], i) => (
        <Inspectable
          key={t}
          id={`lc-mode-${i}`}
          title={t.charAt(0) + t.slice(1).toLowerCase()}
          body={`${s}.|One of the four parts of the role, every day.`}
        >
          <g>
            <circle className="tx-stage" cx={70 + i * 230} cy={556} r="14" />
            <Lab x={96 + i * 230} y={552} t={t} />
            <Sub x={96 + i * 230} y={574} t={s} />
          </g>
        </Inspectable>
      ))}
    </Layer>
  );
}

function Plans() {
  return (
    <Layer steps={[1]}>
      <Inspectable
        id="lc-plan"
        title="A passenger-care plan"
        body="One plan per station: what happens for passengers when an event hits it.|I built the plans of 42 Ligne C stations."
      >
        <Win x={40} y={186} w={460} h={330} title="CARE PLAN · SAINT-MICHEL NOTRE-DAME">
          {(
            [
              ['SAFETY', 'Passengers’ safety', 'M-10-12L0-16 10-12V0C10 8 0 14 0 14S-10 8-10 0Z'],
              ['REDIRECTION', 'Where passengers go instead', 'M-12 0H8M2-7L9 0 2 7M-12-12V12'],
              [
                'EXPERIENCE',
                'Their experience in our stations',
                'M-8-4A8 8 0 1 1 8-4M-12 12C-12 4 12 4 12 12',
              ],
            ] as const
          ).map(([t, s, d], i) => (
            <Fragment key={t}>
              <rect className="tx-table-row" x="58" y={226 + i * 90} width="424" height="74" rx="3" />
              <g className="tx-icon" transform={`translate(90 ${263 + i * 90})`}>
                <path d={d} />
              </g>
              <Lab x={126} y={256 + i * 90} t={t} />
              <Sub x={126} y={278 + i * 90} t={s} />
            </Fragment>
          ))}
        </Win>
      </Inspectable>
      <Lab x={580} y={200} t="FOR PLANNED EVENTS" c="warm" />
      <Inspectable
        id="lc-festive"
        title="Festive public events"
        body="Large public events near a station.|The plan prepares the crowd flows in advance."
      >
        <g>
          <g className="tx-icon" transform="translate(600 246)">
            <path d="M0-14V14M-14 0H14M-10-10L10 10M10-10L-10 10" />
          </g>
          <Lab x={630} y={244} t="FESTIVE PUBLIC EVENTS" />
        </g>
      </Inspectable>
      <Inspectable
        id="lc-works"
        title="Engineering works"
        body="Works that close tracks or entrances for a period.|The plan redirects passengers before they arrive."
      >
        <g>
          <rect className="works-mark" x="586" y="282" width="28" height="16" rx="2" />
          <Lab x={630} y={296} t="ENGINEERING WORKS" />
        </g>
      </Inspectable>
      <Lab x={580} y={360} t="FOR THE UNEXPECTED" c="warm" />
      <Inspectable
        id="lc-incident"
        title="Incidents affecting circulation"
        body="An incident that stops or slows trains.|The plan says who does what, at once."
      >
        <g>
          <path className="tx-alert" d="M600 388L614 412H586Z" />
          <Lab x={630} y={406} t="INCIDENTS ON THE LINE" />
        </g>
      </Inspectable>
      <Arrow from={[572, 260]} to={[508, 300]} />
      <Arrow from={[572, 400]} to={[508, 380]} />
      <Inspectable
        id="lc-42"
        title="42 stations, one plan each"
        body="Every station in my scope had its own plan.|Each station has its own exits, flows and partners."
      >
        <g>
          <Lab x={40} y={560} t="42 STATIONS · ONE PLAN EACH" c="strong" />
          {Array.from({ length: 42 }, (_, i) => (
            <rect
              key={i}
              className="tx-tile-s"
              x={40 + i * 21}
              y={578}
              width="16"
              height="20"
              rx="2"
              style={vars({ '--i': i })}
            />
          ))}
        </g>
      </Inspectable>
    </Layer>
  );
}

// The station from above: platforms, hall, exits, street.
function StationPlan() {
  return (
    <g>
      <rect className="tx-layer" x="40" y="200" width="620" height="300" rx="4" />
      {[236, 296].map((y) => (
        <rect key={y} className="tx-layer top" x="70" y={y} width="560" height="36" rx="2" />
      ))}
      <T x={80} y={258} className="tx-win-t">
        PLATFORM · TRACK 1
      </T>
      <T x={80} y={318} className="tx-win-t">
        PLATFORM · TRACK 2
      </T>
      <rect className="tx-layer" x="200" y="360" width="300" height="90" rx="3" />
      <T x={210} y={380} className="tx-win-t">
        TICKET HALL
      </T>
      <path className="tx-gates" d="M260 440V420M280 440V420M300 440V420M320 440V420" />
      {[
        [120, 'EXIT A'],
        [580, 'EXIT B'],
      ].map(([x, t]) => (
        <Fragment key={t}>
          <rect className="tx-exit" x={(x as number) - 30} y="476" width="60" height="22" rx="2" />
          <T x={x} y={491} className="center tx-win-t">
            {t}
          </T>
        </Fragment>
      ))}
      <path className="tx-route" d="M40 540H960" />
      <T x={48} y={532} className="tx-win-t">
        STREET
      </T>
      <rect className="tx-exit" x="860" y="548" width="70" height="22" rx="2" />
      <T x={895} y={563} className="center tx-win-t">
        BUS STOP
      </T>
    </g>
  );
}

const actors: [string, string, string, string, Pt[]][] = [
  [
    'lc-staff',
    'STATION STAFF',
    'Coordinated',
    'The station staff concerned, on the platforms and at the gates.|I coordinated them, each with the tools and information to act.',
    [
      [380, 270],
      [440, 330],
      [340, 430],
    ],
  ],
  [
    'lc-welcome',
    'WELCOME PROVIDERS',
    'What each would do, negotiated',
    'Teams who greet and guide passengers at the entrances.|I negotiated what each would do and obtained their commitment.',
    [
      [120, 466],
      [580, 466],
    ],
  ],
  [
    'lc-authorities',
    'LOCAL AUTHORITIES',
    'Commitment obtained',
    'The town authorities around the station.|I obtained their commitment, or coordinated an existing arrangement.',
    [[760, 590]],
  ],
];

function OnTheGround() {
  return (
    <Layer steps={[2]}>
      <StationPlan />
      {actors.map(([id, t, s, body, pts], i) => (
        <Inspectable key={id} id={id} title={t.charAt(0) + t.slice(1).toLowerCase()} body={body}>
          <g>
            {pts.map(([x, y], j) =>
              id === 'lc-authorities' ? (
                <TownHall key={j} x={x} y={y} />
              ) : (
                <Fragment key={j}>
                  <User x={x} y={y} s={0.75} c="on" />
                  <Sheet x={x + 12} y={y - 26} />
                </Fragment>
              ),
            )}
            <Lab x={700} y={226 + i * 92} t={t} />
            <Sub x={700} y={248 + i * 92} t={s} />
          </g>
        </Inspectable>
      ))}
      <Inspectable
        id="lc-tools"
        title="The tools and information to act"
        body="Each person got the plan’s part that concerned them.|They could act without waiting for instructions."
      >
        <g>
          <Sheet x={700} y={490} />
          <Lab x={726} y={506} t="EACH WITH THE TOOLS" c="warm" />
          <Sub x={726} y={526} t="And the information to act" />
        </g>
      </Inspectable>
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
      <Line42 />
      <WhyThisRole />
      <Plans />
      <OnTheGround />
      <Measure />
    </>
  );
}
