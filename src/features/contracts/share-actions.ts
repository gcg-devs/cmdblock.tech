"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleContractShare(contractId: string) {
  const contract = await prisma.contractProposal.findUnique({
    where: { id: contractId },
    select: { shareToken: true, isPublic: true },
  });

  if (!contract) throw new Error("Contract not found");

  if (!contract.shareToken) {
    await prisma.contractProposal.update({
      where: { id: contractId },
      data: { shareToken: randomUUID(), isPublic: true },
    });
  } else {
    await prisma.contractProposal.update({
      where: { id: contractId },
      data: { isPublic: !contract.isPublic },
    });
  }

  revalidatePath(`/dashboard/contracts/${contractId}`);
}
