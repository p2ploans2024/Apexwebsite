import Link from "next/link";
import { Clock, GraduationCap, Users } from "lucide-react";
import type { Course } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

export function CourseCard({ course }: { course: Course }) {
  const outcomes = safeJsonArray(course.learningOutcomes);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="h-2" style={{ background: course.accent }} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
            {course.level}
          </span>
          <span className="text-sm font-semibold text-ink">{formatPrice(course.priceCents)}</span>
        </div>
        <h3 className="font-serif mt-4 text-2xl tracking-tight text-ink group-hover:text-brand">
          {course.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{course.subtitle}</p>
        <ul className="mt-4 space-y-1 text-sm text-ink-muted">
          {outcomes.slice(0, 2).map((item) => (
            <li key={item} className="line-clamp-1">
              · {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {course.durationHours} hours
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> {course.audience.split(",")[0]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" /> Certificate
          </span>
        </div>
      </div>
    </Link>
  );
}

export function safeJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : value.split("\n").filter(Boolean);
  } catch {
    return value.split("\n").filter(Boolean);
  }
}
