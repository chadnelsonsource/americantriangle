import Link from "next/link";
import { BlogCard, FeatureCard, SolutionCard } from "@/components/marketing/cards";
import { FaqList } from "@/components/marketing/faq";
import { CapabilityCycle } from "@/components/marketing/capability-cycle";
import { WorkflowDiagram } from "@/components/marketing/diagrams";
import { HeroReel } from "@/components/marketing/hero-reel";
import { ButtonLink } from "@/components/ui/button";
import { notes, readingMinutes } from "@/content/notes";
import { brandBridge, brandPhilosophy } from "@/config/brand";
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
  ["04", "Delivery", "The client receives the agreed record. Sending the inquiry is not that delivery."],
];

const startingPoints = [
  {
    question: "Where should I start?",
    answer: "Describe the requirement on the consultation form and choose the closest division, or an integrated engagement when more than one record is needed. The form is not a contract, a quote, or a start date.",
  },
  {
    question: "Can the work stay in one division?",
    answer: "Yes. Reviewed data, an evaluation, and an application project each stand on their own. Combining them is a choice made in the scope, not a path every customer has to follow.",
  },
  {
    question: "Does preparing data train a model?",
    answer: "No. Annotation, preference rankings, and prepared examples are records a person can review. Evaluation is available now. Training, research, and safety review start only when that engagement is scoped.",
  },
  {
    question: "What happens after I submit?",
    answer: "The inquiry is sent by email. It does not assign a contributor, set a rate, or create the project. A collaboration uses the partnership form. An expert uses the application form.",
  },
] as const;

const quality = [
  ["A named person", "Someone can explain the work. The service names who prepares it or scores it."],
  ["A second reader", "When review is part of the service, a different person accepts, returns, or rejects the work."],
  ["A defined result", "The client receives labels, a score, or the scoped system. Preparing data is not a training run."],
  ["A written scope", "The inquiry names the material and the constraint. It does not start the project by itself."],
  ["Separate money", "An inquiry is not an invoice, and an invoice is not a payout."],
  ["No public proof list", "This site does not publish customers, ratings, or a certification."],
];

