import type { StopSection } from '~/content';

export interface JourneyOptions {
  stops: StopSection[];
  aboutSlug: string;
  navigate(path: string, options?: { replace?: boolean }): void;
}

export interface Journey {
  start(pathname: string, search: string): void;
  goTo(pathname: string, search: string): Promise<void>;
  destroy(): void;
}

export function startJourney(options: JourneyOptions): Journey;
