import type { ComponentType } from 'react';

/**
 * Drawings converted to React, by scene name: every app/sections/<section>/scenes/<name>.tsx, found automatically.
 * A scene not found here still comes from app/legacy through LegacyScene until it is converted.
 */
const files = import.meta.glob<{ default: ComponentType }>('../sections/*/scenes/*.tsx', { eager: true });

export const scenes: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.replace(/^.*\/([^/]+)\.tsx$/, '$1'), mod.default]),
);
