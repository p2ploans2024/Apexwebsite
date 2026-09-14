import { requireAdmin } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import Link from "next/link";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();
  return (
    <>
      <div className="border-b border-line bg-white">
        <Container className="flex flex-wrap items-center gap-4 py-3 text-sm">
          <Link href="/admin" className="font-semibold text-ink">
            Admin
          </Link>
          <Link href="/admin/courses" className="text-ink-muted hover:text-ink">
            Courses
          </Link>
          <Link href="/admin/enrollments" className="text-ink-muted hover:text-ink">
            Enrollments
          </Link>
          <div className="ml-auto">
            <Button href="/admin/courses/new" variant="ghost">
              New course
            </Button>
          </div>
        </Container>
      </div>
      {children}
    </>
  );
}
