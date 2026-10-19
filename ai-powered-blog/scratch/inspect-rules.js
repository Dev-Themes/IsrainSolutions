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
  await page.goto(`${BASE_URL}/dashboard/articles/new`, { waitUntil: 'networkidle2' });

  // Light theme
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });
  await new Promise(r => setTimeout(r, 600));

  const info = await page.evaluate(() => {
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save Draft'));
    if (!saveBtn) return 'Button not found';
    const cs = window.getComputedStyle(saveBtn);
    
    const matched = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && saveBtn.matches(rule.selectorText)) {
            matched.push({ selector: rule.selectorText, cssText: rule.cssText });
          }
        }
      } catch(e) {}
    }
    return {
      btnColor: cs.color,
      btnBg: cs.backgroundColor,
      btnBorder: cs.borderColor,
      matched
    };
  });
  console.log('Button computed color:', info.btnColor);
  console.log('Button computed bg:', info.btnBg);
  console.log('Button computed border:', info.btnBorder);
  console.log('Matched rules:', JSON.stringify(info.matched, null, 2));
  await browser.close();
})();
