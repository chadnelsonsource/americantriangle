import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { FeatureCard } from "@/components/marketing/cards";
import { CtaBand, PageHero, ProcessRow, Section, SplitPanel } from "@/components/marketing/sections";
import { publishedTestimonials, TestimonialList } from "@/components/marketing/testimonial";
import { brandPhilosophy, brandSupport, principles } from "@/config/brand";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "About",
  "The Americantriangle triangle names Talent, Technology, and Opportunity. The three divisions are the work those principles become. A customer can use one division or combine them.",
  "/about",
);

const review = [
  ["01", "Qualify", "A contributor account, a profile, and an assessment come before paid work."],
  ["02", "Assign", "Matching uses skills, assessments, language, availability, and capacity."],
  ["03", "Review", "A different person scores the work. The first release uses one review layer."],
  ["04", "Record", "The decision, the file, and the payment state stay separate."],
] as const;

const approach = [
  {
    title: "Reliable data",
    body: "Collection, annotation, human feedback, and preparation produce a record another person can review. That record can support later model work. Preparing it is not a training run.",
  },
  {
    title: "Research and evaluation",
    body: "Evaluation is available now. People score outputs against criteria the client approves. Training, research, benchmarking, and safety review start only when that engagement is scoped.",
  },
  {
    title: "Real-world implementation",
    body: "Applications, agents, integrations, and workflows are delivered as projects. Milestones and client approval define the work. A deployed system is not a claimed return.",
  },
] as const;

const together = [
  {
    title: "Data makes the work inspectable",
    body: "A label, a preference, or a prepared example can be tied to a person and a review. Research and evaluation can use that record again.",
  },
  {
    title: "Evaluation names the gap",
    body: "A score, or a scoped study, can say what failed and what should change. The finding is a record. It does not by itself change a model.",
  },
  {
    title: "Applications return the requirement",
    body: "Use in a workflow shows what the organization needs next. That feedback can become a later inquiry. It is not an automatic training run.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Two readings of one triangle."
        lede={`${brandSupport} Talent, Technology, and Opportunity are the principles. The three divisions are the work. A customer can use one division or combine them.`}
        crumbs={[
          { href: "/", label: "Home" },
          { label: "About" },
        ]}
      />
      <Section eyebrow="Purpose" title="Mission and vision.">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="surface p-6 md:p-8">
            <h3 className="eyebrow text-muted">Mission</h3>
            <p className="mt-4 font-serif text-2xl leading-snug text-ink">
              To connect human expertise, applied technology, and a real requirement, so an organization can prepare reviewed data, evaluate a model, or ship an agreed system.
            </p>
          </article>
          <article className="surface p-6 md:p-8">
            <h3 className="eyebrow text-muted">Vision</h3>
            <p className="mt-4 font-serif text-2xl leading-snug text-ink">
              An integrated company in which human expertise, applied technology, and real requirements stay connected across the three divisions.
            </p>
          </article>
        </div>
      </Section>
      <Section eyebrow="The mark" title="Talent, technology, and opportunity." lede={brandPhilosophy}>
        <div className="grid justify-items-center gap-10">
          <Logo imageClassName="h-36 w-auto sm:h-44" />
          <ul className="grid w-full gap-4 md:grid-cols-3">
            {principles.map((item) => (
              <li key={item.title}>
                <FeatureCard title={item.title} body={item.body} />
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <SplitPanel
        eyebrow="Our three pillars"
        title="Foundation, intelligence, and implementation."
        aside={
          <ul className="space-y-4">
            <li>
              <Link href="/services/data" className="surface block p-6 text-sm leading-6 transition-colors hover:border-ink">
                <p className="eyebrow text-muted">The foundation</p>
                <p className="mt-2 font-serif text-xl text-ink">AI Data Infrastructure</p>
                <p className="mt-2 text-muted">High-quality datasets, human feedback, and data expertise.</p>
              </Link>
            </li>
            <li>
              <Link href="/services/intelligence" className="surface block p-6 text-sm leading-6 transition-colors hover:border-ink">
                <p className="eyebrow text-muted">The intelligence</p>
                <p className="mt-2 font-serif text-xl text-ink">AI Model Training, Research & Evaluation</p>
                <p className="mt-2 text-muted">Evaluation now. Training and research when the engagement is scoped.</p>
              </Link>
            </li>
            <li>
              <Link href="/services/engineering" className="surface block p-6 text-sm leading-6 transition-colors hover:border-ink">
                <p className="eyebrow text-muted">The implementation</p>
                <p className="mt-2 font-serif text-xl text-ink">Enterprise AI Applications</p>
                <p className="mt-2 text-muted">Applications, agents, integrations, and business workflows.</p>
              </Link>
            </li>
          </ul>
        }
      >
        <p>The three pillars are complementary. They are not a sequence a customer has to follow.</p>
        <p>Data work can support a model engagement. A model engagement can stand on data the client already has. An application can be built on a model the client already runs.</p>
        <p>Data infrastructure produces reviewed data. It does not train a model. Training, when it is in scope, is a named project under the intelligence division. The public platform does not run a foundation-model training job.</p>
      </SplitPanel>
      <Section eyebrow="Our approach" title="What the principles become in practice." lede="Each principle shows up in a record the company can keep. None of these cards is a completed customer result." className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {approach.map((item) => (
            <FeatureCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Section>
      <Section eyebrow="One ecosystem" title="Why these three capabilities belong together." lede="A dataset, a model score, and a deployed workflow answer different questions. They belong together because each answer can make the next question more precise." className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {together.map((item) => (
            <FeatureCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-7 text-muted">
          An organization can start with the question it already has. The divisions can operate on their own, or the work can move between them when that is useful. Collaboration is a choice, not a required path.
        </p>
      </Section>
      <Section eyebrow="How work is judged" title="Review is a step, not a tagline.">
        <ProcessRow steps={review} />
      </Section>
      <Section eyebrow="What this site will not claim" title="Credibility is what can be shown." className="pt-0">
        <ul className="max-w-3xl space-y-4 text-sm leading-7 text-muted">
          <li>No customer logos, testimonials, revenue, headcount, or certifications are published, because those facts are not established here.</li>
          <li>No corporate legal name or trademark registration is stated beyond the brand name used in this product.</li>
          <li>Privacy, terms, and cookies pages describe the software. Counsel has not issued binding text.</li>
          <li>The mission and vision describe the work the company is organized to do. They are not a record of customers, results, or completed research.</li>
        </ul>
      </Section>
      <TestimonialList items={publishedTestimonials} />
      <CtaBand
        eyebrow="Talk with delivery"
        title="If you know the service, start an inquiry."
        body="The form stores the request for the internal queue. It is not a contract and it does not promise a start date."
        href="/consultation"
        label="Request a consultation"
      />
    </>
  );
}
