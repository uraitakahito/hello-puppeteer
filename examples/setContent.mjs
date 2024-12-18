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
    /**
     * Whether to run the browser in headless mode.
     *
     * @remarks
     *
     * - `true` launches the browser in the
     *   {@link https://developer.chrome.com/articles/new-headless/ | new headless}
     *   mode.
     *
     * - `'shell'` launches
     *   {@link https://developer.chrome.com/blog/chrome-headless-shell | shell}
     *   known as the old headless mode.
     *
     * @defaultValue `true`
     *
     * https://github.com/puppeteer/puppeteer/blob/5dbc9374d6622d4fbd72f2c3a2e6445f18465133/packages/puppeteer-core/src/node/LaunchOptions.ts#L99-L114
     */
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
      "--disable-gpu"
    ],
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
