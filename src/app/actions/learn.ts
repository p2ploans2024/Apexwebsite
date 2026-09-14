"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import {
  computeLessonProgress,
  enrollmentIsComplete,
} from "@/lib/progress";

async function refreshEnrollmentCompletion(enrollmentId: string, courseSlug: string) {
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      lessonProgress: true,
      quizAttempts: true,
      course: {
        include: { modules: { include: { lessons: true } } },
      },
    },
  });
  if (!enrollment) return;

  const { done, total } = computeLessonProgress(
    enrollment.course.modules,
    enrollment.lessonProgress.map((item) => item.lessonId),
  );
  const passedQuiz = enrollment.quizAttempts.some((attempt) => attempt.passed);
  const complete = enrollmentIsComplete({
    lessonDone: done,
    lessonTotal: total,
    passedQuiz,
  });

  if (complete && enrollment.status !== "COMPLETED") {
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { status: "COMPLETED", completedAt: new Date() },
    });
  }

  revalidatePath(`/learn/${courseSlug}`);
  revalidatePath(`/learn/${courseSlug}/lessons`);
  revalidatePath("/dashboard");
}

export async function markLessonComplete(lessonId: string, courseSlug: string) {
  const user = await requireUser();
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });
  if (!lesson || lesson.module.course.slug !== courseSlug) {
    throw new Error("Lesson not found.");
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId: user.id, courseId: lesson.module.courseId },
    },
  });
  if (!enrollment) {
    throw new Error("You are not enrolled in this course.");
  }

  await prisma.lessonProgress.upsert({
    where: {
      enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId },
    },
    update: { completedAt: new Date() },
    create: { enrollmentId: enrollment.id, lessonId },
  });

  await refreshEnrollmentCompletion(enrollment.id, courseSlug);
}

export async function submitQuiz(
  quizId: string,
  courseSlug: string,
  answers: Record<string, string>,
) {
  const user = await requireUser();
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      course: true,
      questions: { include: { options: true }, orderBy: { sortOrder: "asc" } },
    },
  });
  if (!quiz || quiz.course.slug !== courseSlug) {
    throw new Error("Quiz not found.");
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: quiz.courseId } },
  });
  if (!enrollment) {
    throw new Error("You are not enrolled in this course.");
  }

  let correct = 0;
  for (const question of quiz.questions) {
    const selected = answers[question.id];
    const match = question.options.find((option) => option.id === selected);
    if (match?.isCorrect) correct += 1;
  }

  const scorePercent =
    quiz.questions.length === 0
      ? 0
      : Math.round((correct / quiz.questions.length) * 100);
  const passed = scorePercent >= quiz.passPercent;

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: user.id,
      enrollmentId: enrollment.id,
      quizId: quiz.id,
      scorePercent,
      passed,
    },
  });

  await refreshEnrollmentCompletion(enrollment.id, courseSlug);

  return {
    attemptId: attempt.id,
    scorePercent,
    passed,
    correct,
    total: quiz.questions.length,
    passPercent: quiz.passPercent,
  };
}
