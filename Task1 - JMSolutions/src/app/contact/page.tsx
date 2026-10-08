import { Metadata } from 'next';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { RequestSection } from '@/components/sections/contact/RequestSection';
import { ProcessSteps } from '@/components/sections/contact/ProcessSteps';
import { ContactGuarantees } from '@/components/sections/contact/ContactGuarantees';
import { ContactFaq } from '@/components/sections/contact/ContactFaq';
import { contactPageData } from '@/content/contact';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: {
    absolute: contactPageData.seo.title,
  },
  description: contactPageData.seo.description,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: contactPageData.seo.title,
    description: contactPageData.seo.description,
    siteName: site.name,
    locale: 'en_US',
    // image: '/opengraph-image' handled by file conventions
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const isDummy = site.isDummy;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${site.url}/contact#contactpage`,
        "url": `${site.url}/contact`,
        "name": contactPageData.seo.title,
        "description": contactPageData.seo.description,
        "mainEntity": { "@id": `${site.url}/#business` },
        "breadcrumb": { "@id": `${site.url}/contact#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}/contact#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": site.url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": `${site.url}/contact`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/contact#faq`,
        "mainEntity": contactPageData.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "HVACBusiness",
        "@id": `${site.url}/#business`,
        "name": site.name,
        "url": site.url,
        ...(!isDummy && {
          "telephone": site.phone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": site.address,
            "addressLocality": site.city,
            "addressRegion": site.state,
            "postalCode": site.zip
          },
          "areaServed": site.serviceAreas?.map(area => ({
            "@type": "City",
            "name": area
          })),
          "foundingDate": site.founded?.toString(),
          "sameAs": site.socials ? Object.values(site.socials).filter(Boolean) : []
        })
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      
      {/* Emergency Strip */}
      <div className="w-full bg-ember text-white py-3 px-4 text-center text-sm font-bold tracking-wide uppercase font-nav flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        24/7 Emergency Service Available — <a href={`tel:${site.phone.replace(/[^0-9]/g, '')}`} className="underline hover:text-white/80">{site.phone}</a>
      </div>

      <main id="main">
        <ContactHero data={contactPageData} />
        <RequestSection />
        <ContactGuarantees />
        <ProcessSteps data={contactPageData.process} />
        <ContactFaq data={contactPageData.faqs} />
      </main>
    </>
  );
}
