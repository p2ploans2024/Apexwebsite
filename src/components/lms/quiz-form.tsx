"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitQuiz } from "@/app/actions/learn";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/section";

type Question = {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
};

export function QuizForm({
  quizId,
  courseSlug,
  questions,
  passPercent,
}: {
  quizId: string;
  courseSlug: string;
  questions: Question[];
  passPercent: number;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{
    scorePercent: number;
    passed: boolean;
    correct: number;
    total: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (Object.keys(answers).length < questions.length) {
      setError("Answer every question before submitting.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      const next = await submitQuiz(quizId, courseSlug, answers);
      setResult(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit quiz.");
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div className="space-y-5">
        <Notice tone={result.passed ? "brand" : "danger"}>
          <p className="font-semibold">
            {result.passed ? "You passed" : "Not quite"} — {result.scorePercent}%
          </p>
          <p className="mt-1">
            {result.correct} of {result.total} correct. Passing score is {passPercent}%.
          </p>
        </Notice>
        <div className="flex flex-wrap gap-3">
          {result.passed ? (
            <Button href={`/learn/${courseSlug}/certificate`}>View certificate</Button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-brand-soft/60"
              onClick={() => {
                setResult(null);
                setAnswers({});
              }}
            >
              Try again
            </button>
          )}
          <Button href={`/learn/${courseSlug}`} variant="ghost">
            Back to course
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {error ? <Notice tone="danger">{error}</Notice> : null}
      {questions.map((question, index) => (
        <fieldset key={question.id} className="rounded-2xl border border-line bg-white p-5">
          <legend className="font-medium text-ink">
            {index + 1}. {question.prompt}
          </legend>
          <div className="mt-4 space-y-2">
            {question.options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent px-3 py-2 text-sm hover:bg-brand-soft/60 has-[:checked]:border-brand/30 has-[:checked]:bg-brand-soft"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  className="mt-1"
                  checked={answers[question.id] === option.id}
                  onChange={() =>
                    setAnswers((current) => ({ ...current, [question.id]: option.id }))
                  }
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <Button type="submit" disabled={pending}>
        {pending ? "Scoring…" : "Submit quiz"}
      </Button>
    </form>
  );
}
