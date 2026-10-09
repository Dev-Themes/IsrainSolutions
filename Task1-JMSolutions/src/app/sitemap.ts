import { MetadataRoute } from 'next'
import { serviceSlugs } from '@/content/service-pages'
import { allLocalSlugs, parseLocalSlug, isIndexable } from '@/lib/local'
import { site } from '@/config/site'

export const dynamic = 'force-static';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  
  const localUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/ac-repair`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];

  const slugs = allLocalSlugs();
  for (const slug of slugs) {
    const hit = parseLocalSlug(slug);
    if (hit && isIndexable(hit.service, hit.area)) {
      localUrls.push({
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...serviceSlugs.map((slug) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...localUrls
  ]
}
