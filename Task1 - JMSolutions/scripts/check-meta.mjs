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

const filesToCheck = [
  'src/lib/seo.ts',
  'src/content/contact.ts',
];

let hasError = false;
let seenTitles = new Set();
let seenDescs = new Set();

filesToCheck.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  // Simple regex extraction. Handles simple string assignments
  const titles = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const descs = [...content.matchAll(/description:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

  titles.forEach(title => {
    const errs = checkText(`Title in ${file}`, title, MAX_TITLE);
    errs.forEach(e => { console.error('ERROR:', e); hasError = true; });
    if (seenTitles.has(title)) {
      console.error(`ERROR: Duplicate title found: ${title}`);
      hasError = true;
    }
    seenTitles.add(title);
  });

  descs.forEach(desc => {
    const errs = checkText(`Description in ${file}`, desc, MAX_DESC);
    errs.forEach(e => { console.error('ERROR:', e); hasError = true; });
    if (seenDescs.has(desc)) {
      console.error(`ERROR: Duplicate description found: ${desc}`);
      hasError = true;
    }
    seenDescs.add(desc);
  });
});

if (hasError) {
  process.exit(1);
} else {
  console.log('Metadata checks passed.');
}
