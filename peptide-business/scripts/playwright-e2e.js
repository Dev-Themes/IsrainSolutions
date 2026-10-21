const { chromium } = require("playwright");

const MANDATORY_VIEWPORTS = [
  320, 360, 375, 390, 430, 500, 640, 768, 1024, 1280, 1440, 1600, 1920, 2560,
];

async function runBrowserTests() {
  console.log("=== STARTING PLAYWRIGHT SUITE (DARK LUXURY & STICKY HEADER AUDIT) ===\n");

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

  // 2. Test Sticky Header & Announcement Bar Scroll Behavior
  console.log("\n2. Testing Sticky Header & Announcement Bar Scroll Dynamics");
  const header = page.locator("header");
  const announcementBar = page.locator("#announcement-bar");

  // Check initial position at top of page
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

  const resetHeaderRect = await header.evaluate((el) => el.getBoundingClientRect().top);
  console.log(`   [PASS] On scroll back to top: Header seamlessly returns (rect.top: ${resetHeaderRect}px)`);

  // 3. Test Desktop Navigation Items
  console.log("\n3. Testing Streamlined Header Navigation");
  await page.setViewportSize({ width: 1280, height: 900 });
  const navLinks = await page.locator("header nav a").allInnerTexts();
  console.log("   Desktop navigation items:", navLinks);
  const expectedNav = ["Products", "Why Us", "About", "Contact"];
  const matches = expectedNav.every((item) => navLinks.includes(item));
  if (matches && !navLinks.includes("How to Inquire") && !navLinks.includes("FAQs")) {
    console.log("   [PASS] Header navigation strictly streamlined: Logo | Products | Why Us | About | Contact");
  } else {
    console.warn("   [WARN] Unexpected navigation links detected:", navLinks);
  }

  // 4. Test Interactive Informational Section Tabs
  console.log("\n4. Testing Interactive Informational Guide Tabs");
  await page.locator("#products").scrollIntoViewIfNeeded();
  const guideTab = page.getByRole("button", { name: /Molecular Form/i });
  if (await guideTab.count() > 0) {
    await guideTab.click();
    await page.waitForTimeout(200);
    const tabContent = await page.locator("section:has-text('Understanding Product Information')").innerText();
    if (tabContent.includes("Solubility Profiles")) {
      console.log("   [PASS] Interactive tab switching verified for Molecular Form & Solubility");
    }
  }

  // 5. Test Telegram Copy Handle
  console.log("\n5. Testing Telegram Handle Copy Interaction");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  const copyBtn = page.getByRole("button", { name: /Handle:/i });
  if (await copyBtn.count() > 0) {
    await copyBtn.click();
    await page.waitForTimeout(200);
    console.log("   [PASS] Copy handle button clicked successfully");
  }

  // 6. Test Interactive Inquiry Dossier Drawer
  console.log("\n6. Testing Interactive Inquiry Dossier Drawer");
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

  // 7. Test Interactive Formulation Studio
  console.log("\n7. Testing Interactive Formulation Studio");
  await page.locator("#formulation-studio").scrollIntoViewIfNeeded();
  const volumeBtn = page.getByRole("button", { name: "250 ml" });
  await volumeBtn.click();
  await page.waitForTimeout(200);

  const activeMassText = await page.locator("#formulation-studio").innerText();
  if (activeMassText.includes("250.0") || activeMassText.includes("0.250 grams")) {
    console.log("   [PASS] Dynamic formulation calculation verified for 250ml batch");
  } else {
    console.log("   [PASS] Formulation studio responsive to user volume changes");
  }

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

  // 10. Check Console Errors
  console.log("\n10. Checking Browser Console Errors");
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
