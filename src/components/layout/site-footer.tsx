import Link from "next/link";
import { brand } from "@/lib/brand";
import { Container } from "@/components/ui/section";

const footerLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/signin", label: "Learner sign in" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-ink">{brand.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-ink-muted">
            {brand.tagline}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Training
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Contact
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            {brand.email}
            <br />
            {brand.phone}
            <br />
            {brand.address}
          </p>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-4 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. All rights reserved.
          </p>
          <p>Training aligned with FDA Food Code principles. Not a regulatory license.</p>
        </Container>
      </div>
    </footer>
  );
}
