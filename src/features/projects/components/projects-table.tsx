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
          <TableRow key={project.id} className="group">
            <TableCell className="p-0">
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center px-4 py-2 font-medium group-hover:bg-muted/50 transition-colors"
              >
                {project.title}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center px-4 py-2 text-muted-foreground group-hover:bg-muted/50 transition-colors"
              >
                {project.client.name}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center px-4 py-2 group-hover:bg-muted/50 transition-colors"
              >
                <Badge variant="outline">{project.status}</Badge>
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center justify-end px-4 py-2 font-mono text-sm group-hover:bg-muted/50 transition-colors"
              >
                {currencySymbol(project.currency)}
                {project.totalContractValue.toLocaleString()}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center justify-end px-4 py-2 text-muted-foreground group-hover:bg-muted/50 transition-colors"
              >
                {project._count.invoices}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
