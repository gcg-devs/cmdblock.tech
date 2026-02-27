import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { InvoicesTable } from "@/features/invoices/components/invoices-table";

export default async function InvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      project: {
        select: {
          title: true,
          currency: true,
          client: { select: { name: true } },
        },
      },
    },
  });

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Manage
          </p>
          <h2 className="font-sans text-2xl font-700 tracking-tight">
            <span className="text-muted-foreground font-mono text-lg font-normal">
              &gt;_{" "}
            </span>
            invoices
          </h2>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/new">New Invoice</Link>
        </Button>
      </div>

      <InvoicesTable invoices={invoices} />
    </div>
  );
}
