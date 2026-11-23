import Link from "next/link";
import { CombinationDiagram } from "@/components/marketing/diagrams";
import { CtaBand, PageHero, Section } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { businessRequirements, combinedUses, engagements, solutionNav, solutions, technicalRequirements } from "@/config/solutions";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Enterprise solutions",
  "How Americantriangle can scope one division or combine data infrastructure, model evaluation, and enterprise applications around a requirement. These are potential engagements, not customer results.",
  "/solutions",
);

const fields = [
  ["Business problem", "problem"],
  ["Technical approach", "approach"],
  ["Potential implementation", "implementation"],
  ["Operational value", "value"],
] as const;

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise solutions"
        title="Start from the requirement."
        lede="Americantriangle can apply data infrastructure, model evaluation, and enterprise applications to one organizational requirement. Use one division, or combine them. Each division keeps its own record. Nothing on this page is a completed deployment, a customer list, or a measured result."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Enterprise solutions" },
        ]}
        actions={
          <>
            <ButtonLink href="/consultation?type=integrated" variant="accent">
              Request a consultation
            </ButtonLink>
            <ButtonLink href="#solutions" variant="secondary">
              Review the solutions
            </ButtonLink>
          </>
        }
      />
      <Section className="pb-0">
        <nav aria-label="Enterprise solutions">
          <ul className="flex flex-wrap gap-2">
            {solutionNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center border border-control px-4 text-sm hover:border-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>
      <Section
        id="requirements"
        eyebrow="Requirements"
        title="Business needs and technical constraints."
        lede="The same engagement can be named from the operation it has to support or from the record it has to produce. These are starting points, not a catalog of installed systems."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl">Business requirements</h3>
            <ul className="mt-5 space-y-3">
              {businessRequirements.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="surface block px-4 py-3 transition-colors hover:border-ink">
                    <span className="block text-sm">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted">{item.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl">Technical requirements</h3>
            <ul className="mt-5 space-y-3">
              {technicalRequirements.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="surface block px-4 py-3 transition-colors hover:border-ink">
                    <span className="block text-sm">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted">{item.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section
        id="together"
        eyebrow="Three divisions"
        title="Combine them only when the requirement needs more than one record."
        lede="Data infrastructure produces reviewed data. Model intelligence records a judgment. Enterprise applications ship a scoped system. An industry page stays with its domain. This page is for a requirement that may cross those lines."
        className="pt-0"
      >
        <CombinationDiagram />
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <Link href="/services/data" className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink">
              AI Data Infrastructure
            </Link>
          </li>
          <li>
            <Link href="/services/intelligence" className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink">
              AI Model Training, Research & Evaluation
            </Link>
          </li>
          <li>
            <Link href="/services/engineering" className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink">
              Enterprise AI Applications
            </Link>
          </li>
        </ul>
      </Section>
      <Section
        id="solutions"
        eyebrow="Solutions"
        title="Eight ways a requirement can be scoped."
        lede="Each solution names the problem, the approach, the divisions that can hold a record, and the limit of the first release. Open the service page for the catalog. Open a consultation when the requirement is ready to describe."
        className="pt-0"
      >
        <ol className="space-y-6">
          {solutions.map((item) => (
            <li id={item.id} key={item.id} className="surface scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-5">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="eyebrow text-muted">{item.availability}</p>
              </div>
              <dl className="grid gap-6 px-6 py-6 md:grid-cols-2">
                {fields.map(([label, key]) => (
                  <div key={key}>
                    <dt className="eyebrow text-muted">{label}</dt>
                    <dd className="mt-2 text-sm leading-6">{item[key]}</dd>
                  </div>
                ))}
                <div className="md:col-span-2">
                  <dt className="eyebrow text-muted">Business pillars</dt>
                  <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {item.pillars.map((pillar) => (
                      <Link key={pillar.label} href={pillar.href} className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink">
                        {pillar.label}
                      </Link>
                    ))}
                  </dd>
                </div>
              </dl>
              <p className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-6 py-4 text-sm">
                <Link href={item.serviceHref} className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink">
                  {item.serviceLabel}
                </Link>
                <Link href={`/consultation?type=${item.inquiry}`} className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink">
                  Request a consultation
                </Link>
              </p>
            </li>
          ))}
        </ol>
      </Section>
      <Section
        id="use-cases"
        eyebrow="Use cases"
        title="What a combined requirement can look like."
        lede="These are potential applications. They are not completed customer projects, and they do not have to use every division."
        className="pt-0"
      >
        <ol className="grid gap-4 lg:grid-cols-3">
          {combinedUses.map((item) => (
            <li key={item.title} className="surface flex flex-col p-6">
              <h3 className="text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
              <ul className="mt-5 space-y-1 text-sm">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>
      <Section
        id="engagements"
        eyebrow="Engagements"
        title="How a conversation can start."
        lede="An engagement model here is a way to name the work. It is not a price, a service level, or a statement that a project has already been delivered."
        className="pt-0"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {engagements.map((item) => (
            <li key={item.title} className="surface flex flex-col p-6">
              <h3 className="text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
              <p className="mt-5">
                <Link href={item.href} className="inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4 hover:decoration-ink">
                  {item.label}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand
        eyebrow="Consultation"
        title="Describe the requirement."
        body="The inquiry is stored for the internal queue. Discovery, a recommendation, and an estimate come later. The form is not a contract, and it does not claim a result."
        href="/consultation?type=integrated"
        label="Request a consultation"
      />
    </>
  );
}
