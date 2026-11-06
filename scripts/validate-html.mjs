// W3C validation of every built page with the Nu HTML Checker (the validator behind validator.w3.org), run offline.
// Needs Java. Fails on errors; warnings are printed by `--warnings` only.
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const vnu = createRequire(import.meta.url)('vnu-jar');
const dir = fileURLToPath(new URL('../build/client/', import.meta.url));
const args = ['-jar', vnu, '--format', 'text', '--skip-non-html', dir];
if (!process.argv.includes('--warnings')) args.splice(2, 0, '--errors-only');
const run = spawnSync('java', args, { encoding: 'utf8' });
const out = `${run.stdout}${run.stderr}`.replaceAll(`file:${dir}`, '/').trim();
console.log(out || 'No errors found.');
process.exit(run.status ?? 1);
