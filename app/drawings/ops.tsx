// Parts of the operations scenes (ISS chapter and the SNCF cases): trains, crossings, crews, consoles, chips.
import { Inspectable } from './Inspectable';
import { T, type Pt } from './kit';

/** A crew member, drawn as an instrument marker rather than a character. */
export function Crew({ x, y, s = 1, color }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      className="crew"
      style={color ? ({ '--crew': color } as React.CSSProperties) : undefined}
    >
      <circle cy="-9" r="6.5" />
      <path d="M-12 15v-3a12 12 0 0 1 24 0v3" />
    </g>
  );
}

/** Bracket corners around a box. */
export const Corner = ({ w, h, ox = 0, oy = 0 }: { w: number; h: number; ox?: number; oy?: number }) => {
  const [l, t, r, b] = [ox, oy, ox + w, oy + h];
  return (
    <path
      className="sys-corner"
      d={`M${l} ${t + 9}v-9h9M${r - 9} ${t}h9v9M${r} ${b - 9}v9h-9M${l + 9} ${b}h-9v-9`}
    />
  );
};

/** A figure and its label in a framed chip. */
export function ReadoutChip({
  x,
  y,
  value,
  label,
  w = 200,
}: {
  x: number;
  y: number;
  value: string;
  label: string;
  w?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`} className="readout-chip">
      <rect width={w} height="66" rx="3" />
      <Corner w={w} h={66} />
      <T x={14} y={34} className="chip-value">
        {value}
      </T>
      <T x={14} y={54} className="chip-label">
        {label}
      </T>
    </g>
  );
}

/** A plain path with no fill. */
export const Line = ({ d, c = '' }: { d: string; c?: string }) => <path d={d} className={c} fill="none" />;

/** Map-scale train: three linked cars following a route. */
export function TrainMarker({
  path,
  dur = 22,
  begin = 0,
  c = '',
}: {
  path: string;
  dur?: number;
  begin?: number;
  c?: string;
}) {
  return (
    <g className={`train-marker ${c}`}>
      <rect className="tm-car" x="-27" y="-3.5" width="11" height="7" rx="1.5" />
      <rect className="tm-car" x="-14" y="-3.5" width="11" height="7" rx="1.5" />
      <rect className="tm-loco" x="-1" y="-4" width="12" height="8" rx="2" />
      <animateMotion
        dur={`${dur}s`}
        begin={`-${begin}s`}
        repeatCount="indefinite"
        rotate="auto"
        path={path}
      />
    </g>
  );
}

/** French level-crossing sign on a post. */
export function CrossingSign({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g className="x-sign" transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="x-post" d="M0 0V-30" />
      <g transform="translate(0 -38)">
        <rect className="x-bar" x="-17" y="-3.2" width="34" height="6.4" rx="1" transform="rotate(32)" />
        <rect className="x-bar" x="-17" y="-3.2" width="34" height="6.4" rx="1" transform="rotate(-32)" />
      </g>
    </g>
  );
}

export function Cyclist({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g className="cyclist" transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="-9" cy="0" r="6.5" />
      <circle cx="9" cy="0" r="6.5" />
      <path d="M-9 0l5-10h9L9 0M-4-10L-6-14M5-10l-3 0M2-10l4-9" />
      <circle className="cy-head" cx="7" cy="-22" r="3" />
    </g>
  );
}
export const Peloton = ({ n = 5 }: { n?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <Cyclist key={i} x={-i * 15} y={(i % 2) * 7 - 3} s={0.62} />
    ))}
  </>
);

/** An operator at a desk with a screen. */
export function Console({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g className="console" transform={`translate(${x} ${y}) scale(${s})`}>
      <rect className="console-screen" x="-24" y="-40" width="48" height="30" rx="3" />
      <path className="console-lines" d="M-16-31h20M-16-24h28M-16-17h14" />
      <path className="console-desk" d="M-34 -4h68" />
      <Crew x={0} y={16} s={0.7} />
    </g>
  );
}

/** A person or team in a scene, with its name and role; clickable. */
export function Actor(props: {
  id: string;
  x: number;
  y: number;
  title: string;
  sub?: string;
  body: string;
  kind?: 'crew' | 'console';
  c?: string;
}) {
  const { id, x, y, title, sub, body, kind = 'crew', c = '' } = props;
  return (
    <Inspectable id={id} title={title} body={body}>
      <g className={`actor ${c}`} transform={`translate(${x} ${y})`}>
        {kind === 'console' ? <Console x={0} y={0} s={0.9} /> : <Crew x={0} y={-4} s={1.25} />}
        <T x={0} y={42} className="center actor-title">
          {title}
        </T>
        {sub ? (
          <T x={0} y={60} className="center actor-sub">
            {sub}
          </T>
        ) : null}
      </g>
    </Inspectable>
  );
}

/** A rounded tag. */
export function Pill({
  x,
  y,
  w,
  label,
  c = '',
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  c?: string;
}) {
  return (
    <g className={`pill ${c}`} transform={`translate(${x} ${y})`}>
      <rect width={w} height="26" rx="13" />
      <T x={w / 2} y={17.5} className="center pill-text">
        {label}
      </T>
    </g>
  );
}

/** An arrow with the operations arrow head. */
export const FlowArrow = ({ d, c = '' }: { d: string; c?: string }) => (
  <path className={`flow-arrow ${c}`} d={d} markerEnd="url(#opsArrow)" />
);

/** Smooth curve through points (Catmull-Rom as cubic Bézier). */
export const smooth = (pts: Pt[]) =>
  pts.reduce((d, p, i) => {
    if (!i) return `M${p[0]} ${p[1]}`;
    const p0 = pts[i - 2] || pts[i - 1];
    const p1 = pts[i - 1];
    const p3 = pts[i + 1] || p;
    const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6];
    const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
    return `${d}C${c1.map((v) => v.toFixed(1)).join(' ')} ${c2.map((v) => v.toFixed(1)).join(' ')} ${p[0]} ${p[1]}`;
  }, '');

/** Points along the smooth curve, for intersections. */
export const sample = (pts: Pt[]): Pt[] =>
  pts
    .slice(1)
    .flatMap((p, i) => {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p3 = pts[i + 2] || p;
      const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6];
      const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
      return Array.from({ length: 24 }, (_, j) => {
        const t = j / 24;
        const u = 1 - t;
        return [0, 1].map(
          (k) => u * u * u * p1[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t * t * t * p[k],
        ) as Pt;
      });
    })
    .concat([pts[pts.length - 1]]);

/** Where a polyline crosses the segment a–b. */
export function crossings(poly: Pt[], a: Pt, b: Pt): Pt[] {
  const out: Pt[] = [];
  for (let i = 1; i < poly.length; i++) {
    const [p, q] = [poly[i - 1], poly[i]];
    const d = (q[0] - p[0]) * (b[1] - a[1]) - (q[1] - p[1]) * (b[0] - a[0]);
    if (!d) continue;
    const t = ((a[0] - p[0]) * (b[1] - a[1]) - (a[1] - p[1]) * (b[0] - a[0])) / d;
    const u = ((a[0] - p[0]) * (q[1] - p[1]) - (a[1] - p[1]) * (q[0] - p[0])) / d;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]);
  }
  return out;
}
