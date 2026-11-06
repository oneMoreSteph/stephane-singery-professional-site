// Galileo · EFREI: why engineering, studying alongside work, and the foundation it builds under my production work.
import { Fragment } from 'react';
import { Inspectable } from '~/drawings/Inspectable';
import { Arrow, Db, Header, Lab, Move, OpsDefs, Sub, T, User } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';

const work: [string, string, number][] = [
  ['FOODCHÉRI', 'Data Platform', 150],
  ['HEETCH', 'SQL models', 350],
  ['VERISURE', 'Observability', 550],
];

function Why() {
  return (
    <Layer steps={[0]}>
      <Inspectable id="e-work" title="My production work">
        <g>
          <Lab x={40} y={108} t="MY PRODUCTION WORK" c="strong" />
          {work.map(([t, s, x]) => (
            <Fragment key={t}>
              <Db cx={x} y={124} w={96} h={62} />
              <Lab x={x} y={208} t={t} c="center" />
              <Sub x={x} y={228} t={s} c="center" />
            </Fragment>
          ))}
        </g>
      </Inspectable>
      {work.map(([t, , x]) => (
        <path key={t} className="tx-link" d={`M${x} 240V272`} />
      ))}
      <Inspectable id="e-props" title="What holds it up?">
        <g>
          <rect className="tx-layer-q" x="40" y="276" width="620" height="84" rx="4" />
          <Lab x={350} y={325} t="SOFTWARE FOUNDATIONS ?" c="center warm" />
          <rect className="tx-layer-q" x="40" y="376" width="620" height="84" rx="4" />
          <Lab x={350} y={425} t="SYSTEMS FOUNDATIONS ?" c="center warm" />
        </g>
      </Inspectable>
      <Arrow from={[720, 340]} to={[668, 340]} />
      <Inspectable id="e-eng" title="Experienced engineers">
        <g>
          {[760, 815, 870, 925].map((x) => (
            <User key={x} x={x} y={345} />
          ))}
          <Lab x={842} y={300} t="HEETCH ENGINEERS" c="center" />
          <Sub x={842} y={375} t="Showed me how much rests on it" c="center" />
        </g>
      </Inspectable>
      <Arrow from={[842, 395]} to={[842, 470]} />
      <Inspectable id="e-torch" title="Most studied at EFREI">
        <g>
          <Lab x={842} y={500} t="MOST STUDIED AT EFREI" c="center warm" />
          <Sub x={842} y={522} t="I enrolled" c="center" />
        </g>
      </Inspectable>
    </Layer>
  );
}

const yx = (y: number) => 190 + (y - 2025) * 250;
const years: [string, string][] = [
  ['done', 'YEAR 1'],
  ['now', 'YEAR 2 · NOW'],
  ['next', 'YEAR 3'],
];

function AlongsideWork() {
  return (
    <Layer steps={[1]}>
      {[2025, 2026, 2027, 2028].map((y) => (
        <Fragment key={y}>
          <path className="tx-grid" d={`M${yx(y)} 150V470`} />
          <T x={yx(y)} y={140} className="tx-sub center">
            {String(y)}
          </T>
        </Fragment>
      ))}
      <Inspectable id="e-crane" title="EFREI">
        <g>
          <Lab x={40} y={218} t="EFREI" />
          <Sub x={40} y={238} t="Degree" />
        </g>
      </Inspectable>
      {years.map(([cls, t], i) => (
        <Inspectable key={t} id={`e-y-${i}`} title={t}>
          <g>
            <rect className={`tx-track ${cls}`} x={yx(2025 + i) + 3} y="196" width="244" height="46" rx="3" />
            <Lab x={yx(2025 + i) + 125} y={224} t={t} c="center" />
          </g>
        </Inspectable>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Move path={`M${360 + i * 90} 250V400`} dur={4} begin={i * 1.3}>
            <circle className="tx-alert" r="6" />
          </Move>
        </g>
      ))}
      <Inspectable id="e-work2" title="At Verisure, as an apprentice">
        <g>
          <Lab x={596} y={330} t="WHAT I LEARN GOES INTO WHAT I BUILD" />
        </g>
      </Inspectable>
      <Inspectable id="e-app" title="The apprentice">
        <g>
          <Lab x={40} y={428} t="VERISURE" />
          <Sub x={40} y={448} t="Apprentice" />
          <rect className="tx-track done" x={yx(2025) + 3} y="406" width="744" height="46" rx="3" />
          <Lab x={yx(2025) + 375} y={434} t="DATA QUALITY AND OBSERVABILITY IN PRODUCTION" c="center" />
        </g>
      </Inspectable>
      <Inspectable id="e-grad" title="Graduation">
        <g>
          <Lab x={yx(2028)} y={110} t="GRADUATION EXPECTED" c="end warm" />
          <path className="tx-promise" d={`M${yx(2028)} 118V470`} />
        </g>
      </Inspectable>
      <Sub x={40} y={534} t="The degree covers" />
      {['COMPUTER SCIENCE', 'BIG DATA', 'MACHINE LEARNING'].map((t, i) => (
        <Inspectable key={t} id={`e-sub-${i}`} title={t.charAt(0) + t.slice(1).toLowerCase()}>
          <g>
            <Lab x={190 + i * 260} y={530} t={t} />
          </g>
        </Inspectable>
      ))}
    </Layer>
  );
}

