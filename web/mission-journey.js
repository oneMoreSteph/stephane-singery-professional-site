import * as THREE from 'three';
import { OBJLoader } from './vendor/three/loaders/OBJLoader.js';
import { cases } from './mission-atlas-cases.js?v=20261105-v131';
import { renderCaseExperience } from './mission-case-art.js?v=20261105-v131';
import { renderCareerTimeline, renderStudyOrbit, renderTrackView, renderOrbitView } from './career-visuals.js?v=20261105-v131';

const body = document.body;
const experience = document.querySelector('.experience');
const cockpit = document.getElementById('cockpit');
const map = document.getElementById('map');
const chapter = document.getElementById('chapter');
const canvas = document.getElementById('world-canvas');
const detail = document.getElementById('detail-overlay');
const viewHost = document.getElementById('track-overlay');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const nodeButtons = Object.fromEntries([...document.querySelectorAll('.destination-node')].map(el => [el.dataset.destination, el]));
const mapPose = { position: new THREE.Vector3(0, 0, 14.8), look: new THREE.Vector3(0, 0, 0) };

const destinations = {
  earth: { number: '01 / EARTH', name: 'Earth', heading: 'Professional experience', preview: 'Start here. Seven roles since 2010 on one timeline: rail operations at SNCF, then Data at FoodChéri, Heetch and Verisure.', action: 'VIEW EXPERIENCE', coordinate: '01 / PROFESSIONAL EXPERIENCE', eyebrow: 'WHERE AND WHEN', title: 'Professional<br><em>experience.</em>', intro: 'From keeping freight trains running to building the Data systems behind decisions: seven experiences, in order.', next: 'iss', hardware: 'EARTH', position: new THREE.Vector3(0, 0, 0), camera: new THREE.Vector3(1.8, .2, 7.1), look: new THREE.Vector3(1.9, 0, 0), items: [
    { key: 'vfli', logo: 'assets/sncf-logo.svg', tag: 'SNCF · VFLI · 2010–2012', title: 'Rail Resources Manager · Production Department', summary: 'Keeping freight trains moving, day and night.' },
    { key: 'rail', logo: 'assets/sncf-logo.svg', tag: 'SNCF RÉSEAU · 2012–2016', title: 'Rail Capacity Consultation Officer', summary: 'Securing freight customers’ capacity, two or three years ahead.' },
    { key: 'ligne-c', logo: 'assets/sncf-logo.svg', tag: 'SNCF · TRANSILIEN LIGNE C · NOV 2016–AUG 2019', title: 'Passenger Care and Information Manager', summary: 'Passenger-care plans for 42 stations, and the first way to measure them.' },
    { key: 'hubs', logo: 'assets/foodcheri-logo.svg', tag: 'FOODCHÉRI · 2016–2019 · EVENINGS AND WEEKENDS', title: 'Hub Manager', summary: 'Six Paris delivery hubs, my door into a tech company.' },
    { key: 'food-data', logo: 'assets/foodcheri-logo.svg', tag: 'FOODCHÉRI / SEAZON · FEB 2021–AUG 2022', title: 'BI Engineer / Data Product Owner', summary: 'A first Data Platform, and analysis opened to the whole company.' },
    { key: 'heetch', logo: 'assets/heetch-logo.svg', tag: 'HEETCH · AUG 2022–AUG 2025', title: 'Data Engineer', summary: 'The transformation core of a near-real-time Data Platform.' },
    { key: 'verisure', logo: 'assets/verisure-logo.png', tag: 'VERISURE · APPRENTICESHIP WITH EFREI · 2025–PRESENT', title: 'Analytics Engineer', summary: 'From a request for Data tests to a Data Quality and Observability platform.' }
  ] },
  iss: { number: '02 / ISS · COLUMBUS', name: 'ISS / Columbus', heading: 'High-stakes case studies', preview: 'Four situations where a decision had consequences: one afternoon, five years of race stages, a six-week deadline, an alert that was right and still noise.', action: 'VIEW CASE STUDIES', coordinate: '02 / HIGH-STAKES CASE STUDIES', eyebrow: 'UNDER PRESSURE', title: 'High-stakes<br><em>case studies.</em>', intro: 'Four situations, four shapes: one afternoon, five years of race stages, a six-week deadline and an alert that was right and still noise.', next: 'sentinel', hardware: 'ISS / COLUMBUS', position: new THREE.Vector3(-3.4, 1.65, .6), camera: new THREE.Vector3(-2.1, 1.8, 4.9), look: new THREE.Vector3(-2.65, 1.65, .6), items: [
    { key: 'toyota', logo: 'assets/sncf-logo.svg', tag: 'SNCF RÉSEAU · FREIGHT', title: 'Toyota Europe: a network response in one afternoon', summary: 'Weeks of disruption, many constraints: I coordinated several regional teams to a solution in under a day.' },
    { key: 'tour', logo: 'assets/sncf-logo.svg', tag: 'SNCF RÉSEAU · NATIONAL EVENT', title: 'Tour de France: five years of rail coordination', summary: 'Align changing race stages, level crossings and live regional rail regulation.' },
    { key: 'food-deadline', logo: 'assets/foodcheri-logo.svg', tag: 'FOODCHÉRI · SIX WEEKS', title: 'Six weeks, 600 dashboards', summary: 'The licence was ending: I rebuilt only what the company could not run without.' },
    { key: 'signal', logo: 'assets/verisure-logo.png', tag: 'VERISURE · DATA QUALITY & OBSERVABILITY', title: 'Signal or noise', summary: 'Governed overrides: harmless alerts stop flooding the teams, nothing is silenced for good.' }
  ] },
  sentinel: { number: '03 / SENTINEL-6', name: 'Sentinel-6', heading: 'What makes the difference', preview: 'Three habits that run through every role: find a way, the need behind the need, build for production.', action: 'VIEW WHAT I BRING', coordinate: '03 / WHAT MAKES THE DIFFERENCE', eyebrow: 'ACROSS EVERY ROLE', title: 'What makes<br><em>the difference.</em>', intro: 'Three habits, from rail operations to Data: find a way, look for the need behind the need, and build for production.', next: 'galileo', hardware: 'SENTINEL-6', position: new THREE.Vector3(3.45, 1.7, .45), camera: new THREE.Vector3(4.8, 1.85, 4.8), look: new THREE.Vector3(4.15, 1.7, .45), items: [
    { key: 'find-a-way', icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="ic-muted" d="M4 34h14"/><rect class="ic-wall" x="20" y="24" width="5" height="18" rx="1"/><path d="M4 34h8c6 0 6-22 14-22h18"/><circle class="ic-fill" cx="42" cy="12" r="3.5"/></svg>', tag: 'VFLI · SNCF RÉSEAU · TOUR DE FRANCE · FOODCHÉRI', title: 'Find a way', summary: 'Whatever the constraint, obtain what the operation needs.' },
    { key: 'need-behind', icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M17 20l7-12 7 12z"/><path class="ic-muted" d="M4 22c4-2 6 2 10 0s6 2 10 0 6 2 10 0 6 2 10 0"/><path class="ic-fill-soft" d="M12 26h24l-6 16H18z"/></svg>', tag: 'FOODCHÉRI · LIGNE C · VERISURE', title: 'The need behind the need', summary: 'Go past the request to the problem, then solve that problem.' },
    { key: 'data-system', icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="ic-fill-soft" d="M24 6l18 8-18 8-18-8z"/><path d="M6 22l18 8 18-8"/><path d="M6 30l18 8 18-8"/></svg>', tag: 'FOODCHÉRI · HEETCH · VERISURE', title: 'Build for production', summary: 'One Data system, three layers: access, transformation, observability.' }
  ] },
  galileo: { number: '04 / GALILEO', name: 'Galileo', heading: 'Education and development', preview: 'Three study periods: logistics and transport, self-taught Data then a certified programme, an engineering degree at EFREI.', action: 'VIEW EDUCATION', coordinate: '04 / EDUCATION AND DEVELOPMENT', eyebrow: 'HOW I LEARNED', title: 'Education and<br><em>development.</em>', intro: 'Three study periods drawn as orbits, each with what it taught me and where it led.', next: 'juice', hardware: 'GALILEO', position: new THREE.Vector3(3.6, -1.6, -.35), camera: new THREE.Vector3(4.9, -1.45, 4.0), look: new THREE.Vector3(4.48, -1.6, -.35), items: [
    { key: 'study-logistics', symbol: '01', tag: 'IUT DE CHARTRES · 2008–2010', title: 'Logistics and transport', summary: 'Thinking in flows: a promise to keep, resources to secure, constraints to work around.' },
    { key: 'study-data', symbol: '02', tag: '2019–2021', title: 'Self-taught in Data, then a Data Science Developer programme', summary: 'Self-taught, then a certified programme: the method that took me into a Data team.' },
    { key: 'study-efrei', symbol: '03', tag: 'EFREI · 2025–2028 EXPECTED', title: 'Engineering degree in Computer Science, Big Data & Machine Learning', summary: 'Formal foundations under my production work. Year 2 of 3, as an apprentice at Verisure.' }
  ] },
  juice: { number: '05 / JUICE', name: 'Juice', heading: 'Why European space', preview: 'The next step: why European space, and how this experience transfers to it.', action: 'VIEW SPACE GOAL', coordinate: '05 / EUROPEAN SPACE GOAL', eyebrow: 'WHY SPACE · WHAT I BRING', title: 'Why European<br><em>space.</em>', intro: 'Where the interest comes from, the systems I want to work on, and how my experience maps onto them.', next: 'earth', hardware: 'JUICE', position: new THREE.Vector3(-3.55, -1.75, -.6), camera: new THREE.Vector3(-2.2, -1.6, 3.8), look: new THREE.Vector3(-2.65, -1.75, -.6), items: [
    { key: 'horizon', symbol: '✦', tag: 'MY CAREER GOAL', title: 'European space ambition', summary: 'Why I want to contribute to Europe’s technological sovereignty.' },
    { key: 'transfer', symbol: '↗', tag: 'THE PRESENT EVIDENCE', title: 'How my experience transfers', summary: 'Operational coordination, Data transformation and observability, demonstrated outside the space sector.' }
  ] }
};

const destinationVisuals = {
  iss: { image: 'assets/nasa/iss-photograph.jpg', alt: 'The International Space Station photographed in orbit, with its modules and solar arrays visible', credit: 'ISS photograph: NASA' },
  sentinel: { image: 'assets/nasa/sentinel-6-render.png', alt: 'Detailed Sentinel-6 spacecraft rendering showing the satellite bus, instruments and solar array', credit: 'Sentinel-6 rendering: NASA' },
  galileo: { image: 'assets/esa/galileo/galileo-in-orbit.jpg', alt: 'ESA rendering of a Galileo navigation satellite above Europe', credit: 'Galileo rendering: ESA / P. Carril' },
  juice: { image: 'assets/esa/juice/juice-deployed.jpg', alt: 'ESA rendering of the Juice spacecraft with its deployed solar arrays and antennas', credit: 'Juice rendering: ESA / ATG Medialab' }
};

const hardwareFacts = {
  earth: {
    title: 'Why Earth opens professional experience',
    url: 'https://svs.gsfc.nasa.gov/2915',
    beats: [
      ['THE PLANET', 'Where every system ran.', 'Rail networks, delivery hubs and Data platforms: every role on this site took place on the ground, inside systems people relied on that day.'],
      ['WHY IT OPENS THIS CHAPTER', 'The ground truth comes first.', 'Before any orbit, the record: who I worked for, when, and what overlapped.']
    ]
  },
  iss: {
    title: 'Why ISS / Columbus opens high-stakes cases',
    url: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Columbus/Columbus_laboratory',
    beats: [
      ['THE SPACECRAFT', 'Europe’s laboratory on the station.', 'Columbus is ESA’s research module on the International Space Station, attached in February 2008. A control centre in Oberpfaffenhofen, Germany, runs it day and night with the crew on board.'],
      ['WHY IT OPENS THIS CHAPTER', 'Live operations, real consequences.', 'Crew and ground teams decide together while the station keeps moving. The cases in this chapter share that shape.']
    ]
  },
  sentinel: {
    title: 'Why Sentinel-6 opens what makes the difference',
    url: 'https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-6/Facts_and_figures',
    beats: [
      ['THE SPACECRAFT', 'A reference measurement of the sea.', 'Sentinel-6 Michael Freilich, launched in November 2020 for Copernicus, measures sea-surface height by radar altimetry. It extends a reference record that began in 1992.'],
      ['WHY IT OPENS THIS CHAPTER', 'A record others build on.', 'A record that long holds only if every measurement does its job. The habits in this chapter are what make my work hold.']
    ]
  },
  galileo: {
    title: 'Why Galileo opens education',
    url: 'https://gssc.esa.int/education/galileo3d/',
    beats: [
      ['THE SPACECRAFT', 'A constellation built launch by launch.', 'Galileo is Europe’s global navigation satellite system. Its first operational satellites launched in 2011, and initial services began in 2016 while the constellation kept growing.'],
      ['WHY IT OPENS THIS CHAPTER', 'Capability added in steps.', 'Each launch widened what the system could do. Each study period here did the same for me.']
    ]
  },
  juice: {
    title: 'Why Juice opens my European space goal',
    url: 'https://juicesoc.esac.esa.int/help/82_spacecraft_model.html',
    beats: [
      ['THE SPACECRAFT', 'A long road to Jupiter.', 'ESA’s Jupiter Icy Moons Explorer launched in April 2023. After flybys of the Earth, the Moon and Venus, it is due at Jupiter in 2031 to study Ganymede, Callisto and Europa.'],
      ['WHY IT OPENS THIS CHAPTER', 'A destination worth a long trajectory.', 'Juice reaches its goal through a sequence of planned steps. This chapter is about mine.']
    ]
  }
};


let renderer, scene, camera, earth, atmosphere, sun, globeHover, frameId;
let activeScene = 'cockpit', activeDestination = 'earth', previewDestination = 'earth', activeCase = null;
let worldReady = false, worldPromise, cameraMove = null, globeMove = null, currentLook = mapPose.look.clone();
const europePose = { rotationY: -1.74, tiltX: .82 };
let pointerX = 0, pointerY = 0, globeDrag = null, suppressClick = false, globeAngle = europePose.rotationY, globeTilt = europePose.tiltX;
let lastDetailTrigger = null, lastMapTrigger = null, detailHasHistoryEntry = false;
let activeView = null, viewHandle = null, viewHasHistoryEntry = false, lastViewTrigger = null;
let returnTrip = null;
const devices = {};
const orbitLines = [];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clock = new THREE.Clock();

function setScene(next) {
  activeScene = next;
  body.dataset.scene = next;
  experience.scrollTop = 0;
  cockpit.inert = next !== 'cockpit';
  map.inert = next !== 'map';
  chapter.inert = next !== 'chapter' || !detail.hidden || !!activeView;
  for (const [id, device] of Object.entries(devices)) device.anchor.visible = next === 'map' || (next === 'approaching' && id === activeDestination) || (next === 'chapter' && id === 'earth');
  for (const line of orbitLines) line.visible = next === 'map';
}

function historyFor(id, caseKey = null, replace = false) {
  const params = new URLSearchParams();
  if (activeView && id !== 'cockpit' && id !== 'map') params.set('view', activeView);
  if (caseKey) params.set('case', caseKey);
  const query = params.toString();
  const hash = id === 'cockpit' ? '#cockpit' : id === 'map' ? '#map' : `#${id}${query ? `?${query}` : ''}`;
  history[replace ? 'replaceState' : 'pushState']({ id, caseKey, view: activeView }, '', hash);
}

function detailContent(title, category, beats, caseKey = null, url = null, takeaway = '') {
  document.getElementById('detail-category').textContent = category;
  document.getElementById('detail-title').textContent = title;
  const detailLogo = document.getElementById('detail-logo');
  const logo = caseKey && Object.values(destinations).flatMap(destination => destination.items).find(entry => entry.key === caseKey)?.logo;
  detailLogo.hidden = !logo;
  if (logo) detailLogo.src = logo;
  document.getElementById('detail-eyebrow').textContent = caseKey ? 'INSIDE THE WORK' : 'EXPLORE THE DESTINATION';
  const lede = document.getElementById('detail-lede');
  lede.textContent = takeaway;
  lede.hidden = !takeaway;
  const experience = caseKey ? renderCaseExperience(caseKey, beats) : null;
  detail.querySelector('.detail-panel').classList.toggle('detail-panel--experience', !!experience);
  const beatContainer = document.getElementById('detail-beats');
  if (experience) beatContainer.replaceChildren(experience);
  else beatContainer.replaceChildren(...beats.map(([label, heading, text]) => {
    const item = document.createElement('section'); item.className = 'detail-beat';
    const copy = document.createElement('div'); copy.className = 'detail-beat__copy';
    const kicker = document.createElement('small'); kicker.textContent = label;
    const h = document.createElement('h3'); h.textContent = heading;
    const p = document.createElement('ul'); p.className = 'bullets';
    (Array.isArray(text) ? text : text.split(/(?<=[.!?])\s+(?=[A-Z0-9À-Ý‘“])/)).forEach(line => { const li = document.createElement('li'); li.textContent = line; p.append(li); });
    copy.append(kicker, h, p); item.append(copy); return item;
  }));
  const sourceNode = document.getElementById('detail-source');
  sourceNode.replaceChildren();
  sourceNode.hidden = !url;
  if (url) { const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Spacecraft information ↗'; sourceNode.append(a); }
  detail.hidden = false;
  detail.querySelector('.detail-panel').scrollTop = 0;
  chapter.inert = true;
  viewHost.inert = true;
  document.getElementById('detail-close').focus({ preventScroll: true });
}

function openCase(key, trigger, withHistory = true) {
  const item = cases[key]; if (!item) return;
  lastDetailTrigger = trigger || document.getElementById('chapter-title');
  activeCase = key;
  detailHasHistoryEntry = withHistory;
  const title = trigger?.querySelector?.('strong')?.textContent || Object.values(destinations).flatMap(destination => destination.items).find(entry => entry.key === key)?.title || ({ transfer: 'How my experience transfers', 'data-system': 'The layer each Data role changed' }[key] || key);
  detailContent(title, item.category, item.beats, key, null, item.takeaway);
  if (withHistory) historyFor(activeDestination, key);
}

function openHardware(trigger, withHistory = true) {
  const item = hardwareFacts[activeDestination]; if (!item) return;
  lastDetailTrigger = trigger;
  activeCase = `hardware-${activeDestination}`;
  detailHasHistoryEntry = withHistory;
  detailContent(item.title, destinations[activeDestination].hardware, item.beats, null, item.url);
  if (withHistory) historyFor(activeDestination, activeCase);
}

function closeDetail(withHistory = true) {
  if (detail.hidden) return;
  const trip = withHistory && returnTrip && returnTrip.linked === activeCase ? returnTrip : null;
  if (trip) {
    returnTrip = null;
    detail.hidden = true; activeCase = null; viewHost.inert = false; detailHasHistoryEntry = false;
    approach(trip.dest).then(() => { if (trip.caseKey) restoreFromHash(null, trip.caseKey, true); });
    return;
  }
  const returnThroughHistory = withHistory && detailHasHistoryEntry;
  detail.hidden = true; activeCase = null; chapter.inert = activeScene !== 'chapter' || !!activeView; viewHost.inert = false;
  detailHasHistoryEntry = false;
  if (returnThroughHistory) history.back();
  else if (withHistory) historyFor(activeDestination, null, true);
  lastDetailTrigger?.focus?.({ preventScroll: true });
}

// A case lives in one chapter. Elsewhere its card or timeline entry travels to that chapter instead of repeating it.
const caseHome = { vfli: 'earth', signal: 'iss', rail: 'earth', hubs: 'earth', toyota: 'iss', tour: 'iss', 'ligne-c': 'earth', 'food-deadline': 'iss', 'food-data': 'earth', heetch: 'earth', verisure: 'earth', 'data-system': 'sentinel', 'find-a-way': 'sentinel', 'need-behind': 'sentinel', 'study-logistics': 'galileo', 'study-data': 'galileo', 'study-efrei': 'galileo' };
const awayFrom = (key, id = activeDestination) => caseHome[key] && caseHome[key] !== id ? caseHome[key] : null;
function openCaseFrom(key, trigger, origin = { dest: activeDestination, caseKey: activeCase }) {
  const home = awayFrom(key);
  if (!home) { openCase(key, trigger); return; }
  returnTrip = { ...origin, linked: key };
  closeView(false);
  approach(home).then(() => restoreFromHash(null, key, true));
}

// Wide instrument views open over the globe; a case opened from one returns to it when closed.
const instruments = { earth: ['track', renderTrackView], galileo: ['orbit', renderOrbitView] };
function openView(kind, selected = null, trigger = null, withHistory = true) {
  const entry = Object.values(instruments).find(([name]) => name === kind);
  if (!entry || instruments[activeDestination]?.[0] !== kind) return;
  if (activeView === kind) { if (selected) viewHandle.select(selected); return; }
  lastViewTrigger = trigger || document.querySelector('.chapter-reading .cv-expand');
  activeView = kind;
  viewHasHistoryEntry = withHistory;
  viewHandle = entry[1]({ selected, onOpen: (key, button) => openCaseFrom(key, button), onClose: () => closeView(), openLabel: key => awayFrom(key) ? `OPEN IN ${destinations[awayFrom(key)].name.toUpperCase()}` : 'OPEN THE CASE' });
  viewHost.replaceChildren(viewHandle.root);
  viewHost.hidden = false;
  chapter.inert = true;
  if (withHistory) historyFor(activeDestination);
  viewHandle.focus();
}

function closeView(withHistory = true) {
  if (!activeView) return;
  const returnThroughHistory = withHistory && viewHasHistoryEntry;
  activeView = null; viewHandle = null; viewHasHistoryEntry = false;
  viewHost.hidden = true; viewHost.replaceChildren();
  chapter.inert = activeScene !== 'chapter' || !detail.hidden;
  if (returnThroughHistory) history.back();
  else if (withHistory) historyFor(activeDestination, null, true);
  lastViewTrigger?.focus?.({ preventScroll: true });
}

function renderChapter(id) {
  closeView(false);
  const data = destinations[id];
  chapter.dataset.destination = id;
  const visual = destinationVisuals[id];
  const figure = document.getElementById('chapter-visual');
  figure.hidden = !visual;
  if (visual) {
    const image = document.getElementById('chapter-visual-image');
    image.src = visual.image;
    image.alt = visual.alt;
    document.getElementById('chapter-visual-credit').textContent = visual.credit;
  }
  const steps = document.getElementById('chapter-route'), here = route.indexOf(id);
  steps.replaceChildren(...route.map((stop, i) => {
    const step = document.createElement('button'); step.type = 'button'; step.className = 'route-step';
    step.classList.toggle('is-reached', i <= here);
    step.setAttribute('aria-label', `Stop ${i + 1} of ${route.length}: ${destinations[stop].heading}`);
    step.innerHTML = `<i aria-hidden="true"></i><span>${String(i + 1).padStart(2, '0')}${i === here ? ` · ${destinations[stop].heading.toUpperCase()}` : ''}</span>`;
    if (i === here) step.setAttribute('aria-current', 'step'); else step.addEventListener('click', () => approach(stop));
    return step;
  }));
  document.getElementById('chapter-eyebrow').textContent = data.eyebrow;
  document.getElementById('chapter-title').innerHTML = data.title;
  document.getElementById('chapter-intro').textContent = data.intro;
  
  document.getElementById('hardware-kicker').textContent = data.hardware;
  const nextIndex = route.indexOf(data.next);
  document.getElementById('next-destination').textContent = nextIndex === 0 ? `BACK TO STOP 1 · ${destinations[data.next].heading.toUpperCase()}  ↺` : `NEXT STOP ${nextIndex + 1} · ${destinations[data.next].heading.toUpperCase()}  →`;
  const field = document.getElementById('chapter-items'); field.replaceChildren();
  document.querySelector('.chapter-reading .career-visual')?.remove();
  const instrument = { earth: renderCareerTimeline, galileo: renderStudyOrbit }[id];
  if (instrument) field.before(instrument((key, trigger) => openView(instruments[id][0], key, trigger)));
  data.items.forEach(item => {
    const button = document.createElement('button'); button.className = 'chapter-item'; button.type = 'button'; button.dataset.case = item.key;
    const icon = document.createElement('span'); icon.className = 'item-logo';
    if (item.logo) { const img = document.createElement('img'); img.src = item.logo; img.alt = ''; icon.append(img); }
    else if (item.icon) { icon.classList.add('item-logo--icon'); icon.innerHTML = item.icon; }
    else { const symbol = document.createElement('span'); symbol.className = 'item-symbol'; symbol.textContent = item.symbol || '✦'; icon.append(symbol); }
    const copy = document.createElement('span'); copy.className = 'item-copy';
    const tag = document.createElement('small'); tag.textContent = item.tag;
    const title = document.createElement('strong'); title.textContent = item.title;
    const summary = document.createElement('em'); summary.textContent = item.summary;
    copy.append(tag, title, summary);
    const home = awayFrom(item.key, id);
    const arrow = document.createElement('span'); arrow.className = home ? 'item-arrow item-arrow--jump' : 'item-arrow'; arrow.textContent = home ? `${destinations[home].name.toUpperCase()} ↗` : '↗'; arrow.setAttribute('aria-hidden', 'true');
    if (home) button.setAttribute('aria-label', `${item.title}. Opens in ${destinations[home].name}.`);
    button.append(icon, copy, arrow);
    button.addEventListener('click', () => openCaseFrom(item.key, button));
    const link = on => document.querySelectorAll(`.career-visual [data-case="${item.key}"]`).forEach(node => node.classList.toggle('is-linked', on));
    button.addEventListener('pointerenter', () => link(true)); button.addEventListener('pointerleave', () => link(false));
    button.addEventListener('focus', () => link(true)); button.addEventListener('blur', () => link(false));
    field.append(button);
  });
  document.querySelector('.chapter-reading').scrollTop = 0;
}

function preview(id) {
  if (!destinations[id] || activeScene !== 'map') return;
  previewDestination = id;
  const data = destinations[id];
  const index = route.indexOf(id);
  document.getElementById('brief-number').textContent = `STOP ${index + 1} OF ${route.length} · ${data.name.toUpperCase()}`;
  document.getElementById('brief-title').textContent = data.heading;
  document.getElementById('brief-text').textContent = data.preview;
  document.getElementById('brief-action').firstChild.textContent = `${data.action} `;
  document.getElementById('brief-prev').disabled = index === 0;
  document.getElementById('brief-next').disabled = index === route.length - 1;
  document.querySelectorAll('.brief-stop').forEach((stop, i) => { stop.classList.toggle('is-reached', i <= index); if (i === index) stop.setAttribute('aria-current', 'step'); else stop.removeAttribute('aria-current'); });
  Object.entries(nodeButtons).forEach(([key, node]) => {
    node.dataset.active = key === id ? 'true' : 'false';
    if (key === id) node.setAttribute('aria-current', 'true'); else node.removeAttribute('aria-current');
  });
}

function moveCamera(toPosition, toLook, duration, done) {
  if (!worldReady || !camera) { done?.(); return; }
  cameraMove = { start: performance.now(), duration: reducedMotion ? 80 : duration, from: camera.position.clone(), fromLook: currentLook.clone(), to: toPosition.clone(), toLook: toLook.clone(), done };
}

async function openMap(push = true) {
  closeDetail(false);
  if (globeMove && earth) { globeAngle = earth.rotation.y; globeTilt = earth.rotation.x; globeMove = null; }
  setScene('map');
  preview(activeDestination);
  body.classList.toggle('world-loading', !worldReady);
  document.getElementById('map-loading').hidden = worldReady;
  document.querySelector('.map-status').lastChild.textContent = ' LOADING EXPERIENCE MAP';
  await initWorld();
  body.classList.remove('world-loading');
  document.getElementById('map-loading').hidden = true;
  document.querySelector('.map-status').lastChild.textContent = ' FOLLOW THE ROUTE';
  moveCamera(mapPose.position, mapPose.look, 1100, () => { lastMapTrigger?.focus?.({ preventScroll: true }); sweepRoute(); });
  if (push) historyFor('map');
}

// Moving between two chapters passes through the overview, so the visitor sees where they go.
function passThroughMap() {
  return new Promise(resolve => {
    setScene('approaching');
    moveCamera(mapPose.position, mapPose.look, 1000, () => setTimeout(resolve, reducedMotion ? 0 : 220));
  });
}

async function approach(id, push = true) {
  if (!destinations[id]) return;
  await initWorld();
  const fromChapter = activeScene === 'chapter' && activeDestination !== id;
  closeDetail(false);
  closeView(false);
  activeDestination = id;
  if (fromChapter) await passThroughMap();
  previewDestination = id;
  const data = destinations[id];
  if (id === 'earth' && earth) {
    const turn = Math.atan2(Math.sin(europePose.rotationY - earth.rotation.y), Math.cos(europePose.rotationY - earth.rotation.y));
    globeMove = { start: performance.now(), duration: reducedMotion ? 80 : 1500, fromX: earth.rotation.x, fromY: earth.rotation.y, toX: europePose.tiltX, toY: earth.rotation.y + turn };
    globeAngle = globeMove.toY;
    globeTilt = globeMove.toX;
  }
  setScene('approaching');
  moveCamera(data.camera, data.look, 1500, () => {
    renderChapter(id);
    setScene('chapter');
    const title = document.getElementById('chapter-title'); title.tabIndex = -1; title.focus({ preventScroll: true });
  });
  if (push) historyFor(id);
}

function returnCockpit(push = true) {
  closeDetail(false);
  cameraMove = null;
  setScene('cockpit');
  if (push) historyFor('cockpit');
  document.getElementById('open-map').focus({ preventScroll: true });
}

function makeStars() {
  let seed = 8217;
  const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  const points = new Float32Array(900 * 3);
  for (let i = 0; i < 900; i++) { const z = random() * 2 - 1, a = random() * Math.PI * 2, r = 70 + random() * 35, s = Math.sqrt(1 - z * z); points[i * 3] = r * s * Math.cos(a); points[i * 3 + 1] = r * s * Math.sin(a); points[i * 3 + 2] = r * z; }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(points, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xa9c8d3, size: .16, transparent: true, opacity: .72, depthWrite: false })));
}

function makeOrbit(rx, ry, tilt, opacity) {
  const vertices = [];
  for (let i = 0; i < 220; i++) { const a = i / 220 * Math.PI * 2; vertices.push(rx * Math.cos(a), ry * Math.sin(a) * Math.cos(tilt), ry * Math.sin(a) * Math.sin(tilt)); }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const line = new THREE.LineLoop(geo, new THREE.LineBasicMaterial({ color: 0x7daebc, transparent: true, opacity, depthWrite: false }));
  line.visible = activeScene === 'map';
  orbitLines.push(line);
  scene.add(line);
}

function makeAtmosphere() {
  const material = new THREE.ShaderMaterial({
    uniforms: { glow: { value: new THREE.Color(0x69bfdf) } },
    vertexShader: 'varying vec3 vN; varying vec3 vE; void main(){vec4 p=modelViewMatrix*vec4(position,1.0);vN=normalize(normalMatrix*normal);vE=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',
    fragmentShader: 'uniform vec3 glow; varying vec3 vN; varying vec3 vE; void main(){float rim=pow(1.0-max(dot(normalize(vN),normalize(vE)),0.0),3.1);gl_FragColor=vec4(glow,rim*0.52);}',
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  });
  atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.72, 72, 48), material);
  scene.add(atmosphere);
}

