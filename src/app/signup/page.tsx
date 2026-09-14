import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = { title: "Create account" };

export default async function SignUpPage({
  searchParams,
}: PageProps<"/signup">) {
  const params = await searchParams;
  const callbackUrl =
    typeof params.callbackUrl === "string" ? params.callbackUrl : "/dashboard";

  return (
    <div className="py-16">
      <Container className="max-w-md">
        <h1 className="font-serif text-3xl tracking-tight text-ink">Create your account</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Already enrolled?{" "}
          <Link
            href={`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="font-semibold text-brand"
          >
            Sign in
          </Link>
        </p>
        <div className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-8">
          <SignUpForm callbackUrl={callbackUrl} />
        </div>
      </Container>
    </div>
  );
}
