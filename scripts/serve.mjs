// Serves build/client the way GitHub Pages does: a folder's index.html for each address, 404.html otherwise.
// Usage: node scripts/serve.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('../build/client/', import.meta.url).pathname;
const port = Number(process.argv[2] || 8901);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.obj': 'text/plain',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.data': 'text/x-script',
};

async function file(path) {
  try {
    const s = await stat(path);
    return s.isDirectory() ? file(join(path, 'index.html')) : path;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const target = normalize(join(root, url));
  if (!target.startsWith(root)) return res.writeHead(403).end();
  const found = await file(target);
  const path = found ?? join(root, '404.html');
  res.writeHead(found ? 200 : 404, {
    'content-type': types[extname(path)] ?? 'application/octet-stream',
    'cache-control': 'no-cache',
  });
  res.end(await readFile(path));
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}`));
