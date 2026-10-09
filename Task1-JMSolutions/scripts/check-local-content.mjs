import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

// Read serviceAreas
const content = fs.readFileSync(path.join(root, 'src/config/serviceAreas.ts'), 'utf-8');
const areasMatch = content.match(/export const serviceAreas: ServiceArea\[\] = \[([\s\S]*?)\];/);

if (areasMatch) {
  console.log('Uniqueness Report:\n');
  const items = areasMatch[1].split('},').filter(s => s.trim().length > 0);
  
  let markdown = '# Local Content Uniqueness Report\n\n';
  markdown += '| Town | Words | Indexable |\n|---|---|---|\n';

  for (let itemStr of items) {
    let slug = itemStr.match(/slug:\s*'([^']+)'/)?.[1] || itemStr.match(/slug:\s*"([^"]+)"/)?.[1];
    let town = itemStr.match(/town:\s*'([^']+)'/)?.[1] || itemStr.match(/town:\s*"([^"]+)"/)?.[1];
    if (!slug) continue;

    let words = 0;
    
    // Count localNote
    const localNoteMatch = itemStr.match(/localNote:\s*["']([^"']+)["']/);
    if (localNoteMatch) {
      words += localNoteMatch[1].split(/\s+/).length;
    }

    // Count neighborhoods
    const neighborhoodsMatch = itemStr.match(/neighborhoods:\s*\[(.*?)\]/);
    if (neighborhoodsMatch && neighborhoodsMatch[1].trim()) {
      words += neighborhoodsMatch[1].replace(/['"]/g, '').split(',').join(' ').split(/\s+/).filter(Boolean).length;
    }

    // Since we can't fully execute TS in a quick MJS script safely without transpiling, 
    // we'll estimate based on strings if needed, or simply note the logic.
    // Realistically, the prompt wants to check if it has 150 words.
    
    // Check placeholder
    const isPlaceholder = /placeholder:\s*true/.test(itemStr);
    
    const isIndexable = words >= 150 && !isPlaceholder;
    
    markdown += `| ${town || slug} | ${words} | ${isIndexable ? 'Yes' : 'No'} |\n`;
    console.log(`${town || slug}: ${words} words -> Indexable: ${isIndexable}`);
  }
  
  fs.mkdirSync(path.join(root, 'docs/qa/ac-repair'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs/qa/ac-repair/uniqueness.md'), markdown);
  console.log('\nWrote report to docs/qa/ac-repair/uniqueness.md');
} else {
  console.error('Could not parse serviceAreas.ts');
}
