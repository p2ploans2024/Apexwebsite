"use client";

import { useFormStatus } from "react-dom";
import { startCheckout } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";

export function BuyButton({
  courseId,
  label,
}: {
  courseId: string;
  label: string;
}) {
  return (
    <form action={startCheckout.bind(null, courseId)}>
      <Submit label={label} />
    </form>
  );
}

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
      {pending ? "Starting checkout…" : label}
    </Button>
  );
}
