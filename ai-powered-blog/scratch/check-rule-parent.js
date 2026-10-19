const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: EDGE_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://career-vixa.vercel.app/dashboard', { waitUntil: 'networkidle2' });
  await page.type('input[type="email"]', 'client.audit.1792061473027@testvixa.org');
  await page.type('input[type="password"]', 'VixaAudit2026!#');
  await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation({ waitUntil: 'networkidle2' })]);
  
  const rules = await page.evaluate(() => {
    const list = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.cssText && rule.cssText.includes('dark\\:text-\\[\\#F8FAFC\\]')) {
            list.push({
              type: rule.constructor.name,
              condition: rule.conditionText || rule.media?.mediaText,
              cssText: rule.cssText
            });
          }
        }
      } catch (e) {}
    }
    return list;
  });
  console.log('RULE CONDITIONS:', rules.map(r => ({ type: r.type, condition: r.condition })));
  await browser.close();
})();
