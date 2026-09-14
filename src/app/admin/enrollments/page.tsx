import { prisma } from "@/lib/prisma";
import { computeLessonProgress } from "@/lib/progress";
import { formatDate } from "@/lib/utils";
import { Container, EmptyState } from "@/components/ui/section";

export default async function AdminEnrollmentsPage() {
  const enrollments = await prisma.enrollment.findMany({
    orderBy: { enrolledAt: "desc" },
    include: {
      user: true,
      lessonProgress: true,
      quizAttempts: true,
      course: {
        include: { modules: { include: { lessons: true } } },
      },
    },
  });

  return (
    <div className="bg-paper py-12">
      <Container>
        <h1 className="font-serif text-3xl tracking-tight text-ink">Enrollments</h1>
        <p className="mt-1 text-sm text-ink-muted">Every learner seat currently in the LMS.</p>
        {enrollments.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No enrollments"
              description="When a learner completes checkout, they will appear here."
            />
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-paper text-xs uppercase tracking-wider text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Learner</th>
                  <th className="px-4 py-3 font-semibold">Course</th>
                  <th className="px-4 py-3 font-semibold">Progress</th>
                  <th className="px-4 py-3 font-semibold">Quiz</th>
                  <th className="px-4 py-3 font-semibold">Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => {
                  const { percent } = computeLessonProgress(
                    enrollment.course.modules,
                    enrollment.lessonProgress.map((item) => item.lessonId),
                  );
                  const passed = enrollment.quizAttempts.some((attempt) => attempt.passed);
                  return (
                    <tr key={enrollment.id} className="border-t border-line">
                      <td className="px-4 py-3">
                        <p className="font-medium text-ink">{enrollment.user.name}</p>
                        <p className="text-xs text-ink-muted">{enrollment.user.email}</p>
                      </td>
                      <td className="px-4 py-3">{enrollment.course.title}</td>
                      <td className="px-4 py-3">{percent}%</td>
                      <td className="px-4 py-3">{passed ? "Passed" : "—"}</td>
                      <td className="px-4 py-3">{formatDate(enrollment.enrolledAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}
