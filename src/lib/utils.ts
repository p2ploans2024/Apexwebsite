export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function parseLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

export function linesToText(lines: string[]): string {
  return lines.join("\n");
}

export function getAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    process.env.AUTH_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}
