"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceDetailPanel } from "./invoice-detail-panel";

interface LineItem {
  id: string;
  description: string;
  amount: number;
}

interface InvoiceRow {
  id: string;
  invoiceNumber: string;
  type: string;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  lineItems: LineItem[];
  project: {
    id: string;
    title: string;
    currency: string;
    client: { name: string };
  } | null;
}

interface InvoicesTableProps {
  invoices: InvoiceRow[];
}

function statusVariant(status: string) {
  switch (status) {
    case "PAID":
      return "default" as const;
    case "OVERDUE":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(
    null
  );
  const [panelOpen, setPanelOpen] = useState(false);

  function handleRowClick(invoice: InvoiceRow) {
    setSelectedInvoice(invoice);
    setPanelOpen(true);
  }

  if (invoices.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No invoices yet. Create your first invoice to get started.
      </p>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Client / Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow
              key={inv.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleRowClick(inv)}
            >
              <TableCell className="font-mono font-medium">
                {inv.invoiceNumber}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {inv.project
                  ? `${inv.project.client.name} — ${inv.project.title}`
                  : "Ad-hoc"}
              </TableCell>
              <TableCell className="text-muted-foreground">{inv.type}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(inv.status)}>{inv.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(inv.issueDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(inv.dueDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {inv.project?.currency === "USD" ? "$" : "₱"}
                {inv.totalAmount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <InvoiceDetailPanel
        invoice={selectedInvoice}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />
    </>
  );
}
