"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, type LoginState } from "../actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="text-sm text-destructive border border-destructive/30 px-4 py-3">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username" className="text-xs tracking-[0.15em] uppercase">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          autoFocus
          placeholder="enter username"
          className="bg-transparent border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-xs tracking-[0.15em] uppercase">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="enter password"
          className="bg-transparent border-border"
        />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Authenticating..." : "Access Dashboard"}
      </Button>
    </form>
  );
}
