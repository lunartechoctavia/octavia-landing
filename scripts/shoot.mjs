#!/usr/bin/env node
// Screenshot a URL at an exact CSS viewport using the DevTools Protocol.
// Chrome's --window-size has an OS-enforced minimum width on Windows, so it cannot
// reproduce a phone viewport; Emulation.setDeviceMetricsOverride can.
//
//   node scripts/shoot.mjs <url> <out.png> [width] [height] [--full]

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import process from 'node:process';

const [url, out, w = '390', h = '844'] = process.argv.slice(2);
const fullPage = process.argv.includes('--full');
if (!url || !out) { console.error('usage: shoot.mjs <url> <out.png> [w] [h] [--full]'); process.exit(1); }

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const port = 9222 + Number(process.hrtime.bigint() % 500n);

const chrome = spawn(CHROME, [
  '--headless', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${port}`, '--user-data-dir=' + process.env.TEMP + '/oc-shoot-' + port,
  'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch { /* not up yet */ }
    await sleep(250);
  }
  throw new Error('Chrome DevTools endpoint never became available');
}

const ws = new WebSocket(await target());
await new Promise((r) => { ws.onopen = r; });

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
};
const send = (method, params = {}) => new Promise((resolve) => {
  id += 1;
  pending.set(id, resolve);
  ws.send(JSON.stringify({ id, method, params }));
});

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(w), height: Number(h), deviceScaleFactor: 2, mobile: Number(w) < 700,
});
await send('Page.navigate', { url });
await sleep(3500);

const metrics = await send('Runtime.evaluate', {
  expression: `JSON.stringify({vw:document.documentElement.clientWidth,sw:document.documentElement.scrollWidth,bh:document.body.scrollHeight})`,
  returnByValue: true,
});
const m = JSON.parse(metrics.result.value);
console.log(`viewport=${m.vw} scrollWidth=${m.sw} pageHeight=${m.bh}${m.sw > m.vw ? '  << HORIZONTAL OVERFLOW' : ''}`);

if (fullPage) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: Number(w), height: Math.min(m.bh, 16000), deviceScaleFactor: 2, mobile: Number(w) < 700,
  });
  await sleep(600);
}

const shot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(out, Buffer.from(shot.data, 'base64'));
console.log(`wrote ${out}`);

ws.close();
chrome.kill();
process.exit(0);
