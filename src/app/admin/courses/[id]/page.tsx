import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/section";
import { CourseForm } from "@/components/admin/course-form";
import { CourseCurriculumEditor } from "@/components/admin/curriculum-editor";

export default async function EditCoursePage({
  params,
}: PageProps<"/admin/courses/[id]">) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      quizzes: {
        include: {
          questions: {
            orderBy: { sortOrder: "asc" },
            include: { options: true },
          },
        },
      },
      modules: {
        orderBy: { sortOrder: "asc" },
        include: { lessons: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });
  if (!course) notFound();

  return (
    <div className="bg-paper py-12">
      <Container className="space-y-10">
        <div>
          <h1 className="font-serif text-3xl tracking-tight text-ink">Edit {course.title}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Catalog details, then curriculum and the knowledge check.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <h2 className="font-semibold text-ink">Course details</h2>
          <div className="mt-6">
            <CourseForm
              course={{
                id: course.id,
                title: course.title,
                slug: course.slug,
                subtitle: course.subtitle,
                description: course.description,
                audience: course.audience,
                durationHours: course.durationHours,
                level: course.level,
                priceCents: course.priceCents,
                accent: course.accent,
                learningOutcomes: course.learningOutcomes,
                includes: course.includes,
                published: course.published,
                featured: course.featured,
              }}
            />
          </div>
        </div>
        <CourseCurriculumEditor course={course} />
      </Container>
    </div>
  );
}
