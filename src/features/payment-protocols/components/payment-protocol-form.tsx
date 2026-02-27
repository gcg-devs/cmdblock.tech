"use client";

import { useEffect, useActionState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createPaymentProtocol,
  updatePaymentProtocol,
  type PaymentProtocolFormState,
} from "../actions";

interface PaymentProtocolFormProps {
  protocol?: {
    id: string;
    label: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
  onDone?: () => void;
}

const initialState: PaymentProtocolFormState = {};

export function PaymentProtocolForm({ protocol, onDone }: PaymentProtocolFormProps) {
  const action = protocol
    ? updatePaymentProtocol.bind(null, protocol.id)
    : createPaymentProtocol;
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success(state.success);
      onDone?.();
    }
  }, [state, onDone]);

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Label</Label>
        <Input
          name="label"
          defaultValue={protocol?.label}
          placeholder="e.g. UnionBank"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Bank Name</Label>
        <Input
          name="bankName"
          defaultValue={protocol?.bankName}
          placeholder="e.g. UnionBank of the Philippines"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Account Name</Label>
        <Input
          name="accountName"
          defaultValue={protocol?.accountName}
          placeholder="e.g. Ghegi Jimenez"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Account Number</Label>
        <Input
          name="accountNumber"
          defaultValue={protocol?.accountNumber}
          placeholder="e.g. 1094 5678 9012"
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : protocol ? "Update" : "Create"}
        </Button>
        {onDone && (
          <Button type="button" variant="outline" onClick={onDone}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
