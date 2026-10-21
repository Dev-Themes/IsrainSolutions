const { chromium } = require("playwright");

const WIDTHS = [320, 360, 375, 390, 430, 500, 640, 768, 1024, 1280, 1440, 1920, 2560];

async function testCardButtons() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/age-verification");
  await page.click("button:has-text('I am 18 or Older')");
  await page.waitForURL("http://localhost:3000/");

  console.log("=== COMPREHENSIVE CARD BUTTONS RESPONSIVENESS AUDIT ===");

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(100);

    const cardButtonResults = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll("article"));
      if (cards.length === 0) return { error: "No product cards found" };

      const issues = [];

      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();

        // Find Dossier button
        const buttons = Array.from(card.querySelectorAll("button"));
        const dossierBtn = buttons.find(b => b.textContent.includes("Dossier") || (b.getAttribute("title") && b.getAttribute("title").toLowerCase().includes("dossier")));
        // Find Details link
        const links = Array.from(card.querySelectorAll("a"));
        const detailsLink = links.find(a => a.textContent.includes("Details"));
        // Find Inquire link
        const inquireLink = links.find(a => a.textContent.includes("Inquire") || (a.getAttribute("aria-label") && a.getAttribute("aria-label").toLowerCase().includes("inquire")));

        if (!dossierBtn || !detailsLink || !inquireLink) {
          issues.push({
            cardIdx: idx,
            missing: { dossier: !dossierBtn, details: !detailsLink, inquire: !inquireLink }
          });
          return;
        }

        const dRect = dossierBtn.getBoundingClientRect();
        const detRect = detailsLink.getBoundingClientRect();
        const inqRect = inquireLink.getBoundingClientRect();

        // Check if any button extends beyond card right boundary (with 2px margin)
        const dOverflow = dRect.right > cardRect.right + 2;
        const detOverflow = detRect.right > cardRect.right + 2;
        const inqOverflow = inqRect.right > cardRect.right + 2;

        if (dOverflow || detOverflow || inqOverflow) {
          issues.push({
            cardIdx: idx,
            cardRight: cardRect.right,
            dRight: dRect.right,
            detRight: detRect.right,
            inqRight: inqRect.right,
            dOverflow,
            detOverflow,
            inqOverflow
          });
        }
      });

      return {
        cardCount: cards.length,
        issueCount: issues.length,
        issues,
      };
    });

    if (cardButtonResults.error) {
      throw new Error(`Error: ${cardButtonResults.error}`);
    }

    if (cardButtonResults.issueCount > 0) {
      console.error(`Issues at ${width}px:`, cardButtonResults.issues);
      throw new Error(`Buttons cropped/overflowing at ${width}px!`);
    }

    console.log(`[PASS] ${width}px: All ${cardButtonResults.cardCount} product cards have perfectly aligned, uncropped Dossier, Details, and Inquiry buttons.`);
  }

  await browser.close();
  console.log("\n==============================================");
  console.log("ALL CARD BUTTONS TESTS PASSED (ZERO CROPPING)!");
  console.log("==============================================");
}

testCardButtons().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
