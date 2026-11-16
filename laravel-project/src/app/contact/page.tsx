import type { Metadata } from "next";
import { Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getSiteUrl } from "@/lib/site-config";
import { UkFlagIcon, UsFlagIcon } from "@/components/ui/flag-icon";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Contact Support & Operations | TradeConnect",
  description:
    "Get in touch with TradeConnect customer support and contractor compliance. Phone lines, direct email, and registered office locations across the UK and US.",
  alternates: {
    canonical: `${siteUrl}/contact`,
    languages: {
      "en-GB": `${siteUrl}/contact`,
      "en-US": `${siteUrl}/contact`,
      "x-default": `${siteUrl}/contact`,
    },
  },
  openGraph: {
    title: "Contact Support | TradeConnect",
    description:
      "TradeConnect customer support and contractor compliance operations. Available Monday to Saturday.",
    url: `${siteUrl}/contact`,
    siteName: "TradeConnect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Support | TradeConnect",
    description:
      "TradeConnect customer support and contractor compliance operations.",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <div className="container-custom pt-4">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />
      </div>

      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-4xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text)] mb-3 tracking-tight">
            Contact TradeConnect Support
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl">
            Have a question about a quote request, contractor credential verification, or platform features? Our dedicated support and compliance team is available Monday through Saturday.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft">
              <Phone className="w-5 h-5 text-[var(--accent)] mb-3" />
              <h3 className="font-extrabold text-sm text-[var(--text)]">Telephone Support</h3>
              <p className="text-xs text-[var(--text-muted)] mt-2 space-y-1">
                <span className="block font-semibold text-[var(--text)]">UK Freephone: 0800 123 4567</span>
                <span className="block font-semibold text-[var(--text)]">US Toll-Free: +1 (800) 555-0199</span>
              </p>
              <div className="mt-3 pt-3 border-t border-[var(--line-subtle)] flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Monday – Saturday: 7:00 AM – 8:00 PM</span>
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft">
              <Mail className="w-5 h-5 text-[var(--accent)] mb-3" />
              <h3 className="font-extrabold text-sm text-[var(--text)]">Direct Email Inquiries</h3>
              <p className="text-xs text-[var(--text-muted)] mt-2 space-y-1">
                <span className="block">Homeowners: <a href="mailto:support@tradeconnect.com" className="font-semibold text-[var(--accent)] hover:underline">support@tradeconnect.com</a></span>
                <span className="block">Trade Pros &amp; Verification: <a href="mailto:contractors@tradeconnect.com" className="font-semibold text-[var(--accent)] hover:underline">contractors@tradeconnect.com</a></span>
              </p>
              <div className="mt-3 pt-3 border-t border-[var(--line-subtle)] flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--pine-accent)]" />
                <span>Average response time under 3 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclosures & Physical Offices */}
      <section className="section-sand section-spacing">
        <div className="container-custom max-w-4xl">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text)]">
              Registered Office Locations &amp; Corporate Entities
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Official physical headquarters for legal service and operational correspondence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <div className="flex items-center gap-2 mb-3">
                <UkFlagIcon className="w-5 h-3.5 rounded-[2px]" />
                <h3 className="font-bold text-sm text-[var(--text)]">United Kingdom (HQ)</h3>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                <strong className="text-[var(--text)]">TradeConnect Network Ltd</strong><br />
                128 City Road<br />
                London EC1V 2NX<br />
                United Kingdom
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] text-[11px] text-[var(--text-light)]">
                Registered in England &amp; Wales &middot; Co. No. 14829103<br />
                VAT Registration No. GB 412 8901 44
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <div className="flex items-center gap-2 mb-3">
                <UsFlagIcon className="w-5 h-3.5 rounded-[2px]" />
                <h3 className="font-bold text-sm text-[var(--text)]">United States (Operations)</h3>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                <strong className="text-[var(--text)]">TradeConnect Inc.</strong><br />
                600 Congress Avenue, Suite 1400<br />
                Austin, TX 78701<br />
                United States
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] text-[11px] text-[var(--text-light)]">
                Delaware File No. 7192841 &middot; Texas Taxpayer No. 32081920311
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
