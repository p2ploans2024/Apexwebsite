import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { LessonMarkdown } from "@/components/lms/lesson-markdown";
import { CompleteLessonButton } from "@/components/lms/complete-lesson-button";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: PageProps<"/learn/[courseSlug]/lessons/[lessonId]">) {
  const user = await requireUser();
  const { courseSlug, lessonId } = await params;
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        orderBy: { sortOrder: "asc" },
        include: { lessons: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });
  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    include: { lessonProgress: true },
  });
  if (!enrollment) redirect(`/courses/${course.slug}`);

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: true },
  });
  if (!lesson || lesson.module.courseId !== course.id) notFound();

  const ordered = course.modules.flatMap((module) => module.lessons);
  const index = ordered.findIndex((item) => item.id === lesson.id);
  const prev = ordered[index - 1];
  const next = ordered[index + 1];
  const completed = enrollment.lessonProgress.some((item) => item.lessonId === lesson.id);
  const completedIds = new Set(enrollment.lessonProgress.map((item) => item.lessonId));
  const allLessonsDone =
    ordered.length > 0 && ordered.every((item) => completedIds.has(item.id) || item.id === lesson.id);

  return (
    <div className="py-10">
      <Container className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-line bg-white p-4 text-sm">
          <Link href={`/learn/${course.slug}`} className="font-medium text-brand">
            ← {course.title}
          </Link>
          <ul className="mt-4 space-y-1">
            {ordered.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/learn/${course.slug}/lessons/${item.id}`}
                  className={`block rounded-md px-2 py-1.5 ${
                    item.id === lesson.id
                      ? "bg-brand-soft font-medium text-ink"
                      : "text-ink-muted hover:bg-paper"
                  }`}
                >
                  {completedIds.has(item.id) ? "✓ " : ""}
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/learn/${course.slug}/quiz`}
                className="block rounded-md px-2 py-1.5 text-brand hover:bg-brand-soft"
              >
                Final quiz
              </Link>
            </li>
          </ul>
        </aside>
        <article className="rounded-3xl border border-line bg-white p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {lesson.module.title} · {lesson.minutes} min
          </p>
          <h1 className="font-serif mt-2 text-3xl tracking-tight text-ink sm:text-4xl">
            {lesson.title}
          </h1>
          <div className="mt-8">
            <LessonMarkdown content={lesson.content} />
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <CompleteLessonButton
              lessonId={lesson.id}
              courseSlug={course.slug}
              completed={completed}
            />
            <div className="flex flex-wrap gap-3">
              {prev ? (
                <Button href={`/learn/${course.slug}/lessons/${prev.id}`} variant="secondary">
                  Previous
                </Button>
              ) : null}
              {next ? (
                <Button href={`/learn/${course.slug}/lessons/${next.id}`} variant="secondary">
                  Next lesson
                </Button>
              ) : (
                <Button href={`/learn/${course.slug}/quiz`}>
                  {allLessonsDone || completed ? "Go to quiz" : "Course quiz"}
                </Button>
              )}
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
