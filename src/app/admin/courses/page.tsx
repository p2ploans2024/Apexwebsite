import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container, EmptyState } from "@/components/ui/section";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { enrollments: true, modules: true } },
    },
  });

  return (
    <div className="bg-paper py-12">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl tracking-tight text-ink">Courses</h1>
            <p className="mt-1 text-sm text-ink-muted">Create, edit, and publish catalog items.</p>
          </div>
          <Button href="/admin/courses/new">New course</Button>
        </div>
        {courses.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No courses"
              description="Create a course, then add modules, lessons, and a quiz."
              action={<Button href="/admin/courses/new">Create course</Button>}
            />
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper text-xs uppercase tracking-wider text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Modules</th>
                  <th className="px-4 py-3 font-semibold">Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-t border-line">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="font-medium text-brand hover:text-brand-dark"
                      >
                        {course.title}
                      </Link>
                      <p className="text-xs text-ink-muted">{course.slug}</p>
                    </td>
                    <td className="px-4 py-3">{formatPrice(course.priceCents)}</td>
                    <td className="px-4 py-3">
                      {course.published ? "Published" : "Draft"}
                      {course.featured ? " · Featured" : ""}
                    </td>
                    <td className="px-4 py-3">{course._count.modules}</td>
                    <td className="px-4 py-3">{course._count.enrollments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}
