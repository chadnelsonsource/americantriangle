import Link from "next/link";
import { CounselNote, MarketingArticle } from "@/components/marketing/article";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Privacy",
  "How Americantriangle handles an emailed inquiry. This site does not create an account. This page is not a legal privacy policy.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <MarketingArticle
      eyebrow="Privacy"
      title="Product privacy practices."
      lede="This page describes how the software is built to handle data. It is not a legal privacy policy. Counsel has not issued binding text, and no lawful basis, retention period, or legal role is stated here."
      current="/privacy"
    >
      <CounselNote>
        <p>A lawyer still has to supply a privacy policy, decide the legal role of the business for each kind of data, set retention, and publish a company name and address. None of those facts are in this repository.</p>
      </CounselNote>

      <h2 id="stored">What the product stores</h2>
      <ul>
        <li>This site does not create an account. A form does not collect a password.</li>
        <li>A contact or consultation form emails the name, business email, company, job title if provided, industry, area of interest, project description, and any timeline, scope, or additional notes, plus consent to be contacted. The form is not a contract and it is not sent to a model provider.</li>
        <li>A partnership proposal emails the name, professional email, organization, website if provided, partnership category, proposed collaboration, relevant experience, and any additional details, plus consent to be contacted. A proposal is not an agreement, a partner listing, or an endorsement.</li>
        <li>An expert application emails the name, email, organization if provided, expertise, and description. It does not assign work.</li>
      </ul>

      <h2 id="access">Who can read a record</h2>
      <p>An inquiry email goes to the address configured for the team and a short confirmation goes to the person who submitted it. The message is not published. This application does not keep an account or a project database.</p>

      <h2 id="models">Files and model providers</h2>
      <p>Uploads that the software accepts must use an allowed type, stay within 10 MB, and use a file name without a path. Private storage buckets are declared in a migration and have not been applied here. There is no malware scanner.</p>
      <p>A model provider receives project content only when that project has a recorded data-handling approval. Provider keys stay on the server. No data-processing agreement is published, and this site does not name a list of contracted subprocessors. Authentication, database, storage, email, and payments run only when those services are configured.</p>

      <h2 id="browser">Browser storage</h2>
      <p>
        The theme control stores a light or dark preference in the browser. No account cookie, analytics script, advertising script, or error-monitoring script is installed, and there is no cookie banner. Details are on the <Link href="/cookies">cookies page</Link>.
      </p>

      <h2 id="retention">Retention</h2>
      <p>How long an emailed inquiry is kept has not been decided. This site does not hold an account to delete.</p>

      <h2 id="contact">How to ask</h2>
      <p>
        Use the <Link href="/contact">contact form</Link>. No street address, company registration number, or official legal name is published. Counsel has to supply those before a privacy policy can name the business.
      </p>

      <h2 id="open">Open questions for counsel</h2>
      <ul>
        <li>The binding privacy policy, including any notice required for a particular country.</li>
        <li>Whether the business is a controller, a processor, or both, and for which records.</li>
        <li>The retention and deletion schedule.</li>
        <li>Data-processing terms for clients and for any vendor that is later connected.</li>
        <li>International transfers, if the business operates across borders.</li>
        <li>The legal entity, address, and notice contact.</li>
        <li>Whether the requirements field on the signed-in inquiry form should be stored or removed. Today it is checked and then discarded.</li>
      </ul>
    </MarketingArticle>
  );
}
