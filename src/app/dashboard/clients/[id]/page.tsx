import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ClientForm } from "@/features/clients/components/client-form";
import { deleteClient } from "@/features/clients/actions";
import { DeleteEntityDialog } from "@/components/delete-entity-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      projects: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          status: true,
          totalContractValue: true,
          currency: true,
        },
      },
    },
  });

  if (!client) notFound();

  const projectCount = client.projects.length;
  const invoiceCount = await prisma.invoice.count({
    where: { project: { clientId: id } },
  });

  const deleteDesc = projectCount > 0
    ? `This will permanently delete this client, ${projectCount} project(s), and ${invoiceCount} invoice(s). This action cannot be undone.`
    : undefined;

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Client
          </p>
          <h2 className="font-sans text-2xl font-700 tracking-tight">
            <span className="text-muted-foreground font-mono text-lg font-normal">
              &gt;_{" "}
            </span>
            {client.name}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/clients">Back</Link>
          </Button>
          <DeleteEntityDialog
            entityName="Client"
            description={deleteDesc}
            onDelete={deleteClient.bind(null, client.id)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Edit Details
          </h3>
          <ClientForm client={client} />
        </div>

        <div>
          <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Projects ({client.projects.length})
          </h3>
          {client.projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {client.projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="hover:underline font-medium"
                      >
                        {project.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {project.currency === "PHP" ? "₱" : "$"}
                      {project.totalContractValue.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
