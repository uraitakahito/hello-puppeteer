/* global console */
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

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a webpage
  await page.goto('https://developer.chrome.com/');

  // Set screen size.
  await page.setViewport({width: 1024, height: 768});

  // Type into search box.
  await page.locator('.devsite-search-field').fill('automate beyond recorder');

  // Wait and click on first result.
  await page.locator('.devsite-result-item-link').click();

  // Locate the full title with a unique string.
  const textSelector = await page
    .locator('text/Customize and automate')
    .waitHandle();
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title.
  console.log('The title of this blog post is "%s".', fullTitle);

  // Close the browser
  await browser.close();
})();
