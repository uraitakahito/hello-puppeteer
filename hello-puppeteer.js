const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables "headful" mode.
    headless: 'new',
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a webpage
  await page.goto('https://www.google.com');

  console.log(await page.title());

  // Close the browser
  await browser.close();
})();
