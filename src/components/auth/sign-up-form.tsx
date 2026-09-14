"use client";

import { useActionState } from "react";
import { signUpAction, type AuthFormState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/section";
import { Field } from "@/components/auth/sign-in-form";

const initial: AuthFormState = {};

export function SignUpForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, action, pending] = useActionState(signUpAction, initial);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      {state.error ? <Notice tone="danger">{state.error}</Notice> : null}
      <Field label="Full name" name="name" autoComplete="name" error={state.fieldErrors?.name?.[0]} />
      <Field
        label="Work email"
        name="email"
        type="email"
        autoComplete="email"
        error={state.fieldErrors?.email?.[0]}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters, with a letter and a number."
        error={state.fieldErrors?.password?.[0]}
      />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
