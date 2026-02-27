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
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
  issueDate: Date;
  dueDate: Date;
  totalAmount: number;
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
          <TableRow key={inv.id} className="group">
            <TableCell className="p-0">
              <Link
                href={`/dashboard/invoices/${inv.id}`}
                className="flex items-center px-4 py-2 font-mono font-medium group-hover:bg-muted/50 transition-colors"
              >
                {inv.invoiceNumber}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/invoices/${inv.id}`}
                className="flex items-center px-4 py-2 text-muted-foreground group-hover:bg-muted/50 transition-colors"
              >
                {inv.project
                  ? `${inv.project.client.name} — ${inv.project.title}`
                  : "Ad-hoc"}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/invoices/${inv.id}`}
                className="flex items-center px-4 py-2 text-muted-foreground group-hover:bg-muted/50 transition-colors"
              >
                {inv.type}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/invoices/${inv.id}`}
                className="flex items-center px-4 py-2 group-hover:bg-muted/50 transition-colors"
              >
                <Badge variant={statusVariant(inv.status)}>{inv.status}</Badge>
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/invoices/${inv.id}`}
                className="flex items-center px-4 py-2 text-muted-foreground group-hover:bg-muted/50 transition-colors"
              >
                {inv.issueDate.toLocaleDateString()}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/invoices/${inv.id}`}
                className="flex items-center px-4 py-2 text-muted-foreground group-hover:bg-muted/50 transition-colors"
              >
                {inv.dueDate.toLocaleDateString()}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/invoices/${inv.id}`}
                className="flex items-center justify-end px-4 py-2 font-mono text-sm group-hover:bg-muted/50 transition-colors"
              >
                {inv.project?.currency === "USD" ? "$" : "₱"}
                {inv.totalAmount.toLocaleString()}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
