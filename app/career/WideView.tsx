// The wide views that open over the globe: stage on the left, detail pane on the right, keyboard stepping between periods.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { byKey, laneName, orbits } from './data';
import { MetricViz } from './MetricViz';

export interface ViewHandle {
  focus(): void;
  select(key: string): void;
}
export interface ViewProps {
  selected: string | null;
  onOpen(key: string, trigger: HTMLElement): void;
  onClose(): void;
  openLabel(key: string): string;
}
/** What the stage draws for the period under the pointer (shown) and the selected one (pinned). */
export type Stage = (state: { shown: string; pinned: string }) => {
  svg: React.ReactNode;
  onPointerMove?: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerLeave?: () => void;
};

interface Props extends ViewProps {
  kind: 'track' | 'orbit';
  eyebrow: string;
  heading: string;
  legend: React.ReactNode;
  order: string[];
  fallback: string;
  note: string;
  label: string;
  viewBox: string;
  stage: Stage;
}

export const WideView = forwardRef<ViewHandle, Props>(function WideView(props, ref) {
  const {
    kind,
    eyebrow,
    heading,
    legend,
    order,
    fallback,
    note,
    label,
    viewBox,
    stage,
    selected,
    onOpen,
    onClose,
    openLabel,
  } = props;
  const [pinned, setPinned] = useState(selected && order.includes(selected) ? selected : fallback);
  const [shown, setShown] = useState(pinned);
  const [focusRequest, setFocusRequest] = useState(0);
  const svg = useRef<SVGSVGElement>(null);
  const stageBox = useRef<HTMLDivElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);

  const pin = (key: string, focus = false) => {
    setPinned(key);
    setShown(key);
    if (focus) setFocusRequest((n) => n + 1);
  };
  const step = (delta: number, focus = false) =>
    pin(order[(order.indexOf(pinned) + delta + order.length) % order.length], focus);

  useImperativeHandle(ref, () => ({
    focus: () => pin(pinned, true),
    select: (key: string) => {
      if (order.includes(key)) pin(key);
    },
  }));

  // Focus the selected period when asked, and keep it in view when the stage scrolls sideways on narrow screens.
  useEffect(() => {
    const node = svg.current?.querySelector<SVGElement>(`[data-case="${pinned}"]`);
    if (focusRequest) node?.focus({ preventScroll: true });
    const box = stageBox.current;
    if (node && box && box.scrollWidth > box.clientWidth + 1) {
      const n = node.getBoundingClientRect();
      const f = box.getBoundingClientRect();
      box.scrollLeft += n.left + n.width / 2 - (f.left + f.width / 2);
    }
  }, [pinned, focusRequest]);

  const caseOf = (e: React.SyntheticEvent) =>
    (e.target as Element).closest<SVGElement>('[data-case]')?.dataset.case;
  const s = byKey(shown);
  const o = orbits.find((item) => item.key === shown);
  const drawn = stage({ shown, pinned });

  return (
    <div
      className={`tv tv--${kind}`}
      onKeyDown={(e) => {
        const onItem = !!(e.target as Element).closest?.('[data-case]');
        if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          step(1, onItem);
        } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
          e.preventDefault();
          step(-1, onItem);
        } else if (onItem && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpen(pinned, openButton.current!);
        }
      }}
    >
      <div className="tv-scrim" aria-hidden="true" onClick={onClose}></div>
      <section className="tv-panel" role="dialog" aria-modal="true" aria-labelledby="tv-title">
        <header className="tv-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 id="tv-title">{heading}</h2>
          </div>
          {legend}
          <button
            type="button"
            className="tv-close"
            aria-label="Close and return to the chapter"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="tv-body">
          <div className="tv-stage" ref={stageBox}>
            <svg
              ref={svg}
              viewBox={viewBox}
              role="group"
              aria-label={label}
              className="tv-svg"
              onPointerOver={(e) => {
                const k = caseOf(e);
                if (k) setShown(k);
              }}
              onPointerLeave={() => {
                setShown(pinned);
                drawn.onPointerLeave?.();
              }}
              onPointerMove={drawn.onPointerMove}
              onClick={(e) => {
                const k = caseOf(e);
                if (!k) return;
                if (k === pinned) onOpen(pinned, openButton.current!);
                else pin(k);
              }}
              onFocus={(e) => {
                const k = caseOf(e);
                if (k && k !== pinned) pin(k);
              }}
            >
              {drawn.svg}
            </svg>
          </div>
          <aside className="tv-pane">
            <div className="tv-pane__live" aria-live="polite">
              <span className={`tv-lane tv-lane--${s.lane}`}>
                {laneName[s.lane]} · {s.period}
              </span>
              <small>{s.org}</small>
              <h3>{s.title}</h3>
              {s.metric ? (
                <div className="tv-metric">
                  <div className="tv-fig">
                    <b>{s.metric[0]}</b>
                    {s.metric[2] ? <em>{s.metric[2]}</em> : null}
                  </div>
                  <MetricViz caseKey={s.key} />
                  {s.metric[1] ? <span>{s.metric[1]}</span> : null}
                </div>
              ) : null}
              {kind === 'orbit' ? <p>{s.fact}</p> : null}
              {o ? <p className="tv-led">{o.led}</p> : null}
            </div>
            <button
              ref={openButton}
              type="button"
              className="primary-action tv-open"
              data-case={pinned}
              onClick={() => onOpen(pinned, openButton.current!)}
            >
              {openLabel(pinned)} <span aria-hidden="true">↗</span>
            </button>
            <nav className="tv-step" aria-label="Step through periods">
              <button type="button" data-step="-1" aria-label="Previous period" onClick={() => step(-1)}>
                ←
              </button>
              <span className="tv-count">{`${order.indexOf(pinned) + 1} / ${order.length}`}</span>
              <button type="button" data-step="1" aria-label="Next period" onClick={() => step(1)}>
                →
              </button>
            </nav>
          </aside>
        </div>
        <footer className="tv-foot">
          <p>{note}</p>
          <p className="tv-keys">
            <kbd>←</kbd>
            <kbd>→</kbd> step · <kbd>Enter</kbd> open · <kbd>Esc</kbd> close
          </p>
        </footer>
      </section>
    </div>
  );
});
