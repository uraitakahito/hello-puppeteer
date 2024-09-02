/* global console */
// https://stackoverflow.com/questions/48165646/how-can-i-get-an-element-by-xpath/78054219#78054219
import puppeteer from 'puppeteer'; // ^22.2.0

const html = `<!DOCTYPE html><html><body>
<div id="readium-right-panel">
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>
<script>
const sel = "#readium-right-panel > ul > li:first-child";
document.querySelector(sel)
  .addEventListener("click", e => {
    e.target.textContent = "clicked";
  });
</script></body></html>`;

let browser;

(async () => {
  browser = await puppeteer.launch({
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables "headful" mode.
    headless: false,
    // The slowMo option slows down Puppeteer operations by a specified amount of milliseconds.
    slowMo: 100,
  });
  const page = await browser.newPage();
  await page.setContent(html);
  const xp = '::-p-xpath(//*[@id="readium-right-panel"]/ul/li[1])';
  const el = await page.waitForSelector(xp);
  await el.click();
  console.log(await el.evaluate(el => el.textContent)); // => clicked
})()
  .catch(err => console.error(err))
  .finally(() => browser?.close());
