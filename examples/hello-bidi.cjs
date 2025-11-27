const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    browser: 'firefox', // WebDriver BiDi is used by default.
    //
    // CAUTION:
    //  BiDi needs puppeteer >= 23 and firefox >= 129
    //  https://developer.chrome.com/blog/firefox-support-in-puppeteer-with-webdriver-bidi?hl=ja
    protocol: 'webDriverBiDi',

    /**
     * Whether to run the browser in headless mode.
     *
     * @remarks
     *
     * - `true` launches the browser in the
     *   {@link https://developer.chrome.com/articles/new-headless/ | new headless}
     *   mode.
     *
     * - `'shell'` launches
     *   {@link https://developer.chrome.com/blog/chrome-headless-shell | shell}
     *   known as the old headless mode.
     *
     * @defaultValue `true`
     *
     * https://github.com/puppeteer/puppeteer/blob/5dbc9374d6622d4fbd72f2c3a2e6445f18465133/packages/puppeteer-core/src/node/LaunchOptions.ts#L99-L114
     */
    headless: false,
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a webpage
  await page.goto('https://www.google.com');

  console.log(await page.title());

  // Close the browser
  await browser.close();
})();
