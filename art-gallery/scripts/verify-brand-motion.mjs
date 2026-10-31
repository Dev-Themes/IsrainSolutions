import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch();
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const [width,height] of [[320,568],[375,812],[768,1024],[1440,900],[844,390]]){
  await page.setViewportSize({width,height});await page.goto('http://localhost:3000/en',{waitUntil:'networkidle'});
  const hero=page.getByRole('heading',{name:'PopArt Agency',exact:true}).locator('xpath=ancestor::section');
  await page.waitForFunction(()=>document.querySelector('[data-glyph]')&&document.querySelector('[data-glyph]').closest('section').getAnimations().length===1);
  const frames=[];
  for(const t of [0,3040,4960,7360,8640,10400,12000,14400,16000]){
   const data=await hero.evaluate(async(el,t)=>{const clock=el.getAnimations()[0];clock.pause();clock.currentTime=t;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const svg=el.querySelector('svg');const box=svg.getBBox();return {paths:[...el.querySelectorAll('[data-glyph]')].map(p=>p.getAttribute('d')),box:{x:box.x,y:box.y,width:box.width,height:box.height},overflow:document.documentElement.scrollWidth>innerWidth+1};},t);
   assert(!data.overflow);assert.equal(data.paths.length,20);assert(data.paths.every(d=>!d.includes('NaN')));assert(data.box.x>=0&&data.box.x+data.box.width<=1040&&data.box.y>=0&&data.box.y+data.box.height<=600,JSON.stringify(data.box));frames.push(data.paths);
   if(width===1440&&[0,3040,4960,7360,8640,10400].includes(t))await page.screenshot({path:`docs/popart-reference-${t}.png`});
  }
  assert.deepEqual(frames[0],frames.at(-1));assert.notDeepEqual(frames[0],frames[1]);
  assert((await page.locator('header img').getAttribute('src')).includes('final-lockup.png'));
  console.log(`PASS ${width}x${height}: glyphs, ribbons, poster, orbit, compact mark, fan, seamless loop, bounds and supplied logo`);
 }
 const hero=page.getByRole('heading',{name:'PopArt Agency',exact:true}).locator('xpath=ancestor::section');
 await page.setViewportSize({width:1440,height:900});
 await page.goto('http://localhost:3000/en',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Pause',exact:true}).click();
 assert.equal(await page.getByRole('button',{name:'Resume',exact:true}).getAttribute('aria-pressed'),'true');
 await hero.evaluate(el => { el.getAnimations()[0].currentTime = 6000; });
 await page.waitForTimeout(50);
 const before=await hero.evaluate(el=>el.getAnimations()[0].currentTime);
 await page.waitForTimeout(150);
 assert.equal(await hero.evaluate(el=>el.getAnimations()[0].currentTime),before);
 const color=await page.locator('[data-glyph]').first().evaluate(p=>p.style.fill);
 await page.getByRole('button',{name:'Remix',exact:true}).click();
 assert.notEqual(await page.locator('[data-glyph]').first().evaluate(p=>p.style.fill),color);
 assert.equal(await hero.evaluate(el=>el.getAnimations()[0].currentTime),before,'remix must not restart the loop');
 const target=await page.locator('[data-piece]').first().boundingBox();
 await page.mouse.move(target.x+target.width/2,target.y+target.height/2);
 await page.waitForTimeout(350);
 const transform=await page.locator('[data-piece]').first().getAttribute('transform');
 assert(!transform.startsWith('translate(0.000 0.000)'),transform);
 await page.mouse.move(0,0);
 await page.waitForTimeout(1200);
 const translation=await page.locator('[data-piece]').first().getAttribute('transform');
 const settled=translation.match(/translate\(([-\d.]+) ([-\d.]+)\)/);
 assert(settled && Math.abs(Number(settled[1]))<.01 && Math.abs(Number(settled[2]))<.01,translation);
 await page.getByRole('button',{name:'Resume',exact:true}).click();
 assert.equal(await hero.evaluate(el=>el.getAnimations()[0].playState),'running');
 console.log('PASS pause/resume, pointer response and return, color remix without timeline reset');
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);assert.equal(await page.locator('[data-glyph]').first().evaluate(p=>p.closest('section').getAnimations().length),0);assert.deepEqual(errors,[]);console.log('PASS reduced motion and no runtime errors');
}finally{await browser.close()}
