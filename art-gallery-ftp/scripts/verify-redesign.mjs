import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base = process.env.TEST_URL || 'http://localhost:3000';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({colorScheme:'dark'});
  page.setDefaultNavigationTimeout(90000);
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  let checks=0;
  for(const locale of ['en','fr']) {
    await page.goto(`${base}/${locale}`,{waitUntil:'load'});
    assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
    assert.equal(await page.locator('.package-item').count(),3);
    assert.equal(await page.locator('.package-pick').count(),1);
    assert.equal(await page.locator('.brand-poster').count(),1);
    assert.equal(await page.locator('#featured-work article').count(),3);
    for(const width of [320,360,375,390,414,480,640,768,1024,1280,1440,1600,1920,2560]) {
      await page.setViewportSize({width,height:900});
      await page.waitForTimeout(80);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${locale} ${width} overflow`);
      const boxes=await page.locator('.package-item').evaluateAll(items=>items.map(x=>{const r=x.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width};}));
      if(width<768) assert(boxes[1].y>boxes[0].y);
      else assert(boxes[1].x>boxes[0].x);
      checks++;
    }
    await page.locator('.package-cta').first().click();
    await page.waitForURL(`**/${locale}/packages/essential`);
    await page.locator(".plan-contact-link").click();
    await page.waitForURL(`**/${locale}/contact`);
    assert(await page.locator('a[href^="mailto:"]').first().isVisible());
    for(const route of ['work','products','about','contact','work/color-studies','products/noir-edition']) {
      const response=await page.goto(`${base}/${locale}/${route}`,{waitUntil:'load'});
      assert.equal(response.status(),200);
      assert.equal(await page.locator('h1').count(),1);
      assert(await page.locator('link[rel="canonical"]').count());
      await page.locator('footer').scrollIntoViewIfNeeded();
      const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.src));
      assert.deepEqual(broken,[],route+' broken images');
    }
  }
  await page.goto(`${base}/en`,{waitUntil:'load'});
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.poster-disc').evaluate(el=>getComputedStyle(el).animationName),'none');
  const eye=page.locator('footer button[type="button"]');
  await eye.scrollIntoViewIfNeeded();await eye.focus();await page.keyboard.press('Enter');
  assert.equal(await eye.getAttribute('aria-pressed'),'true');
  for(const path of ['/robots.txt','/sitemap.xml','/opengraph-image'])assert.equal((await page.request.get(base+path)).status(),200);
  assert.deepEqual(errors,[]);
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:'.animation-review/light-pop-home.png',fullPage:true});
  console.log(`PASS ${checks} bilingual responsive checks; packages/contact links; routes; metadata; images; reduced motion; keyboard footer; SEO; no console errors`);
} finally {await browser.close();}
