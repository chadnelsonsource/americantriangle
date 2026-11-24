import Link from "next/link";
import { CounselNote, MarketingArticle } from "@/components/marketing/article";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Cookies",
  "What Americantriangle stores in the browser. Not a cookie policy, and not a consent banner for tracking that is not installed.",
  "/cookies",
);

export default function CookiesPage() {
  return (
    <MarketingArticle
      eyebrow="Cookies"
      title="What this browser stores."
      lede="This page describes the theme preference stored in the browser. It is not a cookie policy. Counsel has not issued one."
      current="/cookies"
    >
      <CounselNote>
        <p>If optional analytics or error monitoring is added later, the script and a real choice have to ship together, and counsel has to review the notice. A banner is not shown today because there is no optional tracker to accept or reject.</p>
      </CounselNote>

      <h2 id="theme">Theme preference</h2>
      <p>The Theme control saves the word “light” or “dark” in the browser’s local storage under the key “theme”. The site reads that value to paint the page. This application does not send the preference to a server. If no choice is saved, the page uses the light theme.</p>

      <h2 id="session">No account session</h2>
      <p>The public site does not create an account or a sign-in session. Submitting a form does not set an authentication cookie.</p>

      <h2 id="absent">What is not installed</h2>
      <p>
        No analytics, advertising, or error-monitoring script is loaded. Product analytics and error monitoring are named in the deployment notes and are not part of this application. The <Link href="/trust">trust page</Link> records that gap. The <Link href="/privacy">privacy page</Link> covers account and inquiry data.
      </p>
    </MarketingArticle>
  );
}