function addDevice(id, model, mapScale, chapterScale = mapScale) {
  const data = destinations[id];
  const anchor = new THREE.Group(); anchor.position.copy(data.position); scene.add(anchor);
  anchor.visible = activeScene === 'map' || (activeScene !== 'cockpit' && id === activeDestination);
  const wrapper = new THREE.Group(); anchor.add(wrapper);
  const bounds = new THREE.Box3().setFromObject(model);
  const dimensions = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  model.position.sub(center); wrapper.add(model);
  const modelSize = Math.max(dimensions.x, dimensions.y, dimensions.z);
  wrapper.scale.setScalar(mapScale / modelSize);
  if (id === 'iss') wrapper.rotation.set(.18, 1.05, -.15);
  if (id === 'sentinel') wrapper.rotation.set(.25, -.45, .12);
  const hit = new THREE.Mesh(new THREE.SphereGeometry(id === 'iss' ? .85 : .68, 12, 8), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); anchor.add(hit);
  devices[id] = { anchor, wrapper, hit, mapUnit: mapScale / modelSize, chapterUnit: chapterScale / modelSize, base: data.position.clone(), phase: { iss: 0, sentinel: 1.6, galileo: 2.8, juice: 4.2 }[id] };
}

function addRenderedDevice(id, texture, aspect, mapScale, chapterScale = mapScale) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(aspect, 1), new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
  addDevice(id, plane, mapScale, chapterScale);
  devices[id].billboard = true;
  devices[id].wrapper.rotation.set(0, 0, 0);
}

