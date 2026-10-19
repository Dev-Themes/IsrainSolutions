const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'https://career-vixa.vercel.app';
const SHOTS_DIR = path.join(__dirname, 'audit_shots');

if (!fs.existsSync(SHOTS_DIR)) {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

// Helper: calculate contrast ratio
function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(rgb1, rgb2) {
  const lum1 = luminance(...rgb1);
  const lum2 = luminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const VIEWPORTS = [
  { name: '320px-mobile-xs', width: 320, height: 600 },
  { name: '375px-mobile-sm', width: 375, height: 667 },
  { name: '768px-tablet', width: 768, height: 1024 },
  { name: '1024px-laptop', width: 1024, height: 768 },
  { name: '1440px-desktop', width: 1440, height: 900 },
  { name: '1920px-fullhd', width: 1920, height: 1080 },
  { name: '2560px-ultrawide', width: 2560, height: 1440 }
];

const PUBLIC_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Articles', path: '/articles' },
  { name: 'ArticleDetail', path: '/articles/high-impact-executive-resume-strategies' },
  { name: 'Category', path: '/category/career-development' },
  { name: 'About', path: '/about' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Publish', path: '/publish' },
  { name: 'Login', path: '/login' },
  { name: 'Signup', path: '/signup' },
  { name: 'ForgotPassword', path: '/forgot-password' }
];

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const findings = {
    responsiveIssues: [],
    themeIssues: [],
    dashboardIssues: [],
    colorAbnormalities: [],
    structuralIssues: []
  };

  console.log('=== 1. AUDITING PUBLIC PAGES RESPONSIVENESS & MAX-WIDTH ===');
  for (const pageInfo of PUBLIC_PAGES) {
    console.log(`Checking page: ${pageInfo.name} (${pageInfo.path})`);
    
    // Check at key widths
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      try {
        await page.goto(`${BASE_URL}${pageInfo.path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await new Promise(r => setTimeout(r, 600));

        const layoutCheck = await page.evaluate((vpWidth) => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollW = Math.max(docEl.scrollWidth, body.scrollWidth);
          const hasHScroll = scrollW > vpWidth + 2; // threshold for rounding
          
          // Check container max widths
          const main = document.querySelector('main');
          const header = document.querySelector('header');
          const footer = document.querySelector('footer');
          const containers = Array.from(document.querySelectorAll('.max-w-7xl, .container, [class*="max-w-"]'));

          // Check if any section has dispersed content on wide screen
          let maxMainInnerWidth = 0;
          if (main) {
            const firstChild = main.firstElementChild;
            if (firstChild) {
              maxMainInnerWidth = firstChild.getBoundingClientRect().width;
            }
          }

          return {
            scrollW,
            hasHScroll,
            overflowDelta: scrollW - vpWidth,
            mainWidth: main ? main.getBoundingClientRect().width : 0,
            maxMainInnerWidth,
            containerCount: containers.length
          };
        }, vp.width);

        if (layoutCheck.hasHScroll) {
          findings.responsiveIssues.push({
            page: pageInfo.name,
            viewport: vp.name,
            width: vp.width,
            issue: `Horizontal overflow detected! scrollWidth=${layoutCheck.scrollW}px exceeds viewport=${vp.width}px by ${layoutCheck.overflowDelta}px`
          });
        }

        // Save screenshot for 320px, 1440px, 2560px for visual evidence
        if (['320px-mobile-xs', '1440px-desktop', '2560px-ultrawide'].includes(vp.name)) {
          const shotName = `public_${pageInfo.name}_${vp.name}.png`;
          await page.screenshot({ path: path.join(SHOTS_DIR, shotName), fullPage: false });
        }
      } catch (err) {
        console.error(`Error loading ${pageInfo.name} at ${vp.name}:`, err.message);
      }
    }
  }

  console.log('=== 2. AUDITING THEMES (LIGHT vs DARK) ON PUBLIC SITE ===');
  await page.setViewport({ width: 1440, height: 900 });
  for (const pageInfo of [PUBLIC_PAGES[0], PUBLIC_PAGES[1], PUBLIC_PAGES[2]]) {
    await page.goto(`${BASE_URL}${pageInfo.path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    
    // Test Dark Theme
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SHOTS_DIR, `theme_dark_${pageInfo.name}.png`) });

    const darkTokens = await page.evaluate(() => {
      const bodyStyle = window.getComputedStyle(document.body);
      const h1 = document.querySelector('h1');
      const h1Style = h1 ? window.getComputedStyle(h1) : null;
      const muted = document.querySelector('.text-text-muted, p');
      const mutedStyle = muted ? window.getComputedStyle(muted) : null;
      const card = document.querySelector('.bg-bg-surface, article');
      const cardStyle = card ? window.getComputedStyle(card) : null;

      return {
        theme: 'dark',
        bodyBg: bodyStyle.backgroundColor,
        bodyColor: bodyStyle.color,
        h1Color: h1Style ? h1Style.color : null,
        mutedColor: mutedStyle ? mutedStyle.color : null,
        cardBg: cardStyle ? cardStyle.backgroundColor : null,
      };
    });

    // Test Light Theme
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SHOTS_DIR, `theme_light_${pageInfo.name}.png`) });

    const lightTokens = await page.evaluate(() => {
      const bodyStyle = window.getComputedStyle(document.body);
      const h1 = document.querySelector('h1');
      const h1Style = h1 ? window.getComputedStyle(h1) : null;
      const muted = document.querySelector('.text-text-muted, p');
      const mutedStyle = muted ? window.getComputedStyle(muted) : null;
      const card = document.querySelector('.bg-bg-surface, article');
      const cardStyle = card ? window.getComputedStyle(card) : null;

      return {
        theme: 'light',
        bodyBg: bodyStyle.backgroundColor,
        bodyColor: bodyStyle.color,
        h1Color: h1Style ? h1Style.color : null,
        mutedColor: mutedStyle ? mutedStyle.color : null,
        cardBg: cardStyle ? cardStyle.backgroundColor : null,
      };
    });

    findings.themeIssues.push({
      page: pageInfo.name,
      darkTokens,
      lightTokens
    });
  }

  console.log('=== 3. AUDITING CLIENT DASHBOARD (ACCOUNT CREATION & LOGGED IN) ===');
  // Log in as our created client
  const clientEmail = 'client.audit.1792061473027@testvixa.org';
  const clientPass = 'VixaAudit2026!#';

  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2', timeout: 20000 });
  await page.type('input[type="email"]', clientEmail);
  await page.type('input[type="password"]', clientPass);
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 }).catch(e => {})
  ]);

  const DASHBOARD_PAGES = [
    { name: 'DashboardOverview', path: '/dashboard' },
    { name: 'DashboardArticles', path: '/dashboard/articles' },
    { name: 'DashboardNewArticle', path: '/dashboard/articles/new' },
    { name: 'DashboardAIDraft', path: '/dashboard/ai/generate' },
    { name: 'DashboardSettings', path: '/dashboard/settings' }
  ];

  for (const dbPage of DASHBOARD_PAGES) {
    console.log(`Checking Client Dashboard: ${dbPage.name} (${dbPage.path})`);
    await page.goto(`${BASE_URL}${dbPage.path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise(r => setTimeout(r, 800));

    // Test across viewports
    for (const vp of [
      { name: '320px-mobile-xs', width: 320, height: 600 },
      { name: '768px-tablet', width: 768, height: 1024 },
      { name: '1440px-desktop', width: 1440, height: 900 },
      { name: '2560px-ultrawide', width: 2560, height: 1440 }
    ]) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await new Promise(r => setTimeout(r, 400));

      const overflow = await page.evaluate((vpWidth) => {
        const docEl = document.documentElement;
        const body = document.body;
        const scrollW = Math.max(docEl.scrollWidth, body.scrollWidth);
        return {
          scrollW,
          hasHScroll: scrollW > vpWidth + 2,
          delta: scrollW - vpWidth
        };
      }, vp.width);

      if (overflow.hasHScroll) {
        findings.responsiveIssues.push({
          page: `ClientDashboard-${dbPage.name}`,
          viewport: vp.name,
          width: vp.width,
          issue: `Horizontal overflow in client dashboard! scrollWidth=${overflow.scrollW}px vs ${vp.width}px`
        });
      }

      if (['320px-mobile-xs', '1440px-desktop'].includes(vp.name)) {
        await page.screenshot({ path: path.join(SHOTS_DIR, `client_${dbPage.name}_${vp.name}.png`) });
      }
    }

    // Now test BOTH THEMES on 1440px viewport
    await page.setViewport({ width: 1440, height: 900 });

    // 3A. Dark Theme Inspection
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SHOTS_DIR, `client_${dbPage.name}_DARK.png`), fullPage: true });

    const darkAnalysis = await page.evaluate(() => {
      // Analyze text and bg colors of elements
      const elements = Array.from(document.querySelectorAll('h1, h2, h3, p, span, label, input, select, textarea, button, a, [class*="card"], .rounded-2xl, aside, header, nav'));
      
      const anomalies = [];
      const samples = [];

      elements.forEach(el => {
        const cs = window.getComputedStyle(el);
        const text = el.innerText?.trim();
        if (!text || text.length > 60) return;

        const color = cs.color;
        const bg = cs.backgroundColor;

        // Check if white text on white bg or black on dark bg
        // parse rgb
        const parseRgb = (str) => {
          const match = str.match(/\d+/g);
          return match ? match.slice(0, 3).map(Number) : null;
        };

        const cRgb = parseRgb(color);
        const bgRgb = parseRgb(bg);

        samples.push({
          tag: el.tagName,
          text: text.slice(0, 30),
          color,
          bg,
          classes: el.className
        });

        if (cRgb && bgRgb && bg !== 'rgba(0, 0, 0, 0)') {
          const lumC = (cRgb[0]*0.299 + cRgb[1]*0.587 + cRgb[2]*0.114);
          const lumBg = (bgRgb[0]*0.299 + bgRgb[1]*0.587 + bgRgb[2]*0.114);
          const diff = Math.abs(lumC - lumBg);
          if (diff < 40) {
            anomalies.push({
              issue: 'Low contrast / illegible text in dark mode',
              tag: el.tagName,
              text: text.slice(0, 40),
              color,
              bg,
              classes: el.className
            });
          }
        }
      });

      return { anomalies, samples: samples.slice(0, 25) };
    });

    // 3B. Light Theme Inspection
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SHOTS_DIR, `client_${dbPage.name}_LIGHT.png`), fullPage: true });

    const lightAnalysis = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('h1, h2, h3, p, span, label, input, select, textarea, button, a, [class*="card"], .rounded-2xl, aside, header, nav'));
      
      const anomalies = [];
      const samples = [];

      elements.forEach(el => {
        const cs = window.getComputedStyle(el);
        const text = el.innerText?.trim();
        if (!text || text.length > 60) return;

        const color = cs.color;
        const bg = cs.backgroundColor;

        const parseRgb = (str) => {
          const match = str.match(/\d+/g);
          return match ? match.slice(0, 3).map(Number) : null;
        };

        const cRgb = parseRgb(color);
        const bgRgb = parseRgb(bg);

        samples.push({
          tag: el.tagName,
          text: text.slice(0, 30),
          color,
          bg,
          classes: el.className
        });

        if (cRgb && bgRgb && bg !== 'rgba(0, 0, 0, 0)') {
          const lumC = (cRgb[0]*0.299 + cRgb[1]*0.587 + cRgb[2]*0.114);
          const lumBg = (bgRgb[0]*0.299 + bgRgb[1]*0.587 + bgRgb[2]*0.114);
          const diff = Math.abs(lumC - lumBg);
          if (diff < 40) {
            anomalies.push({
              issue: 'Low contrast / illegible text in light mode',
              tag: el.tagName,
              text: text.slice(0, 40),
              color,
              bg,
              classes: el.className
            });
          }
        }
      });

      return { anomalies, samples: samples.slice(0, 25) };
    });

    findings.dashboardIssues.push({
      page: dbPage.name,
      darkAnomalies: darkAnalysis.anomalies,
      lightAnomalies: lightAnalysis.anomalies,
      darkSamples: darkAnalysis.samples,
      lightSamples: lightAnalysis.samples
    });
  }

  // Save audit findings to JSON
  fs.writeFileSync(path.join(__dirname, 'audit_results.json'), JSON.stringify(findings, null, 2));
  console.log('Audit complete! Results saved to scratch/audit_results.json');

  await browser.close();
}

runAudit().catch(console.error);
