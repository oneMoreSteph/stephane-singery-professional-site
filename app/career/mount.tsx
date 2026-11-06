// How the journey script places the career instruments: React roots inside its chapter and over its globe.
import { createRef } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { CareerTimeline, StudyOrbitPreview, type OnExpand } from './Compact';
import { OrbitView, TrackView } from './views';
import type { ViewHandle, ViewProps } from './WideView';

export type Instrument = 'track' | 'orbit';

/** The compact preview in a chapter's reading column. Returns its node and how to remove it. */
export function mountInstrument(kind: Instrument, onExpand: OnExpand) {
  const host = document.createElement('div');
  host.className = 'case-host';
  const root = createRoot(host);
  flushSync(() =>
    root.render(
      kind === 'track' ? <CareerTimeline onExpand={onExpand} /> : <StudyOrbitPreview onExpand={onExpand} />,
    ),
  );
  return { node: host, unmount: () => queueMicrotask(() => root.unmount()) };
}

/** The wide view over the globe. Returns its node, its controls and how to remove it. */
export function mountView(kind: Instrument, props: ViewProps) {
  const host = document.createElement('div');
  host.className = 'case-host';
  const root = createRoot(host);
  const ref = createRef<ViewHandle>();
  flushSync(() =>
    root.render(kind === 'track' ? <TrackView ref={ref} {...props} /> : <OrbitView ref={ref} {...props} />),
  );
  return {
    root: host,
    focus: () => ref.current?.focus(),
    select: (key: string) => ref.current?.select(key),
    unmount: () => queueMicrotask(() => root.unmount()),
  };
}
