import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "src/content/media.config.json"), "utf8"));
const output = path.join(root, "public/videos/posters");
const base = process.env.REVIEW_BASE_URL || "http://localhost:3000";
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
await page.route(`${base}/poster-review`, route => route.fulfill({ contentType: "text/html", body: "<html><body></body></html>" }));
await page.goto(`${base}/poster-review`);
try {
  for (const item of manifest.filter(item => !process.argv[2] || item.id === process.argv[2])) {
    const data = await page.evaluate(async ({ item, base }) => {
      const video = document.createElement("video"); video.muted = true; video.preload = "auto";
      document.body.append(video);
      const ready = new Promise((resolve, reject) => { video.onloadeddata = resolve; video.onerror = () => reject(new Error(`Cannot decode ${item.source}`)); });
      video.src = `${base}/videos/${encodeURIComponent(item.source)}`; await ready;
      await new Promise(resolve => { video.onseeked = resolve; video.currentTime = item.posterTime; });
      const crop = item.posterCrop || { left: 0, top: 0, width: video.videoWidth, height: video.videoHeight };
      const canvas = document.createElement("canvas"); canvas.width = crop.width; canvas.height = crop.height;
      canvas.getContext("2d").drawImage(video, crop.left, crop.top, crop.width, crop.height, 0, 0, crop.width, crop.height);
      const poster = canvas.toDataURL("image/jpeg", .96).split(",")[1];
      let thumbnail = poster;
      if (item.thumbnailTime !== undefined) {
        await new Promise(resolve => { video.onseeked = resolve; video.currentTime = item.thumbnailTime; });
        canvas.getContext("2d").drawImage(video, crop.left, crop.top, crop.width, crop.height, 0, 0, crop.width, crop.height);
        thumbnail = canvas.toDataURL("image/jpeg", .96).split(",")[1];
      }
      video.removeAttribute("src"); video.load(); video.remove();
      return { poster, thumbnail };
    }, { item, base });
    const input = Buffer.from(data.poster, "base64");
    await sharp(input).resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true }).webp({ quality: 88 }).toFile(path.join(output, `${item.id}.webp`));
    // Fit the chosen frame in a consistent portrait tile, preserving labels and
    // product silhouettes. A softly extended background fills unused space.
    const thumb = Buffer.from(data.thumbnail, "base64");
    if (item.thumbnailFit === "cover") {
      await sharp(thumb).resize(720, 900, { fit: "cover" }).webp({ quality: 87 }).toFile(path.join(output, `${item.id}-tile.webp`));
    } else {
      const background = await sharp(thumb).resize(720, 900, { fit: "cover" }).blur(30).modulate({ brightness: .8 }).toBuffer();
      const foreground = await sharp(thumb).resize(720, 900, { fit: "inside" }).toBuffer({ resolveWithObject: true });
      await sharp(background).composite([{ input: foreground.data, left: Math.round((720 - foreground.info.width) / 2), top: Math.round((900 - foreground.info.height) / 2) }]).webp({ quality: 87 }).toFile(path.join(output, `${item.id}-tile.webp`));
    }
    console.log(`Poster: ${item.id} at ${item.posterTime.toFixed(2)}s`);
  }
} finally { await browser.close(); }
