"use client";

import { useFormStatus } from "react-dom";
import { markLessonComplete } from "@/app/actions/learn";
import { Button } from "@/components/ui/button";

export function CompleteLessonButton({
  lessonId,
  courseSlug,
  completed,
}: {
  lessonId: string;
  courseSlug: string;
  completed: boolean;
}) {
  if (completed) {
    return (
      <p className="text-sm font-medium text-success">Lesson marked complete</p>
    );
  }

  return (
    <form action={markLessonComplete.bind(null, lessonId, courseSlug)}>
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Mark lesson complete"}
    </Button>
  );
}
