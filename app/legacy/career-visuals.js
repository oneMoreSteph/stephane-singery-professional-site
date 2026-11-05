// Chapter-level instruments: a to-scale career timeline (Earth) and an orbit-raising view of studies (Galileo).
// Each one has a compact preview for the reading column and a wide view that opens over the globe.
// Dates are year-level; boundaries inside a year are approximate and say so on the page.
const NS = 'http://www.w3.org/2000/svg';
const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const nowYear = () => { const d = new Date(); return Math.min(2028.6, d.getFullYear() + d.getMonth() / 12); };
const laneName = { ops: 'OPERATIONS', data: 'DATA', study: 'STUDY' };

const spans = [
  { key: 'vfli', lane: 'ops', from: 2010, to: 2011.9, label: 'VFLI', org: 'SNCF · VFLI', period: '2010–2012', title: 'Rail Resources Manager', fact: 'Keeping freight trains moving, day and night.', metric: ['24/7', 'Last-minute solutions, in 3×8 shifts', 'three shifts a day'] },
  { key: 'rail', lane: 'ops', from: 2012, to: 2016.7, label: 'SNCF RÉSEAU', org: 'SNCF RÉSEAU', period: '2012–2016', title: 'Rail Capacity Consultation Officer', fact: 'Securing freight customers’ capacity, two or three years ahead.', metric: ['2–3', 'From two or three years ahead to the day of circulation', 'years ahead'] },
  { key: 'ligne-c', lane: 'ops', from: 2016.85, to: 2019.7, label: 'SNCF VOYAGEURS', tight: true, passenger: true, org: 'SNCF · TRANSILIEN LIGNE C', period: 'Nov 2016–Aug 2019', title: 'Passenger Care and Information Manager', fact: 'Care plans for works, events and incidents, and the first mechanism to assess them.', metric: ['42', 'Covered by care plans', 'stations'] },
  { key: 'hubs', lane: 'ops', from: 2016, to: 2020, thin: true, label: 'FOODCHÉRI HUBS', org: 'FOODCHÉRI · HUB MANAGER', period: '2016–2019 · evenings and weekends', title: 'Hub Manager', fact: 'Stock, order dispatch and multi-order rider routes, connected in a live service.', metric: ['6', '', 'Paris delivery hubs'] },
  { key: 'food-data', lane: 'data', from: 2021.1, to: 2022.5, label: 'FOODCHÉRI', labelPos: 'above', org: 'FOODCHÉRI / SEAZON', period: 'Feb 2021–2022', title: 'BI Engineer / Data Product Owner', fact: 'A first Data Platform, and analysis opened to the whole company.', metric: ['2 → 25', '', 'active analysis producers'] },
  { key: 'heetch', lane: 'data', from: 2022.6, to: 2025.6, label: 'HEETCH', org: 'HEETCH', period: '2022–2025', title: 'Data Engineer', fact: 'The transformation core of a near-real-time Data Platform.', metric: ['Toward hourly', 'From a daily refresh'] },
  { key: 'verisure', lane: 'data', from: 2025.7, to: 'now', label: 'VERISURE', labelPos: 'above', live: true, org: 'VERISURE', period: '2025–present', title: 'Analytics Engineer · apprenticeship', fact: 'From a request for Data tests to a Data Quality and Observability platform.', metric: ['525', 'One square: 5 tests', 'automated Data tests a day'] },
  { key: 'study-logistics', lane: 'study', from: 2008.7, to: 2010.5, label: 'IUT CHARTRES', labelPos: 'below', org: 'IUT CHARTRES', period: '2008–2010', title: 'Logistics and transport', fact: 'University diploma in logistics and transportation management. It opened the way to rail operations.' },
  { key: 'study-data', lane: 'study', from: 2019.5, to: 2021.1, label: 'SELF-TAUGHT · DATA', labelPos: 'below', org: 'SELF-TAUGHT, THEN JEDHA', period: '2019–2021', title: 'Self-taught in Data, then a Data Science Developer programme', fact: 'Self-directed Python first, then the Jedha Data Science Developer programme.', metric: ['~450', 'Intensive, certified programme', 'hours'] },
  { key: 'study-efrei', lane: 'study', from: 2025.7, to: 2028.6, expected: true, label: 'EFREI · EXPECTED 2028', labelPos: 'below', org: 'EFREI', period: '2025–2028 expected', title: 'Engineering degree, in progress', fact: 'Computer Science, Big Data & Machine Learning, studied alongside the Verisure role.', metric: ['Year 2', 'Degree expected 2028', 'of 3'] }
];
const byKey = key => spans.find(s => s.key === key);
const chronological = [...spans].sort((a, b) => a.from - b.from).map(s => s.key);

