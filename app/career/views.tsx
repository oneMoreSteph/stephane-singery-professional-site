// The two wide views: the career timeline (Earth) and the education orbits (Galileo).
import { forwardRef, Fragment, useState } from 'react';
import { byKey, chronological, laneName, nowYear, orbits, spans } from './data';
import { LegendOrbit, LegendTrack } from './Legend';
import { OrbitDrawing } from './OrbitDrawing';
import { WideView, type ViewHandle, type ViewProps } from './WideView';

// Wide timeline: redrawn for a large stage rather than scaled up, so every label sits on or next to its own bar.
const [X0, X1, Y0, Y1] = [120, 984, 2008, 2029];
const x = (year: number) => X0 + ((year - Y0) / (Y1 - Y0)) * (X1 - X0);
const lane = { ops: 116, data: 286, study: 412 };
const AXIS = 486;

function geometry(key: string, now: number) {
  const s = byKey(key);
  const end = s.to === 'now' ? now : s.to;
  const top = lane[s.lane] + (s.thin ? 42 : 0);
  const h = s.thin ? 20 : 30;
  const bx = x(s.from);
  const bw = Math.max(8, x(end) - bx);
  return { s, top, h, bx, bw };
}

function TrackDrawing({
  shown,
  pinned,
  scrub,
}: {
  shown: string;
  pinned: string;
  scrub: { x: number; year: number } | null;
}) {
  const now = nowYear();
  const sel = geometry(shown, now);
  const bracket = (from: number, to: number, text: string) => (
    <g className="tv-bracket">
      <path d={`M${x(from)} 50V42H${x(to)}V50`} />
      <text x={(x(from) + x(to)) / 2} y="32">
        {text}
      </text>
    </g>
  );
  const years = Array.from({ length: 2028 - Y0 + 1 }, (_, i) => Y0 + i);
  return (
    <>
      <g className="tl-grid">
        {years.map((year) => (
          <g key={year} className={`tl-tick${year % 2 ? ' tl-tick--minor' : ''}`}>
            <path d={`M${x(year)} 64V${AXIS}`} />
            <text x={x(year)} y={AXIS + 22}>
              {year % 2 ? `’${String(year).slice(2)}` : year}
            </text>
          </g>
        ))}
        <path className="tl-axis" d={`M${X0} ${AXIS}H${X1}`} />
      </g>
      {Object.entries(lane).map(([id, y]) => (
        <Fragment key={id}>
          <text className="tl-lane" x="0" y={y + 19}>
            {laneName[id as keyof typeof lane]}
          </text>
          <path className="tl-lane-rule" d={`M${X0} ${y + 15}H${X1}`} />
        </Fragment>
      ))}
      {bracket(2010, 2020, 'OPERATIONS · 2010–2019')}
      {bracket(2021.1, now, 'DATA · SINCE FEB 2021')}
      <path
        className="tl-bridge"
        d={`M${x(2020)} ${lane.ops + 62}C${x(2020) + 6} 232 ${x(2021.1) - 10} 226 ${x(2021.1)} ${lane.data}`}
      />
      <text className="tl-note" textAnchor="end" x={x(2020) - 8} y="226">
        RETRAINING ↘
      </text>
      <path className="tl-bridge" d={`M${x(2021.1)} ${lane.study}V${lane.data + 30}`} />
      <text className="tl-note" x={x(2021.1) + 7} y={(lane.data + lane.study) / 2 + 18}>
        FEB 2021
      </text>
      {/* The period under the pointer, projected down to the year axis so its start and end read against the scale. */}
      <g className={`tv-sel tv-sel--${sel.s.lane}`} aria-hidden="true">
        <rect className="tv-sel__band" y={AXIS - 3} height="6" x={sel.bx} width={Math.max(2, sel.bw)} />
        <path className="tv-sel__from" d={`M${sel.bx} ${sel.top + sel.h}V${AXIS}`} />
        <path className="tv-sel__to" d={`M${sel.bx + sel.bw} ${sel.top + sel.h}V${AXIS}`} />
      </g>
      <g className="tl-spans">
        {spans.map((s, i) => {
          const { top, h, bx, bw } = geometry(s.key, now);
          const done = s.expected ? Math.max(0, Math.min(bw, x(now) - bx)) : bw;
          const cx = bx + bw / 2;
          const classes = [
            `tl-span tl-span--${s.lane}`,
            s.thin && 'tl-span--thin',
            s.passenger && 'tl-span--passenger',
            shown === s.key && 'is-active',
          ];
          return (
            <g
              key={s.key}
              className={classes.filter(Boolean).join(' ')}
              data-case={s.key}
              tabIndex={pinned === s.key ? 0 : -1}
              role="button"
              aria-label={`${s.org}: ${s.title}, ${s.period}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              <rect className="tl-hit" x={bx - 5} y={top - 28} width={bw + 10} height={h + 54} />
              {s.expected ? <rect className="tl-track" x={bx} y={top} width={bw} height={h} rx="2" /> : null}
              <rect className="tl-bar" x={bx} y={top} width={done} height={h} rx="2" />
              {s.live ? (
                <>
                  <circle className="tl-live" cx={bx + bw} cy={top + h / 2} r="6" />
                  <circle className="tl-live-ring" cx={bx + bw} cy={top + h / 2} r="6" />
                </>
              ) : null}
              {s.labelPos === 'above' ? (
                <text className="tl-label" textAnchor="middle" x={cx} y={top - 11}>
                  {s.label}
                </text>
              ) : s.labelPos === 'below' ? (
                <text className="tl-label" textAnchor="middle" x={cx} y={top + h + 21}>
                  {s.label}
                </text>
              ) : (
                <text
                  className={`tl-label tl-label--inside${s.tight ? ' tl-label--tight' : ''}`}
                  x={bx + (s.tight ? 8 : 10)}
                  y={top + h / 2 + 4.5}
                >
                  {s.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
      <g className="tl-now">
        <path d={`M${x(now)} 56V${AXIS}`} />
        <text x={x(now)} y={lane.ops - 26}>
          NOW
        </text>
      </g>
      {/* A scrub line follows the pointer and reads the year under it. */}
      <g
        className={`tv-scrub${scrub ? ' is-on' : ''}`}
        aria-hidden="true"
        transform={scrub ? `translate(${scrub.x.toFixed(1)} 0)` : undefined}
      >
        <path d={`M0 64V${AXIS}`} />
        <rect x="-23" y={AXIS + 26} width="46" height="17" rx="2" />
        <text y={AXIS + 38.5}>{scrub ? Math.floor(scrub.year) : 2020}</text>
      </g>
    </>
  );
}

export const TrackView = forwardRef<ViewHandle, ViewProps>(function TrackView(props, ref) {
  const [scrub, setScrub] = useState<{ x: number; year: number } | null>(null);
  return (
    <WideView
      ref={ref}
      {...props}
      kind="track"
      eyebrow="GROUND TRACK · 2008 → 2028"
      heading="Career timeline"
      legend={<LegendTrack />}
      order={chronological}
      fallback="verisure"
      note="Drawn to scale by year. Boundaries within a year are approximate; EFREI beyond today is expected."
      label="Career timeline from 2008 to 2028. Use the arrow keys to step through periods."
      viewBox="0 0 1000 532"
      stage={({ shown, pinned }) => ({
        svg: <TrackDrawing shown={shown} pinned={pinned} scrub={scrub} />,
        onPointerMove: (e) => {
          const svg = e.currentTarget;
          const point = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM()!.inverse());
          const year = 2008 + ((point.x - X0) / (X1 - X0)) * 21;
          const visible = year >= 2008 && year < 2029 && point.y > 48 && point.y < AXIS + 46;
          setScrub(visible ? { x: point.x, year } : null);
        },
        onPointerLeave: () => setScrub(null),
      })}
    />
  );
});

export const OrbitView = forwardRef<ViewHandle, ViewProps>(function OrbitView(props, ref) {
  return (
    <WideView
      ref={ref}
      {...props}
      kind="orbit"
      eyebrow="ORBIT RAISING · THREE MANOEUVRES"
      heading="Education as orbit raising"
      legend={<LegendOrbit />}
      order={orbits.map((o) => o.key)}
      fallback="study-efrei"
      note="Each orbit is a study period; each transfer burn is the move it made possible. EFREI’s final year is expected."
      label="Three study periods drawn as successively higher orbits around work on Earth. Use the arrow keys to step through them."
      viewBox="-20 36 560 300"
      stage={({ shown, pinned }) => ({ svg: <OrbitDrawing suffix="W" active={{ shown, pinned }} /> })}
    />
  );
});
