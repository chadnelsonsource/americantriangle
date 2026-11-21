import Link from "next/link";
import { cn } from "@/lib/utils";

export function Alert({
  tone = "info",
  children,
}: {
  tone?: "info" | "success" | "danger";
  children: React.ReactNode;
}) {
  const tones = {
    info: "border-line bg-paper text-ink",
    success: "border-pine bg-pine/10 text-pine",
    danger: "border-danger bg-danger/10 text-danger",
  };
  return (
    <div tabIndex={-1} role={tone === "danger" ? "alert" : "status"} className={cn("scroll-mt-24 rounded-md border px-4 py-3 text-sm", tones[tone])}>
      {children}
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-sm border border-line bg-card px-2 py-1 text-xs font-medium text-muted">{children}</span>;
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <article className={cn("surface p-6", className)}>{children}</article>;
}

export function Table({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className="surface max-w-full overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export function Th({ children }: { children: React.ReactNode }) {
  return <th className="border-b border-line px-4 py-3 font-medium text-muted">{children}</th>;
}

export function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("border-b border-line px-4 py-3 align-top", className)}>{children}</td>;
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: { href: string; label: string } }) {
  return (
    <div className="rounded-md border border-dashed border-line bg-card px-6 py-10">
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{body}</p>
      {action ? (
        <Link href={action.href} className="mt-4 inline-flex min-h-11 items-center text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-line/80", className)} />;
}

export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface p-4">
      <div className="eyebrow text-muted">{label}</div>
      <div className="mt-2 font-serif text-3xl">{value}</div>
    </div>
  );
}
