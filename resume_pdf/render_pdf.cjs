const { chromium } = require('/Users/mou7s/ruoyi-tongke/frontend/node_modules/playwright');
const path = require('path');

async function renderPDF() {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  const htmlPath = path.resolve(__dirname, 'resume.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

  const pdfPath = path.resolve(__dirname, '刘楚歌_全栈开发工程师_个人简历.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '8mm',
      bottom: '8mm',
      left: '10mm',
      right: '10mm',
    },
  });

  console.log('PDF rendered successfully to:', pdfPath);
  await browser.close();
}

renderPDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
