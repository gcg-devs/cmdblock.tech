import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectFinancialSummary } from "@/features/projects/components/project-financial-summary";
import { ProjectStatusControl } from "@/features/projects/components/project-status-control";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true } },
      invoices: {
        orderBy: { createdAt: "desc" },
        include: { lineItems: true },
      },
    },
  });

  if (!project) notFound();

  const amountBilled = project.invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const amountCollected = project.invoices
    .filter((inv) => inv.status === "PAID")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
            <Link href={`/dashboard/clients/${project.client.id}`} className="hover:underline">
              {project.client.name}
            </Link>
          </p>
          <h2 className="font-sans text-2xl font-700 tracking-tight">
            <span className="text-muted-foreground font-mono text-lg font-normal">
              &gt;_{" "}
            </span>
            {project.title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/projects">Back</Link>
          </Button>
          <ProjectStatusControl projectId={project.id} currentStatus={project.status} />
          <Button asChild>
            <Link href={`/dashboard/invoices/new?projectId=${project.id}`}>
              + Generate SOA
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <ProjectFinancialSummary
          totalContractValue={project.totalContractValue}
          amountBilled={amountBilled}
          amountCollected={amountCollected}
          currency={project.currency}
        />
      </div>

      <div>
        <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
          Invoices ({project.invoices.length})
        </h3>
        {project.invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground">No invoices yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/invoices/${invoice.id}`}
                      className="hover:underline font-mono font-medium"
                    >
                      {invoice.invoiceNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {invoice.type}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {invoice.issueDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {project.currency === "PHP" ? "₱" : "$"}
                    {invoice.totalAmount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
