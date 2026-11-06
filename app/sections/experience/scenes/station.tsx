// Earth · Transilien Ligne C: the line on top, one station in cross-section below, each step adding its answer.
// Station layout and measures are illustrative.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { OpsDefs, T, vars, type Pt, seqN } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { Crew, FlowArrow, Line, Pill } from '~/drawings/ops';

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

// ---------- The station in cross-section, the same for every step ----------
function Stairs({ x, y1, y2, dir = 1 }: { x: number; y1: number; y2: number; dir?: number }) {
  const n = 5;
  const w = 44;
  const h = (y2 - y1) / n;
  return (
    <path
      className="stn-stairs"
      d={`M${x} ${y1}${Array.from({ length: n }, () => `h${(w / n) * dir}v${h}`).join('')}`}
    />
  );
}
/** A passenger information board: a departure board with an "i" badge. */
function Screen({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g className="stn-screen" data-id={id} transform={`translate(${x} ${y})`}>
      <rect width="64" height="26" rx="3" />
      <circle className="scr-badge" cx="13" cy="13" r="7" />
      <path className="scr-i" d="M13 10v7M13 7.5v.5" />
      <path className="scr-lines" d="M26 9h30M26 14h22M26 19h26" />
    </g>
  );
}
function Track({ y }: { y: number }) {
  return (
    <g className="stn-track">
      <rect className="stn-ballast" x="110" y={y} width="780" height="22" />
      <Line d={`M110 ${y + 11}H890`} c="stn-ties" />
      <Line d={`M110 ${y + 5}H890`} c="stn-railline" />
      <Line d={`M110 ${y + 17}H890`} c="stn-railline" />
    </g>
  );
}

function Station() {
  return (
    <g className="stn-base">
      <rect className="stn-frame" x="40" y="190" width="920" height="430" rx="4" />
      {[
        [300, 246, 60, 54],
        [372, 262, 42, 38],
        [430, 236, 54, 64],
        [880, 250, 50, 50],
      ].map(([x, y, w, h]) => (
        <rect key={x} className="stn-building" x={x} y={y} width={w} height={h} />
      ))}
      <Line d="M40 300H960" c="stn-ground" />
      <g className="stn-bus">
        <path d="M916 300V262" />
        <rect x="904" y="250" width="24" height="14" rx="2" />
      </g>
      <T x={916} y={316} className="center stn-tag">
        BUS STOP
      </T>
      <rect className="stn-hall" x="110" y="330" width="780" height="100" rx="2" />
      <Stairs x={150} y1={300} y2={330} />
      <Stairs x={806} y1={300} y2={330} dir={-1} />
      <T x={190} y={292} className="center stn-door">
        A
      </T>
      <T x={810} y={292} className="center stn-door">
        B
      </T>
      <g className="stn-gates">
        {[468, 482, 496, 510, 524].map((x) => (
          <path key={x} d={`M${x} 368V408`} />
        ))}
      </g>
      <T x={496} y={424} className="center stn-tag">
        GATES
      </T>
      <Screen x={290} y={342} id="scr-hall" />
      <rect className="stn-tube" x="110" y="456" width="780" height="150" rx="2" />
      <Stairs x={250} y1={430} y2={520} />
      <Stairs x={750} y1={430} y2={520} dir={-1} />
      <Track y={498} />
      <rect className="stn-platform" x="110" y="522" width="780" height="40" />
      <Line d="M110 525H890" c="stn-edge" />
      <Line d="M110 559H890" c="stn-edge" />
      <Track y={564} />
      <T x={124} y={545} className="mini-label stn-plat-label">
        PLATFORM
      </T>
      <T x={876} y={495} className="end stn-tag">
        TRACK 1
      </T>
      <T x={876} y={600} className="end stn-tag">
        TRACK 2
      </T>
      <g className="stn-pass">
        <rect x="-160" y="-11" width="160" height="20" rx="5" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} className="stn-window" x={-148 + i * 38} y="-6" width="24" height="7" rx="1" />
        ))}
        <animateMotion path="M110 573H1050" dur="9s" repeatCount="indefinite" />
      </g>
      <g className="stn-train">
        <rect x="330" y="480" width="320" height="22" rx="5" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} className="stn-window" x={346 + i * 42} y="486" width="26" height="8" rx="1" />
        ))}
      </g>
      <path className="stn-pole" d="M182 492V522" />
      <Screen x={150} y={466} id="scr-quai" />
      <T x={182} y={460} className="center stn-tag stn-info-tag">
        INFO
      </T>
      <T x={322} y={336} className="center stn-tag stn-info-tag">
        INFO
      </T>
      <T x={56} y={214} className="mini-label stn-level">
        STREET
      </T>
      <T x={878} y={348} className="end mini-label stn-level">
        TICKET HALL
      </T>
      <T x={860} y={474} className="end mini-label stn-level">
        PLATFORMS
      </T>
      <T x={944} y={612} className="end stn-tag">
        THE RINGED STATION · ILLUSTRATIVE
      </T>
    </g>
  );
}

