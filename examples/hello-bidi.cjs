const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    browser: 'firefox', // WebDriver BiDi is used by default.
    //
    // CAUTION:
    //  BiDi needs puppeteer >= 23 and firefox >= 129
    //  https://developer.chrome.com/blog/firefox-support-in-puppeteer-with-webdriver-bidi?hl=ja
    protocol: 'webDriverBiDi',
    //
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables "headful" mode.
    headless: false,
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a webpage
  await page.goto('https://www.google.com');

  console.log(await page.title());

  // Close the browser
  await browser.close();
})();
