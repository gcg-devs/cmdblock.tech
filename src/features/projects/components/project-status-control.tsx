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
import { updateProjectStatus } from "../actions";
import type { ProjectStatus } from "@/generated/prisma/client";

interface ProjectStatusControlProps {
  projectId: string;
  currentStatus: ProjectStatus;
}

const statuses: { value: ProjectStatus; label: string }[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "ON_HOLD", label: "On Hold" },
  { value: "COMPLETED", label: "Completed" },
];

export function ProjectStatusControl({
  projectId,
  currentStatus,
}: ProjectStatusControlProps) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(currentStatus);
  const [, startTransition] = useTransition();

  function handleChange(value: string) {
    const newStatus = value as ProjectStatus;
    startTransition(async () => {
      setOptimisticStatus(newStatus);
      await updateProjectStatus(projectId, newStatus);
      toast.success(`Status updated to ${statuses.find((s) => s.value === newStatus)?.label}`);
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
