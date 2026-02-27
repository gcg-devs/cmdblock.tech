"use client";

import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
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
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(currentStatus);
  const [, startTransition] = useTransition();

  function handleChange(value: string) {
    const newStatus = value as InvoiceStatus;
    startTransition(async () => {
      setOptimisticStatus(newStatus);
      await updateInvoiceStatus(invoiceId, newStatus);
      toast.success(`Invoice marked as ${statuses.find((s) => s.value === newStatus)?.label}`);
    });
  }

  return (
    <Select value={optimisticStatus} onValueChange={handleChange}>
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
