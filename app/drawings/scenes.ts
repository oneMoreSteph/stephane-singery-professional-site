import type { ComponentType } from 'react';

/**
 * Drawings converted to React, by scene name. A scene not listed here still comes from app/legacy
 * through LegacyScene until it is converted.
 */
export const scenes: Record<string, ComponentType> = {};
