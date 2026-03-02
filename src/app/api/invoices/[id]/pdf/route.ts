import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { buildInvoiceOutput } from "@/features/invoices/lib/invoice-output";
import { InvoicePdfDocument } from "@/features/invoices/components/invoice-pdf-document";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET environment variable is required");
  return new TextEncoder().encode(secret);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = request.nextUrl;
  const protocolId = searchParams.get("protocolId");
  const shareToken = searchParams.get("shareToken");

  // Auth: validate shareToken for public access, or session cookie for dashboard
  if (shareToken) {
    const check = await prisma.invoice.findUnique({
      where: { shareToken },
      select: { id: true, isPublic: true },
    });
    if (!check || !check.isPublic || check.id !== id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  } else {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      await jwtVerify(token, getSecret());
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const [invoice, teamProfile] = await Promise.all([
    prisma.invoice.findUnique({
      where: { id },
      include: {
        lineItems: true,
        project: {
          include: {
            client: { select: { name: true, billingAddress: true } },
          },
        },
      },
    }),
    prisma.teamProfile.findFirst(),
  ]);

  if (!invoice) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Resolve payment protocol
  let protocol;
  if (protocolId) {
    protocol = await prisma.paymentProtocol.findUnique({
      where: { id: protocolId },
    });
  } else {
    protocol = await prisma.paymentProtocol.findFirst({
      where: { isDefault: true },
      orderBy: { createdAt: "asc" },
    });
    protocol ??= await prisma.paymentProtocol.findFirst({
      orderBy: { createdAt: "asc" },
    });
  }

  const invoiceData = buildInvoiceOutput(invoice, protocol, teamProfile);

  // Generate QR code data URL for PDF if protocol has QR data
  let qrImageDataUrl: string | null = null;
  if (invoiceData.payment_protocol?.qr_data) {
    try {
      const QRCode = (await import("qrcode")).default;
      qrImageDataUrl = await QRCode.toDataURL(invoiceData.payment_protocol.qr_data, {
        errorCorrectionLevel: "H",
        width: 400,
        margin: 2,
        color: { dark: "#0a0a0a", light: "#ffffff" },
      });
    } catch (e) {
      console.error("QR generation failed:", e);
    }
  }

  try {
    const { renderToBuffer } = await import("@react-pdf/renderer");
    const pdfBuffer = await renderToBuffer(
      createElement(InvoicePdfDocument, { data: invoiceData, qrImageDataUrl }) as any
    );

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="SOA-${invoiceData.soa_number}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
}
