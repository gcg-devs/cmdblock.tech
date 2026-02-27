"use client";

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
  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={(value) =>
        updateProjectStatus(projectId, value as ProjectStatus)
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
