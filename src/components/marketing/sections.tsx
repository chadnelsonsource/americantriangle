import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CaseStudyCard } from "@/components/marketing/cards";
import { ButtonLink } from "@/components/ui/button";
import type { CatalogItem } from "@/config/catalog";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "ink",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  tone?: "ink" | "paper";
}) {
  const light = tone === "paper";
  return (
    <div>
      {eyebrow ? <p className={cn("eyebrow", light ? "text-band/75" : "text-muted")}>{eyebrow}</p> : null}
      <h2 className={cn("heading-title", eyebrow ? "mt-4" : undefined, light && "text-band")}>{title}</h2>
      {lede ? <p className={cn("measure mt-4 leading-7", light ? "text-band/80" : "text-muted")}>{lede}</p> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  actions?: React.ReactNode;
  crumbs?: readonly { href?: string; label: string }[];
}) {
  return (
    <section className="border-b border-line bg-canvas text-ink">
      <div className="page py-16 md:py-20">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="heading-display mt-4">{title}</h1>
        <p className="measure mt-5 text-base leading-7 text-muted">{lede}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("page py-16 md:py-24", className)}>
      {title ? <SectionHeading eyebrow={eyebrow} title={title} lede={lede} /> : eyebrow ? <p className="eyebrow text-muted">{eyebrow}</p> : null}
      <div className={title || lede ? "mt-10" : undefined}>{children}</div>
    </section>
  );
}

function CatalogRow({ item }: { item: CatalogItem }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-2xl">{item.title}</h3>
        <span className="eyebrow text-muted">{item.availability}</span>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-6">{item.receives}</p>
      <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">{item.work}</p>
    </>
  );
}

export function CatalogList({ items }: { items: CatalogItem[] }) {
  return (
    <ul className="divide-y divide-line/80">
      {items.map((item) => (
        <li key={item.title}>
          {item.href ? (
            <Link href={item.href} className="block rounded-2xl px-4 py-6 transition-colors hover:bg-card">
              <CatalogRow item={item} />
            </Link>
          ) : (
            <div className="px-4 py-6">
              <CatalogRow item={item} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export function InquiryLayout({
  title,
  intro,
  notes,
  children,
}: {
  title: string;
  intro: React.ReactNode;
  notes: readonly { question: string; answer: string }[];
  children: React.ReactNode;
}) {
  return (
    <Section>
      <div className="max-w-2xl">
        <h2 className="heading-title">{title}</h2>
        <div className="mt-4 text-sm leading-6 text-muted">{intro}</div>
      </div>
      <ul className={cn("mt-8 grid items-stretch gap-4", notes.length > 3 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {notes.map((note) => (
          <li key={note.question} className="rounded-2xl border border-line bg-card p-5">
            <h3 className="text-lg leading-snug">{note.question}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{note.answer}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-2xl border border-line bg-card p-6 md:p-8">
        {children}
      </div>
    </Section>
  );
}

export function SplitPanel({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  aside: React.ReactNode;
}) {
  return (
    <section className="page grid items-start gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="measure mt-5 space-y-4 text-base leading-7 text-muted">{children}</div>
      </div>
      <div>{aside}</div>
    </section>
  );
}

export function ProcessRow({ steps }: { steps: readonly (readonly [string, string, string])[] }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(([step, title, body]) => (
        <li key={step} className="surface p-5">
          <p className="font-serif text-sm text-copper">{step}</p>
          <h3 className="mt-3 text-2xl">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Scenario({ title = "How the work would be recorded", children }: { title?: string; children: React.ReactNode }) {
  return <CaseStudyCard verified={false} title={title} body={children} />;
}

export function CtaBand({
  eyebrow,
  title,
  body,
  href,
  label,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <section className="page pb-20">
      <div className="rounded-2xl bg-night px-7 py-10 text-band md:px-10 md:py-12">
        <p className="eyebrow text-band/75">{eyebrow}</p>
        <h2 className="heading-title mt-4 text-band">{title}</h2>
        <p className="measure mt-4 text-sm leading-6 text-band/80">{body}</p>
        <div className="mt-8">
          <ButtonLink href={href} variant="accent">
            {label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
