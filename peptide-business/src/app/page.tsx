import React from "react";
import Hero from "@/components/home/Hero";
import ProductCatalog from "@/components/products/ProductCatalog";
import FormulationStudio from "@/components/home/FormulationStudio";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutSection from "@/components/home/AboutSection";
import HowToOrder from "@/components/home/HowToOrder";
import InformationalSection from "@/components/home/InformationalSection";
import FaqSection from "@/components/home/FaqSection";
import TelegramCtaSection from "@/components/home/TelegramCtaSection";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  return (
    <main id="main-content" className="flex flex-col">
      {/* Section 3: Editorial Hero */}
      <Hero />

      {/* Section 4 & 5: Categories & Featured Products Catalog */}
      <ProductCatalog initialProducts={PRODUCTS} />

      {/* Interactive Formulation Studio (Surprise Feature: Live Dilution & Batch Calculator) */}
      <FormulationStudio />

      {/* Section 6: Why Choose Us (Mandatory) */}
      <WhyChooseUs />

      {/* Section 7: About the Business */}
      <AboutSection />

      {/* Section 8: How to Inquire (Mandatory) */}
      <HowToOrder />

      {/* Section 9: Informational / Quality Section */}
      <InformationalSection />

      {/* Section 10: Frequently Asked Questions */}
      <FaqSection />

      {/* Section 11: Telegram Contact CTA */}
      <TelegramCtaSection />
    </main>
  );
}
