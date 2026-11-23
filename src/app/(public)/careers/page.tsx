import { FaqList } from "@/components/marketing/faq";
import { CtaBand, PageHero, Section } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Careers",
  "Expert qualification and staff openings are different paths. No staff role is listed until one is approved. Registration does not assign work.",
  "/careers",
);

const meanings = [
  {
    title: "Expert work",
    body: "A contributor completes a profile and the assessment a project requires. Paid tasks come after that qualification.",
    points: ["Profile and assessment come first", "Another person can review the submission", "An account is not an assignment"],
  },
  {
    title: "Delivery work",
    body: "Applications, agents, and integrations are projects. A staff opening for that work is separate from expert qualification.",
    points: ["Milestones and client approval define the work", "A deployed system is not a claimed return", "A staff opening is listed only when one exists"],
  },
  {
    title: "A listed role",
    body: "This page is the place a staff opening would appear. None are listed today.",
    points: ["No role is implied by this page", "A contact message is an inquiry", "An inquiry is not an application file"],
  },
] as const;

const principles = [
  {
    title: "Show the work",
    body: "A label, a score, or a milestone should be readable again by someone who was not in the room.",
  },
  {
    title: "Separate the review",
    body: "The person who reviews a submission is not the person who submitted it.",
  },
  {
    title: "Name the scope",
    body: "Evaluation is current work. Training, research, and safety review start when an engagement says so.",
  },
  {
    title: "Keep payment apart",
    body: "Approval, earnings, and payout stay separate. Creating an invoice does not mark work paid.",
  },
  {
    title: "Publish only what is true",
    body: "This page does not list customers, awards, offices, headcount, or benefits that are not on record.",
  },
  {
    title: "Keep the paths separate",
    body: "Expert qualification and a staff opening are different applications. One does not convert into the other.",
  },
] as const;

const questions = [
  {
    question: "How does expert work start?",
    answer:
      "Use the contributor page and submit the application. No account or sign-in is required. The inquiry is stored for review. It does not guarantee paid work.",
  },
  {
    question: "Is a contributor a staff employee?",
    answer: "No. A contributor account is for expert tasks after qualification. It does not create a staff user and it does not assign a role.",
  },
  {
    question: "Where are staff openings?",
    answer: "On this page, under Open positions. A role is added only after it is approved. None are listed.",
  },
  {
    question: "Can I pursue both expert work and a staff role?",
    answer: "They are different records. Expert qualification uses the contributor path. A staff question uses the contact form. Sending one does not file the other.",
  },
  {
    question: "What if I do not meet every skill a project names?",
    answer: "The project names the assessment. Qualification is decided after that assessment. A general note does not replace it.",
  },
  {
    question: "What work can a person be asked to do now?",
    answer:
      "Current expert work includes data annotation, human feedback, and model evaluation. Training, research, and red-team review are scoped or later. Delivery work is a project with milestones.",
  },
  {
    question: "Does a contact message get a reply?",
    answer: "The message is stored for the internal queue. It does not promise a reply time, an interview, or a start date.",
  },
  {
    question: "Are roles remote?",
    answer: "Location and schedule are not stated here. No staff role is listed, and no workplace policy is published on this page.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your work with Americantriangle."
        lede="Expert contributors qualify before an assignment. Staff roles appear on this page only when a role is approved. Neither path is a promise of work."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Careers" },
        ]}
        actions={
          <>
            <ButtonLink href="#open-positions" variant="accent">
              See open positions
            </ButtonLink>
            <ButtonLink href="/contributors/join" variant="secondary">
              Apply as an expert
            </ButtonLink>
          </>
        }
      />
      <section className="page py-16 md:py-24">
        <p className="eyebrow text-accent">Who this page is for</p>
        <h2 className="heading-title mt-4">Contributor</h2>
        <p className="mt-3 text-muted">A qualified expert. Not a staff role.</p>
        <ol className="mt-10 max-w-2xl space-y-6 font-serif text-xl leading-snug text-ink">
          <li className="flex gap-4">
            <span className="text-copper">1.</span>
            <span>A person who completes a profile and the assessment a project requires, then may receive paid expert work.</span>
          </li>
          <li className="flex gap-4">
            <span className="text-copper">2.</span>
            <span>Not an employee. Creating an account does not assign work and does not create a staff user.</span>
          </li>
        </ol>
        <div className="mt-12 max-w-2xl border-t border-line pt-8">
          <h3 className="text-2xl">Staff role</h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            A named opening for delivery, operations, or engineering. None are listed until the role is approved. A contact message is an inquiry, not an application file.
          </p>
        </div>
      </section>
      <section className="bg-paper">
        <div className="page py-16 md:py-24">
          <p className="eyebrow text-muted">The work</p>
          <h2 className="heading-title mt-4">What working here means today.</h2>
          <p className="measure mt-4 leading-7 text-muted">These are the rules already in the product. They are not a benefits list, a workplace award, or a schedule.</p>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {meanings.map((item) => (
              <li key={item.title} className="surface p-6">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Section
        eyebrow="How the work is judged"
        title="Six rules for the people who do it."
        lede="Staff stories are not published here. A quote appears only when the person and the wording are approved."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((item) => (
            <li key={item.title} className="surface p-6">
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <section id="open-positions" className="page scroll-mt-24 py-16 md:py-24">
        <p className="eyebrow text-accent">Openings</p>
        <h2 className="heading-title mt-4">Open positions.</h2>
        <p className="measure mt-4 leading-7 text-muted">
          No staff role is listed. A role appears in this section only after it is approved. Expert work uses the contributor path instead of this list.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contributors/join" variant="accent">
            Apply as an expert
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Ask about staff work
          </ButtonLink>
        </div>
      </section>
      <Section eyebrow="Questions" title="Before you write." className="pt-0">
        <FaqList items={questions} searchable />
      </Section>
      <CtaBand
        eyebrow="Staff inquiry"
        title="A message is stored. It is not an offer."
        body="Use the contact form if you want to ask about staff work. The inquiry does not create an application file, an interview, or a start date."
        href="/contact"
        label="Contact"
      />
    </>
  );
}
