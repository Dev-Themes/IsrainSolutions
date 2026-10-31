import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

const source = await readFile("src/data/projects.ts", "utf8");
const urls = [...new Set([...source.matchAll(/"(https:\/\/images\.unsplash\.com\/[^"]+)"/g)].map(match => match[1]))];
if (!urls.length) throw new Error("No existing Work image URLs found");
console.log(`Preparing ${urls.length} existing Work photos`);
await mkdir("public/images/work", { recursive: true });
await mkdir(".animation-review", { recursive: true });
const manifest = {};
const failures = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    if (new URL(url).hostname !== "images.unsplash.com") throw new Error("Unexpected source host");
    const filename = createHash("sha256").update(url).digest("hex").slice(0, 16) + ".webp";
    let error;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        await sharp(Buffer.from(await response.arrayBuffer())).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public/images/work/${filename}`);
        manifest[url] = `/images/work/${filename}`;
        error = undefined;
        break;
      } catch (failure) { error = failure; }
    }
    if (error) failures.push({ url, error: String(error) });
  }
}
await Promise.all([worker(), worker(), worker()]);
await writeFile(".animation-review/work-image-download.json", JSON.stringify({ manifest, failures }, null, 2));
if (failures.length) {
  console.error(JSON.stringify({ downloaded: Object.keys(manifest).length, total: urls.length, failures }, null, 2));
  process.exitCode = 1;
} else {
  await writeFile("src/data/work-image-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Saved ${urls.length} approved Work photos locally without changing their content.`);
}
