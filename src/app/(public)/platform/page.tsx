import Link from "next/link";
import { IsolationDiagram } from "@/components/marketing/diagrams";
import { CtaBand, PageHero, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Platform",
  "Shared identity, organization isolation, contributor work, client delivery, and an auditable ledger.",
  "/platform",
);

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="One system. Separate rooms."
        lede="Contributors, client organizations, and internal staff share a database and an identity system. They do not share each other's records."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Platform" },
        ]}
      />
      <Section eyebrow="Tenant isolation" title="A hidden menu is not the control.">
        <div className="measure space-y-4 text-base leading-7 text-muted">
          <p>Every protected action is checked on the server. Database policies repeat the tenant and ownership rules.</p>
          <p>The public site takes inquiries. The contributor workspace covers profiles, assessments, eligible projects, tasks, and personal earnings. The client portal covers one organization. Internal operations cover talent, review, delivery, finance, and administration.</p>
        </div>
        <div className="mt-10">
          <IsolationDiagram />
        </div>
      </Section>
      <Section eyebrow="Money" title="An invoice is not a payout.">
        <p className="max-w-3xl text-sm leading-7 text-muted">
          A client invoice, a client payment, an earnings approval, and a contributor payout are different states. Creating an invoice does not mark work paid. Approval and payout confirmation stay separate.
        </p>
        <p className="mt-4 text-sm leading-6">
          <Link href="/technology" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            The technology register lists what this repository uses.
          </Link>
        </p>
      </Section>
      <CtaBand
        eyebrow="See it scoped"
        title="The platform is the record. The project is the agreement."
        body="Ask for a consultation when you know which service you need. Account creation is a separate path for contributors and clients."
        href="/consultation"
        label="Request a consultation"
      />
    </>
  );
}
