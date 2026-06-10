import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ContractsTable } from "@/features/contracts/components/contracts-table";

export default async function ContractsPage() {
  const contracts = await prisma.contractProposal.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      contractNumber: true,
      title: true,
      clientName: true,
      status: true,
      issueDate: true,
      totalAmount: true,
      currency: true,
    },
  });

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Contracts
          </p>
          <h2 className="font-sans text-2xl font-700 tracking-tight">
            <span className="text-muted-foreground font-mono text-lg font-normal">
              &gt;_{" "}
            </span>
            proposals
          </h2>
        </div>
        <Button asChild>
          <Link href="/dashboard/contracts/new">New Contract</Link>
        </Button>
      </div>

      <ContractsTable contracts={contracts} />
    </div>
  );
}