const orbits = [
  { key: 'study-logistics', r: 150, label: 'IUT CHARTRES', period: '2008–2010', led: 'Led to SNCF rail operations, 2010', angle: -150 },
  { key: 'study-data', r: 205, label: 'SELF-TAUGHT · DATA', period: '2019–2021', led: 'Led to the FoodChéri Data team, Feb 2021', angle: -40 },
  { key: 'study-efrei', r: 260, label: 'EFREI', period: '2025–2028 EXPECTED', led: 'Widening to software, databases, cloud and networks', angle: -120, inProgress: true }
];

function svgEl(markup, viewBox, label, hidden = false) {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', viewBox);
  if (hidden) svg.setAttribute('aria-hidden', 'true');
  else { svg.setAttribute('role', 'group'); svg.setAttribute('aria-label', label); }
  svg.innerHTML = markup;
  return svg;
}

const legendTrack = '<i class="lg-ops"></i>Operations<i class="lg-data"></i>Data<i class="lg-study"></i>Study';
const legendOrbit = '<i class="lg-study"></i>Completed<i class="lg-expected"></i>Expected';

// Compact previews: the whole instrument opens the wide view; chapter cards still light their matching mark.
function compact(kind, eyebrow, legend, svg, caption, onExpand) {
  const root = document.createElement('section');
  root.className = `career-visual career-visual--${kind} career-visual--compact`;
  root.setAttribute('aria-label', eyebrow);
  root.innerHTML = `<header class="cv-header"><span class="eyebrow">${eyebrow}</span><span class="cv-legend">${legend}</span></header>`;
  svg.classList.add('cv-svg');
  const foot = document.createElement('div');
  foot.className = 'cv-foot';
  foot.innerHTML = `<p>${caption}</p><button type="button" class="cv-expand">EXPAND <span aria-hidden="true">↗</span></button>`;
  root.append(svg, foot);
  const expand = foot.querySelector('.cv-expand');
  expand.setAttribute('aria-label', `Expand the ${kind === 'timeline' ? 'career timeline' : 'education orbits'}`);
  expand.addEventListener('click', () => onExpand(null, expand));
  svg.addEventListener('click', e => onExpand(e.target.closest('[data-case]')?.dataset.case || null, expand));
  const light = key => {
    root.classList.toggle('has-focus', !!key);
    root.querySelectorAll('[data-case]').forEach(n => n.classList.toggle('is-active', n.dataset.case === key));
    document.querySelectorAll('.chapter-item').forEach(n => n.classList.toggle('is-linked', n.dataset.case === key));
  };
  svg.addEventListener('pointerover', e => light(e.target.closest('[data-case]')?.dataset.case || null));
  svg.addEventListener('pointerleave', () => light(null));
  return root;
}

