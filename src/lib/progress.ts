import type { Enrollment, LessonProgress, QuizAttempt } from "@prisma/client";

type LessonRef = { id: string };
type ModuleRef = { lessons: LessonRef[] };

export function flattenLessons(modules: ModuleRef[]): LessonRef[] {
  return modules.flatMap((module) => module.lessons);
}

export function computeLessonProgress(
  modules: ModuleRef[],
  completedIds: Iterable<string>,
) {
  const lessons = flattenLessons(modules);
  const completed = new Set(completedIds);
  const done = lessons.filter((lesson) => completed.has(lesson.id)).length;
  const total = lessons.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
}

export function nextIncompleteLesson<T extends { id: string }>(
  lessons: T[],
  completedIds: Iterable<string>,
): T | undefined {
  const completed = new Set(completedIds);
  return lessons.find((lesson) => !completed.has(lesson.id)) ?? lessons[0];
}

export function enrollmentIsComplete(input: {
  lessonTotal: number;
  lessonDone: number;
  passedQuiz: boolean;
}): boolean {
  return (
    input.lessonTotal > 0 &&
    input.lessonDone >= input.lessonTotal &&
    input.passedQuiz
  );
}

export function latestPassedAttempt(
  attempts: Pick<QuizAttempt, "passed" | "createdAt">[],
): boolean {
  return attempts.some((attempt) => attempt.passed);
}

export type EnrollmentWithProgress = Enrollment & {
  lessonProgress: LessonProgress[];
  quizAttempts: QuizAttempt[];
};
