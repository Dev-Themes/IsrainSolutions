import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CareerVexa",
  description: "Career, jobs and professional growth",
};

export const viewport: Viewport = {
  themeColor: "#f2f4f3", // fallback, will be overwritten by script
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} antialiased h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('cv-theme');
                  var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var themeColor = document.querySelector('meta[name="theme-color"]');
                  if (t === 'night' || (!t && m)) {
                    document.documentElement.setAttribute('data-theme', 'night');
                    if (themeColor) themeColor.setAttribute('content', '#0f1a20');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'day');
                    if (themeColor) themeColor.setAttribute('content', '#f2f4f3');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

