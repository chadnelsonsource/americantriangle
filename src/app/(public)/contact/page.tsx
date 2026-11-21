import Link from "next/link";
import { FaqList } from "@/components/marketing/faq";
import { PageHero, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";
import { LeadForm } from "@/features/leads/lead-form";

export const metadata = pageMetadata("Contact", "Describe a project for Americantriangle. The inquiry is stored for review. It is not a contract.", "/contact");

const questions = [
  {
    question: "Is sending this form a contract?",
    answer: "No. The inquiry is stored for the internal queue. It does not set a rate, a volume of work, or a service level.",
  },
  {
    question: "What is stored?",
    answer: "Name, business email, company, optional title, industry, area of interest, project description, and any timeline, scope, or notes, plus consent to be contacted. The privacy page describes the product. It is not a legal policy.",
  },
  {
    question: "Who can read it?",
    answer: "Stored inquiries are readable by project managers and administrators once the database policies are applied. They are not published, and this form does not send them to a model provider.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about the work."
        lede="Describe the requirement and the area it belongs to. The inquiry is stored for review. It is not a contract, a quote, or a start date. A partnership proposal uses the partnership form."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Contact" },
        ]}
      />
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Before you submit</h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              <Link href="/partners" className="text-ink underline decoration-line underline-offset-4">
                Propose a partnership
              </Link>{" "}
              if the request is a collaboration rather than a project.
            </p>
            <div className="mt-6">
              <FaqList items={questions} />
            </div>
          </div>
          <LeadForm defaultType="other" />
        </div>
      </Section>
    </>
  );
}
