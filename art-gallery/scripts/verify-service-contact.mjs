import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://localhost:3000';
const browser=await chromium.launch();
try {
 const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage();const errors=[];let checks=0;
 page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 for(const locale of ['en','fr']) {
  await page.goto(`${base}/${locale}/work`,{waitUntil:'load'});
  const cards=page.locator('.capability-card');assert.equal(await cards.count(),6);
  await cards.first().locator('summary').focus();await page.keyboard.press('Enter');
  assert(await cards.first().evaluate(el=>el.open));
  assert(await cards.first().locator('.capability-content').isVisible());
  await cards.nth(1).locator('summary').click();
  assert(await cards.nth(1).evaluate(el=>el.open));assert(!(await cards.first().evaluate(el=>el.open)));
  await cards.nth(1).locator('summary').focus();await page.keyboard.press('Space');assert(!(await cards.nth(1).evaluate(el=>el.open)));
  for(let i=0;i<6;i++) {
   await cards.nth(i).locator('summary').click();
   const href=await cards.nth(i).locator('.capability-content a').getAttribute('href');
   assert.equal((await page.request.get(base+href)).status(),200);
   assert.equal(await cards.nth(i).locator('.capability-content li').count(),3);
  }
  const cover=cards.first().locator('.capability-cover');await cover.hover({position:{x:80,y:70}});
  await page.waitForFunction(()=>document.querySelector('.capability-cover').dataset.pointerActive==='true');
  await page.screenshot({path:`.animation-review/experience-work-${locale}.png`,fullPage:true});
  for(const route of ['work','contact','']) {
   await page.goto(`${base}/${locale}/${route}`,{waitUntil:'load'});
   for(const width of [320,360,375,390,414,480,640,768,1024,1280,1440,1600,1920,2560]) {
    await page.setViewportSize({width,height:900});await page.waitForTimeout(70);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${locale}/${route} ${width}: overflow`);
    checks++;
   }
  }
  await page.goto(`${base}/${locale}/contact`,{waitUntil:'load'});
  assert.equal(await page.locator('h1').count(),1);
  const topics=page.locator('.contact-topics button');assert.equal(await topics.count(),4);
  for(let i=0;i<4;i++) {
   await topics.nth(i).click();assert.equal(await topics.nth(i).getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('.contact-topics button[aria-pressed="true"]').count(),1);
   const subject=new URL(await page.locator('.contact-start').getAttribute('href')).searchParams.get('subject');
   assert(subject.includes((await topics.nth(i).innerText()).trim()));
  }
  await topics.first().focus();await page.keyboard.press('Enter');assert.equal(await topics.first().getAttribute('aria-pressed'),'true');
  await page.locator('.contact-copy').click();
  await page.waitForFunction(()=>document.querySelector('.contact-copy-status').textContent.length>0);
  assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'hello@popart.example');
  await page.evaluate(()=>Object.defineProperty(navigator.clipboard,'writeText',{configurable:true,value:async()=>{throw new Error('Clipboard unavailable');}}));
  await page.locator('.contact-copy').click();
  await page.waitForFunction(()=>document.querySelector('.contact-copy-status').textContent.includes('indisponible')||document.querySelector('.contact-copy-status').textContent.includes('unavailable'));
  assert.equal(await page.locator('.contact-socials a').count(),4);
  assert.equal(await page.locator('.contact-start').getAttribute('href').then(href=>href.startsWith('mailto:hello@popart.example?subject=')),true);
 }
 await page.goto(`${base}/en/contact`,{waitUntil:'load'});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'.animation-review/contact-experience-desktop.png',fullPage:true});
 await page.setViewportSize({width:375,height:812});await page.screenshot({path:'.animation-review/contact-experience-mobile.png',fullPage:true});
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.contact-project-panel').hover();
 assert.equal(await page.locator('.contact-orbit').evaluate(el=>getComputedStyle(el).transform),'none');
 const touch=await browser.newContext({isMobile:true,hasTouch:true,viewport:{width:375,height:812}});
 const mobile=await touch.newPage();await mobile.goto(base+'/en/work',{waitUntil:'load'});
 await mobile.locator('.capability-card summary').first().tap();assert(await mobile.locator('.capability-card').first().evaluate(el=>el.open));
 await mobile.goto(base+'/en/contact',{waitUntil:'load'});await mobile.locator('.contact-topics button').nth(2).tap();assert.equal(await mobile.locator('.contact-topics button').nth(2).getAttribute('aria-pressed'),'true');
 await touch.close();assert.deepEqual(errors,[]);
 console.log(`PASS ${checks} responsive checks; six native disclosures, keyboard/touch controls, related-project destinations, localized enquiry subjects, clipboard success/error feedback, contact semantics, social links, reduced motion, no browser errors`);
}finally{await browser.close();}
