// Galileo and Juice scenes: what each study taught, and where the experience points next.
// Each scene answers its own chapter question and links to proof elsewhere instead of replaying it.
import { euMembers, euContext, euPoint } from './mission-geography-eu.js?v=20261105-v131';

export function pathKit(k, ops) {
  const { text, line, hint, crew, readoutChip } = k;
  const { pill, arrow, defs, header } = ops;
  const caseLink = (x, y, w, key, kicker, sub) => `<g class="case-link" transform="translate(${x} ${y})" data-open-case="${key}" tabindex="0" role="button" aria-label="Open ${kicker.toLowerCase()}"><rect width="${w}" height="58" rx="3"/>${text(16, 24, kicker, 'mini-label')}${text(16, 44, sub, 'label small')}${text(w - 18, 36, '↗', 'chip-arrow end')}</g>`;

  // ---------- IUT Chartres: the four things logistics teaches you to look at ----------
  function flowsScene() {
    const nodes = { supply: [150, 330], hub: [470, 330], a: [800, 190], b: [830, 330], c: [800, 470] };
    const edges = [['supply', 'hub'], ['hub', 'a'], ['hub', 'b'], ['hub', 'c']];
    const lens = [
      ['ROUTES', 'Train paths', 'flow-route', [300, 300]],
      ['RESOURCES', 'Locomotives · drivers', 'flow-res', [300, 388]],
      ['CONSTRAINTS', 'Works · capacity', 'flow-con', [470, 238]],
      ['PEOPLE WHO DEPEND ON IT', 'Freight customers', 'flow-ppl', [690, 560]]
    ];
    const net = `${edges.map(([p, q]) => line(`M${nodes[p].join(' ')}L${nodes[q].join(' ')}`, 'flow-edge')).join('')}
      ${edges.map(([p, q], i) => `<rect class="flow-packet" x="-5" y="-4" width="10" height="8" rx="1.5"><animateMotion dur="${5 + i}s" begin="-${i}s" repeatCount="indefinite" path="M${nodes[p].join(' ')}L${nodes[q].join(' ')}"/></rect>`).join('')}
      ${Object.entries(nodes).map(([id, [x, y]]) => `<g class="flow-node flow-node--${id}" transform="translate(${x} ${y})"><rect x="-34" y="-24" width="68" height="48" rx="4"/>${id === 'hub' ? '<path class="gauge" d="M-18 10A18 18 0 0 1 18 10"/><path class="gauge-needle" d="M0 10L11 -4"/>' : ['a', 'b', 'c'].includes(id) ? crew(0, 4, .8) : '<path class="crate" d="M-14-10h28v20h-28zM-14 0h28"/>'}</g>`).join('')}
      ${text(150, 380, 'SUPPLY', 'center mini-label')}${text(470, 380, 'HUB', 'center mini-label')}${text(890, 334, 'DELIVERY', 'mini-label')}
      <g transform="translate(300 344)">${crew(-14, 0, .55)}<rect class="truck" x="2" y="-10" width="26" height="16" rx="2"/></g>`;
    const tags = (states, sub) => `<g class="state-layer" data-states="${states}">${lens.map(([t, s, cls, [x, y]]) => hint(`${cls}-${states}`, t[0] + t.slice(1).toLowerCase(), sub ? `In rail, ${t.toLowerCase()} became ${s.toLowerCase()}.` : ({ ROUTES: 'Which way the flow can go, and how long it takes.', RESOURCES: 'What has to be available for anything to move: vehicles and people.', CONSTRAINTS: 'Limits on capacity and timing that shape every plan.', 'PEOPLE WHO DEPEND ON IT': 'The customers waiting at the end of the flow.' })[t], `<g class="lens ${cls}" transform="translate(${x} ${y})"><rect x="-4" y="-18" width="${Math.max(t.length * 8.6, sub ? s.length * 7.2 : 0) + 22}" height="${sub ? 44 : 26}" rx="3"/>${text(8, 0, t, 'mini-label')}${sub ? text(8, 18, s, 'label small') : ''}</g>`)).join('')}</g>`;
    return `${defs}${header('LOGISTICS · IUT CHARTRES')}${net}
      <g class="state-layer" data-states="0">${text(40, 640, 'FOUR THINGS TO SEE IN ANY FLOW', 'mini-label')}</g>${tags('0', false)}
      ${tags('1', true)}<g class="state-layer" data-states="1">${caseLink(40, 616, 300, 'rail', 'EARTH · SNCF', 'The same four, on a national rail network')}</g>`;
  }

  // ---------- Python · Jedha step 3: what practice added to the course ----------
  function practiceScene() {
    const course = ['DATASET', 'NOTEBOOK', 'MODEL'];
    const job = ['SOURCES', 'INGESTION', 'SQL MODELS', 'CURATED TABLES', 'BI', 'COLLEAGUES'];
    const row = (items, y, cls, x0, gap) => items.map((t, i) => `<g class="pipe ${cls}" transform="translate(${x0 + i * gap} ${y})"><rect width="${gap - 22}" height="46" rx="3"/>${text((gap - 22) / 2, 28, t, 'center mini-label')}</g>${i < items.length - 1 ? arrow(`M${x0 + i * gap + gap - 22} ${y + 23}H${x0 + (i + 1) * gap - 4}`) : ''}`).join('');
    return `${defs}${header('FROM COURSE TO PRACTICE')}
      ${text(502, 130, 'IN A COURSE', 'mini-label')}${row(course, 150, 'pipe-course', 502, 154)}${line('M568 196V316', 'course-drop')}${text(578, 262, 'A COURSE STARTS HERE', 'mini-label')}
      ${text(40, 300, 'AT FOODCHÉRI · FEB 2021', 'mini-label')}${row(job, 320, 'pipe-job', 40, 154)}
      <g class="beneath"><path d="M40 392v14h440v-14"/>${text(260, 432, 'THE ENGINEERING BENEATH A USEFUL ANSWER', 'center mini-label warm')}</g>
      ${hint('course-gap', 'What the course left out', 'A course hands you a clean dataset. In a company, someone has to bring the data in, define it and keep it usable first.', `<g transform="translate(40 480)">${text(0, 0, 'A course starts from a clean dataset. The job started three steps earlier.', 'label')}</g>`)}
      ${caseLink(40, 616, 340, 'food-data', 'SENTINEL-6 · FOODCHÉRI', 'The platform this became')}`;
  }

  // ---------- Juice · European space ambition ----------
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

  return { flowsScene, practiceScene, ambitionScene };
}
