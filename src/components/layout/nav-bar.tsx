"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { signOutAction } from "@/app/actions/auth";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/about", label: `Why ${brand.name}` },
  { href: "/contact", label: "Contact" },
];

type Props = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  signOutAction: typeof signOutAction;
};

export function NavBar({ isLoggedIn, isAdmin, signOutAction }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-sm font-semibold text-white">
            {brand.name.charAt(0)}
          </span>
          <span className="font-serif text-xl tracking-tight text-ink">{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-muted md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link href="/dashboard" className="hover:text-ink">
              My courses
            </Link>
          ) : null}
          {isAdmin ? (
            <Link href="/admin" className="hover:text-ink">
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <form action={signOutAction}>
              <Button type="submit" variant="secondary">
                Sign out
              </Button>
            </form>
          ) : (
            <>
              <Button href="/signin" variant="ghost">
                Sign in
              </Button>
              <Button href="/signup">Get started</Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn("border-t border-line bg-paper md:hidden", open ? "block" : "hidden")}>
        <nav className="flex flex-col gap-1 px-4 py-3 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-ink-muted hover:bg-brand-soft hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-md px-2 py-2 text-ink-muted hover:bg-brand-soft hover:text-ink"
              onClick={() => setOpen(false)}
            >
              My courses
            </Link>
          ) : null}
          {isAdmin ? (
            <Link
              href="/admin"
              className="rounded-md px-2 py-2 text-ink-muted hover:bg-brand-soft hover:text-ink"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          ) : null}
          <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
            {isLoggedIn ? (
              <form action={signOutAction}>
                <Button type="submit" variant="secondary" className="w-full">
                  Sign out
                </Button>
              </form>
            ) : (
              <>
                <Button href="/signin" variant="secondary">
                  Sign in
                </Button>
                <Button href="/signup">Get started</Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
