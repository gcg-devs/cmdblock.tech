import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvoiceRow {
  id: string;
  invoiceNumber: string;
  type: string;
  status: string;
  issueDate: Date;
  dueDate: Date;
  totalAmount: number;
  project: {
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
  if (invoices.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No invoices yet. Create your first invoice to get started.
      </p>
    );
  }

  return (
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
          <TableRow key={inv.id}>
            <TableCell>
              <Link
                href={`/dashboard/invoices/${inv.id}`}
                className="hover:underline font-mono font-medium"
              >
                {inv.invoiceNumber}
              </Link>
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
              {inv.issueDate.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {inv.dueDate.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right font-mono text-sm">
              {inv.project?.currency === "USD" ? "$" : "₱"}
              {inv.totalAmount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
