import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const __dirname = import.meta.dirname;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  const htmlPath = path.join(__dirname, 'target-0.html');
  const content = fs.readFileSync(htmlPath, 'utf8');
  await page.setContent(content);

  browser.on('targetcreated', async (target) => {
    const newPage = await target.page();
    // Extracting information from the new page
    const pageTitle = await newPage.title();
    const pageURL = newPage.url();
    console.log(`Title: ${pageTitle}`);
    console.log(`URL: ${pageURL}`);
    await browser.close();
  });

  await Promise.all([
    page.click('.here'),
  ]);
})();
