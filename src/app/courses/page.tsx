import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/courses/course-card";
import { Container, EmptyState, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Courses",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { priceCents: "asc" },
  });

  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Catalog"
          title="Food safety courses you can complete online."
          description="Purchase a seat, train in the LMS, and keep a certificate on file. Prices are per learner."
        />
        {courses.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-12">
            <EmptyState
              title="No published courses yet"
              description="An administrator can add and publish courses from the admin console."
              action={<Button href="/admin/courses">Open admin</Button>}
            />
          </div>
        )}
      </Container>
    </div>
  );
}
