import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardCheck, Shield, Users } from "lucide-react";
import { brand } from "@/lib/brand";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/section";
import { CourseCard } from "@/components/courses/course-card";

export const dynamic = "force-dynamic";

const values = [
  {
    icon: Shield,
    title: "Built for real kitchens",
    body: "Scenarios from the line, the cooler, and the pass — not abstract slides that expire after orientation day.",
  },
  {
    icon: ClipboardCheck,
    title: "Documented competency",
    body: "Lessons, quizzes, progress, and certificates live in one LMS so managers can see who is trained.",
  },
  {
    icon: Users,
    title: "Team-ready from day one",
    body: "Buy a seat, enroll, and start. Group operators can train new hires without waiting on a classroom date.",
  },
  {
    icon: BadgeCheck,
    title: "Standards-aligned",
    body: "Content follows FDA Food Code principles, HACCP thinking, and widely used industry practices.",
  },
];

export default async function HomePage() {
  const courses = await prisma.course.findMany({
    where: { published: true, featured: true },
    orderBy: { priceCents: "asc" },
    take: 3,
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(180deg,#eef5f3_0%,#f3f6f4_48%,#f3f6f4_100%)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Food safety training
            </p>
            <h1 className="font-serif mt-4 max-w-xl text-4xl leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {brand.shortTagline}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-ink-muted">
              {brand.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/courses">
                Browse courses <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/about" variant="secondary">
                Why operators choose {brand.name}
              </Button>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Self-paced LMS · Progress tracking · Certificate of completion
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              What teams complete
            </p>
            <ul className="mt-5 space-y-4">
              {[
                "Food Handler Essentials for every new hire",
                "Manager training that survives an inspection conversation",
                "Allergen procedures FOH and BOH can actually run",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-ink">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-6 text-center">
              {[
                ["3", "Core courses"],
                ["80%", "Quiz pass mark"],
                ["24/7", "LMS access"],
              ].map(([stat, label]) => (
                <div key={label}>
                  <p className="font-serif text-2xl text-brand">{stat}</p>
                  <p className="mt-1 text-xs text-ink-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white py-6">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
          <span>FDA Food Code aligned</span>
          <span>HACCP principles</span>
          <span>Allergen protocol</span>
          <span>Inspection-minded</span>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow={`Why operators use ${brand.name}`}
            title="Training that holds up on a Saturday night."
            description={`Food safety fails in the gap between a poster and a busy ticket rail. ${brand.name} closes that gap with structured lessons, quizzes, and a record of who finished.`}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div key={item.title} className="rounded-2xl border border-line bg-white p-6">
                <item.icon className="h-6 w-6 text-brand" />
                <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Catalog"
              title="Start with a course built for the work."
            />
            <Link href="/courses" className="text-sm font-semibold text-brand hover:text-brand-dark">
              View all courses
            </Link>
          </div>
          {courses.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm text-ink-muted">
              Courses will appear here after the database is seeded.
            </p>
          )}
        </Container>
      </section>

      <section className="py-20">
        <Container className="rounded-3xl bg-brand px-8 py-12 text-white sm:px-12">
          <h2 className="font-serif max-w-xl text-3xl tracking-tight sm:text-4xl">
            Ready to train the next shift with a record you can stand behind?
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
            Create a learner account, purchase a course, and keep progress in the {brand.name} LMS.
            Demo checkout is available when Stripe keys are not configured.
          </p>
          <div className="mt-8">
            <Button href="/signup" variant="secondary">
              Create a learner account
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
