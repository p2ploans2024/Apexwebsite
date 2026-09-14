"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/section";
import { Field } from "@/components/auth/sign-in-form";

const initial: ContactState = {};

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.success) {
    return <Notice>{state.success}</Notice>;
  }

  return (
    <form action={action} className="space-y-4">
      {state.error ? <Notice tone="danger">{state.error}</Notice> : null}
      <Field label="Name" name="name" error={state.fieldErrors?.name?.[0]} />
      <Field label="Email" name="email" type="email" error={state.fieldErrors?.email?.[0]} />
      <label className="block text-sm font-medium text-ink">
        Topic
        <select
          name="topic"
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none ring-brand/30 focus:border-brand focus:ring-2"
          defaultValue="Team training"
        >
          <option>Team training</option>
          <option>Course content question</option>
          <option>Enterprise / group rates</option>
          <option>Other</option>
        </select>
        {state.fieldErrors?.topic?.[0] ? (
          <p className="mt-1 text-xs font-normal text-danger">{state.fieldErrors.topic[0]}</p>
        ) : null}
      </label>
      <Field label="Message" name="message" textarea error={state.fieldErrors?.message?.[0]} />
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
