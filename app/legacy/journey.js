import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// Started by app/journey/JourneyIsland.tsx. All content comes from the section list.
export function startJourney({ stops, navigate, aboutSlug, mountCase, mountInstrument, mountView }) {
let unmountCase = null;
const releaseCase = () => { unmountCase?.(); unmountCase = null; };
const listeners = [];
const listen = (target, type, handler, options) => { target.addEventListener(type, handler, options); listeners.push(() => target.removeEventListener(type, handler, options)); };
const vec = a => new THREE.Vector3(...a);
const pad = n => String(n).padStart(2, '0');
const route = stops.map(s => s.stop.key);
const sectionOf = Object.fromEntries(stops.map(s => [s.stop.key, s]));
const globeKey = stops.find(s => s.stop.device.kind === 'globe')?.stop.key;
const destinations = Object.fromEntries(stops.map((s, i) => [s.stop.key, {
  name: s.stop.name, heading: s.title, preview: s.description, action: s.stop.action, eyebrow: s.stop.eyebrow,
  title: s.stop.titleHtml, intro: s.stop.intro, hardware: s.stop.hardware, next: route[(i + 1) % route.length],
  position: vec(s.stop.position), camera: vec(s.stop.camera), look: vec(s.stop.look),
  items: s.cases.map(c => ({ key: c.slug, logo: c.logo, icon: c.icon, symbol: c.symbol, tag: c.tag, title: c.title, summary: c.summary })),
}]));
const destinationVisuals = Object.fromEntries(stops.filter(s => s.stop.visual).map(s => [s.stop.key, s.stop.visual]));
const hardwareFacts = Object.fromEntries(stops.map(s => [s.stop.key, s.stop.about]));
const cases = Object.fromEntries(stops.flatMap(s => s.cases.map(c => [c.slug, c])));
// A case lives in one chapter. Elsewhere its card or timeline entry travels to that chapter instead of repeating it.
const caseHome = Object.fromEntries(stops.flatMap(s => s.cases.map(c => [c.slug, s.stop.key])));
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





let renderer, scene, camera, earth, atmosphere, sun, globeHover, frameId;
let activeScene = 'cockpit', activeDestination = route[0], previewDestination = route[0], activeCase = null;
let worldReady = false, worldPromise, cameraMove = null, globeMove = null, currentLook = mapPose.look.clone();
const europePose = { rotationY: -1.74, tiltX: .82 };
let pointerX = 0, pointerY = 0, globeDrag = null, suppressClick = false, globeAngle = europePose.rotationY, globeTilt = europePose.tiltX;
let lastDetailTrigger = null, lastMapTrigger = null, detailHasHistoryEntry = false;
let activeView = null, viewHandle = null, viewHasHistoryEntry = false, lastViewTrigger = null, chapterInstrument = null;
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
  for (const [id, device] of Object.entries(devices)) device.anchor.visible = next === 'map' || (next === 'approaching' && id === activeDestination) || (next === 'chapter' && id === globeKey);
  for (const line of orbitLines) line.visible = next === 'map';
}

function pathFor(id, caseKey = null) {
  if (id === 'cockpit') return '/';
  if (id === 'map') return '/map';
  const base = `/${sectionOf[id].slug}`;
  if (caseKey) return `${base}/${caseKey.startsWith('hardware-') ? aboutSlug : caseKey}`;
  return activeView ? `${base}?view=${activeView}` : base;
}
function historyFor(id, caseKey = null, replace = false) {
  navigate(pathFor(id, caseKey), { replace });
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
  releaseCase();
  let experience = null;
  if (caseKey) {
    const host = document.createElement('div'); host.className = 'case-host';
    unmountCase = mountCase(host, caseKey);
    if (unmountCase) experience = host;
  }
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
    releaseCase();
    detail.hidden = true; activeCase = null; viewHost.inert = false; detailHasHistoryEntry = false;
    approach(trip.dest).then(() => { if (trip.caseKey) restoreFromHash(null, trip.caseKey, true); });
    return;
  }
  const returnThroughHistory = withHistory && detailHasHistoryEntry;
  releaseCase();
  detail.hidden = true; activeCase = null; chapter.inert = activeScene !== 'chapter' || !!activeView; viewHost.inert = false;
  detailHasHistoryEntry = false;
  if (returnThroughHistory) history.back();
  else if (withHistory) historyFor(activeDestination, null, true);
  lastDetailTrigger?.focus?.({ preventScroll: true });
}

