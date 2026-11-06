// Domain views for Sentinel (the need behind the need, the Data system) and Galileo (education).
// Each step shows the real objects of the domain, labelled: pipelines, warehouses, SQL, dashboards, alerts, networks.
// Table names, code and timings are illustrative.
export function illustrationKit({ text, hint, ops, caseChip }) {
  const lab = (x, y, t, c = '') => text(x, y, t, `tx-label ${c}`);
  const sub = (x, y, t, c = '') => text(x, y, t, `tx-sub ${c}`);
  const link = (d, c = '') => `<path class="tx-link ${c}" d="${d}"/><path class="tx-flow ${c}" d="${d}"/>`;
  const arrow = (x1, y1, x2, y2, c = '') => {
    const a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    return `${link(`M${x1} ${y1}L${x2} ${y2}`, c)}<path class="tx-head ${c}" transform="translate(${x2} ${y2}) rotate(${a.toFixed(1)})" d="M2 0L-9-6V6Z"/>`;
  };
  const move = (inner, path, dur, begin = 0, extra = '') => `<g>${inner}<animateMotion path="${path}" dur="${dur}s" begin="-${begin}s" repeatCount="indefinite" ${extra}/></g>`;
  const db = (cx, y, w = 110, h = 100, c = '') => {
    const rx = w / 2, ry = 13;
    return `<g class="tx-db ${c}"><path d="M${cx - rx} ${y + ry}V${y + h - ry}A${rx} ${ry} 0 0 0 ${cx + rx} ${y + h - ry}V${y + ry}"/><ellipse cx="${cx}" cy="${y + ry}" rx="${rx}" ry="${ry}"/><path class="tx-db-l" d="M${cx - rx} ${y + h * .45}A${rx} ${ry} 0 0 0 ${cx + rx} ${y + h * .45}M${cx - rx} ${y + h * .7}A${rx} ${ry} 0 0 0 ${cx + rx} ${y + h * .7}"/></g>`;
  };
  const win = (x, y, w, h, title, inner = '') => `<g class="tx-win"><rect class="tx-win-bg" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><path class="tx-win-bar" d="M${x} ${y + 24}H${x + w}"/><circle cx="${x + 12}" cy="${y + 12}" r="3"/><circle cx="${x + 22}" cy="${y + 12}" r="3"/><circle cx="${x + 32}" cy="${y + 12}" r="3"/>${text(x + 44, y + 16, title, 'tx-win-t')}${inner}</g>`;
  const code = (x, y, lines, lh = 19) => lines.map((l, i) => text(x, y + i * lh, l, 'tx-code')).join('');
  const bars = (x, y, w, h, vals, c = '') => { const b = w / vals.length; return `<g class="tx-bars ${c}"><path class="tx-axis" d="M${x} ${y}V${y + h}H${x + w}"/>${vals.map((v, i) => `<rect style="--i:${i}" x="${(x + b * i + b * .18).toFixed(1)}" y="${(y + h - v * h).toFixed(1)}" width="${(b * .64).toFixed(1)}" height="${(v * h).toFixed(1)}"/>`).join('')}</g>`; };
  const spark = (x, y, w, h, vals, c = '') => `<path class="tx-spark ${c}" d="M${vals.map((v, i) => `${(x + i * w / (vals.length - 1)).toFixed(1)} ${(y + h - v * h).toFixed(1)}`).join('L')}"/>`;
  const user = (x, y, s = 1, c = '', style = '') => `<g class="tx-user ${c}" transform="translate(${x} ${y}) scale(${s})"${style ? ` style="${style}"` : ''}><circle cy="-24" r="8"/><path d="M-15 0V-3A15 12 0 0 1 15-3V0Z"/></g>`;
  const server = (x, y, w = 100, n = 3) => `<g class="tx-server">${Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * 32}" width="${w}" height="26" rx="3"/><circle class="tx-led" style="--i:${i}" cx="${x + 14}" cy="${y + 13 + i * 32}" r="3.5"/><path d="M${x + 30} ${y + 13 + i * 32}H${x + w - 12}"/>`).join('')}</g>`;
  const graph = (nodes, edges, c = '') => `<g class="tx-graph ${c}">${edges.map(([a, b]) => `<path d="M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}"/>`).join('')}${nodes.map(([x, y], i) => `<circle style="--i:${i}" cx="${x}" cy="${y}" r="7"/>`).join('')}</g>`;
  const check = (x, y, ok = true) => `<g transform="translate(${x} ${y})" class="tx-check ${ok ? '' : 'ko'}"><circle r="9"/><path d="${ok ? 'M-4 0L-1 4 5-4' : 'M-4-4L4 4M4-4L-4 4'}"/></g>`;
  const divider = (y, t) => `<path class="tx-div" d="M40 ${y}H960"/>${lab(500, y + 5, t, 'center strong')}`;
  const lane = (y, t, s) => `${lab(40, y, t, 'strong')}${sub(130, y, s)}`;
  const plane = (s = 1) => `<g class="tx-veh" transform="scale(${s})"><path d="M-30-3L18-3C28-3 32 0 32 2S28 5 20 5H-20L-34-14H-26ZM-6-3L-22-22H-12L10-3ZM-4 5L-16 18H-7L10 5Z"/></g>`;
  const truck = (s = 1) => `<g class="tx-veh" transform="scale(${s})"><rect x="-60" y="-34" width="62" height="30" rx="2"/><path d="M4-26H20L30-14V-4H4Z"/><circle cx="-44" cy="0" r="6"/><circle cx="-10" cy="0" r="6"/><circle cx="18" cy="0" r="6"/></g>`;
  const barge = (s = 1) => `<g class="tx-veh" transform="scale(${s})"><path d="M-54-6H54L44 8H-44Z"/><rect x="-44" y="-18" width="60" height="12"/><rect x="26" y="-22" width="16" height="16"/></g>`;
  const ship = (s = 1) => `<g class="tx-veh" transform="scale(${s})"><path d="M-70-10H70L54 12H-54Z"/><rect x="-52" y="-30" width="30" height="20"/><rect x="-18" y="-30" width="30" height="20"/><rect x="16" y="-42" width="26" height="32"/></g>`;

  // ---------- 5 · European space ambition, steps 1 and 2 ----------
  function spaceLayers() {
    const stars = Array.from({ length: 70 }, (_, i) => { const x = (i * 137.5) % 960 + 20, y = (i * 89.3) % 440 + 70; return `<circle class="star" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(i % 3) * .5 + .6}" style="--i:${i % 7}"/>`; }).join('');
    const transfer = 'M218 265C350 120 580 110 713 235';
    const satellite = s => `<g class="tx-sat" transform="scale(${s})"><rect x="-9" y="-7" width="18" height="14" rx="2"/><path d="M-9 0H-32M9 0H32"/><rect x="-44" y="-7" width="14" height="14"/><rect x="30" y="-7" width="14" height="14"/></g>`;
    const roles = ['Scientists', 'Engineers', 'Operators', 'Analysts', 'Technicians'];
    const pull = `<g class="state-layer" data-states="0">
      ${hint('childhood', 'Since childhood', '', `<g>${stars}${lab(40, 92, 'THE UNIVERSE', 'strong')}${sub(40, 112, 'Since childhood')}</g>`)}
      <clipPath id="pullClip"><rect x="0" y="70" width="1000" height="460"/></clipPath>
      <g clip-path="url(#pullClip)">${[190, 330, 680].map(r => `<circle class="tx-orbit" cx="40" cy="330" r="${r}"/>`).join('')}<circle class="tx-sun" cx="40" cy="330" r="36"/></g>
      ${lab(20, 392, 'SUN')}
      <circle class="tx-planet earth" cx="218" cy="265" r="15"/>${lab(242, 276, 'EARTH')}
      <circle class="tx-planet mars" cx="359" cy="415" r="10"/>${lab(378, 420, 'MARS')}
      <circle class="tx-planet jupiter" cx="713" cy="235" r="38"/><path class="tx-bands" d="M678 222Q713 230 748 222M676 240Q713 250 750 240M684 256Q713 262 742 256"/>${lab(762, 248, 'JUPITER')}
      ${hint('exploration', 'Exploration', '', `<g><path class="tx-orbit strong" d="${transfer}"/>${move(satellite(.55), transfer, 12, 0)}${lab(470, 112, 'JUICE · ESA PROBE TO JUPITER', 'center')}</g>`)}
      ${hint('scifi', 'Science fiction', '', `<g><path class="tx-orbit" d="M756 215Q860 160 950 108"/>${move('<path class="tx-ship" d="M-14 6L14 0-14-6-9 0Z"/>', 'M756 215Q860 160 950 108', 7, 0, 'rotate="auto"')}${lab(960, 196, 'SCIENCE FICTION', 'end')}</g>`)}
      ${sub(960, 512, 'Orbits not to scale', 'end')}
      <path class="tx-beam" d="M600 572L468 150"/>
      ${hint('larger', 'Larger than one person', '', `<g><path class="tx-div" d="M40 548H960"/>${lab(40, 590, 'MISSION CONTROL', 'strong')}${sub(40, 612, 'Larger than one person')}${roles.map((t, i) => `<g>${user(300 + i * 140, 650)}<rect class="tx-app" x="${324 + i * 140}" y="618" width="46" height="32" rx="3"/>${spark(330 + i * 140, 624, 34, 20, [.2, .6, .4, .9])}${sub(310 + i * 140, 674, t, 'center')}</g>`).join('')}</g>`)}</g>`;
    const earthCurve = 'M0 600Q500 470 1000 600V730H0Z';
    const systems = `<g class="state-layer" data-states="1">
      ${lab(40, 88, 'THE DATA CHAIN OF A SPACE SYSTEM', 'strong')}
      <path class="tx-earth" d="${earthCurve}"/><path class="tx-earth-l" d="M0 600Q500 470 1000 600"/>
      ${hint('chain-0', 'Generate', '', `<g><path class="tx-scan" d="M170 212L110 556H230Z"/><g transform="translate(170 200)">${satellite(1.4)}</g>${lab(170, 126, 'GENERATE', 'center')}${sub(170, 148, 'Instruments in orbit', 'center')}</g>`)}
      ${hint('chain-1', 'Transport', '', `<g>${arrow(205, 218, 392, 492)}<g class="tx-icon" transform="translate(412 512) scale(1.25)"><path d="M-22-14A24 24 0 0 0 16 22ZM-3 3L12-14M-3 3L-6 26H10"/></g>${sub(412, 574, 'Ground station', 'center')}${lab(420, 250, 'TRANSPORT', 'center')}${sub(420, 272, 'Downlink, ground stations', 'center')}</g>`)}
      ${arrow(440, 505, 572, 476)}
      ${hint('chain-2', 'Process', '', `<g>${server(578, 434, 104)}${lab(630, 390, 'PROCESS', 'center')}${sub(630, 412, 'Ground processing', 'center')}</g>`)}
      ${arrow(688, 470, 754, 430)}
      ${hint('chain-3', 'Use', '', `<g>${lab(860, 300, 'USE', 'center')}${sub(860, 322, 'Operations, science, services', 'center')}${win(760, 336, 200, 130, 'DATA PRODUCTS', bars(778, 370, 164, 82, [.4, .7, .5, .9, .65]))}${user(800, 540, .9)}${user(860, 545, .9)}${user(920, 540, .9)}</g>`)}
      ${hint('chain-today', 'My experience today', '', `<g><path class="tx-axis" d="M556 598V616H960V598"/>${lab(758, 648, 'MY EXPERIENCE TODAY', 'center')}</g>`)}
      ${hint('upstream', 'Further upstream', '', `<g><path class="tx-promise dashed" d="M60 598V616H500V598"/>${lab(280, 648, 'NEXT: FURTHER UPSTREAM', 'center warm')}${arrow(640, 666, 400, 666)}</g>`)}</g>`;
    return { pull, systems };
  }

  return { spaceLayers };
}
