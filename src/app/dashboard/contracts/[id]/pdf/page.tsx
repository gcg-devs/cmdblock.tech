import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buildContractOutput } from "@/features/contracts/lib/contract-output";
import { ContractPdfPreview } from "@/features/contracts/components/contract-pdf-preview";

export default async function ContractPdfPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [contract, teamProfile] = await Promise.all([
    prisma.contractProposal.findUnique({
      where: { id },
      include: { lineItems: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.teamProfile.findFirst(),
  ]);

  if (!contract) notFound();

  const contractData = buildContractOutput(contract, teamProfile);

  return (
    <div className="max-w-7xl animate-reveal reveal-delay-1">
      <ContractPdfPreview contractData={contractData} contractId={id} />
    </div>
  );
}
