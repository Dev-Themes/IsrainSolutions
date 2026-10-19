const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: EDGE_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://career-vixa.vercel.app/login', { waitUntil: 'networkidle2' });
  await page.type('input[type="email"]', 'client.audit.1792061473027@testvixa.org');
  await page.type('input[type="password"]', 'VixaAudit2026!#');
  await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation({ waitUntil: 'networkidle2' })]);
  
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });
  await new Promise(r => setTimeout(r, 600));

  const rulesWithColor = await page.evaluate(() => {
    const el = document.querySelector('header span.font-bold');
    const matched = [];
    for (const sheet of document.styleSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        for (const r of rules) {
          function checkRule(rule) {
            if (rule.selectorText && el.matches(rule.selectorText)) {
              if (rule.style && rule.style.color) {
                matched.push({
                  selector: rule.selectorText,
                  color: rule.style.color,
                  cssText: rule.cssText
                });
              }
            }
            if (rule.cssRules) {
              for (const sub of rule.cssRules) {
                checkRule(sub);
              }
            }
          }
          checkRule(r);
        }
      } catch (e) {}
    }
    return matched;
  });

  console.log('RULES WITH COLOR:', rulesWithColor);
  await browser.close();
})();
