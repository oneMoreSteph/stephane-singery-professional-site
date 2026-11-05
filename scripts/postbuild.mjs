// GitHub Pages serves 404.html for unknown addresses. The SPA fallback renders the app's own 404 page.
import { copyFile } from 'node:fs/promises';

const dir = new URL('../build/client/', import.meta.url);
await copyFile(new URL('__spa-fallback.html', dir), new URL('404.html', dir));
console.log('404.html written');
