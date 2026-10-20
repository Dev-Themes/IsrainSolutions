import { chromium } from "playwright";
import http from "node:http";
import { spawn } from "node:child_process";

const TEST_PORT = process.env.PORT || 3001;
const BASE_URL = process.env.TEST_URL || `http://localhost:${TEST_PORT}`;

const BREAKPOINTS = [
  { name: "320px (Small Mobile)", width: 320, height: 640 },
  { name: "375px (Mobile)", width: 375, height: 667 },
  { name: "390px (iPhone 14)", width: 390, height: 844 },
  { name: "480px (Small Tablet)", width: 480, height: 800 },
  { name: "768px (Tablet)", width: 768, height: 1024 },
  { name: "1024px (Laptop)", width: 1024, height: 768 },
  { name: "1440px (Desktop)", width: 1440, height: 900 },
  { name: "1920px (Full HD)", width: 1920, height: 1080 },
  { name: "2560px (Ultrawide)", width: 2560, height: 1440 },
];

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        resolve({ statusCode: res.statusCode, headers: res.headers });
      })
      .on("error", reject);
  });
}

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const res = await checkUrl(`${url}/robots.txt`);
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve(true);
        }
      } catch (e) {
        if (Date.now() - start > timeoutMs) {
          clearInterval(interval);
          reject(new Error(`Timeout waiting for server at ${url}`));
        }
      }
    }, 400);
  });
}

