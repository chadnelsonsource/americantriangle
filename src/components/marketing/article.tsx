import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/config/site";

const documents = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/trust", label: "Trust" },
  { href: "/contact", label: "Contact" },
] as const;

export function LegalNav({ current }: { current: (typeof documents)[number]["href"] }) {
  return (
    <nav aria-label="Related legal pages" className="mt-8">
      <ul className="flex flex-wrap gap-2">
        {documents.map((item) => (
          <li key={item.href}>
            <ButtonLink href={item.href} variant="chip" aria-current={item.href === current ? "page" : undefined}>
              {item.label}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function CounselNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="surface mt-8 p-5 text-sm leading-6">
      <p className="eyebrow text-muted">Counsel review required</p>
      <div className="mt-3 space-y-3 text-muted">{children}</div>
    </aside>
  );
}

export function MarketingArticle({
  eyebrow,
  title,
  lede,
  current,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  current: (typeof documents)[number]["href"];
  children: React.ReactNode;
}) {
  return (
    <article className="page py-16 md:py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
            { "@type": "ListItem", position: 2, name: title },
          ],
        }}
      />
      <p className="eyebrow text-muted">{eyebrow}</p>
      <h1 className="heading-display mt-4">{title}</h1>
      <p className="measure mt-5 text-base leading-7 text-muted">{lede}</p>
      <LegalNav current={current} />
      <div className="legal-doc mt-12 max-w-3xl">{children}</div>
    </article>
  );
}
