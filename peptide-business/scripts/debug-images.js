const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/age-verification");
  await page.click("button:has-text('I am 18 or Older')");
  await page.waitForURL("http://localhost:3000/");
  await page.waitForTimeout(1000);

  const heroImgDetails = await page.evaluate(() => {
    const heroImg = document.querySelector("section#home img, section img");
    if (!heroImg) return "No hero img found";
    const parent = heroImg.parentElement;
    return {
      imgTag: heroImg.outerHTML.substring(0, 150),
      imgRect: heroImg.getBoundingClientRect(),
      imgOffsetWidth: heroImg.offsetWidth,
      imgOffsetHeight: heroImg.offsetHeight,
      parentTag: parent.outerHTML.substring(0, 150),
      parentRect: parent.getBoundingClientRect(),
      parentOffsetWidth: parent.offsetWidth,
      parentOffsetHeight: parent.offsetHeight,
      parentComputedDisplay: window.getComputedStyle(parent).display,
      parentComputedPosition: window.getComputedStyle(parent).position,
      parentComputedWidth: window.getComputedStyle(parent).width,
      parentComputedHeight: window.getComputedStyle(parent).height,
    };
  });
  console.log("Hero Img Details:", JSON.stringify(heroImgDetails, null, 2));

  const productImgDetails = await page.evaluate(() => {
    const cardImg = document.querySelector("article img");
    if (!cardImg) return "No card img found";
    const parent = cardImg.parentElement;
    return {
      imgTag: cardImg.outerHTML.substring(0, 150),
      imgRect: cardImg.getBoundingClientRect(),
      imgOffsetWidth: cardImg.offsetWidth,
      imgOffsetHeight: cardImg.offsetHeight,
      parentTag: parent.outerHTML.substring(0, 150),
      parentRect: parent.getBoundingClientRect(),
      parentOffsetWidth: parent.offsetWidth,
      parentOffsetHeight: parent.offsetHeight,
      parentComputedDisplay: window.getComputedStyle(parent).display,
      parentComputedPosition: window.getComputedStyle(parent).position,
      parentComputedWidth: window.getComputedStyle(parent).width,
      parentComputedHeight: window.getComputedStyle(parent).height,
    };
  });
  console.log("Product Img Details:", JSON.stringify(productImgDetails, null, 2));

  await browser.close();
}
run().catch(console.error);
