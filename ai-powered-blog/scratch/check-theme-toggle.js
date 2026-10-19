const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'https://career-vixa.vercel.app';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
  await page.type('input[type="email"]', 'client.audit.1792061473027@testvixa.org');
  await page.type('input[type="password"]', 'VixaAudit2026!#');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle2' });

  // Let's find the theme toggle button in the dashboard!
  // Where is the theme toggle button on the dashboard?
  const toggles = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button[aria-label*="theme" i], button[aria-label*="Toggle theme" i], button:has(svg.lucide-sun), button:has(svg.lucide-moon)'));
    return btns.map(b => ({
      label: b.getAttribute('aria-label'),
      html: b.outerHTML,
      visible: b.offsetParent !== null
    }));
  });
  console.log('Theme toggle buttons found on dashboard:', toggles);

  // Check what happens when clicking toggle button
  if (toggles.length > 0) {
    console.log('Clicking the first theme toggle button...');
    await page.click('button[aria-label="Toggle theme"]');
    await new Promise(r => setTimeout(r, 500));
    const afterClick = await page.evaluate(() => {
      return {
        htmlClass: document.documentElement.className,
        localStorageTheme: localStorage.getItem('theme'),
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        mainBg: window.getComputedStyle(document.querySelector('main') || document.body).backgroundColor
      };
    });
    console.log('After toggle click:', afterClick);
  }

  await browser.close();
})();
