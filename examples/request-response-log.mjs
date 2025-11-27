/* eslint-disable no-console */
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
      // The sandbox requires kernel features (namespaces) that are typically
      // unavailable in containers. See: https://pptr.dev/troubleshooting
      '--no-sandbox',
      // Companion flag for --no-sandbox when running as non-root.
      '--disable-setuid-sandbox',
    ],
  });

  // Open a new page
  const page = await browser.newPage();

  // Log requests and responses
  const networkLogs = [];
  page.on('request', (request) => {
    networkLogs.push({
      ts: Date.now(),
      network: 'request',
      url: request.url(),
      // headers: request.headers(), // Commented out due to large volume
    });
  });
  page.on('response', (response) => {
    networkLogs.push({
      ts: Date.now(),
      network: 'response',
      url: response.url(),
      status: response.status(),
      // headers: response.headers(), // Commented out due to large volume
    });
  });

  // Wait a bit to avoid high CPU usage right after opening the tab
  await new Promise((resolve) => { setTimeout(resolve, 1000 * 2); });

  // Navigate to a webpage
  const pageUrl = 'https://developer.chrome.com/';
  // PuppeteerLifeCycleEvent:
  // load - Waits for the 'load' event.
  // domcontentloaded - Waits for the 'DOMContentLoaded' event.
  // networkidle0 - Waits until there are no more than 0 network connections for at least 500 ms.
  // networkidle2 - Waits until there are no more than 2 network connections for at least 500 ms.
  await page.goto(pageUrl, { waitUntil: 'networkidle2' });

  // Set screen size.
  await page.setViewport({ width: 1024, height: 768 });

  // Type into search box.
  await page.locator('.devsite-search-field').fill('automate beyond recorder');

  // Wait and click on first result.
  await page.locator('.devsite-result-item-link').click();

  // Locate the full title with a unique string.
  const textSelector = await page.locator('text/Customize and automate').waitHandle();
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  console.log(networkLogs);

  // Print the full title.
  console.log('The title of this blog post is "%s".', fullTitle);

  // Close the browser
  await browser.close();
})();
