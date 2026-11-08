// Juice · European space ambition: the pull since childhood, the Data chain of a space system, and why Europe.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import {
  Arrow,
  Bars,
  CaseChip,
  Header,
  Lab,
  Move,
  OpsDefs,
  Server,
  Spark,
  Sub,
  T,
  User,
  vars,
  Win,
} from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { euContext, euMembers, euPoint } from '~/drawings/data/geography-eu';

function Satellite({ s }: { s: number }) {
  return (
    <g className="tx-sat" transform={`scale(${s})`}>
      <rect x="-9" y="-7" width="18" height="14" rx="2" />
      <path d="M-9 0H-32M9 0H32" />
      <rect x="-44" y="-7" width="14" height="14" />
      <rect x="30" y="-7" width="14" height="14" />
    </g>
  );
}

// ---------- The pull ----------
const TRANSFER = 'M218 265C350 120 580 110 713 235';
const SCIFI = 'M756 215Q860 160 950 108';
const roles = ['Scientists', 'Engineers', 'Operators', 'Analysts', 'Technicians'];

function Pull() {
  return (
    <Layer steps={[0]}>
      <Inspectable id="childhood" title="Since childhood">
        <g>
          {Array.from({ length: 70 }, (_, i) => (
            <circle
              key={i}
              className="star"
              cx={(((i * 137.5) % 960) + 20).toFixed(0)}
              cy={(((i * 89.3) % 440) + 70).toFixed(0)}
              r={(i % 3) * 0.5 + 0.6}
              style={vars({ '--i': i % 7 })}
            />
          ))}
          <Lab x={40} y={92} t="THE UNIVERSE" c="strong" />
          <Sub x={40} y={112} t="Since childhood" />
        </g>
      </Inspectable>
      <clipPath id="pullClip">
        <rect x="0" y="70" width="1000" height="460" />
      </clipPath>
      <g clipPath="url(#pullClip)">
        {[190, 330, 680].map((r) => (
          <circle key={r} className="tx-orbit" cx="40" cy="330" r={r} />
        ))}
        <circle className="tx-sun" cx="40" cy="330" r="36" />
      </g>
      <Lab x={20} y={392} t="SUN" />
      <circle className="tx-planet earth" cx="218" cy="265" r="15" />
      <Lab x={242} y={276} t="EARTH" />
      <circle className="tx-planet mars" cx="359" cy="415" r="10" />
      <Lab x={378} y={420} t="MARS" />
      <circle className="tx-planet jupiter" cx="713" cy="235" r="38" />
      <path
        className="tx-bands"
        d="M678 222Q713 230 748 222M676 240Q713 250 750 240M684 256Q713 262 742 256"
      />
      <Lab x={762} y={248} t="JUPITER" />
      <Inspectable id="exploration" title="Exploration">
        <g>
          <path className="tx-orbit strong" d={TRANSFER} />
          <Move path={TRANSFER} dur={12}>
            <Satellite s={0.55} />
          </Move>
          <Lab x={470} y={112} t="JUICE · ESA PROBE TO JUPITER" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="scifi" title="Science fiction">
        <g>
          <path className="tx-orbit" d={SCIFI} />
          <Move path={SCIFI} dur={7} rotate="auto">
            <path className="tx-ship" d="M-14 6L14 0-14-6-9 0Z" />
          </Move>
          <Lab x={960} y={196} t="SCIENCE FICTION" c="end" />
        </g>
      </Inspectable>
      <Sub x={960} y={512} t="Orbits not to scale" c="end" />
      <path className="tx-beam" d="M600 572L468 150" />
      <Inspectable id="larger" title="Larger than one person">
        <g>
          <path className="tx-div" d="M40 548H960" />
          <Lab x={40} y={590} t="MISSION CONTROL" c="strong" />
          <Sub x={40} y={612} t="Larger than one person" />
          {roles.map((t, i) => (
            <g key={t}>
              <User x={300 + i * 140} y={650} />
              <rect className="tx-app" x={324 + i * 140} y="618" width="46" height="32" rx="3" />
              <Spark x={330 + i * 140} y={624} w={34} h={20} vals={[0.2, 0.6, 0.4, 0.9]} />
              <Sub x={310 + i * 140} y={674} t={t} c="center" />
            </g>
          ))}
        </g>
      </Inspectable>
    </Layer>
  );
}

