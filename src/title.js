import puppeteer from 'puppeteer'

export const getTitle = async function(url, headless ='new') {
  // Launch a new browser instance
  const browser = await puppeteer.launch({
    headless: headless,
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a webpage
  await page.goto(url);

  const title = await page.title();

  // Close the browser
  await browser.close();

  return title;
}

// getTitle('https://www.google.com').then((title) => {
//   console.log(title);
// });
