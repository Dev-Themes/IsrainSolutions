import type { Metadata } from 'next';

export function aboutMetadata(): Metadata {
  return {
    title: "About JM Comfort Solutions | Honest HVAC & Refrigeration",
    description: "Meet JM Comfort Solutions, a locally owned heating, cooling and refrigeration team that repairs before it replaces. Honest advice, 24/7 service.",
    alternates: {
      canonical: '/about',
    },
    openGraph: {
      type: 'website',
      url: '/about',
      title: "About JM Comfort Solutions | Honest HVAC & Refrigeration",
      description: "Meet JM Comfort Solutions, a locally owned heating, cooling and refrigeration team that repairs before it replaces. Honest advice, 24/7 service.",
      siteName: "JM Comfort Solutions",
      locale: 'en_US',
      images: ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function servicesMetadata(): Metadata {
  return {
    title: "HVAC & Refrigeration Services | JM Comfort Solutions",
    description: "Residential and commercial heating, cooling and refrigeration from JM Comfort Solutions. Repairs, installs, tune-ups and 24/7 emergency service.",
    alternates: {
      canonical: '/services',
    },
    openGraph: {
      type: 'website',
      url: '/services',
      title: "HVAC & Refrigeration Services | JM Comfort Solutions",
      description: "Residential and commercial heating, cooling and refrigeration from JM Comfort Solutions. Repairs, installs, tune-ups and 24/7 emergency service.",
      siteName: "JM Comfort Solutions",
      locale: 'en_US',
      images: ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

import type { ServicePageData } from '@/content/service-pages';

export function serviceDetailMetadata(page: ServicePageData): Metadata {
  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: `/services/${page.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `/services/${page.slug}`,
      title: page.seo.title,
      description: page.seo.description,
      siteName: "JM Comfort Solutions",
      locale: 'en_US',
      images: [page.heroImage],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


import { getAreaCtx } from './local';

export function buildLocalMetadata(
  service: { slug: string; enabled: boolean },
  area: any | null,
  options: { index: boolean; isHub?: boolean }
): Metadata {
  const isHub = options.isHub || false;
  const ctx = getAreaCtx(area, isHub);
  
  let title = '';
  if (isHub) {
    title = `AC Repair in ${ctx.metro} | JM Comfort Solutions`;
  } else {
    const clauses = [`AC Repair ${ctx.town} ${ctx.st}`];
    if (ctx.features.sameDay) clauses.push('Same-Day');
    if (ctx.features.emergency247) clauses.push('24/7 Service');
    
    title = clauses.join(' | ');
    if (title.length > 60) {
      title = `AC Repair ${ctx.town} ${ctx.st} | Fast & Honest Service`;
      if (title.length > 60) {
         title = `AC Repair ${ctx.town} ${ctx.st}`;
      }
    }
  }

  const descClauses = [];
  if (ctx.features.sameDay) descClauses.push('Same-day service');
  if (ctx.features.emergency247) descClauses.push('24/7 emergency help');
  descClauses.push('honest diagnostics');
  
  const description = `AC repair in ${ctx.town}, ${ctx.st} from JM Comfort Solutions. ${descClauses.join(', ')}. Repair first, replace only when it makes sense.`;
  
  // Need to get the site from config since site is missing in this file scope (seo.ts imports it though it wasn't shown in seo.ts)
  // Let me just import site since I can't rely on it being present at the top level in seo.ts based on the cat output
  // Wait, I didn't see `import { site }` in seo.ts.
  
  // So I need to use `import { site }` somewhere. The import might be added already if I append it? 
  // Wait, I can just dynamically import or use process.cwd() or something. Let me just add `import { site }` at the top. But I can't append at the top. 
  // I will just read site from another import or do `import { site } from '@/config/site'` inside the function, or at the end. In ES modules, imports can be anywhere at top level.
  return {
    title,
    description,
    alternates: {
      canonical: `/${service.slug}${isHub ? '' : '-' + area.slug}`,
    },
    robots: {
      index: options.index,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `/${service.slug}${isHub ? '' : '-' + area.slug}`,
      siteName: "JM Comfort Solutions",
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}
