/**
 * Googleに接続してページタイトルを取得するサンプル
 *
 * Usage:
 *   node examples/get-title.mjs [options]
 *
 * Options:
 *   --no-headless, -H    Show browser window (default: headless)
 *   --slow-mo <ms>       Slow down Puppeteer operations by specified milliseconds
 *   --help, -h           Show this help message
 */
import puppeteer from 'puppeteer';

const showHelp = () => {
  console.log(`Usage: node examples/get-title.mjs [options]

Options:
  --no-headless, -H    Show browser window (default: headless)
  --slow-mo <ms>       Slow down Puppeteer operations by specified milliseconds
  --help, -h           Show this help message
`);
};

const parseArgs = (argv) => {
  const args = argv.slice(2);

  let slowMo = 0;
  const slowMoIndex = args.indexOf('--slow-mo');
  const slowMoValue = args[slowMoIndex + 1];
  if (slowMoIndex !== -1 && slowMoValue !== undefined) {
    slowMo = parseInt(slowMoValue, 10);
  }

  return {
    headless: !args.includes('--no-headless') && !args.includes('-H'),
    slowMo,
    help: args.includes('--help') || args.includes('-h'),
  };
};

const getTitle = async () => {
  const options = parseArgs(process.argv);

  if (options.help) {
    showHelp();
    return;
  }

  if (!options.headless) {
    console.log('(Browser window mode)');
  }
  if (options.slowMo > 0) {
    console.log(`(Slow motion: ${options.slowMo}ms)`);
  }

  const browser = await puppeteer.launch({
    headless: options.headless,
    slowMo: options.slowMo,
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();
  await page.goto('https://www.google.com');

  const title = await page.title();
  console.log('Page title:', title);

  await browser.close();
};

getTitle().catch(console.error);
