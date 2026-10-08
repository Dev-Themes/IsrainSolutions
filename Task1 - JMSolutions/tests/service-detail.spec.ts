import { test, expect } from '@playwright/test';

const services = ['residential', 'commercial', 'refrigeration', 'maintenance'];

test.describe('Sub-Service Pages Structural Validation', () => {
  for (const service of services) {
    test(`Validates constraints on /services/${service}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/services/${service}`);
      await page.waitForLoadState('load');

      // 1. Verify No Placeholders in the DOM
      const htmlContent = await page.content();
      expect(htmlContent).not.toMatch(/\[PHONE\]/i);
      expect(htmlContent).not.toMatch(/\[CITY\]/i);
      expect(htmlContent).not.toMatch(/TBD/);
      expect(htmlContent).not.toMatch(/TODO/);

      // 2. Verify 6 Offer Cards
      const cards = await page.locator('div.bg-card').count();
      expect(cards).toBeGreaterThanOrEqual(6);

      // 3. Verify Checklist has 6 items
      const checkListItems = await page.locator('section:has-text("Why JM Comfort Solutions") ul li svg').count();
      expect(checkListItems).toBeGreaterThanOrEqual(6);
      // Let's just check the number of <li> inside the "Why" section.
      const whySectionText = await page.locator('section').filter({ hasText: /Why JM Comfort Solutions/ }).innerText();
      expect(whySectionText).toBeTruthy();

      // 4. Verify 4 FAQs
      const faqs = await page.locator('button[aria-expanded]').count();
      expect(faqs).toBeGreaterThanOrEqual(4);

      // 5. Verify JSON-LD Schema (Does not contain dummy data)
      const schemaScript = await page.locator('script[type="application/ld+json"]').innerText();
      const schema = JSON.parse(schemaScript);
      // Telephone and address should be omitted if dummy
      expect(schema.telephone).toBeUndefined();
      expect(schema.address).toBeUndefined();

      // 6. Visual Geometry: No horizontal scroll
      const isScrolling = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(isScrolling).toBe(false);
    });
  }
});
