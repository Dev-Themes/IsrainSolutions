import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve('out');
// Next 16.4 on Windows leaves backslash-separated RSC segment filenames nested
// in directories. The browser requests the equivalent dot-separated filename.
// Copy them to the portable URL form without changing framework/node_modules.
async function normalizeSegments(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const target = join(directory, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('__next.')) {
      async function copySegments(folder, parts = []) {
        for (const child of await readdir(folder, { withFileTypes: true })) {
          if (child.isDirectory()) await copySegments(join(folder, child.name), [...parts, child.name]);
          else await writeFile(join(directory, [entry.name, ...parts, child.name].join('.')), await readFile(join(folder, child.name)));
        }
      }
      await copySegments(target);
    } else await normalizeSegments(target);
  }
}
await normalizeSegments(root);
const settings = JSON.parse(await readFile('src/content/site.config.json', 'utf8'));
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || settings.url).origin;
const manifest = JSON.parse(await readFile('.next/prerender-manifest.json', 'utf8'));
const routes = Object.keys(manifest.routes).filter(route => /^\/(ro|en|fr)(\/|$)/.test(route));

function redirectHtml(target) {
  const canonical = new URL(target, origin).href;
  // JS preserves query strings and anchors; noscript retains automatic navigation.
  return `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${canonical}"><title>PopArt Agency</title><script>const target=new URL(${JSON.stringify(target)},location.origin);target.search=location.search;if(location.hash)target.hash=location.hash;location.replace(target.href);</script><noscript><meta http-equiv="refresh" content="0;url=${target}"></noscript></head><body><a href="${target}">Continuă / Continue →</a></body></html>`;
}
async function alias(path, target) {
  const directory = join(root, path);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), redirectHtml(target));
}
await alias('', '/ro/');
// Preserve only the existing unprefixed compatibility aliases.
for (const route of routes.filter(route => /^\/ro\/(work|products|about|contact|portfolio|packages)(\/|$)/.test(route))) {
  const target = route.replace(/\/$/, '') + '/';
  await alias(route.slice('/ro/'.length), target);
}
// Extension-bearing build-time Open Graph image needs an explicit MIME type on Apache.
await writeFile(join(root, '.htaccess'), `# Static FTP deployment: no Node.js and no SPA fallback.\nDirectoryIndex index.html\nErrorDocument 404 /404.html\n<IfModule mod_mime.c>\n  <Files "opengraph-image">\n    ForceType image/png\n  </Files>\n</IfModule>\n`);
if (!(await stat(join(root, 'ro/index.html'))).isFile()) throw new Error('Romanian home missing');
await writeFile('.next/static-export-routes.json', JSON.stringify(routes, null, 2));
console.log(`Static export prepared at ${root}. Legal pages enabled.`);
