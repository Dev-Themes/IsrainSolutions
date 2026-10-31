import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { validateContent } from '../src/content/validate.mjs';

const base = process.env.REVIEW_BASE_URL || 'http://localhost:3000';
const read = file => JSON.parse(fs.readFileSync(new URL(`../src/content/${file}`, import.meta.url), 'utf8'));
const media = read('media.config.json').filter(item => item.visible);
assert.deepEqual(validateContent(), []);
const badOffers = read('offers.config.json');
badOffers[0].originalPrice = 1;
assert.ok(validateContent({ 'offers.config.json': badOffers }).some(error => error.includes('originalPrice')));
const badMedia = read('media.config.json');
badMedia[0].source = '../missing.mp4';
assert.ok(validateContent({ 'media.config.json': badMedia }).some(error => error.includes('.source')));
const badTranslations = read('pages/products.config.json');
delete badTranslations.ro.productsPage.heroSubtext;
assert.ok(validateContent({ 'pages/products.config.json': badTranslations }).some(error => error.includes('heroSubtext')));
const badLegal = read('legal/privacy.config.json');
badLegal.translations.ro.sections = [];
assert.ok(validateContent({ 'legal/privacy.config.json': badLegal }).some(error => error.includes('add sections')));
console.log('Content validation accepts real content and rejects broken prices, files, translations and legal sections.');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const review = path.resolve('.animation-review/client-content');
fs.mkdirSync(review, { recursive: true });
try {
  for (const locale of ['ro', 'fr', 'en']) {
    const response = await page.goto(`${base}/${locale}/products`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('html').getAttribute('lang'), locale);
    assert.equal(await page.locator('.product-stills figure').count(), media.length);
    assert.equal(await page.locator('.product-stills a, .product-stills button, .product-stills video, .product-stills [tabindex]').count(), 0);
    assert.equal(await page.locator('main a[href*="/products/"]').count(), 0);
    const captions = await page.locator('.product-stills figcaption h2').allTextContents();
    assert.deepEqual(captions, media.map(item => item.title[locale]));
    for (const kind of ['terms', 'privacy', 'cookies']) {
      const copy = read(`legal/${kind}.config.json`).translations[locale];
      const footerLink = page.locator(`footer a[href="/${locale}/${kind}"]`);
      assert.equal(await footerLink.count(), 1);
      await footerLink.click();
      await page.waitForURL(`**/${locale}/${kind}`);
      assert.equal(await page.locator('h1').innerText(), copy.title);
      for (const section of copy.sections) {
        assert.ok((await page.locator('main').innerText()).includes(section.heading));
        for (const paragraph of section.paragraphs) assert.ok((await page.locator('main').innerText()).includes(paragraph));
      }
      assert.match(await page.locator('link[rel="canonical"]').getAttribute('href'), new RegExp(`/${locale}/${kind}$`));
    }
    await page.goto(`${base}/${locale}/products/noir-edition`, { waitUntil: 'networkidle' });
    assert.equal(new URL(page.url()).pathname, `/${locale}/products`);
    console.log(`${locale}: config captions, all stills, footer legal pages, metadata and old detail redirect pass.`);
  }
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/ro/products`, { waitUntil: 'networkidle' });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    for (const image of await page.locator('.product-stills img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
      assert.ok(await image.evaluate(img => img.naturalWidth > 0));
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: path.join(review, `products-${width}.png`), fullPage: true });
    await page.goto(`${base}/ro/terms`, { waitUntil: 'networkidle' });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: path.join(review, `terms-${width}.png`), fullPage: true });
  }
  const sitemap = await (await page.request.get(`${base}/sitemap.xml`)).text();
  assert.ok(!sitemap.includes('/products/noir-edition'));
  assert.deepEqual(errors, []);
  console.log('Responsive stills and legal pages pass; all thumbnails load; no browser errors.');
} finally { await browser.close(); }
