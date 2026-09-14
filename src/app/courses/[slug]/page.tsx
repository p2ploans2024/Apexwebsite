import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Layers, Shield } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { isStripeConfigured } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Container, Notice } from "@/components/ui/section";
import { BuyButton } from "@/components/courses/buy-button";
import { safeJsonArray } from "@/components/courses/course-card";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  return { title: course?.title ?? "Course" };
}

export default async function CourseDetailPage({
  params,
}: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const session = await auth();
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { sortOrder: "asc" },
        include: { lessons: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  if (!course || !course.published) notFound();

  const enrollment = session?.user?.id
    ? await prisma.enrollment.findUnique({
        where: {
          userId_courseId: { userId: session.user.id, courseId: course.id },
        },
      })
    : null;

  const outcomes = safeJsonArray(course.learningOutcomes);
  const includes = safeJsonArray(course.includes);
  const demo = !isStripeConfigured();
  const callback = `/courses/${course.slug}`;

  return (
    <div className="py-16">
      <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {course.level} · {course.durationHours} hours
          </p>
          <h1 className="font-serif mt-3 text-4xl tracking-tight text-ink sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-muted">{course.subtitle}</p>
          <p className="mt-6 text-base leading-8 text-ink">{course.description}</p>

          <h2 className="font-serif mt-12 text-2xl text-ink">What you will learn</h2>
          <ul className="mt-4 space-y-3">
            {outcomes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="font-serif mt-12 text-2xl text-ink">Syllabus</h2>
          <ol className="mt-4 space-y-4">
            {course.modules.map((module, index) => (
              <li key={module.id} className="rounded-2xl border border-line bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Module {index + 1}
                </p>
                <h3 className="mt-1 font-semibold text-ink">{module.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{module.description}</p>
                <ul className="mt-3 space-y-1 text-sm text-ink-muted">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      {lesson.title} · {lesson.minutes} min
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <aside className="h-fit rounded-3xl border border-line bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <p className="font-serif text-4xl text-ink">{formatPrice(course.priceCents)}</p>
          <p className="mt-1 text-sm text-ink-muted">Per learner · lifetime LMS access for this course</p>
          <div className="mt-6 space-y-3 text-sm text-ink-muted">
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand" /> {course.durationHours} hours estimated
            </p>
            <p className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand" /> {course.modules.length} modules + final quiz
            </p>
            <p className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand" /> For {course.audience}
            </p>
          </div>
          <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm text-ink">
            {includes.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          <div className="mt-6">
            {enrollment ? (
              <Button href={`/learn/${course.slug}`} className="w-full">
                Continue in LMS
              </Button>
            ) : session?.user ? (
              <BuyButton
                courseId={course.id}
                label={demo ? "Enroll with demo checkout" : "Buy and enroll"}
              />
            ) : (
              <Button href={`/signin?callbackUrl=${encodeURIComponent(callback)}`} className="w-full">
                Sign in to enroll
              </Button>
            )}
          </div>
          {demo && !enrollment ? (
            <div className="mt-4">
              <Notice tone="gold">
                Stripe keys are not configured. Checkout will enroll you immediately in demo mode — no
                card is charged.
              </Notice>
            </div>
          ) : null}
        </aside>
      </Container>
    </div>
  );
}
