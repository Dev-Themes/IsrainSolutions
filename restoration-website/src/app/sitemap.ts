import type {MetadataRoute} from 'next';
import {siteConfig} from '@/config/site';
// Planned service and area pages must be published before inclusion in the sitemap.
export default function sitemap():MetadataRoute.Sitemap{return [{url:siteConfig.url,lastModified:new Date('2026-11-02'),changeFrequency:'monthly',priority:1}]}
