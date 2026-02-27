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
          <TableRow key={client.id}>
            <TableCell>
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="hover:underline font-medium"
              >
                {client.name}
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {client.pocName}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {client.pocEmail}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {client.createdAt.toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
