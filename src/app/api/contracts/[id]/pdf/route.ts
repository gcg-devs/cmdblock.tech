import { createElement } from "react";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { buildContractOutput } from "@/features/contracts/lib/contract-output";
import { ContractPdfDocument } from "@/features/contracts/components/contract-pdf-document";

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
  const shareToken = request.nextUrl.searchParams.get("shareToken");

  if (shareToken) {
    const check = await prisma.contractProposal.findUnique({
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

  const [contract, teamProfile] = await Promise.all([
    prisma.contractProposal.findUnique({
      where: { id },
      include: { lineItems: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.teamProfile.findFirst(),
  ]);

  if (!contract) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const contractData = buildContractOutput(contract, teamProfile);

  try {
    const { renderToBuffer } = await import("@react-pdf/renderer");
    const pdfElement = createElement(ContractPdfDocument, {
      data: contractData,
    }) as Parameters<typeof renderToBuffer>[0];
    const pdfBuffer = await renderToBuffer(
      pdfElement
    );

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Proposal-${contractData.contract_number}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Contract PDF generation error:", error);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
}
