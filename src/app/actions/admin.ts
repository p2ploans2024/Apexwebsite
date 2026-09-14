"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { courseSchema } from "@/lib/validators";
import { parseLines, slugify } from "@/lib/utils";

export type CourseFormState = { error?: string };

function checkbox(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

export async function createCourse(
  _prev: CourseFormState,
  formData: FormData,
): Promise<CourseFormState> {
  await requireAdmin();
  const parsed = courseSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") || "")),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    audience: formData.get("audience"),
    durationHours: formData.get("durationHours"),
    level: formData.get("level"),
    priceCents: Math.round(Number(formData.get("priceDollars") || 0) * 100),
    accent: formData.get("accent") || "#0F4D4A",
    learningOutcomes: formData.get("learningOutcomes"),
    includes: formData.get("includes"),
    published: checkbox(formData, "published"),
    featured: checkbox(formData, "featured"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Check the form fields." };
  }

  const existing = await prisma.course.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    return { error: "That slug is already in use." };
  }

  const course = await prisma.course.create({
    data: {
      ...parsed.data,
      learningOutcomes: JSON.stringify(parseLines(parsed.data.learningOutcomes)),
      includes: JSON.stringify(parseLines(parsed.data.includes)),
      published: parsed.data.published ?? false,
      featured: parsed.data.featured ?? false,
    },
  });

  await prisma.quiz.create({
    data: {
      courseId: course.id,
      title: `${course.title} knowledge check`,
      passPercent: 80,
    },
  });

  revalidatePath("/admin/courses");
  redirect(`/admin/courses/${course.id}`);
}

export async function updateCourse(
  courseId: string,
  _prev: CourseFormState,
  formData: FormData,
): Promise<CourseFormState> {
  await requireAdmin();
  const parsed = courseSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    audience: formData.get("audience"),
    durationHours: formData.get("durationHours"),
    level: formData.get("level"),
    priceCents: Math.round(Number(formData.get("priceDollars") || 0) * 100),
    accent: formData.get("accent") || "#0F4D4A",
    learningOutcomes: formData.get("learningOutcomes"),
    includes: formData.get("includes"),
    published: checkbox(formData, "published"),
    featured: checkbox(formData, "featured"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Check the form fields." };
  }

  await prisma.course.update({
    where: { id: courseId },
    data: {
      ...parsed.data,
      learningOutcomes: JSON.stringify(parseLines(parsed.data.learningOutcomes)),
      includes: JSON.stringify(parseLines(parsed.data.includes)),
      published: parsed.data.published ?? false,
      featured: parsed.data.featured ?? false,
    },
  });

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/courses");
  return {};
}

export async function addModule(courseId: string, formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!title) return;

  const count = await prisma.module.count({ where: { courseId } });
  await prisma.module.create({
    data: {
      courseId,
      title,
      description: description || "Module overview",
      sortOrder: count + 1,
    },
  });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function updateModule(moduleId: string, courseId: string, formData: FormData) {
  await requireAdmin();
  await prisma.module.update({
    where: { id: moduleId },
    data: {
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      sortOrder: Number(formData.get("sortOrder") || 1),
    },
  });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteModule(moduleId: string, courseId: string) {
  await requireAdmin();
  await prisma.module.delete({ where: { id: moduleId } });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function addLesson(moduleId: string, courseId: string, formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  if (!title) return;
  const count = await prisma.lesson.count({ where: { moduleId } });
  await prisma.lesson.create({
    data: {
      moduleId,
      title,
      content: String(formData.get("content") || "Lesson content goes here."),
      minutes: Number(formData.get("minutes") || 8),
      sortOrder: count + 1,
    },
  });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function updateLesson(lessonId: string, courseId: string, formData: FormData) {
  await requireAdmin();
  await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      title: String(formData.get("title") || "").trim(),
      content: String(formData.get("content") || ""),
      minutes: Number(formData.get("minutes") || 8),
      sortOrder: Number(formData.get("sortOrder") || 1),
    },
  });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteLesson(lessonId: string, courseId: string) {
  await requireAdmin();
  await prisma.lesson.delete({ where: { id: lessonId } });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function addQuizQuestion(quizId: string, courseId: string, formData: FormData) {
  await requireAdmin();
  const prompt = String(formData.get("prompt") || "").trim();
  if (!prompt) return;
  const count = await prisma.quizQuestion.count({ where: { quizId } });
  const options = [1, 2, 3, 4].map((index) => ({
    text: String(formData.get(`option${index}`) || "").trim(),
    isCorrect: String(formData.get("correct") || "") === String(index),
  }));
  if (options.some((option) => !option.text) || !options.some((option) => option.isCorrect)) {
    return;
  }

  await prisma.quizQuestion.create({
    data: {
      quizId,
      prompt,
      sortOrder: count + 1,
      options: { create: options },
    },
  });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteQuizQuestion(questionId: string, courseId: string) {
  await requireAdmin();
  await prisma.quizQuestion.delete({ where: { id: questionId } });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function updateQuizMeta(quizId: string, courseId: string, formData: FormData) {
  await requireAdmin();
  await prisma.quiz.update({
    where: { id: quizId },
    data: {
      title: String(formData.get("title") || "").trim(),
      passPercent: Number(formData.get("passPercent") || 80),
    },
  });
  revalidatePath(`/admin/courses/${courseId}`);
}
