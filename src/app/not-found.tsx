import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">404</p>
      <h1 className="font-serif mt-3 text-4xl text-ink">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted">
        That URL is not in the {brand.name} catalog or LMS. Check the address or return home.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Home</Button>
        <Button href="/courses" variant="secondary">
          Courses
        </Button>
      </div>
    </Container>
  );
}
