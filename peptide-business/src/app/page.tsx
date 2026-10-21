import React from "react";
import Hero from "@/components/home/Hero";
import ProductCatalog from "@/components/products/ProductCatalog";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutSection from "@/components/home/AboutSection";
import HowToOrder from "@/components/home/HowToOrder";
import FaqSection from "@/components/home/FaqSection";
import TelegramCtaSection from "@/components/home/TelegramCtaSection";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  return (
    <main id="main-content" className="flex flex-col">
      {/* Section 1: Editorial Hero */}
      <Hero />

      {/* Section 2: Categories & Featured Products Catalog */}
      <ProductCatalog initialProducts={PRODUCTS} />

      {/* Section 3: Why Choose Us */}
      <WhyChooseUs />

      {/* Section 4: About the Business */}
      <AboutSection />

      {/* Section 5: How to Inquire */}
      <HowToOrder />

      {/* Section 6: Frequently Asked Questions */}
      <FaqSection />

      {/* Section 7: Telegram Contact CTA */}
      <TelegramCtaSection />
    </main>
  );
}
