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
