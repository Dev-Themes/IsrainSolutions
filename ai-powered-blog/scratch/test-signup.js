const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'https://career-vixa.vercel.app';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--window-size=1920,1080']
  });

  const page = await browser.newPage();

  // Test registration
  console.log('--- STEP 1: Registration ---');
  await page.goto(`${BASE_URL}/signup`, { waitUntil: 'networkidle2', timeout: 30000 });
  
  const testEmail = `client.audit.${Date.now()}@testvixa.org`;
  const testPass = 'VixaAudit2026!#';
  const testName = 'Audit Client User';

  console.log('Attempting signup with:', testEmail);
  await page.type('input[type="text"], input[name="name"]', testName);
  await page.type('input[type="email"]', testEmail);
  await page.type('input[type="password"]', testPass);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_signup_filled.png') });
  
  // Submit
  await Promise.all([
    page.click('button[type="submit"]'),
    new Promise(r => setTimeout(r, 4000))
  ]);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_signup_result.png') });
  const signupHtml = await page.evaluate(() => document.body.innerText);
  console.log('Signup result page snippet:', signupHtml.slice(0, 300));

  // Try Login
  console.log('--- STEP 2: Login ---');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.type('input[type="email"]', testEmail);
  await page.type('input[type="password"]', testPass);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_login_filled.png') });

  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log('Nav timeout/handled:', e.message))
  ]);

  console.log('Current URL after login attempt:', page.url());
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_after_login.png') });

  // Navigate to /dashboard
  if (!page.url().includes('/dashboard')) {
    console.log('Navigating directly to /dashboard...');
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle2', timeout: 30000 });
  }

  console.log('Dashboard URL:', page.url());
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_dashboard_initial.png') });

  await browser.close();
}

main().catch(console.error);
