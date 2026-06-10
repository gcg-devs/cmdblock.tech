import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { buildContractOutput } from "@/features/contracts/lib/contract-output";
import { ContractHtmlTemplate } from "@/features/contracts/components/contract-html-template";

export default async function SharedContractPage({
  params,
}: {
  params: Promise<{ shareToken: string }>;
}) {
  const { shareToken } = await params;
  const [contract, teamProfile] = await Promise.all([
    prisma.contractProposal.findUnique({
      where: { shareToken },
      include: { lineItems: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.teamProfile.findFirst(),
  ]);

  if (!contract || !contract.isPublic) notFound();

  const contractData = buildContractOutput(contract, teamProfile);

  return (
    <main className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        <div className="flex justify-center">
          <div
            className="bg-white shadow-xl border border-border"
            style={{ width: "960px" }}
          >
            <div style={{ borderTop: "8px solid #0a0a0a" }}>
              <ContractHtmlTemplate data={contractData} />
            </div>
          </div>
        </div>

        <aside className="border border-border bg-background p-5 h-fit">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
            Proposal
          </p>
          <h1 className="font-sans text-lg font-700 tracking-tight mb-4">
            {contract.contractNumber}
          </h1>
          <div className="space-y-3 text-sm mb-5">
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <span className="text-muted-foreground">Client</span>
              <span className="text-right break-words">{contract.clientName}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <span className="text-muted-foreground">Status</span>
              <span className="text-right break-words">{contract.status}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <span className="text-muted-foreground">Issued</span>
              <span className="text-right break-words">
                {contract.issueDate.toLocaleDateString()}
              </span>
            </div>
          </div>
          <Button asChild className="w-full">
            <a
              href={`/api/contracts/${contract.id}/pdf?shareToken=${shareToken}`}
            >
              Download PDF
            </a>
          </Button>
        </aside>
      </div>
    </main>
  );
}
