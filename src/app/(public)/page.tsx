import Link from "next/link";
import { FeatureCard, SolutionCard } from "@/components/marketing/cards";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { CapabilityCycle } from "@/components/marketing/capability-cycle";
import { WorkflowDiagram } from "@/components/marketing/diagrams";
import { ButtonLink } from "@/components/ui/button";
import { pillars } from "@/config/catalog";
import { industries } from "@/config/industries";
import { site } from "@/config/site";

const capabilities = [
  ["/services/data/annotation", "Data annotation"],
  ["/services/data/feedback", "Human feedback"],
  ["/services/data/evaluation", "Model evaluation"],
  ["/services/engineering/applications", "AI applications"],
  ["/services/engineering/agents", "Agents"],
] as const;

const serviceIndex = [
  ["/services/data/annotation", "Annotation and collection", "Labels, classification, prompts, and fine-tuning examples."],
  ["/services/data/feedback", "Human feedback", "Rankings and pairwise preferences. The record is the preference set, not a training run."],
  ["/services/intelligence", "AI Model Training, Research & Evaluation", "Evaluation is available now. Training, research, and safety review are scoped engagements."],
  ["/services/engineering/applications", "Applications", "Custom applications, language-model products, retrieval, and consulting."],
  ["/services/engineering/agents", "Agents and automation", "Agents, workflows, integrations, and a recorded handoff."],
] as const;

const stages = [
  ["01", "Requested", "An inquiry names the service, the material, and the constraints."],
  ["02", "Proposed", "The delivery team turns that inquiry into a scope the client can see."],
  ["03", "Production", "Qualified contributors receive assigned work. A different person reviews it."],
  ["04", "Delivery", "Approved work, files, and invoices stay inside that client organization."],
];

const quality = [
  ["Human experts", "Contributors complete a profile and an assessment before they see paid work."],
  ["Independent review", "The first release uses one review layer: someone other than the author scores the work."],
  ["Quality record", "Accept, return, and reject decisions stay with the submission."],
  ["Data isolation", "A client organization sees its own projects, files, and invoices."],
  ["Separate payout states", "An invoice does not mark work paid. Approval and payout stay separate."],
  ["Audit events", "Account and operational actions can be written to an audit record."],
];

