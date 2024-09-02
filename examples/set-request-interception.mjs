/* global console */
// https://github.com/puppeteer/puppeteer/blob/v1.11.0/docs/api.md#pagesetrequestinterceptionvalue
import puppeteer from 'puppeteer';

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables "headful" mode.
    headless: 'new',
    // The slowMo option slows down Puppeteer operations by a specified amount of milliseconds.
    slowMo: 100,
  });

  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')) {
      console.log(interceptedRequest.url());
      interceptedRequest.abort();
    } else {
      interceptedRequest.continue();
    }
  });
  await page.goto('https://www.nikkei.com/');

  await browser.close();
})();
