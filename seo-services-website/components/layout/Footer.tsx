import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Mail, Phone, MapPin, Send, MessageSquare, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#010615] border-t border-sky-500/25 text-slate-300 pt-16 pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-sky-500/15">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="relative h-9 w-44">
              <Image
                src="/brand/israin-wordmark-1024x244.webp"
                alt="Israin Solutions"
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Authority guest posts, curated niche edits, and search engine optimization built by hand since 2016. Every order ends with verified live URL reporting and direct search impact.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-l-2 border-sky-400 pl-2.5">
              SEO Services
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/services/niche-guest-posts"
                  className="hover:text-white transition-colors"
                >
                  Niche Guest Posts <span className="text-sky-400">(from $100)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/general-guest-posts"
                  className="hover:text-white transition-colors"
                >
                  General Guest Posts <span className="text-sky-400">(from $10)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/niche-edits"
                  className="hover:text-white transition-colors"
                >
                  Niche Edits & Curated Links <span className="text-sky-400">(from $50)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/casino-igaming-guest-posts"
                  className="hover:text-white transition-colors"
                >
                  Casino & iGaming Posts <span className="text-sky-400">(from $30)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/off-page-seo-packages"
                  className="hover:text-white transition-colors"
                >
                  Tier 1 & Tier 2 SEO Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/services/niche-blog-comments"
                  className="hover:text-white transition-colors"
                >
                  Niche Blog Comments
                </Link>
              </li>
              <li>
                <Link
                  href="/services/pbn-links"
                  className="hover:text-white transition-colors"
                >
                  Aged PBN Backlinks
                </Link>
              </li>
              <li>
                <Link
                  href="/services/press-releases"
                  className="hover:text-white transition-colors"
                >
                  Press Release Distribution
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Tools */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-l-2 border-sky-400 pl-2.5">
              Tools & Resources
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/guest-post-sites" className="hover:text-white transition-colors">
                  Guest Post Sites Inventory
                </Link>
              </li>
              <li>
                <Link href="/link-insertion-sites" className="hover:text-white transition-colors">
                  Link Insertion Directory
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  All Link Building Services
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Packages Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Custom Brief
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-l-2 border-sky-400 pl-2.5">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.parentCompany.address.street}, {siteConfig.parentCompany.address.city}, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {siteConfig.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a
                  href={siteConfig.contact.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Telegram: @{siteConfig.contact.telegram}
                </a>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-sky-500/20">
              <span className="text-[11px] text-sky-200/70 block mb-1">
                Founded & Directed by:
              </span>
              <span className="text-xs font-semibold text-white">
                {siteConfig.founder.name} — Link Building Director
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2016–{new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Refund
            </Link>
            <a
              href={siteConfig.parentCompany.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              israinsols.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
