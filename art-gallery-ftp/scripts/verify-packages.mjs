import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch();
const base=process.env.TEST_URL||'http://localhost:3000';
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 const plans=[['essential','Essential',1200],['studio','Studio',2800],['full-creative','Full Creative',5500]];
 const titles=new Set();let checks=0;
 for(const locale of ['en','fr']) {
  await page.goto(`${base}/${locale}`,{waitUntil:'load'});
  for(const [slug,,amount] of plans) {
   const price=new Intl.NumberFormat(locale==='fr'?'fr-FR':'en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(amount);
   const card=page.locator('.package-item').filter({has:page.locator(`a[href="/${locale}/packages/${slug}"]`)});
   assert((await card.locator('.package-price').innerText()).includes(price));
  }
  await page.locator('.package-cta').first().click();
  await page.waitForURL(`**/${locale}/packages/essential`);
  for(const [slug,name,amount] of plans) {
   const response=await page.goto(`${base}/${locale}/packages/${slug}`,{waitUntil:'load'});
   assert.equal(response.status(),200);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('h1').textContent(),name);
   const price=new Intl.NumberFormat(locale==='fr'?'fr-FR':'en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(amount);
   assert((await page.locator('.plan-amount').innerText()).includes(price));
   assert((await page.locator('.plan-draft-label').innerText()).length>0);
   assert((await page.locator('.plan-deliverable').count())>=4);
   assert.equal(await page.locator('.plan-workflow li').count(),3);
   assert.equal(await page.locator('.plan-practical > div').count(),3);
   assert.equal(await page.locator('.plan-related a').count(),2);
   assert((await page.locator('link[rel="canonical"]').getAttribute('href')).endsWith(`/${locale}/packages/${slug}`));
   assert(await page.locator(`link[rel="alternate"][hreflang="${locale==='fr'?'en':'fr'}"]`).count());
   const title=await page.title();assert(!titles.has(title));titles.add(title);
   const mail=await page.locator('.plan-terms a').getAttribute('href');assert(decodeURIComponent(mail).includes(name));
   for(const width of [320,360,375,390,414,480,640,768,1024,1280,1440,1600,1920,2560]) {
    await page.setViewportSize({width,height:900});await page.waitForTimeout(60);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${locale} ${slug} ${width}px overflow`);
    const box=await page.locator('.plan-contact-link').boundingBox();assert(box.height>=44);
    checks++;
   }
   const otherLocale=locale==='en'?'fr':'en';
   await page.locator(`header a[hreflang="${otherLocale}"]`).click();
   await page.waitForURL(`**/${otherLocale}/packages/${slug}`);
   await page.goto(`${base}/${locale}/packages/${slug}`,{waitUntil:'load'});
   await page.locator('.plan-contact-link').click();await page.waitForURL(`**/${locale}/contact`);
  }
 }
 for(const locale of ['en','fr'])assert.equal((await page.goto(`${base}/${locale}/packages/nonexistent-plan`,{waitUntil:'load'})).status(),404);
 const sitemap=await (await page.request.get(base+'/sitemap.xml')).text();
 for(const locale of ['en','fr'])for(const [slug]of plans)assert(sitemap.includes(`/${locale}/packages/${slug}`));
 await page.goto(base+'/en/packages/studio',{waitUntil:'load'});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'.animation-review/package-studio-desktop.png',fullPage:true});
 await page.setViewportSize({width:375,height:812});await page.waitForTimeout(100);await page.screenshot({path:'.animation-review/package-studio-mobile.png',fullPage:true});
 // Invalid slugs deliberately return HTTP 404; ignore their expected resource console messages.
 assert.deepEqual(errors.filter(message=>!message.includes('404')),[]);
 console.log(`PASS six bilingual plan pages, ${checks} viewport checks, matching homepage/detail prices, distinct metadata, locale switches, contact links, mail subjects, related plans, sitemap entries and invalid-plan 404s`);
}finally{await browser.close();}
