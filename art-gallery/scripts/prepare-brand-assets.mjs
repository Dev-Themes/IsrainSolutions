import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const source = join(process.cwd(), "public", "Brand Asset");
const output = join(process.cwd(), "public", "brand");
await mkdir(output, { recursive: true });
const transparent = join(source, "Transparent logo.png");
const plain = join(source, "Logo.png");

// Crop empty margins only; retain the supplied artwork and original files.
await sharp(transparent)
  .extract({ left: 275, top: 70, width: 1120, height: 820 })
  .resize({ width: 840 })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(join(output, "forme-logo.webp"));
const symbol = await sharp(transparent)
  .extract({ left: 530, top: 70, width: 680, height: 600 })
  .resize(144, 128, { fit: "contain", background: "#00000000" })
  .png().toBuffer();
const wordmark = await sharp(transparent)
  .extract({ left: 278, top: 695, width: 1120, height: 188 })
  .resize(400, 68, { fit: "contain", background: "#00000000" })
  .png().toBuffer();
await sharp({ create: { width: 580, height: 144, channels: 4, background: "#00000000" } })
  .composite([{ input: symbol, left: 0, top: 8 }, { input: wordmark, left: 172, top: 38 }])
  .webp({ quality: 94, alphaQuality: 100 })
  .toFile(join(output, "forme-lockup.webp"));

// Image #2 is the sole source for the social card. Remove excess background
// above/below, preserving the complete symbol and wordmark at 1200 × 630.
await sharp(plain).resize({ width: 1200 })
  .extract({ left: 0, top: 285, width: 1200, height: 630 })
  .png({ compressionLevel: 9 })
  .toFile(join(output, "opengraph.png"));

const icon = sharp(plain).extract({ left: 350, top: 285, width: 585, height: 515 });
for (const size of [32, 180, 192, 256]) {
  await icon.clone().resize(size, size, { fit: "contain", background: "#080808" })
    .png().toFile(join(output, `icon-${size}.png`));
}
const png = await icon.clone().resize(32, 32, { fit: "contain", background: "#080808" }).ensureAlpha().png().toBuffer();
const header = Buffer.alloc(22);
header[6] = 32; header[7] = 32;
header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
await writeFile(join(process.cwd(), "src", "app", "favicon.ico"), Buffer.concat([header, png]));
console.log("Prepared transparent logo, header lockup, Image #2 social card, and brand icons.");