export default function HomePage() {
  return (
    <div className="bg-canvas text-ink">
      <OrganizationJsonLd />
      <section className="bg-night text-band">
        <div className="page pb-10 pt-16 md:pt-20">
          <p className="eyebrow text-band/75">Data infrastructure · Model intelligence · Enterprise applications</p>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
            <div className="min-w-0">
              <h1 className="heading-display text-band">
                The human layer behind
                <span className="mt-1 block font-serif italic text-accent">reliable AI.</span>
              </h1>
              <p className="measure mt-6 text-sm leading-6 text-band/80 md:text-base">{site.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/consultation" variant="accent">
                  Request a consultation
                </ButtonLink>
                <ButtonLink href="/solutions" variant="secondary" tone="night">
                  Enterprise solutions
                </ButtonLink>
              </div>
              <p className="mt-3">
                <Link href="/contributors/join" className="inline-flex min-h-11 items-center text-sm text-band/80 underline decoration-white/40 underline-offset-4 hover:text-band hover:decoration-band">
                  Apply as an expert
                </Link>
              </p>
            </div>
            <HeroVisual />
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-1 border-t border-white/10 py-3 text-band/75">
            {capabilities.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="eyebrow inline-flex min-h-11 items-center gap-2 hover:text-band">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page py-16 md:py-24">
        <p className="eyebrow text-muted">Three divisions</p>
        <h2 className="heading-title mt-4">Data, intelligence, and implementation.</h2>
        <p className="measure mt-5 leading-7 text-muted">
          Open a division for its catalog. The next section shows when a requirement can use more than one division, and when each record stays separate.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pillars.map((division) => (
            <SolutionCard key={division.href} {...division} />
          ))}
        </div>
      </section>

      <CapabilityCycle />

      <section className="page pb-16 md:pb-24">
        <p className="eyebrow text-muted">Services</p>
        <h2 className="heading-title mt-4">Choose the work by its name.</h2>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {serviceIndex.map(([href, title, body]) => (
            <li key={href}>
              <Link href={href} className="grid gap-2 py-5 lg:grid-cols-[16rem_1fr] lg:items-baseline lg:gap-8">
                <h3 className="text-2xl">{title}</h3>
                <p className="text-sm leading-6 text-muted">{body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="page pb-16">
        <p className="eyebrow text-muted">Industries</p>
        <h2 className="heading-title mt-4">Domains that can be scoped. Not a client list.</h2>
        <p className="measure mt-5 leading-7 text-muted">
          Each industry page states potential use cases. None of them is a completed customer project.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <ButtonLink href={`/industries/${industry.slug}`} variant="chip">
                {industry.title}
              </ButtonLink>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-6">
          <Link href="/industries#use-cases" className="inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            See the use cases
          </Link>
        </p>
      </section>

      <section className="page pb-16 md:pb-24">
        <h2 className="heading-title">How an engagement is recorded.</h2>
        <div className="surface mt-10 hidden px-4 py-6 lg:block">
          <WorkflowDiagram />
        </div>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map(([step, title, body]) => (
            <li key={step}>
              <p className="font-serif text-sm text-copper">{step}</p>
              <h3 className="mt-3 text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm leading-6">
          <Link href="/consultation" className="inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            Request a consultation
          </Link>
        </p>
      </section>

      <section className="page grid gap-10 pb-16 md:pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-muted">How work is judged</p>
          <h2 className="heading-title mt-4">Quality is a system, not a promise.</h2>
          <p className="measure mt-5 leading-7 text-muted">Every claim on this page maps to a record the platform can store: a person, a review, a file, or a payment state.</p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm leading-6">
            <Link href="/quality" className="inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              Quality across the three divisions
            </Link>
            <Link href="/trust" className="inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              Trust controls
            </Link>
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {quality.map(([title, body]) => (
            <li key={title}>
              <FeatureCard title={title} body={body} />
            </li>
          ))}
        </ul>
      </section>

      <section className="page pb-16">
        <p className="eyebrow text-muted">Writing</p>
        <h2 className="heading-title mt-4">Insights publish only finished articles.</h2>
        <p className="measure mt-5 leading-7 text-muted">
          The article catalog is empty. Method notes explain how a preference, a review, and a milestone are recorded.
        </p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm leading-6">
          <Link href="/insights" className="inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            Insights
          </Link>
          <Link href="/resources" className="inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            Method notes
          </Link>
        </p>
      </section>

      <section className="page grid gap-4 pb-16 md:grid-cols-2 md:pb-24">
        <div className="rounded-md bg-night px-7 py-8 text-band md:px-8 md:py-10">
          <p className="eyebrow text-band/75">For organizations</p>
          <h2 className="mt-4 max-w-md text-3xl text-band">Have a system to evaluate, build, or ship?</h2>
          <p className="measure mt-4 text-sm leading-6 text-band/80">Describe the service. The inquiry is stored for the internal queue. It is not a contract.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/consultation" variant="accent">
              Request a consultation
            </ButtonLink>
            <Link href="/solutions" className="inline-flex min-h-11 items-center text-sm text-band underline decoration-white/40 underline-offset-4 hover:decoration-band">
              Enterprise solutions
            </Link>
          </div>
        </div>
        <div className="surface px-7 py-8 md:px-8 md:py-10">
          <p className="eyebrow text-muted">For experts</p>
          <h2 className="mt-4 max-w-md text-3xl">Put your expertise on reviewed work.</h2>
          <p className="measure mt-4 text-sm leading-6 text-muted">
            Apply, complete a profile, and pass an assessment before paid tasks are assigned.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contributors/join" variant="primary">
              Apply as an expert
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
