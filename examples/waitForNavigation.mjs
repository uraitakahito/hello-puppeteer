import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--disable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    const page = await browser.newPage();

    await page.goto('https://stackoverflow.com/');

    await Promise.all([
      // https://qiita.com/hnw/items/a07e6b88d95d1656e02f
      page.waitForNavigation({ waitUntil: ['load', 'networkidle2'] }),
      page.click('.s-topbar--logo'),
    ]);

    console.log('Navigated to the login section successfully.');

    // Extracting information from the new page
    const pageTitle = await page.title();
    const pageURL = page.url();
    console.log(`Title: ${pageTitle}`);
    console.log(`URL: ${pageURL}`);

    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
