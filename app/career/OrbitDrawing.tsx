// Studies drawn as orbits around "work on Earth"; each transfer burn is the move a study made possible.
import { Fragment } from 'react';
import { pad } from '~/content';
import { byKey, orbits, reducedMotion } from './data';

const CX = 260;
const CY = 330;
const EARTH = 110;
const pt = (r: number, deg: number) => [
  CX + r * Math.cos((deg * Math.PI) / 180),
  CY + r * Math.sin((deg * Math.PI) / 180),
];
const arc = (r: number, a: number, b: number) => {
  const [sx, sy] = pt(r, a);
  const [ex, ey] = pt(r, b);
  return `M${sx.toFixed(1)} ${sy.toFixed(1)}A${r} ${r} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`;
};
function Transfer({ a, b, from, to }: { a: number; b: number; from: number; to: number }) {
  const [sx, sy] = pt(a, from);
  const [ex, ey] = pt(b, to);
  return (
    <>
      <path
        className="orbit-transfer"
        d={`M${sx.toFixed(1)} ${sy.toFixed(1)}Q${((sx + ex) / 2).toFixed(1)} ${((sy + ey) / 2 + 18).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`}
      />
      <circle className="orbit-burn" cx={sx.toFixed(1)} cy={sy.toFixed(1)} r="2.5" />
    </>
  );
}

/** `suffix` keeps ids unique when the preview and the wide view are both on the page. */
export function OrbitDrawing({
  suffix,
  active,
}: {
  suffix: string;
  active?: { shown?: string; pinned?: string };
}) {
  const still = reducedMotion();
  return (
    <>
      <defs>
        <radialGradient id={`orbitEarth${suffix}`} cx=".5" cy=".12" r=".95">
          <stop stopColor="#4b93ae" />
          <stop offset=".4" stopColor="#143f55" />
          <stop offset="1" stopColor="#04131f" />
        </radialGradient>
        <radialGradient id={`orbitShade${suffix}`} cx=".38" cy=".32" r=".75">
          <stop offset=".45" stopColor="#04131f" stopOpacity="0" />
          <stop offset="1" stopColor="#04131f" stopOpacity=".88" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r={EARTH + 7} className="orbit-atmo" />
      <clipPath id={`orbitClip${suffix}`}>
        <circle cx={CX} cy={CY} r={EARTH} />
      </clipPath>
      <image
        href="/assets/nasa/blue-marble-2048.webp"
        x={CX - 418}
        y={CY - 121}
        width="792"
        height="396"
        preserveAspectRatio="none"
        clipPath={`url(#orbitClip${suffix})`}
        className="orbit-earth-img"
      />
      <circle cx={CX} cy={CY} r={EARTH} fill={`url(#orbitShade${suffix})`} className="orbit-earth" />
      <text className="orbit-earth-label" x={CX} y={CY - EARTH + 34}>
        WORK ON EARTH
      </text>
      <Transfer a={150} b={205} from={-152} to={-138} />
      <Transfer a={205} b={260} from={-28} to={-42} />
      {orbits.map((o, i) => {
        const s = byKey(o.key);
        const full = arc(o.r, -170, -10);
        // EFREI: the completed two thirds are solid, the expected final year is dashed.
        const done = o.inProgress ? arc(o.r, -170, -63) : full;
        const [sx, sy] = pt(o.r, o.angle);
        const classes = [
          `orbit orbit--${i + 1}`,
          o.inProgress && 'orbit--progress',
          active?.shown === o.key && 'is-active',
        ];
        return (
          <Fragment key={o.key}>
            <g
              className={classes.filter(Boolean).join(' ')}
              data-case={o.key}
              tabIndex={active ? (active.pinned === o.key ? 0 : -1) : -1}
              role="button"
              // Starts with the visible label, so voice control users can say what they see.
              aria-label={`${pad(i + 1)} ${o.label} ${o.period}: ${s.title}`}
            >
              <path className="orbit-hit" d={full} />
              <path className="orbit-track" d={full} />
              <path className="orbit-path" d={done} />
              {still ? (
                <g className="orbit-craft" transform={`translate(${sx.toFixed(1)} ${sy.toFixed(1)})`}>
                  <circle r="4.5" />
                </g>
              ) : (
                <g className="orbit-craft">
                  <circle r="4.5" />
                  <animateMotion
                    dur={`${30 + i * 9}s`}
                    begin={`-${i * 7 + 4}s`}
                    repeatCount="indefinite"
                    path={done}
                  />
                </g>
              )}
              <text className="orb-label" x={CX} y={CY - o.r - 9}>
                <tspan className="orb-index">{pad(i + 1)}</tspan>
                {` ${o.label} `}
                <tspan className="orb-period">{o.period}</tspan>
              </text>
            </g>
          </Fragment>
        );
      })}
    </>
  );
}
