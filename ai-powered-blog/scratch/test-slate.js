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

  const val = await page.evaluate(() => {
    const el = document.querySelector('header span.font-bold');
    const cs = window.getComputedStyle(el);
    const container = document.querySelector('.dashboard-client');
    const ccs = window.getComputedStyle(container);
    return {
      elColor: cs.color,
      elClass: el.className,
      elVarSlate950: cs.getPropertyValue('--color-slate-950'),
      containerVarSlate950: ccs.getPropertyValue('--color-slate-950'),
      containerColor: ccs.color,
      containerClass: container.className,
      bodyColor: window.getComputedStyle(document.body).color,
      htmlColor: window.getComputedStyle(document.documentElement).color,
      htmlClass: document.documentElement.className
    };
  });
  console.log('TEST SLATE RESULT:', val);
  await browser.close();
})();
