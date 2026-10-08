import fs from 'fs';
import path from 'path';

// Define expected limits
const MAX_TITLE = 60;
const MAX_DESC = 155;

function checkText(name, text, max) {
  let errors = [];
  if (text.length > max) {
    errors.push(`${name} is ${text.length} chars (max ${max}).`);
  }
  if (text.includes('[') || text.includes(']')) {
    errors.push(`${name} contains bracket placeholders.`);
  }
  return errors;
}

// Quick check of the generated seo.ts
const seoFile = path.join(process.cwd(), 'src/lib/seo.ts');
const content = fs.readFileSync(seoFile, 'utf8');

const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
const descMatch = content.match(/description:\s*["']([^"']+)["']/);

let hasError = false;

if (titleMatch) {
  const errs = checkText('Title', titleMatch[1], MAX_TITLE);
  errs.forEach(e => { console.error('ERROR:', e); hasError = true; });
} else {
  console.error('ERROR: Could not find title in seo.ts');
  hasError = true;
}

if (descMatch) {
  const errs = checkText('Description', descMatch[1], MAX_DESC);
  errs.forEach(e => { console.error('ERROR:', e); hasError = true; });
} else {
  console.error('ERROR: Could not find description in seo.ts');
  hasError = true;
}

if (hasError) {
  process.exit(1);
} else {
  console.log('Metadata checks passed.');
}
