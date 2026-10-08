export function aboutSchema() {
  const siteUrl = 'https://jmcomfort.com'; // Use actual URL or placeholder logic

  const aboutPage = {
    "@type": "AboutPage",
    "@id": `${siteUrl}/about#webpage`,
    "url": `${siteUrl}/about`,
    "name": "About JM Comfort Solutions | Honest HVAC & Refrigeration",
    "description": "Meet JM Comfort Solutions, a locally owned heating, cooling and refrigeration team that repairs before it replaces. Honest advice, 24/7 service."
  };

  const business = {
    "@type": "HVACBusiness",
    "@id": `${siteUrl}/#business`,
    "name": "JM Comfort Solutions",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "image": `${siteUrl}/logo.png`,
    "telephone": "+1 555-123-4567",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sugar Land",
      "addressRegion": "TX",
    },
    "areaServed": "Greater Houston Area",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "slogan": "Comfort, Engineered.",
    "sameAs": []
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/about#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": `${siteUrl}/about`
      }
    ]
  };

  // Clean undefined properties
  const cleanObject = (obj: any) => JSON.parse(JSON.stringify(obj));

  return {
    "@context": "https://schema.org",
    "@graph": [
      cleanObject(aboutPage),
      cleanObject(business),
      cleanObject(breadcrumb)
    ]
  };
}

