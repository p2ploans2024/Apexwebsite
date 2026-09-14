import {
  addLesson,
  addModule,
  addQuizQuestion,
  deleteLesson,
  deleteModule,
  deleteQuizQuestion,
  updateLesson,
  updateModule,
  updateQuizMeta,
} from "@/app/actions/admin";
import { Button } from "@/components/ui/button";

type Course = {
  id: string;
  modules: {
    id: string;
    title: string;
    description: string;
    sortOrder: number;
    lessons: {
      id: string;
      title: string;
      content: string;
      minutes: number;
      sortOrder: number;
    }[];
  }[];
  quizzes: {
    id: string;
    title: string;
    passPercent: number;
    questions: {
      id: string;
      prompt: string;
      options: { id: string; text: string; isCorrect: boolean }[];
    }[];
  }[];
};

export function CourseCurriculumEditor({ course }: { course: Course }) {
  const quiz = course.quizzes[0];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
        <h2 className="font-semibold text-ink">Modules & lessons</h2>
        <form action={addModule.bind(null, course.id)} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input
            name="title"
            placeholder="New module title"
            className="rounded-xl border border-line px-3 py-2 text-sm"
          />
          <input
            name="description"
            placeholder="Short description"
            className="rounded-xl border border-line px-3 py-2 text-sm"
          />
          <Button type="submit" variant="secondary">
            Add module
          </Button>
        </form>

        <div className="mt-8 space-y-8">
          {course.modules.map((module) => (
            <div key={module.id} className="rounded-2xl border border-line p-5">
              <form
                action={updateModule.bind(null, module.id, course.id)}
                className="grid gap-3 sm:grid-cols-2"
              >
                <input
                  name="title"
                  defaultValue={module.title}
                  className="rounded-xl border border-line px-3 py-2 text-sm font-medium"
                />
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={module.sortOrder}
                  className="rounded-xl border border-line px-3 py-2 text-sm"
                />
                <textarea
                  name="description"
                  defaultValue={module.description}
                  rows={2}
                  className="rounded-xl border border-line px-3 py-2 text-sm sm:col-span-2"
                />
                <Button type="submit" variant="secondary">
                  Save module
                </Button>
              </form>
              <form action={deleteModule.bind(null, module.id, course.id)} className="mt-2">
                <button type="submit" className="text-xs font-medium text-danger">
                  Delete module
                </button>
              </form>

              <ul className="mt-5 space-y-4">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id} className="rounded-xl bg-paper p-4">
                    <form
                      action={updateLesson.bind(null, lesson.id, course.id)}
                      className="space-y-2"
                    >
                      <input
                        name="title"
                        defaultValue={lesson.title}
                        className="w-full rounded-xl border border-line px-3 py-2 text-sm"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          name="minutes"
                          type="number"
                          defaultValue={lesson.minutes}
                          className="rounded-xl border border-line px-3 py-2 text-sm"
                        />
                        <input
                          name="sortOrder"
                          type="number"
                          defaultValue={lesson.sortOrder}
                          className="rounded-xl border border-line px-3 py-2 text-sm"
                        />
                      </div>
                      <textarea
                        name="content"
                        defaultValue={lesson.content}
                        rows={8}
                        className="w-full rounded-xl border border-line px-3 py-2 font-mono text-xs"
                      />
                      <Button type="submit" variant="secondary">
                        Save lesson
                      </Button>
                    </form>
                    <form action={deleteLesson.bind(null, lesson.id, course.id)} className="mt-2">
                      <button type="submit" className="text-xs font-medium text-danger">
                        Delete lesson
                      </button>
                    </form>
                  </li>
                ))}
              </ul>

              <form
                action={addLesson.bind(null, module.id, course.id)}
                className="mt-4 space-y-2 rounded-xl border border-dashed border-line p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Add lesson
                </p>
                <input
                  name="title"
                  placeholder="Lesson title"
                  className="w-full rounded-xl border border-line px-3 py-2 text-sm"
                />
                <input
                  name="minutes"
                  type="number"
                  defaultValue={8}
                  className="w-full rounded-xl border border-line px-3 py-2 text-sm"
                />
                <textarea
                  name="content"
                  placeholder="Markdown content"
                  rows={4}
                  className="w-full rounded-xl border border-line px-3 py-2 font-mono text-xs"
                />
                <Button type="submit" variant="ghost">
                  Add lesson
                </Button>
              </form>
            </div>
          ))}
        </div>
      </section>

      {quiz ? (
        <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <h2 className="font-semibold text-ink">Knowledge check</h2>
          <form
            action={updateQuizMeta.bind(null, quiz.id, course.id)}
            className="mt-4 flex flex-wrap items-end gap-3"
          >
            <label className="text-sm">
              Title
              <input
                name="title"
                defaultValue={quiz.title}
                className="mt-1 block rounded-xl border border-line px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              Pass %
              <input
                name="passPercent"
                type="number"
                defaultValue={quiz.passPercent}
                className="mt-1 block w-24 rounded-xl border border-line px-3 py-2 text-sm"
              />
            </label>
            <Button type="submit" variant="secondary">
              Save quiz settings
            </Button>
          </form>

          <ul className="mt-6 space-y-3">
            {quiz.questions.map((question, index) => (
              <li key={question.id} className="rounded-xl border border-line p-4 text-sm">
                <p className="font-medium">
                  {index + 1}. {question.prompt}
                </p>
                <ul className="mt-2 space-y-1 text-ink-muted">
                  {question.options.map((option) => (
                    <li key={option.id}>
                      {option.isCorrect ? "✓" : "○"} {option.text}
                    </li>
                  ))}
                </ul>
                <form action={deleteQuizQuestion.bind(null, question.id, course.id)} className="mt-2">
                  <button type="submit" className="text-xs text-danger">
                    Delete question
                  </button>
                </form>
              </li>
            ))}
          </ul>

          <form
            action={addQuizQuestion.bind(null, quiz.id, course.id)}
            className="mt-6 space-y-2 rounded-xl border border-dashed border-line p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Add question
            </p>
            <textarea
              name="prompt"
              placeholder="Question prompt"
              rows={2}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm"
            />
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correct"
                  value={index}
                  defaultChecked={index === 1}
                />
                <input
                  name={`option${index}`}
                  placeholder={`Option ${index}`}
                  className="flex-1 rounded-xl border border-line px-3 py-2 text-sm"
                />
              </div>
            ))}
            <Button type="submit" variant="ghost">
              Add question
            </Button>
          </form>
        </section>
      ) : null}
    </div>
  );
}
