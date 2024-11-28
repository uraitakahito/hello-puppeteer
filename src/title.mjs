import puppeteer from 'puppeteer';

const getTitle = async (url, headless = 'new') => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    headless,
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a webpage
  await page.goto(url);

  const title = await page.title();

  // Close the browser
  await browser.close();

  return title;
};

export default getTitle;

// getTitle('https://www.google.com').then((title) => {
//   console.log(title);
// });