export function renderCareerTimeline(onExpand) {
  const now = nowYear();
  const x0 = 8, x1 = 512, y0 = 2008, y1 = 2029;
  const x = year => x0 + (year - y0) / (y1 - y0) * (x1 - x0);
  const laneY = { ops: 10, data: 36, study: 62 };
  const ticks = [2008, 2012, 2016, 2020, 2024, 2028].map(year => `<g class="tl-tick"><path d="M${x(year)} 4V76"/><text x="${x(year)}" y="92">${year}</text></g>`).join('');
  const bars = spans.map((s, i) => {
    const end = s.to === 'now' ? now : s.to;
    const top = laneY[s.lane] + (s.thin ? 12 : 0), h = s.thin ? 5 : 9;
    const bx = x(s.from), bw = Math.max(4, x(end) - bx), done = s.expected ? Math.max(0, x(now) - bx) : bw;
    return `<g class="tl-span tl-span--${s.lane}${s.passenger ? ' tl-span--passenger' : ''}" data-case="${s.key}" style="--i:${i}">
      <rect class="tl-hit" x="${bx - 3}" y="${top - 5}" width="${bw + 6}" height="${h + 10}"/>
      ${s.expected ? `<rect class="tl-track" x="${bx}" y="${top}" width="${bw}" height="${h}" rx="1.5"/>` : ''}
      <rect class="tl-bar" x="${bx}" y="${top}" width="${done}" height="${h}" rx="1.5"/>
      ${s.live ? `<circle class="tl-live-ring" cx="${bx + bw}" cy="${top + h / 2}" r="3"/>` : ''}</g>`;
  }).join('');
  const markup = `<g class="tl-grid">${ticks}</g><g class="tl-spans">${bars}</g>
    <g class="tl-now"><path d="M${x(now)} 0V78"/></g>`;
  const svg = svgEl(markup, '0 0 520 96', '', true);
  return compact('timeline', 'GROUND TRACK · 2008 → 2028', legendTrack, svg,
    'Overlaps matter: <b>the Paris hubs ran alongside rail</b>, and <b>EFREI runs alongside Verisure</b>.', onExpand);
}

