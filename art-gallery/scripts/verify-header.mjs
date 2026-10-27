import { chromium } from "playwright";
import assert from "node:assert/strict";
const browser = await chromium.launch();
const base = process.env.TEST_URL || "http://localhost:3000";
try {
  const page = await browser.newPage({ colorScheme: "light" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  for (const locale of ["en", "fr"]) {
    await page.goto(`${base}/${locale}/products`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelector("header").dataset.navFit);
    for (const width of [320,390,480,528,540,568,600,640,720,768,820,1024,1100,1440,2560]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(60);
      const full = await page.locator(".desktop-navigation").isVisible();
      const menu = await page.locator(".navigation-toggle").isVisible();
      assert.notEqual(full,menu,`${locale} ${width}: navigation must have one presentation`);
      if (width >= 640) assert(full,`${locale} ${width}: full navigation should fit`);
      if (width <= 390) assert(menu,`${locale} ${width}: compact navigation required`);
      if (full) {
        const boxes = await page.locator(".desktop-navigation a").evaluateAll(links=>links.map(link=>{const r=link.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width}}));
        assert(boxes.every((box,i)=>box.width>0&&(!i||box.left>=boxes[i-1].right)),`${locale} ${width}: links overlap`);
      }
      assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`${locale} ${width}: overflow`);
    }
  }
  console.log("PASS navigation fit and non-overlapping links at 15 widths in English and French");
  await page.goto(`${base}/en`,{waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("button.theme-control").count(),0);
  await page.evaluate(() => localStorage.setItem("popart-theme","dark"));
  await page.emulateMedia({colorScheme:"dark"});
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("html").getAttribute("data-theme"),"light");
  assert.equal(await page.locator("header img").getAttribute("src").then(decodeURIComponent).then(src=>src.includes("/Brand Asset/new-logo.png")),true);
  await page.setViewportSize({width:390,height:844});
  await page.waitForTimeout(80);
  await page.locator(".navigation-toggle").click();
  assert.equal(await page.evaluate(()=>document.body.style.overflow),"hidden");
  await page.setViewportSize({width:768,height:900});
  await page.waitForTimeout(120);
  assert(await page.locator(".desktop-navigation").isVisible());
  assert.equal(await page.locator(".mobile-navigation").count(),0);
  assert.notEqual(await page.evaluate(()=>document.body.style.overflow),"hidden");
  await page.locator("footer button").scrollIntoViewIfNeeded();
  await page.locator("footer button").click();
  await page.waitForTimeout(850);
  assert(await page.locator("footer img").isVisible());
  assert.equal(await page.locator("footer button").evaluate(el=>getComputedStyle(el).backgroundColor),"rgba(0, 0, 0, 0)");
  assert.deepEqual(errors,[]);
  console.log("PASS permanent light theme, supplied logo, footer transformation, and drawer cleanup on resize");
} finally { await browser.close(); }
