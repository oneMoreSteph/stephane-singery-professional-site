// Compact previews for the chapter reading column: the whole instrument opens the wide view,
// and hovering a period lights its card in the chapter list (and the other way round).
import { useRef } from 'react';
import { byKey, nowYear, orbits, spans } from './data';
import { LegendOrbit, LegendTrack } from './Legend';
import { OrbitDrawing } from './OrbitDrawing';

export type OnExpand = (key: string | null, trigger: HTMLElement) => void;

function Compact({
  kind,
  eyebrow,
  legend,
  caption,
  svg,
  onExpand,
}: {
  kind: 'timeline' | 'orbit';
  eyebrow: string;
  legend: React.ReactNode;
  caption: React.ReactNode;
  svg: { viewBox: string; content: React.ReactNode };
  onExpand: OnExpand;
}) {
  const root = useRef<HTMLElement>(null);
  const expand = useRef<HTMLButtonElement>(null);
  const caseOf = (e: React.SyntheticEvent) =>
    (e.target as Element).closest<SVGElement>('[data-case]')?.dataset.case ?? null;
  // The chapter cards belong to the journey script, so the link between them is drawn with classes, both ways.
  const light = (key: string | null) => {
    root.current?.classList.toggle('has-focus', !!key);
    root.current
      ?.querySelectorAll<SVGElement>('[data-case]')
      .forEach((n) => n.classList.toggle('is-active', n.dataset.case === key));
    document
      .querySelectorAll<HTMLElement>('.chapter-item')
      .forEach((n) => n.classList.toggle('is-linked', n.dataset.case === key));
  };
  return (
    <section
      ref={root}
      className={`career-visual career-visual--${kind} career-visual--compact`}
      aria-label={eyebrow}
    >
      <header className="cv-header">
        <span className="eyebrow">{eyebrow}</span>
        {legend}
      </header>
      <svg
        viewBox={svg.viewBox}
        aria-hidden="true"
        className="cv-svg"
        onClick={(e) => onExpand(caseOf(e), expand.current!)}
        onPointerOver={(e) => light(caseOf(e))}
        onPointerLeave={() => light(null)}
      >
        {svg.content}
      </svg>
      <div className="cv-foot">
        <p>{caption}</p>
        <button
          ref={expand}
          type="button"
          className="cv-expand"
          aria-label={`Expand the ${kind === 'timeline' ? 'career timeline' : 'education orbits'}`}
          onClick={() => onExpand(null, expand.current!)}
        >
          EXPAND <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
}

/** The career on three lanes, to scale by year. */
export function CareerTimeline({ onExpand }: { onExpand: OnExpand }) {
  const now = nowYear();
  const [x0, x1, y0, y1] = [8, 512, 2008, 2029];
  const x = (year: number) => x0 + ((year - y0) / (y1 - y0)) * (x1 - x0);
  const laneY = { ops: 10, data: 36, study: 62 };
  const content = (
    <>
      <g className="tl-grid">
        {[2008, 2012, 2016, 2020, 2024, 2028].map((year) => (
          <g key={year} className="tl-tick">
            <path d={`M${x(year)} 4V76`} />
            <text x={x(year)} y="92">
              {year}
            </text>
          </g>
        ))}
      </g>
      <g className="tl-spans">
        {spans.map((s, i) => {
          const end = s.to === 'now' ? now : s.to;
          const top = laneY[s.lane] + (s.thin ? 12 : 0);
          const h = s.thin ? 5 : 9;
          const bx = x(s.from);
          const bw = Math.max(4, x(end) - bx);
          const done = s.expected ? Math.max(0, x(now) - bx) : bw;
          return (
            <g
              key={s.key}
              className={`tl-span tl-span--${s.lane}${s.passenger ? ' tl-span--passenger' : ''}`}
              data-case={s.key}
              style={{ '--i': i } as React.CSSProperties}
            >
              <rect className="tl-hit" x={bx - 3} y={top - 5} width={bw + 6} height={h + 10} />
              {s.expected ? (
                <rect className="tl-track" x={bx} y={top} width={bw} height={h} rx="1.5" />
              ) : null}
              <rect className="tl-bar" x={bx} y={top} width={done} height={h} rx="1.5" />
              {s.live ? <circle className="tl-live-ring" cx={bx + bw} cy={top + h / 2} r="3" /> : null}
            </g>
          );
        })}
      </g>
      <g className="tl-now">
        <path d={`M${x(now)} 0V78`} />
      </g>
    </>
  );
  return (
    <Compact
      kind="timeline"
      eyebrow="GROUND TRACK · 2008 → 2028"
      legend={<LegendTrack />}
      caption={
        <>
          Overlaps matter: <b>the Paris hubs ran alongside rail</b>, and <b>EFREI runs alongside Verisure</b>.
        </>
      }
      svg={{ viewBox: '0 0 520 96', content }}
      onExpand={onExpand}
    />
  );
}

/** Study periods as successively higher orbits. */
export function StudyOrbitPreview({ onExpand }: { onExpand: OnExpand }) {
  return (
    <Compact
      kind="orbit"
      eyebrow="ORBIT RAISING · THREE MANOEUVRES"
      legend={<LegendOrbit />}
      caption="Each study period widened the systems I could work on."
      svg={{ viewBox: '0 44 520 260', content: <OrbitDrawing suffix="C" /> }}
      onExpand={onExpand}
    />
  );
}

export { byKey, orbits };
