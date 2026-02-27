import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceStatusControl } from "@/features/invoices/components/invoice-status-control";
import { InvoiceForm } from "@/features/invoices/components/invoice-form";
import { deleteInvoice } from "@/features/invoices/actions";
import { DeleteEntityDialog } from "@/components/delete-entity-dialog";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [invoice, projects] = await Promise.all([
    prisma.invoice.findUnique({
      where: { id },
      include: {
        lineItems: true,
        project: {
          select: {
            id: true,
            title: true,
            currency: true,
            client: { select: { name: true } },
          },
        },
      },
    }),
    prisma.project.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, client: { select: { name: true } } },
    }),
  ]);

  if (!invoice) notFound();

  const currencySymbol = invoice.project?.currency === "USD" ? "$" : "₱";

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Invoice
          </p>
          <h2 className="font-sans text-2xl font-700 tracking-tight font-mono">
            {invoice.invoiceNumber}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/invoices">Back</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/invoices/${invoice.id}/pdf`}>
              Download PDF
            </Link>
          </Button>
          <InvoiceStatusControl
            invoiceId={invoice.id}
            currentStatus={invoice.status}
          />
          <DeleteEntityDialog
            entityName="Invoice"
            onDelete={deleteInvoice.bind(null, invoice.id)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-mono font-normal">
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant={
                invoice.status === "PAID"
                  ? "default"
                  : invoice.status === "OVERDUE"
                    ? "destructive"
                    : "outline"
              }
            >
              {invoice.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-mono font-normal">
              Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{invoice.type}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-mono font-normal">
              Issue Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-sm">
              {invoice.issueDate.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-mono font-normal">
              Due Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-sm">
              {invoice.dueDate.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {invoice.project && (
        <div className="mb-8">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Project
          </p>
          <p className="text-sm">
            <Link
              href={`/dashboard/projects/${invoice.project.id}`}
              className="hover:underline"
            >
              {invoice.project.title}
            </Link>
            <span className="text-muted-foreground">
              {" "}— {invoice.project.client.name}
            </span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Edit Invoice
          </h3>
          <InvoiceForm
            projects={projects}
            invoice={{
              id: invoice.id,
              projectId: invoice.projectId,
              type: invoice.type,
              issueDate: invoice.issueDate,
              dueDate: invoice.dueDate,
              lineItems: invoice.lineItems.map((li) => ({
                name: li.name,
                description: li.description,
                amount: li.amount,
              })),
            }}
          />
        </div>

        <div>
          <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Line Items Summary
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.lineItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.name && (
                      <p className="font-medium">{item.name}</p>
                    )}
                    {item.description && (
                      <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                        {item.description}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono align-top">
                    {currencySymbol}
                    {item.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 border-foreground">
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-mono font-bold">
                  {currencySymbol}
                  {invoice.totalAmount.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