// ---------- 01 · Why this role: every counterpart drawn where they are ----------
const contacts: ['in' | 'out', string, string, number, number][] = [
  ['in', 'Station staff', 'At the gates and on the platforms', 520, 388],
  ['in', 'SNCF teams', 'Running the line', 180, 392],
  ['out', 'Passengers', 'In the stations and on the trains', 800, 540],
  ['out', 'Local authorities', 'Around the stations', 610, 252],
  ['out', 'Welcome providers', 'At the entrances', 820, 252],
];

function WhyThisRole() {
  return (
    <Layer steps={[0]}>
      {contacts.map(([, title, sub, x, y], i) => (
        <g key={title} className="seq5" {...seqN(i)}>
          <Inspectable id={`who-${i}`} title={title} body={sub}>
            <g className="contact" transform={`translate(${x} ${y})`}>
              <circle className="contact-ring" r="26" />
              <Crew x={0} y={0} s={0.9} />
              <T x={0} y={-30} className="center contact-name">
                {title.toUpperCase()}
              </T>
            </g>
          </Inspectable>
        </g>
      ))}
      <g className="seq-caption">
        {contacts.map(([side, title, sub], i) => (
          <g key={title} className="cap5" {...seqN(i)}>
            <rect className="map-panel" x="52" y="222" width="290" height="64" rx="3" />
            <T
              x={68}
              y={244}
              className="mini-label seq-head"
            >{`${i + 1} / 5 · ${side === 'in' ? 'INTERNAL' : 'EXTERNAL'}`}</T>
            <T x={68} y={270} className="label tiny">{`${title} · ${sub.toLowerCase()}`}</T>
          </g>
        ))}
      </g>
      <rect className="map-panel" x="40" y="630" width="520" height="62" rx="4" />
      <T x={58} y={652} className="mini-label muted-label">
        BEFORE · SNCF RÉSEAU
      </T>
      <T x={58} y={676} className="label small">
        Capacity, years ahead
      </T>
      <FlowArrow d="M300 671H330" />
      <T x={342} y={652} className="mini-label warm">
        LIGNE C
      </T>
      <T x={342} y={676} className="label small">
        The day itself, with passengers
      </T>
      <rect className="map-panel" x="570" y="630" width="390" height="62" rx="4" />
      <T x={586} y={652} className="mini-label">
        EVERY DAY
      </T>
      {['ACTION', 'REACTION', 'PLANNING', 'COORDINATION'].map((t, i) => (
        <Pill key={t} x={586 + i * 88} y={662} w={i === 3 ? 102 : 82} label={t} c="pill-tag" />
      ))}
    </Layer>
  );
}

