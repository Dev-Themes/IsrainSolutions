import { ImageResponse } from 'next/og';
import { siteConfig as s } from '@/config/site';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',padding:76,width:'100%',height:'100%',background:'#0b2433',color:'white'}}><div style={{display:'flex',fontSize:28,color:'#e6a27e',letterSpacing:2}}>{s.name.toUpperCase()}</div><div style={{display:'flex',flexDirection:'column',fontSize:68,lineHeight:1.05,maxWidth:900}}>Property damage restoration<div style={{display:'flex',color:'#e6a27e'}}>Brisbane</div></div><div style={{display:'flex',fontSize:28,color:'#dce7e9'}}>Water · flood · mould · storm damage</div></div>, size); }
