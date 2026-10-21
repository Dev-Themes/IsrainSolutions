const { chromium } = require("playwright");
const fs = require("fs");

const VIEWPORTS = [320, 390, 768, 1440, 1920];

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Age verification
  await page.goto("http://localhost:3000/age-verification");
  await page.click("button:has-text('I am 18 or Older')");
  await page.waitForURL("http://localhost:3000/");
  await page.waitForTimeout(1000);

  if (!fs.existsSync("public/screenshots/responsive")) {
    fs.mkdirSync("public/screenshots/responsive", { recursive: true });
  }

  for (const width of VIEWPORTS) {
    await page.setViewportSize({ width, height: 1000 });
    await page.waitForTimeout(500);

    // Screenshot top hero + catalog
    await page.screenshot({
      path: `public/screenshots/responsive/home-${width}px.png`,
      fullPage: false,
    });
    console.log(`[SCREENSHOT] Captured at ${width}px: public/screenshots/responsive/home-${width}px.png`);
  }

  await browser.close();
}

capture().catch(console.error);
