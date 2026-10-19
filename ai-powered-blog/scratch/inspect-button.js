const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'https://career-vixa.vercel.app';

async function inspectSaveButton() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Login
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
  await page.type('input[type="email"]', 'client.audit.1792061473027@testvixa.org');
  await page.type('input[type="password"]', 'VixaAudit2026!#');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  // Go to /dashboard/articles/new
  await page.goto(`${BASE_URL}/dashboard/articles/new`, { waitUntil: 'networkidle2' });

  // Light theme
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });
  await new Promise(r => setTimeout(r, 600));

  const detailsLight = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const saveBtn = buttons.find(b => b.innerText.includes('Save Draft'));
    if (!saveBtn) return 'Button not found';

    const cs = window.getComputedStyle(saveBtn);
    return {
      text: saveBtn.innerText,
      className: saveBtn.className,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      borderColor: cs.borderColor,
      opacity: cs.opacity,
      html: saveBtn.outerHTML
    };
  });

  console.log('--- SAVE DRAFT BUTTON IN LIGHT MODE ---', detailsLight);

  // Dark theme
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 600));

  const detailsDark = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const saveBtn = buttons.find(b => b.innerText.includes('Save Draft'));
    if (!saveBtn) return 'Button not found';

    const cs = window.getComputedStyle(saveBtn);
    return {
      text: saveBtn.innerText,
      className: saveBtn.className,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      borderColor: cs.borderColor,
      opacity: cs.opacity,
    };
  });

  console.log('--- SAVE DRAFT BUTTON IN DARK MODE ---', detailsDark);

  await browser.close();
}

inspectSaveButton().catch(console.error);