function orbitMarkup(suffix) {
  const cx = 260, cy = 330, earth = 110;
  const pt = (r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
  const arc = (r, a, b) => { const [sx, sy] = pt(r, a), [ex, ey] = pt(r, b); return `M${sx.toFixed(1)} ${sy.toFixed(1)}A${r} ${r} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`; };
  const still = reducedMotion();
  const groups = orbits.map((o, i) => {
    const s = byKey(o.key), full = arc(o.r, -170, -10);
    // EFREI: the completed two thirds are solid, the expected final year is dashed.
    const done = o.inProgress ? arc(o.r, -170, -63) : full;
    const [sx, sy] = pt(o.r, o.angle);
    const craft = still
      ? `<g class="orbit-craft" transform="translate(${sx.toFixed(1)} ${sy.toFixed(1)})"><circle r="4.5"/></g>`
      : `<g class="orbit-craft"><circle r="4.5"/><animateMotion dur="${30 + i * 9}s" begin="-${(i * 7 + 4)}s" repeatCount="indefinite" path="${done}"/></g>`;
    return `<g class="orbit orbit--${i + 1}${o.inProgress ? ' orbit--progress' : ''}" data-case="${o.key}" tabindex="-1" role="button" aria-label="${esc(`${s.title}, ${s.period}`)}">
      <path class="orbit-hit" d="${full}"/>
      <path class="orbit-track" d="${full}"/>
      <path class="orbit-path" d="${done}"/>
      ${craft}
      <text class="orb-label" x="${cx}" y="${cy - o.r - 9}"><tspan class="orb-index">${String(i + 1).padStart(2, '0')}</tspan> ${o.label} <tspan class="orb-period">${o.period}</tspan></text>
    </g>`;
  }).join('');
  const transfer = (a, b, from, to) => { const [sx, sy] = pt(a, from), [ex, ey] = pt(b, to); return `<path class="orbit-transfer" d="M${sx.toFixed(1)} ${sy.toFixed(1)}Q${((sx + ex) / 2).toFixed(1)} ${((sy + ey) / 2 + 18).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}"/><circle class="orbit-burn" cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="2.5"/>`; };
  return `<defs><radialGradient id="orbitEarth${suffix}" cx=".5" cy=".12" r=".95"><stop stop-color="#4b93ae"/><stop offset=".4" stop-color="#143f55"/><stop offset="1" stop-color="#04131f"/></radialGradient><radialGradient id="orbitShade${suffix}" cx=".38" cy=".32" r=".75"><stop offset=".45" stop-color="#04131f" stop-opacity="0"/><stop offset="1" stop-color="#04131f" stop-opacity=".88"/></radialGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="${earth + 7}" class="orbit-atmo"/>
    <clipPath id="orbitClip${suffix}"><circle cx="${cx}" cy="${cy}" r="${earth}"/></clipPath>
    <image href="/assets/nasa/blue-marble-2048.png" x="${cx - 418}" y="${cy - 121}" width="792" height="396" preserveAspectRatio="none" clip-path="url(#orbitClip${suffix})" class="orbit-earth-img"/>
    <circle cx="${cx}" cy="${cy}" r="${earth}" fill="url(#orbitShade${suffix})" class="orbit-earth"/>
    <text class="orbit-earth-label" x="${cx}" y="${cy - earth + 34}">WORK ON EARTH</text>
    ${transfer(150, 205, -152, -138)}${transfer(205, 260, -28, -42)}${groups}`;
}

export function renderStudyOrbit(onExpand) {
  const svg = svgEl(orbitMarkup('C'), '0 44 520 260', '', true);
  return compact('orbit', 'ORBIT RAISING · THREE MANOEUVRES', legendOrbit, svg,
    'Each study period widened the systems I could work on.', onExpand);
}

// Wide timeline: redrawn for a large stage rather than scaled up, so every label sits on or next to its own bar.
function trackMarkup() {
  const now = nowYear();
  const x0 = 120, x1 = 984, y0 = 2008, y1 = 2029;
  const x = year => x0 + (year - y0) / (y1 - y0) * (x1 - x0);
  const lane = { ops: 116, data: 286, study: 412 }, axis = 486;
  const ticks = [];
  for (let year = y0; year <= 2028; year++) ticks.push(`<g class="tl-tick${year % 2 ? ' tl-tick--minor' : ''}"><path d="M${x(year)} 64V${axis}"/><text x="${x(year)}" y="${axis + 22}">${year % 2 ? `’${String(year).slice(2)}` : year}</text></g>`);
  const bars = spans.map((s, i) => {
    const end = s.to === 'now' ? now : s.to;
    const top = lane[s.lane] + (s.thin ? 42 : 0), h = s.thin ? 20 : 30;
    const bx = x(s.from), bw = Math.max(8, x(end) - bx);
    const done = s.expected ? Math.max(0, Math.min(bw, x(now) - bx)) : bw;
    const cx = bx + bw / 2;
    const label = s.labelPos === 'above' ? `<text class="tl-label" text-anchor="middle" x="${cx}" y="${top - 11}">${s.label}</text>`
      : s.labelPos === 'below' ? `<text class="tl-label" text-anchor="middle" x="${cx}" y="${top + h + 21}">${s.label}</text>`
      : `<text class="tl-label tl-label--inside${s.tight ? ' tl-label--tight' : ''}" x="${bx + (s.tight ? 8 : 10)}" y="${top + h / 2 + 4.5}">${s.label}</text>`;
    return `<g class="tl-span tl-span--${s.lane}${s.thin ? ' tl-span--thin' : ''}${s.passenger ? ' tl-span--passenger' : ''}" data-case="${s.key}" data-from="${bx}" data-to="${bx + bw}" data-top="${top + h}" tabindex="-1" role="button" aria-label="${esc(`${s.org}: ${s.title}, ${s.period}`)}" style="--i:${i}">
      <rect class="tl-hit" x="${bx - 5}" y="${top - 28}" width="${bw + 10}" height="${h + 54}"/>
      ${s.expected ? `<rect class="tl-track" x="${bx}" y="${top}" width="${bw}" height="${h}" rx="2"/>` : ''}
      <rect class="tl-bar" x="${bx}" y="${top}" width="${done}" height="${h}" rx="2"/>
      ${s.live ? `<circle class="tl-live" cx="${bx + bw}" cy="${top + h / 2}" r="6"/><circle class="tl-live-ring" cx="${bx + bw}" cy="${top + h / 2}" r="6"/>` : ''}
      ${label}</g>`;
  }).join('');
  const bracket = (from, to, text) => `<g class="tv-bracket"><path d="M${x(from)} 50V42H${x(to)}V50"/><text x="${(x(from) + x(to)) / 2}" y="32">${text}</text></g>`;
  return {
    viewBox: '0 0 1000 532', x0, x1, axis,
    markup: `<g class="tl-grid">${ticks.join('')}<path class="tl-axis" d="M${x0} ${axis}H${x1}"/></g>
    ${Object.entries(lane).map(([id, y]) => `<text class="tl-lane" x="0" y="${y + 19}">${laneName[id]}</text><path class="tl-lane-rule" d="M${x0} ${y + 15}H${x1}"/>`).join('')}
    ${bracket(2010, 2020, 'OPERATIONS · 2010–2019')}${bracket(2021.1, now, 'DATA · SINCE FEB 2021')}
    <path class="tl-bridge" d="M${x(2020)} ${lane.ops + 62}C${x(2020) + 6} 232 ${x(2021.1) - 10} 226 ${x(2021.1)} ${lane.data}"/>
    <text class="tl-note" text-anchor="end" x="${x(2020) - 8}" y="226">RETRAINING ↘</text>
    <path class="tl-bridge" d="M${x(2021.1)} ${lane.study}V${lane.data + 30}"/>
    <text class="tl-note" x="${x(2021.1) + 7}" y="${(lane.data + lane.study) / 2 + 18}">FEB 2021</text>
    <g class="tv-sel" aria-hidden="true"><rect class="tv-sel__band" y="${axis - 3}" height="6"/><path class="tv-sel__from"/><path class="tv-sel__to"/></g>
    <g class="tl-spans">${bars}</g>
    <g class="tl-now"><path d="M${x(now)} 56V${axis}"/><text x="${x(now)}" y="${lane.ops - 26}">NOW</text></g>
    <g class="tv-scrub" aria-hidden="true"><path d="M0 64V${axis}"/><rect x="-23" y="${axis + 26}" width="46" height="17" rx="2"/><text y="${axis + 38.5}">2020</text></g>`
  };
}

// Shared shell for the wide views: stage on the left, detail pane on the right, keyboard stepping between items.
// A small drawing per figure, so the number shows what it measures.
function metricViz(key) {
  const still = reducedMotion();
  const ride = (d, dur, inner) => still ? '' : `<g>${inner}<animateMotion path="${d}" dur="${dur}s" repeatCount="indefinite"/></g>`;
  const t = (x, y, v, c = '') => `<text class="mv-t ${c}" x="${x}" y="${y}">${esc(v)}</text>`;
  const seq = (i, n, step = .5) => `--d:${(i * step).toFixed(2)}s;--t:${(n * step).toFixed(2)}s`;
  const views = {
    vfli: () => `<circle class="mv-ring" cx="26" cy="26" r="20"/>${[0, 120, 240].map(a => `<path class="mv-arc" transform="rotate(${a} 26 26)" d="M26 6A20 20 0 0 1 43.3 16"/>`).join('')}<path class="mv-hand" d="M26 26V10">${still ? '' : '<animateTransform attributeName="transform" type="rotate" from="0 26 26" to="360 26 26" dur="10.5s" repeatCount="indefinite"/>'}</path>
      ${Array.from({ length: 21 }, (_, i) => `<rect class="mv-cell mv-seq" style="${seq(i, 21)}" x="${70 + Math.floor(i / 3) * 30}" y="${4 + (i % 3) * 13}" width="26" height="10" rx="2"/>`).join('')}${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => t(83 + i * 30, 52, d, 'mid')).join('')}`,
    rail: () => `<path class="mv-axis" d="M8 24H272"/>${[['Y−3', 8], ['Y−2', 92], ['Y−1', 176]].map(([l, x]) => `<path class="mv-axis" d="M${x} 18V30"/>${t(x, 46, l, 'mid')}`).join('')}<circle class="mv-ping" cx="264" cy="24" r="9"/><circle class="mv-gold" cx="264" cy="24" r="4"/>${t(264, 46, 'D', 'mid gold')}${ride('M8 24H264', 7, '<rect class="mv-train" x="-11" y="-4" width="22" height="8" rx="3"/>')}`,
    'ligne-c': () => `<path class="mv-rail" d="M4 24H276"/>${Array.from({ length: 42 }, (_, i) => `<circle class="mv-stop mv-seq" style="${seq(i, 42, .2)}" cx="${(4 + i * 6.63).toFixed(1)}" cy="24" r="2.6"/>`).join('')}`,
    hubs: () => `<ellipse class="mv-ring" cx="140" cy="26" rx="128" ry="20"/>${t(140, 30, 'PARIS', 'mid')}${[[22, 26], [70, 10], [210, 10], [258, 26], [210, 42], [70, 42]].map(([x, y], i) => `<circle class="mv-stop mv-seq" style="${seq(i, 6, 1)}" cx="${x}" cy="${y}" r="5"/>`).join('')}`,
    'food-data': () => Array.from({ length: 25 }, (_, i) => `<g class="mv-person ${i < 2 ? 'on' : 'mv-fill'}" style="--i:${i}" transform="translate(${5 + i * 11} 30)"><circle cy="-10" r="3"/><path d="M-4 0V-2A4 4 0 0 1 4-2V0Z"/></g>`).join('') + t(11, 46, '2', 'mid gold') + t(269, 46, '25', 'mid'),
    heetch: () => `${t(0, 18, 'DAILY')}<rect class="mv-tick" x="58" y="6" width="5" height="14"/>${t(0, 44, 'HOURLY')}${Array.from({ length: 24 }, (_, i) => `<rect class="mv-tick mv-seq" style="${seq(i, 24, .25)}" x="${58 + i * 9.2}" y="32" width="5" height="14"/>`).join('')}`,
    verisure: () => Array.from({ length: 105 }, (_, i) => `<rect class="mv-test ${i === 58 ? 'ko' : 'mv-fill'}" style="--i:${i * .48}" x="${(2 + (i % 35) * 7.85).toFixed(2)}" y="${5 + Math.floor(i / 35) * 8}" width="6" height="6" rx="1"/>`).join('') + (still ? '' : `<rect class="mv-scan" y="3" width="3" height="26">${'<animate attributeName="x" values="2;276;2" dur="8s" repeatCount="indefinite"/>'}</rect>`),
    'study-data': () => {
      const groups = ['PYTHON', 'ANALYSIS', 'ML', 'DL', 'DATA ENG', 'PROJECT'];
      return Array.from({ length: 45 }, (_, i) => { const g = Math.floor(i / 7.5); return `<rect class="mv-hour mv-fill" style="--i:${i}" x="${(1 + i * 5.85 + g * 3).toFixed(1)}" y="6" width="4" height="22" rx="1"/>`; }).join('') + groups.map((g, i) => t(23 + i * 46.9, 44, g, 'mid small')).join('');
    },
    'study-efrei': () => `<rect class="mv-year done" x="2" y="8" width="88" height="16" rx="2"/><rect class="mv-year" x="94" y="8" width="88" height="16" rx="2"/><rect class="mv-year now" x="94" y="8" width="44" height="16" rx="2"/><rect class="mv-year next" x="186" y="8" width="88" height="16" rx="2"/>${t(46, 42, '2025', 'mid')}${t(138, 42, '2026 · NOW', 'mid gold')}${t(230, 42, '2027–28', 'mid')}`
  };
  return views[key] ? `<svg class="mv" viewBox="0 0 280 54" aria-hidden="true">${views[key]()}</svg>` : '';
}

function wideView({ kind, eyebrow, heading, legend, svg, order, selected, note, onOpen, onClose, decorate, openLabel = () => 'OPEN THE CASE' }) {
  const root = document.createElement('div');
  root.className = `tv tv--${kind}`;
  root.innerHTML = `<div class="tv-scrim" aria-hidden="true"></div>
    <section class="tv-panel" role="dialog" aria-modal="true" aria-labelledby="tv-title">
      <header class="tv-head"><div><span class="eyebrow">${eyebrow}</span><h2 id="tv-title">${heading}</h2></div><span class="cv-legend">${legend}</span><button type="button" class="tv-close" aria-label="Close and return to the chapter">×</button></header>
      <div class="tv-body"><div class="tv-stage"></div>
        <aside class="tv-pane"><div class="tv-pane__live" aria-live="polite"></div>
          <button type="button" class="primary-action tv-open">OPEN THE CASE <span aria-hidden="true">↗</span></button>
          <nav class="tv-step" aria-label="Step through periods"><button type="button" data-step="-1" aria-label="Previous period">←</button><span class="tv-count"></span><button type="button" data-step="1" aria-label="Next period">→</button></nav>
        </aside></div>
      <footer class="tv-foot"><p>${note}</p><p class="tv-keys"><kbd>←</kbd><kbd>→</kbd> step · <kbd>Enter</kbd> open · <kbd>Esc</kbd> close</p></footer>
    </section>`;
  const stage = root.querySelector('.tv-stage'), live = root.querySelector('.tv-pane__live');
  const openButton = root.querySelector('.tv-open'), count = root.querySelector('.tv-count');
  svg.classList.add('tv-svg');
  stage.append(svg);
  let pinned = order.includes(selected) ? selected : order.at(-1);

  const show = key => {
    const s = byKey(key), o = orbits.find(item => item.key === key);
    svg.querySelectorAll('[data-case]').forEach(n => n.classList.toggle('is-active', n.dataset.case === key));
    live.innerHTML = `<span class="tv-lane tv-lane--${s.lane}">${laneName[s.lane]} · ${esc(s.period)}</span>
      <small>${esc(s.org)}</small><h3>${esc(s.title)}</h3>
      ${s.metric ? `<div class="tv-metric"><div class="tv-fig"><b>${esc(s.metric[0])}</b>${s.metric[2] ? `<em>${esc(s.metric[2])}</em>` : ''}</div>${metricViz(s.key)}${s.metric[1] ? `<span>${esc(s.metric[1])}</span>` : ''}</div>` : ''}
      ${kind === 'orbit' ? `<p>${esc(s.fact)}</p>` : ''}${o ? `<p class="tv-led">${esc(o.led)}</p>` : ''}`;
    decorate?.(svg, key);
  };
  const pin = (key, focus = false) => {
    pinned = key;
    show(key);
    openButton.dataset.case = key;
    openButton.innerHTML = `${esc(openLabel(key))} <span aria-hidden="true">↗</span>`;
    count.textContent = `${order.indexOf(key) + 1} / ${order.length}`;
    svg.querySelectorAll('[data-case]').forEach(n => n.setAttribute('tabindex', n.dataset.case === key ? '0' : '-1'));
    const node = svg.querySelector(`[data-case="${key}"]`);
    if (focus) node?.focus({ preventScroll: true });
    // On narrow screens the stage scrolls sideways; keep the selected period in view.
    if (node && stage.scrollWidth > stage.clientWidth + 1) {
      const box = node.getBoundingClientRect(), frame = stage.getBoundingClientRect();
      stage.scrollLeft += box.left + box.width / 2 - (frame.left + frame.width / 2);
    }
  };
  const step = (delta, focus) => pin(order[(order.indexOf(pinned) + delta + order.length) % order.length], focus);

  svg.addEventListener('pointerover', e => { const t = e.target.closest('[data-case]'); if (t) show(t.dataset.case); });
  svg.addEventListener('pointerleave', () => show(pinned));
  svg.addEventListener('click', e => {
    const t = e.target.closest('[data-case]'); if (!t) return;
    if (t.dataset.case === pinned) onOpen(pinned, openButton); else pin(t.dataset.case);
  });
  svg.addEventListener('focusin', e => { const t = e.target.closest('[data-case]'); if (t && t.dataset.case !== pinned) pin(t.dataset.case); });
  root.querySelector('.tv-step').addEventListener('click', e => { const b = e.target.closest('[data-step]'); if (b) step(Number(b.dataset.step)); });
  openButton.addEventListener('click', () => onOpen(pinned, openButton));
  root.querySelector('.tv-close').addEventListener('click', onClose);
  root.querySelector('.tv-scrim').addEventListener('click', onClose);
  root.addEventListener('keydown', e => {
    const onItem = !!e.target.closest?.('[data-case]');
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) { e.preventDefault(); step(1, onItem); }
    else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); step(-1, onItem); }
    else if (onItem && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onOpen(pinned, openButton); }
  });
  pin(pinned);
  return { root, focus: () => pin(pinned, true), select: key => order.includes(key) && pin(key) };
}

