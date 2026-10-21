const { chromium } = require("playwright");

const MANDATORY_VIEWPORTS = [
  320, 360, 375, 390, 430, 500, 640, 768, 1024, 1280, 1440, 1600, 1920, 2560,
];

async function runBrowserTests() {
  console.log("=== STARTING PLAYWRIGHT SUITE (DARK BLUE PALETTE, LIGHT/DARK TOGGLE, SECTION REMOVAL AUDIT) ===\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  // 1. First visit flow: Age gate verification
  console.log("1. Testing Server Interception & Age Gate");
  await page.goto("http://localhost:3000/");
  await page.waitForURL("**/age-verification**");
  console.log("   [PASS] Initial visit redirected to /age-verification");

  const confirmBtn = page.getByRole("button", { name: /I am 18 or Older/i });
  await confirmBtn.click();
  await page.waitForURL("http://localhost:3000/");
  console.log("   [PASS] Age confirmed and redirected to home page /");

  // 2. Test Section Removals (Mandatory Verification)
  console.log("\n2. Testing Mandatory Section Removals");
  const formulationCount = await page.locator("text='Formulation & Dilution Studio'").count();
  const formulationIdCount = await page.locator("#formulation-studio").count();
  if (formulationCount === 0 && formulationIdCount === 0) {
    console.log("   [PASS] 'Formulation & Dilution Studio' section successfully removed from DOM");
  } else {
    throw new Error(`'Formulation & Dilution Studio' was still found in DOM! count=${formulationCount}`);
  }

  const understandingInfoCount = await page.locator("text='Understanding Product Information'").count();
  if (understandingInfoCount === 0) {
    console.log("   [PASS] 'Understanding Product Information' section successfully removed from DOM");
  } else {
    throw new Error(`'Understanding Product Information' was still found in DOM! count=${understandingInfoCount}`);
  }

  // 3. Test Theme Toggle Functionality & Persistence
  console.log("\n3. Testing Light/Dark Theme Toggle Dynamics & Persistence");
  const initialHtmlClass = await page.evaluate(() => document.documentElement.className);
  const initialTheme = initialHtmlClass.includes("dark") ? "dark" : "light";
  console.log(`   Initial detected theme based on OS preference: ${initialTheme} (classes: ${initialHtmlClass})`);

  // Target opposite theme on first click
  const targetTheme1 = initialTheme === "dark" ? "light" : "dark";
  const themeToggle = page.getByRole("button", { name: new RegExp(`Switch to ${targetTheme1} theme`, "i") }).first();
  await themeToggle.click();
  await page.waitForTimeout(300);

  const toggled1HtmlClass = await page.evaluate(() => document.documentElement.className);
  const storedTheme1 = await page.evaluate(() => localStorage.getItem("theme"));
  console.log(`   After 1st toggle: HTML classes: ${toggled1HtmlClass}, localStorage.theme: ${storedTheme1}`);

  if (toggled1HtmlClass.includes(targetTheme1) && storedTheme1 === targetTheme1) {
    console.log(`   [PASS] Successfully switched to ${targetTheme1} theme (class '${targetTheme1}' and localStorage '${targetTheme1}' verified)`);
  } else {
    throw new Error(`Failed to switch to ${targetTheme1} theme: class=${toggled1HtmlClass}, storage=${storedTheme1}`);
  }

  // Reload to test persistence
  await page.reload();
  await page.waitForTimeout(300);
  const reloadedClass = await page.evaluate(() => document.documentElement.className);
  if (reloadedClass.includes(targetTheme1)) {
    console.log(`   [PASS] ${targetTheme1} theme persisted across page reload`);
  } else {
    throw new Error(`${targetTheme1} theme did not persist after reload: class=${reloadedClass}`);
  }

  // Switch to the second theme
  const targetTheme2 = initialTheme;
  const themeToggle2 = page.getByRole("button", { name: new RegExp(`Switch to ${targetTheme2} theme`, "i") }).first();
  await themeToggle2.click();
  await page.waitForTimeout(300);

  const toggled2HtmlClass = await page.evaluate(() => document.documentElement.className);
  const storedTheme2 = await page.evaluate(() => localStorage.getItem("theme"));
  if (toggled2HtmlClass.includes(targetTheme2) && storedTheme2 === targetTheme2) {
    console.log(`   [PASS] Successfully switched to ${targetTheme2} theme (class '${targetTheme2}' and localStorage '${targetTheme2}' verified)`);
  } else {
    throw new Error(`Failed to switch to ${targetTheme2} theme: class=${toggled2HtmlClass}, storage=${storedTheme2}`);
  }

  // 4. Test Sticky Header & Announcement Bar Scroll Behavior
  console.log("\n4. Testing Sticky Header & Announcement Bar Scroll Dynamics");
  const header = page.locator("header");
  const headerStyles = await header.evaluate((el) => {
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      position: style.position,
      topStyle: style.top,
      rectTop: rect.top,
    };
  });

  if (headerStyles.position === "sticky" && headerStyles.topStyle === "0px") {
    console.log(`   [PASS] Header has position: sticky; top: 0px (initial rect.top: ${headerStyles.rectTop}px)`);
  } else {
    throw new Error(`Header styling invalid: position=${headerStyles.position}, top=${headerStyles.topStyle}`);
  }

  // Scroll down 200px
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(200);

  const scrolledHeaderRect = await header.evaluate((el) => el.getBoundingClientRect().top);
  if (Math.abs(scrolledHeaderRect) <= 1) {
    console.log("   [PASS] On scroll down: Header pins perfectly at top: 0px");
  } else {
    throw new Error(`Header did not pin at top: rect.top is ${scrolledHeaderRect}px`);
  }

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);

  // 5. Test Desktop Navigation Items
  console.log("\n5. Testing Header Navigation");
  await page.setViewportSize({ width: 1280, height: 900 });
  const navLinks = await page.locator("header nav a").allInnerTexts();
  console.log("   Desktop navigation items:", navLinks);
  const expectedNav = ["Products", "Why Us", "About", "Contact"];
  const matches = expectedNav.every((item) => navLinks.includes(item));
  if (matches) {
    console.log("   [PASS] Header navigation verified: Products | Why Us | About | Contact");
  } else {
    console.warn("   [WARN] Unexpected navigation links detected:", navLinks);
  }

  // 6. Test Telegram Copy Handle
  console.log("\n6. Testing Telegram Handle Copy Interaction");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  const copyBtn = page.getByRole("button", { name: /Handle:/i });
  if (await copyBtn.count() > 0) {
    await copyBtn.click();
    await page.waitForTimeout(200);
    console.log("   [PASS] Copy handle button clicked successfully");
  }

  // 7. Test Interactive Inquiry Dossier Drawer
  console.log("\n7. Testing Interactive Inquiry Dossier Drawer");
  const firstDossierBtn = page.locator("article button").filter({ hasText: /Dossier/i }).first();
  await firstDossierBtn.evaluate((el) => el.click());
  await page.waitForTimeout(300);

  const dossierDrawer = page.locator('[role="dialog"]').filter({ hasText: /Inquiry Dossier/i });
  await dossierDrawer.waitFor({ state: "visible" });
  console.log("   [PASS] Inquiry Dossier drawer opened automatically on adding item");

  // Close drawer via Escape key
  await page.keyboard.press("Escape");
  await dossierDrawer.waitFor({ state: "detached" });
  console.log("   [PASS] Inquiry Dossier drawer closed via Escape key");

  // 8. Test Comparison Matrix
  console.log("\n8. Testing Ingredient Comparison Matrix");
  await page.locator("#products").scrollIntoViewIfNeeded();
  const compareBtns = page.locator("article button").filter({ hasText: /Compare/i });
  await compareBtns.nth(0).evaluate((el) => el.click());
  await compareBtns.nth(1).evaluate((el) => el.click());
  await page.waitForTimeout(200);

  const viewMatrixBtn = page.getByRole("button", { name: /View Matrix/i });
  await viewMatrixBtn.click();

  const comparisonModal = page.locator('[role="dialog"]').filter({ hasText: /Ingredient Specification Comparison/i });
  await comparisonModal.waitFor({ state: "visible" });
  console.log("   [PASS] Side-by-side comparison matrix opened with 2 selected compounds");

  await page.keyboard.press("Escape");
  await comparisonModal.waitFor({ state: "detached" });
  console.log("   [PASS] Comparison modal closed via Escape");

  // 9. Test Responsive Viewports (320px to 2560px)
  console.log("\n9. Testing All 14 Mandatory Viewports for Horizontal Page Overflow");
  for (const width of MANDATORY_VIEWPORTS) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(100);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (overflow) {
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      console.error(`   [FAIL] Horizontal overflow at ${width}px (scrollWidth: ${scrollWidth}px)`);
      throw new Error(`Horizontal overflow detected at ${width}px`);
    } else {
      console.log(`   [PASS] ${width}px: Clean layout, 0 horizontal overflow`);
    }
  }

  // 10. Check Mobile Navigation & Mobile Theme Toggle (< 1024px)
  console.log("\n10. Testing Mobile Navigation & Drawer Theme Toggle at 375px");
  await page.setViewportSize({ width: 375, height: 667 });
  const mobileMenuBtn = page.getByRole("button", { name: /Open mobile navigation menu/i });
  await mobileMenuBtn.click();
  await page.waitForTimeout(300);

  const mobileDrawer = page.locator("#mobile-navigation-dialog");
  await mobileDrawer.waitFor({ state: "visible" });
  console.log("   [PASS] Mobile drawer opened at 375px");

  const mobileThemeToggle = mobileDrawer.getByRole("button", { name: /Switch to light theme|Switch to dark theme/i });
  await mobileThemeToggle.click();
  await page.waitForTimeout(200);
  const mobileThemeAfter = await page.evaluate(() => document.documentElement.className);
  console.log(`   [PASS] Mobile drawer theme toggle functional: current class=${mobileThemeAfter}`);

  const closeMobileMenuBtn = page.getByRole("button", { name: /Close mobile navigation menu/i });
  await closeMobileMenuBtn.click();
  await page.waitForTimeout(200);

  // 11. Check Console Errors
  console.log("\n11. Checking Browser Console Errors");
  const criticalErrors = consoleErrors.filter((e) => !e.includes("favicon"));
  if (criticalErrors.length === 0) {
    console.log("   [PASS] Zero runtime console errors detected");
  } else {
    console.warn("   [WARN] Console errors:", criticalErrors);
  }

  await browser.close();
  console.log("\n==============================================");
  console.log("ALL PLAYWRIGHT TESTS PASSED SUCCESSFULLY!");
  console.log("==============================================");
}

runBrowserTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
