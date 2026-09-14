import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { fulfillStripeSession } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { Container, Notice } from "@/components/ui/section";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: PageProps<"/checkout/success">) {
  const user = await requireUser();
  const params = await searchParams;
  const demo = params.demo === "1";
  const sessionId = typeof params.session_id === "string" ? params.session_id : null;
  let slug = typeof params.course === "string" ? params.course : null;

  if (sessionId) {
    const course = await fulfillStripeSession(sessionId);
    slug = course?.slug ?? slug;
  }

  const enrollment = slug
    ? await prisma.enrollment.findFirst({
        where: { userId: user.id, course: { slug } },
        include: { course: true },
      })
    : await prisma.enrollment.findFirst({
        where: { userId: user.id },
        orderBy: { enrolledAt: "desc" },
        include: { course: true },
      });

  if (!enrollment) {
    redirect("/dashboard");
  }

  return (
    <div className="py-16">
      <Container className="max-w-xl">
        <h1 className="font-serif text-4xl tracking-tight text-ink">You are enrolled.</h1>
        <p className="mt-3 text-base leading-7 text-ink-muted">
          {enrollment.course.title} is now in your learner dashboard. Lessons, progress, and the
          final quiz are ready.
        </p>
        {demo ? (
          <div className="mt-6">
            <Notice tone="gold">
              Demo checkout completed without Stripe. No payment was collected. Add Stripe keys to
              enable live Checkout.
            </Notice>
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/learn/${enrollment.course.slug}`}>Start training</Button>
          <Button href="/dashboard" variant="secondary">
            My courses
          </Button>
        </div>
      </Container>
    </div>
  );
}
