import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="py-16">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Contact
          </p>
          <h1 className="font-serif mt-3 text-4xl tracking-tight text-ink">
            Tell us how you train your team.
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-ink-muted">
            For group rates, content questions, or onboarding help, send a note. Messages are
            stored for the {brand.name} training desk (MVP — no email blast required).
          </p>
          <dl className="mt-10 space-y-4 text-sm text-ink">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">Email</dt>
              <dd className="mt-1">{brand.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">Phone</dt>
              <dd className="mt-1">{brand.phone}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">Office</dt>
              <dd className="mt-1">{brand.address}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-muted">Hours</dt>
              <dd className="mt-1">{brand.hours}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
