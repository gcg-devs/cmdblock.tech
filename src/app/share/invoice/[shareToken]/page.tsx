import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buildInvoiceOutput } from "@/features/invoices/lib/invoice-output";
import { SharedInvoiceView } from "@/features/invoices/components/shared-invoice-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shareToken: string }>;
}): Promise<Metadata> {
  const { shareToken } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { shareToken },
    select: {
      invoiceNumber: true,
      status: true,
      project: { select: { client: { select: { name: true } } } },
    },
  });

  if (!invoice) {
    return {
      title: "Shared Invoice — cmdblock.tech",
      description: "Secure shared invoice link from cmdblock.tech.",
      robots: { index: false, follow: false },
    };
  }

  const clientName = invoice.project?.client?.name ?? "Client";
  const invoiceRef = invoice.invoiceNumber || "invoice";

  return {
    title: `Invoice ${invoiceRef} for ${clientName} — cmdblock.tech`,
    description: `Shared invoice preview for ${clientName}. Status: ${invoice.status}.`,
    openGraph: {
      title: `Invoice ${invoiceRef} for ${clientName}`,
      description: `Shared invoice preview for ${clientName}. Status: ${invoice.status}.`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Invoice ${invoiceRef} for ${clientName}`,
      description: `Shared invoice preview for ${clientName}. Status: ${invoice.status}.`,
    },
    robots: { index: false, follow: false },
  };
}

export default async function SharedInvoicePage({
  params,
}: {
  params: Promise<{ shareToken: string }>;
}) {
  const { shareToken } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { shareToken },
    include: {
      lineItems: true,
      project: {
        include: {
          client: { select: { name: true, billingAddress: true } },
        },
      },
    },
  });

  if (!invoice || !invoice.isPublic) notFound();

  const [defaultProtocol, teamProfile] = await Promise.all([
    prisma.paymentProtocol.findFirst({
      where: { isDefault: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.teamProfile.findFirst(),
  ]);

  const protocol = defaultProtocol ?? await prisma.paymentProtocol.findFirst({
    orderBy: { createdAt: "asc" },
  });

  const invoiceData = buildInvoiceOutput(invoice, protocol, teamProfile);

  return <SharedInvoiceView invoiceData={invoiceData} invoiceId={invoice.id} shareToken={shareToken} />;
}
