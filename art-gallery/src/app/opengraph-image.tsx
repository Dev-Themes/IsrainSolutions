import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const alt = 'PopArt Agency | Official brand identity';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image() {
  const logo=await readFile(join(process.cwd(),'public','brand','final-logo.png'));
  return new ImageResponse(
    <div style={{display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',background:'#fff'}}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${logo.toString('base64')}`} alt="" width={673} height={510}/>
    </div>,size,
  );
}
