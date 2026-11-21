import { ButtonLink } from "@/components/ui/button";
import { INSIGHT_CATEGORIES } from "@/content/insights";

export function InsightCategoryNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Article categories">
      <ul className="flex flex-wrap gap-2">
        {INSIGHT_CATEGORIES.map((category) => (
          <li key={category.slug}>
            <ButtonLink href={`/insights/category/${category.slug}`} variant="chip" aria-current={current === category.slug ? "page" : undefined}>
              {category.label}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
