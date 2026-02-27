"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient, updateClient, type ClientFormState } from "../actions";

interface ClientFormProps {
  client?: {
    id: string;
    name: string;
    pocName: string;
    pocEmail: string;
    billingAddress: string;
  };
}

const initialState: ClientFormState = {};

export function ClientForm({ client }: ClientFormProps) {
  const router = useRouter();
  const action = client
    ? updateClient.bind(null, client.id)
    : createClient;

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
        <Label htmlFor="name" className="text-xs tracking-[0.15em] uppercase">
          Client Name
        </Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={client?.name}
          placeholder="e.g., Vanguard Contractors"
          className="bg-transparent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pocName" className="text-xs tracking-[0.15em] uppercase">
          Point of Contact
        </Label>
        <Input
          id="pocName"
          name="pocName"
          required
          defaultValue={client?.pocName}
          placeholder="Contact person name"
          className="bg-transparent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pocEmail" className="text-xs tracking-[0.15em] uppercase">
          Contact Email
        </Label>
        <Input
          id="pocEmail"
          name="pocEmail"
          type="email"
          required
          defaultValue={client?.pocEmail}
          placeholder="email@example.com"
          className="bg-transparent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="billingAddress" className="text-xs tracking-[0.15em] uppercase">
          Billing Address
        </Label>
        <Textarea
          id="billingAddress"
          name="billingAddress"
          defaultValue={client?.billingAddress}
          placeholder="Street, City, State, ZIP"
          className="bg-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : client ? "Update Client" : "Create Client"}
        </Button>
        {!client && (
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