const awayFrom = (key, id = activeDestination) => caseHome[key] && caseHome[key] !== id ? caseHome[key] : null;
function openCaseFrom(key, trigger, origin = { dest: activeDestination, caseKey: activeCase }) {
  const home = awayFrom(key);
  if (!home) { openCase(key, trigger); return; }
  returnTrip = { ...origin, linked: key };
  closeView(false);
  approach(home).then(() => restoreFromHash(null, key, true));
}

// Wide instrument views open over the globe; a case opened from one returns to it when closed.
const instruments = Object.fromEntries(stops.filter(s => s.stop.instrument).map(s => [s.stop.key, [s.stop.instrument]]));
function openView(kind, selected = null, trigger = null, withHistory = true) {
  const entry = Object.values(instruments).find(([name]) => name === kind);
  if (!entry || instruments[activeDestination]?.[0] !== kind) return;
  if (activeView === kind) { if (selected) viewHandle.select(selected); return; }
  lastViewTrigger = trigger || document.querySelector('.chapter-reading .cv-expand');
  activeView = kind;
  viewHasHistoryEntry = withHistory;
  viewHandle = mountView(kind, { selected, onOpen: (key, button) => openCaseFrom(key, button), onClose: () => closeView(), openLabel: key => awayFrom(key) ? `OPEN IN ${destinations[awayFrom(key)].name.toUpperCase()}` : 'OPEN THE CASE' });
  viewHost.replaceChildren(viewHandle.root);
  viewHost.hidden = false;
  chapter.inert = true;
  if (withHistory) historyFor(activeDestination);
  viewHandle.focus();
}