async function loadHardware() {
  const obj = new OBJLoader();
  const textureLoader = new THREE.TextureLoader();
  const paths = {
    iss: 'assets/nasa/iss-render.png',
    sentinel: 'assets/nasa/sentinel-6-render.png',
    galileo: 'assets/esa/galileo/galileo.obj',
    galileoFoil: 'assets/esa/galileo/galileo-foil.obj',
    galileoColor: 'assets/esa/galileo/galileofoilsubstance_Bassecolor.galileo.png',
    galileoFoilColor: 'assets/esa/galileo/galileofoilsubstance_Bassecolor.foil.png',
    galileoNormal: 'assets/esa/galileo/galileofoilsubstance_NormalOGL.galileo.png',
    galileoFoilNormal: 'assets/esa/galileo/galileofoilsubstance_NormalOGL.foil.png',
    galileoRoughness: 'assets/esa/galileo/galileofoilsubstance_Roughness.galileo.png',
    galileoFoilRoughness: 'assets/esa/galileo/galileofoilsubstance_Roughness.foil.png',
    juice: 'assets/nasa/juice-render.png'
  };
  const jobs = Object.fromEntries(await Promise.all(Object.entries(paths).map(async ([id, path]) => {
    try {
      const model = id === 'galileo' || id === 'galileoFoil' ? await obj.loadAsync(path) : await textureLoader.loadAsync(path);
      return [id, model];
    } catch (error) {
      console.warn(`Official ${id} asset unavailable:`, error);
      return [id, null];
    }
  })));
  const { iss, sentinel } = jobs;
  const materialize = (root, material) => {
    root.traverse(part => { if (part.isMesh) part.material = material; });
    return root;
  };
  if (jobs.galileo && jobs.galileoFoil) {
    const group = new THREE.Group();
    for (const map of [jobs.galileoColor, jobs.galileoFoilColor]) if (map) map.colorSpace = THREE.SRGBColorSpace;
    const bodyMaterial = new THREE.MeshStandardMaterial({ map: jobs.galileoColor, normalMap: jobs.galileoNormal, roughnessMap: jobs.galileoRoughness, color: 0xffffff, metalness: .22, roughness: .83, side: THREE.DoubleSide });
    const foilMaterial = new THREE.MeshStandardMaterial({ map: jobs.galileoFoilColor, normalMap: jobs.galileoFoilNormal, roughnessMap: jobs.galileoFoilRoughness, color: 0xffffff, metalness: .38, roughness: .75, side: THREE.DoubleSide });
    group.add(materialize(jobs.galileo, bodyMaterial), materialize(jobs.galileoFoil, foilMaterial));
    group.rotation.set(.72, -.48, .72);
    addDevice('galileo', group, 3.05, 1.9);
  }
  if (jobs.juice) addRenderedDevice('juice', jobs.juice, 691 / 649, 2.4, 1.6);
  if (iss) addRenderedDevice('iss', iss, 3000 / 1569, 2.85, 2.25);
  if (sentinel) addRenderedDevice('sentinel', sentinel, 3000 / 1688, 3.0, 2.05);
}

