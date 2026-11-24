import Link from "next/link";
import { CounselNote, MarketingArticle } from "@/components/marketing/article";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Terms",
  "Americantriangle has not issued binding terms of service. Sending an inquiry is not a contract.",
  "/terms",
);

export default function TermsPage() {
  return (
    <MarketingArticle
      eyebrow="Terms"
      title="Terms are not in force yet."
      lede="A binding terms of service has not been issued. Do not treat this page, or the rest of the site, as a contract."
      current="/terms"
    >
      <CounselNote>
        <p>Counsel still has to write the terms, name the legal entity that would be the contracting party, and set the notice address. Governing law, venue, warranties, liability limits, and intellectual-property terms are not decided here.</p>
      </CounselNote>

      <h2 id="today">What a visitor can rely on today</h2>
      <ul>
        <li>Sending a contact or consultation form stores the inquiry. It does not set a price, a volume of work, or a service level.</li>
        <li>Creating an account does not make someone an employee, a contractor, or a guaranteed assignee. Staff accounts are not created from the public form.</li>
        <li>Contributor qualification is a separate decision. An account is not a promise of paid work.</li>
        <li>A client invoice and a contributor payout are separate records. Creating an invoice does not mark the work paid.</li>
      </ul>

      <h2 id="absent">What this page does not set</h2>
      <p>There is no governing law, court or venue, warranty, limitation of liability, acceptable-use rule, or assignment of intellectual property. Marketing copy about services is a description of the product. It is not those missing terms.</p>
      <p>
        Data handling is described on the <Link href="/privacy">privacy page</Link>. Browser storage is described on the <Link href="/cookies">cookies page</Link>. Neither page is a substitute for terms.
      </p>

      <h2 id="before">Before a contract can be published</h2>
      <p>
        The published name on this site is Americantriangle. No corporate registration, trademark registration, or street address is recorded. Questions can go through the <Link href="/contact">contact form</Link>. That form is not a notice address for legal service.
      </p>
    </MarketingArticle>
  );
}
