import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Trust",
  "How Americantriangle handles data, access, privacy, and model use in the software. Not a certification, and not a claim that a hosted control has been audited.",
  "/trust",
);

const sections = [
  { href: "#data-protection", label: "Data protection" },
  { href: "#access-control", label: "Access control" },
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#privacy", label: "Privacy" },
  { href: "#reliability", label: "Reliability" },
  { href: "#responsible-ai", label: "Responsible AI" },
  { href: "#inquiries", label: "Security inquiries" },
] as const;

const statusLabel = {
  software: "In the software",
  declared: "Declared, not applied",
  absent: "Not in place",
} as const;

function Control({
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

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust"
        title="Security and privacy, as the software stands."
        lede="This page separates controls that are written in the application, controls that are declared for a database and have not been run, and controls that are not in place. It is not a SOC 2, ISO 27001, HIPAA, or GDPR certification. No penetration test is claimed."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Trust" },
        ]}
      />
      <Section className="pb-0">
        <nav aria-label="Trust topics">
          <ul className="flex flex-wrap gap-2">
            {sections.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center border border-control px-4 text-sm transition-colors hover:border-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <dl className="mt-8 grid gap-4 text-sm leading-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="surface p-4">
            <dt className="eyebrow text-muted">In the software</dt>
            <dd className="mt-2">The application code enforces the rule. A hosted database is not required for the check itself.</dd>
          </div>
          <div className="surface p-4">
            <dt className="eyebrow text-muted">Declared, not applied</dt>
            <dd className="mt-2">The rule is in a migration file. It has not been executed against a hosted database in this project.</dd>
          </div>
          <div className="surface p-4">
            <dt className="eyebrow text-muted">Not in place</dt>
            <dd className="mt-2">The control is absent or only named as a later step. It is not a current protection.</dd>
          </div>
        </dl>
      </Section>

      <Section id="data-protection" className="scroll-mt-24" eyebrow="Data protection" title="Collect the fields the work needs.">
        <div className="grid gap-4 md:grid-cols-2">
          <Control
            status="software"
            title="Inquiry data is limited"
            body="A consultation stores the name, business email, company, industry, area of interest, and project description. Title, timeline, scope, and notes are stored when provided. A partnership proposal stores the organization, an optional website, a category, the proposed collaboration, and relevant experience. Consent is required. A hidden extra field discards the submission. Neither form is sent to a model provider."
          />
          <Control
            status="software"
            title="Files are checked before they are accepted"
            body="An upload must use an allowed type, stay within 10 MB, and use a file name without a path. There is no malware scanner."
          />
          <Control
            status="software"
            title="Model content needs an approval"
            body="A model call is refused unless the project has a recorded data-handling approval and a server-side provider key. The key is not sent to the browser."
          />
          <Control
            status="declared"
            title="This site does not store uploaded files"
            body="Public forms send text by email. They do not accept a file upload, and this application does not connect a file store."
          />
          <Control
            status="absent"
            title="Retention is not set"
            body="How long an emailed inquiry is kept has not been decided. This site does not create an account to export or delete."
          />
        </div>
      </Section>

      <Section id="access-control" eyebrow="Access control" title="A role is not a hidden menu." className="scroll-mt-24 pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          <Control
            status="software"
            title="The public site has no accounts"
            body="There is no sign-in, sign-up, or password. A form submission emails the inquiry. It does not open a workspace."
          />
          <Control
            status="software"
            title="Each action checks the role and the record"
            body="Server authorization grants only the actions for that role. A reviewer cannot review their own submission. A client sees records for their organization. A suspended account cannot take actions beyond its own profile."
          />
          <Control
            status="software"
            title="No database key is in this application"
            body="The public site does not connect a database client. Inquiry text leaves the server only in the email that Resend sends when email is configured."
          />
          <Control
            status="declared"
            title="There is no tenant database on this site"
            body="Organization isolation, staff roles, and row-level policies are not part of this public application. An inquiry is an email, not a row another organization could read."
          />
        </div>
      </Section>

      <Section id="infrastructure" eyebrow="Infrastructure security" title="Only what this repository implements." className="scroll-mt-24 pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          <Control
            status="software"
            title="Payment webhooks check a signature"
            body="A Stripe event is accepted only when the signature matches. This application does not store the event or send a payout."
          />
          <Control
            status="software"
            title="Repeated inquiries are limited on one process"
            body="The inquiry action limits how often the same server process accepts a submission. A second server does not see that count. That is not a network firewall."
          />
          <Control
            status="absent"
            title="No certification and no penetration test"
            body="SOC 2, ISO 27001, HIPAA, and GDPR certification are not claimed. No penetration test, bug-bounty result, or encryption-suite claim is stated, because none has been completed for this project."
          />
          <Control
            status="absent"
            title="Production hosting is not standing"
            body="The intended host terminates TLS and keeps secrets in its environment. This repository does not create that host, the database project, or the DNS record. Development keys are not a production deployment."
          />
        </div>
      </Section>

      <Section id="privacy" eyebrow="Privacy" title="A product description, not a legal policy." className="scroll-mt-24 pt-0">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted">
          <p>
            Submitted inquiries and account details are for the internal queue and the account they belong to. Client project data is intended for members of that organization and for staff whose role allows the record. Contributor earnings are intended for that contributor and for finance.
          </p>
          <p>
            The <Link href="/privacy" className="text-ink underline decoration-line underline-offset-4">privacy page</Link>, <Link href="/terms" className="text-ink underline decoration-line underline-offset-4">terms page</Link>, and <Link href="/cookies" className="text-ink underline decoration-line underline-offset-4">cookies page</Link> describe the product. Counsel has not issued binding text, and this site does not claim GDPR certification or a completed data-processing agreement.
          </p>
        </div>
      </Section>

      <Section id="reliability" eyebrow="Operational reliability" title="What is watched, and what is not." className="scroll-mt-24 pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          <Control
            status="software"
            title="Failed checks are returned, not hidden"
            body="A model call without approval or a provider key returns an error. An account export or deletion request says so when the audit store is not configured, instead of claiming the request was saved."
          />
          <Control
            status="software"
            title="Payment states stay separate"
            body="Creating an invoice does not mark contributor work paid. Approval and payout confirmation are different states. A webhook that fails its signature is rejected."
          />
          <Control
            status="absent"
            title="Error monitoring is not installed"
            body="An error monitor is named in the deployment notes and is not installed. There is no live error feed for this project."
          />
          <Control
            status="absent"
            title="Backups and incident response are not established"
            body="This repository does not configure database backups, and it does not publish an incident-response process. A hosted database vendor may offer backups later. That has not been turned on or tested here."
          />
        </div>
      </Section>

      <Section id="responsible-ai" eyebrow="Responsible AI" title="A person remains in the record." className="scroll-mt-24 pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          <Control
            status="software"
            title="Review is a separate person"
            body="The first release uses one review layer. Someone other than the author accepts, returns, or rejects the submission. The decision stays with the work."
          />
          <Control
            status="software"
            title="Evaluation is a score, not a safety claim"
            body="People can score model outputs against criteria the client approves. That score is not a certification that a model is safe, accurate, or fit for a regulated use."
          />
          <Control
            status="software"
            title="Preparing data is not training"
            body="Labels, preferences, and examples are records. They do not start a training run. Training, research, and red-team review are scoped engagements, and a safety review is not a certification."
          />
          <Control
            status="absent"
            title="No automated red team and no model card"
            body="Automated benchmark suites and red-team reviews are later. This site does not publish a model card or a claim that Americantriangle operates a foundation model."
          />
        </div>
      </Section>

      <Section id="inquiries" eyebrow="Security inquiries" title="Ask a security question in the existing form." className="scroll-mt-24 pt-0">
        <p className="max-w-3xl text-sm leading-7 text-muted">
          Use the contact form and put “Security” in the message, with the question and a way to reply. The inquiry is stored for the internal queue. It is not a disclosure program, it does not promise a response time, and it should not include passwords or secret keys.
        </p>
      </Section>

      <CtaBand
        eyebrow="Contact"
        title="Send a security question."
        body="The form stores the request. It is not a contract and it is not a certification review."
        href="/contact"
        label="Contact the team"
      />
    </>
  );
}
