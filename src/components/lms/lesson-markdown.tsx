import Markdown from "react-markdown";

export function LessonMarkdown({ content }: { content: string }) {
  return (
    <div className="prose prose-apex max-w-none prose-headings:font-serif prose-h3:text-2xl prose-p:leading-7 prose-li:leading-7 prose-table:text-sm">
      <Markdown>{content}</Markdown>
    </div>
  );
}
