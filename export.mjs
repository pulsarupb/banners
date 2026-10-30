import { chromium } from 'playwright-core';
import QRCode from 'qrcode';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('./', import.meta.url);
await writeFile(new URL('assets/driftlab-qr.svg', root), await QRCode.toString('https://driftlab.ro', {
  type: 'svg', errorCorrectionLevel: 'M', margin: 4, color: { dark: '#0a0a0c', light: '#ffffff' },
}));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1588, height: 1123 }, deviceScaleFactor: 1.5 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(new URL('banner.html', root).href, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode()));
  });
  const checks = await page.evaluate(() => ({
    fontsLoaded: document.fonts.check('800 80px Science') && document.fonts.check('400 16px Plex'),
    imagesLoaded: [...document.images].every(image => image.complete && image.naturalWidth > 0),
    overflow: [...document.querySelectorAll('h1, h2, .hero-copy, .discipline, .partner, footer')]
      .filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.className || el.tagName),
  }));
  if (errors.length || !checks.fontsLoaded || !checks.imagesLoaded || checks.overflow.length) {
    throw new Error(JSON.stringify({ errors, ...checks }));
  }
  await page.pdf({ path: fileURLToPath(new URL('drift-banner-a3.pdf', root)), preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false });
  await page.locator('.banner').screenshot({ path: fileURLToPath(new URL('drift-banner-preview.png', root)) });
  console.log('Exported A3 PDF and PNG preview.', checks);
} finally {
  await browser.close();
}
