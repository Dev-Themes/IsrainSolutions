import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Support | TradeConnect",
  description: "Get in touch with TradeConnect customer support. Available Monday to Saturday for homeowner and contractor assistance.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <section className="section-light section-spacing border-b border-[var(--line)]">
        <div className="container-custom max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
            Contact TradeConnect Support
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Have a question about a quote, a contractor verification, or a technical issue? Our operations team is available Monday through Saturday.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <Phone className="w-5 h-5 text-[var(--accent)] mb-2" />
              <h3 className="font-bold text-sm text-[var(--text)]">Telephone Dispatch</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                UK Freephone: 0800 123 4567<br />
                US Hotline: +1 (800) 555-0199
              </p>
              <span className="text-[10px] text-[var(--text-light)] block mt-2">
                Mon&ndash;Sat: 7am &ndash; 8pm
              </span>
            </div>

            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <Mail className="w-5 h-5 text-[var(--accent)] mb-2" />
              <h3 className="font-bold text-sm text-[var(--text)]">Direct Email</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Homeowners: support@tradeconnect.com<br />
                Trade Pros: contractors@tradeconnect.com
              </p>
              <span className="text-[10px] text-[var(--text-light)] block mt-2">
                Average reply &lt; 3 hours
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
