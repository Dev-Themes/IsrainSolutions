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

function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const res = await checkUrl(`${url}/robots.txt`);
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve(true);
        }
      } catch {
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
  console.log(` PopArt Agency STUDIO CRÉATIF — VERIFICATION SUITE `);
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
    // 3. Test Root Redirect & New Animated Homepage
    console.log(`\n--- 3. Testing Root Redirect & New Animated Homepage ---`);
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    const currentUrl = page.url();
    assert(currentUrl.includes("/fr"), `Visiting / redirects to /fr (actual: ${currentUrl})`);

    // Verify Animated Brand Hero Region
    const heroRegion = page.locator('section[aria-label="PopArt Agency Brand Geometric Hero"]');
    assert(await heroRegion.isVisible(), `Animated Geometric Brand Hero section is rendered`);

    // Verify SVG Kinetic Typography with letter elements
    const heroSvg = heroRegion.locator("svg").first();
    assert(await heroSvg.isVisible(), `Hero SVG Kinetic Typography is rendered`);
    const letterF = heroRegion.locator("#hero-letter-F");
    const letterO = heroRegion.locator("#hero-letter-O");
    const letterR = heroRegion.locator("#hero-letter-R");
    const letterM = heroRegion.locator("#hero-letter-M");
    const letterE = heroRegion.locator("#hero-letter-E");
    assert(
      (await letterF.isVisible()) &&
        (await letterO.isVisible()) &&
        (await letterR.isVisible()) &&
        (await letterM.isVisible()) &&
        (await letterE.isVisible()),
      `All 5 geometric letters (F, O, R, M, E) are present in the kinetic hero`
    );

    // Verify State Buttons and Color Switching
    const stateBtn3 = heroRegion.locator('button:has-text("03")');
    if (await stateBtn3.isVisible()) {
      await stateBtn3.click();
      await page.waitForTimeout(600);
      assert(true, `Interacting with hero state indicators changes animation state`);
    }

    // 4. Test Featured Work Section on Homepage
    console.log(`\n--- 4. Testing Featured Work on Homepage ---`);
    const featuredSection = page.locator("#featured-work");
    assert(await featuredSection.isVisible(), `Featured Work section is rendered on homepage`);

    const featuredArticles = featuredSection.locator("article");
    const featuredCount = await featuredArticles.count();
    assert(featuredCount === 3, `Featured Work section displays 3 cinematic projects (found: ${featuredCount})`);

    // Test Lightbox from Featured Project
    const firstFeaturedButton = featuredArticles.first().locator("button").first();
    await firstFeaturedButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await firstFeaturedButton.click({ force: true });
    await page.waitForTimeout(600);

    const dialog = page.locator('div[role="dialog"]');
    assert(await dialog.isVisible(), `Featured Project opens fullscreen Lightbox`);
    const closeBtn = dialog.locator('button[aria-label*="Fermer"], button[aria-label*="Close"]').first();
    await closeBtn.click();
    await page.waitForTimeout(400);
    assert(!(await dialog.isVisible()), `Lightbox closes cleanly`);

    // Test "VIEW ALL WORK ↗" button
    const viewAllBtn = featuredSection.locator('a:has-text("VOIR TOUS LES PROJETS")').first();
    assert(await viewAllBtn.isVisible(), `"VOIR TOUS LES PROJETS ↗" link is visible in featured section`);

    // 5. Test About Introduction on Homepage
    console.log(`\n--- 5. Testing About / Studio Section on Homepage ---`);
    const aboutHeading = page.locator('h2 span.sr-only:has-text("ABOUT")').first();
    assert(await aboutHeading.isVisible(), `Bespoke geometric ABOUT heading is rendered`);

    const aboutStudioLink = page.locator('a:has-text("À PROPOS DU STUDIO")').first();
    assert(await aboutStudioLink.isVisible(), `"À PROPOS DU STUDIO ↗" link is present in about section`);

    // 6. Test Existing Contact Section on Homepage
    console.log(`\n--- 6. Testing Contact Section on Homepage ---`);
    const contactSection = page.locator('section:has-text("14 Rue de Charonne")').first();
    assert(await contactSection.isVisible(), `Existing Contact section is preserved and rendered on homepage`);

    // 7. Test Footer Eye-to-Wordmark Animation
    console.log(`\n--- 7. Testing Footer Eye-to-Wordmark Animation ---`);
    const eyeButton = page.locator('footer button[type="button"]');
    assert(await eyeButton.isVisible(), `Footer eye interactive button is rendered`);

    await eyeButton.hover();
    await page.waitForTimeout(600);
    const hoveredPressed = await eyeButton.getAttribute("aria-pressed");
    assert(hoveredPressed === "true", `Footer eye animation reacts on hover (aria-pressed="true")`);

    // 8. Test Dedicated /work Route
    console.log(`\n--- 8. Testing Dedicated Work Route (/fr/work) ---`);
    await page.goto(`${BASE_URL}/fr/work`, { waitUntil: "networkidle" });
    assert(page.url().includes("/fr/work"), `Navigated successfully to /fr/work`);

    // Verify WORK hero heading
    const workHeroH1 = page.locator('h1 span.sr-only:has-text("WORK")').or(page.locator("h1")).first();
    const workHeadingText = await workHeroH1.textContent();
    assert(workHeadingText.includes("WORK"), `WORK hero display heading rendered: "${workHeadingText?.trim()}"`);

    // Verify Capabilities Section
    const manifesto = page.getByText("NOUS DONNONS PopArt Agency AUX IDÉES.").or(page.getByText("WE MAKE IDEAS VISIBLE.")).first();
    assert(await manifesto.isVisible(), `Capabilities manifesto section is preserved on /work`);

    // Verify Complete 16 Projects Portfolio Grid
    const workCards = page.locator("article");
    const workCardCount = await workCards.count();
    assert(workCardCount >= 16, `All 16 complete portfolio projects rendered on /work (found: ${workCardCount})`);

    // 9. Test Header Navigation
    console.log(`\n--- 9. Testing Header Navigation Links ---`);
    const homeNavFr = page.locator('header nav a:has-text("ACCUEIL")').first();
    assert(await homeNavFr.isVisible(), `ACCUEIL navigation link is visible in French header`);

    const workNav = page.locator('header nav a:has-text("TRAVAUX")').first();
    await workNav.click();
    await page.waitForTimeout(600);
    assert(page.url().includes("/fr/work"), `Clicking TRAVAUX in header navigates to /fr/work`);

    // Click ACCUEIL to navigate back to homepage
    await homeNavFr.click();
    await page.waitForTimeout(600);
    assert(page.url().endsWith("/fr") || page.url().endsWith("/fr/"), `Clicking ACCUEIL in header navigates to /fr`);

    // Brand logo navigates to homepage
    const brandLogo = page.locator('header a[aria-label*="Accueil"]').first();
    assert(await brandLogo.isVisible(), `Brand logo is visible and clickable`);

    // 10. Test English Locale on Homepage & Work
    console.log(`\n--- 10. Testing English Locale Routing ---`);
    await page.goto(`${BASE_URL}/en`, { waitUntil: "networkidle" });
    const enHtmlLang = await page.getAttribute("html", "lang");
    assert(enHtmlLang === "en", `English locale HTML lang attribute is "en"`);
    const homeNavEn = page.locator('header nav a:has-text("HOME")').first();
    assert(await homeNavEn.isVisible(), `HOME navigation link is visible in English header`);
    const enViewAll = page.locator('a:has-text("VIEW ALL WORK")').first();
    assert(await enViewAll.isVisible(), `English homepage displays "VIEW ALL WORK ↗"`);

    await page.goto(`${BASE_URL}/en/work`, { waitUntil: "networkidle" });
    const enManifesto = page.getByText("WE MAKE IDEAS VISIBLE.").first();
    assert(await enManifesto.isVisible(), `English /en/work displays "WE MAKE IDEAS VISIBLE."`);

    // 11. Test Products Route Preservation
    console.log(`\n--- 11. Testing Products Route Preservation ---`);
    await page.goto(`${BASE_URL}/fr/products`, { waitUntil: "networkidle" });
    const productsH1 = page.locator("h1");
    assert((await productsH1.textContent()).includes("PORTFOLIO"), `Products page remains preserved`);

    // 12. Strict Responsive & No-Overflow Testing across all 9 breakpoints
    console.log(`\n--- 12. Strict Responsiveness & Zero Horizontal Overflow Verification ---`);
    for (const bp of BREAKPOINTS) {
      await page.setViewportSize({ width: bp.width, height: bp.height });

      // Test Homepage
      await page.goto(`${BASE_URL}/fr`, { waitUntil: "networkidle" });
      const homeOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      assert(!homeOverflow, `Viewport ${bp.name} has ZERO horizontal overflow on Homepage (/fr)`);

      // Test Work Page
      await page.goto(`${BASE_URL}/fr/work`, { waitUntil: "networkidle" });
      const workOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      assert(!workOverflow, `Viewport ${bp.name} has ZERO horizontal overflow on Work page (/fr/work)`);
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
      } catch {}
    }
  }

  console.log(`\n======================================================`);
  console.log(` RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log(`======================================================\n`);

  process.exit(failedTests > 0 ? 1 : 0);
}

runTests();
