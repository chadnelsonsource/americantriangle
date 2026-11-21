"use client";

import { useState } from "react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  return (
    <div>
      <h2 className="text-sm font-medium">Share this article</h2>
      <ul className="mt-3 flex flex-wrap gap-2 text-sm">
        <li>
          <a className="inline-flex min-h-11 items-center rounded-md border border-control px-4 hover:border-ink" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} aria-label="Share on LinkedIn">
            LinkedIn
          </a>
        </li>
        <li>
          <a className="inline-flex min-h-11 items-center rounded-md border border-control px-4 hover:border-ink" href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(title)}`} aria-label="Share on X">
            X
          </a>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-md border border-control px-4 hover:border-ink"
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              setCopied(true);
            }}
          >
            Copy link
          </button>
        </li>
      </ul>
      {copied ? (
        <p role="status" className="mt-2 text-sm text-muted">
          Link copied.
        </p>
      ) : null}
    </div>
  );
}
