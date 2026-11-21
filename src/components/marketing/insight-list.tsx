import Link from "next/link";
import { categoryBySlug, INSIGHT_KIND_LABELS, readingMinutes, type Insight } from "@/content/insights";

export function InsightList({ items }: { items: readonly Insight[] }) {
  if (items.length === 0) {
    return <p className="max-w-2xl text-sm leading-6 text-muted">No published article is in this list.</p>;
  }
  return (
    <ul className="grid gap-4">
      {items.map((item) => {
        const category = categoryBySlug(item.category);
        return (
          <li key={item.slug}>
            <article className="surface">
              <Link href={`/insights/${item.slug}`} className="block rounded-md p-6 transition-colors hover:bg-paper">
                <p className="eyebrow text-muted">
                  {category?.label} · {INSIGHT_KIND_LABELS[item.kind]} · {item.publishedOn} · {readingMinutes(item)} min read
                </p>
                <h2 className="mt-3 text-3xl">{item.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{item.summary}</p>
                <p className="mt-4 text-sm text-ink">{item.author.name}</p>
              </Link>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
