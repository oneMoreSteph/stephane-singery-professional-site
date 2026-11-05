// THE section list. Order here is the order on the map, in the navigation and in the page list.
// To add a section: create its folder next to this file, then add one line below.
import type { Section } from './types';
import experience from './experience';
import highStakes from './high-stakes';
import difference from './difference';
import education from './education';
import europeanSpace from './european-space';
import contact from './contact';

export const sections: Section[] = [experience, highStakes, difference, education, europeanSpace, contact];
