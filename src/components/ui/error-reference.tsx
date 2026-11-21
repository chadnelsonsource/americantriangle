import { visibleErrorReference } from "@/server/observability/record";

export function ErrorReference({ digest }: { digest?: string }) {
  const reference = visibleErrorReference(digest);
  if (!reference) return null;
  return <p className="mt-4 text-sm text-muted">Reference {reference}</p>;
}
