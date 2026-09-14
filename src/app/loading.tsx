import { Container } from "@/components/ui/section";

export default function Loading() {
  return (
    <Container className="py-20">
      <div className="h-8 w-48 animate-pulse rounded bg-line" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="h-56 animate-pulse rounded-2xl bg-line/70" />
        <div className="h-56 animate-pulse rounded-2xl bg-line/70" />
        <div className="h-56 animate-pulse rounded-2xl bg-line/70" />
      </div>
    </Container>
  );
}
