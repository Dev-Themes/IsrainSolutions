"use client";

import React from "react";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { siteConfig } from "@/lib/site-config";
import { GeometricHeading } from "@/components/branding/GeometricHeading";
import { motion } from "framer-motion";

interface ContactSectionProps {
  locale: Locale;
  as?: "h1" | "h2";
}

export function ContactSection({ locale, as = "h2" }: ContactSectionProps) {
  const dict = getDictionary(locale);

  return (
    <section className="w-full bg-[#292929] text-[#FFFFFF] py-20 sm:py-28 md:py-36 border-t border-[#1f1f1f] transition-colors">
      <div className="container-forme">
        {/* Massive CONTACT Geometric Striped Heading (Matches Screenshot 2026-10-19 152415.png) */}
        <div className="mb-8 sm:mb-12">
          <GeometricHeading text="CONTACT" as={as} className="mb-4" />
        </div>

        {/* Opening Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-2xl md:text-3xl font-light text-[#D4D4D4] max-w-3xl leading-relaxed mb-14 sm:mb-20 tracking-tight"
        >
          {dict.contact.openingStatement}
        </motion.p>

        {/* 2-Column Layout: Left Contact Info / Right Stacked Geometric Badges */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left Column: Work With Us & Agency Coordinates */}
          <div className="md:col-span-7 flex flex-col justify-start space-y-8 sm:space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-[#FFFFFF] tracking-tight mb-3">
                {locale === "fr" ? "Travailler avec nous" : "Work with us"}
              </h2>
              <address className="not-italic text-sm sm:text-base text-[#D4D4D4] font-light leading-relaxed space-y-1">
                <p>14 Rue de Charonne, Étage 4</p>
                <p>75011 Paris, France</p>
              </address>
              <div className="mt-6">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group/mail relative inline-block text-lg sm:text-2xl font-normal text-[#FFFFFF] hover:text-[#FFFFFF] transition-colors"
                  aria-label={dict.contact.emailAria}
                >
                  <span>{siteConfig.email}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6298FF] origin-left scale-x-0 group-hover/mail:scale-x-100 transition-transform duration-300 ease-out" />
                </a>
              </div>
            </div>

            {/* Social Links List (Matches Screenshot style with subtle accent hover) */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#B8B8B8]">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF665C] transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7D85B] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6298FF] transition-colors"
                >
                  Behance
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#78E6BF] transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Geometric Badge (Diagonal Striped Square + Concentric Circles) */}
          <div className="md:col-span-5 flex justify-start md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center select-none pointer-events-none"
              aria-hidden="true"
            >
              {/* Top: Square with 45-degree diagonal stripes */}
              <svg
                width="150"
                height="150"
                viewBox="0 0 150 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-32 h-32 sm:w-40 sm:h-40"
              >
                <defs>
                  <pattern
                    id="diagonalStripes"
                    width="14"
                    height="14"
                    patternTransform="rotate(45 0 0)"
                    patternUnits="userSpaceOnUse"
                  >
                    <line x1="0" y1="0" x2="0" y2="14" stroke="#000000" strokeWidth="6" />
                  </pattern>
                </defs>
                <rect width="150" height="150" fill="url(#diagonalStripes)" />
                <rect width="150" height="150" stroke="#000000" strokeWidth="2" fill="none" />
              </svg>

              {/* Bottom: Concentric Circles directly touching underneath */}
              <svg
                width="150"
                height="150"
                viewBox="0 0 150 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-32 h-32 sm:w-40 sm:h-40"
              >
                <circle cx="75" cy="75" r="72" stroke="#000000" strokeWidth="6" />
                <circle cx="75" cy="75" r="58" stroke="#000000" strokeWidth="5.5" />
                <circle cx="75" cy="75" r="44" stroke="#000000" strokeWidth="5" />
                <circle cx="75" cy="75" r="30" stroke="#000000" strokeWidth="4.5" />
                <circle cx="75" cy="75" r="16" stroke="#000000" strokeWidth="4" />
                <circle cx="75" cy="75" r="5" fill="#000000" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
