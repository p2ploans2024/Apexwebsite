import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Why us",
};

const pillars = [
  {
    title: "Operators, not entertainers",
    body: `${brand.name} is written for kitchens, catering lines, school nutrition, and healthcare cafés. The tone is professional because the consequences are.`,
  },
  {
    title: "A full training loop",
    body: "Marketing pages, purchase, enrollment, lessons, quizzes, and certificates live in one product. Managers are not stitching together a slide deck and a spreadsheet.",
  },
  {
    title: "Honest about credentials",
    body: "Completion here documents training. It is not a government permit or a substitute for any exam your jurisdiction requires. We teach the underlying practice either way.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          About {brand.name}
        </p>
        <h1 className="font-serif mt-3 text-4xl tracking-tight text-ink sm:text-5xl">
          Food safety training with the seriousness of the work.
        </h1>
        <p className="mt-6 text-lg leading-8 text-ink-muted">{brand.tagline}</p>
        <div className="mt-10 space-y-6 text-base leading-8 text-ink">
          <p>
            {brand.legalName} helps restaurants and institutions train people who handle food.
            We built an online catalog and a learning management system together so a new hire
            can buy a seat, complete modules, pass a knowledge check, and produce a certificate
            without leaving the site.
          </p>
          <p>
            Curriculum follows FDA Food Code principles, HACCP-style controls, and allergen
            procedures used in professional foodservice. Lessons use the language of the line:
            danger zone, date marks, bare-hand contact, and what to do when a guest names an
            allergen during a rush.
          </p>
        </div>
        <div className="mt-12 grid gap-5">
          {pillars.map((item) => (
            <div key={item.title} className="rounded-2xl border border-line bg-white p-6">
              <h2 className="font-semibold text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/courses">View the catalog</Button>
          <Button href="/contact" variant="secondary">
            Talk with {brand.name}
          </Button>
        </div>
      </Container>
    </div>
  );
}