// ---------- The systems: the Data chain of a space system ----------
function Systems() {
  return (
    <Layer steps={[1]}>
      <Lab x={40} y={88} t="THE DATA CHAIN OF A SPACE SYSTEM" c="strong" />
      <Inspectable
        id="bigdata"
        title="Big Data · where my path goes"
        body="Big Data: Data whose volume, velocity and variety exceed ordinary tools, with two more Vs: veracity, how far it can be trusted, and value, what it brings. Variety: structured tables, semi-structured documents, unstructured files, images and signals.|The environment my path leads to: the field of my engineering degree, and the Data space systems produce."
      >
        <g>
          <Lab x={580} y={120} t="BIG DATA · WHERE MY PATH GOES" c="warm" />
          {['VOLUME', 'VELOCITY', 'VARIETY', 'VERACITY', 'VALUE'].map((t, i) => (
            <Fragment key={t}>
              <rect className="tx-track done" x={580 + i * 76} y={136} width="70" height="28" rx="14" />
              <T x={615 + i * 76} y={155} className="center tx-win-t">
                {t}
              </T>
            </Fragment>
          ))}
          <Sub x={580} y={190} t="Variety: structured, semi-structured, unstructured" />
          <Sub x={580} y={212} t="My degree’s field · the Data space systems produce" />
        </g>
      </Inspectable>
      <path className="tx-earth" d="M0 600Q500 470 1000 600V730H0Z" />
      <path className="tx-earth-l" d="M0 600Q500 470 1000 600" />
      <Inspectable id="chain-0" title="Generate">
        <g>
          <path className="tx-scan" d="M170 212L110 556H230Z" />
          <g transform="translate(170 200)">
            <Satellite s={1.4} />
          </g>
          <Lab x={170} y={126} t="GENERATE" c="center" />
          <Sub x={170} y={148} t="Instruments in orbit" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="chain-1" title="Transport">
        <g>
          <Arrow from={[205, 218]} to={[392, 492]} />
          <g className="tx-icon" transform="translate(412 512) scale(1.25)">
            <path d="M-22-14A24 24 0 0 0 16 22ZM-3 3L12-14M-3 3L-6 26H10" />
          </g>
          <Sub x={412} y={574} t="Ground station" c="center" />
          <Lab x={420} y={250} t="TRANSPORT" c="center" />
          <Sub x={420} y={272} t="Downlink, ground stations" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[440, 505]} to={[572, 476]} />
      <Inspectable id="chain-2" title="Process">
        <g>
          <Server x={578} y={434} w={104} />
          <Lab x={630} y={390} t="PROCESS" c="center" />
          <Sub x={630} y={412} t="Ground processing" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[688, 470]} to={[754, 430]} />
      <Inspectable id="chain-3" title="Use">
        <g>
          <Lab x={860} y={300} t="USE" c="center" />
          <Sub x={860} y={322} t="Operations, science, services" c="center" />
          <Win x={760} y={336} w={200} h={130} title="DATA PRODUCTS">
            <Bars x={778} y={370} w={164} h={82} vals={[0.4, 0.7, 0.5, 0.9, 0.65]} />
          </Win>
          <User x={800} y={540} s={0.9} />
          <User x={860} y={545} s={0.9} />
          <User x={920} y={540} s={0.9} />
        </g>
      </Inspectable>
      <Inspectable id="chain-today" title="My experience today">
        <g>
          <path className="tx-axis" d="M556 598V616H960V598" />
          <Lab x={758} y={648} t="MY EXPERIENCE TODAY" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="upstream" title="Further upstream">
        <g>
          <path className="tx-promise dashed" d="M60 598V616H500V598" />
          <Lab x={280} y={648} t="NEXT: FURTHER UPSTREAM" c="center warm" />
          <Arrow from={[640, 666]} to={[400, 666]} />
        </g>
      </Inspectable>
    </Layer>
  );
}

// ---------- Why Europe ----------
const ORBIT = 'M30 150Q300 60 620 150';
const stations = (
  [
    ['KIRUNA', 20.2, 67.9],
    ['REDU', 5.1, 50],
    ['CEBREROS', -4.4, 40.4],
  ] as const
).map(([t, lon, lat]) => [t, ...euPoint(lon, lat).map((v) => +v.toFixed(1))] as [string, number, number]);
const rowsEu: [string, string, string, string, React.ReactNode][] = [
  [
    'ring-0',
    'Understand',
    'UNDERSTAND',
    'Instruments and Data, known from the inside',
    <path className="tx-spark on" d="M-24 10L-12-4-2 4 10-12 24-6" />,
  ],
  [
    'ring-1',
    'Operate',
    'OPERATE',
    'Control centres run by European teams',
    <>
      <rect className="tx-app" x="-24" y="-16" width="48" height="30" rx="3" />
      <path className="tx-spark on" d="M-16 2L-6-6 4 0 16-8" />
    </>,
  ],
  [
    'ring-2',
    'Rely on',
    'RELY ON',
    'Services Europe can depend on',
    <path className="tx-icon-p" d="M0-18L15-11V1C15 9 6 15 0 18-6 15-15 9-15 1V-11ZM-6 0L-1 5 7-5" />,
  ],
];