function resize() {
  if (!renderer) return;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  mapPose.position.z = w < 700 ? 25 : 14.8;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// The journey runs in reading order. Earth's label sits on France, where the career starts.
const route = ['earth', 'iss', 'sentinel', 'galileo', 'juice'];
const franceOnGlobe = (() => { const lat = 46.6, lon = 2.4, phi = (lon + 180) / 360 * Math.PI * 2, theta = (90 - lat) / 180 * Math.PI, r = 2.66; return new THREE.Vector3(-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta)); })();
const routeMap = (() => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.classList.add('route-map'); svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = route.slice(1).map(() => '<path class="route-leg"/><path class="route-lit" pathLength="1"/>').join('') + '<circle class="route-ping" r="8"/>';
  document.querySelector('.destination-field').prepend(svg); return svg;
})();
let sweepStop = null, sweepTimers = [], routeShown = false;

function projectNodes() {
  if (!camera) return;
  const w = canvas.clientWidth, h = canvas.clientHeight, anchors = {};
  let franceShown = false;
  for (const [id, button] of Object.entries(nodeButtons)) {
    if (id === 'earth' && earth) {
      earth.updateMatrixWorld();
      const point = earth.localToWorld(franceOnGlobe.clone());
      const facing = point.clone().sub(earth.position).dot(camera.position.clone().sub(point)) > 0;
      if (facing) {
        const p = point.clone().project(camera), fx = (p.x * .5 + .5) * w, fy = (-p.y * .5 + .5) * h;
        // The label's own dot lands on France; the label reads to its left, over the Atlantic.
        button.style.left = `${fx + 10}px`; button.style.top = `${fy}px`; button.dataset.side = 'france';
        anchors.earth = { x: fx, y: fy }; franceShown = true;
        continue;
      }
    }
    const pos = id === 'earth' ? new THREE.Vector3(0, -2.7, 1.2) : devices[id]?.anchor.position || destinations[id].position;
    const projected = pos.clone().project(camera);
    const x = Math.max(8, Math.min(92, (projected.x * .5 + .5) * 100));
    const y = Math.max(20, Math.min(78, (-projected.y * .5 + .5) * 100));
    button.style.left = `${x}%`; button.style.top = `${y}%`;
    button.dataset.side = id === 'earth' ? 'earth' : (x > 50) !== (canvas.clientWidth < 700) ? 'right' : 'left';
    anchors[id] = { x: x / 100 * w, y: y / 100 * h };
  }
  drawRoute(anchors, w, h, franceShown);
}

