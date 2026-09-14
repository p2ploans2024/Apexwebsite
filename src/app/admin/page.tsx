import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default async function AdminHomePage() {
  const [courses, enrollments, learners, messages] = await Promise.all([
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.contactMessage.count(),
  ]);

  const stats = [
    { label: "Courses", value: courses },
    { label: "Enrollments", value: enrollments },
    { label: "Learners", value: learners },
    { label: "Contact messages", value: messages },
  ];

  return (
    <div className="bg-paper py-12">
      <Container>
        <h1 className="font-serif text-3xl tracking-tight text-ink">Instructor console</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
          Publish courses, edit modules and quizzes, and review who is enrolled. This area is limited
          to users with the admin role.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-wider text-ink-muted">{item.label}</p>
              <p className="font-serif mt-2 text-3xl text-brand">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/admin/courses">Manage courses</Button>
          <Button href="/admin/enrollments" variant="secondary">
            View enrollments
          </Button>
        </div>
      </Container>
    </div>
  );
}
