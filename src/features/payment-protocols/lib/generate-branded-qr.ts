import QRCode from "qrcode";

const LOGO_TEXT = ">_";
const LOGO_RATIO = 0.22;

export async function generateBrandedQr(
  data: string,
  size: number = 200
): Promise<string> {
  const qrDataUrl = await QRCode.toDataURL(data, {
    errorCorrectionLevel: "H",
    width: size * 2,
    margin: 2,
    color: { dark: "#0a0a0a", light: "#ffffff" },
  });

  if (typeof document === "undefined") {
    return qrDataUrl;
  }

  // Client-side: overlay logo using canvas
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const qrImg = await loadImage(qrDataUrl);
  ctx.drawImage(qrImg, 0, 0, size, size);

  // White background square with grey >_ text
  const logoSize = Math.floor(size * LOGO_RATIO);
  const logoX = (size - logoSize) / 2;
  const logoY = (size - logoSize) / 2;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);

  const fontSize = Math.floor(logoSize * 0.45);
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.fillStyle = "#999999";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(LOGO_TEXT, size / 2, size / 2);

  return canvas.toDataURL("image/png");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
