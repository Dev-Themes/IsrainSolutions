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

function waitForServer(url, timeoutMs = 15000) {
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
    console.log(`\n--- 4. Testing Interactive Lightbox Modal & Caption ---`);
    const firstCardButton = cards.first().locator("button").first();
    await firstCardButton.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 120));
    await page.waitForTimeout(300);
    await firstCardButton.click({ force: true });
    await page.waitForTimeout(600);

    const dialog = page.locator('div[role="dialog"]');
    const isDialogVisible = await dialog.isVisible();
    assert(isDialogVisible, `Lightbox opened with role="dialog"`);

    const dialogTitle = await dialog.locator("h2").first().textContent();
    assert(dialogTitle && dialogTitle.length > 0, `Lightbox displays project title: "${dialogTitle}"`);

    // Verify brief description / caption is visible inside lightbox
    const dialogCaption = await dialog.locator("p").first().textContent();
    assert(dialogCaption && dialogCaption.length > 10, `Lightbox displays brief image caption: "${dialogCaption}"`);

    // Verify close buttons on lightbox
    const topCloseBtn = dialog.locator('button[aria-label*="Fermer"], button[aria-label*="Close"]').first();
    const hasTopClose = await topCloseBtn.isVisible();
    assert(hasTopClose, `Lightbox has prominent top close button visible on screen`);

    const bottomCloseBtn = dialog.locator('button').filter({ hasText: /Fermer|Close/ }).last();
    const hasBottomClose = await bottomCloseBtn.isVisible();
    assert(hasBottomClose, `Lightbox has secondary bottom close button visible on screen`);

    // Test clicking top close button
    await topCloseBtn.click();
    await page.waitForTimeout(400);
    const isDialogClosedByClick = !(await dialog.isVisible());
    assert(isDialogClosedByClick, `Clicking top close button smoothly closes Lightbox`);

    // Reopen and test bottom close button
    await firstCardButton.click({ force: true });
    await page.waitForTimeout(500);
    const reopenedDialog = page.locator('div[role="dialog"]');
    const reopenedBottomClose = reopenedDialog.locator('button').filter({ hasText: /Fermer|Close/ }).last();
    await reopenedBottomClose.click();
    await page.waitForTimeout(400);
    const isDialogClosedByBottomClick = !(await reopenedDialog.isVisible());
    assert(isDialogClosedByBottomClick, `Clicking bottom close button smoothly closes Lightbox`);

    // 4. Test Footer Eye-to-Wordmark Interactive Animation
    console.log(`\n--- 5. Testing Footer Eye-to-Wordmark Animation ---`);
    const eyeButton = page.locator('footer button[type="button"]');
    const hasEyeButton = await eyeButton.isVisible();
    assert(hasEyeButton, `Footer eye interactive button is rendered`);

    const initialPressed = await eyeButton.getAttribute("aria-pressed");
    assert(initialPressed === "false", `Initial eye state is aria-pressed="false"`);

    // Desktop Hover
    await eyeButton.hover();
    await page.waitForTimeout(600);
    const hoveredPressed = await eyeButton.getAttribute("aria-pressed");
    assert(hoveredPressed === "true", `Hovering triggers transition to FORME wordmark (aria-pressed="true")`);

    // Desktop Hover-Out
    await page.mouse.move(0, 0);
    await page.waitForTimeout(600);
    const unhoveredPressed = await eyeButton.getAttribute("aria-pressed");
    assert(unhoveredPressed === "false", `Hover-out smoothly reverses back to Eye (aria-pressed="false")`);

    // Click / Tap Toggle
    await eyeButton.click({ force: true });
    await page.waitForTimeout(600);
    const tappedPressed = await eyeButton.getAttribute("aria-pressed");
    assert(tappedPressed === "true", `Tapping triggers transition to FORME wordmark (aria-pressed="true")`);

    // 5. Test Language Switcher (FR -> EN)
    console.log(`\n--- 6. Testing Bilingual Switcher ---`);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const langSwitch = page.locator('header nav a:has-text("EN")').first();
    if (await langSwitch.isVisible()) {
      await langSwitch.click({ force: true });
      await page.waitForTimeout(800);
      const enUrl = page.url();
      assert(enUrl.includes("/en"), `Switching language navigates to /en (actual: ${enUrl})`);

      const htmlLang = await page.getAttribute("html", "lang");
      assert(htmlLang === "en", `HTML tag lang attribute is "en"`);
    }

    // 6. Test Individual Case Study Route (/fr/work/color-studies)
    console.log(`\n--- 7. Testing Individual Project Page ---`);
    await page.goto(`${BASE_URL}/fr/work/color-studies`, { waitUntil: "networkidle" });
    const projectTitle = await page.locator("h1").textContent();
    assert(projectTitle.includes("Color Studies"), `Project page loaded for "Color Studies"`);

    // Verify storytelling sections
    const conceptSection = page.locator('text="01. Concept & Intention"');
    const isConceptVisible = await conceptSection.isVisible();
    assert(isConceptVisible, `Creative storytelling section (Concept & Intention) is visible`);

    // 7. Test About Page
    console.log(`\n--- 8. Testing About Page ---`);
    await page.goto(`${BASE_URL}/fr/about`, { waitUntil: "networkidle" });
    const aboutHeading = await page.locator("h1").textContent();
    assert(aboutHeading.includes("STUDIO."), `About page loaded with STUDIO. heading`);

    // 8. Test Contact Page
    console.log(`\n--- 9. Testing Contact Page ---`);
    await page.goto(`${BASE_URL}/fr/contact`, { waitUntil: "networkidle" });
    const contactHeading = await page.locator("h1").textContent();
    assert(contactHeading.includes("CONTACT"), `Contact page loaded with CONTACT heading`);

    const mailtoLink = page.locator('a[href="mailto:hello@forme.example"]');
    assert(await mailtoLink.isVisible(), `Working mailto:hello@forme.example link verified`);

    // 9. Test /work Page & Embedded Contact Section
    console.log(`\n--- 10. Testing /work Page & Embedded Contact Section ---`);
    await page.goto(`${BASE_URL}/fr/work`, { waitUntil: "networkidle" });
    const workPageCards = await page.locator("article").count();
    assert(workPageCards >= 16, `/fr/work renders all 16 portfolio cards`);
    const workContactSection = page.locator('section:has-text("CONTACT")');
    assert(await workContactSection.isVisible(), `Contact section is embedded and visible on /work page`);

    // 10. Strict Responsive & No-Overflow Verification
    console.log(`\n--- 11. Strict Responsive & No Horizontal Overflow Testing ---`);
    for (const bp of BREAKPOINTS) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}/fr`, { waitUntil: "networkidle" });

      const hasHorizontalScrollbar = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      assert(!hasHorizontalScrollbar, `Viewport ${bp.name} has ZERO horizontal overflow`);
    }

  } catch (err) {
    console.error(`Error during browser test execution:`, err);
    failedTests++;
  } finally {
    await browser.close();
    if (serverProcess) {
      serverProcess.kill();
      // On Windows kill process tree
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
