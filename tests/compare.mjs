// Compares two folders of screenshots. Usage: node tests/compare.mjs <before-dir> <after-dir> [out-dir]
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';

const [before, after, out] = process.argv.slice(2);
if (out) mkdirSync(out, { recursive: true });
const rows = [];
for (const name of readdirSync(before).filter((f) => f.endsWith('.png')).sort()) {
  let b, a;
  try {
    b = await sharp(`${before}/${name}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    a = await sharp(`${after}/${name}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  } catch {
    rows.push([name, 'missing']);
    continue;
  }
  if (b.info.width !== a.info.width || b.info.height !== a.info.height) { rows.push([name, 'size differs']); continue; }
  const { width, height } = b.info;
  const mask = Buffer.alloc(width * height);
  let changed = 0;
  for (let i = 0, p = 0; i < b.data.length; i += 3, p++) {
    const d = Math.abs(b.data[i] - a.data[i]) + Math.abs(b.data[i + 1] - a.data[i + 1]) + Math.abs(b.data[i + 2] - a.data[i + 2]);
    if (d > 48) { changed++; mask[p] = 255; }
  }
  const pct = (changed / (width * height)) * 100;
  rows.push([name, pct]);
  if (out && pct > 0.2) await sharp(mask, { raw: { width, height, channels: 1 } }).png().toFile(`${out}/${name}`);
}
rows.sort((x, y) => (typeof y[1] === 'number' ? y[1] : 999) - (typeof x[1] === 'number' ? x[1] : 999));
for (const [n, v] of rows) console.log(typeof v === 'number' ? `${v.toFixed(2).padStart(6)}%  ${n}` : `   ${v}  ${n}`);
