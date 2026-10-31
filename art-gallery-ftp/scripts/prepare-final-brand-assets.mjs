import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Preserve every supplied pixel; remove only the transparent outer margins.
const source = 'public/Brand-Asset/final_logo.png';
const full = await sharp(source).extract({ left: 476, top: 761, width: 1060, height: 803 }).png().toBuffer();
const lockup = await sharp(source).extract({ left: 476, top: 761, width: 1060, height: 414 }).png().toBuffer();
await writeFile('public/brand/final-logo.png', full);
await writeFile('public/brand/final-lockup.png', lockup);
// The compact browser mark uses the original blue dot, p, and white wave.
const symbol = await sharp(source).extract({ left: 476, top: 761, width: 260, height: 414 })
  .resize(256, 256, { fit: 'contain', background: '#fff' }).flatten({ background: '#fff' }).png().toBuffer();
await writeFile('public/brand/final-symbol.png', symbol);
for (const size of [32, 180, 192, 256]) {
  const icon = await sharp(symbol).resize(size, size).png().toBuffer();
  await writeFile(`public/brand/final-icon-${size}.png`, icon);
}
const icon = await sharp(symbol).resize(32, 32).ensureAlpha().png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header[6] = 32; header[7] = 32;
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(icon.length, 14); header.writeUInt32LE(22, 18);
await writeFile('src/app/favicon.ico', Buffer.concat([header, icon]));
const socialLogo = await sharp(full).resize({ height: 510 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#fff' } })
  .composite([{ input: socialLogo, gravity: 'centre' }]).png().toFile('public/brand/opengraph.png');
// Keep existing public asset URLs compatible with cached pages and saved links.
await writeFile('public/brand/popart-logo.png', full);
await writeFile('public/brand/popart-symbol.png', symbol);
for (const size of [32, 180, 192, 256]) {
  const png = await sharp(symbol).resize(size, size).png().toBuffer();
  await writeFile(`public/brand/icon-${size}.png`, png);
  if (size !== 256) {
    await writeFile(`public/brand/popart-icon-${size}.png`, png);
    await writeFile(`public/brand/new-logo-icon-${size}.png`, png);
  }
}
for (const name of ['forme-logo.webp', 'forme-logo-light.webp', 'forme-lockup.webp']) {
  await sharp(full).webp({ quality: 95, alphaQuality: 100 }).toFile(`public/brand/${name}`);
}
for (const [name, png, width, height] of [
  ['popart-logo.svg', full, 1060, 803], ['popart-icon.svg', symbol, 256, 256],
]) {
  await writeFile(`public/brand/${name}`, `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}"><image width="${width}" height="${height}" xlink:href="data:image/png;base64,${png.toString('base64')}"/></svg>`);
}
console.log('Prepared final logo, compact lockup, browser icons, and social image.');
