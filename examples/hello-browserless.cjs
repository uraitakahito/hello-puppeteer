const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'ws://host.docker.internal:3000',
});

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a webpage
  await page.goto('https://www.google.com');

  console.log(await page.title());

  // Close the browser
  await browser.close();
})();