function closeView(withHistory = true) {
  if (!activeView) return;
  const returnThroughHistory = withHistory && viewHasHistoryEntry;
  activeView = null; viewHandle?.unmount(); viewHandle = null; viewHasHistoryEntry = false;
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
  if (chapterInstrument) { chapterInstrument.unmount(); chapterInstrument.node.remove(); chapterInstrument = null; }
  const instrument = sectionOf[id].stop.instrument;
  if (instrument) { chapterInstrument = mountInstrument(instrument, (key, trigger) => openView(instrument, key, trigger)); field.before(chapterInstrument.node); }
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
  if (id === globeKey && earth) {
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
  const hit = new THREE.Mesh(new THREE.SphereGeometry(sectionOf[id].stop.device.hitRadius ?? .68, 12, 8), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); anchor.add(hit);
  devices[id] = { anchor, wrapper, hit, mapUnit: mapScale / modelSize, chapterUnit: chapterScale / modelSize, base: data.position.clone(), phase: sectionOf[id].stop.device.phase ?? 0 };
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
  const load = async (path, kind) => { try { return kind === 'obj' ? await obj.loadAsync(path) : await textureLoader.loadAsync(path); } catch (error) { console.warn(`Asset unavailable: ${path}`, error); return null; } };
  const materialize = (root, material) => { root.traverse(part => { if (part.isMesh) part.material = material; }); return root; };
  const presets = {
    async galileo(device, id) {
      const base = '/assets/esa/galileo';
      const [body, foil, color, foilColor, normal, foilNormal, roughness, foilRoughness] = await Promise.all([
        load(`${base}/galileo.obj`, 'obj'), load(`${base}/galileo-foil.obj`, 'obj'),
        load(`${base}/galileofoilsubstance_Bassecolor.galileo.png`), load(`${base}/galileofoilsubstance_Bassecolor.foil.png`),
        load(`${base}/galileofoilsubstance_NormalOGL.galileo.png`), load(`${base}/galileofoilsubstance_NormalOGL.foil.png`),
        load(`${base}/galileofoilsubstance_Roughness.galileo.png`), load(`${base}/galileofoilsubstance_Roughness.foil.png`)]);
      if (!body || !foil) return;
      const group = new THREE.Group();
      for (const map of [color, foilColor]) if (map) map.colorSpace = THREE.SRGBColorSpace;
      const bodyMaterial = new THREE.MeshStandardMaterial({ map: color, normalMap: normal, roughnessMap: roughness, color: 0xffffff, metalness: .22, roughness: .83, side: THREE.DoubleSide });
      const foilMaterial = new THREE.MeshStandardMaterial({ map: foilColor, normalMap: foilNormal, roughnessMap: foilRoughness, color: 0xffffff, metalness: .38, roughness: .75, side: THREE.DoubleSide });
      group.add(materialize(body, bodyMaterial), materialize(foil, foilMaterial));
      group.rotation.set(.72, -.48, .72);
      addDevice(id, group, device.mapScale, device.chapterScale);
    },
  };
  await Promise.all(stops.map(async ({ stop }) => {
    const device = stop.device;
    if (device.kind === 'billboard') { const texture = await load(device.image); if (texture) addRenderedDevice(stop.key, texture, device.aspect, device.mapScale, device.chapterScale); }
    else if (device.kind === 'model') await presets[device.preset]?.(device, stop.key);
  }));
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
    if (id === globeKey && earth) {
      earth.updateMatrixWorld();
      const point = earth.localToWorld(franceOnGlobe.clone());
      const facing = point.clone().sub(earth.position).dot(camera.position.clone().sub(point)) > 0;
      if (facing) {
        const p = point.clone().project(camera), fx = (p.x * .5 + .5) * w, fy = (-p.y * .5 + .5) * h;
        // The label's own dot lands on France; the label reads to its left, over the Atlantic.
        button.style.left = `${fx + 10}px`; button.style.top = `${fy}px`; button.dataset.side = 'france';
        anchors[globeKey] = { x: fx, y: fy }; franceShown = true;
        continue;
      }
    }
    const pos = id === globeKey ? new THREE.Vector3(0, -2.7, 1.2) : devices[id]?.anchor.position || destinations[id].position;
    const projected = pos.clone().project(camera);
    const x = Math.max(8, Math.min(92, (projected.x * .5 + .5) * 100));
    const y = Math.max(20, Math.min(78, (-projected.y * .5 + .5) * 100));
    button.style.left = `${x}%`; button.style.top = `${y}%`;
    button.dataset.side = id === globeKey ? 'earth' : (x > 50) !== (canvas.clientWidth < 700) ? 'right' : 'left';
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
  if (franceShown) { ping.setAttribute('cx', anchors[globeKey].x); ping.setAttribute('cy', anchors[globeKey].y); }
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
      const texture = await new THREE.TextureLoader().loadAsync('/assets/nasa/blue-marble-2048.webp');
      texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      earth = new THREE.Mesh(new THREE.SphereGeometry(2.65, 96, 64), new THREE.MeshStandardMaterial({ map: texture, roughness: 1 })); earth.rotation.set(globeTilt, globeAngle, 0); scene.add(earth);
      makeAtmosphere();
      globeHover = new THREE.Mesh(new THREE.RingGeometry(.07, .091, 32), new THREE.MeshBasicMaterial({ color: 0xc2eff5, side: THREE.DoubleSide, transparent: true, opacity: .82, depthWrite: false })); globeHover.visible = false; scene.add(globeHover);
      worldReady = true;
      requestAnimationFrame(tick);
      listen(window, 'resize', resize);
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
  if (first.object === earth) return { id: globeKey, point: first.point, normal: first.point.clone().normalize() };
  const pair = Object.entries(devices).find(([, d]) => d.hit === first.object);
  return pair ? { id: pair[0] } : null;
}

listen(canvas, 'pointermove', event => {
  if (activeScene !== 'map') return;
  pointerX = event.clientX / innerWidth - .5; pointerY = .5 - event.clientY / innerHeight;
  if (globeDrag) { const dx = event.clientX - globeDrag.x, dy = event.clientY - globeDrag.y; globeAngle += dx * .006; globeTilt = Math.max(-.15, Math.min(1.25, globeTilt + dy * .002)); globeDrag.x = event.clientX; globeDrag.y = event.clientY; globeDrag.distance += Math.abs(dx) + Math.abs(dy); return; }
  const hit = hitAt(event); canvas.style.cursor = hit ? 'pointer' : '';
  if (hit?.id === globeKey) { globeHover.visible = true; globeHover.position.copy(hit.point.clone().multiplyScalar(1.002)); globeHover.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), hit.normal); }
  else if (globeHover) globeHover.visible = false;
  if (hit && hit.id !== previewDestination) preview(hit.id);
});
listen(canvas, 'pointerleave', () => { pointerX = pointerY = 0; if (globeHover) globeHover.visible = false; canvas.style.cursor = ''; });
listen(canvas, 'pointerdown', event => { const hit = hitAt(event); if (hit?.id === globeKey) { globeDrag = { x: event.clientX, y: event.clientY, distance: 0 }; canvas.setPointerCapture(event.pointerId); } });
listen(canvas, 'pointerup', event => { if (!globeDrag) return; const clicked = globeDrag.distance < 7; suppressClick = !clicked; globeDrag = null; if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId); if (clicked) approach(globeKey); });
listen(canvas, 'pointercancel', () => { globeDrag = null; suppressClick = false; });
listen(canvas, 'click', event => { if (suppressClick) { suppressClick = false; return; } if (globeDrag) return; const hit = hitAt(event); if (hit && hit.id !== globeKey) approach(hit.id); });

