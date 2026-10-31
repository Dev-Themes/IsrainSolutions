import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:3000/en/contact', { waitUntil: 'networkidle' });
  assert((await page.locator('header img').getAttribute('src')).includes('final-lockup.png'));
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(node => JSON.parse(node.textContent)));
  assert(schemas.find(schema => schema['@type'] === 'Organization').logo.url.includes('final-logo.png'));
  for (const url of ['/opengraph-image', '/brand/opengraph.png']) {
    const response = await page.request.get(`http://localhost:3000${url}`);
    assert.equal(response.status(), 200);
    const buffer = await response.body();
    const metadata = await sharp(buffer).metadata();
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, 630);
    if (url === '/opengraph-image') await writeFile('.animation-review/final-brand-social.png', buffer);
  }
  for (const size of [32, 180, 192]) assert.equal((await page.request.get(`http://localhost:3000/brand/final-icon-${size}.png`)).status(), 200);
  assert.equal((await page.request.get('http://localhost:3000/favicon.ico')).status(), 200);
  const reveal = page.locator('footer button');
  await reveal.click();
  await page.waitForTimeout(850);
  assert((await reveal.locator('img').getAttribute('src')).includes('final-logo.png'));
  assert.equal(await reveal.getAttribute('aria-pressed'), 'true');
  await reveal.screenshot({ path: '.animation-review/final-brand-footer.png' });
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({ path: '.animation-review/final-brand-mobile.png' });
  assert.deepEqual(errors, []);
  console.log('PASS final header/footer logos, organization schema, social cards, favicon, touch icons, and mobile overflow.');
} finally {
  await browser.close();
}
