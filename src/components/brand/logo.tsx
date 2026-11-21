import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ wordmark = true, tone = "default" }: { wordmark?: boolean; tone?: "default" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", tone === "light" ? "text-[#f6f3ec]" : "text-ink")}>
      <svg width="18" height="16" viewBox="0 0 22 20" aria-hidden="true">
        <path d="M11 1.4 20.6 18.6H1.4L11 1.4Z" fill="currentColor" />
      </svg>
      {wordmark ? <span className="font-sans text-[15px] font-medium tracking-tight">Americantriangle</span> : <span className="sr-only">Americantriangle</span>}
    </span>
  );
}

export function LogoLink({ tone = "default" }: { tone?: "default" | "light" }) {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center rounded-sm">
      <Logo tone={tone} />
    </Link>
  );
}
