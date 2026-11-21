import { FeatureCard } from "@/components/marketing/cards";
import { CatalogList, CtaBand, PageHero, Scenario, Section } from "@/components/marketing/sections";
import type { CatalogItem } from "@/config/catalog";

type Point = { title: string; body: string };

export function DivisionOverview({
  eyebrow,
  title,
  lede,
  crumbs,
  capabilityTitle,
  capabilityLede,
  capabilities,
  problemTitle,
  problemLede,
  problems,
  useCases,
  approachTitle,
  approach,
  catalogTitle,
  catalogLede,
  catalog,
  cta,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  crumbs: readonly { href?: string; label: string }[];
  capabilityTitle: string;
  capabilityLede: string;
  capabilities: readonly Point[];
  problemTitle: string;
  problemLede: string;
  problems: readonly Point[];
  useCases: readonly Point[];
  approachTitle: string;
  approach: readonly string[];
  catalogTitle: string;
  catalogLede: string;
  catalog: CatalogItem[];
  cta: { eyebrow: string; title: string; body: string; href: string; label: string };
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} crumbs={crumbs} />
      <Section eyebrow="Capabilities" title={capabilityTitle} lede={capabilityLede}>
        <ul className="grid gap-4 md:grid-cols-2">
          {capabilities.map((item) => (
            <li key={item.title}>
              <FeatureCard title={item.title} body={item.body} />
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="Problems" title={problemTitle} lede={problemLede}>
        <ul className="grid gap-4 md:grid-cols-2">
          {problems.map((item) => (
            <li key={item.title}>
              <FeatureCard title={item.title} body={item.body} />
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="Use cases" title="Illustrations of the record. Not customer results.">
        <div className="grid gap-4 lg:grid-cols-2">
          {useCases.map((item) => (
            <Scenario key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Scenario>
          ))}
        </div>
      </Section>
      <Section eyebrow="Approach" title={approachTitle}>
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted">
          {approach.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
      <Section eyebrow="Catalog" title={catalogTitle} lede={catalogLede}>
        <CatalogList items={catalog} />
      </Section>
      <CtaBand {...cta} />
    </>
  );
}
