const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'https://career-vixa.vercel.app';

async function checkLive() {
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

  // Check light theme computed colors on /dashboard
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });
  await new Promise(r => setTimeout(r, 600));

  const liveData = await page.evaluate(() => {
    const headerTitle = document.querySelector('header .text-slate-950, header [class*="text-"]');
    const headerSubtitle = document.querySelector('header .text-xs, header [class*="text-"]');
    const statCardValue = document.querySelector('.grid .text-3xl, .grid .text-2xl');
    const statCardLabel = document.querySelector('.grid .text-xs.font-bold, .grid .tracking-wider');
    const previewBtn = document.querySelector('a[href*="/preview"], button');

    return {
      headerTitleColor: headerTitle ? window.getComputedStyle(headerTitle).color : null,
      headerSubtitleColor: headerSubtitle ? window.getComputedStyle(headerSubtitle).color : null,
      statCardValueColor: statCardValue ? window.getComputedStyle(statCardValue).color : null,
      statCardLabelColor: statCardLabel ? window.getComputedStyle(statCardLabel).color : null,
      previewBtnColor: previewBtn ? window.getComputedStyle(previewBtn).color : null,
      previewBtnBg: previewBtn ? window.getComputedStyle(previewBtn).backgroundColor : null,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
    };
  });

  console.log('LIVE DATA COMPUTED COLORS (LIGHT MODE):', JSON.stringify(liveData, null, 2));

  await browser.close();
}

checkLive().catch(console.error);
