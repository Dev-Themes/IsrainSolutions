import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { createStaticServer } from './serve-static.mjs';

// These are selected frames of the existing client Ricinus film, not substitutes
// for any of the recovered case-study images. No source video is modified.
const server = createStaticServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(base);
  await mkdir('public/images/product-service', { recursive: true });
  for (const [name, time] of [['product', 6], ['detail', 8], ['final', 17]]) {
    const data = await page.evaluate(async ({ base, time }) => {
      const video = document.createElement('video');
      video.muted = true;
      const ready = new Promise((resolve, reject) => { video.onloadeddata = resolve; video.onerror = reject; });
      video.src = `${base}/videos/Ricinus_ad_sound_effects.mp4`;
      document.body.append(video);
      await ready;
      await new Promise(resolve => { video.onseeked = resolve; video.currentTime = time; });
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const result = canvas.toDataURL('image/png').split(',')[1];
      video.removeAttribute('src'); video.load(); video.remove();
      return result;
    }, { base, time });
    const output = await sharp(Buffer.from(data, 'base64')).webp({ quality: 94 }).toBuffer();
    await writeFile(`public/images/product-service/ricinus-${name}.webp`, output);
    console.log(`Ricinus ${name}: original frame at ${time}s`);
  }
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
