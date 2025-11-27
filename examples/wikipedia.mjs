import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
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
    // The slowMo option slows down Puppeteer operations by a specified amount of milliseconds.
    // slowMo: 100,
    args: [
      // Disables GPU hardware acceleration. If software renderer
      // is not in place, then the GPU process won't launch.
      //
      // AND
      // WORKAROUND:
      //   - https://stackoverflow.com/questions/66402124/puppeteer-blocked-at-newpage
      '--disable-gpu',
      // The sandbox requires kernel features (namespaces) that are typically
      // unavailable in containers. See: https://pptr.dev/troubleshooting
      '--no-sandbox',
      // Companion flag for --no-sandbox when running as non-root.
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();

  // Navigate to Wikipedia's login page
  await page.goto('https://en.wikipedia.org/wiki/Special:UserLogin');

  // Fill in the login form
  await page.type('#wpName1', ''); // Replace 'your_username' with your actual username
  await page.type('#wpPassword1', ''); // Replace 'your_password' with your actual password
  await page.click('#wpLoginAttempt');

  // Close the browser
  await browser.close();
})();
