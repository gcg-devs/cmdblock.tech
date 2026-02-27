"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProject, updateProject, type ProjectFormState } from "../actions";

interface ProjectFormProps {
  clients: { id: string; name: string }[];
  project?: {
    id: string;
    clientId: string;
    title: string;
    totalContractValue: number;
    currency: string;
    scopeDescription: string;
    showScopeOnInvoice: boolean;
  };
}

const initialState: ProjectFormState = {};

export function ProjectForm({ clients, project }: ProjectFormProps) {
  const router = useRouter();
  const action = project
    ? updateProject.bind(null, project.id)
    : createProject;
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.error) toast.error(state.error);
  }, [state]);

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
        <Select name="clientId" required defaultValue={project?.clientId}>
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
          defaultValue={project?.title}
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
            defaultValue={project?.totalContractValue}
            placeholder="190000"
            className="bg-transparent font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency" className="text-xs tracking-[0.15em] uppercase">
            Currency
          </Label>
          <Select name="currency" defaultValue={project?.currency ?? "PHP"}>
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

      <div className="space-y-2">
        <Label htmlFor="scopeDescription" className="text-xs tracking-[0.15em] uppercase">
          Scope Description
        </Label>
        <Textarea
          id="scopeDescription"
          name="scopeDescription"
          defaultValue={project?.scopeDescription}
          placeholder="e.g., Subcontracted technical services for the deployment of..."
          className="bg-transparent min-h-[80px]"
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="showScopeOnInvoice"
          name="showScopeOnInvoice"
          defaultChecked={project?.showScopeOnInvoice ?? true}
        />
        <Label htmlFor="showScopeOnInvoice" className="text-xs tracking-[0.15em] uppercase">
          Show Scope on Invoice
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : project ? "Update Project" : "Create Project"}
        </Button>
        {!project && (
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