function WhyEurope() {
  return (
    <Layer steps={[2]}>
      <Inspectable
        id="sovereignty"
        title="Built and run in Europe"
        body="Space, technology and communications that Europe can build, run and depend on."
      >
        <g>
          <g className="eu-map">
            <defs>
              <linearGradient id="euFadeX" gradientUnits="userSpaceOnUse" x1="425" x2="490" y1="0" y2="0">
                <stop stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
              </linearGradient>
              <linearGradient id="euFadeY" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="630" y2="690">
                <stop stopColor="#000" stopOpacity="0" />
                <stop offset="1" stopColor="#000" />
              </linearGradient>
              <mask id="euFade" maskUnits="userSpaceOnUse" x="0" y="100" width="520" height="600">
                <rect x="0" y="100" width="520" height="600" fill="url(#euFadeX)" />
                <rect x="0" y="100" width="520" height="600" fill="url(#euFadeY)" />
              </mask>
            </defs>
            <g mask="url(#euFade)">
              {euContext.map((c) => (
                <path key={c.name} d={c.d} className="eu-outside" />
              ))}
            </g>
            {euMembers.map((c) => (
              <path key={c.name} d={c.d} className="eu-member" />
            ))}
          </g>
          <T x={40} y={84} className="tx-label strong">
            THE EUROPEAN UNION · 27 COUNTRIES
          </T>
          <T x={40} y={106} className="tx-sub">
            Built and run in Europe
          </T>
        </g>
      </Inspectable>
      <Inspectable
        id="eu-sat"
        title="A European space system"
        body="Satellites and the ground stations that receive their Data."
      >
        <g>
          <path className="tx-orbit" d={ORBIT} />
          {stations.map(([t, x, y], i) => (
            <Fragment key={t}>
              <path className="tx-beam" style={vars({ '--i': i })} d={`M380 122L${x} ${y}`} />
              <path
                className="tx-station"
                transform={`translate(${x} ${y})`}
                d="M-11 8L0-6 11 8ZM-13-6A13 13 0 0 0 13-6"
              />
              <T x={x + 12} y={y + 4} className="tx-label">
                {t}
              </T>
            </Fragment>
          ))}
          <g className="tx-sat" transform="translate(380 109)">
            <rect x="-9" y="-7" width="18" height="14" rx="2" />
            <path d="M-9 0H-32M9 0H32" />
            <rect x="-44" y="-7" width="14" height="14" />
            <rect x="30" y="-7" width="14" height="14" />
          </g>
          <circle className="tx-alert" r="5">
            <animateMotion dur="18s" repeatCount="indefinite" path={ORBIT} />
          </circle>
          <T x={432} y={100} className="tx-label">
            SATELLITE
          </T>
          <T x={537} y={150} className="tx-sub">
            Gold: ESA ground stations
          </T>
        </g>
      </Inspectable>
      {rowsEu.map(([id, title, t, s, icon], i) => (
        <Inspectable key={id} id={id} title={title}>
          <g>
            <circle className="tx-stage" cx="575" cy={232 + i * 112} r="38" />
            <g className="tx-icon" transform={`translate(575 ${232 + i * 112})`}>
              {icon}
            </g>
            <T x={630} y={228 + i * 112} className="tx-label strong">
              {t}
            </T>
            <T x={630} y={250 + i * 112} className="tx-sub">
              {s}
            </T>
          </g>
        </Inspectable>
      ))}
      <Inspectable id="eu-rays" title="Positive influence">
        <g>
          <circle className="tx-stage" cx="575" cy="568" r="38" />
          <g className="tx-icon" transform="translate(575 568)">
            <circle r="20" />
            <path d="M-20 0H20M0-20C-11-9-11 9 0 20M0-20C11-9 11 9 0 20" />
          </g>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              className="tx-wave"
              style={vars({ '--i': i })}
              d={`M${622 + i * 14} ${548 - i * 3}Q${636 + i * 14} 568 ${622 + i * 14} ${588 + i * 3}`}
            />
          ))}
          <T x={680} y={564} className="tx-label warm">
            POSITIVE INFLUENCE
          </T>
          <T x={680} y={586} className="tx-sub">
            What Europe brings to the world
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

