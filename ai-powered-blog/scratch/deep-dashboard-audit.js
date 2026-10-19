const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'https://career-vixa.vercel.app';
const SHOTS_DIR = path.join(__dirname, 'dashboard_audit_visuals');

if (!fs.existsSync(SHOTS_DIR)) {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

async function detailedDashboardAudit() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Log in
  console.log('Logging in...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
  await page.type('input[type="email"]', 'client.audit.1792061473027@testvixa.org');
  await page.type('input[type="password"]', 'VixaAudit2026!#');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  const routes = [
    { name: 'Overview', url: `${BASE_URL}/dashboard` },
    { name: 'MyArticles', url: `${BASE_URL}/dashboard/articles` },
    { name: 'WriteArticle', url: `${BASE_URL}/dashboard/articles/new` },
    { name: 'AIDraft', url: `${BASE_URL}/dashboard/ai/generate` },
    { name: 'Settings', url: `${BASE_URL}/dashboard/settings` },
  ];

  const results = {};

  for (const route of routes) {
    console.log(`\nAuditing route: ${route.name}`);
    await page.goto(route.url, { waitUntil: 'networkidle2' });
    results[route.name] = { light: {}, dark: {} };

    // Set LIGHT mode first
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture Light Screenshot
    await page.screenshot({ path: path.join(SHOTS_DIR, `${route.name}_LIGHT_1440.png`), fullPage: true });

    // Collect color & typography metrics in Light Mode
    results[route.name].light = await page.evaluate(() => {
      const issues = [];
      const data = {
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        dashContainerBg: window.getComputedStyle(document.querySelector('.dashboard-client') || document.body).backgroundColor,
        dashContainerColor: window.getComputedStyle(document.querySelector('.dashboard-client') || document.body).color,
        sidebarBg: window.getComputedStyle(document.querySelector('aside') || document.body).backgroundColor,
        sidebarColor: window.getComputedStyle(document.querySelector('aside') || document.body).color,
        headerBg: window.getComputedStyle(document.querySelector('header') || document.body).backgroundColor,
        headerBorder: window.getComputedStyle(document.querySelector('header') || document.body).borderColor,
        headings: [],
        inputs: [],
        buttons: [],
        cards: []
      };

      // Check headings
      document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        const cs = window.getComputedStyle(h);
        data.headings.push({
          text: h.innerText.slice(0, 30),
          tag: h.tagName,
          color: cs.color,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight
        });
      });

      // Check inputs
      document.querySelectorAll('input, select, textarea').forEach(inp => {
        const cs = window.getComputedStyle(inp);
        data.inputs.push({
          type: inp.type || inp.tagName,
          name: inp.name || inp.placeholder || inp.id,
          color: cs.color,
          bg: cs.backgroundColor,
          border: cs.borderColor
        });
      });

      // Check buttons
      document.querySelectorAll('button, a.rounded-xl, a.inline-flex').forEach(btn => {
        const cs = window.getComputedStyle(btn);
        const text = btn.innerText?.trim();
        if (text && text.length < 40) {
          data.buttons.push({
            text,
            color: cs.color,
            bg: cs.backgroundColor,
            border: cs.borderColor
          });
        }
      });

      // Check cards / containers
      document.querySelectorAll('.rounded-2xl, .rounded-xl, .bg-white, .bg-card, [class*="border"]').forEach(card => {
        const cs = window.getComputedStyle(card);
        const text = card.innerText?.trim();
        if (card.tagName === 'DIV' && text && text.length > 5 && text.length < 80) {
          data.cards.push({
            text: text.slice(0, 40),
            bg: cs.backgroundColor,
            color: cs.color,
            border: cs.borderColor
          });
        }
      });

      return data;
    });

    // Set DARK mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture Dark Screenshot
    await page.screenshot({ path: path.join(SHOTS_DIR, `${route.name}_DARK_1440.png`), fullPage: true });

    // Collect color & typography metrics in Dark Mode
    results[route.name].dark = await page.evaluate(() => {
      const data = {
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        dashContainerBg: window.getComputedStyle(document.querySelector('.dashboard-client') || document.body).backgroundColor,
        dashContainerColor: window.getComputedStyle(document.querySelector('.dashboard-client') || document.body).color,
        sidebarBg: window.getComputedStyle(document.querySelector('aside') || document.body).backgroundColor,
        sidebarColor: window.getComputedStyle(document.querySelector('aside') || document.body).color,
        headerBg: window.getComputedStyle(document.querySelector('header') || document.body).backgroundColor,
        headerBorder: window.getComputedStyle(document.querySelector('header') || document.body).borderColor,
        headings: [],
        inputs: [],
        buttons: [],
        cards: []
      };

      document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        const cs = window.getComputedStyle(h);
        data.headings.push({
          text: h.innerText.slice(0, 30),
          tag: h.tagName,
          color: cs.color,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight
        });
      });

      document.querySelectorAll('input, select, textarea').forEach(inp => {
        const cs = window.getComputedStyle(inp);
        data.inputs.push({
          type: inp.type || inp.tagName,
          name: inp.name || inp.placeholder || inp.id,
          color: cs.color,
          bg: cs.backgroundColor,
          border: cs.borderColor
        });
      });

      document.querySelectorAll('button, a.rounded-xl, a.inline-flex').forEach(btn => {
        const cs = window.getComputedStyle(btn);
        const text = btn.innerText?.trim();
        if (text && text.length < 40) {
          data.buttons.push({
            text,
            color: cs.color,
            bg: cs.backgroundColor,
            border: cs.borderColor
          });
        }
      });

      return data;
    });
  }

  fs.writeFileSync(path.join(__dirname, 'dashboard_detailed_results.json'), JSON.stringify(results, null, 2));
  console.log('Detailed dashboard audit complete!');

  await browser.close();
}

detailedDashboardAudit().catch(console.error);
