const { chromium } = require("playwright");

const WIDTHS = [320, 360, 375, 390, 430, 500, 640, 768, 1024, 1280, 1440, 1600, 1920, 2560];

async function testHeader() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/age-verification");
  await page.click("button:has-text('I am 18 or Older')");
  await page.waitForURL("http://localhost:3000/");

  console.log("=== COMPREHENSIVE HEADER RESPONSIVENESS AUDIT ===");

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 800 });
    await page.waitForTimeout(100);

    const headerData = await page.evaluate(() => {
      const header = document.querySelector("header");
      const nav = header.querySelector("nav");
      const mobileBtn = header.querySelector("button[aria-label*='mobile navigation' i], button[aria-label*='menu' i]");
      const logo = header.querySelector("a[href='/']");
      const dossierBtn = header.querySelector("button[aria-label*='dossier' i]");
      const telegramBtn = header.querySelector("a[aria-label*='Telegram' i]");

      const headerRect = header.getBoundingClientRect();
      const logoRect = logo ? logo.getBoundingClientRect() : null;
      const docScrollWidth = document.documentElement.scrollWidth;

      return {
        headerHeight: headerRect.height,
        headerWidth: headerRect.width,
        docScrollWidth,
        overflow: docScrollWidth > window.innerWidth,
        desktopNavVisible: nav ? window.getComputedStyle(nav).display !== "none" : false,
        mobileBtnVisible: mobileBtn ? window.getComputedStyle(mobileBtn).display !== "none" : false,
        dossierVisible: dossierBtn ? window.getComputedStyle(dossierBtn).display !== "none" : false,
        telegramVisible: telegramBtn ? window.getComputedStyle(telegramBtn).display !== "none" : false,
        logoWidth: logoRect ? logoRect.width : 0,
      };
    });

    console.log(`\nWidth: ${width}px`);
    console.log(`  - Header dimensions: ${Math.round(headerData.headerWidth)}px × ${Math.round(headerData.headerHeight)}px`);
    console.log(`  - Logo width: ${Math.round(headerData.logoWidth)}px`);
    console.log(`  - Desktop nav visible: ${headerData.desktopNavVisible}`);
    console.log(`  - Mobile menu button visible: ${headerData.mobileBtnVisible}`);
    console.log(`  - Dossier button visible: ${headerData.dossierVisible}`);
    console.log(`  - Telegram button visible: ${headerData.telegramVisible}`);
    console.log(`  - Zero horizontal overflow: ${!headerData.overflow}`);

    if (headerData.overflow) {
      throw new Error(`Horizontal overflow at ${width}px (scrollWidth: ${headerData.docScrollWidth}px > window: ${width}px)`);
    }

    // Test opening and closing mobile menu on < 1024px screens
    if (width < 1024) {
      const openBtn = page.locator("button[aria-label*='Open mobile navigation' i]");
      await openBtn.click();
      await page.waitForTimeout(200);

      const menuVisible = await page.locator("#mobile-navigation-dialog").isVisible();
      if (!menuVisible) throw new Error(`Mobile menu failed to open at ${width}px`);

      // Test close button
      const closeBtn = page.locator("button[aria-label*='Close mobile navigation' i]");
      await closeBtn.click();
      await page.waitForTimeout(200);

      const menuClosed = !(await page.locator("#mobile-navigation-dialog").isVisible());
      if (!menuClosed) throw new Error(`Mobile menu failed to close at ${width}px`);

      console.log(`  - Mobile menu open/close interaction: PASS`);
    }
  }

  await browser.close();
  console.log("\n==============================================");
  console.log("ALL HEADER RESPONSIVENESS CHECKS PASSED!");
  console.log("==============================================");
}

testHeader().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
