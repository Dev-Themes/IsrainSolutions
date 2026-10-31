import http from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { resolve, sep, extname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };
export function createStaticServer() {
  const root = resolve('out');
  return http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      let file = resolve(root, '.' + decodeURIComponent(url.pathname));
      if (file !== root && !file.startsWith(root + sep)) throw new Error('Invalid path');
      let info = await stat(file);
      if (info.isDirectory()) {
        if (!url.pathname.endsWith('/')) {
          response.writeHead(301, { Location: url.pathname + '/' + url.search }); response.end(); return;
        }
        file = join(file, 'index.html'); info = await stat(file);
      }
      const data = await readFile(file);
      const headers = { 'Content-Type': file.endsWith('opengraph-image') ? 'image/png' : mime[extname(file)] || 'application/octet-stream', 'Accept-Ranges': 'bytes' };
      const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
      if (range) {
        const start = Number(range[1]); const end = Math.min(range[2] ? Number(range[2]) : info.size - 1, info.size - 1);
        if (start > end) { response.writeHead(416, { 'Content-Range': `bytes */${info.size}` }); response.end(); return; }
        response.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${info.size}`, 'Content-Length': end - start + 1 });
        response.end(request.method === 'HEAD' ? undefined : data.subarray(start, end + 1)); return;
      }
      response.writeHead(200, { ...headers, 'Content-Length': data.length });
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(await readFile(join(root, '404.html')));
    }
  });
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 4173);
  createStaticServer().listen(port, '127.0.0.1', () => console.log(`Static out/ server: http://127.0.0.1:${port}`));
}