// ---------- The path: like Juice, one flyby at a time ----------
// Juice’s real flybys: Earth–Moon 2024, Venus 2025, Earth 2026, Earth 2029, then Jupiter in 2031. Not to scale.
const SUN = { x: 430, y: 320 };
const TILT = 0.7;
const VENUS_R = 95;
const EARTH_R = 155;
const JUP_R = 440;
const polar = (r: number, deg: number) =>
  [SUN.x + r * Math.cos((deg * Math.PI) / 180), SUN.y + TILT * r * Math.sin((deg * Math.PI) / 180)] as const;
const ease = (a: number, b: number, t: number) => a + ((b - a) * (1 - Math.cos(Math.PI * t))) / 2;
/** Juice’s radius from the Sun along its path: [angle, radius] knots, eased between them. */
const knots: [number, number][] = [
  [-45, EARTH_R],
  [150, VENUS_R],
  [440, EARTH_R],
  [500, 200],
  [560, EARTH_R],
  [720, JUP_R],
];
const radiusAt = (deg: number) => {
  const k = knots.findIndex(([a], i) => i > 0 && deg <= a);
  const [a0, r0] = knots[k - 1];
  const [a1, r1] = knots[k];
  return ease(r0, r1, (deg - a0) / (a1 - a0));
};
const trace = (from: number, to: number) =>
  Array.from({ length: Math.round((to - from) / 4) + 1 }, (_, i) => {
    const deg = from + i * 4;
    const [x, y] = polar(radiusAt(deg), deg);
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join('');
const LOOPS = trace(-45, 560);
const CRUISE = trace(560, 720);
const FULL = `${LOOPS}${CRUISE.replace(/^M/, 'L')}`;
const JUP = { x: SUN.x + JUP_R, y: SUN.y };
/** Flybys: [angle on the path, label, period, flyby, planet]. */
const FLY: [number, string, string, string, string][] = [
  [-45, 'RAIL', 'SNCF · 2010–2019', 'Earth–Moon flyby · 2024', 'earth'],
  [150, 'FOOD-TECH', 'FoodChéri · 2016–2022', 'Venus flyby · 2025', 'venus'],
  [440, 'MOBILITY', 'Heetch · 2022–2025', 'Earth flyby · 2026', 'earth'],
  [560, 'HOME SECURITY', 'Verisure · since 2025', 'Earth flyby · 2029', 'earth'],
];

function ThePath() {
  return (
    <Layer steps={[3]}>
      {Array.from({ length: 60 }, (_, i) => (
        <circle
          key={i}
          className="star"
          cx={(((i * 151.7) % 940) + 30).toFixed(0)}
          cy={(((i * 97.1) % 420) + 120).toFixed(0)}
          r={(i % 3) * 0.5 + 0.6}
          style={vars({ '--i': i % 7 })}
        />
      ))}
      <Lab x={40} y={92} t="THE PATH" c="strong" />
      <Sub x={40} y={114} t="Like Juice: each flyby adds momentum." />
      <Inspectable
        id="path-system"
        title="Juice’s path to Jupiter"
        body="Juice cannot fly straight to Jupiter: it gains speed from four flybys of the Moon, Earth and Venus, then cruises out.|My path works the same way: each domain adds momentum."
      >
        <g>
          {[VENUS_R, EARTH_R].map((r) => (
            <ellipse key={r} className="tx-orbit" cx={SUN.x} cy={SUN.y} rx={r} ry={r * TILT} />
          ))}
          <path
            className="tx-orbit"
            d={`M${polar(JUP_R, -38).join(' ')}A${JUP_R} ${JUP_R * TILT} 0 0 1 ${polar(JUP_R, 38).join(' ')}`}
          />
          <circle className="tx-sun" cx={SUN.x} cy={SUN.y} r="30" />
          <Lab x={SUN.x - 40} y={SUN.y + 5} t="SUN" c="end" />
          <path className="ap-traj" d={LOOPS} />
          <Move path={FULL} dur={20}>
            <Satellite s={0.42} />
          </Move>
        </g>
      </Inspectable>
      {FLY.map(([deg, t, s, fly, planet], k) => {
        const [x, y] = polar(radiusAt(deg), deg);
        const [mx, my] = polar(radiusAt(deg) + 30, deg);
        return (
          <Inspectable
            key={t}
            id={`path-fly-${k}`}
            title={fly}
            body={`${t.charAt(0)}${t.slice(1).toLowerCase()} · ${s}.|A domain that sharpened my skills, and a team I grew with.`}
          >
            <g>
              <circle className={`tx-planet ${planet}`} cx={x} cy={y} r={planet === 'venus' ? 10 : 12} />
              {k === 0 && <circle className="ap-moon" cx={x + 18} cy={y - 14} r="4" />}
              <circle className="ap-mark" cx={mx} cy={my} r="11" />
              <T x={mx} y={my + 4} className="center tx-win-t dark">
                {String(k + 1)}
              </T>
            </g>
          </Inspectable>
        );
      })}
      <Inspectable
        id="path-domains"
        title="Four domains, four flybys"
        body="Rail, food-tech, mobility and home security: the same skills, sharper each time.|Open to every professional domain."
      >
        <g>
          {FLY.map(([, t, s], k) => (
            <Fragment key={t}>
              <circle className="ap-mark" cx={52} cy={180 + k * 66} r="11" />
              <T x={52} y={184 + k * 66} className="center tx-win-t dark">
                {String(k + 1)}
              </T>
              <Lab x={72} y={185 + k * 66} t={t} />
              <Sub x={72} y={205 + k * 66} t={s} />
            </Fragment>
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <User key={i} x={58 + i * 22} y={474} s={0.55} c="on" />
          ))}
          <Sub x={40} y={500} t="The teams I grew with" />
        </g>
      </Inspectable>
      <Inspectable
        id="path-next"
        title="The next domain"
        body="After the flybys, the cruise: the next domain, whatever it is.|I grow with the teams I join, and they grow with me."
      >
        <g>
          <path className="ap-cruise" d={CRUISE} />
          <Lab x={640} y={146} t="NEXT DOMAIN" c="center" />
          <Sub x={640} y={166} t="Open to every domain" c="center" />
        </g>
      </Inspectable>
      <Inspectable
        id="path-goal"
        title="European space, the ultimate goal"
        body="The systems that generate, move and use Data in space, for Europe’s technological sovereignty.|Where the path leads."
      >
        <g>
          <g className="ap-eu" transform={`translate(${JUP.x} ${JUP.y})`}>
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="90s"
                repeatCount="indefinite"
              />
              {Array.from({ length: 12 }, (_, i) => (
                <path
                  key={i}
                  transform={`rotate(${i * 30}) translate(0 -58)`}
                  d="M0.00 -4.20 L1.00 -1.38 L3.99 -1.30 L1.62 0.53 L2.47 3.40 L0.00 1.70 L-2.47 3.40 L-1.62 0.53 L-3.99 -1.30 L-1.00 -1.38Z"
                />
              ))}
            </g>
          </g>
          <circle className="tx-planet jupiter" cx={JUP.x} cy={JUP.y} r="40" />
          <path
            className="tx-bands"
            d={`M${JUP.x - 36} ${JUP.y - 13}Q${JUP.x} ${JUP.y - 5} ${JUP.x + 36} ${JUP.y - 13}M${JUP.x - 39} ${JUP.y + 4}Q${JUP.x} ${JUP.y + 14} ${JUP.x + 39} ${JUP.y + 4}M${JUP.x - 31} ${JUP.y + 21}Q${JUP.x} ${JUP.y + 28} ${JUP.x + 31} ${JUP.y + 21}`}
          />
          <Lab x={JUP.x} y={JUP.y + 82} t="EUROPEAN SPACE" c="center warm" />
          <Sub x={JUP.x} y={JUP.y + 102} t="The ultimate goal" c="center" />
        </g>
      </Inspectable>
      <Sub x={960} y={540} t="Orbits not to scale" c="end" />
      <path className="tx-div" d="M40 566H960" />
      <Lab x={40} y={600} t="EVERY DOMAIN SHARPENS THE SKILLS" c="warm" />
      <Sub x={40} y={624} t="I grow with the teams I join, and they grow with me." />
      <CaseChip
        x={560}
        y={578}
        w={400}
        to="transfer"
        kicker="JUICE · EUROPEAN SPACE · WHAT I BRING"
        sub="How my experience transfers"
      />
    </Layer>
  );
}

export default function AmbitionScene() {
  return (
    <>
      <Header kicker="EUROPEAN SPACE · MY GOAL" />
      <OpsDefs />
      <Pull />
      <Systems />
      <WhyEurope />
      <ThePath />
    </>
  );
}