export function renderTrackView({ selected, onOpen, onClose, openLabel }) {
  const track = trackMarkup();
  const svg = svgEl(track.markup, track.viewBox, 'Career timeline from 2008 to 2028. Use the arrow keys to step through periods.');
  const view = wideView({
    kind: 'track', eyebrow: 'GROUND TRACK · 2008 → 2028', heading: 'Career timeline', legend: legendTrack, svg,
    order: chronological, selected: selected || 'verisure', onOpen, onClose, openLabel,
    note: 'Drawn to scale by year. Boundaries within a year are approximate; EFREI beyond today is expected.',
    // The selected period is projected down to the year axis so its start and end read against the scale.
    decorate: (node, key) => {
      const bar = node.querySelector(`.tl-span[data-case="${key}"]`); if (!bar) return;
      const { from, to, top } = bar.dataset;
      const sel = node.querySelector('.tv-sel'), band = sel.querySelector('.tv-sel__band');
      sel.setAttribute('class', `tv-sel tv-sel--${byKey(key).lane}`);
      band.setAttribute('x', from);
      band.setAttribute('width', Math.max(2, to - from));
      sel.querySelector('.tv-sel__from').setAttribute('d', `M${from} ${top}V${track.axis}`);
      sel.querySelector('.tv-sel__to').setAttribute('d', `M${to} ${top}V${track.axis}`);
    }
  });
  // A scrub line follows the pointer and reads the year under it.
  const scrub = svg.querySelector('.tv-scrub'), label = scrub.querySelector('text');
  svg.addEventListener('pointermove', e => {
    const point = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
    const year = 2008 + (point.x - track.x0) / (track.x1 - track.x0) * 21;
    const visible = year >= 2008 && year < 2029 && point.y > 48 && point.y < track.axis + 46;
    scrub.classList.toggle('is-on', visible);
    if (visible) { scrub.setAttribute('transform', `translate(${point.x.toFixed(1)} 0)`); label.textContent = Math.floor(year); }
  });
  svg.addEventListener('pointerleave', () => scrub.classList.remove('is-on'));
  return view;
}

export function renderOrbitView({ selected, onOpen, onClose, openLabel }) {
  const svg = svgEl(orbitMarkup('W'), '-20 36 560 300', 'Three study periods drawn as successively higher orbits around work on Earth. Use the arrow keys to step through them.');
  return wideView({
    kind: 'orbit', eyebrow: 'ORBIT RAISING · THREE MANOEUVRES', heading: 'Education as orbit raising', legend: legendOrbit, svg,
    order: orbits.map(o => o.key), selected: selected || 'study-efrei', onOpen, onClose, openLabel,
    note: 'Each orbit is a study period; each transfer burn is the move it made possible. EFREI’s final year is expected.'
  });
}
