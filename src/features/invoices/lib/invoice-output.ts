import type { Invoice, LineItem, Project, Client, PaymentProtocol, TeamProfile } from "@/generated/prisma/client";

type InvoiceWithRelations = Invoice & {
  lineItems: LineItem[];
  project:
    | (Project & {
        client: Pick<Client, "name" | "billingAddress">;
      })
    | null;
} & Partial<Pick<Invoice, "shareToken" | "isPublic">>;

export interface InvoiceOutputShape {
  soa_number: string;
  invoice_type: string;
  client_name: string | null;
  client_billing_address: string | null;
  project_title: string | null;
  team: {
    name: string;
    address: string;
    email: string;
  } | null;
  project_scope: {
    enabled: boolean;
    description: string | null;
    total_contract_value: number | null;
  };
  line_items: {
    name: string;
    description: string;
    amount: number;
  }[];
  total_amount: number;
  currency: string;
  issue_date: string;
  due_date: string;
  status: string;
  payment_protocol: {
    label: string;
    bank_name: string;
    account_name: string;
    account_number: string;
  } | null;
  share_url: string | null;
}

export function buildInvoiceOutput(
  invoice: InvoiceWithRelations,
  paymentProtocol?: Pick<PaymentProtocol, "label" | "bankName" | "accountName" | "accountNumber"> | null,
  teamProfile?: Pick<TeamProfile, "name" | "address" | "email"> | null
): InvoiceOutputShape {
  const project = invoice.project;
  const scopeEnabled = !!project && project.showScopeOnInvoice;

  return {
    soa_number: invoice.invoiceNumber,
    invoice_type: invoice.type,
    client_name: project?.client.name ?? null,
    client_billing_address: project?.client.billingAddress || null,
    project_title: project?.title ?? null,
    team: teamProfile
      ? {
          name: teamProfile.name,
          address: teamProfile.address,
          email: teamProfile.email,
        }
      : null,
    project_scope: {
      enabled: scopeEnabled,
      description: scopeEnabled ? project!.scopeDescription || null : null,
      total_contract_value: scopeEnabled ? project!.totalContractValue : null,
    },
    line_items: invoice.lineItems.map((li) => ({
      name: li.name,
      description: li.description,
      amount: li.amount,
    })),
    total_amount: invoice.totalAmount,
    currency: project?.currency ?? "PHP",
    issue_date: invoice.issueDate.toISOString(),
    due_date: invoice.dueDate.toISOString(),
    status: invoice.status,
    payment_protocol: paymentProtocol
      ? {
          label: paymentProtocol.label,
          bank_name: paymentProtocol.bankName,
          account_name: paymentProtocol.accountName,
          account_number: paymentProtocol.accountNumber,
        }
      : null,
    share_url:
      invoice.isPublic && invoice.shareToken
        ? `/share/invoice/${invoice.shareToken}`
        : null,
  };
}
