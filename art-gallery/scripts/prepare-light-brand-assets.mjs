import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const source = "public/Brand Asset/white-theme-logo.png";
const output = "public/brand";
await mkdir(output, { recursive: true });
// Preserve the supplied artwork. Remove only empty margins and arrange its
// existing symbol and wordmark to match the dark header lockup dimensions.
await sharp(source).extract({ left: 120, top: 120, width: 1210, height: 890 })
  .resize({ width: 840 }).webp({ quality: 94, alphaQuality: 100 }).toFile(`${output}/forme-logo-light.webp`);
const symbol = await sharp(source).extract({ left: 414, top: 125, width: 744, height: 672 })
  .resize(144, 128, { fit: "contain", background: "#00000000" }).png().toBuffer();
const wordmark = await sharp(source).extract({ left: 120, top: 812, width: 1210, height: 200 })
  .resize(400, 68, { fit: "contain", background: "#00000000" }).png().toBuffer();
await sharp({ create: { width: 580, height: 144, channels: 4, background: "#00000000" } })
  .composite([{ input: symbol, left: 0, top: 8 }, { input: wordmark, left: 172, top: 38 }])
  .webp({ quality: 94, alphaQuality: 100 }).toFile(`${output}/forme-lockup-light.webp`);
console.log("Prepared light-theme logos from the supplied original.");
