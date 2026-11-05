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

  // ---------- Tour de France ----------
  function tourScene() {
    // Step 1: one illustrative stage meets three rail lines in two regulation areas.
    const road = [[40, 520], [190, 360], [330, 320], [470, 460], [610, 470], [760, 270], [960, 230]];
    const roadPath = smooth(road), roadPoly = sample(road);
    const rails = [[[150, 82], [330, 640]], [[560, 82], [490, 640]], [[960, 560], [690, 82]]];
    const hits = rails.flatMap(([a, b]) => crossings(roadPoly, a, b));
    // Where the race is along its route (0–1) when it reaches a point: the peloton moves at constant speed.
    const cum = roadPoly.reduce((acc, p, i) => acc.concat(i ? acc[i - 1] + Math.hypot(p[0] - roadPoly[i - 1][0], p[1] - roadPoly[i - 1][1]) : 0), []);
    const raceAt = ([x, y]) => { let best = 0; roadPoly.forEach((p, i) => { if (Math.hypot(p[0] - x, p[1] - y) < Math.hypot(roadPoly[best][0] - x, roadPoly[best][1] - y)) best = i; }); return cum[best] / cum.at(-1); };
    const lap = 26;
    // Each train runs to a hold point short of its crossing, waits while the riders pass, then continues.
    const heldTrain = ([a, b], i) => {
      const [h] = crossings(roadPoly, a, b), len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const fc = Math.hypot(h[0] - a[0], h[1] - a[1]) / len, fh = Math.max(.05, fc - 46 / len), tr = raceAt(h);
      const arrive = Math.max(.04, tr - .14), leave = Math.min(.96, tr + .1);
      return `<g class="train-marker on-track"><rect class="tm-car" x="-27" y="-3.5" width="11" height="7" rx="1.5"/><rect class="tm-car" x="-14" y="-3.5" width="11" height="7" rx="1.5"/><rect class="tm-loco" x="-1" y="-4" width="12" height="8" rx="2"/><animateMotion dur="${lap}s" repeatCount="indefinite" rotate="auto" calcMode="linear" keyPoints="0;${fh.toFixed(3)};${fh.toFixed(3)};1" keyTimes="0;${arrive.toFixed(3)};${leave.toFixed(3)};1" path="M${a.join(' ')}L${b.join(' ')}"/></g>`;
    };
    // The scene names its parts one at a time: route, rail lines, regulation areas, crossings.
    const captions = [['THE STAGE ROUTE', 'Set by the race organiser, new every stage'], ['RAIL LINES IN SERVICE', 'Trains keep running on the day of the stage'], ['TWO REGULATION AREAS', 'Each one runs the trains on its own lines'], ['LEVEL CROSSINGS', 'The race and the trains need the same point']];
    const meet = `<g class="state-layer" data-states="0">
      <g class="seq4" style="--n:2"><rect class="area area-a" x="40" y="82" width="470" height="558"/><rect class="area area-b" x="510" y="82" width="450" height="558"/>
      ${line('M510 82V640', 'area-edge')}${text(56, 106, 'REGULATION AREA A', 'mini-label area-label')}${text(944, 106, 'REGULATION AREA B', 'mini-label area-label end')}</g>
      <g class="seq4" style="--n:1">${rails.map(([a, b], i) => `${line(`M${a.join(' ')}L${b.join(' ')}`, 'track-bed')}${line(`M${a.join(' ')}L${b.join(' ')}`, 'track-ties')}${heldTrain([a, b], i)}`).join('')}</g>
      <g class="seq4" style="--n:0">${line(roadPath, 'race-road')}${line(roadPath, 'race-line')}
      <g class="peloton-move">${peloton(5)}<animateMotion dur="${lap}s" repeatCount="indefinite" rotate="0" path="${roadPath}"/></g></g>
      <g class="seq4" style="--n:3">${hits.map(([x, y], i) => hint(`lc-${i}`, 'Level crossing', 'Where the stage route crosses an active line, the race and the trains need the same point at different moments. The regulation area that owns the line holds its trains until the race has passed.', `<g class="lc" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle class="lc-ring" r="17"/><circle class="lc-dot" r="5"/></g>`)).join('')}</g>
      <g class="seq-caption">${captions.map(([t, sub], i) => `<g class="cap4" style="--n:${i}"><rect class="map-panel" x="560" y="560" width="384" height="64" rx="3"/>${text(578, 584, `${i + 1} / 4 · ${t}`, 'mini-label seq-head')}${text(578, 608, sub, 'label tiny')}</g>`).join('')}</g>
    </g>`;

    // Step 2: five years of changing stages, then the loop repeated for every stage.
    const years = [
      [['Rennes', 'Nantes'], ['Toulouse', 'Marseille'], ['Dijon', 'Lyon']],
      [['Lille', 'Rouen'], ['Bordeaux', 'Toulouse'], ['Strasbourg', 'Mulhouse']],
      [['Nantes', 'Bordeaux'], ['Lyon', 'Marseille'], ['Metz', 'Strasbourg']],
      [['Rouen', 'Rennes'], ['Bordeaux', 'Lyon'], ['Mulhouse', 'Dijon']],
      [['Paris', 'Metz'], ['Marseille', 'Lyon'], ['Toulouse', 'Bordeaux']]
    ];
    const railSegs = connections.flatMap(c => c.slice(1).map((n, i) => [project(cities[c[i]]), project(cities[n])]));
    const stage = ([a, b], k) => { const p = project(cities[a]), q = project(cities[b]); const m = [(p[0] + q[0]) / 2 + (k % 2 ? 34 : -34), (p[1] + q[1]) / 2 + (k % 2 ? -26 : 26)]; return [p, m, q]; };
    const s = .27, panel = (segs, i) => {
      const x = 52 + i * 182, pts = segs.map(stage);
      const dots = pts.flatMap(pp => { const poly = sample(pp); return railSegs.flatMap(([a, b]) => crossings(poly, a, b)); });
      return `<g class="year-panel" style="--i:${i}" transform="translate(${x} 104)">
        <rect class="year-frame" width="168" height="182" rx="3"/>${text(12, 22, `YEAR ${i + 1}`, 'mini-label')}
        <g transform="translate(${(84 - 365 * s).toFixed(1)} ${(36 - 80 * s).toFixed(1)}) scale(${s})">${squash(`<path class="mini-france" d="${france}"/>`)}${railSegs.map(([a, b]) => line(`M${a.join(' ')}L${b.join(' ')}`, 'mini-rail')).join('')}${pts.map(pp => line(smooth(pp), 'mini-stage')).join('')}${dots.map(([dx, dy]) => `<circle class="mini-lc" cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="11"/>`).join('')}</g>
      </g>`;
    };
    const loop = `<g transform="translate(0 0)">
      ${actor('aso', 210, 448, 'ASO', 'Race organiser', 'ASO sets the stage route and the timing of the race. It is the event organiser, the collaborator in this work.')}
      ${actor('me-tour', 500, 448, 'Rail coordination', 'My role', 'One counterpart for the race organiser, many regional teams on the railway: I was the link between them.', 'console', 'is-me')}
      ${actor('regions', 790, 448, 'Regional regulation', 'One team per area crossed', 'Each regional team adjusts the trains on its lines while the race passes.', 'console')}
      ${arrow('M262 420H440')}${text(351, 408, 'stage route + timing', 'center flow-label')}
      ${arrow('M560 420H730')}${text(645, 408, 'crossings to protect', 'center flow-label')}
      ${arrow('M790 530C790 600 210 600 210 530', 'loop-arrow')}${text(500, 616, 'REPEATED FOR EVERY STAGE, EVERY YEAR', 'center mini-label race-label')}
    </g>`;
    const five = `<g class="state-layer" data-states="1">${years.map(panel).join('')}${text(52, 322, 'Each stage brings new places, new crossings and new regional teams.', 'label')}${loop}${readoutChip(730, 640, '5 years', 'OF TOUR DE FRANCE EDITIONS', 230)}</g>`;

    // Step 3: one crossing, played out on a 12 s loop. Every moving part shares the SVG clock, so the phases stay in step.
    const cycle = 12, kt = (vals, times) => `values="${vals}" keyTimes="${times}" dur="${cycle}s" repeatCount="indefinite"`;
    const phase = (i, on = '1', off = '0') => { const a = i / 4, b = (i + 1) / 4; return kt([off, off, on, on, off, off].join(';'), [0, Math.max(0, a - .001), a, b - .001, b, 1].map(v => v.toFixed(3)).join(';')); };
    const phases3 = [['1 · THE PLAN', 'Regional regulation knows when the race reaches this crossing'], ['2 · THE TRAIN IS HELD', 'Stopped at the signal, short of the crossing'], ['3 · THE RACE PASSES', 'Riders cross undisturbed'], ['4 · THE TRAIN IS RELEASED', 'The signal clears; the train continues']];
    const roadY = 400, railX = 560;
    const atCrossing = `<g class="state-layer" data-states="2">
      <rect class="area area-a" x="40" y="140" width="920" height="420" rx="3"/>
      ${line(`M40 ${roadY}H960`, 'race-road')}${line(`M40 ${roadY}H960`, 'race-line')}
      ${line(`M${railX} 140V560`, 'track-bed')}${line(`M${railX} 140V560`, 'track-ties')}
      ${hint('lc-x', 'The level crossing', 'Where the stage route crosses an active line. The race and the train need this point at different moments.', `<g>${crossingSign(railX - 34, roadY - 24, 1.1)}<circle class="lc-ring" cx="${railX}" cy="${roadY}" r="20"/></g>`)}
      ${hint('signal', 'The signal', 'Regional regulation holds the train here, short of the crossing, while the race passes.', `<g transform="translate(${railX + 34} 290)"><path class="sig-mast" d="M0 0V-46"/><rect class="sig-head" x="-9" y="-70" width="18" height="30" rx="4"/><circle class="sig-lamp" cy="-55" r="6"><animate attributeName="fill" ${kt('#f07a68;#f07a68;#7fe0b0;#7fe0b0', '0;.749;.75;1')}/></circle></g>`)}
      ${hint('train-x', 'The train', 'Retimed by regional regulation: it waits for the race, then continues.', `<g class="train-v"><g transform="rotate(90)"><rect class="tm-car" x="-40" y="-6" width="18" height="12" rx="2"/><rect class="tm-car" x="-20" y="-6" width="18" height="12" rx="2"/><rect class="tm-loco" x="0" y="-7" width="20" height="14" rx="3"/></g><animateMotion path="M${railX} 120V600" calcMode="linear" keyPoints="0;.36;.36;1" keyTimes="0;.25;.78;1" dur="${cycle}s" repeatCount="indefinite"/></g>`)}
      ${hint('race-x', 'The race', 'The riders keep the road; the crossing is theirs for the moment they pass.', `<g class="peloton-move">${peloton(6)}<animateMotion path="M-60 ${roadY - 6}H1080" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;.3;.78;1" dur="${cycle}s" repeatCount="indefinite"/></g>`)}
      <g class="phase-caps">${phases3.map(([t, sub], i) => `<g opacity="0"><animate attributeName="opacity" ${phase(i)}/><rect class="map-panel cap-gold" x="56" y="156" width="400" height="62" rx="3"/>${text(74, 180, t, 'mini-label seq-head')}${text(74, 204, sub, 'label tiny')}</g>`).join('')}</g>
      ${text(944, 548, 'ONE CROSSING · ILLUSTRATIVE TIMING', 'end mini-label muted-label')}
      ${[['ASO', 'Race organiser', 200, 'The race organiser’s schedule says when the race reaches each crossing.', '0'], ['Rail coordination', 'My role', 500, 'I turned the stage timing into crossing-by-crossing needs for each region concerned.', '0'], ['Regional regulation', 'Live trains', 800, 'The regional team holds, then releases, the trains in service.', '1']].map(([t, sub, x, body, ph], i) => `<g class="chain-actor">${actor(`chain-${i}`, x, 630, t, sub, body, i ? 'console' : 'crew', i === 1 ? 'is-me' : '')}<circle class="chain-glow" cx="${x}" cy="622" r="44" opacity="0"><animate attributeName="opacity" ${i < 2 ? phase(0) : kt('0;0;1;1;0;0;1;1', '0;.249;.25;.499;.5;.749;.75;1')}/></circle></g>`).join('')}
      ${arrow('M252 610H440')}${arrow('M560 610H740')}
    </g>`;
    return `${defs}${header('TOUR DE FRANCE · LEVEL CROSSINGS')}${meet}${five}${atCrossing}`;
  }

  // ---------- Toyota Europe ----------
  function toyotaScene() {
    const phases = ['WEEKS OF DISRUPTION', 'ONE AFTERNOON', 'NEXT MORNING', 'AFTERWARDS'];
    const strip = phases.map((p, i) => `<g class="phase ph-${i}" transform="translate(${40 + i * 232} 70)"><rect width="216" height="40" rx="3"/>${text(14, 25, `${String(i + 1).padStart(2, '0')}  ${p}`, 'mini-label phase-text')}</g>`).join('') + line('M256 90h16M488 90h16M720 90h16', 'phase-link');
    // The line the vehicle trains ran on: from the Dutch border, through Belgium and France, to the south-west. Schematic.
    const stops = [['Roosendaal', [4.46, 51.53]], ['Antwerp', [4.40, 51.22]], ['Brussels', [4.35, 50.85]], ['Lille', [3.06, 50.63]], ['Paris', [2.35, 48.86]], ['Orléans', [1.90, 47.90]], ['Tours', [.69, 47.39]], ['Poitiers', [.34, 46.58]], ['Bordeaux', [-.58, 44.84]], ['', [-1.05, 43.75]], ['', [-1.45, 43.45]]];
    const pts = stops.map(([, ll]) => project(ll));
    const routeD = `M${pts.map(p => p.map(v => v.toFixed(1)).join(' ')).join('L')}`;
    const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), total = lens.reduce((a, b) => a + b, 0);
    const swFrom = lens.slice(0, 7).reduce((a, b) => a + b, 0) / total;
    const sw = project([-.9, 44.3]);
    const M = (inner) => `<g transform="translate(-70 140)"><clipPath id="tyClip"><rect x="90" y="10" width="500" height="500"/></clipPath><g clip-path="url(#tyClip)">${inner}</g></g>`;
    const train = (cls, stuck) => `<g class="train-marker ${cls}"><rect class="tm-car" x="-27" y="-3.5" width="11" height="7" rx="1.5"/><rect class="tm-car" x="-14" y="-3.5" width="11" height="7" rx="1.5"/><rect class="tm-loco" x="-1" y="-4" width="12" height="8" rx="2"/><animateMotion dur="12s" repeatCount="indefinite" rotate="auto" calcMode="linear" ${stuck ? `keyPoints="0;${(swFrom + .03).toFixed(3)};${(swFrom + .08).toFixed(3)};1" keyTimes="0;.45;.9;1"` : ''} path="${routeD}"/></g>`;
    const mapBase = M(`${countryMap()}${line(routeD, 'route-glow')}${line(routeD, 'active-route')}
      ${stops.map(([n], i) => n ? `<circle class="city-dot" cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="${n === 'Roosendaal' ? 5 : 3.5}"/>${['Roosendaal', 'Brussels', 'Lille', 'Paris', 'Bordeaux'].includes(n) ? (n === 'Roosendaal' ? text(pts[i][0] - 9, pts[i][1] + 4, 'Roosendaal · NL border', 'city-label small-city end') : text(pts[i][0] + 9, pts[i][1] + 4, n, 'city-label small-city')) : ''}` : '').join('')}`);
    const stakes = `<g class="state-layer" data-states="0">
      ${M(`${hint('sw', 'Strong disruption in the south-west', 'The trains lost time in the south-west of the network, week after week.', `<g transform="translate(${sw[0].toFixed(1)} ${sw[1].toFixed(1)})"><circle class="sw-zone" r="46"/><circle class="sw-pulse" r="46"/></g>`)}
        ${hint('line', 'The line of the vehicle trains', 'From the Dutch border, through Belgium and France, to the south-west. Schematic route.', `<path d="${routeD}" class="hit-line"/>`)}
        ${train('vehicle', true)}<g style="--d:4s">${train('vehicle', true).replace('dur="12s"', 'dur="12s" begin="-4s"')}</g>${train('vehicle', true).replace('dur="12s"', 'dur="12s" begin="-8s"')}
        ${text(sw[0] - 52, sw[1] + 72, 'STRONG DISRUPTION', 'mini-label warm')}`)}
      ${actor('toyota-eu', 640, 196, 'Toyota Europe', 'Ships its vehicles by rail', 'Toyota Europe was the customer of the freight company, not SNCF’s direct customer.')}
      ${actor('freight-co', 640, 336, 'Freight customer', 'Moves the vehicles', 'The freight company running the trains: the customer I represented within the network.')}
      ${actor('network', 640, 476, 'SNCF Réseau', 'The network · my side', 'The infrastructure manager, where I handled this customer’s capacity.', 'console', 'is-me')}
      ${arrow('M640 262V286')}${text(652, 278, 'contracts', 'flow-label')}${arrow('M640 402V426')}${text(652, 418, 'runs its trains on', 'flow-label')}
      ${hint('risk', 'A customer relationship at risk', 'Toyota Europe was considering another freight operator. A meeting was set for the next morning.', `<g>${arrow('M712 186C760 186 780 170 790 160', 'risk-arrow')}${pill(760, 134, 210, 'ANOTHER OPERATOR?', 'pill-risk')}</g>`)}
      <g transform="translate(560 600)">${text(0, -14, 'TRAINS · AMBER: DISRUPTED · ILLUSTRATIVE', 'mini-label muted-label')}${Array.from({ length: 20 }, (_, i) => `<rect class="run ${[3, 4, 9, 12, 13, 17].includes(i) ? 'run-bad' : ''}" x="${i * 20}" y="0" width="15" height="15" rx="2"/>`).join('')}</g>
    </g>`;
    // One afternoon: I coordinate the teams concerned along the line while the clock runs.
    const teams = [3, 4, 7, 8].map(i => pts[i]);
    // The afternoon as a vertical timeline beside the map: each hour lights in turn; the teams on the line link into it.
    const steps = [['14:00', 'I take the meeting', 'Set for the next morning, with Toyota Europe.'], ['15:00', 'Regional teams, together', 'One SNCF Réseau team per region the line crosses.'], ['16:00', 'Constraints, everywhere', 'Each region brings its own.'], ['17:00', 'Causes traced', 'Section by section, with each team.'], ['18:00', 'One solution across all', 'Drafted by me, part validated by the teams.'], ['19:00', 'Ready for the morning', 'Causes and solution, one answer.']];
    const rowY = i => 192 + i * 78;
    const afternoon = `<g class="state-layer" data-states="1">
      ${M(`${teams.map(([x, y], i) => `<path class="coord-link" d="M${x.toFixed(1)} ${y.toFixed(1)}C${(x + 200).toFixed(1)} ${y.toFixed(1)} 560 ${rowY(1) - 140} 662 ${rowY(1) - 140}"/>${hint(`team-${i}`, `Regional team ${i + 1}`, 'One SNCF Réseau regional team along the line, with its own constraints, coordinated in the same afternoon. Positions illustrative.', `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle class="team-node" r="11"/>${console_(0, -6, .45)}<g class="team-constraint" transform="translate(-16 18)"><rect width="32" height="14" rx="2"/><path d="M4 3l8 8M12 3l-8 8"/>${text(20, 11, '', '')}</g>${text(-16, -16, `REGION ${i + 1}`, 'end mini-label team-tag')}</g>`)}`).join('')}`)}
      ${text(600, 160, 'THE AFTERNOON BEFORE THE MEETING · ILLUSTRATIVE HOURS', 'mini-label warm')}
      <path class="tl-rail" d="M610 ${rowY(0)}V${rowY(5)}"/>
      ${steps.map(([h, t, sub], i) => hint(`hour-${i}`, `${h} · ${t}`, sub, `<g class="tl-row" transform="translate(610 ${rowY(i)})"><rect class="tl-row-bg" x="22" y="-26" width="328" height="56" rx="3"/><circle class="tl-dot" r="8"/>${text(36, -4, h, 'mini-label tl-hour')}${text(100, -4, t, 'label small tl-title')}${text(100, 16, sub, 'label tiny tl-sub')}</g>`)).join('')}
    </g>`;
    const seats = [[500, 236, 'Me', 'SNCF Réseau', true], [250, 400, 'Main contact', 'Freight customer'], [500, 580, 'Director', 'Freight customer'], [750, 400, 'European CLO', 'Toyota Europe']];
    const meeting = `<g class="state-layer" data-states="2">
      <rect class="table" x="330" y="316" width="340" height="208" rx="104"/>
      ${seats.map(([x, y, t, s, me], i) => actor(`seat-${i}`, x, y, t, s, me ? 'I represented SNCF Réseau: the causes of the disruption and the solutions to validate.' : `${t}, ${s}. One of the three people the answer had to convince.`, me ? 'console' : 'crew', me ? 'is-me' : '')).join('')}
      ${hint('why', 'Why it failed', 'I explained the causes of the disruption traced the afternoon before.', `<g transform="translate(372 384)"><rect class="out-card" width="118" height="72" rx="3"/>${text(14, 28, 'CAUSES', 'mini-label')}${text(14, 52, 'Why it failed', 'label small')}</g>`)}
      ${arrow('M496 420H518')}
      ${hint('to-validate', 'Measures to validate', 'I presented the solutions for the customer and Toyota Europe to validate.', `<g transform="translate(522 384)"><rect class="out-card is-lit" width="118" height="72" rx="3"/>${text(14, 28, 'MEASURES', 'mini-label')}${text(14, 52, 'To validate', 'label small')}</g>`)}
    </g>`;
    const after = `<g class="state-layer" data-states="3">
      ${M(`${hint('sw-ok', 'The south-west, back on time', 'I followed the solutions through the teams, and the vehicle trains ran through the south-west again.', `<g transform="translate(${sw[0].toFixed(1)} ${sw[1].toFixed(1)})"><circle class="sw-zone ok" r="46"/><path class="sw-check" d="M-12 0l8 8 16-18"/></g>`)}
        ${train('vehicle ok', false)}${train('vehicle ok', false).replace('dur="12s"', 'dur="12s" begin="-4s"')}${train('vehicle ok', false).replace('dur="12s"', 'dur="12s" begin="-8s"')}`)}
      ${hint('speed', 'A solution in under a day', 'From the first call to an answer validated by the customer and Toyota Europe: one afternoon and one morning.', `<g transform="translate(560 170)">${text(0, 0, 'FROM FIRST CALL TO VALIDATED ANSWER', 'mini-label warm')}<rect class="speed-bar" x="0" y="18" width="270" height="26" rx="2"/>${text(10, 36, 'ONE AFTERNOON', 'mini-label')}<rect class="speed-bar is-me" x="276" y="18" width="130" height="26" rx="2"/>${text(286, 36, 'ONE MORNING', 'mini-label')}</g>`)}
      ${hint('applied', 'Solutions followed through', 'I followed the solutions through the teams, and circulation improved.', `<g transform="translate(560 300)">${text(0, -10, 'BEFORE', 'mini-label')}${Array.from({ length: 20 }, (_, i) => `<rect class="run ${[1, 4, 5, 8, 11].includes(i) ? 'run-bad' : ''}" x="${i * 20}" y="0" width="15" height="15" rx="2"/>`).join('')}${text(0, 56, 'AFTER', 'mini-label')}${Array.from({ length: 20 }, (_, i) => `<rect class="run" x="${i * 20}" y="66" width="15" height="15" rx="2"/>`).join('')}${text(0, 112, 'ILLUSTRATIVE', 'mini-label muted-label')}</g>`)}
    </g>`;
    return `${defs}${header('TOYOTA EUROPE · SUMMER 2013')}${strip}<g data-states="0 1 3" class="ty-map">${mapBase}</g>${stakes}${afternoon}${meeting}${after}`;
  }


  // ---------- Ligne C ----------
  function ligneCScene() {
    // Top: the line, schematic, 42 station marks. Below: one station in cross-section, the same drawing for every step.
    // Each step adds its own answer on that station. Station layout and measures are illustrative.
    const trunk = Array.from({ length: 17 }, (_, i) => [240 + 520 * (i + 1) / 18, 100]);
    const branches = [[80, 52], [80, 100], [80, 148], [920, 58], [920, 142]].flatMap(([x2, y2]) => { const x1 = x2 < 500 ? 240 : 760; return Array.from({ length: 5 }, (_, i) => { const t = (i + 1) / 6; return [x1 + (x2 - x1) * t, 100 + (y2 - 100) * t]; }); });
    const stops = [...trunk, ...branches];
    const lens = trunk[12];
    const net = `<g class="rer">
      <path class="seine" d="M200 122C330 110 420 128 520 116S700 104 800 124"/>${text(214, 141, 'SEINE', 'mini-label seine-label')}
      ${line('M240 100H760', 'rer-line')}${[[80, 52], [80, 100], [80, 148]].map(([x, y]) => line(`M240 100L${x} ${y}`, 'rer-line branch')).join('')}${[[920, 58], [920, 142]].map(([x, y]) => line(`M760 100L${x} ${y}`, 'rer-line branch')).join('')}
      ${stops.map(([x, y], i) => `<circle class="rer-stop" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/><g class="ind-mark" style="--i:${i}"><rect x="${(x - 5).toFixed(1)}" y="${(y + 8).toFixed(1)}" width="4" height="9"/><rect class="ind-mark__equip" x="${(x + 1).toFixed(1)}" y="${(y + 8).toFixed(1)}" width="4" height="9"/></g>`).join('')}
      <circle class="rer-stop is-named" cx="${trunk[7][0].toFixed(1)}" cy="100" r="6"/><circle class="rer-stop is-named" cx="${trunk[8][0].toFixed(1)}" cy="100" r="6"/>
      ${text(trunk[7][0] - 8, 80, 'SAINT-MICHEL NOTRE-DAME', 'end mini-label named')}${text(trunk[8][0] + 8, 128, 'AUSTERLITZ', 'mini-label named')}
      ${text(40, 30, 'TRANSILIEN LIGNE C · 42 STATIONS IN MY SCOPE · SCHEMATIC', 'mini-label rer-tag')}
      <g class="lens" data-states="0 1 2"><circle class="lens-ring" cx="${lens[0].toFixed(1)}" cy="100" r="11"/></g></g>`;

    const stairs = (x, y1, y2, dir = 1) => { const n = 5, w = 44, h = (y2 - y1) / n; return `<path class="stn-stairs" d="M${x} ${y1}${Array.from({ length: n }, (_, i) => `h${(w / n) * dir}v${h}`).join('')}"/>`; };
    // Passenger information boards: a departure board with an 'i' badge, so they read as information at a glance.
    const screen = (x, y, id) => `<g class="stn-screen" data-id="${id}" transform="translate(${x} ${y})"><rect width="64" height="26" rx="3"/><circle class="scr-badge" cx="13" cy="13" r="7"/><path class="scr-i" d="M13 10v7M13 7.5v.5"/><path class="scr-lines" d="M26 9h30M26 14h22M26 19h26"/></g>`;
    const station = `<g class="stn-base">
      <rect class="stn-frame" x="40" y="190" width="920" height="430" rx="4"/>
      ${[[300, 246, 60, 54], [372, 262, 42, 38], [430, 236, 54, 64], [880, 250, 50, 50]].map(([x, y, w, h]) => `<rect class="stn-building" x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}
      ${line('M40 300H960', 'stn-ground')}
      <g class="stn-bus"><path d="M916 300V262"/><rect x="904" y="250" width="24" height="14" rx="2"/></g>${text(916, 316, 'BUS STOP', 'center stn-tag')}
      <rect class="stn-hall" x="110" y="330" width="780" height="100" rx="2"/>
      ${stairs(150, 300, 330)}${stairs(806, 300, 330, -1)}
      ${text(190, 292, 'A', 'center stn-door')}${text(810, 292, 'B', 'center stn-door')}
      <g class="stn-gates">${[468, 482, 496, 510, 524].map(x => `<path d="M${x} 368V408"/>`).join('')}</g>${text(496, 424, 'GATES', 'center stn-tag')}
      ${screen(290, 342, 'scr-hall')}
      <rect class="stn-tube" x="110" y="456" width="780" height="150" rx="2"/>
      ${stairs(250, 430, 520)}${stairs(750, 430, 520, -1)}
      <g class="stn-track"><rect class="stn-ballast" x="110" y="498" width="780" height="22"/>${line('M110 509H890', 'stn-ties')}${line('M110 503H890', 'stn-railline')}${line('M110 515H890', 'stn-railline')}</g>
      <rect class="stn-platform" x="110" y="522" width="780" height="40"/>${line('M110 525H890', 'stn-edge')}${line('M110 559H890', 'stn-edge')}
      <g class="stn-track"><rect class="stn-ballast" x="110" y="564" width="780" height="22"/>${line('M110 575H890', 'stn-ties')}${line('M110 569H890', 'stn-railline')}${line('M110 581H890', 'stn-railline')}</g>
      ${text(124, 545, 'PLATFORM', 'mini-label stn-plat-label')}${text(876, 495, 'TRACK 1', 'end stn-tag')}${text(876, 600, 'TRACK 2', 'end stn-tag')}
      <g class="stn-pass"><rect x="-160" y="-11" width="160" height="20" rx="5"/>${[0, 1, 2, 3].map(i => `<rect class="stn-window" x="${-148 + i * 38}" y="-6" width="24" height="7" rx="1"/>`).join('')}<animateMotion path="M110 573H1050" dur="9s" repeatCount="indefinite"/></g>
      <g class="stn-train"><rect x="330" y="480" width="320" height="22" rx="5"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect class="stn-window" x="${346 + i * 42}" y="486" width="26" height="8" rx="1"/>`).join('')}</g>
      <path class="stn-pole" d="M182 492V522"/>${screen(150, 466, 'scr-quai')}${text(182, 460, 'INFO', 'center stn-tag stn-info-tag')}${text(322, 336, 'INFO', 'center stn-tag stn-info-tag')}
      ${text(56, 214, 'STREET', 'mini-label stn-level')}${text(878, 348, 'TICKET HALL', 'end mini-label stn-level')}${text(860, 474, 'PLATFORMS', 'end mini-label stn-level')}
      ${text(944, 612, 'THE RINGED STATION · ILLUSTRATIVE', 'end stn-tag')}</g>`;

    // 01 · Why this role: every counterpart drawn where they are. One at a time lights up with its label; the others step back.
    const contacts = [
      ['in', 'Station staff', 'At the gates and on the platforms', 520, 388],
      ['in', 'SNCF teams', 'Running the line', 180, 392],
      ['out', 'Passengers', 'In the stations and on the trains', 800, 540],
      ['out', 'Local authorities', 'Around the stations', 610, 252],
      ['out', 'Welcome providers', 'At the entrances', 820, 252]];
    const why = `<g class="state-layer" data-states="0">
      ${contacts.map(([side, title, sub, x, y], i) => `<g class="seq5" style="--n:${i}">${hint(`who-${i}`, title, sub, `<g class="contact" transform="translate(${x} ${y})"><circle class="contact-ring" r="26"/>${crew(0, 0, .9)}${text(0, -30, title.toUpperCase(), 'center contact-name')}</g>`)}</g>`).join('')}
      <g class="seq-caption">${contacts.map(([side, title, sub], i) => `<g class="cap5" style="--n:${i}"><rect class="map-panel" x="52" y="222" width="290" height="64" rx="3"/>${text(68, 244, `${i + 1} / 5 · ${side === 'in' ? 'INTERNAL' : 'EXTERNAL'}`, 'mini-label seq-head')}${text(68, 270, `${title} · ${sub.toLowerCase()}`, 'label tiny')}</g>`).join('')}</g>
      <rect class="map-panel" x="40" y="630" width="520" height="62" rx="4"/>
      ${text(58, 652, 'BEFORE · SNCF RÉSEAU', 'mini-label muted-label')}${text(58, 676, 'Capacity, years ahead', 'label small')}
      ${arrow('M300 671H330')}${text(342, 652, 'LIGNE C', 'mini-label warm')}${text(342, 676, 'The day itself, with passengers', 'label small')}
      <rect class="map-panel" x="570" y="630" width="390" height="62" rx="4"/>
      ${text(586, 652, 'EVERY DAY', 'mini-label')}${['ACTION', 'REACTION', 'PLANNING', 'COORDINATION'].map((t, i) => pill(586 + i * 88, 662, i === 3 ? 102 : 82, t, 'pill-tag')).join('')}</g>`;

    // 02 · The plans: one situation at a time. Each plan shows one closed zone, one continuous way out, and where passengers are informed.
    const triggers = [['PLANNED', 'Engineering works'], ['PLANNED', 'Festive public event'], ['UNEXPECTED', 'Incident on the line']];
    const hatch = (x, y, w, h) => `<rect class="cov-safety" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
    const walk = pts => `<path class="cov-route" d="M${pts.map(p => p.join(' ')).join('L')}" marker-end="url(#opsArrow)"/>`;
    const welcome = (x, y, label = 'WELCOME') => `<g class="cov-welcome" transform="translate(${x} ${y})"><circle r="9"/><path d="M-3 0h6M0-3v6"/>${text(14, 4, label, 'cov-tag')}</g>`;
    const info = (x, y) => `<g class="cov-screen">${screen(x, y, 'i')}</g>${text(x + 32, y + 42, 'INFORMATION', 'center cov-tag')}`;
    const note = (x, y, t) => text(x, y, t, 'center cov-note');
    // The way out through entrance A: platform → stairs → hall → stairs → street.
    const outA = start => [[start, 542], [300, 542], [294, 524], [252, 434], [204, 422], [196, 334], [154, 304], [150, 290]];
    const cases = [
      `${hatch(600, 522, 290, 40)}${note(745, 548, 'CLOSED FOR WORKS')}<path class="cov-closed" d="M716 462l24 24M740 462l-24 24"/>${walk([...outA(580), [90, 290]])}${welcome(232, 396)}${info(290, 342)}`,
      `<g class="cov-crowd">${Array.from({ length: 18 }, (_, i) => `<circle cx="${70 + (i % 6) * 13 + (i > 11 ? 6 : 0)}" cy="${262 + Math.floor(i / 6) * 10}" r="3.2"/>`).join('')}</g>
       ${hatch(458, 360, 76, 54)}${note(496, 446, 'CAPACITY AT THE GATES')}
       ${walk([[150, 290], [154, 304], [196, 334], [210, 396], [452, 396]])}${text(130, 252, 'IN', 'center cov-tag cov-tag--route')}
       ${walk([[540, 396], [760, 396], [764, 334], [806, 304], [850, 290]])}${text(870, 252, 'OUT', 'center cov-tag cov-tag--route')}
       ${welcome(232, 270)}${welcome(760, 270)}`,
      `<g class="cov-alert" transform="translate(490 470)"><path d="M0-14L13 8H-13Z"/><path d="M0-6v6M0 3v1"/></g>${text(512, 474, 'TRAIN STOPPED', 'cov-note')}
       ${hatch(330, 522, 320, 40)}${note(490, 548, 'PLATFORM CLOSED')}
       ${walk([...outA(320), [880, 290]])}${welcome(860, 262, '')}${text(916, 242, 'ALTERNATIVE', 'center cov-tag')}${info(290, 342)}${info(150, 466)}`];
    const plans = `<g class="state-layer" data-states="1">
      ${triggers.map(([k, t], i) => `<g class="trigger" data-pick="${i}" role="button" tabindex="0" aria-label="Show the plan for ${t.toLowerCase()}" style="--n:${i}" transform="translate(${250 + i * 168} 198)"><rect width="160" height="38" rx="3"/>${text(12, 15, k, 'mini-label')}${text(12, 31, t, 'label tiny')}${text(148, 25, '›', 'end trigger-cue')}</g>`).join('')}
      ${cases.map((c, i) => `<g class="cover-case" style="--n:${i}">${c}</g>`).join('')}
      <rect class="map-panel" x="40" y="630" width="920" height="62" rx="4"/>
      ${text(58, 652, 'WHAT EACH PLAN COVERS', 'mini-label')}
      <g transform="translate(58 664)">${hatch(0, 0, 26, 16)}${text(36, 13, 'Passengers’ safety', 'label small')}</g>
      <g transform="translate(270 664)"><path class="cov-route" d="M0 8h26" marker-end="url(#opsArrow)"/>${text(36, 13, 'Their redirection', 'label small')}</g>
      <g transform="translate(470 672)"><g class="cov-welcome"><circle cx="10" r="9"/><path d="M7 0h6M10-3v6"/></g>${text(30, 5, 'Their experience in our stations', 'label small')}</g>
      ${text(944, 676, 'A PLAN FOR EACH STATION', 'end mini-label warm')}</g>`;

    // 03 · On the ground: the plan reaches every person who carries it out, with tools and information.
    // Everyone is named where they stand and holds the same plan sheet: no connecting lines.
    const tag = (x, y, label, cls, anchor = 'start') => { const w = label.length * 7.4 + 18, x0 = anchor === 'middle' ? x - w / 2 : x; return `<g class="name-tag name-tag--${cls}"><rect x="${x0.toFixed(1)}" y="${y - 13}" width="${w.toFixed(1)}" height="20" rx="2"/>${text(x0 + 9, y + 1.5, label, 'tag-text')}</g>`; };
    const sheet = (x, y) => `<g class="kit" transform="translate(${x} ${y})"><rect width="11" height="14" rx="1"/><path d="M2.5 4.5h6M2.5 8h6M2.5 11h4"/></g>`;
    const person = (x, y) => `${crew(x, y, .85)}${sheet(x + 12, y - 4)}`;
    const posts = [
      ['prov', 'Welcome providers', 'External providers who greet and direct passengers at the entrances.', [[132, 284], [836, 284]], [[132, 240, 'WELCOME PROVIDER', 'middle'], [836, 240, 'WELCOME PROVIDER', 'middle']]],
      ['auth', 'Local authorities', 'The city side: public space, access and safety around the station.', [[624, 284], [676, 284]], [[650, 240, 'LOCAL AUTHORITIES', 'middle']]],
      ['staff', 'Station staff', 'The SNCF agents of the station, coordinated by me.', [[548, 396], [440, 548], [726, 474]], [[570, 392, 'STATION STAFF'], [462, 552, 'STATION STAFF'], [748, 478, 'STATION STAFF']]]];
    const ground = `<g class="state-layer" data-states="2">
      ${posts.map(([cls, title, body, pts, tags], i) => `<g class="seq3" style="--n:${i}">${hint(`post-${i}`, title, body, `<g class="post">${pts.map(([x, y]) => person(x, y)).join('')}${tags.map(([x, y, l, an]) => tag(x, y, l, cls, an)).join('')}</g>`)}</g>`).join('')}
      <rect class="map-panel" x="40" y="630" width="920" height="62" rx="4"/>
      <g transform="translate(60 646)" class="kit kit--big"><rect width="22" height="28" rx="2"/><path d="M5 8h12M5 14h12M5 20h8"/></g>
      ${text(98, 654, 'IN EVERYONE’S HANDS', 'mini-label warm')}${text(98, 678, 'The plan I built, with the tools and information to act', 'label small')}
      <g class="seq-caption">${posts.map(([, title], i) => `<g class="cap3" style="--n:${i}">${line('M560 640V682', 'fine-rule')}${text(580, 654, `${i + 1} / 3 · ${title.toUpperCase()}`, 'mini-label seq-head')}${text(580, 678, ['Greet and direct passengers at the entrances', 'Public space, access and safety outside', 'Carry out the plan in the station'][i], 'label small')}</g>`).join('')}</g></g>`;

    // 04 · The measure: the station steps back, the line comes forward with two indicators per station.
    const measure = `<g class="state-layer" data-states="3">
      <rect class="map-panel" x="90" y="220" width="820" height="330" rx="4"/>
      ${text(116, 252, 'THE FIRST MECHANISM TO ASSESS THE PLANS', 'mini-label warm')}
      ${[['DEFINE', 'Indicators for', 'each station'], ['MONITOR', '', ''], ['FOLLOW', 'Measures required', 'and incentivised']].map(([k, a, b], i) => `<g class="seq3" style="--n:${i}"><g transform="translate(${116 + i * 270} 276)"><rect class="step-box" width="240" height="220" rx="3"/>${text(16, 26, `0${i + 1} · ${k}`, 'mini-label')}${a ? text(16, 62, a, 'card-title') + text(16, 86, b, 'card-title') : ''}</g></g>`).join('')}
      ${arrow('M358 386H384')}${arrow('M628 386H654')}
      <g class="seq3" style="--n:1">${hint('ind-staff', 'Staff work', 'How the people on site carried out the plan.', `<g transform="translate(402 318)"><rect class="ind" width="208" height="72" rx="3"/><rect class="ind-swatch" x="14" y="16" width="6" height="14"/>${text(28, 28, 'STAFF WORK', 'mini-label')}${text(14, 56, 'The plan carried out on site', 'label tiny')}</g>`)}
      ${hint('ind-equip', 'Fixed equipment', 'The measures installed in stations and whether they did their job.', `<g transform="translate(402 404)"><rect class="ind" width="208" height="72" rx="3"/><rect class="ind-swatch ind-swatch--equip" x="14" y="16" width="6" height="14"/>${text(28, 28, 'FIXED EQUIPMENT', 'mini-label')}${text(14, 56, 'Installed, and doing its job', 'label tiny')}</g>`)}</g>
      <g class="seq3" style="--n:2">${text(672, 400, 'by Île-de-France', 'card-title')}${text(672, 424, 'Mobilités', 'card-title')}</g>
      ${text(116, 530, 'Under each station on the line: its two indicators.', 'label small')}
      <g class="case-link" transform="translate(40 630)" data-open-case="verisure" tabindex="0" role="button" aria-label="Open the Verisure experience"><rect width="920" height="62" rx="3"/>${text(18, 24, 'THE SAME QUESTION, LATER IN DATA', 'mini-label')}${text(18, 46, 'Does the system do its job? Data Quality and Observability at Verisure', 'label small')}${text(900, 38, '↗', 'chip-arrow end')}</g></g>`;
    return `${defs}${net}${station}${why}${plans}${ground}${measure}`;
  }


  // ---------- Six weeks (FoodChéri deadline) ----------
  function deadlineScene() {
    // One wall of 600+ Tableau dashboards, styled by step: everything, then what matters, then the licence switched off.
    const cols = 30, rows = 20, wx0 = 60, wy0 = 160, cell = 13;
    const used = i => (i * 53 + 17) % 100 < 10, usedList = Array.from({ length: cols * rows }, (_, i) => i).filter(used), critical = i => usedList.indexOf(i) % 10 === 4;
    const wall = `<g class="dash-wall">${Array.from({ length: cols * rows }, (_, i) => `<rect class="dw ${used(i) ? 'dw-used' : ''} ${critical(i) ? 'dw-crit' : ''}" style="--i:${i % 37}" x="${wx0 + (i % cols) * cell}" y="${wy0 + Math.floor(i / cols) * cell}" width="10" height="10" rx="1.5"/>`).join('')}</g>`;
    const wallHint = (title, body) => hint('wall', title, body, `<rect x="${wx0 - 6}" y="${wy0 - 6}" width="${cols * cell + 9}" height="${rows * cell + 9}" class="hit-box"/>`);
    const clock = `<g class="state-layer" data-states="0">
      ${wallHint('600+ Tableau dashboards', 'Everything the company had built on Tableau, plus scattered personal reports. All of it would stop with the licence.')}
      ${text(wx0, wy0 - 18, '600+ TABLEAU DASHBOARDS', 'mini-label')}
      ${hint('countdown', 'Six weeks', 'The Tableau licence ended six weeks later. The reporting the company relied on had to run elsewhere by then.', `<g transform="translate(730 300)"><circle class="cd-track" r="112"/><circle class="cd-ring" r="112" pathLength="1" transform="rotate(-90)"><animate attributeName="stroke-dashoffset" values="0;1" dur="10s" repeatCount="indefinite"/></circle>${text(0, -4, '6 WEEKS', 'center cd-value')}${text(0, 24, 'TABLEAU LICENCE ENDS', 'center mini-label warm')}</g>`)}
      ${hint('depend', 'Who depended on it', 'The board’s monitoring and finance ran on these dashboards.', `<g transform="translate(60 470)">${crew(16, 22, .9)}${crew(52, 22, .9)}${crew(88, 22, .9)}${text(120, 18, 'BOARD · FINANCE · TEAMS', 'mini-label')}${text(120, 40, 'All reporting ran on Tableau', 'label small')}</g>`)}
    </g>`;
    const triage = `<g class="state-layer" data-states="1">
      ${wallHint('About 10% in regular use', 'My audit had shown that about one dashboard in ten was used regularly. Those were the ones that mattered.')}
      ${text(wx0, wy0 - 18, 'ABOUT 10% USED REGULARLY', 'mini-label warm')}
      <g transform="translate(560 170)">${text(0, 0, 'WHAT MUST EXIST ON DAY ONE', 'mini-label warm')}
        ${[['1', 'Board-level monitoring', 'crit'], ['2', 'Finance', 'crit'], ['3', 'Other views in regular use', 'used'], ['…', 'Everything else: the full migration', 'rest']].map(([n, t, c], i) => hint(`rank-${i}`, t, ['First: the board steers the company with it.', 'Finance at the top of the ranking: it cannot stop.', 'Next, once the critical views run.', 'Moved later, with the full migration.'][i], `<g transform="translate(0 ${24 + i * 70})"><rect class="rank rank--${c}" width="380" height="56" rx="3"/>${text(18, 35, n, 'rank-n')}${text(54, 35, t, 'label small')}</g>`)).join('')}</g>
    </g>`;
    const stages = [['RAW DATA', 'Source databases'], ['INGESTION', 'Ready-made tool'], ['SQL MODELS', 'Curated tables'], ['METABASE', 'The critical views']];
    const build = `<g class="state-layer" data-states="2">
      ${hint('weeks', 'Six weeks of building', 'Week by week until the critical views were live. Sequence illustrative.', `<g transform="translate(60 160)">${Array.from({ length: 6 }, (_, i) => `<rect class="wk-fill" style="--i:${i}" x="${i * 148}" y="0" width="138" height="40" rx="3"/>${text(i * 148 + 69, 25, `WEEK ${i + 1}`, 'center mini-label')}`).join('')}</g>`)}
      ${stages.map(([t, sub], i) => hint(`stage-${i}`, t, ['The data behind the critical views, at the source.', 'Raw data brought in with a ready-made tool selected after an audit.', 'The SQL models I wrote to turn raw data into the tables behind each view.', 'The board and finance views, rebuilt in Metabase.'][i], `<g transform="translate(${60 + i * 232} 300)"><rect class="stage-box ${i === 3 ? 'is-lit' : ''}" width="196" height="84" rx="4"/>${text(16, 34, t, 'mini-label')}${text(16, 60, sub, 'label small')}</g>`)).join('')}
      ${[0, 1, 2].map(i => `${arrow(`M${258 + i * 232} 342H${290 + i * 232}`)}`).join('')}
      ${[0, 1, 2, 3].map(k => `<circle class="packet" r="5"><animateMotion path="M80 342H900" dur="4s" begin="${-k}s" repeatCount="indefinite"/></circle>`).join('')}
      ${hint('hours', 'Holding the date', 'Weeks of 75 to 80 hours, weekends included, until the critical views were live.', `<g transform="translate(60 450)">${text(0, 0, '75–80 HOURS A WEEK · WEEKENDS INCLUDED', 'mini-label warm')}<rect class="hours-track" y="16" width="880" height="16" rx="2"/><rect class="hours-bar" y="16" width="880" height="16" rx="2"/></g>`)}
    </g>`;
    const delivered = `<g class="state-layer" data-states="3">
      ${wallHint('Tableau, switched off', 'The licence ended. Nothing critical was lost: the views the company needed already ran on the new stack.')}
      ${text(wx0, wy0 - 18, 'TABLEAU · LICENCE ENDED', 'mini-label muted-label')}
      ${hint('live', 'Live before the licence ended', 'The board and finance views ran in Metabase before the Tableau licence ended. The date held.', `<g transform="translate(560 160)">${text(0, 0, 'LIVE IN METABASE, ON TIME', 'mini-label warm')}${['Board-level monitoring', 'Finance'].map((t, i) => `<g transform="translate(0 ${20 + i * 66})"><rect class="view-live" width="380" height="54" rx="3"/><path class="view-check" d="M18 27l7 7 13-15"/>${text(52, 33, t, 'label small')}</g>`).join('')}</g>`)}
      ${hint('wider', 'Then, access for every team', 'Once the critical views were safe, access widened to the teams: the start of the move from 2 to 25 active analysis producers.', `<g transform="translate(560 330)">${text(0, 0, 'THEN, ACCESS WIDENED', 'mini-label')}${Array.from({ length: 8 }, (_, i) => `<g class="team-pop" style="--i:${i}">${crew(24 + i * 44, 34, .8)}</g>`).join('')}</g>`)}
      <g class="case-link" transform="translate(560 420)" data-open-case="food-data" tabindex="0" role="button" aria-label="Open the FoodChéri Data experience"><rect width="380" height="58" rx="3"/>${text(16, 24, 'FOODCHÉRI · THE FULL STORY', 'mini-label')}${text(16, 44, 'From 2 to 25 active analysis producers', 'label small')}${text(362, 36, '↗', 'chip-arrow end')}</g>
    </g>`;
    return `${defs}${header('FOODCHÉRI · SIX WEEKS')}${wall}${clock}${triage}${build}${delivered}`;
  }

  function signalScene() {
    // 01 · The stakes: alerts rain into a team's queue; the real ones are buried under valid but harmless ones.
    const rain = Array.from({ length: 14 }, (_, i) => ({ x: 90 + (i * 53) % 420, real: [3, 8, 12].includes(i), d: (i * .43) % 6 }));
    const stakes = `<g class="state-layer" data-states="0">
      ${text(60, 150, 'TESTS FIRING', 'mini-label')}${Array.from({ length: 24 }, (_, i) => `<circle class="test-dot" style="--i:${i}" cx="${80 + (i % 12) * 36}" cy="${180 + Math.floor(i / 12) * 30}" r="7"/>`).join('')}
      ${rain.map(({ x, real, d }) => `<g class="drop ${real ? 'is-real' : ''}"><rect x="-22" y="-9" width="44" height="18" rx="3"/><animateMotion path="M${x} 240L${600 + (x % 5) * 8} 560" dur="6s" begin="-${d.toFixed(2)}s" repeatCount="indefinite"/></g>`).join('')}
      ${hint('queue', 'The team’s queue', 'Every valid alert reached the team, harmless or not. The real ones were buried under the rest.', `<g transform="translate(580 420)"><rect class="queue" width="300" height="230" rx="4"/>${Array.from({ length: 9 }, (_, i) => `<rect class="q-item ${i === 6 ? 'is-real' : ''}" x="16" y="${14 + i * 23}" width="268" height="16" rx="2"/>`).join('')}${text(0, -12, 'A TEAM’S ALERT QUEUE', 'mini-label')}</g>`)}
      ${hint('noise', 'Right, and still noise', 'An alert technically valid but operationally harmless. Each one costs attention.', `<g transform="translate(60 520)"><rect class="legend-chip" width="44" height="18" rx="3"/>${text(56, 14, 'Valid but harmless', 'label small')}</g>`)}
      ${hint('real', 'A real problem', 'An alert on business-critical Data that needs action. Lost in the flood, it waits.', `<g transform="translate(60 556)"><rect class="legend-chip is-real" width="44" height="18" rx="3"/>${text(56, 14, 'Needs action', 'label small')}</g>`)}
    </g>`;
    // 02 · Why an override: detection keeps running; a qualification gate decides who is alerted.
    const gate = [520, 360];
    const why = `<g class="state-layer" data-states="1">
      ${hint('detect', 'Detection', 'Every test keeps running and detecting. An override never switches a test off.', `<g transform="translate(60 300)"><rect class="layer-band" width="260" height="120" rx="4"/>${text(20, 34, 'DETECTION', 'mini-label')}${text(20, 64, 'Every test keeps running', 'label small')}${text(20, 88, '525 a day', 'label small')}</g>`)}
      ${hint('gate', 'Qualification, in the common layer', 'I made requalifying an alert a capability of the common layer, available to every observability domain, not a workaround for only one of them.', `<g transform="translate(${gate[0]} ${gate[1]})"><path class="prism" d="M-50 -70L50 0 -50 70Z"/>${text(-28, 6, 'QUALIFY', 'mini-label warm')}</g>`)}
      ${line('M320 360H468', 'lane')}${line(`M570 360C650 360 690 230 900 230`, 'lane lane--team')}${line(`M570 360C650 360 690 500 900 500`, 'lane lane--log')}
      ${Array.from({ length: 6 }, (_, k) => { const real = k % 3 === 0; return `<circle class="particle ${real ? 'is-real' : ''}" r="7"><animateMotion path="M320 360H520${real ? 'C650 360 690 230 900 230' : 'C650 360 690 500 900 500'}" dur="4.2s" begin="-${(k * .7).toFixed(1)}s" repeatCount="indefinite"/></circle>`; }).join('')}
      ${hint('to-team', 'To the teams', 'Alerts that need action still reach the teams, at once.', `<g transform="translate(700 160)">${text(0, 0, 'TO THE TEAMS', 'mini-label')}${text(0, 22, 'What needs action', 'label small')}</g>`)}
      ${hint('to-log', 'Requalified, on record', 'Harmless alerts leave the teams’ queue but stay on record, with their override.', `<g transform="translate(700 560)">${text(0, 0, 'REQUALIFIED · ON RECORD', 'mini-label')}${text(0, 22, 'Harmless, still visible', 'label small')}</g>`)}
    </g>`;
    // 03 · What it brings: an override is filled in like a permit, and it runs out.
    const fields = [['JUSTIFICATION', 'Why this alert is harmless'], ['OWNER', 'Who answers for it'], ['REVIEW DATE', 'When it is checked again'], ['DURATION', 'When it ends'], ['TRACE', 'Kept in the history']];
    const brings = `<g class="state-layer" data-states="2">
      <g transform="translate(90 160)"><rect class="permit" width="440" height="420" rx="6"/>${text(26, 40, 'OVERRIDE', 'mini-label warm')}${text(26, 70, 'One alert, requalified', 'card-title')}
        ${fields.map(([k, v], i) => hint(`field-${i}`, k.charAt(0) + k.slice(1).toLowerCase(), v + '.', `<g class="permit-field" style="--i:${i}" transform="translate(26 ${100 + i * 60})"><rect width="388" height="48" rx="3"/><path class="pf-check" d="M14 24l6 6 11-13"/>${text(44, 20, k, 'mini-label')}${text(44, 38, v, 'label tiny')}</g>`)).join('')}</g>
      ${hint('expiry', 'Nothing silenced for good', 'When its duration ends, the override lapses and the alert goes back to its normal qualification.', `<g transform="translate(760 330)"><circle class="cd-track" r="100"/><circle class="cd-ring" r="100" pathLength="1" transform="rotate(-90)"><animate attributeName="stroke-dashoffset" values="0;1" dur="8s" repeatCount="indefinite"/></circle>${text(0, -6, 'DURATION', 'center mini-label')}${text(0, 18, 'then it lapses', 'center label small')}</g>`)}
      ${text(660, 470, 'Owned, reviewed, visible.', 'label')}${text(660, 496, 'The exception never hides.', 'label')}
    </g>`;
    // 04 · The result: before, every alert rang; after, what reaches the teams is worth acting on.
    const box = (x, title, items) => `<g transform="translate(${x} 170)">${text(0, 0, title, 'mini-label')}<rect class="queue" y="16" width="380" height="300" rx="4"/>${items}</g>`;
    const result = `<g class="state-layer" data-states="3">
      ${hint('before', 'Before', 'Every valid alert rang, harmless or not.', box(60, 'BEFORE · EVERY ALERT RINGS', Array.from({ length: 12 }, (_, i) => `<rect class="q-item ${[4, 9].includes(i) ? 'is-real' : ''}" x="16" y="${32 + i * 23}" width="348" height="16" rx="2"/>`).join('')))}
      ${hint('after', 'After', 'What reaches the teams is worth acting on, so they act on it, and trust it.', box(560, 'AFTER · WHAT REACHES THE TEAMS', [0, 1].map(i => `<rect class="q-item is-real pulse" x="16" y="${32 + i * 30}" width="348" height="22" rx="2"/>`).join('') + text(16, 290, 'Every one worth acting on', 'label small')))}
      ${arrow('M450 320H550')}
      ${hint('tests', '525 tests a day', 'Automated Data tests running every day on the platform.', readoutChip(60, 520, '525 / day', 'AUTOMATED DATA TESTS', 240))}
      ${hint('runs', 'About 60,000 executions', 'Executions so far, every one qualified the same way.', readoutChip(320, 520, '~60,000', 'EXECUTIONS SO FAR', 240))}
      ${hint('trust', 'Trust in alerts', 'Teams act on the alerts they receive. Trust in Data has improved across the company.', readoutChip(580, 520, 'Trusted', 'ALERTS TEAMS ACT ON', 240))}
    </g>`;
    return `${defs}${header('VERISURE · SIGNAL OR NOISE')}${stakes}${why}${brings}${result}`;
  }

  return { freightTrain, trainMarker, crossingSign, tourScene, toyotaScene, ligneCScene, deadlineScene, signalScene, opsDefs: defs, defs, pill, arrow, actor, header };
}
