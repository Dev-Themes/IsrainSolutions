import {ImageResponse} from 'next/og';
import {siteConfig as s} from '@/config/site';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:80,width:'100%',height:'100%',background:'#0b1f3a',color:'white'}}><div style={{fontSize:30,color:'#70dae3'}}>{s.name}</div><div style={{fontSize:72,marginTop:40}}>24/7 Water Damage Restoration · Brisbane</div><div style={{fontSize:36,marginTop:40,color:'#f59e0b'}}>{s.phone}</div></div>,size)}
