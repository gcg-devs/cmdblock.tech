import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buildInvoiceOutput } from "@/features/invoices/lib/invoice-output";
import { SharedInvoiceView } from "@/features/invoices/components/shared-invoice-view";

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

  return <SharedInvoiceView invoiceData={invoiceData} />;
}
