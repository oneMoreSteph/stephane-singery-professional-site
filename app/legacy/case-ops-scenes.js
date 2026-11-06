// Operations case scenes (ISS chapter and the SNCF rail case): one flat, schematic language.
// Each step draws its own answer; geography and timings are illustrative unless a label says otherwise.
import { countries } from './mission-geography.js';

export function opsKit(k) {
  const { text, line, hint, crew, esc, project, cities, connections, readoutChip, squash, countryMap } = k;

  // ---------- Shared glyphs ----------
  // Freight train in side view: a locomotive and wagons on a rail, outlined so it reads as a train at any size.
  const freightTrain = (x, y, s = 1, { wagons = 3, load = 'container', id = '' } = {}) => {
    const wagon = i => {
      const r = -56 - i * 46, l = r - 42;
      const cargo = load === 'cars'
        ? `<path class="ft-frame" d="M${l} -6V-30H${r}V-6M${l} -18H${r}"/>${[0, 1].map(d => [0, 1].map(c => `<rect class="ft-car" x="${l + 4 + c * 19}" y="${d ? -15 : -27}" width="15" height="7" rx="3"/>`).join('')).join('')}`
        : `<rect class="ft-box" x="${l + 2}" y="-21" width="38" height="13" rx="1"/>`;
      return `<path class="ft-bed" d="M${l} -6H${r}"/>${cargo}<circle class="ft-wheel" cx="${l + 7}" cy="-2.5" r="3.5"/><circle class="ft-wheel" cx="${r - 7}" cy="-2.5" r="3.5"/><path class="ft-coupler" d="M${r} -8h6"/>`;
    };
    const len = 56 + wagons * 46;
    return `<g class="freight-train" transform="translate(${x} ${y}) scale(${s})"${id ? ` data-id="${id}"` : ''}>
      <path class="ft-rail" d="M${-len - 8} 1H12"/>
      ${Array.from({ length: wagons }, (_, i) => wagon(i)).join('')}
      <path class="ft-loco" d="M-52 -6V-22H-16V-30H-5L0 -23V-6Z"/><rect class="ft-window" x="-13" y="-28" width="7" height="5" rx="1"/><path class="ft-stripe" d="M-48 -13H-18"/>
      ${[-44, -33, -21, -9].map(cx => `<circle class="ft-wheel" cx="${cx}" cy="-2.5" r="3.5"/>`).join('')}
    </g>`;
  };
  // Map-scale train: three linked cars that follow a route.
  const trainMarker = (path, dur = 22, begin = 0, cls = '') => `<g class="train-marker ${cls}"><rect class="tm-car" x="-27" y="-3.5" width="11" height="7" rx="1.5"/><rect class="tm-car" x="-14" y="-3.5" width="11" height="7" rx="1.5"/><rect class="tm-loco" x="-1" y="-4" width="12" height="8" rx="2"/><animateMotion dur="${dur}s" begin="-${begin}s" repeatCount="indefinite" rotate="auto" path="${path}"/></g>`;
  // French level-crossing sign (croix de Saint-André) on a post.
  const crossingSign = (x, y, s = 1) => `<g class="x-sign" transform="translate(${x} ${y}) scale(${s})"><path class="x-post" d="M0 0V-30"/><g transform="translate(0 -38)"><rect class="x-bar" x="-17" y="-3.2" width="34" height="6.4" rx="1" transform="rotate(32)"/><rect class="x-bar" x="-17" y="-3.2" width="34" height="6.4" rx="1" transform="rotate(-32)"/></g></g>`;
  const cyclist = (x, y, s = 1) => `<g class="cyclist" transform="translate(${x} ${y}) scale(${s})"><circle cx="-9" cy="0" r="6.5"/><circle cx="9" cy="0" r="6.5"/><path d="M-9 0l5-10h9L9 0M-4-10L-6-14M5-10l-3 0M2-10l4-9"/><circle class="cy-head" cx="7" cy="-22" r="3"/></g>`;
  const peloton = (n = 5) => Array.from({ length: n }, (_, i) => cyclist(-i * 15, (i % 2) * 7 - 3, .62)).join('');
  const console_ = (x, y, s = 1) => `<g class="console" transform="translate(${x} ${y}) scale(${s})"><rect class="console-screen" x="-24" y="-40" width="48" height="30" rx="3"/><path class="console-lines" d="M-16-31h20M-16-24h28M-16-17h14"/><path class="console-desk" d="M-34 -4h68"/>${crew(0, 16, .7)}</g>`;
  const actor = (id, x, y, title, sub, body, kind = 'crew', cls = '') => hint(id, title, body, `<g class="actor ${cls}" transform="translate(${x} ${y})">${kind === 'console' ? console_(0, 0, .9) : crew(0, -4, 1.25)}${text(0, 42, title, 'center actor-title')}${sub ? text(0, 60, sub, 'center actor-sub') : ''}</g>`);
  const pill = (x, y, w, label, cls = '') => `<g class="pill ${cls}" transform="translate(${x} ${y})"><rect width="${w}" height="26" rx="13"/>${text(w / 2, 17.5, label, 'center pill-text')}</g>`;
  const arrow = (d, cls = '') => `<path class="flow-arrow ${cls}" d="${d}" marker-end="url(#opsArrow)"/>`;
  const defs = `<defs><marker id="opsArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" class="arrow-head"/></marker><pattern id="opsHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V8" stroke="#f0a868" stroke-opacity=".55" stroke-width="2"/></pattern></defs>`;
  const header = kicker => text(40, 44, kicker, 'mini-label');

  // Smooth curve through points (Catmull-Rom → cubic Bézier) and a sampled copy for intersections.
  const smooth = pts => pts.reduce((d, p, i) => {
    if (!i) return `M${p[0]} ${p[1]}`;
    const p0 = pts[i - 2] || pts[i - 1], p1 = pts[i - 1], p3 = pts[i + 1] || p;
    const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6], c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
    return `${d}C${c1.map(v => v.toFixed(1)).join(' ')} ${c2.map(v => v.toFixed(1)).join(' ')} ${p[0]} ${p[1]}`;
  }, '');
  const sample = pts => pts.slice(1).flatMap((p, i) => {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p3 = pts[i + 2] || p;
    const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6], c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
    return Array.from({ length: 24 }, (_, j) => { const t = j / 24, u = 1 - t; return [0, 1].map(k => u * u * u * p1[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t * t * t * p[k]); });
  }).concat([pts.at(-1)]);
  const crossings = (poly, a, b) => {
    const out = [];
    for (let i = 1; i < poly.length; i++) {
      const [p, q] = [poly[i - 1], poly[i]];
      const d = (q[0] - p[0]) * (b[1] - a[1]) - (q[1] - p[1]) * (b[0] - a[0]); if (!d) continue;
      const t = ((a[0] - p[0]) * (b[1] - a[1]) - (a[1] - p[1]) * (b[0] - a[0])) / d, u = ((a[0] - p[0]) * (q[1] - p[1]) - (a[1] - p[1]) * (q[0] - p[0])) / d;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]);
    }
    return out;
  };
  const france = countries.find(c => c.name === 'France').d;

  return { freightTrain, trainMarker, crossingSign, opsDefs: defs, defs, pill, arrow, actor, header };
}
