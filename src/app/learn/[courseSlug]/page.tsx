import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import {
  computeLessonProgress,
  flattenLessons,
  nextIncompleteLesson,
} from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Container, Notice } from "@/components/ui/section";

export const dynamic = "force-dynamic";

export default async function LearnCoursePage({
  params,
}: PageProps<"/learn/[courseSlug]">) {
  const user = await requireUser();
  const { courseSlug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      quizzes: { include: { questions: true } },
      modules: {
        orderBy: { sortOrder: "asc" },
        include: { lessons: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });
  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    include: { lessonProgress: true, quizAttempts: true },
  });
  if (!enrollment) {
    redirect(`/courses/${course.slug}`);
  }

  const completedIds = enrollment.lessonProgress.map((item) => item.lessonId);
  const { done, total, percent } = computeLessonProgress(course.modules, completedIds);
  const lessons = flattenLessons(course.modules);
  const nextLesson = nextIncompleteLesson(lessons, completedIds);
  const quiz = course.quizzes[0];
  const passedQuiz = enrollment.quizAttempts.some((attempt) => attempt.passed);
  const lastAttempt = enrollment.quizAttempts.at(-1);
  const quizReady = total > 0 && done >= total;

  return (
    <div className="py-12">
      <Container className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-line bg-white p-5 lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {percent}% complete
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-soft">
            <div className="h-full bg-brand" style={{ width: `${percent}%` }} />
          </div>
          <nav className="mt-6 space-y-5">
            {course.modules.map((module, index) => (
              <div key={module.id}>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                  Module {index + 1}
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">{module.title}</p>
                <ul className="mt-2 space-y-1">
                  {module.lessons.map((lesson) => {
                    const complete = completedIds.includes(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/learn/${course.slug}/lessons/${lesson.id}`}
                          className="block rounded-md px-2 py-1.5 text-sm text-ink-muted hover:bg-brand-soft hover:text-ink"
                        >
                          {complete ? "✓ " : ""}
                          {lesson.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {quiz ? (
              <Link
                href={`/learn/${course.slug}/quiz`}
                className="block rounded-md px-2 py-1.5 text-sm font-medium text-brand hover:bg-brand-soft"
              >
                Final quiz {passedQuiz ? "· passed" : ""}
              </Link>
            ) : null}
          </nav>
        </aside>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Course</p>
          <h1 className="font-serif mt-2 text-4xl tracking-tight text-ink">{course.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">{course.subtitle}</p>
          <p className="mt-4 text-sm text-ink-muted">
            {done} of {total} lessons complete
            {lastAttempt
              ? ` · last quiz score ${lastAttempt.scorePercent}%`
              : ""}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {nextLesson ? (
              <Button href={`/learn/${course.slug}/lessons/${nextLesson.id}`}>
                {done === 0 ? "Start first lesson" : "Continue"}
              </Button>
            ) : null}
            {quizReady ? (
              <Button href={`/learn/${course.slug}/quiz`} variant="secondary">
                {passedQuiz ? "Review quiz" : "Take final quiz"}
              </Button>
            ) : (
              <Notice>Complete every lesson to unlock the final quiz.</Notice>
            )}
            {enrollment.status === "COMPLETED" ? (
              <Button href={`/learn/${course.slug}/certificate`} variant="gold">
                Certificate
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