// Each leg bows away from the globe; legs up to the stop in view are lit.
function drawRoute(anchors, w, h, franceShown) {
  const c = earth.position.clone().project(camera), cx = (c.x * .5 + .5) * w, cy = (-c.y * .5 + .5) * h;
  const legs = routeMap.querySelectorAll('.route-leg'), lit = routeMap.querySelectorAll('.route-lit');
  const reached = sweepStop ?? route.indexOf(previewDestination);
  routeMap.setAttribute('viewBox', `0 0 ${w} ${h}`);
  route.slice(1).forEach((id, i) => {
    const a = anchors[route[i]], b = anchors[id];
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, ox = mx - cx, oy = my - cy, len = Math.hypot(ox, oy) || 1, bow = Math.hypot(b.x - a.x, b.y - a.y) * .2;
    const d = `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${(mx + ox / len * bow).toFixed(1)} ${(my + oy / len * bow).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    if (legs[i].getAttribute('d') !== d) { legs[i].setAttribute('d', d); lit[i].setAttribute('d', d); }
    lit[i].classList.toggle('is-lit', i < reached);
  });
  const ping = routeMap.querySelector('.route-ping');
  ping.classList.toggle('is-on', franceShown);
  if (franceShown) { ping.setAttribute('cx', anchors.earth.x); ping.setAttribute('cy', anchors.earth.y); }
}

// First arrival on the map: the route draws itself stop by stop, then returns to the start.
function sweepRoute() {
  if (routeShown) return;
  routeShown = true;
  if (reducedMotion) return;
  route.forEach((id, i) => sweepTimers.push(setTimeout(() => {
    sweepStop = i; nodeButtons[id].classList.add('is-passing');
    sweepTimers.push(setTimeout(() => nodeButtons[id].classList.remove('is-passing'), 800));
  }, 300 + i * 620)));
  sweepTimers.push(setTimeout(stopSweep, 300 + route.length * 620 + 600));
}
function stopSweep() {
  sweepTimers.forEach(clearTimeout); sweepTimers = []; sweepStop = null;
  Object.values(nodeButtons).forEach(node => node.classList.remove('is-passing'));
}
function stepPreview(delta) {
  const next = route[route.indexOf(previewDestination) + delta];
  if (next) { stopSweep(); preview(next); }
}

function tick(time) {
  frameId = requestAnimationFrame(tick);
  if (!renderer) return;
  const elapsed = clock.getElapsedTime();
  for (const [id, device] of Object.entries(devices)) {
    const target = activeScene === 'map' || (activeScene === 'cockpit' && id !== activeDestination) ? device.mapUnit : device.chapterUnit;
    const size = device.wrapper.scale.x + (target - device.wrapper.scale.x) * .08;
    device.wrapper.scale.setScalar(size);
  }
  if (activeScene === 'map' && !reducedMotion) {
    if (!globeDrag) globeAngle += .00009;
    earth.rotation.y += (globeAngle + pointerX * .12 - earth.rotation.y) * .035;
    earth.rotation.x += (globeTilt - pointerY * .045 - earth.rotation.x) * .03;
    for (const device of Object.values(devices)) {
      const t = elapsed * .32 + device.phase;
      device.anchor.position.x = device.base.x + Math.sin(t) * .075;
      device.anchor.position.y = device.base.y + Math.cos(t) * .055;
    }
  }
  if (globeMove) {
    const t = Math.min(1, (time - globeMove.start) / globeMove.duration);
    const ease = t * t * (3 - 2 * t);
    earth.rotation.x = globeMove.fromX + (globeMove.toX - globeMove.fromX) * ease;
    earth.rotation.y = globeMove.fromY + (globeMove.toY - globeMove.fromY) * ease;
    if (t >= 1) globeMove = null;
  }
  if (cameraMove) {
    const t = Math.min(1, (time - cameraMove.start) / cameraMove.duration);
    const ease = t * t * (3 - 2 * t);
    camera.position.copy(cameraMove.from).lerp(cameraMove.to, ease);
    currentLook.copy(cameraMove.fromLook).lerp(cameraMove.toLook, ease);
    if (t >= 1) { const done = cameraMove.done; cameraMove = null; done?.(); }
  } else if (activeScene === 'map') {
    const target = mapPose.position.clone().add(new THREE.Vector3(pointerX * .28, pointerY * .18, 0));
    camera.position.lerp(target, .025); currentLook.lerp(mapPose.look, .025);
  }
  camera.lookAt(currentLook);
  for (const device of Object.values(devices)) if (device.billboard) device.wrapper.quaternion.copy(camera.quaternion);
  if (activeScene === 'map') projectNodes();
  renderer.render(scene, camera);
}

async function initWorld() {
  if (worldPromise) return worldPromise;
  worldPromise = (async () => {
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.7));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.38;
      scene = new THREE.Scene(); scene.background = new THREE.Color(0x061018);
      camera = new THREE.PerspectiveCamera(40, 1, .1, 230); camera.position.copy(mapPose.position); camera.lookAt(mapPose.look);
      resize();
      scene.add(new THREE.AmbientLight(0x93adba, 1.38));
      sun = new THREE.DirectionalLight(0xfff2dc, 3.1); sun.position.set(-6, 5, 10); scene.add(sun);
      const fill = new THREE.DirectionalLight(0x3c94ba, .68); fill.position.set(6, -3, -7); scene.add(fill);
      makeStars(); makeOrbit(3.65, 2.9, .28, .28); makeOrbit(4.12, 3.22, -.31, .17); makeOrbit(4.7, 3.76, .52, .12);
      const texture = await new THREE.TextureLoader().loadAsync('assets/nasa/blue-marble-2048.png');
      texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      earth = new THREE.Mesh(new THREE.SphereGeometry(2.65, 96, 64), new THREE.MeshStandardMaterial({ map: texture, roughness: 1 })); earth.rotation.set(globeTilt, globeAngle, 0); scene.add(earth);
      makeAtmosphere();
      globeHover = new THREE.Mesh(new THREE.RingGeometry(.07, .091, 32), new THREE.MeshBasicMaterial({ color: 0xc2eff5, side: THREE.DoubleSide, transparent: true, opacity: .82, depthWrite: false })); globeHover.visible = false; scene.add(globeHover);
      worldReady = true;
      requestAnimationFrame(tick);
      window.addEventListener('resize', resize);
      loadHardware().catch(error => console.warn('Spacecraft models unavailable:', error));
      return true;
    } catch (error) {
      console.error('Mission map unavailable:', error);
      body.classList.add('world-failed');
      document.getElementById('map-fallback').hidden = false;
      canvas.hidden = true;
      return false;
    }
  })();
  return worldPromise;
}

function hitAt(event) {
  if (!worldReady || activeScene !== 'map') return null;
  const rect = canvas.getBoundingClientRect();
  pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects([earth, ...Object.values(devices).map(d => d.hit)], false);
  if (!hits.length) return null;
  const first = hits[0];
  if (first.object === earth) return { id: 'earth', point: first.point, normal: first.point.clone().normalize() };
  const pair = Object.entries(devices).find(([, d]) => d.hit === first.object);
  return pair ? { id: pair[0] } : null;
}

canvas.addEventListener('pointermove', event => {
  if (activeScene !== 'map') return;
  pointerX = event.clientX / innerWidth - .5; pointerY = .5 - event.clientY / innerHeight;
  if (globeDrag) { const dx = event.clientX - globeDrag.x, dy = event.clientY - globeDrag.y; globeAngle += dx * .006; globeTilt = Math.max(-.15, Math.min(1.25, globeTilt + dy * .002)); globeDrag.x = event.clientX; globeDrag.y = event.clientY; globeDrag.distance += Math.abs(dx) + Math.abs(dy); return; }
  const hit = hitAt(event); canvas.style.cursor = hit ? 'pointer' : '';
  if (hit?.id === 'earth') { globeHover.visible = true; globeHover.position.copy(hit.point.clone().multiplyScalar(1.002)); globeHover.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), hit.normal); }
  else if (globeHover) globeHover.visible = false;
  if (hit && hit.id !== previewDestination) preview(hit.id);
});
canvas.addEventListener('pointerleave', () => { pointerX = pointerY = 0; if (globeHover) globeHover.visible = false; canvas.style.cursor = ''; });
canvas.addEventListener('pointerdown', event => { const hit = hitAt(event); if (hit?.id === 'earth') { globeDrag = { x: event.clientX, y: event.clientY, distance: 0 }; canvas.setPointerCapture(event.pointerId); } });
canvas.addEventListener('pointerup', event => { if (!globeDrag) return; const clicked = globeDrag.distance < 7; suppressClick = !clicked; globeDrag = null; if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId); if (clicked) approach('earth'); });
canvas.addEventListener('pointercancel', () => { globeDrag = null; suppressClick = false; });
canvas.addEventListener('click', event => { if (suppressClick) { suppressClick = false; return; } if (globeDrag) return; const hit = hitAt(event); if (hit && hit.id !== 'earth') approach(hit.id); });

document.getElementById('open-map').addEventListener('click', () => openMap());
document.getElementById('quick-work').addEventListener('click', () => approach('earth'));
document.getElementById('map-to-cockpit').addEventListener('click', () => returnCockpit());
document.getElementById('back-to-cockpit').addEventListener('click', () => returnCockpit());
document.getElementById('back-to-map').addEventListener('click', () => openMap());
document.getElementById('brief-action').addEventListener('click', () => approach(previewDestination));
document.getElementById('brief-prev').addEventListener('click', () => stepPreview(-1));
document.getElementById('brief-next').addEventListener('click', () => stepPreview(1));
document.querySelectorAll('.brief-stop').forEach((stop, i) => stop.addEventListener('click', () => { stopSweep(); preview(route[i]); }));
document.getElementById('hardware-info').addEventListener('click', event => openHardware(event.currentTarget));
document.getElementById('next-destination').addEventListener('click', () => approach(destinations[activeDestination].next));
document.getElementById('detail-close').addEventListener('click', () => closeDetail());
// The shared data-system scene lets a visitor move between the three data roles without closing the detail.
detail.addEventListener('portfolio:open-case', event => {
  if (awayFrom(event.detail.key)) { const origin = { dest: activeDestination, caseKey: activeCase }; closeDetail(false); openCaseFrom(event.detail.key, null, origin); return; }
  const returnTo = lastDetailTrigger, hadEntry = detailHasHistoryEntry;
  openCase(event.detail.key, null, false);
  lastDetailTrigger = returnTo; detailHasHistoryEntry = hadEntry;
  historyFor(activeDestination, event.detail.key, true);
});
document.getElementById('detail-scrim').addEventListener('click', () => closeDetail());
Object.entries(nodeButtons).forEach(([id, button]) => {
  button.addEventListener('pointerenter', () => { stopSweep(); preview(id); });
  button.addEventListener('focus', () => { stopSweep(); preview(id); });
  button.addEventListener('click', () => { lastMapTrigger = button; approach(id); });
});

document.addEventListener('keydown', event => {
  if (activeScene === 'map' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft') && !event.target.closest?.('input, textarea')) { event.preventDefault(); stepPreview(event.key === 'ArrowRight' ? 1 : -1); }
  if (event.key === 'Escape') { if (!detail.hidden) closeDetail(); else if (activeView) closeView(); else if (activeScene === 'chapter') openMap(); else if (activeScene === 'map') returnCockpit(); }
  if (event.key === 'Tab' && !detail.hidden) {
    const controls = [...detail.querySelectorAll('button, a')]; const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if (event.key === 'Tab' && detail.hidden && activeView) {
    const controls = [...viewHost.querySelectorAll('button, [data-case][tabindex="0"]')]; const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

document.querySelector('.skip-link').addEventListener('click', event => { event.preventDefault(); approach('earth'); });
// After an approach lands, reopen whatever the address names: a wide view, then a case on top of it.
function restoreFromHash(view, caseKey, syncHash = false) {
  if (!view && !caseKey) return;
  let tries = 0;
  const run = () => {
    if (activeScene !== 'chapter') { if (++tries < 60) setTimeout(run, 120); return; }
    if (view) openView(view, null, null, false);
    if (!caseKey) return;
    if (caseKey.startsWith('hardware-')) openHardware(document.getElementById('hardware-info'), false);
    else openCase(caseKey, viewHost.querySelector('.tv-open') || document.getElementById('chapter-title'), false);
    if (syncHash) historyFor(activeDestination, caseKey, true);
  };
  setTimeout(run, reducedMotion ? 100 : 400);
}

window.addEventListener('popstate', async () => {
  returnTrip = null;
  const [id, query = ''] = location.hash.slice(1).split('?');
  const params = new URLSearchParams(query), caseKey = params.get('case'), view = params.get('view');
  if (activeView && (id !== activeDestination || view !== activeView)) closeView(false);
  if (id === 'cockpit' || !id) { returnCockpit(false); return; }
  if (id === 'map') { await openMap(false); return; }
  if (destinations[id]) {
    if (activeScene === 'chapter' && activeDestination === id) {
      if (view !== activeView) { if (view) openView(view, null, null, false); else closeView(false); }
      if (!caseKey) { closeDetail(false); return; }
      if (caseKey === activeCase) return;
      if (caseKey.startsWith('hardware-')) openHardware(document.getElementById('hardware-info'), false);
      else openCase(caseKey, document.getElementById('chapter-title'), false);
      return;
    }
    await approach(id, false);
    restoreFromHash(view, caseKey);
  }
});

const [initialId, initialQuery = ''] = location.hash.slice(1).split('?');
if (initialId === 'map') openMap(false);
else if (destinations[initialId]) { const params = new URLSearchParams(initialQuery); approach(initialId, false).then(() => restoreFromHash(params.get('view'), params.get('case'))); }
else { historyFor('cockpit', null, true); initWorld(); }
