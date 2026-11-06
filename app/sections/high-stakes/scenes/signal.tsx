// ISS · Verisure, signal or noise: alerts that are right and still noise, and the override that requalifies them.
import { Inspectable } from '~/drawings/Inspectable';
import { Header, OpsDefs, T, vars } from '~/drawings/kit';
import { Layer } from '~/drawings/Layer';
import { FlowArrow, Line, ReadoutChip } from '~/drawings/ops';

// ---------- 01 · The stakes: real alerts buried under valid but harmless ones ----------
const rain = Array.from({ length: 14 }, (_, i) => ({
  x: 90 + ((i * 53) % 420),
  real: [3, 8, 12].includes(i),
  d: (i * 0.43) % 6,
}));

function Stakes() {
  return (
    <Layer steps={[0]}>
      <T x={60} y={150} className="mini-label">
        TESTS FIRING
      </T>
      {Array.from({ length: 24 }, (_, i) => (
        <circle
          key={i}
          className="test-dot"
          style={vars({ '--i': i })}
          cx={80 + (i % 12) * 36}
          cy={180 + Math.floor(i / 12) * 30}
          r="7"
        />
      ))}
      {rain.map(({ x, real, d }, i) => (
        <g key={i} className={`drop ${real ? 'is-real' : ''}`}>
          <rect x="-22" y="-9" width="44" height="18" rx="3" />
          <animateMotion
            path={`M${x} 240L${600 + (x % 5) * 8} 560`}
            dur="6s"
            begin={`-${d.toFixed(2)}s`}
            repeatCount="indefinite"
          />
        </g>
      ))}
      <Inspectable
        id="queue"
        title="The team’s queue"
        body="Every valid alert reached the team, harmless or not. The real ones were buried under the rest."
      >
        <g transform="translate(580 420)">
          <rect className="queue" width="300" height="230" rx="4" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect
              key={i}
              className={`q-item ${i === 6 ? 'is-real' : ''}`}
              x="16"
              y={14 + i * 23}
              width="268"
              height="16"
              rx="2"
            />
          ))}
          <T x={0} y={-12} className="mini-label">
            A TEAM’S ALERT QUEUE
          </T>
        </g>
      </Inspectable>
      <Inspectable
        id="noise"
        title="Right, and still noise"
        body="An alert technically valid but operationally harmless. Each one costs attention."
      >
        <g transform="translate(60 520)">
          <rect className="legend-chip" width="44" height="18" rx="3" />
          <T x={56} y={14} className="label small">
            Valid but harmless
          </T>
        </g>
      </Inspectable>
      <Inspectable
        id="real"
        title="A real problem"
        body="An alert on business-critical Data that needs action. Lost in the flood, it waits."
      >
        <g transform="translate(60 556)">
          <rect className="legend-chip is-real" width="44" height="18" rx="3" />
          <T x={56} y={14} className="label small">
            Needs action
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