listen(document.getElementById('open-map'), 'click', () => openMap());
listen(document.getElementById('quick-work'), 'click', () => approach(route[0]));
listen(document.getElementById('map-to-cockpit'), 'click', () => returnCockpit());
listen(document.getElementById('back-to-cockpit'), 'click', () => returnCockpit());
listen(document.getElementById('back-to-map'), 'click', () => openMap());
listen(document.getElementById('brief-action'), 'click', () => approach(previewDestination));
listen(document.getElementById('brief-prev'), 'click', () => stepPreview(-1));
listen(document.getElementById('brief-next'), 'click', () => stepPreview(1));
document.querySelectorAll('.brief-stop').forEach((stop, i) => listen(stop, 'click', () => { stopSweep(); preview(route[i]); }));
listen(document.getElementById('hardware-info'), 'click', event => openHardware(event.currentTarget));
listen(document.getElementById('next-destination'), 'click', () => approach(destinations[activeDestination].next));
listen(document.getElementById('detail-close'), 'click', () => closeDetail());
// The shared data-system scene lets a visitor move between the three data roles without closing the detail.
listen(detail, 'portfolio:open-case', event => {
  if (awayFrom(event.detail.key)) { const origin = { dest: activeDestination, caseKey: activeCase }; closeDetail(false); openCaseFrom(event.detail.key, null, origin); return; }
  const returnTo = lastDetailTrigger, hadEntry = detailHasHistoryEntry;
  openCase(event.detail.key, null, false);
  lastDetailTrigger = returnTo; detailHasHistoryEntry = hadEntry;
  historyFor(activeDestination, event.detail.key, true);
});
listen(document.getElementById('detail-scrim'), 'click', () => closeDetail());
Object.entries(nodeButtons).forEach(([id, button]) => {
  listen(button, 'pointerenter', () => { stopSweep(); preview(id); });
  listen(button, 'focus', () => { stopSweep(); preview(id); });
  listen(button, 'click', () => { lastMapTrigger = button; approach(id); });
});

listen(document, 'keydown', event => {
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

listen(document.querySelector('.skip-link'), 'click', event => { event.preventDefault(); approach(route[0]); });
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

// Where an address points: scene, stop, case and wide view.
function parsePath(pathname, search = '') {
  const [slug, sub] = pathname.split('/').filter(Boolean);
  if (!slug) return { id: 'cockpit' };
  if (slug === 'map') return { id: 'map' };
  const stop = stops.find(s => s.slug === slug);
  if (!stop) return { id: null };
  const id = stop.stop.key;
  const caseKey = sub === aboutSlug ? `hardware-${id}` : sub || null;
  return { id, caseKey, view: new URLSearchParams(search).get('view') };
}

// Follows the address when it changes from outside the journey: back and forward buttons, links.
async function goTo(pathname, search) {
  returnTrip = null;
  const { id, caseKey, view } = parsePath(pathname, search);
  if (activeView && (id !== activeDestination || view !== activeView)) closeView(false);
  if (id === 'cockpit') { returnCockpit(false); return; }
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
}

// First load: the cockpit needs no 3D. Any other address starts the world straight away.
function start(pathname, search) {
  const { id, caseKey, view } = parsePath(pathname, search);
  if (id === 'map') openMap(false);
  else if (destinations[id]) approach(id, false).then(() => restoreFromHash(view, caseKey));
}

function destroy() {
  releaseCase();
  chapterInstrument?.unmount();
  viewHandle?.unmount();
  cancelAnimationFrame(frameId);
  stopSweep();
  listeners.forEach(off => off());
  renderer?.dispose();
}

return { start, goTo, destroy };
}
