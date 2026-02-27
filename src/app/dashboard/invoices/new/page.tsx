import { prisma } from "@/lib/prisma";
import { InvoiceForm } from "@/features/invoices/components/invoice-form";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ projectId?: string }>;
}) {
  const { projectId } = await searchParams;

  const projects = await prisma.project.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      client: { select: { name: true } },
    },
  });

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="mb-8">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Create
        </p>
        <h2 className="font-sans text-2xl font-700 tracking-tight">
          <span className="text-muted-foreground font-mono text-lg font-normal">
            &gt;_{" "}
          </span>
          new invoice
        </h2>
      </div>

      <InvoiceForm projects={projects} defaultProjectId={projectId} />
    </div>
  );
}