// ---------- 02 · Why an override: detection keeps running; a qualification gate decides who is alerted ----------
function WhyOverride() {
  return (
    <Layer steps={[1]}>
      <Inspectable
        id="detect"
        title="Detection"
        body="Every test keeps running and detecting. An override never switches a test off."
      >
        <g transform="translate(60 300)">
          <rect className="layer-band" width="260" height="120" rx="4" />
          <T x={20} y={34} className="mini-label">
            DETECTION
          </T>
          <T x={20} y={64} className="label small">
            Every test keeps running
          </T>
          <T x={20} y={88} className="label small">
            525 a day
          </T>
        </g>
      </Inspectable>
      <Inspectable
        id="gate"
        title="Qualification, in the common layer"
        body="I made requalifying an alert a capability of the common layer, available to every observability domain, not a workaround for only one of them."
      >
        <g transform="translate(520 360)">
          <path className="prism" d="M-50 -70L50 0 -50 70Z" />
          <T x={-28} y={6} className="mini-label warm">
            QUALIFY
          </T>
        </g>
      </Inspectable>
      <Line d="M320 360H468" c="lane" />
      <Line d="M570 360C650 360 690 230 900 230" c="lane lane--team" />
      <Line d="M570 360C650 360 690 500 900 500" c="lane lane--log" />
      {Array.from({ length: 6 }, (_, k) => {
        const real = k % 3 === 0;
        return (
          <circle key={k} className={`particle ${real ? 'is-real' : ''}`} r="7">
            <animateMotion
              path={`M320 360H520${real ? 'C650 360 690 230 900 230' : 'C650 360 690 500 900 500'}`}
              dur="4.2s"
              begin={`-${(k * 0.7).toFixed(1)}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
      <Inspectable
        id="to-team"
        title="To the teams"
        body="Alerts that need action still reach the teams, at once."
      >
        <g transform="translate(700 160)">
          <T x={0} y={0} className="mini-label">
            TO THE TEAMS
          </T>
          <T x={0} y={22} className="label small">
            What needs action
          </T>
        </g>
      </Inspectable>
      <Inspectable
        id="to-log"
        title="Requalified, on record"
        body="Harmless alerts leave the teams’ queue but stay on record, with their override."
      >
        <g transform="translate(700 560)">
          <T x={0} y={0} className="mini-label">
            REQUALIFIED · ON RECORD
          </T>
          <T x={0} y={22} className="label small">
            Harmless, still visible
          </T>
        </g>
      </Inspectable>
    </Layer>
  );
}

// ---------- 03 · What it brings: an override is filled in like a permit, and it runs out ----------
const fields: [string, string][] = [
  ['JUSTIFICATION', 'Why this alert is harmless'],
  ['OWNER', 'Who answers for it'],
  ['REVIEW DATE', 'When it is checked again'],
  ['DURATION', 'When it ends'],
  ['TRACE', 'Kept in the history'],
];

function WhatItBrings() {
  return (
    <Layer steps={[2]}>
      <g transform="translate(90 160)">
        <rect className="permit" width="440" height="420" rx="6" />
        <T x={26} y={40} className="mini-label warm">
          OVERRIDE
        </T>
        <T x={26} y={70} className="card-title">
          One alert, requalified
        </T>
        {fields.map(([k, v], i) => (
          <Inspectable
            key={k}
            id={`field-${i}`}
            title={k.charAt(0) + k.slice(1).toLowerCase()}
            body={`${v}.`}
          >
            <g
              className="permit-field"
              style={vars({ '--i': i })}
              transform={`translate(26 ${100 + i * 60})`}
            >
              <rect width="388" height="48" rx="3" />
              <path className="pf-check" d="M14 24l6 6 11-13" />
              <T x={44} y={20} className="mini-label">
                {k}
              </T>
              <T x={44} y={38} className="label tiny">
                {v}
              </T>
            </g>
          </Inspectable>
        ))}
      </g>
      <Inspectable
        id="expiry"
        title="Nothing silenced for good"
        body="When its duration ends, the override lapses and the alert goes back to its normal qualification."
      >
        <g transform="translate(760 330)">
          <circle className="cd-track" r="100" />
          <circle className="cd-ring" r="100" pathLength={1} transform="rotate(-90)">
            <animate attributeName="stroke-dashoffset" values="0;1" dur="8s" repeatCount="indefinite" />
          </circle>
          <T x={0} y={-6} className="center mini-label">
            DURATION
          </T>
          <T x={0} y={18} className="center label small">
            then it lapses
          </T>
        </g>
      </Inspectable>
      <T x={660} y={470} className="label">
        Owned, reviewed, visible.
      </T>
      <T x={660} y={496} className="label">
        The exception never hides.
      </T>
    </Layer>
  );
}

// ---------- 04 · The result: what reaches the teams is worth acting on ----------
function Box({ x, title, children }: { x: number; title: string; children: React.ReactNode }) {
  return (
    <g transform={`translate(${x} 170)`}>
      <T x={0} y={0} className="mini-label">
        {title}
      </T>
      <rect className="queue" y="16" width="380" height="300" rx="4" />
      {children}
    </g>
  );
}

function Result() {
  return (
    <Layer steps={[3]}>
      <Inspectable id="before" title="Before" body="Every valid alert rang, harmless or not.">
        <Box x={60} title="BEFORE · EVERY ALERT RINGS">
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              className={`q-item ${[4, 9].includes(i) ? 'is-real' : ''}`}
              x="16"
              y={32 + i * 23}
              width="348"
              height="16"
              rx="2"
            />
          ))}
        </Box>
      </Inspectable>
      <Inspectable
        id="after"
        title="After"
        body="What reaches the teams is worth acting on, so they act on it, and trust it."
      >
        <Box x={560} title="AFTER · WHAT REACHES THE TEAMS">
          {[0, 1].map((i) => (
            <rect
              key={i}
              className="q-item is-real pulse"
              x="16"
              y={32 + i * 30}
              width="348"
              height="22"
              rx="2"
            />
          ))}
          <T x={16} y={290} className="label small">
            Every one worth acting on
          </T>
        </Box>
      </Inspectable>
      <FlowArrow d="M450 320H550" />
      <Inspectable
        id="tests"
        title="525 tests a day"
        body="Automated Data tests running every day on the platform."
      >
        <ReadoutChip x={60} y={520} value="525 / day" label="AUTOMATED DATA TESTS" w={240} />
      </Inspectable>
      <Inspectable
        id="runs"
        title="About 60,000 executions"
        body="Executions so far, every one qualified the same way."
      >
        <ReadoutChip x={320} y={520} value="~60,000" label="EXECUTIONS SO FAR" w={240} />
      </Inspectable>
      <Inspectable
        id="trust"
        title="Trust in alerts"
        body="Teams act on the alerts they receive. Trust in Data has improved across the company."
      >
        <ReadoutChip x={580} y={520} value="Trusted" label="ALERTS TEAMS ACT ON" w={240} />
      </Inspectable>
    </Layer>
  );
}

export default function SignalScene() {
  return (
    <>
      <OpsDefs />
      <Header kicker="VERISURE · SIGNAL OR NOISE" />
      <Stakes />
      <WhyOverride />
      <WhatItBrings />
      <Result />
    </>
  );
}