// ---------- 02 · The plans: one situation at a time ----------
const triggers: [string, string][] = [
  ['PLANNED', 'Engineering works'],
  ['PLANNED', 'Festive public event'],
  ['UNEXPECTED', 'Incident on the line'],
];
const Hatch = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <rect className="cov-safety" x={x} y={y} width={w} height={h} />
);
const Walk = ({ pts }: { pts: Pt[] }) => (
  <path className="cov-route" d={`M${pts.map((p) => p.join(' ')).join('L')}`} markerEnd="url(#opsArrow)" />
);
function Welcome({ x, y, label = 'WELCOME' }: { x: number; y: number; label?: string }) {
  return (
    <g className="cov-welcome" transform={`translate(${x} ${y})`}>
      <circle r="9" />
      <path d="M-3 0h6M0-3v6" />
      <T x={14} y={4} className="cov-tag">
        {label}
      </T>
    </g>
  );
}
function Info({ x, y }: { x: number; y: number }) {
  return (
    <>
      <g className="cov-screen">
        <Screen x={x} y={y} id="i" />
      </g>
      <T x={x + 32} y={y + 42} className="center cov-tag">
        INFORMATION
      </T>
    </>
  );
}
const Note = ({ x, y, t }: { x: number; y: number; t: string }) => (
  <T x={x} y={y} className="center cov-note">
    {t}
  </T>
);
// The way out through entrance A: platform → stairs → hall → stairs → street.
const outA = (start: number): Pt[] => [
  [start, 542],
  [300, 542],
  [294, 524],
  [252, 434],
  [204, 422],
  [196, 334],
  [154, 304],
  [150, 290],
];
const situations: React.ReactNode[] = [
  <>
    <Hatch x={600} y={522} w={290} h={40} />
    <Note x={745} y={548} t="CLOSED FOR WORKS" />
    <path className="cov-closed" d="M716 462l24 24M740 462l-24 24" />
    <Walk pts={[...outA(580), [90, 290]]} />
    <Welcome x={232} y={396} />
    <Info x={290} y={342} />
  </>,
  <>
    <g className="cov-crowd">
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={70 + (i % 6) * 13 + (i > 11 ? 6 : 0)} cy={262 + Math.floor(i / 6) * 10} r="3.2" />
      ))}
    </g>
    <Hatch x={458} y={360} w={76} h={54} />
    <Note x={496} y={446} t="CAPACITY AT THE GATES" />
    <Walk
      pts={[
        [150, 290],
        [154, 304],
        [196, 334],
        [210, 396],
        [452, 396],
      ]}
    />
    <T x={130} y={252} className="center cov-tag cov-tag--route">
      IN
    </T>
    <Walk
      pts={[
        [540, 396],
        [760, 396],
        [764, 334],
        [806, 304],
        [850, 290],
      ]}
    />
    <T x={870} y={252} className="center cov-tag cov-tag--route">
      OUT
    </T>
    <Welcome x={232} y={270} />
    <Welcome x={760} y={270} />
  </>,
  <>
    <g className="cov-alert" transform="translate(490 470)">
      <path d="M0-14L13 8H-13Z" />
      <path d="M0-6v6M0 3v1" />
    </g>
    <T x={512} y={474} className="cov-note">
      TRAIN STOPPED
    </T>
    <Hatch x={330} y={522} w={320} h={40} />
    <Note x={490} y={548} t="PLATFORM CLOSED" />
    <Walk pts={[...outA(320), [880, 290]]} />
    <Welcome x={860} y={262} label="" />
    <T x={916} y={242} className="center cov-tag">
      ALTERNATIVE
    </T>
    <Info x={290} y={342} />
    <Info x={150} y={466} />
  </>,
];

function Plans() {
  return (
    <Layer steps={[1]}>
      {triggers.map(([k, t], i) => (
        <g
          key={t}
          className="trigger"
          data-pick={i}
          role="button"
          tabIndex={0}
          aria-label={`Show the plan for ${t.toLowerCase()}`}
          {...seqN(i)}
          transform={`translate(${250 + i * 168} 198)`}
        >
          <rect width="160" height="38" rx="3" />
          <T x={12} y={15} className="mini-label">
            {k}
          </T>
          <T x={12} y={31} className="label tiny">
            {t}
          </T>
          <T x={148} y={25} className="end trigger-cue">
            ›
          </T>
        </g>
      ))}
      {situations.map((c, i) => (
        <g key={i} className="cover-case" {...seqN(i)}>
          {c}
        </g>
      ))}
      <rect className="map-panel" x="40" y="630" width="920" height="62" rx="4" />
      <T x={58} y={652} className="mini-label">
        WHAT EACH PLAN COVERS
      </T>
      <g transform="translate(58 664)">
        <Hatch x={0} y={0} w={26} h={16} />
        <T x={36} y={13} className="label small">
          Passengers’ safety
        </T>
      </g>
      <g transform="translate(270 664)">
        <path className="cov-route" d="M0 8h26" markerEnd="url(#opsArrow)" />
        <T x={36} y={13} className="label small">
          Their redirection
        </T>
      </g>
      <g transform="translate(470 672)">
        <g className="cov-welcome">
          <circle cx="10" r="9" />
          <path d="M7 0h6M10-3v6" />
        </g>
        <T x={30} y={5} className="label small">
          Their experience in our stations
        </T>
      </g>
      <T x={944} y={676} className="end mini-label warm">
        A PLAN FOR EACH STATION
      </T>
    </Layer>
  );
}

