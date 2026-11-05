import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useDrawing } from '~/drawings/context';
import { sceneMarkup } from './mission-case-art.js';

/**
 * A drawing not yet converted to React: its markup comes from the previous code as text.
 * This adapter gives it the same behaviour as converted drawings (layers, lit and clicked elements, click areas).
 * It disappears once every scene is in app/drawings/scenes.ts.
 */
export function LegacyScene({ name }: { name: string }) {
  const { step, touredId, inspectedId } = useDrawing();
  const ref = useRef<SVGGElement>(null);
  const html = useMemo(() => ({ __html: sceneMarkup(name) }), [name]);

  // Click areas, as the previous engine added them once the drawing was on screen.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ref.current?.querySelectorAll<SVGGraphicsElement>('[data-inspect]').forEach((obj) => {
        const b = obj.getBBox();
        const hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const attrs = { x: b.x - 7, y: b.y - 7, width: b.width + 14, height: b.height + 14, fill: 'transparent', 'pointer-events': 'all' };
        for (const [k, v] of Object.entries(attrs)) hit.setAttribute(k, String(v));
        obj.prepend(hit);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [html]);

  // Layers of the current step, and the parts a system drawing brings forward at this step.
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll<SVGElement>('[data-states]').forEach((n) => {
      const shown = (n.dataset.states ?? '').split(' ').includes(String(step));
      n.classList.toggle('layer-hidden', !shown);
      n.setAttribute('aria-hidden', String(!shown));
      n.querySelectorAll('[tabindex]').forEach((o) => o.setAttribute('tabindex', shown ? '0' : '-1'));
    });
    const sys = root.querySelector<SVGElement>('.sys[data-focus]');
    if (sys) {
      const focus = (JSON.parse(sys.dataset.focus ?? '[]')[step] || '').split(' ');
      sys.querySelectorAll<SVGElement>('[data-id]').forEach((m) => m.classList.toggle('is-focus', focus.includes(m.dataset.id ?? '')));
    }
  }, [step, html]);

  // Lit and clicked elements.
  useLayoutEffect(() => {
    ref.current?.querySelectorAll<SVGElement>('[data-inspect]').forEach((n) => {
      n.classList.toggle('is-toured', n.dataset.inspect === touredId);
      n.classList.toggle('is-inspected', n.dataset.inspect === inspectedId);
    });
  }, [touredId, inspectedId, html]);

  return <g ref={ref} className="legacy-scene" dangerouslySetInnerHTML={html} />;
}
