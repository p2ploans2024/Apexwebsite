import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { computeLessonProgress } from "@/lib/progress";
import { Container, Notice } from "@/components/ui/section";
import { QuizForm } from "@/components/lms/quiz-form";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function QuizPage({
  params,
}: PageProps<"/learn/[courseSlug]/quiz">) {
  const user = await requireUser();
  const { courseSlug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: { include: { lessons: true } },
      quizzes: {
        include: {
          questions: {
            orderBy: { sortOrder: "asc" },
            include: { options: true },
          },
        },
      },
    },
  });
  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    include: { lessonProgress: true, quizAttempts: { orderBy: { createdAt: "desc" } } },
  });
  if (!enrollment) redirect(`/courses/${course.slug}`);

  const quiz = course.quizzes[0];
  if (!quiz) {
    return (
      <Container className="py-16">
        <Notice>This course does not have a quiz yet.</Notice>
      </Container>
    );
  }

  const { done, total } = computeLessonProgress(
    course.modules,
    enrollment.lessonProgress.map((item) => item.lessonId),
  );
  const unlocked = total > 0 && done >= total;
  const passed = enrollment.quizAttempts.some((attempt) => attempt.passed);

  return (
    <div className="py-12">
      <Container className="max-w-3xl">
        <Link href={`/learn/${course.slug}`} className="text-sm font-medium text-brand">
          ← Back to {course.title}
        </Link>
        <h1 className="font-serif mt-4 text-4xl tracking-tight text-ink">{quiz.title}</h1>
        <p className="mt-3 text-sm leading-6 text-ink-muted">
          {quiz.questions.length} questions · {quiz.passPercent}% required to pass. You can retake
          the quiz if you miss the mark.
        </p>

        {!unlocked ? (
          <div className="mt-8">
            <Notice tone="gold">
              Finish every lesson before sitting the knowledge check ({done}/{total} complete).
            </Notice>
            <div className="mt-6">
              <Button href={`/learn/${course.slug}`}>Return to outline</Button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            {passed ? (
              <div className="mb-6">
                <Notice>
                  You already have a passing score. You may retake for practice, or{" "}
                  <Link href={`/learn/${course.slug}/certificate`} className="font-semibold">
                    view your certificate
                  </Link>
                  .
                </Notice>
              </div>
            ) : enrollment.quizAttempts[0] ? (
              <div className="mb-6">
                <Notice tone="gold">
                  Last attempt: {enrollment.quizAttempts[0].scorePercent}%. Passing is{" "}
                  {quiz.passPercent}%.
                </Notice>
              </div>
            ) : null}
            <QuizForm
              quizId={quiz.id}
              courseSlug={course.slug}
              passPercent={quiz.passPercent}
              questions={quiz.questions.map((question) => ({
                id: question.id,
                prompt: question.prompt,
                options: question.options.map((option) => ({
                  id: option.id,
                  text: option.text,
                })),
              }))}
            />
          </div>
        )}
      </Container>
    </div>
  );
}
