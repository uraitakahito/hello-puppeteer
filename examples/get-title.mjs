/**
 * リモートブラウザに接続してページタイトルを取得するサンプル
 *
 * Usage:
 *   node examples/get-title.mjs [options]
 *
 * Options:
 *   --host <hostname>    Remote browser hostname (default: puppeteer)
 *   --port <port>        Remote debugging port (default: 9222)
 *   --help, -h           Show this help message
 */
import puppeteer from 'puppeteer';
import dns from 'dns/promises';

const showHelp = () => {
  console.log(`Usage: node examples/get-title.mjs [options]

Options:
  --host <hostname>    Remote browser hostname (default: puppeteer)
  --port <port>        Remote debugging port (default: 9222)
  --help, -h           Show this help message
`);
};

const parseArgs = (argv) => {
  const args = argv.slice(2);

  const getArgValue = (name) => {
    const index = args.indexOf(name);
    return index !== -1 ? args[index + 1] : undefined;
  };

  return {
    host: getArgValue('--host') ?? 'puppeteer',
    port: parseInt(getArgValue('--port') ?? '9222', 10),
    help: args.includes('--help') || args.includes('-h'),
  };
};

const getBrowserWSEndpoint = async (host, port) => {
  // ホスト名をIPアドレスに解決（Chrome DevTools ProtocolはHostヘッダーにIPかlocalhostのみ許可）
  const { address } = await dns.lookup(host);
  const response = await fetch(`http://${address}:${port}/json/version`);
  const data = await response.json();
  // WebSocket URLのホスト名を実際の接続先に置換
  return data.webSocketDebuggerUrl.replace(/^ws:\/\/[^/]*/, `ws://${address}:${port}`);
};

const getTitle = async () => {
  const options = parseArgs(process.argv);

  if (options.help) {
    showHelp();
    return;
  }

  console.log(`Connecting to browser at ${options.host}:${options.port}...`);

  const browserWSEndpoint = await getBrowserWSEndpoint(options.host, options.port);
  const browser = await puppeteer.connect({ browserWSEndpoint });

  const page = await browser.newPage();
  await page.goto('https://www.google.com');

  const title = await page.title();
  console.log('Page title:', title);

  await browser.disconnect();
};

getTitle().catch(console.error);
