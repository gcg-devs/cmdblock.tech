"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProject, type ProjectFormState } from "../actions";

interface ProjectFormProps {
  clients: { id: string; name: string }[];
}

const initialState: ProjectFormState = {};

export function ProjectForm({ clients }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(createProject, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-lg">
      {state.error && (
        <div className="text-sm text-destructive border border-destructive/30 px-4 py-3">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="clientId" className="text-xs tracking-[0.15em] uppercase">
          Client
        </Label>
        <Select name="clientId" required>
          <SelectTrigger className="bg-transparent">
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-xs tracking-[0.15em] uppercase">
          Project Title
        </Label>
        <Input
          id="title"
          name="title"
          required
          placeholder="e.g., Phase 1: Phantom Bridge Hotfix"
          className="bg-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalContractValue" className="text-xs tracking-[0.15em] uppercase">
            Contract Value
          </Label>
          <Input
            id="totalContractValue"
            name="totalContractValue"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="190000"
            className="bg-transparent font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency" className="text-xs tracking-[0.15em] uppercase">
            Currency
          </Label>
          <Select name="currency" defaultValue="PHP">
            <SelectTrigger className="bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PHP">PHP (₱)</SelectItem>
              <SelectItem value="USD">USD ($)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}
