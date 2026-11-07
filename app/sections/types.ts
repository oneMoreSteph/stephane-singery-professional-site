// Content model. One section = one folder under app/sections, listed once in app/sections/index.ts.

/** [label, heading, bullet lines] */
export type Beat = [label: string, heading: string, lines: string[] | string];

export type Vec3 = [x: number, y: number, z: number];

/** How a stop appears on the 3D map. */
export type Device =
  | { kind: 'globe' }
  | {
      kind: 'billboard';
      image: string;
      aspect: number;
      mapScale: number;
      chapterScale: number;
      hitRadius: number;
      phase: number;
    }
  | {
      kind: 'model';
      preset: 'galileo';
      mapScale: number;
      chapterScale: number;
      hitRadius: number;
      phase: number;
    }
  | { kind: 'none' };

/** A section that is a stop on the journey map. */
export interface Stop {
  /** Internal key used by the journey code and its styles, e.g. "earth". */
  key: string;
  /** Map label, e.g. "ISS / COLUMBUS". */
  label: string;
  /** Short name, e.g. "ISS / Columbus". */
  name: string;
  /** Line under the map label, e.g. "HIGH-STAKES CASES". */
  tagline: string;
  /** Map button name for screen readers, e.g. "ISS and Columbus". */
  spokenName: string;
  /** Map brief button, e.g. "VIEW EXPERIENCE". */
  action: string;
  eyebrow: string;
  /** Chapter heading. May contain <br> and <em>. */
  titleHtml: string;
  intro: string;
  /** Kicker above "Why this destination?", e.g. "EARTH". */
  hardware: string;
  position: Vec3;
  camera: Vec3;
  look: Vec3;
  device: Device;
  visual?: { image: string; alt: string; credit: string };
  about: { title: string; url: string; beats: Beat[] };
  /** Wide view opened from the chapter, if any. */
  instrument?: 'track' | 'orbit';
}

/** The interactive drawing of a case: one scene, one label per step. */
export interface Drawing {
  /** Scene name, e.g. "system-verisure". */
  scene: string;
  /** Step buttons, one per beat. */
  labels: string[];
  /** Line under the drawing: what is illustrative. */
  note: string;
  /** Adds the link to the map data sources. */
  mapSources?: boolean;
}

/** What the work brought to the company: the organisation, the business levers it served, one line. */
export interface Value {
  org: string;
  levers: string[];
  line: string;
}

/** Where a case sits on the career timeline. Years are decimal; boundaries within a year are approximate. */
export interface TimelineSpan {
  lane: 'ops' | 'data' | 'study';
  from: number;
  /** A year, or 'now' for a role in progress. */
  to: number | 'now';
  label: string;
  labelPos?: 'above' | 'below';
  /** A side activity: drawn thinner, below its lane. */
  thin?: boolean;
  tight?: boolean;
  passenger?: boolean;
  live?: boolean;
  /** A period that runs into the future: the part after today is drawn as a track. */
  expected?: boolean;
  org: string;
  period: string;
  title: string;
  fact: string;
  /** [figure, caption, unit] shown in the wide view. */
  metric?: [figure: string, caption: string, unit?: string];
}

/** A study period drawn as an orbit around work on Earth. */
export interface StudyOrbit {
  r: number;
  label: string;
  period: string;
  /** What the period led to. */
  led: string;
  /** Where the craft sits when motion is reduced, in degrees. */
  angle: number;
  inProgress?: boolean;
}

export interface Case {
  /** Address segment and drawing key, e.g. "verisure". */
  slug: string;
  logo?: string;
  icon?: string;
  symbol?: string;
  tag: string;
  title: string;
  summary: string;
  category: string;
  takeaway: string;
  beats: Beat[];
  drawing?: Drawing;
  /** What the work brought to the company, shown at the end of the story. */
  value?: Value;
  timeline?: TimelineSpan;
  orbit?: StudyOrbit;
}

export interface Section {
  /** Address: "/<slug>". */
  slug: string;
  kind: 'stop' | 'page';
  /** Page heading and title. */
  title: string;
  /** Search and link-preview description. */
  description: string;
  stop?: Stop;
  cases: Case[];
}
