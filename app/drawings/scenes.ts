import type { ComponentType } from 'react';

/**
 * Drawings by scene name: every app/sections/<section>/scenes/<name>.tsx, found automatically.
 */
const files = import.meta.glob<{ default: ComponentType }>('../sections/*/scenes/*.tsx', { eager: true });

export const scenes: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.replace(/^.*\/([^/]+)\.tsx$/, '$1'), mod.default]),
);
