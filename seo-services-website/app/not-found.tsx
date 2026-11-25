import React from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "404 - Page Not Found",
  description: "The requested link building page or resource could not be found.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-xl bg-[#06163b]/85 border border-sky-400/40 shadow-2xl">
        <span className="text-[#1FA9E0] text-xs font-bold uppercase tracking-widest block">
          Error 404
        </span>
        <h1 className="text-3xl font-bold text-white">Page Not Found</h1>
        <p className="text-sm text-slate-300">
          The URL you followed does not exist or may have been relocated. Browse our main services below.
        </p>
        <div className="pt-2 flex flex-col gap-2">
          <Link
            href="/"
            className="w-full py-2.5 rounded-md bg-[#1FA9E0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#34bbf0] transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            href="/services"
            className="w-full py-2.5 rounded-md border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            View All Services & Prices
          </Link>
        </div>
      </div>
    </div>
  );
}
