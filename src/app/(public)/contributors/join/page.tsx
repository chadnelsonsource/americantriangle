import { ExpertApplicationForm } from "@/features/leads/expert-form";
import { PageHero, ProcessRow, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Become a contributor",
  "Submit an expert application without an account. The inquiry is sent by email. It does not assign work.",
  "/contributors/join",
);

const steps = [
  ["01", "Apply", "Send your name, email, and the work you can do. No account is created."],
  ["02", "Review", "The application is sent by email. It is not an assignment."],
  ["03", "Assessment", "A project can still require an assessment before paid tasks."],
  ["04", "Assignment", "Talent operations decide. An application is not a promise of work."],
] as const;

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Contributors"
        title="Apply without an account."
        lede="Expertise areas include software, mathematics, science, writing, finance, business, legal, and healthcare and life sciences. Submitting this form does not sign you in and does not assign paid work."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Contributors" },
        ]}
      />
      <Section eyebrow="Path" title="Four steps. None of them is a job offer.">
        <ProcessRow steps={steps} />
      </Section>
      <Section eyebrow="Application" title="Send the application." className="pt-0">
        <ExpertApplicationForm />
      </Section>
    </>
  );
}
