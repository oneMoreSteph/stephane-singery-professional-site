import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { findCase } from '~/content';
import { CaseWindow } from './CaseWindow';

/**
 * Renders a case window into a node of the journey's detail panel. Returns how to remove it,
 * or null when the case has no drawing (its text is then shown on its own).
 */
export function mountCase(host: HTMLElement, key: string): (() => void) | null {
  const found = findCase(key);
  if (!found?.item.drawing) return null;
  const root = createRoot(host);
  // Another case asked from inside a drawing: the journey listens for this event on the detail panel.
  const openCase = (k: string) =>
    host.dispatchEvent(new CustomEvent('portfolio:open-case', { bubbles: true, detail: { key: k } }));
  flushSync(() => root.render(<CaseWindow item={found.item} onOpenCase={openCase} />));
  return () => queueMicrotask(() => root.unmount());
}
