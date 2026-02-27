"use client";

import { useEffect, useActionState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertTeamProfile, type TeamProfileFormState } from "../actions";

interface TeamProfileFormProps {
  profile?: {
    companyName: string;
    tagline: string;
    name: string;
    address: string;
    email: string;
    phone: string;
  };
}

const initialState: TeamProfileFormState = {};

export function TeamProfileForm({ profile }: TeamProfileFormProps) {
  const [state, formAction, pending] = useActionState(upsertTeamProfile, initialState);

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) toast.success(state.success);
  }, [state]);

  return (
    <form action={formAction} className="space-y-6 max-w-lg">
      {state.error && (
        <div className="text-sm text-destructive border border-destructive/30 px-4 py-3">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Company Name</Label>
        <Input
          name="companyName"
          defaultValue={profile?.companyName}
          placeholder="e.g. cmdblock.tech"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Tagline</Label>
        <Input
          name="tagline"
          defaultValue={profile?.tagline}
          placeholder="e.g. Boutique Software Engineering"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Contact Name</Label>
        <Input
          name="name"
          defaultValue={profile?.name}
          placeholder="e.g. Ghegi Jimenez"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Address</Label>
        <Input
          name="address"
          defaultValue={profile?.address}
          placeholder="e.g. Davao City, Philippines"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Billing Email</Label>
        <Input
          name="email"
          type="email"
          defaultValue={profile?.email}
          placeholder="e.g. billing@cmdblock.tech"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-[0.15em] uppercase">Phone</Label>
        <Input
          name="phone"
          defaultValue={profile?.phone}
          placeholder="e.g. +63 912 345 6789"
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
