"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { getAppUrl } from "@/lib/utils";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

async function enrollUser(userId: string, courseId: string) {
  return prisma.enrollment.upsert({
    where: { userId_courseId: { userId, courseId } },
    update: {},
    create: { userId, courseId, status: "ACTIVE" },
  });
}

export async function startCheckout(courseId: string) {
  const user = await requireUser();
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course || !course.published) {
    redirect("/courses");
  }

  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
  });
  if (existing) {
    redirect(`/learn/${course.slug}`);
  }

  if (!isStripeConfigured()) {
    await prisma.order.create({
      data: {
        userId: user.id,
        courseId: course.id,
        amountCents: course.priceCents,
        status: "DEMO",
      },
    });
    await enrollUser(user.id, course.id);
    redirect(`/checkout/success?course=${course.slug}&demo=1`);
  }

  const stripe = getStripe();
  if (!stripe) {
    redirect(`/courses/${course.slug}`);
  }

  const origin = getAppUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email ?? undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: course.priceCents,
          product_data: {
            name: course.title,
            description: course.subtitle,
          },
        },
      },
    ],
    metadata: {
      userId: user.id,
      courseId: course.id,
    },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/courses/${course.slug}`,
  });

  await prisma.order.create({
    data: {
      userId: user.id,
      courseId: course.id,
      amountCents: course.priceCents,
      status: "PENDING",
      stripeSessionId: session.id,
    },
  });

  if (!session.url) {
    redirect(`/courses/${course.slug}`);
  }
  redirect(session.url);
}

export async function fulfillStripeSession(sessionId: string) {
  const stripe = getStripe();
  if (!stripe) return null;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid" && session.status !== "complete") {
    return null;
  }

  const userId = session.metadata?.userId;
  const courseId = session.metadata?.courseId;
  if (!userId || !courseId) return null;

  await prisma.order.upsert({
    where: { stripeSessionId: session.id },
    update: { status: "PAID" },
    create: {
      userId,
      courseId,
      amountCents: session.amount_total ?? 0,
      status: "PAID",
      stripeSessionId: session.id,
    },
  });

  await enrollUser(userId, courseId);
  revalidatePath("/dashboard");
  return prisma.course.findUnique({ where: { id: courseId } });
}