async function runTests() {
  console.log(`\n======================================================`);
  console.log(` FORME STUDIO CRÉATIF — AUTOMATED VERIFICATION SUITE `);
  console.log(` Testing Base URL: ${BASE_URL}`);
  console.log(`======================================================\n`);

  let serverProcess = null;

  // If testing on default internal port 3001, spawn isolated production server
  if (BASE_URL.includes("3001")) {
    console.log(`[INFO] Spawning isolated production server on port ${TEST_PORT}...`);
    serverProcess = spawn("npx.cmd", ["next", "start", "-p", String(TEST_PORT)], {
      stdio: "pipe",
      shell: true,
    });
    try {
      await waitForServer(BASE_URL);
      console.log(`[INFO] Server ready on port ${TEST_PORT}\n`);
    } catch (e) {
      console.error(`[ERROR] Server failed to start:`, e.message);
      if (serverProcess) serverProcess.kill();
      process.exit(1);
    }
  }

  let passedTests = 0;
  let failedTests = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(` [PASS] ${message}`);
      passedTests++;
    } else {
      console.error(` [FAIL] ${message}`);
      failedTests++;
    }
  }

  // 1. Verify Static SEO Endpoints
  console.log(`\n--- 1. Testing SEO Endpoints ---`);
  try {
    const sitemapRes = await checkUrl(`${BASE_URL}/sitemap.xml`);
    assert(sitemapRes.statusCode === 200, `/sitemap.xml returned 200 OK`);

    const robotsRes = await checkUrl(`${BASE_URL}/robots.txt`);
    assert(robotsRes.statusCode === 200, `/robots.txt returned 200 OK`);

    const ogRes = await checkUrl(`${BASE_URL}/opengraph-image`);
    assert(ogRes.statusCode === 200, `/opengraph-image returned 200 OK`);
  } catch (err) {
    console.error(` [FAIL] SEO endpoints failed:`, err.message);
    failedTests++;
  }

  // 2. Playwright Headless Browser Testing
  console.log(`\n--- 2. Launching Headless Chromium ---`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Test Root Redirect & Homepage
    console.log(`\n--- 3. Testing Root Redirect & Homepage ---`);
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    const currentUrl = page.url();
    assert(currentUrl.includes("/fr"), `Visiting / redirects to /fr (actual: ${currentUrl})`);

    // Verify WORK geometric heading
    const workHeading = page.locator("h1").first();
    const headingText = await workHeading.textContent();
    assert(headingText.includes("WORK"), `WORK heading rendered: "${headingText?.trim()}"`);

    // Verify 16 portfolio projects
    const cards = page.locator("article");
    const cardCount = await cards.count();
    assert(cardCount >= 16, `All 16 fictional projects rendered (found: ${cardCount})`);

    // 3. Test Fullscreen Lightbox Interaction & Brief Caption
    console.log(`\n--- 4. Testing Work Lightbox Modal & Caption ---`);
    const firstCardButton = cards.first().locator("button").first();
    await firstCardButton.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 120));
    await page.waitForTimeout(300);
    await firstCardButton.click({ force: true });
    await page.waitForTimeout(600);

    const dialog = page.locator('div[role="dialog"]');
    const isDialogVisible = await dialog.isVisible();
    assert(isDialogVisible, `Work Lightbox opened with role="dialog"`);

    const dialogTitle = await dialog.locator("h2").first().textContent();
    assert(dialogTitle && dialogTitle.length > 0, `Lightbox displays project title: "${dialogTitle}"`);

    const dialogCaption = await dialog.locator("p").first().textContent();
    assert(dialogCaption && dialogCaption.length > 10, `Lightbox displays brief image caption: "${dialogCaption}"`);

    const topCloseBtn = dialog.locator('button[aria-label*="Fermer"], button[aria-label*="Close"]').first();
    const hasTopClose = await topCloseBtn.isVisible();
    assert(hasTopClose, `Lightbox has prominent top close button visible on screen`);

    await topCloseBtn.click();
    await page.waitForTimeout(400);
    const isDialogClosedByClick = !(await dialog.isVisible());
    assert(isDialogClosedByClick, `Clicking top close button smoothly closes Lightbox`);

    // 4. Test Footer Eye-to-Wordmark Interactive Animation
    console.log(`\n--- 5. Testing Footer Eye-to-Wordmark Animation ---`);
    const eyeButton = page.locator('footer button[type="button"]');
    const hasEyeButton = await eyeButton.isVisible();
    assert(hasEyeButton, `Footer eye interactive button is rendered`);

    const initialPressed = await eyeButton.getAttribute("aria-pressed");
    assert(initialPressed === "false", `Initial eye state is aria-pressed="false"`);

    await eyeButton.hover();
    await page.waitForTimeout(600);
    const hoveredPressed = await eyeButton.getAttribute("aria-pressed");
    assert(hoveredPressed === "true", `Hovering triggers transition to FORME wordmark (aria-pressed="true")`);

    await page.mouse.move(0, 0);
    await page.waitForTimeout(600);
    const unhoveredPressed = await eyeButton.getAttribute("aria-pressed");
    assert(unhoveredPressed === "false", `Hover-out smoothly reverses back to Eye (aria-pressed="false")`);

    // 5. Test Header Products Navigation Link
    console.log(`\n--- 6. Testing Products Header Link ---`);
    const productsNav = page.locator('header nav a[href*="/products"]').first();
    assert(await productsNav.isVisible(), `Products navigation link visible in header`);
    await productsNav.click();
    await page.waitForTimeout(800);
    assert(page.url().includes("/fr/products"), `Navigated to /fr/products via header link`);

    // 6. Test Products Landing Page
    console.log(`\n--- 7. Testing Products Landing Page (/fr/products) ---`);
    const productsHeading = page.locator("h1");
    const productsHeadingText = await productsHeading.textContent();
    assert(productsHeadingText.includes("PRODUCTS"), `PRODUCTS SVG display heading rendered`);

    const productCards = page.locator("article");
    const productCardCount = await productCards.count();
    assert(productCardCount >= 12, `All 12 product campaigns rendered (found: ${productCardCount})`);

    // 7. Test Product Lightbox Image Click
    console.log(`\n--- 8. Testing Product Lightbox Modal ---`);
    const firstProductImgBtn = productCards.first().locator('button[aria-haspopup="dialog"]');
    await firstProductImgBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await firstProductImgBtn.click({ force: true });
    await page.waitForTimeout(600);

    const productDialog = page.locator('div[role="dialog"]');
    assert(await productDialog.isVisible(), `Product Lightbox modal opened upon image click`);

    const productDialogClose = productDialog.locator('button[aria-label*="Fermer"], button[aria-label*="Close"]').first();
    assert(await productDialogClose.isVisible(), `Product Lightbox close button is visible`);
    await productDialogClose.click();
    await page.waitForTimeout(400);
    assert(!(await productDialog.isVisible()), `Product Lightbox modal closed successfully`);

    // 8. Test Product Case Study Link ("VOIR LE PROJET ↗")
    console.log(`\n--- 9. Testing Product Case Study Navigation ---`);
    const viewProjectLink = productCards.first().locator('a[href*="/products/"]');
    const caseStudyHref = await viewProjectLink.getAttribute("href");
    assert(caseStudyHref && caseStudyHref.includes("/products/"), `Found case study link: ${caseStudyHref}`);

    await viewProjectLink.click();
    await page.waitForTimeout(800);
    assert(page.url().includes("/products/"), `Successfully navigated to case study page (${page.url()})`);

    // Verify Case Study Details
    const csTitle = await page.locator("h1").textContent();
    assert(csTitle && csTitle.length > 0, `Case study header rendered: "${csTitle}"`);

    const hasBadge = await page.getByText("Concept de Design Spéculatif").or(page.getByText("Speculative Design Concept")).first().isVisible();
    assert(hasBadge, `Speculative concept badge is visible`);

    const hasDirection = await page.getByText("Direction Artistique").or(page.getByText("Creative Direction")).first().isVisible();
    assert(hasDirection, `Creative Direction section is visible with narrative and palette`);

    const hasSpecs = await page.getByText("Spécifications").or(page.getByText("Specifications")).first().isVisible();
    assert(hasSpecs, `Technical Specifications section is visible`);

    // 9. Test English Products Page & Tactile Simplicity Image
    console.log(`\n--- 10. Testing English Products Page & Tactile Simplicity ---`);
    await page.goto(`${BASE_URL}/en/products`, { waitUntil: "networkidle" });
    const enHtmlLang = await page.getAttribute("html", "lang");
    assert(enHtmlLang === "en", `English locale HTML lang attribute is "en"`);
    const enEyebrow = page.getByText("SELECTED PRODUCT CONCEPTS").first();
    assert(await enEyebrow.isVisible(), `English eyebrow text rendered correctly`);

    // Verify Tactile Simplicity (AURA SKIN) image renders successfully
    const tactileCard = page.locator('article:has-text("Tactile Simplicity")');
    assert(await tactileCard.isVisible(), `Tactile Simplicity card is visible`);
    const tactileImg = tactileCard.locator("img").first();
    const isTactileImgLoaded = await tactileImg.evaluate((img) => img.complete && img.naturalWidth > 0);
    assert(isTactileImgLoaded, `Tactile Simplicity (AURA SKIN) image loaded fast with naturalWidth > 0`);

    // Visit AURA SKIN case study directly
    await page.goto(`${BASE_URL}/fr/products/aura-skin`, { waitUntil: "networkidle" });
    const auraTitle = await page.locator("h1").textContent();
    assert(auraTitle.includes("Tactile Simplicity"), `AURA SKIN case study loaded: "${auraTitle}"`);
    const auraHeroImg = page.locator("article img").first();
    const isAuraHeroLoaded = await auraHeroImg.evaluate((img) => img.complete && img.naturalWidth > 0);
    assert(isAuraHeroLoaded, `AURA SKIN case study hero image loaded successfully with naturalWidth > 0`);

    // 10. Strict Responsive & No-Overflow Verification
    console.log(`\n--- 11. Strict Responsive & No Horizontal Overflow Testing ---`);
    for (const bp of BREAKPOINTS) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}/fr/products`, { waitUntil: "networkidle" });

      const hasHorizontalScrollbar = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      assert(!hasHorizontalScrollbar, `Viewport ${bp.name} has ZERO horizontal overflow on /fr/products`);
    }

  } catch (err) {
    console.error(`Error during browser test execution:`, err);
    failedTests++;
  } finally {
    await browser.close();
    if (serverProcess) {
      serverProcess.kill();
      try {
        spawn("taskkill", ["/pid", serverProcess.pid.toString(), "/f", "/t"]);
      } catch (e) {}
    }
  }

  console.log(`\n======================================================`);
  console.log(` RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log(`======================================================\n`);

  process.exit(failedTests > 0 ? 1 : 0);
}

runTests();
