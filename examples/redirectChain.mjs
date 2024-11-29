// https://github.com/puppeteer/puppeteer/issues/2163#issuecomment-380279128
import puppeteer from 'puppeteer';

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables "headful" mode.
    headless: 'new',
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
  const response = await page.goto('https://httpbin.org/redirect/3');
  const chain = response.request().redirectChain();
  console.log(chain[0].url()); // https://httpbin.org/redirect/3
  console.log(chain[1].url()); // https://httpbin.org/relative-redirect/2
  console.log(chain[2].url()); // https://httpbin.org/relative-redirect/1
  console.log(chain.length); // 3

  // Close the browser
  await browser.close();
})();
