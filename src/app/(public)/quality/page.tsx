import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Quality",
  "How Americantriangle records review, evaluation, and project approval. Practices a project can define are separate from what the first release already stores.",
  "/quality",
);

const areas = [
  { href: "#data", label: "Data infrastructure" },
  { href: "#intelligence", label: "Model intelligence" },
  { href: "#applications", label: "Enterprise applications" },
] as const;

const statusLabel = {
  release: "In the first release",
  project: "Set in the project",
  later: "Later",
} as const;

function Practice({
  status,
  title,
  body,
}: {
  status: keyof typeof statusLabel;
  title: string;
  body: string;
}) {
  return (
    <article className="surface p-5">
      <p className="eyebrow text-muted">{statusLabel[status]}</p>
      <h3 className="mt-3 text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </article>
  );
}

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="Quality follows the scope of the work."
        lede="A project names the instruction, the record, and who may review it. This page separates what the first release stores from practices a customer and Americantriangle still have to write down. It states no acceptance rate, accuracy percentage, or certification."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Quality" },
        ]}
      />
      <Section className="pb-0">
        <nav aria-label="Quality areas">
          <ul className="flex flex-wrap gap-2">
            {areas.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center border border-control px-4 text-sm hover:border-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl">In the first release</h2>
            <p className="mt-3 text-sm leading-6 text-muted">The software can store the decision. One review layer is the default: someone other than the author accepts, returns, or rejects the submission.</p>
          </div>
          <div>
            <h2 className="text-2xl">Set in the project</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Guidelines, sample size, criteria, and test scope are written for that engagement. They are not a company-wide threshold.</p>
          </div>
          <div>
            <h2 className="text-2xl">Later</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Automated benchmarks, red-team review, and installed error monitoring are named and are not part of the first delivery claim.</p>
          </div>
        </div>
      </Section>

      <Section id="data" className="scroll-mt-24" eyebrow="AI Data Infrastructure" title="The record is the reviewed data.">
        <div className="grid gap-4 md:grid-cols-2">
          <Practice
            status="project"
            title="Annotation guidelines"
            body="The client approves the schema and the instruction. People apply labels, classes, spans, or prompts against that instruction. Americantriangle does not publish one guideline for every dataset."
          />
          <Practice
            status="project"
            title="Data consistency"
            body="Consistency means a second person can apply the same instruction. How large a sample to check, and what disagreement does, is written into the project. No agreement rate is stated here."
          />
          <Practice
            status="release"
            title="Quality sampling and review"
            body="The first release stores one review on the submission. The reviewer cannot be the author. The decision is accept, return, or reject, and it stays with the work. The sample itself is chosen in the project, not by a fixed rate in the software."
          />
          <Practice
            status="release"
            title="Human feedback validation"
            body="Rankings and pairwise preferences are stored, and a reviewer scores a sample separately from the person who compared the outputs. That review does not produce a preference model and does not start a training run."
          />
          <Practice
            status="release"
            title="Dataset documentation"
            body="The project keeps the schema, the contributor, the review, and the export together. A formal datasheet, a model card, or a published data standard is not part of this site."
          />
        </div>
        <p className="mt-8 text-sm leading-6 text-muted">
          <Link href="/services/data" className="text-ink underline decoration-line underline-offset-4">Data infrastructure</Link>
          {" · "}
          <Link href="/services/data/annotation" className="text-ink underline decoration-line underline-offset-4">Annotation and collection</Link>
          {" · "}
          <Link href="/services/data/feedback" className="text-ink underline decoration-line underline-offset-4">Human feedback</Link>
        </p>
      </Section>

      <Section id="intelligence" className="scroll-mt-24 pt-0" eyebrow="AI Model Training, Research & Evaluation" title="A score is a judgment against written criteria.">
        <div className="grid gap-4 md:grid-cols-2">
          <Practice
            status="later"
            title="Benchmark design"
            body="A project can name a fixed set of items. People can score that set. Automated benchmark suites and a reusable suite tool are later. A score on a set is not a published leaderboard result."
          />
          <Practice
            status="release"
            title="Evaluation methodology"
            body="People score outputs, or technical and domain work, against criteria the client approves. The score and the comment stay with the submission. The method does not state an accuracy percentage."
          />
          <Practice
            status="release"
            title="Model testing"
            body="The first release tests by human judgment of described outputs. It does not run a private test harness, a pass-rate gate, or a claim that a model passed."
          />
          <Practice
            status="project"
            title="Reproducibility"
            body="The criteria and the score can be read again with the work. A research protocol, a frozen environment, and a rerun are a scoped study. Research itself is later, and a stored score is not that study."
          />
          <Practice
            status="later"
            title="Safety and alignment evaluation"
            body="A written review protocol can be scoped. People would follow that protocol and record findings. Red-team review is later. It is not a certification that a model is safe or aligned."
          />
        </div>
        <p className="mt-8 text-sm leading-6 text-muted">
          <Link href="/services/intelligence" className="text-ink underline decoration-line underline-offset-4">Model intelligence</Link>
          {" · "}
          <Link href="/services/data/evaluation" className="text-ink underline decoration-line underline-offset-4">Model evaluation</Link>
        </p>
      </Section>

      <Section id="applications" className="scroll-mt-24 pt-0" eyebrow="Enterprise AI Applications" title="Approval is a milestone, not a measured outcome.">
        <div className="grid gap-4 md:grid-cols-2">
          <Practice
            status="release"
            title="Requirements validation"
            body="Discovery notes, a recommendation, an estimate, and client approval are project records. The client sees the agreed scope. Internal notes stay off that timeline. Approval of the scope is not a claim about business results."
          />
          <Practice
            status="project"
            title="Software testing"
            body="A project can name the checks that must pass before a milestone is approved. Those checks are part of the scope. This site does not publish a coverage rate or a standard test suite."
          />
          <Practice
            status="project"
            title="Integration testing"
            body="The interface, the data, and the owner are written into the engagement. A check of that interface can be a milestone. It does not certify the client’s other systems."
          />
          <Practice
            status="release"
            title="Deployment validation"
            body="The first release records what was released and the handoff. A handoff is the operating record. It is not an uptime guarantee."
          />
          <Practice
            status="release"
            title="Monitoring and continuous improvement"
            body="A released project includes a support path and a record of what was handed off. Installed error monitoring is not in this application. A further change is a new scoped milestone, not an unnamed improvement program."
          />
        </div>
        <p className="mt-8 text-sm leading-6 text-muted">
          <Link href="/services/engineering" className="text-ink underline decoration-line underline-offset-4">Enterprise applications</Link>
          {" · "}
          <Link href="/services/engineering/applications" className="text-ink underline decoration-line underline-offset-4">Applications</Link>
          {" · "}
          <Link href="/services/engineering/agents" className="text-ink underline decoration-line underline-offset-4">Agents and automation</Link>
        </p>
      </Section>

      <CtaBand
        eyebrow="Scope"
        title="Write the quality bar into the inquiry."
        body="Name the instruction, the sample, and the record you need. The inquiry does not set an acceptance rate."
        href="/consultation?type=other"
        label="Request a consultation"
      />
    </>
  );
}
