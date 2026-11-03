import type { Metadata, Viewport } from 'next';
import { siteConfig as s } from '@/config/site';
import './globals.css';
const title = 'Property Damage Restoration Brisbane | Brisbane Restoration Co.';
const description = `Professional water damage restoration, flood cleanup and mould remediation in Brisbane. Explore restoration services and contact ${s.name} for assistance.`;
export const metadata: Metadata = { metadataBase: new URL(s.url), title: { default: title, template: `%s | ${s.name}` }, description, alternates: { canonical: '/' }, robots: { index: true, follow: true }, applicationName: s.name, creator: s.name, publisher: s.name, formatDetection: { telephone: false }, icons: { icon: '/icon.svg' }, openGraph: { type: 'website', locale: 'en_AU', siteName: s.name, title, description, images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${s.name} property restoration` }] }, twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] } };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0B2433' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en-AU"><body><a className="skip" href="#main">Skip to content</a>{children}</body></html>; }
