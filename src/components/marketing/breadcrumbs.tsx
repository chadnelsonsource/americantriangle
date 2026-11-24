import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { canonicalUrl } from "@/config/site";

export function Breadcrumbs({ items }: { items: readonly { href?: string; label: string }[] }) {
  const structured = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: canonicalUrl(item.href) } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <JsonLd data={structured} />
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="inline-flex min-h-6 items-center underline-offset-4 hover:text-ink hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
