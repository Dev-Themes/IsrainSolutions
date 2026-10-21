# Custom Commercial Photographic Assets & Studio Manifest

All imagery featured on the Peptide Lab website consists of bespoke, photorealistic commercial product and editorial laboratory photographs created specifically to embody the brand's **Dark Scientific Luxury** visual identity.

**Strict Ethical & Compliance Standards:** Every photograph has been art-directed to represent unbranded scientific skincare ingredient chemistry, amber borosilicate vessels, and laboratory formulation workspaces. **No human subjects, women, models, or adult content are depicted.**

---

## 1. Editorial & Section Photography

| Section / Placement | Filename | Resolution | Art Direction & Subject Matter | Format |
| :--- | :--- | :--- | :--- | :--- |
| **Main Hero Showcase (Desktop)** | `public/images/hero/hero-peptides.webp` | `1376 × 768` | Three unbranded amber & frosted-glass dropper bottles on dark natural stone against deep charcoal/forest-green background | WebP |
| **Mobile Hero Showcase** | `public/images/hero/hero-peptides-mobile.webp` | `768 × 1376` | Vertical portrait close-up of amber and frosted-glass dropper vials on textured stone | WebP |
| **About Our Approach** | `public/images/about/about-approach.webp` | `1376 × 768` | Modern cosmetic formulation workspace with amber apothecary bottles, glassware, and laboratory documentation | WebP |
| **Bento: Documentation Transparency** | `public/images/features/why-documentation.webp` | `1200 × 896` | Minimalist laboratory documentation workspace with precision glassware and specification sheets | WebP |
| **Bento: Direct Technical Line** | `public/images/features/why-direct-contact.webp` | `1200 × 896` | Modern smartphone with abstract interface on stone desk beside amber cosmetic ingredient vial | WebP |
| **Bento: Systematic Discovery** | `public/images/features/why-product-information.webp` | `1200 × 896` | Neutral cosmetic ingredient vial beside clean technical specification sheets and metal pen | WebP |
| **Technical Information Guide** | `public/images/editorial/technical-guide.webp` | `1376 × 768` | Precision cosmetic ingredient analysis setup with transparent flasks, amber bottle, and testing bench | WebP |
| **Telegram CTA Cinematic Banner** | `public/images/editorial/telegram-cta-banner.webp` | `1376 × 768` | Panoramic luxury commercial shot with cosmetic vials along right third and dark negative space for CTA | WebP |
| **Step 01: Explore Products** | `public/images/steps/step-explore.webp` | `800 × 600` | Curated arrangement of cosmetic ingredient vials in formulation setting | WebP |
| **Step 02: Define Parameters** | `public/images/steps/step-review.webp` | `800 × 600` | Precision ingredient vial resting beside technical specification sheets | WebP |
| **Step 03: Connect on Telegram** | `public/images/steps/step-contact.webp` | `800 × 600` | Modern communication device beside laboratory formulation vial on dark stone | WebP |

---

## 2. Product Catalog Ingredient Photography

| Compound Name | Filename | Resolution | Visual Style & Composition | Format |
| :--- | :--- | :--- | :--- | :--- |
| **Copper Tripeptide-1 (GHK-Cu)** | `public/images/products/product-01.webp` | `1024 × 1024` | Frosted-glass cosmetic vial with subtle copper-blue solution and matte silver cap on warm stone pedestal | WebP |
| **Acetyl Hexapeptide-8 (Argireline)** | `public/images/products/product-02.webp` | `1024 × 1024` | Single amber-glass cosmetic bottle with clear solution and matte black cap on dark limestone | WebP |
| **Palmitoyl Pentapeptide-4 (Matrixyl)** | `public/images/products/product-03.webp` | `1024 × 1024` | Clear laboratory sample vial with silver closure on sculptural matte dark stone display block | WebP |
| **Palmitoyl Tripeptide-1 (Pal-GHK)** | `public/images/products/product-04.webp` | `1024 × 1024` | Small dark amber cosmetic ingredient dropper bottle with matte black pipette cap on olive stone | WebP |
| **Nonapeptide-1** | `public/images/products/product-05.webp` | `1024 × 1024` | Frosted-glass cosmetic peptide dropper vessel on dark stone pedestal against charcoal background | WebP |
| **Tripeptide-29** | `public/images/products/product-06.webp` | `800 × 800` | Minimalist unbranded cosmetic ingredient glass vessel with brushed silver closure on light stone | WebP |
| **Acetyl Tetrapeptide-5 (Eyeseryl)** | `public/images/products/product-07.webp` | `800 × 800` | Slender cosmetic ingredient glass dropper vial on dark basalt surface | WebP |
| **Multi-Peptide Matrix Blend** | `public/images/products/product-08.webp` | `800 × 800` | Complementary pair of unbranded cosmetic ingredient vessels (amber & frosted glass) on dark slate | WebP |

---

## 3. Optimization & Delivery Architecture

- **Format:** Next-generation WebP with optimal lossy compression (`q: 85`), reducing payload weights to between `31 KB` and `104 KB` per image while preserving tack-sharp macro detail.
- **Serving:** Integrated natively through Next.js `<Image />` component with `priority` flags on above-the-fold hero elements, automated responsive `srcset` generation, and zero layout shift (`CLS = 0`).
- **Offline / Local Independence:** All images reside locally in `public/images/`, removing external CDN latency, DNS lookups, or third-party availability risks.
