// https://qiita.com/go_sagawa/items/85f97deab7ccfdce53ea
import puppeteer from 'puppeteer';

(async () => {
  // Launch a new browser instance
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
    ],
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a webpage
  await page.goto('https://www.oreilly.co.jp/ebook/');

  // Set screen size.
  await page.setViewport({ width: 1024, height: 768 });

  // Select all book links
  // puppeteer: ^22.2.0
  // https://stackoverflow.com/questions/48165646/how-can-i-get-an-element-by-xpath/78054219#78054219
  const titleXPath = "::-p-xpath(//table[contains(@class, 'ebookCatalog')]//a[@class='ebookTitle'])";
  const titleList = await page.$$(titleXPath);

  // Loop through each book
  for (const title of titleList) {
    console.log(await title.evaluate((el) => el.textContent));
  }

  // Close the browser
  await browser.close();
})();
