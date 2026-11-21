import Link from "next/link";
import { CounselNote, MarketingArticle } from "@/components/marketing/article";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Privacy",
  "How the Americantriangle software handles account, inquiry, and project data. Not a legal privacy policy.",
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
        <li>An account stores the name, email, and account type you submit. The public form offers a contributor or a client owner. The password is sent to the authentication service when that service is configured. These pages do not keep a separate copy of the password.</li>
        <li>A contact or consultation form stores the name, business email, company, job title if provided, industry, area of interest, project description, and any timeline, scope, or additional notes, plus consent to be contacted. The form is not a contract and it is not sent to a model provider.</li>
        <li>A partnership proposal stores the name, professional email, organization, website if provided, partnership category, proposed collaboration, relevant experience, and any additional details, plus consent to be contacted. A stored proposal is not an agreement, a partner listing, or an endorsement.</li>
        <li>A signed-in client can create an organization name. A later inquiry form saves the project name and service type on that organization. The requirements text is checked and is not written to the project record. An attachment is checked for type, size, and file name, and this form does not store the file.</li>
        <li>A contributor profile, once someone fills it in, can hold skills, education, experience, languages, country, time zone, availability, and portfolio links.</li>
        <li>Project submissions, reviews, messages, and earnings stay with the records the role is allowed to see.</li>
        <li>From a signed-in account, a person can request an export or a deletion. The request is an audit event when the audit store is configured. The form does not export or delete the account by itself.</li>
      </ul>

      <h2 id="access">Who can read a record</h2>
      <p>Client project data is limited in the authorization rules to members of that organization and to staff whose role allows the record. Contributor earnings are visible to that contributor and to finance. An inquiry is for the internal queue. It is not published.</p>
      <p>
        Database policies that would enforce those limits are written in migrations and have not been applied to a hosted database. The <Link href="/trust">trust page</Link> separates what is in the software from what is only declared.
      </p>

      <h2 id="models">Files and model providers</h2>
      <p>Uploads that the software accepts must use an allowed type, stay within 10 MB, and use a file name without a path. Private storage buckets are declared in a migration and have not been applied here. There is no malware scanner.</p>
      <p>A model provider receives project content only when that project has a recorded data-handling approval. Provider keys stay on the server. No data-processing agreement is published, and this site does not name a list of contracted subprocessors. Authentication, database, storage, email, and payments run only when those services are configured.</p>

      <h2 id="browser">Browser storage</h2>
      <p>
        The theme control stores a light or dark preference in the browser. Sign-in can set session cookies when authentication is configured. No analytics, advertising, or error-monitoring script is installed, and there is no cookie banner. Details are on the <Link href="/cookies">cookies page</Link>.
      </p>

      <h2 id="retention">Retention</h2>
      <p>How long records are kept has not been decided. A deletion request does not by itself remove the account.</p>

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
