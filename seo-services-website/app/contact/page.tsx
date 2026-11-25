import React from "react";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { ContactBriefSection } from "@/components/sections/ContactBriefSection";
import { Mail, MessageSquare, Send, MapPin } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact OffPage SEO Services: WhatsApp, Telegram & Email",
  description:
    "Direct contact channels for our link building agency in Hyderabad, Pakistan. Reach out via WhatsApp +92 331 3646645, Telegram @israinsolutions, or submit your brief.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full py-12 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mb-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>Fast Communications</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            WhatsApp is the fastest way to reach us.
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] leading-relaxed">
            Send your website URL and target keywords directly. We analyze backlink gaps and respond within 24 business hours.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl bg-[#06163b]/85 border border-[#25D366]/40 hover:border-[#25D366] transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[11px] text-sky-300/80 uppercase block">WhatsApp</span>
              <strong className="text-xs font-bold text-white group-hover:text-[#25D366] transition-colors">
                {siteConfig.contact.whatsapp}
              </strong>
            </div>
          </a>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="p-5 rounded-xl bg-[#06163b]/85 border border-sky-400/40 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#092252] text-[#1FA9E0] flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-sky-300/80 uppercase block">Direct Email</span>
              <strong className="text-xs font-bold text-white group-hover:text-[#1FA9E0] transition-colors truncate block max-w-[170px]">
                {siteConfig.contact.email}
              </strong>
            </div>
          </a>

          <a
            href={siteConfig.contact.telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl bg-[#06163b]/85 border border-sky-500/40 hover:border-sky-400 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-950/40 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-sky-300/80 uppercase block">Telegram</span>
              <strong className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                @{siteConfig.contact.telegram}
              </strong>
            </div>
          </a>

          <div className="p-5 rounded-xl bg-[#06163b]/85 border border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-white/5 text-sky-300/80 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#1FA9E0]" />
            </div>
            <div>
              <span className="text-[11px] text-sky-300/80 uppercase block">Location</span>
              <span className="text-xs font-semibold text-white block">
                Hyderabad, Pakistan
              </span>
            </div>
          </div>
        </div>
      </div>

      <ContactBriefSection />
    </div>
  );
}
