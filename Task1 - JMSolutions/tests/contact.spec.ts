import { test, expect } from '@playwright/test';

const VIEWPORTS = [
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

test.describe('Contact Page', () => {
  for (const vp of VIEWPORTS) {
    test(`Visual & Layout: ${vp.width}x${vp.height}`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto('http://localhost:3000/contact');
      
      // No horizontal scroll
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(vp.width);

      // Check text is not placeholders
      const text = await page.textContent('body');
      expect(text).not.toMatch(/\[[A-Za-z _\/]+\]|lorem|tbd|todo|coming soon|confirm with/i);

      // Verify H1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Form tests
      const emergencyRadio = page.locator('input[type="radio"][value="emergency"]');
      const scheduleRadio = page.locator('input[type="radio"][value="schedule"]');
      await expect(scheduleRadio).toBeChecked();
      
      await emergencyRadio.check({ force: true }); // It's hidden using sr-only
      await expect(page.getByText('We dispatch the first available technician.')).toBeVisible();

      // Submit empty form should trigger HTML5 validation on client, but let's check basic structure
      const submitBtn = page.getByRole('button', { name: /Send Request/i });
      await expect(submitBtn).toBeVisible();

      // Social card is absent while site.isDummy is true
      const socialCard = page.getByText(/Find us online/i);
      await expect(socialCard).not.toBeVisible();
      
      // Links
      const contactLinks = await page.locator('a[href="/contact"]').count();
      expect(contactLinks).toBeGreaterThan(0);
    });
  }

  test('Validates SEO & Schema', async ({ page }) => {
    await page.goto('http://localhost:3000/contact');
    
    const title = await page.title();
    expect(title.length).toBeLessThanOrEqual(60);
    
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc?.length).toBeLessThanOrEqual(155);

    const jsonLdText = await page.locator('script[type="application/ld+json"]').textContent();
    const jsonLd = JSON.parse(jsonLdText || '{}');
    expect(jsonLd['@graph']).toBeDefined();
    const types = jsonLd['@graph'].map((item: any) => item['@type']);
    expect(types).toContain('WebPage');
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('FAQPage');
    expect(types).toContain('HVACBusiness');
  });

  test('Pre-selects service with ?service= param', async ({ page }) => {
    await page.goto('http://localhost:3000/contact?service=residential');
    const select = page.locator('select[name="service"]');
    await expect(select).toHaveValue('residential');
  });
});
