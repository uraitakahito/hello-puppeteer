import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables "headful" mode.
    headless: false,
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
  const page = await browser.newPage();

  // Navigate to Wikipedia's login page
  await page.goto('https://en.wikipedia.org/wiki/Special:UserLogin');

  // Fill in the login form
  await page.type('#wpName1', ''); // Replace 'your_username' with your actual username
  await page.type('#wpPassword1', ''); // Replace 'your_password' with your actual password
  await page.click('#wpLoginAttempt');

  // Close the browser
  await browser.close();
})();
