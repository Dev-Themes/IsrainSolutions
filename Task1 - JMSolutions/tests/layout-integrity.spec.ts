import { test, expect } from '@playwright/test';

const routes = ['/', '/services', '/about', '/contact', '/privacy', '/terms'];
const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 }
];

test.describe('Layout Integrity and Dark Theme', () => {
  for (const route of routes) {
    for (const vp of viewports) {
      test(`Route ${route} at ${vp.width}x${vp.height}`, async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(`http://localhost:3000${route}`);
        
        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');

        // 1. Dark check: Find the body background color
        const bodyBg = await page.evaluate(() => {
          return window.getComputedStyle(document.body).backgroundColor;
        });
        
        // A simple check to ensure it's not white
        expect(bodyBg).not.toBe('rgb(255, 255, 255)');
        expect(bodyBg).not.toBe('rgba(0, 0, 0, 0)');
        
        // 4. No horizontal scroll
        const isScrolling = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(isScrolling).toBe(false);

        // Header offset
        const mainStyle = await page.evaluate(() => {
          const main = document.querySelector('main');
          return main ? window.getComputedStyle(main).paddingTop : '0px';
        });
        expect(mainStyle).not.toBe('0px');
      });
    }
  }
});
