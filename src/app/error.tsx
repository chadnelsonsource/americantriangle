"use client";

import { ErrorReference } from "@/components/ui/error-reference";

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="content" className="mx-auto max-w-xl px-6 py-24">
      <h1 className="text-5xl">This view failed.</h1>
      <p className="mt-4 text-muted">This view could not be shown. Nothing on this page was saved.</p>
      <ErrorReference digest={error.digest} />
      <button type="button" className="mt-6 min-h-11 rounded-md bg-ink px-4 text-paper" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
