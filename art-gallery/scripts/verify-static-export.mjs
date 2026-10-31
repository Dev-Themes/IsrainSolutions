import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { createStaticServer } from './serve-static.mjs';

const server = createStaticServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const results = [];
const check = (condition, label) => { assert(condition, label); results.push(label); console.log(`PASS ${label}`); };
let browser;
try {
  const routes = JSON.parse(await readFile('.next/static-export-routes.json', 'utf8'));
  await assert.rejects(access(join('out', 'public_html')));
  check(true, 'Export has no nested public_html directory');
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();

  check((await fetch(`${base}/robots.txt`)).status === 200, 'Robots served');
  const og = await fetch(`${base}/opengraph-image`);
  check(og.status === 200 && og.headers.get('content-type') === 'image/png', 'Static Open Graph image served as PNG');
  for (const route of routes) {
    const response = await fetch(`${base}${route}/`);
    check(response.status === 200, `Export route ${route}`);
    if (!route.includes('/portfolio') && !route.includes('/packages/')) {
      const html = await response.text();
      check(/rel="canonical"/.test(html) && /property="og:image"/.test(html), `SEO metadata ${route}`);
    }
  }
  for (const locale of ['en', 'fr', 'ro']) {
    for (const legal of ['terms', 'privacy', 'cookies']) {
      await access(join('out', locale, legal, 'index.html'));
      check(sitemap.includes('<loc>https://popart.agency/' + locale + '/' + legal + '/</loc>'), 'Sitemap includes ' + locale + '/' + legal);
      for (const suffix of ['', '/', '/index.html']) check((await fetch(base + '/' + locale + '/' + legal + suffix)).status === 200, 'Legal URL served ' + locale + '/' + legal + suffix);
    }
    check((await fetch(`${base}/${locale}/unknown-page/`)).status === 404, `Unknown ${locale} URL returns 404`);
  }
  for (const legal of ['terms', 'privacy', 'cookies']) check((await fetch(`${base}/${legal}/`)).status === 404, `Unprefixed ${legal} returns 404`);

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [], failures = [], remoteFailures = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400 && !/\/(unknown-page)/.test(response.url())) (response.url().startsWith(base) ? failures : remoteFailures).push(`${response.status()} ${response.url()}`); });
  page.on('requestfailed', request => { if (!request.failure()?.errorText.includes('ERR_ABORTED')) (request.url().startsWith(base) ? failures : remoteFailures).push(`${request.failure()?.errorText} ${request.url()}`); });
  const goto = async path => { const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' }); assert.equal(response.status(), 200, path); };
  await goto('/?offer=3#packages');
  await page.waitForURL('**/ro/?offer=3#packages');
  check(true, 'Root sends visitors to Romanian and preserves query/anchor');
  await goto('/contact/?offer=2'); await page.waitForURL('**/ro/contact/?offer=2');
  await page.locator('.contact-selected-offer').waitFor();
  check((await page.locator('.contact-selected-offer').innerText()).includes('2'), 'Unprefixed Contact preserves offer');

  for (const locale of ['en', 'fr', 'ro']) {
    for (const kind of ['terms', 'privacy', 'cookies']) {
      const content = JSON.parse(await readFile('src/content/legal/' + kind + '.config.json', 'utf8'));
      const copy = content.translations[locale];
      const path = '/' + locale + '/' + kind + '/';
      await goto(path);
      await page.reload({ waitUntil: 'networkidle' });
      check(await page.locator('html').getAttribute('lang') === locale && await page.locator('main h1').textContent() === copy.title, 'Direct navigation and refresh ' + path);
      check(await page.locator('main article section h2').count() === copy.sections.length, 'Original section structure ' + path);
      const text = await page.locator('main article').innerText();
      check(text.includes(copy.intro) && copy.sections.every(section => text.includes(section.heading) && section.paragraphs.every(paragraph => text.includes(paragraph))), 'Original placeholder content ' + path);
    }
  }
  const links = new Set(), assets = new Set();
  for (const locale of ['en', 'fr', 'ro']) {
    for (const path of ['', '/work', '/products', '/about', '/contact']) {
      await goto(`/${locale}${path}/`);
      check(await page.locator('html').getAttribute('lang') === locale, `Language ${locale}${path}`);
      check(await page.locator('main h1').count() > 0, `Page heading ${locale}${path}`);
      check(await page.locator('footer a[href*="/terms"],footer a[href*="/privacy"],footer a[href*="/cookies"]').count() === 0, 'Legal footer links hidden ' + locale + path);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 15)); }
      });
      await page.waitForTimeout(200);
      for (const href of await page.locator('a[href]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))) if (href.startsWith('/')) links.add(href);
      for (const src of await page.locator('img').evaluateAll(nodes => nodes.map(n => n.currentSrc || n.src))) assets.add(src);
      const broken = await page.locator('img').evaluateAll(nodes => nodes.filter(n => n.complete && n.naturalWidth === 0).map(n => n.src));
      check(broken.length === 0, `Images loaded ${locale}${path}: ${broken.join(',')}`);
    }
    const work = routes.find(r => r.startsWith(`/${locale}/work/`));
    const product = routes.find(r => r.startsWith(`/${locale}/products/`));
    await goto(`${work}/`); await page.reload({ waitUntil: 'networkidle' });
    check(await page.locator('main h1').isVisible(), `Work case study and refresh ${locale}`);
    await goto(`${product}/`); await page.reload({ waitUntil: 'networkidle' });
    check(await page.locator('main h1').isVisible(), `Product case study and refresh ${locale}`);
    await page.locator('button[aria-label$="Image 1"]').first().click();
    await page.getByRole('dialog').waitFor();
    await page.keyboard.press('ArrowRight'); await page.keyboard.press('Escape');
    check(await page.getByRole('dialog').count() === 0 || !(await page.getByRole('dialog').isVisible()), `Product image lightbox ${locale}`);
    for (const offer of [2, 3, 5]) {
      await goto(`/${locale}/contact/?offer=${offer}`);
      await page.locator('.contact-selected-offer').waitFor();
      check((await page.locator('.contact-selected-offer').innerText()).includes(String(offer)), `Contact offer ${offer} ${locale}`);
      const href = await page.locator('.contact-start').getAttribute('href');
      check(decodeURIComponent(href).includes(`${offer} `), `Email subject retains offer ${offer} ${locale}`);
    }
    await goto(`/${locale}/contact/?offer=invalid`);
    check(await page.locator('.contact-selected-offer').count() === 0, `Invalid offer safely ignored ${locale}`);
    await goto(`/${locale}/`);
    await page.locator('.premium-offer-cta').first().click();
    await page.locator('.contact-selected-offer').waitFor();
    check(true, `Package CTA client navigation ${locale}`);
    const next = locale === 'en' ? 'fr' : locale === 'fr' ? 'ro' : 'en';
    await page.locator('.language-select').selectOption(next);
    await page.waitForURL(`**/${next}/contact/?offer=2`);
    check((await page.locator('.contact-selected-offer').innerText()).includes('2'), `Language switch preserves offer ${locale} to ${next}`);
    await goto(`/${locale}/work/`);
    await page.locator('.work-media-trigger').first().click();
    await page.locator('dialog[open]').waitFor();
    await page.waitForFunction(() => document.querySelector('dialog video')?.readyState >= 1);
    check(true, `Work video lightbox and media metadata ${locale}`);
    await page.keyboard.press('ArrowRight'); await page.keyboard.press('Escape');
    check(await page.locator('dialog[open]').count() === 0, `Work lightbox closes ${locale}`);
    await goto(`/${locale}/portfolio/`); await page.waitForURL(`**/${locale}/products/`);
    check(true, `Portfolio alias ${locale}`);
    await goto(`/${locale}/packages/essential/`); await page.waitForURL(`**/${locale}/#packages`);
    check(true, `Legacy package alias ${locale}`);
  }
  await goto('/en/');
  const hero = page.locator('main section').first();
  await hero.scrollIntoViewIfNeeded();
  const glyph = hero.locator('[data-glyph]').first();
  const initial = await glyph.getAttribute('d');
  await page.waitForFunction(initial => document.querySelector('[data-glyph]')?.getAttribute('d') !== initial, initial, { timeout: 20000 });
  check(true, 'Homepage geometric animation changes shape');
  await hero.getByRole('button', { name: 'Pause', exact: true }).click();
  check(await hero.getByRole('button', { name: 'Resume', exact: true }).getAttribute('aria-pressed') === 'true', 'Hero pause/resume control');
  await hero.getByRole('button', { name: /Remix/ }).click();
  await hero.getByRole('button', { name: 'Resume', exact: true }).click();
  const eye = page.locator('footer .brand-reveal');
  await eye.hover(); await page.waitForTimeout(850);
  check(await eye.getAttribute('aria-pressed') === 'true', 'Footer eye hover reveals brand');
  check((await eye.locator('img').getAttribute('src')).includes('final-logo.png'), 'Footer uses preserved brand image');
  await page.mouse.move(0, 0); await page.waitForTimeout(800);
  await eye.click(); check(await eye.getAttribute('aria-pressed') === 'true', 'Footer eye click locks brand reveal');
  await page.keyboard.press('Escape');

  await mkdir('docs/static-verification', { recursive: true });
  for (const width of [320, 375, 480, 768, 1024, 1440, 1920, 2560]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/en/', '/fr/work/', '/ro/products/', '/en/about/', '/ro/contact/?offer=3', '/en/products/noir-edition/', '/ro/work/color-studies/', '/ro/privacy/', '/en/terms/', '/fr/cookies/']) {
      await goto(path);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No horizontal overflow ${width}px ${path}`);
      if (width === 320 && path === '/en/') {
        const toggle = page.locator('.navigation-toggle'); await toggle.click();
        check(await page.locator('#mobile-navigation').isVisible(), '320px mobile navigation opens');
        await page.keyboard.press('Escape');
      }
    }
    if ([320, 1440, 2560].includes(width)) await page.screenshot({ path: `docs/static-verification/viewport-${width}.png`, fullPage: true });
  }
  for (const link of links) check((await fetch(new URL(link, base))).status === 200, `Internal link ${link}`);
  for (const asset of assets) check((await fetch(asset)).status === 200, `Image asset ${new URL(asset).pathname}`);
  check(errors.length === 0, `No browser runtime errors: ${errors.join('; ')}`);
  check(failures.length === 0, `No failed asset requests: ${failures.join('; ')}`);
  await writeFile('docs/static-verification/results.json', JSON.stringify({ checkedAt: new Date().toISOString(), passed: results.length, results, errors, failures, remoteFailures: [...new Set(remoteFailures)] }, null, 2));
  console.log(`SUCCESS: ${results.length} local checks passed against static out/. Remote image failures recorded separately: ${new Set(remoteFailures).size}.`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
