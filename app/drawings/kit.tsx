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
  x: number | string;
  y: number | string;
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
export const Lab = ({
  x,
  y,
  t,
  c = '',
}: {
  x: number | string;
  y: number | string;
  t: string;
  c?: string;
}) => (
  <T x={x} y={y} className={`tx-label ${c}`}>
    {t}
  </T>
);
/** Smaller line under a label. */
export const Sub = ({
  x,
  y,
  t,
  c = '',
}: {
  x: number | string;
  y: number | string;
  t: string;
  c?: string;
}) => (
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

/** A full-width rule with a centred label, between "asked" and "built". */
export function Divider({ y, t }: { y: number; t: string }) {
  return (
    <>
      <path className="tx-div" d={`M40 ${y}H960`} />
      <Lab x={500} y={y + 5} t={t} c="center strong" />
    </>
  );
}
/** A row heading: a strong label and its explanation. */
export function Lane({ y, t, s }: { y: number; t: string; s: string }) {
  return (
    <>
      <Lab x={40} y={y} t={t} c="strong" />
      <Sub x={130} y={y} t={s} />
    </>
  );
}
/** Sets a CSS custom property such as --i for staggered animations. */
export const vars = (v: Record<string, number | string>) => v as React.CSSProperties;

/** Transport vehicles, drawn at the origin; place them with a transform or Move. */
export const Plane = ({ s = 1 }: { s?: number }) => (
  <g className="tx-veh" transform={`scale(${s})`}>
    <path d="M-30-3L18-3C28-3 32 0 32 2S28 5 20 5H-20L-34-14H-26ZM-6-3L-22-22H-12L10-3ZM-4 5L-16 18H-7L10 5Z" />
  </g>
);
export const Truck = ({ s = 1 }: { s?: number }) => (
  <g className="tx-veh" transform={`scale(${s})`}>
    <rect x="-60" y="-34" width="62" height="30" rx="2" />
    <path d="M4-26H20L30-14V-4H4Z" />
    <circle cx="-44" cy="0" r="6" />
    <circle cx="-10" cy="0" r="6" />
    <circle cx="18" cy="0" r="6" />
  </g>
);
export const Barge = ({ s = 1 }: { s?: number }) => (
  <g className="tx-veh" transform={`scale(${s})`}>
    <path d="M-54-6H54L44 8H-44Z" />
    <rect x="-44" y="-18" width="60" height="12" />
    <rect x="26" y="-22" width="16" height="16" />
  </g>
);
export const Ship = ({ s = 1 }: { s?: number }) => (
  <g className="tx-veh" transform={`scale(${s})`}>
    <path d="M-70-10H70L54 12H-54Z" />
    <rect x="-52" y="-30" width="30" height="20" />
    <rect x="-18" y="-30" width="30" height="20" />
    <rect x="16" y="-42" width="26" height="32" />
  </g>
);

/** A freight train: locomotive and wagons carrying containers or cars. */
export function FreightTrain({
  x = 0,
  y = 0,
  s = 1,
  wagons = 3,
  load = 'container',
  id,
}: {
  x?: number;
  y?: number;
  s?: number;
  wagons?: number;
  load?: 'container' | 'cars';
  id?: string;
}) {
  const len = 56 + wagons * 46;
  return (
    <g className="freight-train" transform={`translate(${x} ${y}) scale(${s})`} data-id={id}>
      <path className="ft-rail" d={`M${-len - 8} 1H12`} />
      {Array.from({ length: wagons }, (_, i) => {
        const r = -56 - i * 46;
        const l = r - 42;
        return (
          <Fragment key={i}>
            <path className="ft-bed" d={`M${l} -6H${r}`} />
            {load === 'cars' ? (
              <>
                <path className="ft-frame" d={`M${l} -6V-30H${r}V-6M${l} -18H${r}`} />
                {[0, 1].flatMap((d) =>
                  [0, 1].map((c) => (
                    <rect
                      key={`${d}${c}`}
                      className="ft-car"
                      x={l + 4 + c * 19}
                      y={d ? -15 : -27}
                      width="15"
                      height="7"
                      rx="3"
                    />
                  )),
                )}
              </>
            ) : (
              <rect className="ft-box" x={l + 2} y="-21" width="38" height="13" rx="1" />
            )}
            <circle className="ft-wheel" cx={l + 7} cy="-2.5" r="3.5" />
            <circle className="ft-wheel" cx={r - 7} cy="-2.5" r="3.5" />
            <path className="ft-coupler" d={`M${r} -8h6`} />
          </Fragment>
        );
      })}
      <path className="ft-loco" d="M-52 -6V-22H-16V-30H-5L0 -23V-6Z" />
      <rect className="ft-window" x="-13" y="-28" width="7" height="5" rx="1" />
      <path className="ft-stripe" d="M-48 -13H-18" />
      {[-44, -33, -21, -9].map((cx) => (
        <circle key={cx} className="ft-wheel" cx={cx} cy="-2.5" r="3.5" />
      ))}
    </g>
  );
}

/** A link to another case, drawn inside a scene. The case window opens that case on click or Enter. */
export function CaseChip({
  x,
  y,
  w,
  to,
  kicker,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  to: string;
  kicker: string;
  sub: string;
}) {
  return (
    <g
      className="case-link"
      transform={`translate(${x} ${y})`}
      data-open-case={to}
      tabIndex={0}
      role="button"
      aria-label={`Open ${kicker.toLowerCase()}`}
    >
      <rect width={w} height="58" rx="3" />
      <T x={16} y={24} className="mini-label">
        {kicker}
      </T>
      <T x={16} y={44} className="label small">
        {sub}
      </T>
      <T x={w - 18} y={36} className="chip-arrow end">
        ↗
      </T>
    </g>
  );
}
