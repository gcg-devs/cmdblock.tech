import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generatePdf } from "@/lib/pdf";
import { buildInvoiceOutput } from "@/features/invoices/lib/invoice-output";
import { InvoiceHtmlTemplate } from "@/features/invoices/components/invoice-html-template";

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

  // Dynamic import to bypass Next.js static analysis restriction on react-dom/server
  const { renderToStaticMarkup } = await import("react-dom/server");
  const templateHtml = renderToStaticMarkup(
    createElement(InvoiceHtmlTemplate, { data: invoiceData })
  );

  try {
    const pdfBuffer = await generatePdf(templateHtml);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="SOA-${invoiceData.soa_number}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "PDF generation failed. Ensure the Chromium service is running." },
      { status: 503 }
    );
  }
}
