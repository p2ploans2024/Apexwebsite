"use client";

import { useActionState } from "react";
import {
  createCourse,
  updateCourse,
  type CourseFormState,
} from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/section";
import { Field } from "@/components/auth/sign-in-form";
import { slugify } from "@/lib/utils";
import { useState } from "react";

const initial: CourseFormState = {};

type CourseValues = {
  id?: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  audience: string;
  durationHours: number;
  level: string;
  priceCents: number;
  accent: string;
  learningOutcomes: string;
  includes: string;
  published: boolean;
  featured: boolean;
};

export function CourseForm({ course }: { course?: CourseValues }) {
  const action = course
    ? updateCourse.bind(null, course.id as string)
    : createCourse;
  const [state, formAction, pending] = useActionState(action, initial);
  const [slug, setSlug] = useState(course?.slug ?? "");

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <Notice tone="danger">{state.error}</Notice> : null}
      <Field
        label="Title"
        name="title"
        defaultValue={course?.title}
      />
      <label className="block text-sm font-medium text-ink">
        Slug
        <input
          name="slug"
          value={slug}
          onChange={(event) => setSlug(slugify(event.target.value))}
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none ring-brand/30 focus:border-brand focus:ring-2"
        />
      </label>
      <Field label="Subtitle" name="subtitle" defaultValue={course?.subtitle} />
      <Field
        label="Description"
        name="description"
        textarea
        defaultValue={course?.description}
      />
      <Field label="Audience" name="audience" defaultValue={course?.audience} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Duration (hours)"
          name="durationHours"
          type="number"
          defaultValue={String(course?.durationHours ?? 4)}
        />
        <Field label="Level" name="level" defaultValue={course?.level ?? "Foundation"} />
        <Field
          label="Price (USD)"
          name="priceDollars"
          type="number"
          defaultValue={String(((course?.priceCents ?? 4900) / 100).toFixed(0))}
        />
        <Field label="Accent color" name="accent" defaultValue={course?.accent ?? "#0F4D4A"} />
      </div>
      <Field
        label="Learning outcomes (one per line)"
        name="learningOutcomes"
        textarea
        defaultValue={
          course?.learningOutcomes
            ? jsonToLines(course.learningOutcomes)
            : "Apply core food safety habits\nPass the knowledge check"
        }
      />
      <Field
        label="Includes (one per line)"
        name="includes"
        textarea
        defaultValue={
          course?.includes
            ? jsonToLines(course.includes)
            : "Self-paced lessons\nCertificate of completion"
        }
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={course?.published ?? true} />
        Published
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={course?.featured ?? false} />
        Featured on home page
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : course ? "Save course" : "Create course"}
      </Button>
    </form>
  );
}

function jsonToLines(value: string) {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.join("\n");
  } catch {
    /* keep raw */
  }
  return value;
}
