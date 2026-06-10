"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ContractsTableProps {
  contracts: {
    id: string;
    contractNumber: string;
    title: string;
    clientName: string;
    status: string;
    issueDate: Date;
    totalAmount: number;
    currency: string;
  }[];
}

function formatAmount(amount: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : "PHP ";
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function ContractsTable({ contracts }: ContractsTableProps) {
  const router = useRouter();

  if (contracts.length === 0) {
    return (
      <div className="border border-border p-8 text-sm text-muted-foreground">
        No contracts yet.
      </div>
    );
  }

  return (
    <div className="border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ref</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issued</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow
              key={contract.id}
              className="cursor-pointer"
              onClick={() => router.push(`/dashboard/contracts/${contract.id}`)}
            >
              <TableCell className="font-mono">{contract.contractNumber}</TableCell>
              <TableCell className="font-medium">{contract.title}</TableCell>
              <TableCell>{contract.clientName}</TableCell>
              <TableCell>
                <Badge variant="outline">{contract.status}</Badge>
              </TableCell>
              <TableCell>{contract.issueDate.toLocaleDateString()}</TableCell>
              <TableCell className="text-right font-mono">
                {formatAmount(contract.totalAmount, contract.currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
