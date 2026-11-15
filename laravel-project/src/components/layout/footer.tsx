import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  FileCheck,
} from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[var(--bg-deep)] text-[var(--bg-deep-text)] pt-16 pb-12 border-t border-[var(--line)]">
      <div className="container-custom">
        {/* Trust Strip above footer links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-[rgba(255,255,255,0.12)]">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[var(--bg-deep-text)]">Vetted Professionals</h4>
              <p className="text-xs text-[rgba(255,255,255,0.7)] mt-0.5 leading-relaxed">
                ID and public liability insurance verified before any contractor quotes.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[var(--bg-deep-text)]">Zero Obligation</h4>
              <p className="text-xs text-[rgba(255,255,255,0.7)] mt-0.5 leading-relaxed">
                100% free to post. Compare up to 3 local estimates without pressure.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[var(--bg-deep-text)]">Prompt Turnaround</h4>
              <p className="text-xs text-[rgba(255,255,255,0.7)] mt-0.5 leading-relaxed">
                Emergency dispatch within 1 hour; standard tasks quoted within 2 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FileCheck className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[var(--bg-deep-text)]">Genuine Reviews</h4>
              <p className="text-xs text-[rgba(255,255,255,0.7)] mt-0.5 leading-relaxed">
                Feedback collected only from verified customers who booked through the site.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-[rgba(255,255,255,0.12)]">
          {/* Brand & Contact Block with Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] overflow-hidden border border-white/20 relative shrink-0 shadow-sm">
                <Image
                  src="/images/brand/logo.jpg"
                  alt="TradeConnect Logo"
                  fill
                  sizes="40px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <span className="font-bold text-xl sm:text-2xl tracking-tight text-white block leading-none font-display">
                  Trade<span className="text-[var(--accent)]">Connect</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest font-semibold text-white/70 block mt-1">
                  Verified Trade Network &middot; UK &amp; US
                </span>
              </div>
            </Link>
            <p className="text-xs text-[rgba(255,255,255,0.75)] max-w-sm leading-relaxed">
              An independent directory connecting homeowners with certified local trade professionals across the United Kingdom and United States.
            </p>

            <div className="space-y-2 text-xs text-[rgba(255,255,255,0.75)] pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>London &middot; Manchester &middot; Austin, TX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Phone: 0800 123 4567 (Mon&ndash;Sat 7am&ndash;8pm)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Email: support@tradeconnect.com</span>
              </div>
            </div>
          </div>

          {/* Trade Services Column */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[var(--accent)] mb-3">
              Trade Services
            </h5>
            <ul className="space-y-2 text-xs text-[rgba(255,255,255,0.75)]">
              <li>
                <Link href="/uk/plumbing" className="footer-link-hover">
                  Emergency Plumbers
                </Link>
              </li>
              <li>
                <Link href="/uk/electrical" className="footer-link-hover">
                  Certified Electricians
                </Link>
              </li>
              <li>
                <Link href="/uk/gas-boiler" className="footer-link-hover">
                  Gas & Boiler Engineers
                </Link>
              </li>
              <li>
                <Link href="/uk/roofing" className="footer-link-hover">
                  Roofing Contractors
                </Link>
              </li>
              <li>
                <Link href="/us/hvac" className="footer-link-hover">
                  HVAC & Heating
                </Link>
              </li>
              <li>
                <Link href="/uk/landscaping" className="footer-link-hover">
                  Landscaping & Patios
                </Link>
              </li>
              <li>
                <Link href="/uk/locksmith" className="footer-link-hover">
                  Emergency Locksmiths
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Help Column */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[var(--accent)] mb-3">
              Company & Help
            </h5>
            <ul className="space-y-2 text-xs text-[rgba(255,255,255,0.75)]">
              <li>
                <Link href="/about" className="footer-link-hover">
                  Our Story & Values
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="footer-link-hover">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/for-pros" className="footer-link-hover">
                  Join as a Trade Pro
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer-link-hover">
                  Guides & Cost Advice
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link-hover">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/quote" className="footer-link-hover">
                  Request Free Quotes
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Hubs Column */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[var(--accent)] mb-3">
              Locations
            </h5>
            <ul className="space-y-2 text-xs text-[rgba(255,255,255,0.75)]">
              <li>
                <Link href="/uk/plumbing/london" className="footer-link-hover">
                  London
                </Link>
              </li>
              <li>
                <Link href="/uk/electrical/manchester" className="footer-link-hover">
                  Manchester
                </Link>
              </li>
              <li>
                <Link href="/uk/roofing/birmingham" className="footer-link-hover">
                  Birmingham
                </Link>
              </li>
              <li>
                <Link href="/us/hvac/austin" className="footer-link-hover">
                  Austin, TX
                </Link>
              </li>
              <li>
                <Link href="/us/hvac/chicago" className="footer-link-hover">
                  Chicago, IL
                </Link>
              </li>
              <li>
                <Link href="/uk" className="text-[var(--accent)] hover:underline font-semibold block pt-1 footer-link-hover">
                  All Coverage Areas &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[rgba(255,255,255,0.6)] space-y-3 sm:space-y-0">
          <p>
            &copy; {currentYear} TradeConnect Network Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-5">
            <Link href="/privacy" className="footer-link-hover">
              Privacy
            </Link>
            <Link href="/terms" className="footer-link-hover">
              Terms
            </Link>
            <Link href="/cookies" className="footer-link-hover">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
