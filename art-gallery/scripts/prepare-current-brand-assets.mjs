import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
// Crop only the blank canvas; the supplied logo artwork is preserved.
await sharp('public/Brand-Asset/2.png').extract({left:250,top:380,width:970,height:335}).png().toFile('public/brand/popart-logo.png');
await sharp('public/Brand-Asset/2.png').extract({left:250,top:380,width:294,height:325}).resize(256,256,{fit:'contain',background:'#ffffff'}).png().toFile('public/brand/popart-symbol.png');
for(const size of [32,180,192]) await sharp('public/brand/popart-symbol.png').resize(size,size).png().toFile(`public/brand/popart-icon-${size}.png`);
const icon=await sharp('public/brand/popart-symbol.png').ensureAlpha().png().toBuffer();
const header=Buffer.alloc(22);header.writeUInt16LE(1,2);header.writeUInt16LE(1,4);header.writeUInt16LE(1,10);header.writeUInt16LE(32,12);header.writeUInt32LE(icon.length,14);header.writeUInt32LE(22,18);
await writeFile('src/app/favicon.ico',Buffer.concat([header,icon]));
console.log('Prepared supplied PopArt Agency logo and browser icons.');

