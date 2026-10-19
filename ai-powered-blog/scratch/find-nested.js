const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: EDGE_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://career-vixa.vercel.app/dashboard', { waitUntil: 'networkidle2' });
  await page.type('input[type="email"]', 'client.audit.1792061473027@testvixa.org');
  await page.type('input[type="password"]', 'VixaAudit2026!#');
  await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation({ waitUntil: 'networkidle2' })]);
  
  const nested = await page.evaluate(() => {
    const list = [];
    for (const sheet of document.styleSheets) {
      try {
        function scan(rule, path) {
          if (rule.selectorText && rule.selectorText.includes('dark\\:text-\\[\\#F8FAFC\\]')) {
            list.push({ path, cssText: rule.cssText });
          }
          if (rule.cssRules) {
            for (const sub of rule.cssRules) {
              scan(sub, path + ' > ' + (sub.constructor.name + (sub.conditionText ? `(${sub.conditionText})` : '')));
            }
          }
        }
        for (const r of sheet.cssRules) {
          scan(r, r.constructor.name + (r.conditionText ? `(${r.conditionText})` : ''));
        }
      } catch (e) {}
    }
    return list;
  });
  console.log('NESTED PATH:', JSON.stringify(nested, null, 2));
  await browser.close();
})();
