import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeatureCard } from "@/components/marketing/cards";
import { UseCaseList } from "@/components/marketing/use-case";
import { CtaBand, PageHero, Section } from "@/components/marketing/sections";
import { pillars } from "@/config/catalog";
import { industries, industryBySlug, type IndustryPillar } from "@/config/industries";
import { pageMetadata } from "@/config/seo";
import { appUrl } from "@/config/site";

const pillarHref: Record<IndustryPillar, string> = {
  data: "/services/data",
  intelligence: "/services/intelligence",
  engineering: "/services/engineering",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};
  return pageMetadata(industry.title, industry.summary, `/industries/${industry.slug}`);
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();
  const used = new Set(industry.capabilities.map((item) => item.pillar));
  const related = pillars.filter((pillar) => used.has(pillar.href === "/services/data" ? "data" : pillar.href === "/services/intelligence" ? "intelligence" : "engineering"));
  const pageUrl = new URL(`/industries/${industry.slug}`, appUrl()).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: industry.title,
    description: industry.summary,
    url: pageUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Industry"
        title={industry.title}
        lede={industry.introduction}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/industries", label: "Industries" },
          { label: industry.title },
        ]}
      />
      <Section eyebrow="Challenges" title="What has to be named before the work starts.">
        <ul className="grid gap-4 md:grid-cols-2">
          {industry.challenges.map((item) => (
            <li key={item.title}>
              <FeatureCard title={item.title} body={item.body} />
            </li>
          ))}
        </ul>
      </Section>
      <Section eyebrow="Capabilities" title="The work Americantriangle can scope." lede="Each row says whether the first release stores it. A later row can be described in an inquiry. The inquiry does not start the work." className="pt-0">
        <ul className="grid gap-4 md:grid-cols-2">
          {industry.capabilities.map((item) => {
            const pillar = pillars.find((entry) => entry.href === pillarHref[item.pillar]);
            return (
              <li key={item.title}>
                <article className="surface h-full p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="eyebrow text-muted">{pillar?.role}</p>
                    <p className="eyebrow text-muted">{item.availability}</p>
                  </div>
                  <h3 className="mt-3 text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>
      <Section
        id="use-cases"
        eyebrow="Use cases"
        title="Potential applications. Not completed projects."
        lede="Each example starts from a business challenge. The operational value is the record the work would produce. It is not a measured result, and it is not a deployment."
        className="pt-0"
      >
        <UseCaseList items={industry.useCases} />
      </Section>
      <Section eyebrow="How the divisions apply" title="Use the division that matches the question." lede="The divisions below are the ones that fit this industry. A customer can start with one of them. Combining them is a choice, not a required sequence." className="pt-0">
        <ul className="grid gap-4 lg:grid-cols-3">
          {related.map((pillar) => (
            <li key={pillar.href}>
              <Link href={pillar.href} className="surface block h-full p-6 transition-colors hover:border-ink">
                <p className="eyebrow text-muted">{pillar.role}</p>
                <h3 className="mt-3 text-2xl">{pillar.title}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6">
                  {industry.capabilities
                    .filter((item) => pillarHref[item.pillar] === pillar.href)
                    .map((item) => (
                      <li key={item.title}>
                        {item.title}
                        <span className="mt-1 block text-muted">{item.availability}</span>
                      </li>
                    ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm leading-7 text-muted">{industry.limit}</p>
      </Section>
      <CtaBand
        eyebrow="Inquiry"
        title="Discuss this industry."
        body="Describe the material, the instruction, and the record you need. The inquiry is stored for the internal queue. It is not a contract."
        href="/consultation?type=general"
        label="Discuss Your Project"
      />
    </>
  );
}
