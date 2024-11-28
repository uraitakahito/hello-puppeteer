// https://stackoverflow.com/questions/54814323/puppeteer-how-to-download-entire-web-page-for-offline-use

import puppeteer from 'puppeteer';
import fs from 'fs';

(async function main() {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto('https://www.nikkei.com/');

    const cdp = await page.createCDPSession();
    const { data } = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });
    fs.writeFileSync('page.mhtml', data);

    await browser.close();
  } catch (err) {
    console.error(err);
  }
}());
