// Galileo and Juice scenes: what each study taught, and where the experience points next.
// Each scene answers its own chapter question and links to proof elsewhere instead of replaying it.
import { euMembers, euContext, euPoint } from './mission-geography-eu.js';

export function pathKit(k, ops) {
  const { text, line, hint, crew, readoutChip } = k;
  const { pill, arrow, defs, header } = ops;
  const caseLink = (x, y, w, key, kicker, sub) => `<g class="case-link" transform="translate(${x} ${y})" data-open-case="${key}" tabindex="0" role="button" aria-label="Open ${kicker.toLowerCase()}"><rect width="${w}" height="58" rx="3"/>${text(16, 24, kicker, 'mini-label')}${text(16, 44, sub, 'label small')}${text(w - 18, 36, '↗', 'chip-arrow end')}</g>`;

  // ---------- IUT Chartres: the four things logistics teaches you to look at ----------
  function ambitionScene({ pull, systems }) {
    const eu = `<defs><linearGradient id="euFadeX" gradientUnits="userSpaceOnUse" x1="425" x2="490" y1="0" y2="0"><stop stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><linearGradient id="euFadeY" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="630" y2="690"><stop stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="euFade" maskUnits="userSpaceOnUse" x="0" y="100" width="520" height="600"><rect x="0" y="100" width="520" height="600" fill="url(#euFadeX)"/><rect x="0" y="100" width="520" height="600" fill="url(#euFadeY)"/></mask></defs><g mask="url(#euFade)">${euContext.map(c => `<path d="${c.d}" class="eu-outside"/>`).join('')}</g>${euMembers.map(c => `<path d="${c.d}" class="eu-member"/>`).join('')}`;
    const stations = [['KIRUNA', 20.2, 67.9, 12, 4], ['REDU', 5.1, 50, 12, 4], ['CEBREROS', -4.4, 40.4, 12, 4]].map(([t, lon, lat, dx, dy]) => [t, ...euPoint(lon, lat).map(v => +v.toFixed(1)), dx, dy]);
    const orbit = 'M30 150Q300 60 620 150';
    const rowsEu = [
      ['ring-0', 'Understand', 'UNDERSTAND', 'Instruments and Data, known from the inside', `<path class="tx-spark on" d="M-24 10L-12-4-2 4 10-12 24-6"/>`],
      ['ring-1', 'Operate', 'OPERATE', 'Control centres run by European teams', `<rect class="tx-app" x="-24" y="-16" width="48" height="30" rx="3"/><path class="tx-spark on" d="M-16 2L-6-6 4 0 16-8"/>`],
      ['ring-2', 'Rely on', 'RELY ON', 'Services Europe can depend on', `<path class="tx-icon-p" d="M0-18L15-11V1C15 9 6 15 0 18-6 15-15 9-15 1V-11ZM-6 0L-1 5 7-5"/>`]
    ];
    const europe = `<g class="state-layer" data-states="2">
      ${hint('sovereignty', 'Built and run in Europe', 'Space, technology and communications that Europe can build, run and depend on.', `<g><g class="eu-map">${eu}</g>${text(40, 84, 'THE EUROPEAN UNION · 27 COUNTRIES', 'tx-label strong')}${text(40, 106, 'Built and run in Europe', 'tx-sub')}</g>`)}
      ${hint('eu-sat', 'A European space system', 'Satellites and the ground stations that receive their Data.', `<g><path class="tx-orbit" d="${orbit}"/>${stations.map(([t, x, y, dx, dy], i) => `<path class="tx-beam" style="--i:${i}" d="M380 122L${x} ${y}"/><path class="tx-station" transform="translate(${x} ${y})" d="M-11 8L0-6 11 8ZM-13-6A13 13 0 0 0 13-6"/>${text(x + dx, y + dy, t, 'tx-label')}`).join('')}<g class="tx-sat" transform="translate(380 109)"><rect x="-9" y="-7" width="18" height="14" rx="2"/><path d="M-9 0H-32M9 0H32"/><rect x="-44" y="-7" width="14" height="14"/><rect x="30" y="-7" width="14" height="14"/></g><circle class="tx-alert" r="5"><animateMotion dur="18s" repeatCount="indefinite" path="${orbit}"/></circle>${text(432, 100, 'SATELLITE', 'tx-label')}${text(537, 150, 'Gold: ESA ground stations', 'tx-sub')}</g>`)}
      ${rowsEu.map(([id, title, t, s, icon], i) => hint(id, title, '', `<g><circle class="tx-stage" cx="575" cy="${232 + i * 112}" r="38"/><g class="tx-icon" transform="translate(575 ${232 + i * 112})">${icon}</g>${text(630, 228 + i * 112, t, 'tx-label strong')}${text(630, 250 + i * 112, s, 'tx-sub')}</g>`)).join('')}
      ${hint('eu-rays', 'Positive influence', '', `<g><circle class="tx-stage" cx="575" cy="568" r="38"/><g class="tx-icon" transform="translate(575 568)"><circle r="20"/><path d="M-20 0H20M0-20C-11-9-11 9 0 20M0-20C11-9 11 9 0 20"/></g>${[0, 1, 2].map(i => `<path class="tx-wave" style="--i:${i}" d="M${622 + i * 14} ${548 - i * 3}Q${636 + i * 14} 568 ${622 + i * 14} ${588 + i * 3}"/>`).join('')}${text(680, 564, 'POSITIVE INFLUENCE', 'tx-label warm')}${text(680, 586, 'What Europe brings to the world', 'tx-sub')}</g>`)}</g>`;
    return `${header('EUROPEAN SPACE · MY GOAL')}${defs}${pull}${systems}${europe}`;
  }

  return { ambitionScene };
}
