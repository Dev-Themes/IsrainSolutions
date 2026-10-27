/* Integration checks against a running local dev or production server. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

const base = process.env.REVIEW_BASE_URL || "http://localhost:3000";
const review = path.resolve(scriptDirectory, "../.animation-review");

(async () => {
  fs.mkdirSync(review, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  let videoRequests = 0;
  page.on("request", request => { if (request.url().includes("/videos/") && request.url().endsWith(".mp4")) videoRequests++; });
  try {
    for (const locale of ["en", "fr"]) {
      const before = videoRequests;
      await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" });
      assert.equal(await page.locator(".brand-study").count(), 0);
      assert.equal(await page.locator(".video-offer").count(), 3);
      assert.equal(await page.locator('a[href*="/work/"]').count(), 0);
      assert.equal(videoRequests, before, "Gallery must not preload movies");
      for (const price of ["499", "699", "999"]) assert.ok((await page.locator(".video-offer-price").allTextContents()).some(text => text.includes(price)));
      const trigger = page.locator(".work-media-trigger").first();
      await trigger.click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor();
      const movie = dialog.locator("video");
      await movie.evaluate(video => video.play());
      await page.waitForFunction(() => document.querySelector("dialog video")?.currentTime > .3);
      assert.equal(new URL(page.url()).pathname, `/${locale}`);
      const oldMovie = await movie.elementHandle();
      // Switching creative stops the preceding player and preserves the dialog.
      await dialog.getByRole("button", { name: locale === "fr" ? "Création suivante" : "Next creative" }).click();
      await page.waitForFunction(() => document.querySelector("dialog video")?.videoHeight === 960);
      assert.equal(await oldMovie.evaluate(video => video.paused), true);
      await dialog.locator("video").evaluate(video => video.play());
      await page.waitForFunction(() => document.querySelector("dialog video")?.currentTime > .3);
      await page.screenshot({ path: path.join(review, `product-viewer-${locale}.png`) });
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "detached" });
      assert.equal(await trigger.evaluate(button => document.activeElement === button), true);
      assert.notEqual(await page.evaluate(() => document.body.style.overflow), "hidden");
      await page.goto(`${base}/${locale}/work`, { waitUntil: "networkidle" });
      assert.equal(await page.locator(".capabilities-section").count(), 0);
      assert.equal(await page.locator(".work-media-trigger").count(), 3);
      assert.equal(await page.locator('a[href*="/work/"]').count(), 0);
      await page.goto(`${base}/${locale}/contact?offer=5`, { waitUntil: "networkidle" });
      assert.ok((await page.locator(".contact-selected-offer").innerText()).includes("5"));
      assert.ok(decodeURIComponent(await page.locator(".contact-start").getAttribute("href")).includes(locale === "fr" ? "5 vidéos produit" : "5 product videos"));
      await page.goto(`${base}/${locale}/work/color-studies`, { waitUntil: "networkidle" });
      assert.equal(new URL(page.url()).pathname, `/${locale}/work`);
      await page.goto(`${base}/${locale}/packages/essential`, { waitUntil: "networkidle" });
      assert.equal(new URL(page.url()).pathname, `/${locale}`);
      assert.equal(new URL(page.url()).hash, "#packages");
      console.log(`${locale}: offers, lazy video loading, playback, portrait media, close/focus, enquiries and redirects pass`);
    }
    for (const slug of ["aura-skin", "soniq-lab", "noir-edition"]) {
      await page.goto(`${base}/en/work`, { waitUntil: "networkidle" });
      const index = ["aura-skin", "soniq-lab", "noir-edition"].indexOf(slug);
      await page.locator(".work-media-trigger").nth(index).click();
      const video = page.locator("dialog video");
      await video.evaluate(element => element.play());
      await page.waitForFunction(() => document.querySelector("dialog video")?.currentTime > .3);
      const info = await video.evaluate(element => ({ duration: element.duration, width: element.videoWidth, height: element.videoHeight, controls: element.controls }));
      assert.ok(info.duration >= 9.5 && info.duration <= 11, `${slug}: invalid duration ${info.duration}`);
      assert.equal(info.controls, true);
      await video.evaluate(element => { element.pause(); element.currentTime = 8.4; });
      await page.waitForFunction(() => !document.querySelector("dialog video").seeking);
      await video.screenshot({ path: path.join(review, `${slug}-end-card.png`) });
      console.log(`${slug}: ${info.width}x${info.height}, ${info.duration.toFixed(2)} seconds, decodes and seeks`);
    }
    await page.keyboard.press("Escape");
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/en`, { waitUntil: "networkidle" });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
      await page.locator(".video-offers").screenshot({ path: path.join(review, `video-offers-${width}.png`) });
      await page.locator(".work-media-trigger").first().click();
      assert.equal(await page.locator("dialog video").evaluate(video => video.paused), true, "Reduced motion must not autoplay");
      const rect = await page.locator("dialog").boundingBox();
      assert.ok(rect.x >= 0 && rect.x + rect.width <= width);
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.querySelector("dialog").contains(document.activeElement)), true);
      await page.keyboard.press("Escape");
    }
    await page.goto(`${base}/en/products`, { waitUntil: "networkidle" });
    assert.ok(await page.locator('a[href*="/products/"]').count() > 0, "Product detail links must remain");
    const sitemap = await (await page.request.get(`${base}/sitemap.xml`)).text();
    assert.equal(/\/work\/[^<]+/.test(sitemap), false);
    assert.equal(sitemap.includes("/packages/"), false);
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log("Responsive layouts, reduced motion, focus containment, products and sitemap pass. No browser errors.");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
