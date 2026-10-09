import { test, expect } from '@playwright/test';

const urlsToTest = [
  '/ac-repair',
  '/ac-repair-beasley' // Regular placeholder
];

const viewports = [
  { width: 320, height: 600 },
  { width: 360, height: 640 },
  { width: 390, height: 844 },
  { width: 480, height: 800 },
  { width: 640, height: 900 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
];

for (const url of urlsToTest) {
  test.describe(`AC Repair page: ${url}`, () => {
    
    for (const vp of viewports) {
      test(`Renders correctly at ${vp.width}x${vp.height} with no horizontal scroll`, async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(url);
        
        // Assert no horizontal scroll
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(vp.width);
      });
    }

    test('Has exactly one H1 and valid structure', async ({ page }) => {
      await page.goto(url);
      
      const h1s = await page.locator('h1').count();
      expect(h1s).toBe(1);

      // Section counts
      const issueCards = await page.locator('.grid-cards > div').count();
      expect(issueCards).toBe(4);

      const caseCards = await page.locator('.grid-cases > div').count();
      expect(caseCards).toBe(3);

      const checklistItems = await page.locator('.checklist-card .checklist li').count();
      // Total items could be sum of multiple checklists, but specifically the problems one is 18
      expect(checklistItems).toBeGreaterThanOrEqual(18);

      const faqs = await page.locator('h4').count();
      expect(faqs).toBeGreaterThanOrEqual(6);

      const content = await page.content();
      expect(content).not.toMatch(/lorem|todo|tbd|coming soon/i);
    });

    test('Hero image loads with alt', async ({ page }) => {
      await page.goto(url);
      const heroImage = page.locator('img[alt="Outdoor air conditioner condenser unit with service gauges attached"]');
      await expect(heroImage).toBeVisible();
    });

  });
}
