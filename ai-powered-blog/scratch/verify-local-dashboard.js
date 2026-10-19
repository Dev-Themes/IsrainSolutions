const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:3000';
const SHOTS_DIR = path.join(__dirname, 'local_verification_shots');

if (!fs.existsSync(SHOTS_DIR)) {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrastRatio(rgb1, rgb2) {
  const lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function parseRgb(colorStr) {
  if (!colorStr) return { r: 0, g: 0, b: 0, a: 1 };
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] !== undefined ? parseFloat(match[4]) : 1
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

async function runLocalVerification() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Logging in to local instance...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', 'client.audit.1792061473027@testvixa.org');
  await page.type('input[type="password"]', 'VixaAudit2026!#');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  ]);
  console.log('Successfully authenticated!');

  const routes = [
    { name: 'Overview', url: `${BASE_URL}/dashboard` },
    { name: 'MyArticles', url: `${BASE_URL}/dashboard/articles` },
    { name: 'WriteArticle', url: `${BASE_URL}/dashboard/articles/new` },
    { name: 'AIDraft', url: `${BASE_URL}/dashboard/ai/generate` },
    { name: 'Settings', url: `${BASE_URL}/dashboard/settings` },
  ];

  const report = [];

  for (const route of routes) {
    console.log(`\n========================================`);
    console.log(`Testing Route: ${route.name} (${route.url})`);
    console.log(`========================================`);

    for (const theme of ['light', 'dark']) {
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(route.url, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 600));

      // Apply theme
      await page.evaluate((themeMode) => {
        if (themeMode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', themeMode);
      }, theme);

      await new Promise(r => setTimeout(r, 400));

      // Capture screenshot in 1440
      const shotPath = path.join(SHOTS_DIR, `${route.name}_${theme.toUpperCase()}_1440.png`);
      await page.screenshot({ path: shotPath, fullPage: true });

      // Collect contrast metrics
      const elementsMetrics = await page.evaluate(() => {
        function getEffectiveBg(el) {
          let cur = el;
          while (cur && cur !== document.documentElement) {
            const bg = window.getComputedStyle(cur).backgroundColor;
            if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
              return bg;
            }
            cur = cur.parentElement;
          }
          return document.documentElement.classList.contains('dark') ? 'rgb(11, 18, 32)' : 'rgb(248, 250, 252)';
        }

        const items = [];
        const selectors = [
          'h1', 'h2', 'h3',
          'p',
          'label',
          'input:not([type="checkbox"])',
          'button',
          'a.rounded-xl',
          'a.inline-flex',
          'table th',
          'table td',
          'span.rounded-full'
        ];

        document.querySelectorAll(selectors.join(',')).forEach((el) => {
          const text = (el.innerText || el.placeholder || el.value || '').trim();
          if (!text || text.length > 80) return;
          const cs = window.getComputedStyle(el);
          const fg = cs.color;
          const bg = getEffectiveBg(el);
          items.push({
            tag: el.tagName,
            text: text.slice(0, 40),
            fg,
            bg,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight
          });
        });

        return items;
      });

      let minContrast = 999;
      let fails = 0;
      let samplesChecked = 0;

      for (const item of elementsMetrics) {
        const fgRgb = parseRgb(item.fg);
        const bgRgb = parseRgb(item.bg);
        const ratio = contrastRatio(fgRgb, bgRgb);
        samplesChecked++;
        if (ratio < minContrast) minContrast = ratio;
        if (ratio < 4.0 && !item.text.toLowerCase().includes('optional')) {
          fails++;
        }
      }

      console.log(`[${theme.toUpperCase()}] Checked ${samplesChecked} elements. Lowest sample ratio: ${minContrast.toFixed(2)}:1. Under-ratio elements: ${fails}`);

      report.push({
        route: route.name,
        theme,
        samplesChecked,
        minContrast: `${minContrast.toFixed(2)}:1`,
        fails
      });
    }

    // Responsive checks on 320px
    await page.setViewport({ width: 320, height: 600 });
    await page.goto(route.url, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 400));
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`[RESPONSIVE 320px] Horizontal scroll detected: ${hasHorizontalScroll}`);
    await page.screenshot({ path: path.join(SHOTS_DIR, `${route.name}_320px.png`), fullPage: false });
  }

  console.log('\n=== AUDIT SUMMARY ===');
  console.table(report);

  await browser.close();
}

runLocalVerification().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
