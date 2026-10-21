const { chromium } = require("playwright");
const fs = require("fs");

async function testScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on("pageerror", (err) => console.error("PAGE ERROR:", err));

  // Set cookie for age verification
  console.log("Navigating to age verification...");
  await page.goto("http://localhost:3000/age-verification");
  await page.click("button:has-text('I am 18 or Older')");
  await page.waitForURL("http://localhost:3000/");
  await page.waitForTimeout(2000);

  if (!fs.existsSync("public/screenshots")) fs.mkdirSync("public/screenshots", { recursive: true });

  await page.screenshot({ path: "public/screenshots/01-hero.png" });

  // Scroll to products
  await page.locator("#products").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "public/screenshots/02-products.png" });

  // Scroll to why choose us
  await page.locator("#why-choose-us").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "public/screenshots/03-why-us.png" });

  // Scroll to about
  await page.locator("#about").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "public/screenshots/04-about.png" });

  // Scroll to formulation studio
  await page.locator("#formulation-studio").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "public/screenshots/05-formulation.png" });

  // Scroll to contact (Telegram CTA)
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "public/screenshots/06-contact.png" });

  // Check all img elements
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("img")).map((img) => ({
      src: img.src,
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      visible: img.offsetWidth > 0 && img.offsetHeight > 0,
      alt: img.alt,
    }));
  });

  console.log("Total images found on page:", images.length);
  images.forEach((img, i) => {
    console.log(`Image ${i}:`, {
      alt: img.alt.substring(0, 35),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      visible: img.visible,
      complete: img.complete,
      srcPreview: img.src.substring(0, 70),
    });
  });

  await browser.close();
}

testScreenshots().catch(console.error);
