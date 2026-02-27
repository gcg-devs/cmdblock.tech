import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClientRow {
  id: string;
  name: string;
  pocName: string;
  pocEmail: string;
  createdAt: Date;
}

interface ClientsTableProps {
  clients: ClientRow[];
}

export function ClientsTable({ clients }: ClientsTableProps) {
  if (clients.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No clients yet. Create your first client to get started.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id} className="group">
            <TableCell className="p-0">
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="flex items-center px-4 py-2 font-medium group-hover:bg-muted/50 transition-colors"
              >
                {client.name}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="flex items-center px-4 py-2 text-muted-foreground group-hover:bg-muted/50 transition-colors"
              >
                {client.pocName}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="flex items-center px-4 py-2 text-muted-foreground group-hover:bg-muted/50 transition-colors"
              >
                {client.pocEmail}
              </Link>
            </TableCell>
            <TableCell className="p-0">
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="flex items-center px-4 py-2 text-muted-foreground group-hover:bg-muted/50 transition-colors"
              >
                {client.createdAt.toLocaleDateString()}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
