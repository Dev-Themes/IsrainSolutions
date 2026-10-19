const puppeteer = require('puppeteer-core');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Navigating to https://career-vixa.vercel.app/...');
  const response = await page.goto('https://career-vixa.vercel.app/', { waitUntil: 'networkidle2', timeout: 30000 });
  console.log('Status:', response.status());
  console.log('Title:', await page.title());

  const theme = await page.evaluate(() => {
    return {
      htmlClass: document.documentElement.className,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      bodyColor: window.getComputedStyle(document.body).color
    };
  });
  console.log('Theme info:', theme);

  await browser.close();
}

run().catch(console.error);
