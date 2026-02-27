import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buildInvoiceOutput } from "@/features/invoices/lib/invoice-output";
import { InvoicePdfPreview } from "@/features/invoices/components/invoice-pdf-preview";

export default async function InvoicePdfPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [invoice, protocols, teamProfile] = await Promise.all([
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
    prisma.paymentProtocol.findMany({
      orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
    }),
    prisma.teamProfile.findFirst(),
  ]);

  if (!invoice) notFound();

  const defaultProtocol =
    protocols.find((p) => p.isDefault) ?? protocols[0] ?? null;
  const invoiceData = buildInvoiceOutput(invoice, defaultProtocol, teamProfile);

  return (
    <div className="max-w-[1040px] animate-reveal reveal-delay-1">
      <InvoicePdfPreview
        invoiceData={invoiceData}
        invoiceId={id}
        protocols={protocols}
      />
    </div>
  );
}
