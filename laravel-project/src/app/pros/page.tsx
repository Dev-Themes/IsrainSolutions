import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProsDirectory } from "@/components/pros/pros-directory";
import { getSiteUrl } from "@/lib/site-config";
import { VERIFIED_PROS } from "@/lib/data";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Verified Trade Professionals Directory | UK & US Trades",
  description:
    "Search verified, licensed, and insured trade professionals across the UK and US. Gas Safe heating engineers, NICEIC electricians, certified plumbers, and roofers.",
  alternates: {
    canonical: `${siteUrl}/pros`,
    languages: {
      "en-GB": `${siteUrl}/pros`,
      "en-US": `${siteUrl}/pros`,
      "x-default": `${siteUrl}/pros`,
    },
  },
  openGraph: {
    title: "Verified Trade Professionals Directory | TradeConnect",
    description:
      "Search verified, licensed, and insured trade professionals across the UK and US with validated credentials and real homeowner reviews.",
    url: `${siteUrl}/pros`,
    siteName: "TradeConnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verified Trade Professionals Directory | TradeConnect",
    description:
      "Search verified, licensed, and insured trade professionals across the UK and US.",
  },
};

export default function ProsPage() {
  const directoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TradeConnect Verified Trade Professionals",
    description:
      "Directory of verified, licensed, and insured trade professionals across the UK and US.",
    numberOfItems: VERIFIED_PROS.length,
    itemListElement: VERIFIED_PROS.map((pro, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "HomeAndConstructionBusiness",
        name: pro.companyName,
        url: `${siteUrl}/pros/${pro.slug}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: pro.city,
          postalCode: pro.postcodeOrZip,
          addressCountry: pro.country === "UK" ? "GB" : "US",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: pro.rating.toString(),
          reviewCount: pro.reviewCount.toString(),
        },
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directoryJsonLd) }}
      />
      <div className="container-custom pt-4">
        <Breadcrumbs items={[{ label: "Trade Directory" }]} />
      </div>
      <ProsDirectory />
    </div>
  );
}
