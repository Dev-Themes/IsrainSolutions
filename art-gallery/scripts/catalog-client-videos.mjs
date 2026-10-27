import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const folder = path.join(root, "public/videos");
const review = path.join(root, ".animation-review/client-videos");
const base = process.env.REVIEW_BASE_URL || "http://localhost:3000";
const files = fs.readdirSync(folder).filter(name => /\.(mp4|webm|mov|m4v)$/i.test(name)).sort();
fs.mkdirSync(review, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1280 } });
await page.route(`${base}/media-review`, route => route.fulfill({ contentType: "text/html", body: '<html><body style="margin:0;background:#161616"><canvas id="sheet" width="1500" height="1280"></canvas></body></html>' }));
await page.goto(`${base}/media-review`);
const catalog = [];
try {
  for (const [index, name] of files.entries()) {
    const entry = await page.evaluate(async ({ name, index, base }) => {
      const video = document.createElement("video");
      video.preload = "auto"; video.muted = true; video.playsInline = true;
      document.body.append(video);
      const ready = new Promise((resolve, reject) => { video.onloadeddata = resolve; video.onerror = () => reject(new Error(`Cannot decode ${name}: ${video.error?.message}`)); });
      video.src = `${base}/videos/${encodeURIComponent(name)}`;
      await ready;
      const { duration, videoWidth: width, videoHeight: height } = video;
      const sheet = document.querySelector("#sheet");
      const ctx = sheet.getContext("2d");
      const row = index % 4;
      if (row === 0) { ctx.fillStyle = "#161616"; ctx.fillRect(0, 0, 1500, 1280); }
      ctx.fillStyle = "#fffdfc"; ctx.font = "16px sans-serif";
      ctx.fillText(`${index}: ${name.slice(0,100)} | ${width}x${height} | ${duration.toFixed(2)}s`, 12, row * 320 + 24);
      const fractions = [.08, .25, .45, .65, .85];
      const frames = [];
      const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
      const frameContext = canvas.getContext("2d");
      for (const [frame, fraction] of fractions.entries()) {
        const time = Math.min(duration - .1, Math.max(.05, duration * fraction));
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error(`Seek timeout ${name}`)), 15000);
          video.onseeked = () => { clearTimeout(timeout); resolve(); }; video.currentTime = time;
        });
        frameContext.drawImage(video, 0, 0);
        frames.push({ time, data: canvas.toDataURL("image/jpeg", .9).split(",")[1] });
        const scale = Math.min(288 / width, 260 / height);
        ctx.drawImage(video, frame * 300 + (300 - width * scale) / 2, row * 320 + 40 + (260 - height * scale) / 2, width * scale, height * scale);
        ctx.fillStyle = "#f87966"; ctx.font = "13px monospace"; ctx.fillText(`${frame} / ${time.toFixed(2)}s`, frame * 300 + 12, row * 320 + 314);
      }
      video.removeAttribute("src"); video.load(); video.remove();
      return { index, name, width, height, duration, frames };
    }, { name, index, base });
    for (const [frameIndex, frame] of entry.frames.entries()) {
      fs.writeFileSync(path.join(review, `clip-${index}-frame-${frameIndex}.jpg`), Buffer.from(frame.data, "base64"));
      delete frame.data;
    }
    catalog.push(entry);
    if (index % 4 === 3 || index === files.length - 1) await page.locator("#sheet").screenshot({ path: path.join(review, `sheet-${Math.floor(index / 4)}.jpg`), type: "jpeg", quality: 88 });
    console.log(`${index}: ${name} — ${entry.width}x${entry.height}, ${entry.duration.toFixed(2)}s`);
  }
  fs.writeFileSync(path.join(review, "catalog.json"), JSON.stringify(catalog, null, 2));
} finally { await browser.close(); }
