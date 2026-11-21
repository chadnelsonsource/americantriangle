import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata("Unauthorized", "This account cannot open that page.", "/unauthorized");

export default function UnauthorizedPage() {
  return (
    <>
      <h1 className="text-4xl">You cannot open that.</h1>
      <p className="mt-3 text-muted">The account is signed in, but the role or the account status does not allow this page. Suspensions are enforced on the server.</p>
    </>
  );
}
