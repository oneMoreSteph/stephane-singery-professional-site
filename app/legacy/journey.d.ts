import type { StopSection } from '~/content';

export interface JourneyOptions {
  stops: StopSection[];
  aboutSlug: string;
  navigate(path: string, options?: { replace?: boolean }): void;
  /** Renders a case window into the given node; returns how to remove it, or null if the case has no drawing. */
  mountCase(host: HTMLElement, key: string): (() => void) | null;
}

export interface Journey {
  start(pathname: string, search: string): void;
  goTo(pathname: string, search: string): Promise<void>;
  destroy(): void;
}

export function startJourney(options: JourneyOptions): Journey;
