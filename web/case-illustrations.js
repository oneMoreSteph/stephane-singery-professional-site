// Domain views for Sentinel (the need behind the need, the Data system) and Galileo (education).
// Each step shows the real objects of the domain, labelled: pipelines, warehouses, SQL, dashboards, alerts, networks.
// Table names, code and timings are illustrative.
export function illustrationKit({ text, hint, ops, caseChip, france }) {
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

  // ---------- 3.2 · The need behind the need: what was asked, on top; what I built, below ----------
  function needScene() {
    const tiles = Array.from({ length: 60 }, (_, i) => { const x = 480 + (i % 10) * 46, y = 122 + Math.floor(i / 10) * 32, used = [3, 14, 21, 28, 37, 46][0] === i || [14, 21, 28, 37, 46].includes(i); return `<g class="tx-tile ${used ? 'used' : ''}"><rect x="${x}" y="${y}" width="40" height="26" rx="2"/><path d="M${x + 6} ${y + 20}V${y + 14}M${x + 14} ${y + 20}V${y + 9}M${x + 22} ${y + 20}V${y + 12}M${x + 30} ${y + 20}V${y + 6}"/></g>`; }).join('');
    const tickets = [0, 1, 2, 3, 4].map(i => move('<rect class="tx-ticket" x="-11" y="-8" width="22" height="16" rx="2"/>', 'M60 210H292', 5, i)).join('');
    const seats = Array.from({ length: 25 }, (_, i) => user(676 + (i % 5) * 36, 448 + Math.floor(i / 5) * 36, .72, i < 2 ? 'on' : 'tx-lit-seq', `--i:${i}`)).join('');
    const food = `<g class="state-layer" data-states="0">
      ${lane(92, 'ASKED', 'More dashboards')}
      ${hint('nb-queue', 'A bottleneck', '', `<g>${lab(60, 160, 'DASHBOARD REQUESTS')}<path class="tx-funnel" d="M225 172L316 196M225 248L316 224"/>${tickets}${user(345, 226, 1, 'on')}${user(388, 226, 1, 'on')}${lab(366, 160, '2 PRODUCERS', 'center')}</g>`)}
      ${arrow(415, 210, 468, 210)}
      ${hint('nb-stones', 'A graveyard of dashboards', '', `<g>${lab(480, 110, 'TABLEAU · 600+ DASHBOARDS')}${tiles}${sub(480, 334, 'Lit: about 1 in 10, used regularly')}</g>`)}
      ${divider(352, 'NEEDED: TEAMS BUILDING THEIR OWN ANALYSES')}
      ${lane(392, 'BUILT', 'A platform, a tool and training')}
      ${hint('nb-platform', 'The Data Platform', '', `<g>${lab(120, 428, 'DATA PLATFORM', 'center')}${db(120, 440, 130, 110)}${sub(120, 572, 'Curated tables', 'center')}</g>`)}
      ${arrow(190, 495, 278, 495)}
      ${hint('nb-metabase', 'Metabase', '', win(285, 420, 280, 190, 'METABASE · SELF-SERVICE BI', bars(310, 460, 230, 130, [.35, .6, .45, .8, .55, .95, .7])))}
      ${hint('nb-training', 'Training', '', `<g>${lab(612, 478, 'TRAINING', 'center')}${arrow(572, 495, 652, 495)}</g>`)}
      ${hint('nb-seats', 'Teams building their own analyses', '', `<g>${seats}${text(900, 480, '2 → 25', 'tx-big center')}${lab(900, 508, 'ACTIVE ANALYSIS', 'center')}${lab(900, 528, 'PRODUCERS', 'center')}</g>`)}</g>`;
    const stops = Array.from({ length: 42 }, (_, i) => 60 + i * 880 / 41);
    const ends = [['nb-agent', 'Station staff', 'STATION STAFF', 'M-9-13H9V13H-9ZM-5 8H5'], ['nb-prov', 'Welcome providers', 'WELCOME PROVIDERS', 'M-7-13H7V13H-7ZM-3 8H3'], ['nb-auth', 'Local authorities', 'LOCAL AUTHORITIES', 'M-11 12V-4L0-12 11-4V12ZM-4 12V3H4V12'], ['nb-board', 'Platform boards', 'PLATFORM BOARDS', 'M-14-10H14V8H-14ZM-9-4H9M-9 2H3M0 8V14'], ['nb-speak', 'Announcements', 'ANNOUNCEMENTS', 'M-12-4H-5L4-11V11L-5 4H-12ZM8-5Q12 0 8 5']];
    const rowY = i => 442 + i * 48;
    const ligne = `<g class="state-layer" data-states="1">
      ${lane(92, 'ASKED', 'Care plans for 42 stations')}
      ${hint('nb-line', 'RER C', '', `<g>${lab(60, 138, 'RER C · 42 STATIONS')}<path class="tx-line-rail" d="M60 170H940"/>${stops.map((x, i) => `<circle class="tx-stop" cx="${x.toFixed(1)}" cy="170" r="${i % 10 === 0 ? 6 : 4}"/>`).join('')}${move('<rect class="tx-train" x="-22" y="-7" width="44" height="14" rx="4"/>', 'M60 170H940', 16, 0)}${move('<rect class="tx-train" x="-22" y="-7" width="44" height="14" rx="4"/>', 'M940 170H60', 16, 7)}</g>`)}
      ${hint('nb-binder', 'A care plan per station', '', `<g>${stops.map(x => `<path class="tx-doc" d="M${(x - 6).toFixed(1)} 190h9l3 3v13h-12z"/>`).join('')}${lab(60, 240, 'ONE CARE PLAN PER STATION, ON PAPER')}${lab(500, 300, 'SEEN: A PLAN WORKS ONLY IF PEOPLE ON THE GROUND CAN CARRY IT OUT', 'center')}</g>`)}
      ${divider(352, 'NEEDED: PEOPLE ABLE TO ACT')}
      ${lane(392, 'BUILT', 'Tools and information for each of them')}
      ${hint('nb-source', 'Disruption information', '', `<g>${lab(120, 465, 'DISRUPTION INFO', 'center')}${server(70, 482, 100)}</g>`)}
      ${ends.map(([id, title, t, d], i) => `${link(`M178 530L322 ${rowY(i)}`)}${link(`M545 ${rowY(i)}L660 530`)}${hint(id, title, '', `<g><g class="tx-icon" transform="translate(350 ${rowY(i)})"><path d="${d}"/></g>${lab(382, rowY(i) + 5, t)}</g>`)}`).join('')}
      ${hint('nb-assess', 'The first way to assess the plans', '', win(665, 430, 295, 205, 'INDICATORS · FIRST ASSESSMENT', `${sub(685, 482, 'Plan carried out')}<rect class="tx-gauge" x="685" y="492" width="255" height="12" rx="3"/><rect class="tx-gauge-on" x="685" y="492" width="200" height="12" rx="3"/>${sub(685, 538, 'Equipment did its job')}<rect class="tx-gauge" x="685" y="548" width="255" height="12" rx="3"/><rect class="tx-gauge-on" x="685" y="548" width="165" height="12" rx="3"/>${spark(685, 575, 255, 45, [.2, .35, .3, .5, .55, .7, .8])}`))}</g>`;
    const signals = [['Test results', [.9, .9, .4, .9, .9, .9, .9, .5, .9]], ['Freshness', [.6, .6, .6, .2, .6, .6, .6, .6, .6]], ['Volume', [.4, .5, .45, .55, .5, .9, .5, .45, .5]], ['Schema changes', [.2, .2, .2, .2, .7, .2, .2, .2, .2]]];
    const stages = [['nb-detect', 'Detect', 'DETECT', '<circle r="14"/><circle r="6"/><path d="M0 0L13-6"/>'], ['nb-qualify', 'Qualify', 'QUALIFY', '<path d="M-15-15H2L15 0 2 15H-15Z"/><circle cx="-7" cy="-7" r="2.5"/>'], ['nb-prio', 'Prioritise', 'PRIORITISE', '<path d="M-14-11H14M-14 0H6M-14 11H-2"/>'], ['nb-oncall', 'Notify', 'NOTIFY', '<path d="M-13 10C-9 3-11-13 0-13S9 3 13 10ZM-3 14H3"/>'], ['nb-govern', 'Govern', 'GOVERN', '<path d="M0-16L14-10V2C14 9 6 14 0 17-6 14-14 9-14 2V-10ZM-6 0L-1 5 7-5"/>']];
    const verisure = `<g class="state-layer" data-states="2">
      ${lane(92, 'ASKED', 'Data tests')}
      ${hint('nb-iv', 'Automated Data tests', '', win(40, 108, 440, 222, 'ELEMENTARY · DAILY TEST RUN', `${check(66, 152)}${check(66, 180)}${check(66, 208, false)}${check(66, 236)}${code(86, 156, ['not_null   orders.id', 'unique     customers.id', 'freshness  payments', 'accepted   alarms.status'], 28)}${lab(60, 300, '525 TESTS A DAY')}`))}
      ${arrow(110, 332, 110, 444)}
      ${hint('nb-thermo', 'One signal among others', '', `<g>${lab(530, 118, 'SEEN: A TEST IS ONE SIGNAL AMONG OTHERS')}${signals.map(([t, v], i) => `${sub(530, 160 + i * 46, t)}${spark(680, 142 + i * 46, 270, 30, v, i === 0 ? 'on' : '')}`).join('')}</g>`)}
      ${divider(352, 'NEEDED: TO SEE DATA HEALTH')}
      ${lane(392, 'BUILT', 'A Data Quality and Observability platform')}
      <path class="tx-link" d="M110 484H830"/><path class="tx-flow" d="M110 484H830"/>
      ${stages.map(([id, title, t, icon], i) => hint(id, title, '', `<g><circle class="tx-stage" cx="${110 + i * 180}" cy="484" r="38"/><g class="tx-icon" transform="translate(${110 + i * 180} 484)">${icon}</g>${lab(110 + i * 180, 544, t, 'center')}</g>`)).join('')}
      ${move('<circle class="tx-alert" r="7"/>', 'M72 484H870', 7, 0)}
      ${hint('nb-monitor', 'Data health', '', `<g>${lab(40, 600, 'DATA HEALTH')}${sub(40, 620, 'And its trends')}${spark(180, 575, 780, 70, [.5, .55, .45, .6, .35, .55, .65, .6, .7, .68, .75, .72, .8, .78, .85])}<path class="tx-axis" d="M180 575V645H960"/></g>`)}</g>`;
    return `${ops.opsDefs}${ops.header('THE NEED BEHIND THE NEED · ASKED, THEN BUILT')}${food}${ligne}${verisure}`;
  }

  // ---------- 3.3 · One Data system: the real architecture at each layer ----------
  function stackScene() {
    const access = `<g class="state-layer" data-states="0">
      ${lab(40, 110, 'LAYER 1 · ACCESS · FOODCHÉRI', 'strong')}
      ${hint('s-red', 'Redshift', '', `<g>${lab(100, 235, 'REDSHIFT', 'center')}${db(100, 250, 120, 130)}${sub(100, 402, 'Raw Data', 'center')}</g>`)}
      ${arrow(164, 315, 212, 315)}
      ${hint('s-pump', 'Ingestion tool', '', `<g>${lab(270, 235, 'INGESTION', 'center')}<path class="tx-conn" d="M270 268L312 292V340L270 364 228 340V292Z"/><g class="tx-icon" transform="translate(270 316)"><path d="M-10-14V-4M10-14V-4M-16-4H16V4C16 12 8 16 0 16S-16 12-16 4ZM0 16V24"/></g>${sub(270, 402, 'Ready-made tool', 'center')}</g>`)}
      ${arrow(316, 315, 362, 315)}
      ${hint('s-plant', 'SQL models', '', win(368, 222, 212, 188, 'SQL MODELS', code(384, 272, ['SELECT order_id,', '  SUM(amount) AS total', 'FROM raw.orders', 'GROUP BY 1'], 24)))}
      ${arrow(584, 315, 626, 315)}
      ${hint('s-tower', 'BigQuery', '', `<g>${lab(690, 235, 'BIGQUERY', 'center')}${db(690, 250, 120, 130)}${sub(690, 402, 'Curated tables', 'center')}</g>`)}
      ${arrow(754, 315, 790, 315)}
      ${hint('s-tap', 'Metabase', '', `${win(796, 222, 170, 188, 'METABASE', bars(812, 262, 138, 130, [.4, .7, .5, .9, .65]))}`)}
      ${arrow(880, 416, 880, 486)}
      ${hint('s-users', 'Business teams', '', `<g>${user(800, 548)}${user(850, 548)}${user(900, 548)}${user(950, 548)}${lab(875, 576, 'BUSINESS TEAMS', 'center')}${sub(875, 596, 'Self-service BI', 'center')}</g>`)}</g>`;
    const inflow = [['NEW', 'New records'], ['UPDATED', 'Updated records'], ['LATE', 'Late arrivals']];
    const nodes = [[376, 300], [376, 360], [376, 420], [470, 330], [470, 410], [564, 370]];
    const transformation = `<g class="state-layer" data-states="1">
      ${lab(40, 110, 'LAYER 2 · TRANSFORMATION · HEETCH', 'strong')}
      ${inflow.map(([t], i) => `${hint(`s-in-${i}`, t.charAt(0) + t.slice(1).toLowerCase() + ' records', '', `<g>${lab(40, 265 + i * 60, t)}</g>`)}${arrow(112, 260 + i * 60, 168, 315)}`).join('')}
      ${hint('s-raw', 'BigQuery · raw', '', `<g>${lab(230, 235, 'BIGQUERY · RAW', 'center')}${db(230, 255, 110, 120)}</g>`)}
      ${arrow(288, 315, 322, 315)}
      ${hint('s-orch', 'Orchestration and tags', '', `<g>${lab(330, 150, 'ORCHESTRATION · TAG POLICY')}<path class="tx-axis" d="M330 165H630"/>${[0, 1, 2, 3, 4].map(i => `<path class="tx-tick" d="M${345 + i * 66} 158V172"/>`).join('')}${move('<circle class="tx-alert" r="6"/>', 'M345 165H615', 6, 0)}</g>`)}
      ${hint('s-df', 'Dataform', '', win(328, 186, 306, 300, 'DATAFORM · INCREMENTAL SQL MODELS', graph(nodes, [[0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]])))}
      ${hint('s-tests', 'Reusable tests in Dataform', '', `<g>${check(470, 330)}${check(470, 410)}${check(564, 370)}${lab(345, 472, 'REUSABLE DATA TESTS')}</g>`)}
      ${arrow(638, 315, 662, 315)}
      ${hint('s-cur', 'BigQuery · curated', '', `<g>${lab(722, 235, 'BIGQUERY · CURATED', 'center')}${db(722, 255, 110, 120)}${sub(722, 398, 'Daily toward hourly', 'center')}</g>`)}
      ${arrow(780, 290, 812, 240)}${arrow(780, 340, 812, 405)}
      ${hint('s-looker', 'Looker', '', win(816, 160, 150, 145, 'LOOKER · BI', bars(830, 198, 122, 92, [.4, .75, .55, .9])))}
      ${hint('s-vertex', 'Vertex AI', '', win(816, 340, 150, 145, 'VERTEX AI · AI', graph([[840, 385], [840, 440], [890, 370], [890, 412], [890, 455], [940, 412]], [[0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 5], [3, 5], [4, 5]])))}</g>`;
    const marts = [370, 475, 580];
    const observability = `<g class="state-layer" data-states="2">
      ${lab(40, 110, 'LAYER 3 · OBSERVABILITY · VERISURE', 'strong')}
      ${hint('o-dbt', 'dbt Core', '', win(40, 210, 225, 210, 'DBT CORE · MODELS', graph([[75, 275], [75, 335], [75, 395], [155, 305], [155, 375], [230, 340]], [[0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]])))}
      ${arrow(270, 315, 308, 315)}
      ${hint('o-marts', 'Snowflake marts', '', `<g>${lab(475, 205, 'SNOWFLAKE MARTS', 'center')}${marts.map(x => db(x, 245, 90, 110)).join('')}</g>`)}
      ${hint('o-sensors', 'Elementary tests', '', `<g>${marts.map(x => check(x, 228)).join('')}${lab(475, 392, 'ELEMENTARY TESTS', 'center')}${sub(475, 412, '525 a day', 'center')}</g>`)}
      ${hint('o-leak', 'An anomaly, caught early', '', `<g><circle class="tx-ping" cx="580" cy="300" r="24"/><circle class="tx-alert" cx="580" cy="300" r="7"/>${lab(585, 378, 'ANOMALY', 'center warm')}</g>`)}
      ${arrow(632, 315, 672, 315)}
      ${hint('o-room', 'Shared model', '', win(678, 195, 288, 225, 'SHARED OBSERVABILITY MODEL', ['DETECT', 'QUALIFY', 'PRIORITISE'].map((t, i) => `<circle class="tx-stage" style="--i:${i}" cx="705" cy="${252 + i * 56}" r="13"/>${lab(730, 257 + i * 56, t)}`).join('')))}
      ${arrow(822, 426, 822, 480)}
      ${hint('o-teams', 'Data teams', '', `<g>${user(735, 545)}${user(785, 545)}${user(835, 545)}${user(885, 545)}${lab(810, 574, 'DATA TEAMS', 'center')}${sub(810, 594, 'Alerts worth acting on', 'center')}</g>`)}</g>`;
    return `${ops.opsDefs}${ops.header('ONE DATA SYSTEM · THREE LAYERS, THREE ROLES')}${access}${transformation}${observability}`;
  }

  // ---------- 4.1 · Logistics and transport ----------
  function logisticsScene() {
    const modes = [
      ['lg-air', 'Air', 'AIR', 'Fastest', '€€€€', plane(.85), 5],
      ['lg-road', 'Road', 'ROAD', 'Door to door', '€€€', truck(.7), 9],
      ['lg-rail', 'Rail', 'RAIL', 'Heavy loads, fixed paths', '€€', ops.freightTrain(0, 0, .7, { wagons: 2 }), 11],
      ['lg-river', 'River', 'RIVER', 'Large volumes', '€', barge(.75), 15],
      ['lg-sea', 'Sea', 'SEA', 'Worldwide, by container', '€', ship(.62), 18]
    ];
    const laneY = i => 150 + i * 96;
    const shelves = Array.from({ length: 12 }, (_, i) => `<rect class="tx-crate" x="${58 + (i % 3) * 32}" y="${250 + Math.floor(i / 3) * 34}" width="26" height="26" rx="2"/>`).join('');
    const flows = `<g class="state-layer" data-states="0">
      ${hint('lg-wh', 'Flows of goods, stock and costs', '', `<g>${lab(100, 205, 'STOCK', 'center')}${sub(100, 228, 'What waits', 'center')}${shelves}</g>`)}
      ${modes.map(([id, title, t, s, cost, veh, dur], i) => `${hint(id, title, '', `<g><path class="tx-route" d="M190 ${laneY(i)}H810"/>${lab(200, laneY(i) + 24, t)}${sub(270, laneY(i) + 24, s)}${text(800, laneY(i) + 24, cost, 'tx-label end warm')}</g>`)}${move(veh, `M240 ${laneY(i) - 6}H770`, dur, i)}`).join('')}
      ${hint('lg-promise', 'The promise', '', `<g>${lab(885, 205, 'CUSTOMER', 'center')}${user(885, 300, 1.4, 'on')}${lab(885, 340, 'ON TIME', 'center warm')}${lab(885, 362, 'RIGHT COST', 'center warm')}</g>`)}</g>`;
    const gates = [
      ['m-cost', 'Cost control', 'COST CONTROL', 'Budget per shipment', '<path d="M12-14C2-20-14-14-14 0S2 20 12 14M-20-5H6M-20 5H6"/>'],
      ['m-law', 'Transport law', 'TRANSPORT LAW', 'Rules for each mode', '<path d="M8-16C0-22-10-16-4-9L6-2C14 4 6 12 0 8M-8 16C0 22 10 16 4 9L-6 2C-14-4-6-12 0-8"/>'],
      ['m-nego', 'Negotiation', 'NEGOTIATION', 'Carriers, clients', '<path d="M-20 0L-8-10 2-6 12-10 20 0 8 12-2 4M-8-10L-14 8-4 16 8 12"/>'],
      ['m-lang', 'Languages', 'LANGUAGES', 'International logistics', '<circle r="18"/><path d="M-18 0H18M0-18C-10-8-10 8 0 18M0-18C10-8 10 8 0 18"/>']
    ];
    const gateX = i => 170 + i * 220;
    const dock = `<g class="state-layer" data-states="1">
      ${lab(60, 120, 'A SHIPMENT, FROM ORDER TO DELIVERY', 'strong')}
      <path class="tx-route" d="M60 400H940"/>
      ${gates.map(([id, title, t, s, icon], i) => hint(id, title, '', `<g><path class="tx-link" d="M${gateX(i)} 310V388"/><circle class="tx-stage" cx="${gateX(i)}" cy="260" r="48"/><g class="tx-icon" transform="translate(${gateX(i)} 260)">${icon}</g>${lab(gateX(i), 188, t, 'center')}${sub(gateX(i), 440, s, 'center')}<circle class="tx-stop" cx="${gateX(i)}" cy="400" r="7"/></g>`)).join('')}
      ${move(truck(.8), 'M90 394H910', 14, 0)}
      ${hint('m-intern', 'A company internship', '', `<g><path class="tx-axis" d="M110 490V510H890V490"/>${lab(500, 545, 'COMPANY INTERNSHIP: REAL CONSTRAINTS, REAL COUNTERPARTS', 'center')}${sub(500, 568, 'Two years of planning', 'center')}</g>`)}</g>`;
    const hx = h => 220 + (h - 5) * 165;
    const rows = [['SOURCE EXTRACT', 5, .7], ['INGESTION', 5.7, .55], ['SQL MODELS', 6.25, .75], ['MARTS', 7, .4], ['DASHBOARD', 7.4, .4]];
    const rowsY = i => 172 + i * 42;
    const shift = '<animateTransform attributeName="transform" type="translate" values="0 0;0 0;75 0;75 0;0 0" keyTimes="0;.25;.45;.9;1" dur="9s" repeatCount="indefinite"/>';
    const bar = (i, cls = '') => { const [, h, d] = rows[i]; return `<rect class="tx-gantt ${cls}" x="${hx(h).toFixed(1)}" y="${rowsY(i) - 13}" width="${(d * 165).toFixed(1)}" height="24" rx="3"/>`; };
    const same = `<g class="state-layer" data-states="2">
      ${lab(40, 92, 'A DATA PIPELINE RUN, EVERY MORNING', 'strong')}
      ${[5, 6, 7, 8, 9].map(h => `<path class="tx-grid" d="M${hx(h)} 142V${rowsY(4) + 22}"/>${text(hx(h), 134, `0${h}:00`, 'tx-sub center')}`).join('')}
      ${rows.map(([t], i) => lab(40, rowsY(i) + 4, t)).join('')}
      ${hint('give-chain', 'The whole chain', '', `<g>${bar(0)}<rect class="tx-gantt late" x="${(hx(5) + .7 * 165).toFixed(1)}" y="${rowsY(0) - 13}" height="24" rx="3" width="0"><animate attributeName="width" values="0;0;75;75;0" keyTimes="0;.25;.45;.9;1" dur="9s" repeatCount="indefinite"/></rect><g>${shift}${[1, 2, 3, 4].map(i => bar(i)).join('')}</g>${lab(hx(5), rowsY(4) + 42, 'A DELAY UPSTREAM LANDS DOWNSTREAM')}</g>`)}
      ${hint('give-promise', 'The promise', '', `<g><path class="tx-promise" d="M${hx(8)} 108V${rowsY(4) + 22}"/>${lab(hx(8) + 8, 118, 'THE PROMISE: READY AT 08:00', 'warm')}</g>`)}
      <path class="tx-div" d="M40 416H960"/>
      ${hint('give-limit', 'A real constraint', '', `<g>${lab(40, 454, 'CONSTRAINTS')}${sub(40, 490, 'Warehouse quota')}<rect class="tx-gauge" x="40" y="500" width="220" height="12" rx="3"/><rect class="tx-gauge-on warn" x="40" y="500" width="185" height="12" rx="3"/>${sub(40, 546, 'Source available from 05:00')}<rect class="tx-gauge" x="40" y="556" width="220" height="12" rx="3"/><rect class="tx-gauge-on" x="110" y="556" width="110" height="12" rx="3"/></g>`)}
      ${hint('give-trade', 'Time against cost', '', `<g>${lab(350, 454, 'TIME AGAINST COST')}${sub(350, 490, 'Data freshness')}<path class="tx-axis" d="M350 512H620"/><circle class="tx-alert" cx="350" cy="512" r="8"><animate attributeName="cx" values="350;620;350" dur="8s" repeatCount="indefinite"/></circle>${sub(350, 536, 'Daily')}${sub(620, 536, 'Hourly', 'end')}${sub(350, 570, 'Cost')}${bars(420, 546, 200, 34, [.15, .3, .55, .8, 1])}</g>`)}
      ${hint('give-obtain', 'What I need, obtained', '', `<g>${lab(710, 454, 'NEGOTIATED')}${user(745, 530, 1, 'on')}${arrow(775, 516, 860, 516)}${arrow(860, 502, 775, 502)}${user(890, 530)}${sub(745, 554, 'Me', 'center')}${sub(890, 554, 'Source owner', 'center')}${sub(710, 586, 'A new delivery time, agreed')}</g>`)}</g>`;
    return `${ops.opsDefs}${ops.header('IUT DE CHARTRES · LOGISTICS AND TRANSPORT · 2008–2010')}${flows}${dock}${same}`;
  }

  // ---------- 4.2 · Self-taught, then Jedha ----------
  function learningScene() {
    const hist = [.12, .3, .55, .85, 1, .8, .5, .28, .1];
    const desk = `<g class="state-layer" data-states="0">
      ${hint('l-python', 'Python', '', win(40, 86, 290, 245, 'PYTHON', code(58, 138, ['import pandas as pd', '', 'df = pd.read_csv("x.csv")', 'df.groupby("city")', '  .size()', '  .sort_values()'], 26)))}
      ${hint('l-sql', 'SQL', '', win(355, 86, 290, 245, 'SQL', code(373, 138, ['SELECT city, COUNT(*)', 'FROM orders', 'GROUP BY city', 'ORDER BY 2 DESC', '', 'LIMIT 10'], 26)))}
      ${hint('l-stats', 'Statistics', '', win(670, 86, 290, 245, 'STATISTICS', bars(695, 130, 240, 170, hist)))}
      ${hint('l-window', 'From 2019', '', `<g>${text(40, 440, '2019', 'tx-big')}${lab(40, 468, 'SELF-TAUGHT')}${sub(40, 490, 'In the evenings')}</g>`)}
      ${hint('l-laptop', 'Practice, until it holds', '', `<g>${[['GOAL', 330], ['METHOD', 540], ['PRACTICE', 750]].map(([t, x]) => `<circle class="tx-stage" cx="${x}" cy="440" r="42"/>${lab(x, 445, t, 'center')}`).join('')}${arrow(374, 440, 494, 440)}${arrow(584, 440, 704, 440)}<path class="tx-link" d="M750 484V540H330V492"/><path class="tx-flow" d="M750 484V540H330V492"/><path class="tx-head" transform="translate(330 490) rotate(-90)" d="M2 0L-9-6V6Z"/>${lab(540, 570, 'AGAIN, UNTIL IT HOLDS', 'center')}${[0, 1, 2].map(i => check(850 + i * 34, 440, i === 2)).join('')}</g>`)}</g>`;
    const camps = [
      ['PYTHON', code(62, 150, ['def clean(df):', '  return df.dropna()', '', 'clean(raw).head()'], 24)],
      ['ANALYSIS · VISUALISATION', bars(380, 128, 240, 120, [.3, .55, .4, .8, .65, .95])],
      ['MACHINE LEARNING', `<g class="tx-graph">${[[710, 225], [735, 195], [760, 215], [775, 175], [810, 150], [840, 170], [860, 130], [895, 145]].map(([x, y], i) => `<circle style="--i:${i}" cx="${x}" cy="${y}" r="5"/>`).join('')}</g><path class="tx-spark on" d="M700 235L915 125"/>`],
      ['DEEP LEARNING', graph([[75, 350], [75, 400], [75, 450], [165, 335], [165, 375], [165, 425], [165, 465], [255, 375], [255, 425]], [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [1, 6], [2, 5], [2, 6], [3, 7], [4, 7], [4, 8], [5, 7], [5, 8], [6, 8]])],
      ['DATA ENGINEERING', `${db(400, 362, 56, 70)}${arrow(432, 398, 478, 398)}${db(510, 362, 56, 70)}${arrow(542, 398, 588, 398)}${db(618, 362, 56, 70)}`],
      ['FINAL PROJECT', `${user(775, 465, 1, 'on')}${arrow(800, 440, 846, 400)}<rect class="tx-app" x="850" y="350" width="80" height="60" rx="4"/>${check(890, 380)}`]
    ];
    const pos = i => [40 + (i % 3) * 315, 86 + Math.floor(i / 3) * 210];
    const camp = `<g class="state-layer" data-states="1">
      ${camps.map(([t, inner], i) => hint(`camp-${i}`, t.charAt(0) + t.slice(1).toLowerCase(), '', win(pos(i)[0], pos(i)[1], 290, 195, t, inner))).join('')}
      ${hint('cert', 'A state-recognised certification', '', `<g><rect class="tx-gauge" x="40" y="524" width="920" height="14" rx="3"/><rect class="tx-gauge-on" x="40" y="524" width="920" height="14" rx="3"><animate attributeName="width" values="0;920;920" keyTimes="0;.8;1" dur="10s" repeatCount="indefinite"/></rect>${lab(40, 568, 'ABOUT 450 INTENSIVE HOURS')}${lab(960, 568, 'STATE-RECOGNISED CERTIFICATION', 'end warm')}${sub(960, 590, 'Data Science Developer', 'end')}</g>`)}</g>`;
    const steps = [140, 390, 640, 860];
    const qs = `<g class="state-layer" data-states="2">
      ${hint('q-who', 'A business question', '', `<g>${lab(steps[0], 150, 'BUSINESS QUESTION', 'center')}<path class="tx-bubble" d="M90 180H190V240H130L112 258V240H90Z"/>${text(140, 222, '?', 'tx-big center')}${user(140, 330, 1.2)}</g>`)}
      ${arrow(236, 250, 306, 250)}
      ${hint('q-prob', 'A Data problem', '', `<g>${lab(steps[1], 150, 'DATA PROBLEM', 'center')}<g class="tx-table">${Array.from({ length: 5 }, (_, r) => Array.from({ length: 4 }, (_, c) => `<rect class="${c === 3 ? 'target' : ''}" x="${318 + c * 36}" y="${180 + r * 26}" width="36" height="26"/>`).join('')).join('')}</g>${sub(steps[1], 335, 'A target to predict', 'center')}</g>`)}
      ${arrow(474, 250, 544, 250)}
      ${hint('q-test', 'A tested answer', '', `<g>${lab(steps[2], 150, 'TESTED ANSWER', 'center')}<path class="tx-axis" d="M560 180V320H720"/><path class="tx-spark on" d="M560 320C580 240 620 200 720 186"/><path class="tx-grid" d="M560 320L720 180"/>${sub(steps[2], 345, 'Model, metric, limits', 'center')}</g>`)}
      ${arrow(730, 250, 790, 250)}
      ${hint('q-ship', 'Shipped', '', `<g>${lab(steps[3], 150, 'SHIPPED', 'center')}${win(795, 172, 130, 100, 'APP', spark(810, 208, 100, 50, [.2, .5, .4, .8, .9]))}${user(860, 330, 1.2, 'on')}${sub(steps[3], 352, 'Someone uses it', 'center')}</g>`)}
      ${steps.map(x => arrow(x, 470, x, 390)).join('')}
      ${hint('beneath', 'Beneath every model', '', `<g><path class="tx-pipe" d="M60 500H940"/><path class="tx-pipe-flow" d="M60 500H940"/>${lab(500, 545, 'BENEATH EVERY MODEL: DATA THAT MUST BE RELIABLE', 'center warm')}</g>`)}</g>`;
    const led = `<g class="state-layer" data-states="3">
      <path class="tx-route" d="M60 170H940"/>
      ${hint('led-path', 'From Jedha', '', `<g><circle class="tx-stop" cx="120" cy="170" r="9"/><circle class="tx-stop" cx="370" cy="170" r="9"/>${lab(120, 140, '2019', 'center')}${sub(120, 200, 'Self-taught', 'center')}${lab(370, 140, 'JEDHA', 'center')}${sub(370, 200, 'Certified programme', 'center')}</g>`)}
      ${hint('led-date', 'February 2021', '', `<g><circle class="tx-stage on" cx="700" cy="170" r="15"/>${lab(700, 138, 'FEBRUARY 2021', 'center warm')}${sub(700, 204, 'From operations to a Data team', 'center')}</g>`)}
      ${hint('led-food', 'FoodChéri’s Data team', '', `<g>${lab(40, 280, 'FOODCHÉRI DATA TEAM · WITH REAL USERS', 'strong')}${lab(130, 335, 'INGESTION', 'center')}${db(130, 350, 110, 110)}${arrow(190, 405, 278, 405)}${win(285, 330, 210, 150, 'SQL MODELS', code(301, 378, ['SELECT *', 'FROM raw.orders'], 26))}${arrow(500, 405, 588, 405)}${win(595, 330, 180, 150, 'SELF-SERVICE', bars(611, 366, 148, 96, [.4, .7, .55, .9]))}${arrow(780, 405, 830, 405)}${user(860, 425, 1, 'on')}${user(905, 425, 1, 'on')}${user(950, 425, 1, 'on')}${lab(905, 455, 'USERS', 'center')}</g>`)}
      ${caseChip(40, 540, 420, 'food-data', 'NEXT · FOODCHÉRI DATA', 'A first Data Platform, analysis opened to all')}</g>`;
    return `${ops.opsDefs}${ops.header('SELF-TAUGHT, THEN JEDHA · 2019–2021')}${desk}${camp}${qs}${led}`;
  }

  // ---------- 4.3 · EFREI ----------
  function educationScene() {
    const work = [['FOODCHÉRI', 'Data Platform', 150], ['HEETCH', 'SQL models', 350], ['VERISURE', 'Observability', 550]];
    const production = id => hint(id, 'My production work', '', `<g>${lab(40, 108, 'MY PRODUCTION WORK', 'strong')}${work.map(([t, s, x]) => `${db(x, 124, 96, 62)}${lab(x, 208, t, 'center')}${sub(x, 228, s, 'center')}`).join('')}</g>`);
    const why = `<g class="state-layer" data-states="0">
      ${production('e-work')}
      ${work.map(([, , x]) => `<path class="tx-link" d="M${x} 240V272"/>`).join('')}
      ${hint('e-props', 'What holds it up?', '', `<g><rect class="tx-layer-q" x="40" y="276" width="620" height="84" rx="4"/>${lab(350, 325, 'SOFTWARE FOUNDATIONS ?', 'center warm')}<rect class="tx-layer-q" x="40" y="376" width="620" height="84" rx="4"/>${lab(350, 425, 'SYSTEMS FOUNDATIONS ?', 'center warm')}</g>`)}
      ${arrow(720, 340, 668, 340)}
      ${hint('e-eng', 'Experienced engineers', '', `<g>${user(760, 345)}${user(815, 345)}${user(870, 345)}${user(925, 345)}${lab(842, 300, 'HEETCH ENGINEERS', 'center')}${sub(842, 375, 'Showed me how much rests on it', 'center')}</g>`)}
      ${arrow(842, 395, 842, 470)}
      ${hint('e-torch', 'Most studied at EFREI', '', `<g>${lab(842, 500, 'MOST STUDIED AT EFREI', 'center warm')}${sub(842, 522, 'I enrolled', 'center')}</g>`)}</g>`;
    const yx = y => 190 + (y - 2025) * 250;
    const seg = (i, cls, t, body) => hint(`e-y-${i}`, t, body, `<g><rect class="tx-track ${cls}" x="${yx(2025 + i) + 3}" y="196" width="244" height="46" rx="3"/>${lab(yx(2025 + i) + 125, 224, t, 'center')}</g>`);
    const site = `<g class="state-layer" data-states="1">
      ${[2025, 2026, 2027, 2028].map(y => `<path class="tx-grid" d="M${yx(y)} 150V470"/>${text(yx(y), 140, String(y), 'tx-sub center')}`).join('')}
      ${hint('e-crane', 'EFREI', '', `<g>${lab(40, 218, 'EFREI')}${sub(40, 238, 'Degree')}</g>`)}
      ${seg(0, 'done', 'YEAR 1', '')}${seg(1, 'now', 'YEAR 2 · NOW', '')}${seg(2, 'next', 'YEAR 3', '')}
      ${[0, 1, 2].map(i => `<g>${move('<circle class="tx-alert" r="6"/>', `M${360 + i * 90} 250V400`, 4, i * 1.3)}</g>`).join('')}
      ${hint('e-work2', 'At Verisure, as an apprentice', '', `<g>${lab(596, 330, 'WHAT I LEARN GOES INTO WHAT I BUILD')}</g>`)}
      ${hint('e-app', 'The apprentice', '', `<g>${lab(40, 428, 'VERISURE')}${sub(40, 448, 'Apprentice')}<rect class="tx-track done" x="${yx(2025) + 3}" y="406" width="744" height="46" rx="3"/>${lab(yx(2025) + 375, 434, 'DATA QUALITY AND OBSERVABILITY IN PRODUCTION', 'center')}</g>`)}
      ${hint('e-grad', 'Graduation', '', `<g>${lab(yx(2028), 110, 'GRADUATION EXPECTED', 'end warm')}<path class="tx-promise" d="M${yx(2028)} 118V470"/></g>`)}
      ${sub(40, 534, 'The degree covers')}${['COMPUTER SCIENCE', 'BIG DATA', 'MACHINE LEARNING'].map((t, i) => hint(`e-sub-${i}`, t.charAt(0) + t.slice(1).toLowerCase(), '', `<g>${lab(190 + i * 260, 530, t)}</g>`)).join('')}</g>`;
    const layers = [
      ['ALGORITHMS · PROGRAMMING', 'Write software that holds.', '<path d="M-14-10L-24 0-14 10M14-10L24 0 14 10M6-14L-6 14"/>'],
      ['DATABASES', 'Model and store Data.', '<ellipse cy="-9" rx="16" ry="6"/><path d="M-16-9V9C-16 16 16 16 16 9V-9"/>'],
      ['SYSTEMS · NETWORKS', 'What everything runs on.', '<circle r="4"/><circle cx="-18" cy="-9" r="4"/><circle cx="18" cy="-9" r="4"/><circle cx="0" cy="13" r="4"/><path d="M-15-7L-3-2M15-7L3-2M0 4V9"/>'],
      ['CLOUD', 'Run it at scale.', '<path d="M-14 11C-24 11-24-2-14-2-13-12 3-14 7-5 17-7 21 11 11 11Z"/>'],
      ['BIG DATA', 'Volume and distribution.', '<rect x="-20" y="-10" width="11" height="20"/><rect x="-5" y="-10" width="11" height="20"/><rect x="10" y="-10" width="11" height="20"/>'],
      ['MACHINE LEARNING', 'Learn from Data.', '<circle cx="-16" cy="-8" r="3.5"/><circle cx="-16" cy="8" r="3.5"/><circle cx="16" r="3.5"/><circle r="3.5"/><path d="M-13-7L-3-1M-13 7L-3 1M3 0H13"/>']
    ];
    const ly = i => 584 - i * 68;
    const found = `<g class="state-layer" data-states="2">
      ${hint('e-work3', 'What the foundation carries', '', `<g><rect class="tx-layer top" x="40" y="164" width="920" height="60" rx="4"/>${lab(500, 200, 'WHAT I BUILD IN PRODUCTION', 'center strong')}</g>`)}
      ${layers.map(([t, b, icon], i) => hint(`e-b${i}`, t.charAt(0) + t.slice(1).toLowerCase(), '', `<g><rect class="tx-layer" x="40" y="${ly(i)}" width="920" height="60" rx="4"/><g class="tx-icon" transform="translate(90 ${ly(i) + 30})">${icon}</g>${lab(140, ly(i) + 35, t)}${sub(940, ly(i) + 35, b, 'end')}</g>`)).join('')}
      ${arrow(20, 640, 20, 196)}${lab(40, 128, 'EACH BLOCK CARRIES THE NEXT', 'warm')}</g>`;
    return `${ops.opsDefs}${ops.header('EFREI · ENGINEERING DEGREE · 2025–2028')}${why}${site}${found}`;
  }

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

  // ---------- 5 · How my experience transfers ----------
  function transferScene() {
    const bring = (t, chips) => `<path class="tx-div" d="M40 566H960"/>${lab(40, 600, 'WHAT I BRING', 'strong')}${sub(40, 624, t)}${chips}`;
    const rows = [
      ['tr-cap', 'Freight capacity', 'FREIGHT CAPACITY', 'Two or three years ahead', '<rect x="-16" y="-14" width="32" height="30" rx="2"/><path d="M-16-5H16M-8-20V-10M8-20V-10"/>'],
      ['tr-rec', 'Live recovery', 'LIVE RECOVERY', 'Day and night, trains moving', '<path d="M15-6A16 16 0 1 0 16 6M15-16V-6H5"/>'],
      ['tr-care', 'Passenger care', 'PASSENGER CARE', 'Ligne C, 42 stations', '<circle cy="-11" r="6"/><path d="M-13 16V8A13 11 0 0 1 13 8V16"/>']
    ];
    const rowY = i => 150 + i * 120;
    const net = `<g class="state-layer" data-states="0">
      ${lab(40, 92, 'THE SNCF NETWORK, LIVE', 'strong')}
            ${hint('tr-net', 'A moving system', '', `<g><g transform="translate(-40 40) scale(.82)">${france.map}${[['Paris', 'Dijon', 'Lyon', 'Marseille'], ['Lille', 'Paris', 'Rennes', 'Nantes', 'Bordeaux'], ['Bordeaux', 'Lyon']].map((r, i) => move('<circle class="tx-alert" r="7"/>', france.route(r), 14 + i * 3, i * 3)).join('')}<circle class="tx-ping" cx="${france.mid('Dijon', 'Lyon')[0]}" cy="${france.mid('Dijon', 'Lyon')[1]}" r="20"/></g>${[['Paris', 12, -8], ['Lyon', 12, 16], ['Bordeaux', -68, 18], ['Marseille', -30, 26], ['Lille', 12, 0]].map(([c, dx, dy]) => { const [x, y] = france.at(c); return `<circle class="tx-stop" cx="${(x * .82 - 40).toFixed(1)}" cy="${(y * .82 + 40).toFixed(1)}" r="4"/>${sub((x * .82 - 40 + dx).toFixed(1), (y * .82 + 40 + dy).toFixed(1), c)}`; }).join('')}</g>`)}
      ${rows.map(([id, title, t, s, icon], i) => `${arrow(462, 300, 500, rowY(i))}${hint(id, title, '', `<g><circle class="tx-stage" cx="545" cy="${rowY(i)}" r="38"/><g class="tx-icon" transform="translate(545 ${rowY(i)})">${icon}</g>${lab(598, rowY(i) - 4, t)}${sub(598, rowY(i) + 18, s)}</g>`)}${arrow(792, rowY(i), 866, rowY(i))}`).join('')}
      ${hint('tr-people', 'The people acting', '', `<g>${lab(905, 96, 'PEOPLE', 'center')}${lab(905, 114, 'ACTING', 'center')}${[0, 1, 2].map(i => user(905, rowY(i) + 18, 1, 'on')).join('')}</g>`)}
      ${bring('Decisions inside moving systems, that reach the people acting.', caseChip(560, 578, 400, 'rail', 'EARTH · SNCF', 'The proof, where it lives'))}</g>`;
    const hub = [500, 270], ringR = 130;
    const onRing = deg => [hub[0] + ringR * Math.cos(deg * Math.PI / 180), hub[1] + ringR * Math.sin(deg * Math.PI / 180)].map(v => +v.toFixed(1));
    const draw = (d, i) => `<path class="tx-draw" style="--i:${i}" pathLength="1" d="${d}"/>`;
    const teams = [
      ['OPERATIONS', 40, 110, 200, draw('M58 210L90 180 122 195 154 160 186 170 222 148', 0)],
      ['SUPPLY', 40, 250, 160, bars(58, 288, 164, 70, [.5, .8, .35, .9, .6, .75])],
      ['MARKETING', 40, 390, 160, `<circle class="tx-donut" cx="140" cy="466" r="30"/><circle class="tx-donut on" style="--i:2" pathLength="100" cx="140" cy="466" r="30"/>`],
      ['FINANCE', 760, 110, 160, `<path class="tx-axis" d="M778 148V212H942"/>${draw('M778 200L815 188 852 192 889 165 942 152', 3)}`],
      ['CUSTOMER CARE', 760, 250, 200, `<g class="tx-rows">${[0, 1, 2, 3].map(i => `<path d="M778 ${292 + i * 18}H${[900, 870, 915, 840][i]}"/><circle cx="932" cy="${292 + i * 18}" r="4"/>`).join('')}</g>`],
      ['PRODUCT', 760, 390, 180, `<g class="tx-graph">${[[790, 480], [815, 455], [842, 470], [860, 440], [890, 448], [915, 428], [935, 436]].map(([x, y], i) => `<circle style="--i:${i}" cx="${x}" cy="${y}" r="5"/>`).join('')}</g>`]
    ];
    const spokes = [[200, 243, 170], [180, 243, 310], [160, 243, 450], [-20, 757, 170], [0, 757, 310], [20, 757, 450]];
    const enablers = [
      ['tr-tool', 'Tool choice', 'TOOL CHOICE', -90, 0, -34, '<rect x="-12" y="-11" width="24" height="18" rx="2"/><path d="M-6 3V-2M0 3V-6M6 3V-3M-5 12H5"/>'],
      ['tr-train', 'Training', 'TRAINING', 125, 0, 42, '<path d="M-14-4L0-10 14-4 0 2ZM-8 0V6C-4 10 4 10 8 6V0"/>'],
      ['tr-support', 'Support', 'SUPPORT', 55, 0, 42, '<path d="M-11 2V-1A11 11 0 0 1 11-1V2M-13 2H-8V10H-13ZM8 2H13V10H8Z"/>']
    ];
    const access = `<g class="state-layer" data-states="1">
      ${lab(40, 92, 'FOODCHÉRI · ONE PLATFORM, EVERY TEAM', 'strong')}
      <circle class="tx-ring" cx="${hub[0]}" cy="${hub[1]}" r="${ringR}"/>
      ${spokes.map(([deg, x, y]) => { const [sx, sy] = onRing(deg); return arrow(sx, sy, x, y); }).join('')}
      ${hint('tr-plat', 'The first Data Platform', '', `<g>${lab(500, 192, 'DATA PLATFORM', 'center strong')}${db(500, 204, 130, 118)}${sub(500, 344, 'The first one', 'center')}</g>`)}
      ${enablers.map(([id, title, t, deg, dx, dy, icon]) => { const [x, y] = onRing(deg); return hint(id, title, '', `<g><circle class="tx-stage" cx="${x}" cy="${y}" r="23"/><g class="tx-icon" transform="translate(${x} ${y})">${icon}</g>${lab(x + dx, y + dy + 5, t, 'center')}</g>`); }).join('')}
      ${teams.map(([t, x, y, h, chart], i) => hint(`tr-team-${i}`, t.charAt(0) + t.slice(1).toLowerCase(), '', win(x, y, 200, Math.min(h, 120), t, chart))).join('')}
      ${hint('tr-users', 'People building analyses', '', `<g>${Array.from({ length: 25 }, (_, i) => user(284 + i * 18, 472, .5, i < 2 ? 'on' : 'tx-lit-seq', `--i:${i}`)).join('')}${lab(500, 500, 'ACTIVE ANALYSIS PRODUCERS', 'center')}${text(500, 544, '2 → 25', 'tx-big center')}</g>`)}
      ${bring('Capabilities other people can use.', caseChip(560, 578, 400, 'food-data', 'EARTH · FOODCHÉRI DATA', 'The proof, where it lives'))}</g>`;
    const beneath = `<g class="state-layer" data-states="2">
      ${hint('tr-answer', 'The visible answer', '', `<g>${win(390, 76, 220, 104, 'THE VISIBLE ANSWER', bars(406, 108, 188, 62, [.4, .7, .5, .9, .65, .8]))}${user(655, 180, 1, 'on')}</g>`)}
      <path class="tx-route" d="M40 188H960"/>
      ${lab(40, 222, 'BENEATH THE VISIBLE ANSWER', 'strong')}
      ${arrow(250, 262, 400, 196)}${arrow(740, 262, 600, 196)}
      ${lab(40, 254, 'HEETCH')}${lab(520, 254, 'VERISURE')}
      ${hint('tr-logic', 'Transformation logic', '', win(40, 266, 270, 280, 'TRANSFORMATION LOGIC', graph([[75, 340], [75, 410], [75, 480], [175, 370], [175, 450], [275, 410]], [[0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]])))}
      ${hint('tr-tests', 'Tests', '', `<g>${lab(330, 300, 'TESTS')}${check(342, 326)}${check(372, 326)}${check(402, 326, false)}</g>`)}
      ${hint('tr-orch', 'Orchestration', '', `<g>${lab(330, 400, 'ORCHESTRATION')}<path class="tx-axis" d="M330 430H480"/>${[0, 1, 2, 3].map(i => `<path class="tx-tick" d="M${340 + i * 44} 423V437"/>`).join('')}${move('<circle class="tx-alert" r="6"/>', 'M335 430H475', 5, 0)}</g>`)}
      ${hint('tr-monitor', 'Shared monitoring', '', win(520, 266, 440, 150, 'A SHARED WAY TO MONITOR DATA HEALTH', `<path class="tx-axis" d="M540 306V400H940"/>${spark(540, 306, 400, 90, [.5, .55, .4, .6, .35, .6, .7, .65, .75, .8, .78, .85], 'on')}`))}
      ${hint('tr-qualify', 'Qualifying alerts', '', `<g>${lab(520, 452, 'QUALIFY')}${['HIGH', 'MEDIUM', 'LOW'].map((t, i) => `<circle class="${i === 0 ? 'tx-alert' : 'tx-stop'}" cx="${530 + i * 150}" cy="490" r="7"/>${lab(546 + i * 150, 495, t)}`).join('')}</g>`)}
      ${bring('The engineering beneath reliable information.', `${caseChip(560, 578, 195, 'heetch', 'HEETCH', 'The proof')}${caseChip(765, 578, 195, 'verisure', 'VERISURE', 'The proof')}`)}</g>`;
    const cx = [130, 350, 590, 810];
    const items = [
      ['GENERATE', '<g transform="scale(1.1)"><rect x="-9" y="-7" width="18" height="14" rx="2"/><path d="M-9 0H-32M9 0H32"/><rect x="-44" y="-7" width="14" height="14"/><rect x="30" y="-7" width="14" height="14"/></g>'],
      ['MOVE', '<path d="M-22-14A24 24 0 0 0 16 22ZM-3 3L12-14M-3 3L-6 26H10"/>'],
      ['PROCESS', '<rect x="-30" y="-24" width="60" height="16" rx="2"/><rect x="-30" y="-4" width="60" height="16" rx="2"/><rect x="-30" y="16" width="60" height="16" rx="2"/>'],
      ['USE', '<rect x="-30" y="-24" width="60" height="42" rx="3"/><path d="M-20 8L-8-6 4 2 20-14M-12 30H12M0 18V30"/>']
    ];
    const next = `<g class="state-layer" data-states="3">
      ${lab(40, 92, 'A SPACE SYSTEM, AND WHAT I WOULD PLUG INTO IT', 'strong')}
      ${items.map(([t, icon], i) => hint(`col-${i}`, t.charAt(0) + t.slice(1).toLowerCase(), '', `<g><circle class="tx-stage" cx="${cx[i]}" cy="186" r="48"/><g class="tx-icon" transform="translate(${cx[i]} 186)">${icon}</g>${lab(cx[i], 126, t, 'center')}</g>`)).join('')}
      ${[0, 1, 2].map(i => arrow(cx[i] + 54, 186, cx[i + 1] - 56, 186)).join('')}
      ${hint('mx-3', 'Still learning', '', `<g><path class="tx-promise dashed" d="M${cx[0]} 240V262H${cx[1]}V240"/>${lab(240, 292, 'TO LEARN · EFREI', 'center warm')}${sub(240, 314, 'Not prior space experience', 'center')}</g>`)}
      ${hint('mx-2', 'Engineering under the answer', '', `<g>${arrow(cx[2], 276, cx[2], 240)}${lab(cx[2], 300, 'HEETCH · VERISURE', 'center')}${sub(cx[2], 322, 'Transformation, tests, monitoring', 'center')}</g>`)}
      ${hint('mx-1', 'Capabilities others can use', '', `<g>${arrow(cx[3], 276, cx[3], 240)}${lab(cx[3], 300, 'FOODCHÉRI', 'center')}${sub(cx[3], 322, 'Access, training, support', 'center')}</g>`)}
      ${hint('col-4', 'Operate', '', `<g><path class="tx-operate" d="M60 372H940V416H60Z"/>${lab(500, 399, 'OPERATE: THE WHOLE SYSTEM, LIVE', 'center')}</g>`)}
      ${hint('mx-0', 'Decisions inside moving systems', '', `<g>${arrow(500, 458, 500, 422)}${lab(500, 482, 'SNCF', 'center')}${sub(500, 504, 'Decisions while the system runs', 'center')}</g>`)}
      <path class="tx-div" d="M40 566H960"/>${lab(40, 600, 'FOR EUROPE’S TECHNOLOGICAL SOVEREIGNTY', 'warm')}
      ${caseChip(560, 578, 400, 'study-efrei', 'GALILEO · EFREI', 'What I am learning')}</g>`;
    return `${ops.opsDefs}${ops.header('WHAT I BRING · FROM MY WORK TO EUROPEAN SPACE')}${net}${access}${beneath}${next}`;
  }

  return { needScene, stackScene, logisticsScene, learningScene, educationScene, spaceLayers, transferScene };
}
