import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { createStaticServer } from './serve-static.mjs';

const server = createStaticServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
const results = [], errors = [];
const check = (condition, label) => { assert(condition, label); results.push(label); console.log(`PASS ${label}`); };
const content = JSON.parse(await readFile('src/content/pages/product-service.config.json', 'utf8'));
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', error => errors.push(error.message));
  const goto = async path => {
    const response = await page.goto(base + path, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, path);
    await page.evaluate(() => document.fonts.ready);
  };
  const packageStyles = () => page.locator('#packages').evaluate(root => {
    const selectors = ['.premium-offer-heading h2', '.premium-offer-card', '.premium-offer-card h3', '.premium-price-unit', '.premium-offer-cta'];
    return selectors.map(selector => {
      const s = getComputedStyle(root.querySelector(selector));
      return [s.fontFamily, s.fontSize, s.fontWeight, s.color, s.backgroundColor, s.padding];
    });
  });
  for (const locale of ['ro', 'en', 'fr']) {
    await goto(`/${locale}/`);
    const homeText = await page.locator('#packages').innerText();
    const homeStyles = await packageStyles();
    check(await page.locator('footer a[href*="/terms"],footer a[href*="/privacy"],footer a[href*="/cookies"]').count() === 0, `Footer legal links hidden ${locale}`);
    const badge = page.locator('.premium-price-unit').first();
    check((await badge.innerText()).includes(locale === 'en' ? '249.5' : '249,5'), `Correct per-video price ${locale}`);
    check(await badge.evaluate(node => parseFloat(getComputedStyle(node).fontSize) >= 18), `Per-video price is prominent ${locale}`);
    await goto(`/${locale}/products/`);
    check(await page.locator('main h1').textContent() === `${content[locale].title} ${content[locale].titleEm}`, `Localized Products hero ${locale}`);
    check(await page.locator('#packages').innerText() === homeText, `Products and homepage package content identical ${locale}`);
    assert.deepEqual(await packageStyles(), homeStyles, `Package styles differ ${locale}`);
    check(true, `Products and homepage package styling identical ${locale}`);
    check(await page.locator('main details').count() === 5, `Products FAQ ${locale}`);
    await page.locator('main details summary').first().click();
    check(await page.locator('main details').first().getAttribute('open') !== null, `FAQ opens ${locale}`);
    const preview = page.locator('main video').first();
    check(await preview.evaluate(video => video.muted && video.controls && video.videoWidth > 0), `Products preview playable and muted ${locale}`);
    await preview.evaluate(video => video.play());
    check(await preview.evaluate(video => !video.paused), `Products preview playback ${locale}`);
    await preview.evaluate(video => video.pause());
    await page.locator('.premium-offer-cta').first().click();
    await page.waitForURL(`**/${locale}/contact/?offer=2`);
    check((await page.locator('.contact-selected-offer').innerText()).includes('2'), `Products package enquiry preserved ${locale}`);
    await goto(`/${locale}/work/`);
    for (let index = 0; index < 4; index++) {
      await page.locator('.work-media-trigger').nth(index).click();
      const video = page.locator('dialog[open] video');
      await video.waitFor();
      check(await video.evaluate(node => node.muted) === (index < 3), `Work film ${index + 1} default mute ${locale}`);
      check(await video.evaluate(node => node.controls), `Work film ${index + 1} retains controls ${locale}`);
      if (index === 0) {
        await video.evaluate(node => { node.muted = false; });
        check(await video.evaluate(node => !node.muted), `Visitor can enable sound ${locale}`);
      }
      await page.keyboard.press('Escape');
    }
  }
  await goto('/ro/products/');
  await page.evaluate(() => {
    const sample = '\u0102\u0103 \u00c2\u00e2 \u00ce\u00ee \u0218\u0219 \u021a\u021b';
    for (const [id, family, weight] of [['sans', '--font-geist-sans', '400'], ['bold', '--font-geist-sans', '700'], ['mono', '--font-geist-mono', '500']]) {
      const element = document.createElement('p');
      element.id = `font-check-${id}`;
      element.textContent = sample;
      element.style.cssText = `font-family:var(${family});font-weight:${weight};font-size:28px;padding:12px;line-height:2`;
      document.querySelector('main').prepend(element);
    }
  });
  await page.evaluate(() => document.fonts.ready);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root } = await cdp.send('DOM.getDocument');
  const fontReport = [];
  for (const id of ['sans', 'bold', 'mono']) {
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: `#font-check-${id}` });
    const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
    check(fonts.length > 0 && fonts.every(font => font.isCustomFont), `Romanian ${id}: custom font renders every glyph without fallback`);
    fontReport.push({ id, fonts });
  }
  await mkdir('docs/client-updates', { recursive: true });
  await page.screenshot({ path: 'docs/client-updates/romanian-fonts.png', fullPage: false });
  await writeFile('docs/client-updates/font-rendering.json', JSON.stringify(fontReport, null, 2));
  await goto('/ro/products/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  check(await page.locator('main video').first().evaluate(video => video.paused), 'Products preview respects reduced motion');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  check(await page.locator('#product-films .work-media-trigger').count() === 5, 'Products has five playable film examples');
  for (const locale of ['ro', 'fr', 'en']) {
    await goto(`/${locale}/products/`);
    for (const width of [320, 375, 480, 768, 1024, 1440, 1920, 2560]) {
      await page.setViewportSize({ width, height: 1000 });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Products responsive ${locale} ${width}px`);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await goto('/ro/products/');
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo({ top: y, behavior: 'instant' }); await new Promise(resolve => setTimeout(resolve, 30)); }
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
    scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'docs/client-updates/products-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 375, height: 900 });
  await page.screenshot({ path: 'docs/client-updates/products-mobile.png', fullPage: true });
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Products mobile has no horizontal overflow');
  check(errors.length === 0, `No browser errors: ${errors.join('; ')}`);
  await writeFile('docs/client-updates/results.json', JSON.stringify({ checkedAt: new Date().toISOString(), passed: results.length, results, errors }, null, 2));
  console.log(`SUCCESS: ${results.length} client update checks passed.`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