export function servicesSchema() {
  const siteUrl = 'https://jmcomfort.com';
  const cleanObject = (obj: any) => JSON.parse(JSON.stringify(obj).replace(/</g, '\\u003c'));

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${siteUrl}/services#webpage`,
    "url": `${siteUrl}/services`,
    "name": "HVAC & Refrigeration Services | JM Comfort Solutions",
    "description": "Residential and commercial heating, cooling and refrigeration from JM Comfort Solutions. Repairs, installs, tune-ups and 24/7 emergency service.",
    "about": { "@id": `${siteUrl}/#business` }
  };

  const business = {
    "@type": "HVACBusiness",
    "@id": `${siteUrl}/#business`,
    "name": "JM Comfort Solutions",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "image": `${siteUrl}/logo.png`,
    "telephone": "+1 555-123-4567",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sugar Land",
      "addressRegion": "TX",
    },
    "areaServed": "Greater Houston Area",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "slogan": "Comfort, Engineered.",
    "sameAs": []
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/services#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${siteUrl}/services`
      }
    ]
  };

  const servicesData = [
    {
      id: "residential-hvac",
      name: "Residential HVAC",
      intro: "From an AC that can't keep up in the middle of summer to a furnace that won't light in January, we diagnose first and fix what is actually wrong. When a system truly has reached the end of its life, we size the replacement to your home instead of selling you the biggest unit on the truck.",
      items: [
        { name: "AC Repair & Diagnostics", description: "Full system testing on every call, so you see the cause before you approve the fix." },
        { name: "Heating Repair", description: "Furnaces, heat pumps and electric heat brought back to dependable operation." },
        { name: "System Replacement", description: "Properly sized equipment, offered only when repair no longer makes sense." },
        { name: "New Installation", description: "Clean, code-compliant installs for new builds, additions and upgrades." },
        { name: "Mini-Split Systems", description: "Ductless heating and cooling for additions, garages and hard-to-duct rooms." },
        { name: "Emergency Service", description: "Round-the-clock response when a system quits at the worst possible time." }
      ]
    },
    {
      id: "commercial-hvac",
      name: "Commercial HVAC",
      intro: "Offices, retail spaces, restaurants and multi-tenant buildings can't afford a dead rooftop unit. We service package units, split systems and multi-zone setups with fast response and clear written options, so you can plan around the repair instead of absorbing the surprise.",
      items: [
        { name: "Commercial Repair", description: "Fast diagnosis that keeps downtime short and tenants comfortable." },
        { name: "Rooftop Units", description: "Service, repair and replacement for package and rooftop equipment." },
        { name: "Multi-Tenant Properties", description: "Consistent service across suites, floors and shared systems." },
        { name: "Build-Outs & New Installs", description: "Equipment sizing and installation for new and renovated spaces." },
        { name: "Service Agreements", description: "Scheduled visits that keep equipment clean, tested and documented." },
        { name: "Priority Response", description: "Commercial calls handled first when your business is losing time." }
      ]
    },
    {
      id: "commercial-refrigeration",
      name: "Commercial Refrigeration",
      intro: "Warm product costs real money. Our refrigeration work covers the equipment restaurants, grocers and convenience stores depend on every hour of the day, diagnosed with the same repair-first honesty as our HVAC service.",
      items: [
        { name: "Walk-In Coolers", description: "Temperature faults, fan and door issues, and system tune-ups." },
        { name: "Walk-In Freezers", description: "Defrost problems, frost build-up and compressor troubleshooting." },
        { name: "Ice Machines", description: "Repair and cleaning for machines that stall, under-produce or leak." },
        { name: "Display Cases & Reach-Ins", description: "Keeping merchandising and prep equipment at safe temperatures." },
        { name: "Condensing Units & Compressors", description: "Diagnosis and repair of the hardware doing the heavy work." },
        { name: "Emergency Calls", description: "Rapid response when product is at risk and every minute counts." }
      ]
    },
    {
      id: "maintenance-plans",
      name: "Maintenance Plans",
      intro: "A planned visit costs less than an emergency one. Our maintenance plans keep residential and commercial equipment clean, calibrated and documented, so small problems get caught while they are still small.",
      items: [
        { name: "Seasonal Tune-Ups", description: "Spring and fall visits that prepare equipment for peak demand." },
        { name: "Filter Service", description: "Scheduled filter changes that protect airflow and indoor air quality." },
        { name: "Coil Cleaning", description: "Clean evaporator and condenser coils for better efficiency and longer life." },
        { name: "Refrigerant & Pressure Checks", description: "Readings verified and recorded, not guessed." },
        { name: "Priority Scheduling", description: "Plan members move to the front of the line." },
        { name: "Member Repair Pricing", description: "Reduced rates on repairs found between visits." }
      ]
    }
  ];

  const serviceEntities = servicesData.map(svc => ({
    "@type": "Service",
    "@id": `${siteUrl}/services#service-${svc.id}`,
    "name": svc.name,
    "serviceType": "HVAC & Refrigeration",
    "description": svc.intro,
    "url": `${siteUrl}/services#${svc.id}`,
    "provider": { "@id": `${siteUrl}/#business` },
    "areaServed": "Greater Houston Area",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${svc.name} Services`,
      "itemListElement": svc.items.map(item => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item.name,
          "description": item.description
        }
      }))
    }
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      cleanObject(collectionPage),
      cleanObject(business),
      cleanObject(breadcrumb),
      ...serviceEntities.map(cleanObject)
    ]
  };
}

import type { ServicePageData } from '@/content/service-pages';
import { site } from '@/config/site';

export function serviceDetailSchema(page: ServicePageData) {
  const siteUrl = site.url;
  const cleanObject = (obj: any) => JSON.parse(JSON.stringify(obj).replace(/</g, '\\u003c'));

  const webpage = {
    "@type": "WebPage",
    "@id": `${siteUrl}/services/${page.slug}#webpage`,
    "url": `${siteUrl}/services/${page.slug}`,
    "name": page.seo.title,
    "description": page.seo.description,
    "mainEntity": { "@id": `${siteUrl}/services/${page.slug}#service` },
    "breadcrumb": { "@id": `${siteUrl}/services/${page.slug}#breadcrumb` }
  };

  const business: any = {
    "@type": "HVACBusiness",
    "@id": `${siteUrl}/#business`,
    "name": site.name,
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "image": `${siteUrl}/logo.png`,
    "slogan": "Comfort, Engineered.",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  if (!site.isDummy) {
    business.telephone = site.phone;
    business.address = {
      "@type": "PostalAddress",
      "streetAddress": site.address,
      "addressLocality": site.city,
      "addressRegion": site.state,
      "postalCode": site.zip
    };
    business.areaServed = site.metroArea;
    business.foundingDate = String(site.founded);
  }

  const service = {
    "@type": "Service",
    "@id": `${siteUrl}/services/${page.slug}#service`,
    "name": page.name,
    "serviceType": page.name,
    "description": page.heroLead,
    "url": `${siteUrl}/services/${page.slug}`,
    "provider": { "@id": `${siteUrl}/#business` },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": page.offerHeading.lead + page.offerHeading.accent,
      "itemListElement": page.offers.map(offer => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": offer.title,
          "description": offer.description
        }
      }))
    }
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/services/${page.slug}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${siteUrl}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.name,
        "item": `${siteUrl}/services/${page.slug}`
      }
    ]
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteUrl}/services/${page.slug}#faq`,
    "mainEntity": page.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      cleanObject(webpage),
      cleanObject(business),
      cleanObject(service),
      cleanObject(breadcrumb),
      cleanObject(faqPage)
    ]
  };
}
