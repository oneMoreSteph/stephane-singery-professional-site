import { useCallback, useEffect, useRef, useState } from 'react';

export interface TourTarget {
  id: string;
  title: string;
  body: string;
}

/** The elements a step's tour visits, in drawing order: the visible ones, narrowed as the drawing asks. */
export function tourTargets(camera: Element): TourTarget[] {
  let list = [...camera.querySelectorAll<SVGElement>('[data-inspect]')].filter(
    (n) => !n.closest('.layer-hidden') && !n.closest('[data-states]:has(.seq3,.seq4,.seq5,.seq6,.seq-b)'),
  );
  const only = list.filter((n) => n.closest('[data-tour-only]'));
  if (only.length) list = only;
  else {
    const focus = list.filter((n) => n.closest('.is-focus') || n.querySelector('.is-focus'));
    if (focus.length > 1) list = focus;
  }
  return list.map((n) => ({
    id: n.dataset.inspect ?? '',
    title: n.dataset.title ?? '',
    body: n.dataset.body ?? '',
  }));
}

/**
 * Every 2 s the next element of the step lights up and names itself. A click takes over for 25 s.
 * Returns the lit element and a function to call when the visitor clicks one. `onLight` must be stable (useCallback).
 */
export function useHighlightTour(targets: TourTarget[], paused: boolean, onLight: (t: TourTarget) => void) {
  const [touredId, setTouredId] = useState<string | null>(null);
  const index = useRef(-1);
  const holdUntil = useRef(0);
  useEffect(() => {
    index.current = -1;
    const tick = () => {
      if (paused || !targets.length || Date.now() < holdUntil.current) return;
      index.current = (index.current + 1) % targets.length;
      const target = targets[index.current];
      setTouredId(target.id);
      onLight(target);
    };
    tick();
    const timer = setInterval(tick, 2000);
    return () => clearInterval(timer);
  }, [targets, paused, onLight]);

  const takeOver = useCallback(
    (id: string) => {
      holdUntil.current = Date.now() + 25000;
      index.current = Math.max(
        -1,
        targets.findIndex((t) => t.id === id),
      );
      setTouredId(null);
    },
    [targets],
  );

  return { touredId, takeOver };
}
