// Accessible names for clickable drawing elements. Voice control users say what they see, so a name starts with the
// element's visible text, then says what the element is or does when the text does not already (WCAG 2.5.3).
import { useLayoutEffect, useRef, useState } from 'react';

const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

/** The visible text of an SVG element followed by `purpose`, unless the text already contains it. */
export function spokenName(el: Element, purpose: string): string {
  const visible = [...el.querySelectorAll('text')]
    .filter((t) => !t.closest('[aria-hidden="true"]'))
    .map((t) => t.textContent?.trim() ?? '')
    .filter((t) => /[\p{L}\p{N}]/u.test(t))
    .join(' ')
    .replace(/\s+/g, ' ');
  if (!visible) return purpose;
  return words(visible).includes(words(purpose)) ? visible : `${visible}: ${purpose}`;
}

/** A ref for the element and its accessible name, computed once it is drawn. */
export function useSpokenName<T extends SVGElement>(purpose: string) {
  const ref = useRef<T>(null);
  const [name, setName] = useState(purpose);
  useLayoutEffect(() => {
    if (ref.current) setName(spokenName(ref.current, purpose));
  }, [purpose]);
  return [ref, name] as const;
}

type GProps = React.SVGProps<SVGGElement>;

/** A clickable group in a drawing, reachable by keyboard, named from its visible text and `purpose`. */
export function SvgButton({ purpose, children, ...rest }: GProps & { purpose: string }) {
  const [ref, name] = useSpokenName<SVGGElement>(purpose);
  return (
    <g ref={ref} tabIndex={0} role="button" {...rest} aria-label={name}>
      {children}
    </g>
  );
}
