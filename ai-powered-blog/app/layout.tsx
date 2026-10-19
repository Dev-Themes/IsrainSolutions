import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { constructMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const appUrl = (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost"))
  ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")
  : "https://career-vixa.vercel.app";

export const metadata = {
  ...constructMetadata({
    title: "CareerVixa - Career, Jobs & Professional Growth",
    description: "Practical, warm, and confident career advice, job search strategies, and professional growth guides.",
    url: appUrl,
  }),
  metadataBase: new URL(appUrl),
  title: {
    default: "CareerVixa - Career, Jobs & Professional Growth",
    template: "%s | CareerVixa",
  },
};

import { auth } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CareerVixa",
    url: appUrl,
    description: "Practical, warm, and confident career advice, job search strategies, and professional growth guides.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${appUrl}/articles?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CareerVixa",
    url: appUrl,
    logo: `${appUrl}/opengraph-image`,
    description: "Executive digital publication providing data-backed career intelligence, compensation benchmarks, and interview frameworks.",
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#064e3b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans min-h-screen flex flex-col bg-bg-page text-text-body overflow-x-clip w-full`}>
        <SiteHeader user={session?.user} />
        <main id="main-content" className="flex-1 w-full max-w-full overflow-x-clip">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
