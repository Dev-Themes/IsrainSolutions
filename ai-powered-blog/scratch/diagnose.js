const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'https://career-vixa.vercel.app';

async function diagnose() {
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

  const diag = await page.evaluate(() => {
    const dashContainer = document.querySelector('.dashboard-client');
    const headerTitle = document.querySelector('header .text-slate-950, header span.font-bold');
    const statVal = document.querySelector('.grid .text-3xl');
    
    function getCssProps(el) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
      };
    }

    const htmlClasses = document.documentElement.className;
    const dashClientStyle = dashContainer ? {
      color: window.getComputedStyle(dashContainer).color,
      bg: window.getComputedStyle(dashContainer).backgroundColor,
      dashTextPrimary: window.getComputedStyle(dashContainer).getPropertyValue('--dashboard-text-primary'),
      dashBg: window.getComputedStyle(dashContainer).getPropertyValue('--dashboard-bg'),
      textHeading: window.getComputedStyle(dashContainer).getPropertyValue('--text-heading'),
      colorTextHeading: window.getComputedStyle(dashContainer).getPropertyValue('--color-text-heading'),
    } : null;

    return {
      htmlClasses,
      dashClientStyle,
      headerTitle: getCssProps(headerTitle),
      statVal: getCssProps(statVal),
    };
  });

  console.log('DIAGNOSTIC RESULT:', JSON.stringify(diag, null, 2));

  await browser.close();
}

diagnose().catch(console.error);
