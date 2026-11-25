import React from "react";
import Link from "next/link";
import { CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Order Received",
  description: "Your link building brief has been received.",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-lg w-full text-center space-y-6 p-8 rounded-2xl bg-[#06163b]/85 border-2 border-[#1FA9E0] shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#1FA9E0]/20 text-[#1FA9E0] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#1FA9E0] uppercase tracking-widest block">
            Submission Confirmed
          </span>
          <h1 className="text-3xl font-bold text-white">Thank You for Your Order Brief</h1>
          <p className="text-sm text-[#EBF1FF]">
            Abdul Qadir and our manual outreach team have received your request. We will review your target URL and reply within 24 business hours.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#092252] border border-sky-400/40 text-xs text-slate-300 space-y-1">
          <div>Need faster confirmation or have urgent keyword requirements?</div>
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] font-bold hover:underline inline-flex items-center gap-1 mt-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message us on WhatsApp ({siteConfig.contact.whatsapp})</span>
          </a>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1FA9E0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#34bbf0] transition-all"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
