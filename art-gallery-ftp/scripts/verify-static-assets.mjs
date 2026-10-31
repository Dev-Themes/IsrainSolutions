import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
import { createStaticServer } from './serve-static.mjs';
const routes = JSON.parse(await readFile('.next/prerender-manifest.json', 'utf8'));
const paths = Object.keys(routes.routes).filter(p => /^\/(en|fr|ro)(\/|$)/.test(p));
const assets = new Set(), links = new Set(), remoteImages = new Set();
for (const path of paths) {
  const html = await readFile(join('out', path, 'index.html'), 'utf8');
  for (const match of html.matchAll(/\bsrc="(https:[^"]*)"/g)) remoteImages.add(match[1].replaceAll('&amp;', '&'));
  for (const match of html.matchAll(/\b(src|href|poster)="(\/[^"]*)"/g)) {
    const value = match[2].replaceAll('&amp;', '&');
    (match[1] === 'href' && !/\.(css|js|woff2|png|ico)/.test(value) ? links : assets).add(value);
  }
}
const server = createStaticServer();
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
try {
  for (const link of links) {
    const response = await fetch(new URL(link, base), { method: 'HEAD' });
    assert.equal(response.status, 200, `Broken link ${link}`);
  }
  for (const asset of assets) {
    const response = await fetch(new URL(asset, base), { method: 'HEAD' });
    assert.equal(response.status, 200, `Missing asset ${asset}`);
    const path = resolve('out', '.' + decodeURIComponent(new URL(asset, base).pathname));
    assert((await stat(path)).size > 0, `Empty asset ${asset}`);
  }
  await mkdir('docs/static-verification', { recursive: true });
  const report = { checkedAt: new Date().toISOString(), pages: paths.length, internalLinks: links.size, assets: assets.size, failures: 0, remoteImagesNotVerified: [...remoteImages] };
  await writeFile('docs/static-verification/asset-audit.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
} finally { await new Promise(r => server.close(r)); }
