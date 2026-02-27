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

interface ProjectRow {
  id: string;
  title: string;
  status: string;
  totalContractValue: number;
  currency: string;
  client: { name: string };
  _count: { invoices: number };
}

interface ProjectsTableProps {
  projects: ProjectRow[];
}

function currencySymbol(c: string) {
  return c === "PHP" ? "₱" : "$";
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No projects yet. Create your first project to get started.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Contract Value</TableHead>
          <TableHead className="text-right">Invoices</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="hover:underline font-medium"
              >
                {project.title}
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {project.client.name}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{project.status}</Badge>
            </TableCell>
            <TableCell className="text-right font-mono text-sm">
              {currencySymbol(project.currency)}
              {project.totalContractValue.toLocaleString()}
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {project._count.invoices}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