export default function HomePage() {
  return (
    <div className="bg-canvas text-ink">
      <OrganizationJsonLd />
      <section className="relative isolate overflow-hidden bg-[#07111f] text-white">
        <img
          src="/images/editorial/hero-engineers.jpg"
          alt="Engineers reviewing equipment in a server room."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <HeroReel />
        <div className="hero-wash absolute inset-0" aria-hidden="true" />
        <div className="page relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-24">
          <p className="eyebrow text-white/75">Talent · Technology · Opportunity</p>
          <h1 className="heading-display mt-5 max-w-[12em] text-white">
            The human layer behind
            <span className="mt-1 block font-serif italic text-accent">reliable AI.</span>
          </h1>
          <p className="measure mt-6 text-base leading-7 text-white/80">{brandPhilosophy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/consultation" variant="accent" className="rounded-full px-6">
              Request a consultation
            </ButtonLink>
            <ButtonLink href="/solutions" variant="secondary" tone="night" className="rounded-full bg-white/15 px-6">
              Enterprise solutions
            </ButtonLink>
          </div>
          <p className="mt-4">
            <Link href="/contributors/join" className="inline-flex min-h-11 items-center text-sm text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
              Apply as an expert
            </Link>
          </p>
          <p className="mt-10 max-w-xl text-xs leading-5 text-white/70">
            Data-center engineers, then an engineering meeting at their computers. These are not Americantriangle teams, facilities, or clients. Videos from Mixkit.
          </p>
        </div>
      </section>

      <nav className="border-b border-line bg-canvas" aria-label="Services">
        <ul className="page flex gap-x-6 gap-y-1 overflow-x-auto py-1 text-muted">
          {capabilities.map(([href, label]) => (
            <li key={href} className="shrink-0">
              <Link href={href} className="eyebrow inline-flex min-h-11 items-center gap-2 hover:text-ink">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="page py-16 md:py-24">
        <p className="eyebrow text-muted">Three divisions</p>
        <h2 className="heading-title mt-4">Data, intelligence, and implementation.</h2>
        <p className="measure mt-5 leading-7 text-muted">{brandBridge} The next section shows when a note can move between them, and when each record stays separate.</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pillars.map((division) => (
            <SolutionCard key={division.href} {...division} />
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="page py-16 md:py-24">
        <p className="eyebrow text-muted">How an engagement starts</p>
        <h2 className="heading-title mt-4">One requirement. A record someone else can check.</h2>
        <p className="measure mt-5 leading-7 text-muted">
          Start with the work you need. The consultation names the division. The result is the record that division produces.
        </p>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Name the requirement", "Describe a dataset to review, a model to judge, or a system to build. One division is enough."],
            ["02", "Separate the doer from the reviewer", "A person prepares or scores the work. A different person checks it when the service requires that."],
            ["03", "Receive the scoped record", "The result is the labeled set, the evaluation, or the agreed application. It is not a claimed return."],
          ].map(([step, title, body]) => (
            <li key={step} className="surface p-6">
              <p className="font-serif text-sm text-copper">{step}</p>
              <h3 className="mt-3 text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </li>
          ))}
        </ol>
        </div>
      </section>

      <CapabilityCycle />

      <section className="page pb-16 md:pb-24">
        <p className="eyebrow text-muted">Services</p>
        <h2 className="heading-title mt-4">Choose the work by its name.</h2>
        <p className="measure mt-5 leading-7 text-muted">Each row is one service. Open it to see the record a client receives.</p>
        <ul className="mt-8 divide-y divide-line/80">
          {serviceIndex.map(([href, title, body]) => (
            <li key={href}>
              <Link href={href} className="group grid gap-2 rounded-2xl px-4 py-6 transition-colors hover:bg-card lg:grid-cols-[16rem_1fr_auto] lg:items-center lg:gap-8">
                <h3 className="text-2xl">{title}</h3>
                <p className="text-sm leading-6 text-muted">{body}</p>
                <span aria-hidden className="text-copper transition-transform group-hover:translate-x-1">
                  →
                </span>
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
        <h2 className="heading-title">How the work proceeds.</h2>
        <div className="surface mt-10 hidden px-4 py-6 lg:block">
          <WorkflowDiagram />
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map(([step, title, body]) => (
            <li key={step} className="surface p-5">
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
          <p className="measure mt-5 leading-7 text-muted">Quality here is a person, a second reader, and a result that can be named. It is not a score published about Americantriangle.</p>
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

      <section className="page pb-16 md:pb-24">
        <p className="eyebrow text-muted">Notes</p>
        <h2 className="heading-title mt-4">Read how a record is kept.</h2>
        <p className="measure mt-5 leading-7 text-muted">
          These notes explain the work product. They are not customer stories. Signed articles appear on Insights only after one is published.
        </p>
        <ul className="mt-10 grid gap-4">
          {notes.map((note) => (
            <li key={note.slug}>
              <BlogCard
                href={`/resources/${note.slug}`}
                category={note.category}
                meta={`${note.published} · ${readingMinutes(note)} min read`}
                title={note.title}
                summary={note.summary}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="page pb-16 md:pb-24">
        <p className="eyebrow text-muted">Before you start</p>
        <h2 className="heading-title mt-4">A few answers before the form.</h2>
        <div className="mt-8 max-w-3xl">
          <FaqList items={startingPoints} />
        </div>
      </section>

      <section className="page grid gap-4 pb-16 md:grid-cols-2 md:pb-24">
        <div className="rounded-2xl border border-white/15 bg-night px-7 py-8 text-band md:px-8 md:py-10">
          <p className="eyebrow text-band/75">For organizations</p>
          <h2 className="mt-4 max-w-md text-3xl text-band">Have a system to evaluate, build, or ship?</h2>
          <p className="measure mt-4 text-sm leading-6 text-band/80">Describe the service. The inquiry is sent by email. It is not a contract.</p>
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
            Send an application by email. It does not assign paid work.
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
