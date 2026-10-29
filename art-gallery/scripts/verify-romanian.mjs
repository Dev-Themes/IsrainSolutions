import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = process.env.REVIEW_BASE_URL || "http://localhost:3000";
const review = path.join(root, ".animation-review/romanian");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "src/content/media.config.json"), "utf8"));
assert.equal(manifest.length, 27);
for (const film of manifest) { assert.ok(film.title.ro); assert.ok(film.category.ro); assert.ok(fs.existsSync(path.join(root, "public/videos", film.source))); }

fs.mkdirSync(review, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", error => errors.push(error.message));
const untranslated = /Watch the film|MAKE IT HAPPEN|Choose a focus|All products|Speculative Design Concept|No third-party|Next Concept|Survoler ou toucher|TARIF DE LANCEMENT/;
try {
  const rootResponse = await page.request.get(`${base}/?offer=3`, { maxRedirects: 0 });
  assert.match(rootResponse.headers().location, /\/ro\?offer=3$/);
  const contactRedirect = await page.request.get(`${base}/contact?offer=5`, { maxRedirects: 0 });
  assert.match(contactRedirect.headers().location, /\/ro\/contact\?offer=5$/);
  for (const locale of ["ro", "fr", "en"]) {
    const response = await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator("html").getAttribute("lang"), locale);
    assert.equal(await page.locator(".language-select").inputValue(), locale);
    assert.equal(await page.locator(".video-offer").count(), 3);
    const prices = await page.locator(".premium-price-main strong").allTextContents();
    assert.ok(prices[0].includes("499") && prices[1].includes("699") && prices[2].includes("999"));
    const oldPriceSize = await page.locator(".premium-price-main del").first().evaluate(e => parseFloat(getComputedStyle(e).fontSize));
    assert.ok(oldPriceSize >= 22);
    assert.ok(await page.locator(".premium-price-label > span:last-child").first().evaluate(e => parseFloat(getComputedStyle(e).fontSize)) >= 16);
    assert.ok(await page.locator(".premium-card-top > span").first().evaluate(e => parseFloat(getComputedStyle(e).fontSize)) >= 13);
    if (locale === "ro") {
      assert.match(await page.locator(".premium-offers").innerText(), /ECONOMISEȘTI 200 lei/);
      assert.match(await page.locator(".premium-card-top").last().innerText(), /Cel mai bun preț/);
      assert.equal(untranslated.test(await page.locator("body").innerText()), false);
      assert.match(await page.locator('link[rel="canonical"]').getAttribute("href"), /\/ro$/);
      assert.equal(await page.locator('meta[property="og:locale"]').getAttribute("content"), "ro_RO");
      assert.match(await page.locator('link[hreflang="x-default"]').getAttribute("href"), /\/ro$/);
    }
    console.log(`${locale}: existing home, prices, discount sizes and language selection pass`);
  }
  await page.goto(`${base}/ro/contact?offer=5#main-content`, { waitUntil: "networkidle" });
  assert.match(decodeURIComponent(await page.locator(".contact-start").getAttribute("href")), /5 videoclipuri de produs/);
  await page.locator(".language-select").selectOption("en");
  await page.waitForURL("**/en/contact?offer=5#main-content");
  assert.match(await page.locator(".contact-selected-offer").innerText(), /5 product videos/);
  await page.locator(".language-select").selectOption("fr");
  await page.waitForURL("**/fr/contact?offer=5#main-content");
  await page.locator(".language-select").selectOption("ro");
  await page.waitForURL("**/ro/contact?offer=5#main-content");
  console.log("Language switching preserves the page, selected offer and fragment");

  for (const route of ["work", "products", "about", "contact", "privacy", "cookies", "terms"]) {
    const response = await page.goto(`${base}/ro/${route}`, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200, route);
    const body = await page.locator("body").innerText();
    assert.equal(untranslated.test(body), false, route);
    assert.ok(/[ăâîșțĂÂÎȘȚ]/.test(body), route);
    if (route === "work") {
      assert.equal(await page.locator(".work-media-trigger").count(), 27);
      await page.getByRole("group", { name: "Filtrează filmele" }).getByRole("button", { name: /Frumusețe/ }).click();
      assert.ok(await page.locator(".work-media-trigger").count() > 0);
      await page.locator(".work-media-trigger").first().click();
      await page.getByRole("dialog").waitFor();
      const movie = page.locator("dialog video");
      await movie.evaluate(video => video.play());
      await page.waitForFunction(() => document.querySelector("dialog video")?.currentTime > .2);
      await page.getByRole("button", { name: "Închide", exact: true }).click();
    }
    if (route === "products") {
      assert.equal(await page.locator(".product-stills figure").count(), 27);
      assert.equal(await page.locator(".product-stills a, .product-stills button, .product-stills video").count(), 0);
    }
  }
  await page.goto(`${base}/ro/products/noir-edition`, { waitUntil: "networkidle" });
  assert.equal(new URL(page.url()).pathname, "/ro/products");
  for (const locale of ["ro", "fr", "en"]) {
    await page.goto(`${base}/${locale}/page-that-does-not-exist`, { waitUntil: "networkidle" });
    const heading = await page.locator("h1").innerText();
    assert.ok(heading.includes(locale === "ro" ? "Pagina" : locale === "en" ? "Page Not Found" : "Page Introuvable"), `${locale}: ${heading}`);
  }
  for (const width of [375, 390, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/ro`, { waitUntil: "networkidle" });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
    for (const card of await page.locator(".premium-offer-card").all()) {
      const fits = await card.evaluate(e => [...e.querySelectorAll(".premium-card-top > span, .premium-price-main > del, .premium-price-label > span:last-child")].every(child => {
        const a = e.getBoundingClientRect(), b = child.getBoundingClientRect(); return b.left >= a.left && b.right <= a.right;
      }));
      assert.equal(fits, true, `Price or badge escapes card at ${width}`);
    }
    await page.locator(".premium-offers").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll(".premium-offers img")].every(img => img.complete && img.naturalWidth));
    await page.locator(".premium-offers").screenshot({ path: path.join(review, `offers-ro-${width}.png`) });
  }
  const xml = await (await page.request.get(`${base}/sitemap.xml`)).text();
  assert.ok(xml.includes("/ro/products"));
  assert.ok(!xml.includes("/products/noir-edition"));
  assert.ok(xml.includes('hreflang="ro"'));
  assert.equal(errors.length, 0, errors.join("\n"));
  console.log("Romanian pages, static product stills, legal copy, redirects, 404s, SEO and responsive offers pass. No browser errors.");
} finally { await browser.close(); }
