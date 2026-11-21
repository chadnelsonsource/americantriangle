"use client";

import { ErrorReference } from "@/components/ui/error-reference";

export default function InternalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-xl">
      <h1 className="heading-title">This operations view could not be shown.</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Nothing was changed. You can try the view again.</p>
      <ErrorReference digest={error.digest} />
      <button type="button" className="mt-6 min-h-11 rounded-md bg-ink px-4 text-sm text-paper" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
