import { ButtonLink } from "@/components/ui/button";
import { CtaBand, PageHero, ProcessRow, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Become a contributor",
  "Apply, complete a profile, and pass an assessment. Registration does not guarantee work.",
  "/contributors/join",
);

const steps = [
  ["01", "Account", "Create a contributor account and verify the email address."],
  ["02", "Profile", "Record skills, languages, and availability. Gaps stay visible."],
  ["03", "Assessment", "Pass the assessment a project requires before paid tasks are assigned."],
  ["04", "Assignment", "Talent operations decide qualification. An account is not a promise of work."],
] as const;

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Contributors"
        title="Qualification comes before assignment."
        lede="Expertise areas include software, mathematics, science, writing, finance, business, legal, and healthcare and life sciences. Each project can require its own assessment."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Contributors" },
        ]}
        actions={
          <ButtonLink href="/register" variant="accent">
            Create a contributor account
          </ButtonLink>
        }
      />
      <Section eyebrow="Path" title="Four steps. None of them is a job offer.">
        <ProcessRow steps={steps} />
      </Section>
      <CtaBand
        eyebrow="Registration"
        title="Create the account, then complete the profile."
        body="Staff cannot be created from the public form. Registration does not assign paid work."
        href="/register"
        label="Create a contributor account"
      />
    </>
  );
}
