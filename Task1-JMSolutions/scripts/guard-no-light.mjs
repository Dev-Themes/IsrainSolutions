import fs from 'fs';
import path from 'path';

const BANNED_PATTERNS = [
  /\bbg-white\b(?!\/)/,
  /\bbg-(gray|slate|neutral|zinc|stone)-(50|100|200|300)\b/,
  /\btext-black\b/,
  /\bfrom-white\b/,
  /\bto-white\b/,
  /\bvia-white\b/,
  /prefers-color-scheme:\s*light/,
  /background:\s*#fff(?:fff)?\b/i,
  /background-color:\s*white\b/i
];

let failed = false;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next')) {
        walk(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const pattern of BANNED_PATTERNS) {
        if (pattern.test(content)) {
          console.error(`[FAIL] Banned light-theme pattern found in ${fullPath}: ${pattern}`);
          failed = true;
        }
      }
    }
  }
}

walk('./src');

if (failed) {
  console.error("The project contains white/light styles. Fix them before building.");
  process.exit(1);
} else {
  console.log("Dark theme check passed.");
}