// ---------- 03 · On the ground: everyone named where they stand, holding the same plan sheet ----------
function NameTag({
  x,
  y,
  label,
  kind,
  anchor = 'start',
}: {
  x: number;
  y: number;
  label: string;
  kind: string;
  anchor?: string;
}) {
  const w = label.length * 7.4 + 18;
  const x0 = anchor === 'middle' ? x - w / 2 : x;
  return (
    <g className={`name-tag name-tag--${kind}`}>
      <rect x={x0.toFixed(1)} y={y - 13} width={w.toFixed(1)} height="20" rx="2" />
      <T x={x0 + 9} y={y + 1.5} className="tag-text">
        {label}
      </T>
    </g>
  );
}
function Sheet({ x, y }: { x: number; y: number }) {
  return (
    <g className="kit" transform={`translate(${x} ${y})`}>
      <rect width="11" height="14" rx="1" />
      <path d="M2.5 4.5h6M2.5 8h6M2.5 11h4" />
    </g>
  );
}
const posts: [string, string, string, Pt[], [number, number, string, string?][]][] = [
  [
    'prov',
    'Welcome providers',
    'External providers who greet and direct passengers at the entrances.',
    [
      [132, 284],
      [836, 284],
    ],
    [
      [132, 240, 'WELCOME PROVIDER', 'middle'],
      [836, 240, 'WELCOME PROVIDER', 'middle'],
    ],
  ],
  [
    'auth',
    'Local authorities',
    'The city side: public space, access and safety around the station.',
    [
      [624, 284],
      [676, 284],
    ],
    [[650, 240, 'LOCAL AUTHORITIES', 'middle']],
  ],
  [
    'staff',
    'Station staff',
    'The SNCF agents of the station, coordinated by me.',
    [
      [548, 396],
      [440, 548],
      [726, 474],
    ],
    [
      [570, 392, 'STATION STAFF'],
      [462, 552, 'STATION STAFF'],
      [748, 478, 'STATION STAFF'],
    ],
  ],
];
const postCaptions = [
  'Greet and direct passengers at the entrances',
  'Public space, access and safety outside',
  'Carry out the plan in the station',
];

function OnTheGround() {
  return (
    <Layer steps={[2]}>
      {posts.map(([kind, title, body, pts, tags], i) => (
        <g key={kind} className="seq3" {...seqN(i)}>
          <Inspectable id={`post-${i}`} title={title} body={body}>
            <g className="post">
              {pts.map(([x, y]) => (
                <Fragment key={`${x}${y}`}>
                  <Crew x={x} y={y} s={0.85} />
                  <Sheet x={x + 12} y={y - 4} />
                </Fragment>
              ))}
              {tags.map(([x, y, l, an]) => (
                <NameTag key={`${x}${y}`} x={x} y={y} label={l} kind={kind} anchor={an} />
              ))}
            </g>
          </Inspectable>
        </g>
      ))}
      <rect className="map-panel" x="40" y="630" width="920" height="62" rx="4" />
      <g transform="translate(60 646)" className="kit kit--big">
        <rect width="22" height="28" rx="2" />
        <path d="M5 8h12M5 14h12M5 20h8" />
      </g>
      <T x={98} y={654} className="mini-label warm">
        IN EVERYONE’S HANDS
      </T>
      <T x={98} y={678} className="label small">
        The plan I built, with the tools and information to act
      </T>
      <g className="seq-caption">
        {posts.map(([kind, title], i) => (
          <g key={kind} className="cap3" {...seqN(i)}>
            <Line d="M560 640V682" c="fine-rule" />
            <T x={580} y={654} className="mini-label seq-head">{`${i + 1} / 3 · ${title.toUpperCase()}`}</T>
            <T x={580} y={678} className="label small">
              {postCaptions[i]}
            </T>
          </g>
        ))}
      </g>
    </Layer>
  );
}

