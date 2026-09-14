import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { computeLessonProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Container, EmptyState } from "@/components/ui/section";

export const metadata: Metadata = { title: "My courses" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    orderBy: { enrolledAt: "desc" },
    include: {
      lessonProgress: true,
      quizAttempts: true,
      course: {
        include: {
          modules: { include: { lessons: true } },
        },
      },
    },
  });

  return (
    <div className="py-16">
      <Container>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Learner dashboard
            </p>
            <h1 className="font-serif mt-2 text-4xl tracking-tight text-ink">
              Welcome back, {user.name?.split(" ")[0] ?? "learner"}.
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              Continue a course, sit a quiz, or download a certificate when you pass.
            </p>
          </div>
          <Button href="/courses" variant="secondary">
            Browse catalog
          </Button>
        </div>

        <div className="mt-10">
          {enrollments.length === 0 ? (
            <EmptyState
              title="No enrollments yet"
              description="Purchase a course to add it to your learning dashboard. Demo checkout works without Stripe keys."
              action={<Button href="/courses">Find a course</Button>}
            />
          ) : (
            <ul className="grid gap-5 md:grid-cols-2">
              {enrollments.map((enrollment) => {
                const { done, total, percent } = computeLessonProgress(
                  enrollment.course.modules,
                  enrollment.lessonProgress.map((item) => item.lessonId),
                );
                const passed = enrollment.quizAttempts.some((attempt) => attempt.passed);
                return (
                  <li
                    key={enrollment.id}
                    className="overflow-hidden rounded-2xl border border-line bg-white"
                  >
                    <div className="h-1.5" style={{ background: enrollment.course.accent }} />
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="font-serif text-2xl text-ink">
                          {enrollment.course.title}
                        </h2>
                        <span className="rounded-full bg-brand-soft px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
                          {enrollment.status === "COMPLETED" ? "Completed" : "In progress"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-ink-muted">
                        {done} of {total} lessons · Quiz {passed ? "passed" : "not yet passed"}
                      </p>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-soft">
                        <div
                          className="h-full rounded-full bg-brand"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs font-medium text-ink-muted">{percent}% complete</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button href={`/learn/${enrollment.course.slug}`}>Open course</Button>
                        {enrollment.status === "COMPLETED" ? (
                          <Button
                            href={`/learn/${enrollment.course.slug}/certificate`}
                            variant="secondary"
                          >
                            Certificate
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {user.role === "ADMIN" ? (
          <p className="mt-10 text-sm text-ink-muted">
            You also have instructor access.{" "}
            <Link href="/admin" className="font-semibold text-brand">
              Open the admin console
            </Link>
            .
          </p>
        ) : null}
      </Container>
    </div>
  );
}
