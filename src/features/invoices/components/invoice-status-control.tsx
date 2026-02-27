"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateInvoiceStatus } from "../actions";
import type { InvoiceStatus } from "@/generated/prisma/client";

interface InvoiceStatusControlProps {
  invoiceId: string;
  currentStatus: InvoiceStatus;
}

const statuses: { value: InvoiceStatus; label: string }[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "SENT", label: "Sent" },
  { value: "PAID", label: "Paid" },
  { value: "OVERDUE", label: "Overdue" },
];

export function InvoiceStatusControl({
  invoiceId,
  currentStatus,
}: InvoiceStatusControlProps) {
  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={(value) =>
        updateInvoiceStatus(invoiceId, value as InvoiceStatus)
      }
    >
      <SelectTrigger className="w-[140px] bg-transparent">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
