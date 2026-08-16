#!/usr/bin/env node

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PORT = Number(process.env.PORT || 4173);
const types = {'.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml'};

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
  const candidates = pathname === '/blog'
    ? ['blog.html']
    : pathname === '/'
      ? ['index.html']
      : [pathname.slice(1), `${pathname.slice(1)}.html`, path.join(pathname.slice(1), 'index.html')];
  const file = candidates.map((candidate) => path.resolve(ROOT, candidate)).find((candidate) => candidate.startsWith(ROOT + path.sep) && fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!file) { response.writeHead(404, {'content-type': 'text/plain'}); response.end('Not found'); return; }
  response.writeHead(200, {'content-type': `${types[path.extname(file).toLowerCase()] || 'application/octet-stream'}; charset=utf-8`});
  fs.createReadStream(file).pipe(response);
}).listen(PORT, '127.0.0.1', () => console.log(`Octavia preview: http://127.0.0.1:${PORT}`));
