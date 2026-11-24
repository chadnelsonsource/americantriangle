import { CatalogList, CtaBand, PageHero, Scenario, Section } from "@/components/marketing/sections";
import { ServiceJsonLd } from "@/components/seo/json-ld";
import type { CatalogItem } from "@/config/catalog";
import type { InquiryType } from "@/services/leads";

export function OfferPage({
  eyebrow,
  title,
  lede,
  items,
  scenario,
  inquiry,
  limit,
  parentHref,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  items: CatalogItem[];
  scenario: string;
  inquiry: InquiryType;
  limit: string;
  parentHref?: string;
}) {
  const parent = parentHref || items[0]?.href.split("/").slice(0, 3).join("/") || "/";
  const path = items[0]?.href;
  return (
    <>
      {path ? <ServiceJsonLd name={title} description={lede} path={path} /> : null}
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        crumbs={[
          { href: "/", label: "Home" },
          { href: parent, label: eyebrow },
          { label: title.replace(/\.$/, "") },
        ]}
      />
      <Section eyebrow="What is in scope" title="Named work, with a record of who did it.">
        <CatalogList items={items.map((item) => ({ ...item, href: "" }))} />
      </Section>
      <Section className="pt-0">
        <div className="grid gap-8 md:grid-cols-2">
          <Scenario>
            <p>{scenario}</p>
          </Scenario>
          <div>
            <h2 className="text-2xl">First-release limit</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{limit}</p>
          </div>
        </div>
      </Section>
      <CtaBand
        eyebrow="Next step"
        title="Describe the service. It is not a contract."
        body="The inquiry is stored for the internal queue. Consent is required before anyone is contacted about it."
        href={`/consultation?type=${inquiry}`}
        label="Request a consultation"
      />
    </>
  );
}
