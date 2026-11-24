import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="content" className="mx-auto max-w-xl px-6 py-24">
      <p className="eyebrow text-copper">404</p>
      <h1 className="heading-title mt-3">That page is not here.</h1>
      <p className="measure mt-4 leading-7 text-muted">The address does not match a public page or a workspace.</p>
      <Link href="/" className="mt-8 inline-flex min-h-11 items-center underline decoration-copper underline-offset-4">
        Back to the home page
      </Link>
    </main>
  );
}
