"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import {
  createContract,
  updateContract,
  type ContractFormState,
} from "../actions";
import { ContractLineItemEditor } from "./contract-line-item-editor";

interface ContractFormProps {
  contract?: {
    id: string;
    title: string;
    clientName: string;
    preparedBy: string;
    issueDate: Date;
    validUntil: Date | null;
    currency: string;
    overview: string;
    recommendedScope: string;
    integrationNotes: string;
    timeline: string;
    paymentTerms: string;
    changeRequests: string;
    warranty: string;
    exclusions: string;
    maintenance: string;
    legalNote: string;
    lineItems: { name: string; description: string; amount: number }[];
  };
}

const initialState: ContractFormState = {};

function toInputDate(date: Date | null | undefined): string {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

export function ContractForm({ contract }: ContractFormProps) {
  const router = useRouter();
  const action = contract
    ? updateContract.bind(null, contract.id)
    : createContract;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [lineItems, setLineItems] = useState(
    contract?.lineItems ?? [{ name: "", description: "", amount: 0 }]
  );

  useEffect(() => {
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <form
      action={(formData) => {
        formData.set("lineItems", JSON.stringify(lineItems));
        formAction(formData);
      }}
      className="space-y-6 max-w-4xl"
    >
      {state.error && (
        <div className="text-sm text-destructive border border-destructive/30 px-4 py-3">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-xs tracking-[0.15em] uppercase">Title</Label>
          <Input
            name="title"
            defaultValue={contract?.title}
            placeholder="Website Development Proposal"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs tracking-[0.15em] uppercase">Client</Label>
          <Input
            name="clientName"
            defaultValue={contract?.clientName}
            placeholder="Kristine Jornadal"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs tracking-[0.15em] uppercase">
            Prepared By
          </Label>
          <Input
            name="preparedBy"
            defaultValue={contract?.preparedBy}
            placeholder="Arnel Glenn Jimenez"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs tracking-[0.15em] uppercase">
            Issue Date
          </Label>
          <Input
            name="issueDate"
            type="date"
            defaultValue={toInputDate(contract?.issueDate ?? new Date())}
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs tracking-[0.15em] uppercase">
            Valid Until
          </Label>
          <Input
            name="validUntil"
            type="date"
            defaultValue={toInputDate(contract?.validUntil)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs tracking-[0.15em] uppercase">Currency</Label>
          <Select name="currency" defaultValue={contract?.currency ?? "PHP"}>
            <SelectTrigger className="bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PHP">PHP</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SectionField
        name="overview"
        label="Project Overview"
        defaultValue={contract?.overview}
      />
      <SectionField
        name="recommendedScope"
        label="Recommended Scope"
        defaultValue={contract?.recommendedScope}
      />
      <SectionField
        name="integrationNotes"
        label="Integration Notes"
        defaultValue={contract?.integrationNotes}
      />
      <SectionField
        name="timeline"
        label="Timeline"
        defaultValue={contract?.timeline}
      />
      <SectionField
        name="paymentTerms"
        label="Payment Terms"
        defaultValue={contract?.paymentTerms}
      />
      <SectionField
        name="changeRequests"
        label="Change Requests"
        defaultValue={contract?.changeRequests}
      />
      <SectionField
        name="warranty"
        label="Warranty"
        defaultValue={contract?.warranty}
      />
      <SectionField
        name="exclusions"
        label="Exclusions"
        defaultValue={contract?.exclusions}
      />
      <SectionField
        name="maintenance"
        label="Maintenance"
        defaultValue={contract?.maintenance}
      />
      <SectionField
        name="legalNote"
        label="Legal / Entity Note"
        defaultValue={contract?.legalNote}
      />

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">
          Deliverables
        </Label>
        <ContractLineItemEditor value={lineItems} onChange={setLineItems} />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : contract ? "Update Contract" : "Create Contract"}
        </Button>
        {!contract && (
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

function SectionField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs tracking-[0.15em] uppercase">{label}</Label>
      <Textarea name={name} defaultValue={defaultValue} rows={6} />
    </div>
  );
}
