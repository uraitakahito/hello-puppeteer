/* global console, performance */
// - https://github.com/puppeteer/puppeteer/issues/3120#issuecomment-415553869
// - https://qiita.com/markey/items/ebf2b48626b6ac61ee89
//
// MEMO:
//   There was no noticeable effect on Docker for Mac.
import puppeteer from 'puppeteer';

const limit = 5;

var timer = function(name) {
  var start = performance.now();
  return {
    stop: function() {
      var end  = performance.now();
      var time = end - start;
      console.log('Timer:', name, 'finished in', time, 'ms');
    }
  }
};

var t2 = timer('improved options');

for (let i = 0; i < limit; i++) {
  (async () => {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        // Disables GPU hardware acceleration. If software renderer
        // is not in place, then the GPU process won't launch.
        '--disable-gpu',
        // 	The /dev/shm partition is too small in certain VM environments,
        // causing Chrome to fail or crash (see http://crbug.com/715363).
        // Use this flag to work-around this issue (a temporary directory will
        // always be used to create anonymous shared memory files).
        // TODO:
        // - https://qiita.com/taiyodayo/items/c477c2d77a5261b5f24a
        // - https://stackoverflow.com/questions/53902507/unknown-error-session-deleted-because-of-page-crash-from-unknown-error-cannot
        '--disable-dev-shm-usage',
        // Disable the setuid sandbox (Linux only).
        '--disable-setuid-sandbox',
        // Skip First Run tasks as well as not showing additional dialogs, prompts or bubbles.
        // Suppressing dialogs, prompts, and bubbles is important as this switch is used by automation
        // (including performance benchmarks) where it's important only a browser window is shown.
        // This may not actually be the first run or the What's New page. Overridden by
        // kForceFirstRun (for FRE) and kForceWhatsNew (for What's New).
        // This does not drop the First Run sentinel and thus doesn't prevent first run from occurring
        // the next time chrome is launched without this flag. It also does not update the last What's
        // New milestone, so does not prevent What's New from occurring the next time chrome is launched without this flag.
        '--no-first-run',
        // Disables the sandbox for all process types that are normally sandboxed.
        // Meant to be used as a browser-level switch for testing purposes only.
        '--no-sandbox',
        // Disables the use of a zygote process for forking child processes.
        // Instead, child processes will be forked and exec'd directly.
        // Note that --no-sandbox should also be used together with this flag because the sandbox needs the zygote to work. ↪
        '--no-zygote',
        // Runs the renderer and plugins in the same process as the browser
        '--single-process'
      ]
    });
    await browser.close();
  })();
}

t2.stop();
