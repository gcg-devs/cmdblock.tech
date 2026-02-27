import type { Invoice, LineItem, Project, Client } from "@/generated/prisma/client";

type InvoiceWithRelations = Invoice & {
  lineItems: LineItem[];
  project:
    | (Project & {
        client: Pick<Client, "name">;
      })
    | null;
};

export interface InvoiceOutputShape {
  soa_number: string;
  client_name: string | null;
  project_scope: {
    enabled: boolean;
    title: string | null;
    description: string | null;
    total_contract_value: number | null;
  };
  line_items: {
    name: string;
    description: string;
    amount: number;
  }[];
  total_amount: number;
  issue_date: string;
  due_date: string;
  status: string;
}

export function buildInvoiceOutput(invoice: InvoiceWithRelations): InvoiceOutputShape {
  const project = invoice.project;
  const scopeEnabled = !!project && project.showScopeOnInvoice;

  return {
    soa_number: invoice.invoiceNumber,
    client_name: project?.client.name ?? null,
    project_scope: {
      enabled: scopeEnabled,
      title: scopeEnabled ? project!.title : null,
      description: scopeEnabled ? project!.scopeDescription || null : null,
      total_contract_value: scopeEnabled ? project!.totalContractValue : null,
    },
    line_items: invoice.lineItems.map((li) => ({
      name: li.name,
      description: li.description,
      amount: li.amount,
    })),
    total_amount: invoice.totalAmount,
    issue_date: invoice.issueDate.toISOString(),
    due_date: invoice.dueDate.toISOString(),
    status: invoice.status,
  };
}
