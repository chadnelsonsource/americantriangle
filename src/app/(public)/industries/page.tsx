import Link from "next/link";
import { IndustryCard } from "@/components/marketing/cards";
import { IndustryIcon } from "@/components/marketing/industry-icon";
import { CtaBand, PageHero, Section } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { pillars } from "@/config/catalog";
import { casesForPillar, industries, type IndustryPillar } from "@/config/industries";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Industry solutions",
  "Americantriangle can scope data infrastructure, model evaluation, and enterprise applications for healthcare, finance, software, education, manufacturing, and retail. These are potential engagements, not customer results.",
  "/industries",
);

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="AI Solutions Built Around Real Industry Challenges."
        lede="From high-quality data and advanced model evaluation to intelligent enterprise applications, Americantriangle helps organizations turn AI capabilities into practical solutions. A customer can use one division or combine them. These are domains that can be scoped, not a client list."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Industries" },
        ]}
        actions={
          <>
            <ButtonLink href="#industry-overview" variant="accent">
              Explore Our Solutions
            </ButtonLink>
            <ButtonLink href="/consultation?type=general" variant="secondary" className="border-white/25 bg-transparent text-[#f6f3ec] hover:border-white">
              Talk to Our Team
            </ButtonLink>
          </>
        }
      />
      <Section id="industry-overview" eyebrow="Six industries" title="Choose the domain. Then choose the work.">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <IndustryCard
                id={industry.slug}
                href={`/industries/${industry.slug}`}
                title={industry.title}
                summary={industry.summary}
                applications={industry.applications}
                icon={<IndustryIcon slug={industry.slug} />}
              />
            </li>
          ))}
        </ul>
        <p id="professional" className="mt-8 max-w-3xl text-sm leading-7 text-muted">
          Professional services work, including legal and business operations tasks, can still be scoped with written instructions. That work is operational support, not representation.{" "}
          <Link href="/consultation?type=general" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            Start an inquiry.
          </Link>
        </p>
      </Section>
      <Section id="use-cases" eyebrow="Use cases" title="Start from the challenge." lede="These are potential applications, grouped by the division that would own the record. Open one to see the challenge, the approach, and the limit. None of them is a completed customer project." className="pt-0">
        <div className="grid gap-10 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const key: IndustryPillar = pillar.href === "/services/data" ? "data" : pillar.href === "/services/intelligence" ? "intelligence" : "engineering";
            return (
              <div key={pillar.href}>
                <h3 className="text-2xl">{pillar.title}</h3>
                <p className="eyebrow mt-2 text-muted">{pillar.role}</p>
                <ul className="mt-5 space-y-3">
                  {casesForPillar(key).map(({ industry, useCase }) => (
                    <li key={`${industry.slug}-${useCase.id}`}>
                      <Link href={`/industries/${industry.slug}#${useCase.id}`} className="surface group block px-4 py-3 transition-colors hover:border-ink">
                        <span className="block text-sm">{useCase.title}</span>
                        <span className="mt-1 block text-xs text-muted">
                          {industry.title} · {useCase.availability}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>
      <Section eyebrow="One company" title="Three divisions. Use one, or combine them." lede="An industry problem does not have to move through every division. Data infrastructure, model intelligence, and enterprise applications can be engaged on their own. A requirement that crosses divisions is described on the enterprise solutions page." className="pt-0">
        <ul className="grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <li key={pillar.href}>
              <Link href={pillar.href} className="surface block h-full p-6 transition-colors hover:border-ink">
                <p className="eyebrow text-muted">{pillar.role}</p>
                <h3 className="mt-3 text-2xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{pillar.body}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-6">
          <Link href="/solutions" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            Read the enterprise solutions overview.
          </Link>
        </p>
      </Section>
      <CtaBand
        eyebrow="Next step"
        title="Let's Explore What AI Can Do for Your Industry."
        body="Tell us about your organization's challenges and explore how Americantriangle's AI capabilities may support your objectives. The inquiry is stored for the internal queue. It is not a contract, and it does not claim a result."
        href="/consultation?type=general"
        label="Discuss Your Project"
      />
    </>
  );
}
