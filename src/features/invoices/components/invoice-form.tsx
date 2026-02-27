"use client";

import { useState, useActionState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { createInvoice, type InvoiceFormState } from "../actions";
import { LineItemEditor } from "./line-item-editor";

interface InvoiceFormProps {
  projects: { id: string; title: string; client: { name: string } }[];
  defaultProjectId?: string;
}

const initialState: InvoiceFormState = {};

export function InvoiceForm({ projects, defaultProjectId }: InvoiceFormProps) {
  const [state, formAction, pending] = useActionState(createInvoice, initialState);
  const [issueDate, setIssueDate] = useState<Date | undefined>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [lineItems, setLineItems] = useState([
    { description: "", amount: 0 },
  ]);

  return (
    <form
      action={(formData) => {
        formData.set("issueDate", issueDate?.toISOString() || "");
        formData.set("dueDate", dueDate?.toISOString() || "");
        formData.set("lineItems", JSON.stringify(lineItems));
        formAction(formData);
      }}
      className="space-y-6 max-w-2xl"
    >
      {state.error && (
        <div className="text-sm text-destructive border border-destructive/30 px-4 py-3">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs tracking-[0.15em] uppercase">
            Project (optional)
          </Label>
          <Select name="projectId" defaultValue={defaultProjectId}>
            <SelectTrigger className="bg-transparent">
              <SelectValue placeholder="Ad-hoc (no project)" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.title} — {p.client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs tracking-[0.15em] uppercase">Type</Label>
          <Select name="type" defaultValue="ONE_OFF">
            <SelectTrigger className="bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MOBILIZATION">Mobilization</SelectItem>
              <SelectItem value="MILESTONE">Milestone</SelectItem>
              <SelectItem value="FINAL">Final</SelectItem>
              <SelectItem value="ONE_OFF">One-off</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs tracking-[0.15em] uppercase">
            Issue Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-mono",
                  !issueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4" />
                {issueDate ? format(issueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={issueDate}
                onSelect={setIssueDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-xs tracking-[0.15em] uppercase">
            Due Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-mono",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4" />
                {dueDate ? format(dueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">
          Line Items
        </Label>
        <LineItemEditor value={lineItems} onChange={setLineItems} />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Invoice"}
      </Button>
    </form>
  );
}
