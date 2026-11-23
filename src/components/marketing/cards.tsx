import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="surface reveal p-5">
      <h3 className="text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </article>
  );
}

export function SolutionCard({
  href,
  role,
  title,
  body,
  points,
  tone,
}: {
  href: string;
  role?: string;
  title: string;
  body: string;
  points: readonly string[];
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      className={cn(
        "reveal flex min-h-80 flex-col rounded-md p-7 transition-colors md:p-8",
        dark ? "rounded-2xl border border-white/15 bg-night text-band hover:border-accent" : "surface text-ink",
      )}
    >
      {role ? <p className={cn("eyebrow", dark ? "text-band/75" : "text-muted")}>{role}</p> : null}
      <div className={cn("flex items-start justify-between gap-4", role && "mt-4")}>
        <h3 className="text-2xl">{title}</h3>
        <span aria-hidden className={cn("text-lg", dark ? "text-accent" : "text-copper")}>
          ↗
        </span>
      </div>
      <p className={cn("mt-4 max-w-md text-sm leading-6", dark ? "text-band/80" : "text-muted")}>{body}</p>
      <ul className="mt-8 space-y-3 text-sm">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className={dark ? "text-band/80" : "text-ink"}>{point}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}

export function IndustryCard({
  id,
  href,
  title,
  summary,
  applications,
  icon,
}: {
  id: string;
  href: string;
  title: string;
  summary: string;
  applications: readonly string[];
  icon: ReactNode;
}) {
  return (
    <article id={id} className="h-full">
      <Link
        href={href}
        className="surface reveal flex h-full flex-col p-6 text-ink"
      >
        {icon}
        <h3 className="mt-5 text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{summary}</p>
        <ul className="mt-6 space-y-2 text-sm">
          {applications.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <span className="mt-6 text-sm">View the industry</span>
      </Link>
    </article>
  );
}

export function BlogCard({
  href,
  category,
  meta,
  title,
  summary,
}: {
  href: string;
  category: string;
  meta: string;
  title: string;
  summary: string;
}) {
  return (
    <article className="surface reveal">
      <Link href={href} className="block p-6 transition-colors hover:bg-paper">
        <p className="eyebrow text-muted">
          {category} · {meta}
        </p>
        <h2 className="mt-3 text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{summary}</p>
      </Link>
    </article>
  );
}

type Demonstration = {
  verified: false;
  title: string;
  body: ReactNode;
};

type VerifiedCase = {
  verified: true;
  title: string;
  body: ReactNode;
  client: string;
};

export function CaseStudyCard(item: Demonstration | VerifiedCase) {
  if (!item.verified) {
    return (
      <aside className="surface reveal px-5 py-5">
        <p className="eyebrow text-copper">Illustrative scenario</p>
        <h3 className="mt-3 text-xl">{item.title}</h3>
        <div className="mt-3 text-sm leading-6 text-muted">{item.body}</div>
        <p className="mt-3 text-xs text-muted">A demonstration of the workflow. Not a customer result.</p>
      </aside>
    );
  }
  return (
    <article className="surface reveal p-6">
      <p className="eyebrow text-muted">Customer record · {item.client}</p>
      <h3 className="mt-3 text-xl">{item.title}</h3>
      <div className="mt-3 text-sm leading-6 text-muted">{item.body}</div>
    </article>
  );
}
