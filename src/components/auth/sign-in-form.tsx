"use client";

import { useActionState } from "react";
import { signInAction, type AuthFormState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/section";

const initial: AuthFormState = {};

export function SignInForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, action, pending] = useActionState(signInAction, initial);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      {state.error ? <Notice tone="danger">{state.error}</Notice> : null}
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        error={state.fieldErrors?.email?.[0]}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        error={state.fieldErrors?.password?.[0]}
      />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

export function Field({
  label,
  name,
  type = "text",
  error,
  autoComplete,
  textarea,
  defaultValue,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  autoComplete?: string;
  textarea?: boolean;
  defaultValue?: string;
  hint?: string;
}) {
  const classes =
    "mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none ring-brand/30 focus:border-brand focus:ring-2";
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      {textarea ? (
        <textarea
          name={name}
          rows={5}
          defaultValue={defaultValue}
          className={classes}
        />
      ) : (
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          className={classes}
        />
      )}
      {hint ? <p className="mt-1 text-xs font-normal text-ink-muted">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs font-normal text-danger">{error}</p> : null}
    </label>
  );
}
