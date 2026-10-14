import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { constructMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://career-vixa.vercel.app";

export const metadata = constructMetadata({
  title: "CareerVixa - Career, Jobs & Professional Growth",
  description: "Practical, warm, and confident career advice, job search strategies, and professional growth guides.",
  url: appUrl,
});
metadata.metadataBase = new URL(appUrl);

import { auth } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
