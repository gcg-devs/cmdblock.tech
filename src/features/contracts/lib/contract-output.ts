import type {
  ContractLineItem,
  ContractProposal,
  TeamProfile,
} from "@/generated/prisma/client";

type ContractWithRelations = ContractProposal & {
  lineItems: ContractLineItem[];
} & Partial<Pick<ContractProposal, "shareToken" | "isPublic">>;

export interface ContractOutputShape {
  contract_number: string;
  title: string;
  client_name: string;
  prepared_by: string;
  issue_date: string;
  valid_until: string | null;
  currency: string;
  status: string;
  team: {
    name: string;
    address: string;
    email: string;
  } | null;
  sections: {
    overview: string;
    recommended_scope: string;
    integration_notes: string;
    timeline: string;
    payment_terms: string;
    change_requests: string;
    warranty: string;
    exclusions: string;
    maintenance: string;
    legal_note: string;
  };
  line_items: {
    name: string;
    description: string;
    amount: number;
  }[];
  total_amount: number;
  share_url: string | null;
}

export function buildContractOutput(
  contract: ContractWithRelations,
  teamProfile?: Pick<TeamProfile, "name" | "address" | "email"> | null
): ContractOutputShape {
  return {
    contract_number: contract.contractNumber,
    title: contract.title,
    client_name: contract.clientName,
    prepared_by: contract.preparedBy,
    issue_date: contract.issueDate.toISOString(),
    valid_until: contract.validUntil?.toISOString() ?? null,
    currency: contract.currency,
    status: contract.status,
    team: teamProfile
      ? {
          name: teamProfile.name,
          address: teamProfile.address,
          email: teamProfile.email,
        }
      : null,
    sections: {
      overview: contract.overview,
      recommended_scope: contract.recommendedScope,
      integration_notes: contract.integrationNotes,
      timeline: contract.timeline,
      payment_terms: contract.paymentTerms,
      change_requests: contract.changeRequests,
      warranty: contract.warranty,
      exclusions: contract.exclusions,
      maintenance: contract.maintenance,
      legal_note: contract.legalNote,
    },
    line_items: contract.lineItems
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => ({
        name: item.name,
        description: item.description,
        amount: item.amount,
      })),
    total_amount: contract.totalAmount,
    share_url:
      contract.isPublic && contract.shareToken
        ? `/share/contract/${contract.shareToken}`
        : null,
  };
}
