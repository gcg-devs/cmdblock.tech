import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteEntityDialog } from "@/components/delete-entity-dialog";
import { prisma } from "@/lib/prisma";
import { ContractForm } from "@/features/contracts/components/contract-form";
import { ContractShareButton } from "@/features/contracts/components/contract-share-button";
import { deleteContract } from "@/features/contracts/actions";

function formatAmount(amount: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : "PHP ";
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default async function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contract = await prisma.contractProposal.findUnique({
    where: { id },
    include: { lineItems: { orderBy: { sortOrder: "asc" } } },
  });

  if (!contract) notFound();

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Contract
          </p>
          <h2 className="font-sans text-2xl font-700 tracking-tight">
            <span className="text-muted-foreground font-mono text-lg font-normal">
              &gt;_{" "}
            </span>
            {contract.contractNumber}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {contract.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/contracts">Back</Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/contracts/${contract.id}/pdf`}>
              Preview PDF
            </Link>
          </Button>
          <ContractShareButton
            contractId={contract.id}
            shareToken={contract.shareToken}
            isPublic={contract.isPublic}
          />
          <DeleteEntityDialog
            entityName="contract"
            description="This will permanently delete this contract proposal. This action cannot be undone."
            onDelete={deleteContract.bind(null, contract.id)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="border border-border p-4">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Client
          </p>
          <p className="text-sm">{contract.clientName}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Status
          </p>
          <Badge variant="outline">{contract.status}</Badge>
        </div>
        <div className="border border-border p-4">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Issued
          </p>
          <p className="text-sm">{contract.issueDate.toLocaleDateString()}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Total
          </p>
          <p className="text-sm font-mono">
            {formatAmount(contract.totalAmount, contract.currency)}
          </p>
        </div>
      </div>

      <ContractForm
        contract={{
          id: contract.id,
          title: contract.title,
          clientName: contract.clientName,
          preparedBy: contract.preparedBy,
          issueDate: contract.issueDate,
          validUntil: contract.validUntil,
          currency: contract.currency,
          overview: contract.overview,
          recommendedScope: contract.recommendedScope,
          integrationNotes: contract.integrationNotes,
          timeline: contract.timeline,
          paymentTerms: contract.paymentTerms,
          changeRequests: contract.changeRequests,
          warranty: contract.warranty,
          exclusions: contract.exclusions,
          maintenance: contract.maintenance,
          legalNote: contract.legalNote,
          lineItems: contract.lineItems.map((item) => ({
            name: item.name,
            description: item.description,
            amount: item.amount,
          })),
        }}
      />
    </div>
  );
}
