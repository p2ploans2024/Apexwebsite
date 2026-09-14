import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-dark shadow-sm focus-visible:outline-brand",
  secondary:
    "bg-white text-ink border border-line hover:border-brand/40 hover:bg-brand-soft/60",
  ghost: "text-brand hover:bg-brand-soft",
  danger: "bg-danger text-white hover:bg-red-900",
  gold: "bg-gold text-white hover:bg-[#8d6828]",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