// ---------- 04 · The measure: two indicators per station ----------
const measureSteps: [string, string, string][] = [
  ['DEFINE', 'Indicators for', 'each station'],
  ['MONITOR', '', ''],
  ['FOLLOW', 'Measures required', 'and incentivised'],
];

function Measure() {
  return (
    <Layer steps={[3]}>
      <rect className="map-panel" x="90" y="220" width="820" height="330" rx="4" />
      <T x={116} y={252} className="mini-label warm">
        THE FIRST MECHANISM TO ASSESS THE PLANS
      </T>
      {measureSteps.map(([k, a, b], i) => (
        <g key={k} className="seq3" {...seqN(i)}>
          <g transform={`translate(${116 + i * 270} 276)`}>
            <rect className="step-box" width="240" height="220" rx="3" />
            <T x={16} y={26} className="mini-label">{`0${i + 1} · ${k}`}</T>
            {a ? (
              <>
                <T x={16} y={62} className="card-title">
                  {a}
                </T>
                <T x={16} y={86} className="card-title">
                  {b}
                </T>
              </>
            ) : null}
          </g>
        </g>
      ))}
      <FlowArrow d="M358 386H384" />
      <FlowArrow d="M628 386H654" />
      <g className="seq3" {...seqN(1)}>
        <Inspectable id="ind-staff" title="Staff work" body="How the people on site carried out the plan.">
          <g transform="translate(402 318)">
            <rect className="ind" width="208" height="72" rx="3" />
            <rect className="ind-swatch" x="14" y="16" width="6" height="14" />
            <T x={28} y={28} className="mini-label">
              STAFF WORK
            </T>
            <T x={14} y={56} className="label tiny">
              The plan carried out on site
            </T>
          </g>
        </Inspectable>
        <Inspectable
          id="ind-equip"
          title="Fixed equipment"
          body="The measures installed in stations and whether they did their job."
        >
          <g transform="translate(402 404)">
            <rect className="ind" width="208" height="72" rx="3" />
            <rect className="ind-swatch ind-swatch--equip" x="14" y="16" width="6" height="14" />
            <T x={28} y={28} className="mini-label">
              FIXED EQUIPMENT
            </T>
            <T x={14} y={56} className="label tiny">
              Installed, and doing its job
            </T>
          </g>
        </Inspectable>
      </g>
      <g className="seq3" {...seqN(2)}>
        <T x={672} y={400} className="card-title">
          by Île-de-France
        </T>
        <T x={672} y={424} className="card-title">
          Mobilités
        </T>
      </g>
      <T x={116} y={530} className="label small">
        Under each station on the line: its two indicators.
      </T>
      <g
        className="case-link"
        transform="translate(40 630)"
        data-open-case="verisure"
        tabIndex={0}
        role="button"
        aria-label="Open the Verisure experience"
      >
        <rect width="920" height="62" rx="3" />
        <T x={18} y={24} className="mini-label">
          THE SAME QUESTION, LATER IN DATA
        </T>
        <T x={18} y={46} className="label small">
          Does the system do its job? Data Quality and Observability at Verisure
        </T>
        <T x={900} y={38} className="chip-arrow end">
          ↗
        </T>
      </g>
    </Layer>
  );
}

export default function StationScene() {
  return (
    <>
      <OpsDefs />
      <Line42 />
      <Station />
      <WhyThisRole />
      <Plans />
      <OnTheGround />
      <Measure />
    </>
  );
}
