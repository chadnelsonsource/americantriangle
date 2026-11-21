"use client";

import { visibleErrorReference } from "@/server/observability/record";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const reference = visibleErrorReference(error.digest);
  return (
    <html lang="en">
      <body style={{ fontFamily: "Georgia, serif", background: "#f4f1ea", color: "#17232b", padding: "4rem" }}>
        <h1>Something went wrong.</h1>
        <p>The page could not be rendered. You can try again.</p>
        {reference ? <p>Reference {reference}</p> : null}
        <button type="button" onClick={() => reset()} style={{ minHeight: "2.75rem", marginTop: "1.5rem", padding: "0.5rem 1rem" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
