import { redirect } from "next/navigation";
import { FaqList } from "@/components/marketing/faq";
import { PageHero, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";
import { LeadForm } from "@/features/leads/lead-form";
import { interestFromQuery } from "@/services/leads";

export const metadata = pageMetadata(
  "Request a consultation",
  "Describe a data, evaluation, or application engagement. The inquiry is stored for the internal queue.",
  "/consultation",
);

const questions = [
  {
    question: "Does a consultation start the project?",
    answer: "No. Discovery, a recommendation, and an estimate are later records. This form only stores the request.",
  },
  {
    question: "Which area should I pick?",
    answer: "Choose the closest division, an integrated engagement, or Other. A partnership proposal uses the partnership form. The choice routes the queue. It does not start the work.",
  },
  {
    question: "What is stored?",
    answer: "Name, business email, company, optional title, industry, area of interest, project description, and any timeline, scope, or notes, plus consent to be contacted. The privacy page describes handling. Counsel has not issued a privacy policy.",
  },
  {
    question: "Will a contributor be assigned from this form?",
    answer: "No. Contributor assignment follows qualification and a project. Registration does not guarantee work.",
  },
] as const;

export default async function ConsultationPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams;
  const inquiryType = interestFromQuery(params.type);
  if (inquiryType === "partnerships") redirect("/partners");
  return (
    <>
      <PageHero
        eyebrow="Consultation"
        title="Request a consultation."
        lede="Describe the outcome you want. The area you choose routes the inquiry. It is not a contract."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Consultation" },
        ]}
      />
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">What this request is</h2>
            <div className="mt-6">
              <FaqList items={questions} />
            </div>
          </div>
          <LeadForm key={inquiryType} defaultType={inquiryType} />
        </div>
      </Section>
    </>
  );
}
