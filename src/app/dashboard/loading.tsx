import { Container } from "@/components/ui/section";

export default function DashboardLoading() {
  return (
    <Container className="py-16">
      <div className="h-8 w-64 animate-pulse rounded bg-line" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="h-48 animate-pulse rounded-2xl bg-line/70" />
        <div className="h-48 animate-pulse rounded-2xl bg-line/70" />
      </div>
    </Container>
  );
}
