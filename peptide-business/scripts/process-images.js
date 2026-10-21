const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const ARTIFACT_DIR = "C:\\Users\\dell\\.gemini\\antigravity-cli\\brain\\5fff9829-72ba-44a8-8e6e-1e08cae51762";

const MAP = [
  // Hero & Sections
  { src: "hero_peptides_1792589405864.jpg", dest: "public/images/hero/hero-peptides.webp", quality: 85 },
  { src: "hero_peptides_mobile_1792589622345.jpg", dest: "public/images/hero/hero-peptides-mobile.webp", quality: 85 },
  { src: "about_approach_1792589429031.jpg", dest: "public/images/about/about-approach.webp", quality: 85 },
  { src: "why_product_information_1792589454149.jpg", dest: "public/images/features/why-product-information.webp", quality: 85 },
  { src: "why_direct_contact_1792589482846.jpg", dest: "public/images/features/why-direct-contact.webp", quality: 85 },
  { src: "why_documentation_1792589511633.jpg", dest: "public/images/features/why-documentation.webp", quality: 85 },
  { src: "technical_guide_1792589545887.jpg", dest: "public/images/editorial/technical-guide.webp", quality: 85 },
  { src: "telegram_cta_banner_1792589581024.jpg", dest: "public/images/editorial/telegram-cta-banner.webp", quality: 85 },

  // Individual Product Images (5 directly generated)
  { src: "product_01_1792589742517.jpg", dest: "public/images/products/product-01.webp", quality: 85 },
  { src: "product_02_1792589788973.jpg", dest: "public/images/products/product-02.webp", quality: 85 },
  { src: "product_03_1792589833699.jpg", dest: "public/images/products/product-03.webp", quality: 85 },
  { src: "product_04_1792589881686.jpg", dest: "public/images/products/product-04.webp", quality: 85 },
  { src: "product_05_1792589943873.jpg", dest: "public/images/products/product-05.webp", quality: 85 },
];

async function convertAll() {
  for (const item of MAP) {
    const srcPath = path.join(ARTIFACT_DIR, item.src);
    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${srcPath}`);
      continue;
    }
    const destDir = path.dirname(item.dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    await sharp(srcPath)
      .webp({ quality: item.quality })
      .toFile(item.dest);

    const stats = fs.statSync(item.dest);
    console.log(`[CONVERTED] ${item.dest} (${Math.round(stats.size / 1024)} KB)`);
  }

  // Generate Step images (4:3)
  // Step 1: Explore Products (from about_approach workspace)
  await sharp(path.join(ARTIFACT_DIR, "about_approach_1792589429031.jpg"))
    .resize(800, 600, { fit: "cover", position: "center" })
    .webp({ quality: 85 })
    .toFile("public/images/steps/step-explore.webp");
  console.log(`[GENERATED] public/images/steps/step-explore.webp`);

  // Step 2: Review Details (from why_product_information)
  await sharp(path.join(ARTIFACT_DIR, "why_product_information_1792589454149.jpg"))
    .resize(800, 600, { fit: "cover", position: "center" })
    .webp({ quality: 85 })
    .toFile("public/images/steps/step-review.webp");
  console.log(`[GENERATED] public/images/steps/step-review.webp`);

  // Step 3: Contact on Telegram (from why_direct_contact)
  await sharp(path.join(ARTIFACT_DIR, "why_direct_contact_1792589482846.jpg"))
    .resize(800, 600, { fit: "cover", position: "center" })
    .webp({ quality: 85 })
    .toFile("public/images/steps/step-contact.webp");
  console.log(`[GENERATED] public/images/steps/step-contact.webp`);

  // Products 06, 07, 08 (dedicated focal crops from the multi-vial custom studio photographs)
  // Product 06 (Tripeptide-29): Left vial from hero_peptides
  await sharp(path.join(ARTIFACT_DIR, "hero_peptides_1792589405864.jpg"))
    .extract({ left: 300, top: 100, width: 550, height: 550 })
    .resize(800, 800)
    .webp({ quality: 85 })
    .toFile("public/images/products/product-06.webp");
  console.log(`[GENERATED] public/images/products/product-06.webp (Studio Crop: Left Frosted Vial)`);

  // Product 07 (Acetyl Tetrapeptide-5): Right vial from hero_peptides
  await sharp(path.join(ARTIFACT_DIR, "hero_peptides_1792589405864.jpg"))
    .extract({ left: 750, top: 120, width: 550, height: 550 })
    .resize(800, 800)
    .webp({ quality: 85 })
    .toFile("public/images/products/product-07.webp");
  console.log(`[GENERATED] public/images/products/product-07.webp (Studio Crop: Right Amber Dropper)`);

  // Product 08 (Multi-Peptide Matrix Blend): Multi-vial group from telegram_cta_banner
  await sharp(path.join(ARTIFACT_DIR, "telegram_cta_banner_1792589581024.jpg"))
    .extract({ left: 750, top: 100, width: 600, height: 600 })
    .resize(800, 800)
    .webp({ quality: 85 })
    .toFile("public/images/products/product-08.webp");
  console.log(`[GENERATED] public/images/products/product-08.webp (Studio Crop: Dual-Vial Synergy)`);
}

convertAll().catch(console.error);
