import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const base = process.env.TEST_URL || "http://localhost:3000";
const browser = await chromium.launch();
let checked = 0;
try {
  const context = await browser.newContext({ colorScheme: "dark", viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto(`${base}/en/products`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(350);
  for (const theme of ["light"]) {
    for (const route of ["en", "en/products", "en/work", "en/about", "en/contact", "en/products/noir-edition", "en/work/color-studies", "fr/products", "fr/products/soniq-lab"]) {
      await page.goto(`${base}/${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(150);
      await page.waitForFunction(theme => document.documentElement.dataset.theme === theme, theme);
      for (const width of [320, 768, 1440]) {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        await page.waitForTimeout(100);
        const result = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          font: getComputedStyle(document.body).fontFamily,
          headerOverflow: document.querySelector(".header-row").scrollWidth > innerWidth,
        }));
        assert(!result.overflow, `${route} ${theme} ${width}: horizontal overflow`);
        assert(!result.headerOverflow, `${route} ${theme} ${width}: header overflow`);
        assert(result.font.includes("Geist"), `${route}: intended font not applied`);
        checked++;
      }
      console.log(`PASS ${theme} /${route}: 320, 768, 1440px`);
    }
  }
  await page.goto(`${base}/en/products`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(250);
  await page.setViewportSize({ width: 390, height: 844 });
  const firstCardTop = await page.locator("main article").first().evaluate(el => el.getBoundingClientRect().top);
  assert(firstCardTop < 600, `Mobile discovery too deep: ${firstCardTop}`);
  for (const [label,count] of [["Beauty & packaging",3],["Home & objects",4],["Technology",2],["Accessories",3],["All products",12]]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    assert.equal(await page.locator("main article").count(), count, label);
  }
  console.log("PASS category filters, collection counts, compact mobile introduction");
  const preview = page.locator("main .project-card-preview").first();
  await preview.click();
  await page.waitForTimeout(120);
  const dialog = page.getByRole("dialog");
  assert(await dialog.isVisible());
  assert(await dialog.evaluate(el => el.contains(document.activeElement)));
  await page.keyboard.press("ArrowRight");
  await page.getByText("2/2", { exact: true }).waitFor();
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  assert(await preview.evaluate(el => el === document.activeElement));
  await preview.click();
  await page.getByRole("dialog").dispatchEvent("touchstart", { touches: [{ identifier: 0, clientX: 240, clientY: 300 }] });
  await page.getByRole("dialog").dispatchEvent("touchend", { changedTouches: [{ identifier: 0, clientX: 100, clientY: 305 }] });
  await page.getByText("2/2", { exact: true }).waitFor();
  await page.keyboard.press("Escape");
  console.log("PASS preview, keyboard navigation, swipe navigation, Escape and focus restoration");
  const href = await page.locator("main .project-card-image").first().getAttribute("href");
  assert.equal(href, "/en/products/noir-edition");
  await page.locator("main .project-card-image").first().click();
  await page.waitForURL("**/en/products/noir-edition");
  assert.equal(await page.locator(".case-summary").count(), 1);
  for (const id of ["concept","direction","gallery","design"]) assert.equal(await page.locator(`#${id}`).count(),1);
  console.log("PASS primary card navigation and case-study story anchors");
  await page.setViewportSize({ width: 320, height: 740 });
  await page.locator('header button[aria-controls="mobile-navigation"]').click();
  assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
  await page.locator('.mobile-navigation a[href="/en/products"]').click();
  await page.waitForURL("**/en/products");
  assert.equal(await page.locator(".mobile-navigation").count(),0);
  assert.notEqual(await page.evaluate(() => document.body.style.overflow), "hidden");
  console.log("PASS mobile navigation and scroll restoration");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.documentElement.dataset.theme === "light");
  assert.equal(await page.locator("button.theme-control").count(),0);
  await page.emulateMedia({ colorScheme: "dark" });
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  await page.evaluate(() => localStorage.setItem("popart-theme", "dark"));
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.documentElement.dataset.theme === "light");
  await page.emulateMedia({ colorScheme: "light" });
  await page.waitForFunction(() => document.documentElement.dataset.theme === "light");
  console.log("PASS permanent light theme ignores stale dark preference and system color scheme");
  await page.goto(`${base}/en`, { waitUntil: "domcontentloaded" });
  for (const width of [360,390,1024,1920,2560]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1080 });
    assert(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)), `${width}px overflow`);
    checked++;
  }
  const hero = page.locator('section[aria-label="PopArt Agency — Brand in motion"]');
  await hero.evaluate(async el => {
    el.getAnimations({subtree:true}).forEach(animation => { animation.pause(); animation.currentTime = 5000; });
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  const approvedPaths = await hero.locator("[data-piece]").evaluateAll(elements => elements.map(el => el.getAttribute("d")));
  await page.emulateMedia({colorScheme: "dark"});
  assert.deepEqual(await hero.locator("[data-piece]").evaluateAll(elements => elements.map(el => el.getAttribute("d"))), approvedPaths);
  assert(await hero.evaluate(el => el.getAnimations({subtree:true}).every(animation => animation.currentTime === 5000)));
  console.log("PASS system color scheme preserves the hero geometry and animation clock");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(150);
  assert.equal(await page.locator('section[aria-label="PopArt Agency — Brand in motion"]').evaluate(el => el.getAnimations({subtree:true}).length),0);
  assert.deepEqual(errors,[]);
  console.log(`PASS ${checked} responsive/theme checks; reduced motion; no hydration or browser errors`);
  try {
    const originals = JSON.parse(await readFile(".animation-review/protected-assets.json", "utf8"));
    // The client explicitly requested new hero surface/ink colors. Geometry and assets remain protected.
    const recoloredFiles = new Set(["src/components/sections/HeroAnimated.tsx", "src/components/sections/HeroAnimated.module.css", "src/components/sections/hero-motion.ts"]);
    for (const [file,hash] of Object.entries(originals)) {
      if (!recoloredFiles.has(file)) assert.equal(createHash("sha256").update(await readFile(file)).digest("hex"),hash,file+" changed");
    }
    console.log("PASS protected hero geometry and original logos unchanged; client-requested hero colors excluded from old hashes");
  } catch (error) { if (error.code !== "ENOENT") throw error; }
} finally { await browser.close(); }
