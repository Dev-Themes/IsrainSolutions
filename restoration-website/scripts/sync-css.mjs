import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const sourceDir = join(process.cwd(), '.next', 'static', 'css');
const target = join(process.cwd(), 'public', 'fallback.css');
const cssFile = readdirSync(sourceDir).find((file) => file.endsWith('.css'));

if (!cssFile) throw new Error('No compiled CSS file found in .next/static/css');
mkdirSync(join(process.cwd(), 'public'), { recursive: true });
copyFileSync(join(sourceDir, cssFile), target);
console.log(`Synced ${cssFile} to public fallback stylesheet`);
