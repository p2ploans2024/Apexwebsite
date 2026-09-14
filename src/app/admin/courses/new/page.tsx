import { Container } from "@/components/ui/section";
import { CourseForm } from "@/components/admin/course-form";

export default function NewCoursePage() {
  return (
    <div className="bg-paper py-12">
      <Container className="max-w-2xl">
        <h1 className="font-serif text-3xl tracking-tight text-ink">New course</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Create the catalog record first, then add modules, lessons, and quiz questions.
        </p>
        <div className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-8">
          <CourseForm />
        </div>
      </Container>
    </div>
  );
}
