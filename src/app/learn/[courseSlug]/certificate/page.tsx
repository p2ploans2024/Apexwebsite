import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { brand } from "@/lib/brand";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Container, Notice } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function CertificatePage({
  params,
}: PageProps<"/learn/[courseSlug]/certificate">) {
  const user = await requireUser();
  const { courseSlug } = await params;
  const course = await prisma.course.findUnique({ where: { slug: courseSlug } });
  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    include: { quizAttempts: true },
  });
  if (!enrollment) redirect(`/courses/${course.slug}`);

  const passed = enrollment.quizAttempts.some((attempt) => attempt.passed);
  if (enrollment.status !== "COMPLETED" && !passed) {
    return (
      <div className="py-16">
        <Container className="max-w-xl">
          <Notice tone="gold">
            Complete every lesson and pass the quiz to unlock this certificate.
          </Notice>
          <div className="mt-6">
            <Button href={`/learn/${course.slug}`}>Return to course</Button>
          </div>
        </Container>
      </div>
    );
  }

  const awarded = enrollment.completedAt ?? new Date();

  return (
    <div className="py-12">
      <Container className="max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link href={`/learn/${course.slug}`} className="text-sm font-medium text-brand">
            ← Back to course
          </Link>
          <p className="text-xs text-ink-muted">Use your browser print dialog to save a PDF.</p>
        </div>
        <div className="mt-6 rounded-[28px] border-[10px] border-brand bg-[#fbfaf6] px-8 py-14 text-center shadow-sm sm:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            {brand.legalName}
          </p>
          <h1 className="font-serif mt-6 text-4xl tracking-tight text-ink sm:text-5xl">
            Certificate of Completion
          </h1>
          <p className="mt-8 text-sm uppercase tracking-[0.18em] text-ink-muted">
            This certifies that
          </p>
          <p className="font-serif mt-3 text-3xl text-brand">{user.name}</p>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-ink-muted">
            has completed the {brand.name} training course
          </p>
          <p className="font-serif mt-3 text-2xl text-ink">{course.title}</p>
          <p className="mt-8 text-sm text-ink-muted">Awarded {formatDate(awarded)}</p>
          <div className="mx-auto mt-10 flex max-w-md justify-between border-t border-line pt-6 text-left text-xs text-ink-muted">
            <div>
              <p className="font-semibold text-ink">Training record</p>
              <p>LMS enrollment {enrollment.id.slice(0, 8)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-ink">{brand.name}</p>
              <p>Placeholder certificate · not a government license</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
