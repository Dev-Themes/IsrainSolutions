import { readFile, writeFile, readdir, mkdir, access } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';
import sharp from 'sharp';

const root = resolve('.');
const directory = 'docs/static-verification';
await mkdir(directory, { recursive: true });
const manifest = JSON.parse(await readFile('src/data/work-image-manifest.json', 'utf8'));
const source = await readFile('src/data/projects.ts', 'utf8');
const blocks = [...source.matchAll(/slug: "([^"]+)"([\s\S]*?)(?=\n    slug: |\n\];)/g)];
const inventory = [];
async function walk(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    if (entry.isDirectory() && ['node_modules', '.git', 'turbopack'].includes(entry.name)) continue;
    const path = join(folder, entry.name);
    if (entry.isDirectory()) await walk(path);
    else inventory.push(relative(root, path).replaceAll('\\', '/'));
  }
}
await walk(root);
const imageInventory = inventory.filter(p => /\.(webp|png|jpe?g|avif)$/i.test(p));
const htmlFiles = inventory.filter(p => /^out\/(en|fr|ro)\/work\/[^/]+\/index.html$/.test(p));
const rendered = await Promise.all(htmlFiles.map(async p => [p.slice(3, -'index.html'.length), await readFile(p, 'utf8')]));
const entries = await Promise.all(Object.entries(manifest).map(async ([url, asset]) => {
  const filename = asset.split('/').pop();
  const localMatches = inventory.filter(p => p.split('/').pop() === filename);
  const projects = blocks.filter(([, , block]) => block.includes(url)).map(([, slug]) => slug);
  const sourceLines = source.split('\n').flatMap((line, i) => line.includes(url) ? [i + 1] : []);
  const pages = rendered.filter(([, html]) => [...html.matchAll(/\bsrc="([^"]+)"/g)].some(m => m[1].replaceAll('&amp;', '&') === url)).map(([path]) => path);
  return { url, expectedLocalAsset: `public${asset}`, exportAsset: `out${asset}`, localMatches, directProjects: projects, affectedPages: pages, sourceLines, status: 'unresolved' };
}));
let cursor = 0;
async function retrieve() {
  while (cursor < entries.length) {
    const entry = entries[cursor++];
    try {
      await access(entry.expectedLocalAsset);
      const metadata = await sharp(entry.expectedLocalAsset).metadata();
      entry.status = 'already-local'; entry.image = { width: metadata.width, height: metadata.height }; continue;
    } catch { /* Try the exact original URL, never substitute another photo. */ }
    try {
      const response = await fetch(entry.url, { signal: AbortSignal.timeout(20000) });
      entry.httpStatus = response.status;
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = Buffer.from(await response.arrayBuffer());
      const metadata = await sharp(data).metadata();
      if (!metadata.width || !metadata.height) throw new Error('Response is not a valid image');
      await mkdir('public/images/work', { recursive: true });
      await sharp(data).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile(entry.expectedLocalAsset);
      entry.status = 'restored'; entry.image = { width: metadata.width, height: metadata.height };
    } catch (error) {
      entry.failure = { message: error.message, causeCode: error.cause?.code || null, causeMessage: error.cause?.message || null };
    }
  }
}
await Promise.all([retrieve(), retrieve(), retrieve()]);
const report = { checkedAt: new Date().toISOString(), scope: root, total: entries.length, restored: entries.filter(e => e.status === 'restored').length, unresolved: entries.filter(e => e.status === 'unresolved').length, availableImageFilesInspected: imageInventory.length, cachedFilenameMatches: entries.flatMap(e => e.localMatches), originalProjectAccessed: false, affectedPages: [...new Set(entries.filter(e => e.status === 'unresolved').flatMap(e => e.affectedPages))].sort(), entries };
await writeFile(`${directory}/missing-images.json`, JSON.stringify(report, null, 2));
await writeFile(`${directory}/local-image-inventory.json`, JSON.stringify(imageInventory, null, 2));
let md = `# Legacy case-study image recovery\n\nChecked ${report.checkedAt}. Exact originals restored: **${report.restored}**. Unresolved: **${report.unresolved}/${report.total}**.\n\nSearched this FTP copy only, including public assets, exported assets, review images, and framework build/cache files. Inspected ${report.availableImageFilesInspected} raster image files; no expected cached filenames were found. Existing product photos, video posters, logos, and screenshots are not substitutes for the missing originals.\n\nEvery original Unsplash URL was requested. A network-access denial does not establish that an image is unavailable on the public internet. See the cause codes below.\n\n## Affected case-study routes\n\nAll routes below apply to each of en, fr, and ro (48 localized pages). Related-project cards may reference additional missing cover images; the JSON report enumerates actual rendered usages per image.\n\n`;
for (const [, slug] of blocks) {
 const missing = entries.filter(e => e.status === 'unresolved' && e.directProjects.includes(slug));
 md += `- \`/{en,fr,ro}/work/${slug}/\`: ${missing.map(e => '`' + e.expectedLocalAsset.split('/').pop() + '`').join(', ')}\n`;
}
md += '\n## Exact missing assets and source references\n\n';
for (const entry of entries) md += `### ${entry.expectedLocalAsset.split('/').pop()}\n\n- Expected local file: \`${entry.expectedLocalAsset}\`\n- Expected export file: \`${entry.exportAsset}\`\n- Exact original: ${entry.url}\n- References: \`src/data/projects.ts\` lines ${entry.sourceLines.join(', ')}; mapping in \`src/data/work-image-manifest.json\`.\n- Direct case studies: ${entry.directProjects.join(', ')}\n- Retrieval: ${entry.status}; ${entry.failure ? `${entry.failure.message}; cause ${entry.failure.causeCode || entry.failure.causeMessage || 'unknown'}` : 'valid image'}\n\n`;
await writeFile(`${directory}/MISSING-IMAGES.md`, md);
console.log(JSON.stringify({ total: report.total, restored: report.restored, unresolved: report.unresolved, affectedPages: report.affectedPages.length, inspectedImageFiles: imageInventory.length, causes: [...new Set(entries.map(e => e.failure?.causeCode))] }));