const blocks: [string, string, React.ReactNode][] = [
  [
    'ALGORITHMS · PROGRAMMING',
    'Write software that holds.',
    <path d="M-14-10L-24 0-14 10M14-10L24 0 14 10M6-14L-6 14" />,
  ],
  [
    'DATABASES',
    'Model and store Data.',
    <>
      <ellipse cy="-9" rx="16" ry="6" />
      <path d="M-16-9V9C-16 16 16 16 16 9V-9" />
    </>,
  ],
  [
    'SYSTEMS · NETWORKS',
    'What everything runs on.',
    <>
      <circle r="4" />
      <circle cx="-18" cy="-9" r="4" />
      <circle cx="18" cy="-9" r="4" />
      <circle cx="0" cy="13" r="4" />
      <path d="M-15-7L-3-2M15-7L3-2M0 4V9" />
    </>,
  ],
  ['CLOUD', 'Run it at scale.', <path d="M-14 11C-24 11-24-2-14-2-13-12 3-14 7-5 17-7 21 11 11 11Z" />],
  [
    'BIG DATA',
    'Volume and distribution.',
    <>
      <rect x="-20" y="-10" width="11" height="20" />
      <rect x="-5" y="-10" width="11" height="20" />
      <rect x="10" y="-10" width="11" height="20" />
    </>,
  ],
  [
    'MACHINE LEARNING',
    'Learn from Data.',
    <>
      <circle cx="-16" cy="-8" r="3.5" />
      <circle cx="-16" cy="8" r="3.5" />
      <circle cx="16" r="3.5" />
      <circle r="3.5" />
      <path d="M-13-7L-3-1M-13 7L-3 1M3 0H13" />
    </>,
  ],
];
const ly = (i: number) => 584 - i * 68;

function Foundation() {
  return (
    <Layer steps={[2]}>
      <Inspectable id="e-work3" title="What the foundation carries">
        <g>
          <rect className="tx-layer top" x="40" y="164" width="920" height="60" rx="4" />
          <Lab x={500} y={200} t="WHAT I BUILD IN PRODUCTION" c="center strong" />
        </g>
      </Inspectable>
      {blocks.map(([t, b, icon], i) => (
        <Inspectable key={t} id={`e-b${i}`} title={t.charAt(0) + t.slice(1).toLowerCase()}>
          <g>
            <rect className="tx-layer" x="40" y={ly(i)} width="920" height="60" rx="4" />
            <g className="tx-icon" transform={`translate(90 ${ly(i) + 30})`}>
              {icon}
            </g>
            <Lab x={140} y={ly(i) + 35} t={t} />
            <Sub x={940} y={ly(i) + 35} t={b} c="end" />
          </g>
        </Inspectable>
      ))}
      <Arrow from={[20, 640]} to={[20, 196]} />
      <Lab x={40} y={128} t="EACH BLOCK CARRIES THE NEXT" c="warm" />
    </Layer>
  );
}

export default function EducationScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="EFREI · ENGINEERING DEGREE · 2025–2028" />
      <Why />
      <AlongsideWork />
      <Foundation />
    </>
  );
}
