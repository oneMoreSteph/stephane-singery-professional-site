// Builds the web images in public/ from the originals in assets-src/. Run after changing an original.
// Usage: npm run images
import sharp from 'sharp';
import { copyFile, mkdir } from 'node:fs/promises';

const src = (f) => new URL(`../assets-src/${f}`, import.meta.url).pathname;
const out = (f) => new URL(`../public/${f}`, import.meta.url).pathname;

// [original, output, extra sharp options]. Same pixel size as the originals: only the encoding changes.
const images = [
  ['cockpit-center-seat.png', 'assets/cockpit-center-seat.webp', { quality: 82 }],
  ['blue-marble-2048.png', 'assets/nasa/blue-marble-2048.webp', { quality: 90 }],
  ['iss-render.png', 'assets/nasa/iss-render.webp', { quality: 86, alphaQuality: 95 }],
  ['sentinel-6-render.png', 'assets/nasa/sentinel-6-render.webp', { quality: 86, alphaQuality: 95 }],
  ['juice-render.png', 'assets/nasa/juice-render.webp', { quality: 86, alphaQuality: 95 }],
  ['iss-photograph.jpg', 'assets/nasa/iss-photograph.webp', { quality: 84 }],
  ['galileo-in-orbit.jpg', 'assets/esa/galileo/galileo-in-orbit.webp', { quality: 84 }],
  ['juice-deployed.jpg', 'assets/esa/juice/juice-deployed.webp', { quality: 84 }],
  ['verisure-logo.png', 'assets/verisure-logo.webp', { quality: 90, alphaQuality: 100 }],
];

for (const [from, to, options] of images) {
  await mkdir(out(to).replace(/\/[^/]+$/, ''), { recursive: true });
  const info = await sharp(src(from))
    .webp({ effort: 6, ...options })
    .toFile(out(to));
  console.log(`${to}  ${Math.round(info.size / 1024)} KB`);
}

// Portraits: one framing for every person on the site, shown in a round frame.
// Rule: the whole hair just inside the top, the chin at about 86% of the height, the face centred.
// `frame` is the square to keep, in pixels of the original: { left, top, size }. It may go past the
// photo's edges; the missing part is filled by repeating the edge pixels (background, shoulders).
async function portrait(from, to, frame, size, encode) {
  const { width, height } = await sharp(src(from)).metadata();
  const pad = {
    left: Math.max(0, -frame.left),
    top: Math.max(0, -frame.top),
    right: Math.max(0, frame.left + frame.size - width),
    bottom: Math.max(0, frame.top + frame.size - height),
  };
  const widened = await sharp(src(from))
    .extend({ ...pad, extendWith: 'copy' })
    .toBuffer();
  const square = await sharp(widened)
    .extract({ left: frame.left + pad.left, top: frame.top + pad.top, width: frame.size, height: frame.size })
    .toBuffer();
  await mkdir(out(to).replace(/\/[^/]+$/, ''), { recursive: true });
  const info = await encode(sharp(square).resize(size, size)).toFile(out(to));
  console.log(`${to}  ${Math.round(info.size / 1024)} KB`);
}

// Stéphane: 827 × 1063 photo; hair from the top, chin at 910 px. Two sizes: cockpit badge, contact page.
for (const size of [128, 320]) {
  await portrait(
    'portrait.jpg',
    `assets/portrait-${size}.webp`,
    { left: -118, top: 0, size: 1063 },
    size,
    (s) => s.webp({ effort: 6, quality: 84 }),
  );
}
// Mano Mathew (Data Visualisation & BI): 320 × 320 copy of his LinkedIn photo; hair at the top edge, chin at 232 px.
await portrait(
  'courses/mano-mathew.jpg',
  'assets/courses/mano-mathew.jpg',
  { left: 7, top: -10, size: 280 },
  320,
  (s) => s.jpeg({ quality: 86, mozjpeg: true }),
);

// Favicons from one SVG.
await copyFile(src('favicon.svg'), out('favicon.svg'));
await sharp(src('favicon.svg'), { density: 300 }).resize(32, 32).png().toFile(out('favicon-32.png'));
await sharp(src('favicon.svg'), { density: 300 })
  .resize(180, 180)
  .flatten({ background: '#061018' })
  .png()
  .toFile(out('apple-touch-icon.png'));

// Link preview image, 1200 × 630: the cockpit with the name and the line from the opening screen.
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#061018" stop-opacity=".92"/><stop offset=".62" stop-color="#061018" stop-opacity=".2"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="230" font-family="'Avenir Next', Avenir, Helvetica, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#a9e7f1">STÉPHANE SINGERY · DATA &amp; ANALYTICS ENGINEER</text>
  <text x="72" y="320" font-family="'Avenir Next', Avenir, Helvetica, Arial, sans-serif" font-size="68" fill="#eaf3f4">Data systems</text>
  <text x="72" y="400" font-family="'Avenir Next', Avenir, Helvetica, Arial, sans-serif" font-size="68" font-style="italic" fill="#a9e7f1">people rely on.</text>
</svg>`);
await sharp(src('cockpit-center-seat.png'))
  .resize(1200, 630, { fit: 'cover', position: 'top' })
  .composite([{ input: text }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(out('assets/social-preview.jpg'));
console.log('favicons and social preview written');
