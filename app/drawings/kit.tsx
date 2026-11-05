// Drawing primitives shared by every scene: labelled domain objects (databases, windows, code, charts, people).
// Coordinates are in the scene's 1000 × 730 units.
import { Fragment } from 'react';

export type Pt = [number, number];
const cx = (...c: (string | false | undefined)[]) =>
  c.filter((v) => v !== false && v !== undefined).join(' ');

export function T({
  x,
  y,
  children,
  className = '',
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <text x={x} y={y} className={className}>
      {children}
    </text>
  );
}
/** Label in capitals. Extra classes: center, strong, warm… */
export const Lab = ({ x, y, t, c = '' }: { x: number; y: number; t: string; c?: string }) => (
  <T x={x} y={y} className={`tx-label ${c}`}>
    {t}
  </T>
);
/** Smaller line under a label. */
export const Sub = ({ x, y, t, c = '' }: { x: number; y: number; t: string; c?: string }) => (
  <T x={x} y={y} className={`tx-sub ${c}`}>
    {t}
  </T>
);

/** A connection with a moving flow along it. */
export function Link({ d, c = '' }: { d: string; c?: string }) {
  return (
    <>
      <path className={`tx-link ${c}`} d={d} />
      <path className={`tx-flow ${c}`} d={d} />
    </>
  );
}
export function Arrow({ from: [x1, y1], to: [x2, y2], c = '' }: { from: Pt; to: Pt; c?: string }) {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <>
      <Link d={`M${x1} ${y1}L${x2} ${y2}`} c={c} />
      <path
        className={`tx-head ${c}`}
        transform={`translate(${x2} ${y2}) rotate(${a.toFixed(1)})`}
        d="M2 0L-9-6V6Z"
      />
    </>
  );
}
/** Moves its content along a path, forever. */
export function Move({
  path,
  dur,
  begin = 0,
  children,
}: {
  path: string;
  dur: number;
  begin?: number;
  children: React.ReactNode;
}) {
  return (
    <g>
      {children}
      <animateMotion path={path} dur={`${dur}s`} begin={`-${begin}s`} repeatCount="indefinite" />
    </g>
  );
}
/** A database cylinder centred on cx. */
export function Db({
  cx: x,
  y,
  w = 110,
  h = 100,
  c = '',
}: {
  cx: number;
  y: number;
  w?: number;
  h?: number;
  c?: string;
}) {
  const rx = w / 2;
  const ry = 13;
  return (
    <g className={`tx-db ${c}`}>
      <path d={`M${x - rx} ${y + ry}V${y + h - ry}A${rx} ${ry} 0 0 0 ${x + rx} ${y + h - ry}V${y + ry}`} />
      <ellipse cx={x} cy={y + ry} rx={rx} ry={ry} />
      <path
        className="tx-db-l"
        d={`M${x - rx} ${y + h * 0.45}A${rx} ${ry} 0 0 0 ${x + rx} ${y + h * 0.45}M${x - rx} ${y + h * 0.7}A${rx} ${ry} 0 0 0 ${x + rx} ${y + h * 0.7}`}
      />
    </g>
  );
}
/** An application window with a title bar. */
export function Win({
  x,
  y,
  w,
  h,
  title,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <g className="tx-win">
      <rect className="tx-win-bg" x={x} y={y} width={w} height={h} rx="5" />
      <path className="tx-win-bar" d={`M${x} ${y + 24}H${x + w}`} />
      <circle cx={x + 12} cy={y + 12} r="3" />
      <circle cx={x + 22} cy={y + 12} r="3" />
      <circle cx={x + 32} cy={y + 12} r="3" />
      <T x={x + 44} y={y + 16} className="tx-win-t">
        {title}
      </T>
      {children}
    </g>
  );
}
export const Code = ({ x, y, lines, lh = 19 }: { x: number; y: number; lines: string[]; lh?: number }) => (
  <>
    {lines.map((l, i) => (
      <T key={i} x={x} y={y + i * lh} className="tx-code">
        {l}
      </T>
    ))}
  </>
);
/** Bar chart; values from 0 to 1. */
export function Bars({
  x,
  y,
  w,
  h,
  vals,
  c = '',
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  vals: number[];
  c?: string;
}) {
  const b = w / vals.length;
  return (
    <g className={`tx-bars ${c}`}>
      <path className="tx-axis" d={`M${x} ${y}V${y + h}H${x + w}`} />
      {vals.map((v, i) => (
        <rect
          key={i}
          style={{ '--i': i } as React.CSSProperties}
          x={(x + b * i + b * 0.18).toFixed(1)}
          y={(y + h - v * h).toFixed(1)}
          width={(b * 0.64).toFixed(1)}
          height={(v * h).toFixed(1)}
        />
      ))}
    </g>
  );
}
export function Spark({
  x,
  y,
  w,
  h,
  vals,
  c = '',
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  vals: number[];
  c?: string;
}) {
  const d = vals
    .map((v, i) => `${(x + (i * w) / (vals.length - 1)).toFixed(1)} ${(y + h - v * h).toFixed(1)}`)
    .join('L');
  return <path className={`tx-spark ${c}`} d={`M${d}`} />;
}
export function User({
  x,
  y,
  s = 1,
  c = '',
  style,
}: {
  x: number;
  y: number;
  s?: number;
  c?: string;
  style?: React.CSSProperties;
}) {
  return (
    <g className={`tx-user ${c}`} transform={`translate(${x} ${y}) scale(${s})`} style={style}>
      <circle cy="-24" r="8" />
      <path d="M-15 0V-3A15 12 0 0 1 15-3V0Z" />
    </g>
  );
}
export function Server({ x, y, w = 100, n = 3 }: { x: number; y: number; w?: number; n?: number }) {
  return (
    <g className="tx-server">
      {Array.from({ length: n }, (_, i) => (
        <Fragment key={i}>
          <rect x={x} y={y + i * 32} width={w} height="26" rx="3" />
          <circle
            className="tx-led"
            style={{ '--i': i } as React.CSSProperties}
            cx={x + 14}
            cy={y + 13 + i * 32}
            r="3.5"
          />
          <path d={`M${x + 30} ${y + 13 + i * 32}H${x + w - 12}`} />
        </Fragment>
      ))}
    </g>
  );
}
export function Graph({ nodes, edges, c = '' }: { nodes: Pt[]; edges: [number, number][]; c?: string }) {
  return (
    <g className={`tx-graph ${c}`}>
      {edges.map(([a, b], i) => (
        <path key={`e${i}`} d={`M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}`} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={`n${i}`} style={{ '--i': i } as React.CSSProperties} cx={x} cy={y} r="7" />
      ))}
    </g>
  );
}
export function Check({ x, y, ok = true }: { x: number; y: number; ok?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`} className={cx('tx-check', ok ? '' : 'ko')}>
      <circle r="9" />
      <path d={ok ? 'M-4 0L-1 4 5-4' : 'M-4-4L4 4M4-4L-4 4'} />
    </g>
  );
}
/** The small kicker at the top left of every scene. */
export const Header = ({ kicker }: { kicker: string }) => (
  <T x={40} y={44} className="mini-label">
    {kicker}
  </T>
);

/** Arrow marker and hatch pattern used by the operations scenes. */
export function OpsDefs() {
  return (
    <defs>
      <marker
        id="opsArrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0 0L10 5 0 10z" className="arrow-head" />
      </marker>
      <pattern id="opsHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0V8" stroke="#f0a868" strokeOpacity=".55" strokeWidth="2" />
      </pattern>
    </defs>
  );
}
