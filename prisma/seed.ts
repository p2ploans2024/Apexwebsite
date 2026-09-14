import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { brand } from "../src/lib/brand";
import { seedCourses } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${brand.name} LMS…`);

  await prisma.quizAttempt.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.quizOption.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash(brand.demo.password, 12);

  const admin = await prisma.user.create({
    data: {
      email: brand.demo.adminEmail,
      name: brand.demo.adminName,
      passwordHash,
      role: "ADMIN",
    },
  });

  const learner = await prisma.user.create({
    data: {
      email: brand.demo.learnerEmail,
      name: brand.demo.learnerName,
      passwordHash,
      role: "LEARNER",
    },
  });

  for (const course of seedCourses) {
    const created = await prisma.course.create({
      data: {
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        audience: course.audience,
        durationHours: course.durationHours,
        level: course.level,
        priceCents: course.priceCents,
        featured: course.featured,
        accent: course.accent,
        learningOutcomes: JSON.stringify(course.learningOutcomes),
        includes: JSON.stringify(course.includes),
        published: true,
        modules: {
          create: course.modules.map((module, moduleIndex) => ({
            title: module.title,
            description: module.description,
            sortOrder: moduleIndex + 1,
            lessons: {
              create: module.lessons.map((lesson, lessonIndex) => ({
                title: lesson.title,
                content: lesson.content,
                minutes: lesson.minutes,
                sortOrder: lessonIndex + 1,
              })),
            },
          })),
        },
      },
    });

    await prisma.quiz.create({
      data: {
        courseId: created.id,
        title: course.quiz.title,
        passPercent: course.quiz.passPercent,
        questions: {
          create: course.quiz.questions.map((question, qIndex) => ({
            prompt: question.prompt,
            sortOrder: qIndex + 1,
            options: {
              create: question.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
      },
    });
  }

  const handler = await prisma.course.findUniqueOrThrow({
    where: { slug: "food-handler-essentials" },
  });

  await prisma.enrollment.create({
    data: {
      userId: learner.id,
      courseId: handler.id,
      status: "ACTIVE",
    },
  });

  await prisma.order.create({
    data: {
      userId: learner.id,
      courseId: handler.id,
      amountCents: handler.priceCents,
      status: "DEMO",
    },
  });

  console.log("Seed complete.");
  console.log("  Admin:  ", brand.demo.adminEmail, "/", brand.demo.password);
  console.log("  Learner:", brand.demo.learnerEmail, "/", brand.demo.password);
  console.log("  Admin id:", admin.id, "Learner id:", learner.id);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
