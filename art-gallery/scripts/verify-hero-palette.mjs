import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch();
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const base=process.env.TEST_URL||'http://localhost:3000';
 await page.goto(base+'/en',{waitUntil:'load'});
 const hero=page.locator('main section').first();
 await page.waitForFunction(()=>document.querySelector('[data-track="red"]').getAnimations().length>0);
 let previous;
 for(const time of [0,1000,3500,7000,10000,13000,16000,19000,19999]) {
  await hero.evaluate(async(el,time)=>{
   el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=time;});
   await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  },time);
  const state=await hero.evaluate(el=>({ink:getComputedStyle(el.querySelector('[data-ink]')).color,paths:[...el.querySelectorAll('[data-piece]')].map(x=>x.getAttribute('d')).join(' '),surfaces:[el,...el.querySelectorAll('[data-track]')].map(x=>getComputedStyle(x).backgroundColor),fills:[...el.querySelectorAll('[data-texture]')].slice(0,4).map(x=>getComputedStyle(x).fill)}));
  assert.equal(state.ink,'rgb(23, 36, 51)');
  for(const color of state.surfaces){
   const rgb=color.match(/[\d.]+/g).slice(0,3).map(Number).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
   assert(.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]>.22,`${time}: dark hero surface ${color}`);
  }
  assert(state.fills.every(fill=>!fill.includes('undefined')));
  if(time===3500)assert.notEqual(state.paths,previous,'hero geometry still animates');
  previous=state.paths;
  if(time===0)await hero.screenshot({path:'.animation-review/gallery-hero-opening.png'});
 }
 console.log('PASS nine hero timeline samples: bright surfaces, black ink, animated geometry, resolved palette fills, no black opening or closing');
}finally{await browser.close();}
