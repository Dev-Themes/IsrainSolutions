import type {Metadata,Viewport} from 'next';
import {siteConfig as s} from '@/config/site';
import './globals.css';
const title='Water Damage Restoration Brisbane | 24/7 Flood Help';
const description=`24/7 water damage, flood and mould restoration in Brisbane. Insurance claim support and a free assessment. Call ${s.phone} for local help day or night.`;
export const metadata:Metadata={metadataBase:new URL(s.url),title:{default:title,template:`%s | ${s.name}`},description,alternates:{canonical:'/'},robots:{index:true,follow:true},applicationName:s.name,creator:s.name,publisher:s.name,formatDetection:{telephone:false},icons:{icon:'/icon.svg'},openGraph:{type:'website',locale:'en_AU',siteName:s.name,title,description,images:[{url:'/opengraph-image',width:1200,height:630,alt:s.name}]},twitter:{card:'summary_large_image',title,description,images:['/opengraph-image']}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#0B1F3A'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-AU"><body><a className="skip" href="#main">Skip to content</a>{children}</body></html>}
