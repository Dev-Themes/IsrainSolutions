const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'https://career-vixa.vercel.app';

async function diagnoseRule() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
  await page.type('input[type="email"]', 'client.audit.1792061473027@testvixa.org');
  await page.type('input[type="password"]', 'VixaAudit2026!#');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });
  await new Promise(r => setTimeout(r, 600));

  const matched = await page.evaluate(() => {
    const el = document.querySelector('header span.font-bold');
    if (!el) return 'Element not found';

    // Find all rules in document.styleSheets that match el
    const matchingRules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && el.matches(rule.selectorText)) {
            matchingRules.push({
              selector: rule.selectorText,
              cssText: rule.cssText
            });
          }
          if (rule.cssRules) {
            for (const subRule of rule.cssRules) {
              if (subRule.selectorText && el.matches(subRule.selectorText)) {
                matchingRules.push({
                  parent: rule.conditionText || rule.media?.mediaText || 'nested',
                  selector: subRule.selectorText,
                  cssText: subRule.cssText
                });
              }
            }
          }
        }
      } catch (e) {}
    }
    return matchingRules;
  });

  console.log('MATCHED RULES:', JSON.stringify(matched, null, 2));

  await browser.close();
}

diagnoseRule().catch(console.error);
