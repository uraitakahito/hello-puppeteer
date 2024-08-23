/* global console */
// https://qiita.com/go_sagawa/items/85f97deab7ccfdce53ea
import puppeteer from 'puppeteer';

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables "headful" mode.
    headless: false,
    // The slowMo option slows down Puppeteer operations by a specified amount of milliseconds.
    // slowMo: 100,
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a webpage
  await page.goto('https://www.oreilly.co.jp/ebook/');

  // Set screen size.
  await page.setViewport({width: 1024, height: 768});

  // Select all book links
  // puppeteer: ^22.2.0
  // https://stackoverflow.com/questions/48165646/how-can-i-get-an-element-by-xpath/78054219#78054219
  const titleXPath = "::-p-xpath(//table[contains(@class, 'ebookCatalog')]//a[@class='ebookTitle'])";
  const titleList = await page.$$(titleXPath);

  // Loop through each book
  for (const title of titleList) {
    console.log(await title.evaluate(el => el.textContent));
  }

  // Close the browser
  await browser.close();
})();
