import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { SignInForm } from "@/components/auth/sign-in-form";
import { Container, Notice } from "@/components/ui/section";

export const metadata: Metadata = { title: "Sign in" };

export default async function SignInPage({
  searchParams,
}: PageProps<"/signin">) {
  const params = await searchParams;
  const callbackUrl =
    typeof params.callbackUrl === "string" ? params.callbackUrl : "/dashboard";

  return (
    <div className="py-16">
      <Container className="max-w-md">
        <h1 className="font-serif text-3xl tracking-tight text-ink">Sign in</h1>
        <p className="mt-2 text-sm text-ink-muted">
          New here?{" "}
          <Link
            href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="font-semibold text-brand"
          >
            Create a learner account
          </Link>
        </p>
        <div className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-8">
          <SignInForm callbackUrl={callbackUrl} />
        </div>
        <div className="mt-6">
          <Notice>
            Demo admin: <strong>{brand.demo.adminEmail}</strong>
            <br />
            Demo learner: <strong>{brand.demo.learnerEmail}</strong>
            <br />
            Password for both: <strong>{brand.demo.password}</strong>
          </Notice>
        </div>
      </Container>
    </div>
  );
}
