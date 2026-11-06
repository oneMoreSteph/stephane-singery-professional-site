import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { concepts } from '~/drawings/data/concepts';
import { LayerVisible, useDrawing } from './context';

interface Props {
  /** Unique within the drawing; also the key of its click text in the concepts list. */
  id: string;
  title: string;
  /** Click text when the concepts list has none: "what it is|why it matters", or one sentence. */
  body?: string;
  className?: string;
  children: React.ReactNode;
}

/** An element the highlight tour visits and the visitor can click to read what it is and why it matters. */
export function Inspectable({ id, title, body = '', className = '', children }: Props) {
  const { touredId, inspectedId } = useDrawing();
  const visible = useContext(LayerVisible);
  const ref = useRef<SVGGElement>(null);
  const [hit, setHit] = useState<DOMRect | null>(null);
  const concept = concepts[id];

  // A transparent area 7 units around the element makes thin drawings easy to click.
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (ref.current) setHit(ref.current.getBBox());
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const classes = [
    'scene-object',
    className,
    touredId === id && 'is-toured',
    inspectedId === id && 'is-inspected',
  ];
  return (
    <g
      ref={ref}
      className={classes.filter(Boolean).join(' ')}
      tabIndex={visible ? 0 : -1}
      role="button"
      aria-label={title}
      data-inspect={id}
      data-title={title}
      data-body={concept ? concept.join('|') : body}
    >
      {hit && (
        <rect
          x={hit.x - 7}
          y={hit.y - 7}
          width={hit.width + 14}
          height={hit.height + 14}
          fill="transparent"
          pointerEvents="all"
        />
      )}
      {children}
      <title>{title}</title>
    </g>
  );
}
