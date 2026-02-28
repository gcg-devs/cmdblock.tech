import puppeteer from "puppeteer-core";

const CHROMIUM_URL =
  process.env.CHROMIUM_URL || "ws://chromium:3000/chromium";

export async function generatePdf(bodyHtml: string): Promise<Buffer> {
  const browser = await puppeteer.connect({
    browserWSEndpoint: CHROMIUM_URL,
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1080, height: 1527 });
    await page.emulateMediaType("screen");

    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=1080">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 1080px; background: #ffffff; }
  </style>
</head>
<body>
  <div style="border-top: 8px solid #0a0a0a">${bodyHtml}</div>
</body>
</html>`;

    await page.setContent(fullHtml, {
      waitUntil: "networkidle0",
      timeout: 15_000,
    });

    const pdfBuffer = await page.pdf({
      printBackground: true,
      width: "1080px",
      height: "1527px",
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    await page.close();
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.disconnect();
  }
}
