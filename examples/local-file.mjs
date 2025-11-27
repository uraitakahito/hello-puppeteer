import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const __dirname = import.meta.dirname;

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  console.log(__dirname);
  const htmlPath = path.join(__dirname, 'local-file.html');
  const content = fs.readFileSync(htmlPath, 'utf8');
  await page.setContent(content);
  await page.pdf({
    path: 'test.pdf',
    format: 'A4',
    margin: {
      top: '20px',
      left: '20px',
      right: '20px',
      bottom: '20px',
    },
  });
  await browser.close();
})();
