import Link from "next/link";
import { ArticleSearch } from "@/components/marketing/article-search";
import { InsightCategoryNav } from "@/components/marketing/insight-nav";
import { InsightList } from "@/components/marketing/insight-list";
import { PageHero, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";
import { featuredInsight, INSIGHT_KIND_LABELS, latestInsights } from "@/content/insights";

export const metadata = pageMetadata(
  "Insights",
  "Editorial writing on data infrastructure, model evaluation, engineering, and enterprise AI applications. Only published articles appear here.",
  "/insights",
);

export default function InsightsPage() {
  const featured = featuredInsight();
  const latest = latestInsights().filter((item) => item.slug !== featured?.slug);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Writing for the work itself."
        lede="Articles are added when they are published. This page does not carry unsigned research, borrowed reporting, or a named author who is not on the record."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Insights" },
        ]}
      />
      <Section className="pb-0">
        <ArticleSearch id="insight-query" />
        <div className="mt-8">
          <InsightCategoryNav />
        </div>
      </Section>
      <Section eyebrow="Featured" title="One article, when one is marked featured.">
        {featured ? (
          <InsightList items={[featured]} />
        ) : (
          <p className="max-w-2xl text-sm leading-6 text-muted">
            No article is featured. Until one is published, the{" "}
            <Link href="/resources" className="text-ink underline decoration-line underline-offset-4">
              method notes
            </Link>{" "}
            explain how a preference, a review, and a milestone are recorded.
          </p>
        )}
      </Section>
      <Section className="pt-0" eyebrow="Latest" title="Published most recently.">
        <InsightList items={latest} />
      </Section>
      <Section className="pt-0" eyebrow="Forms" title="What a published article can be.">
        <ul className="grid gap-3 sm:grid-cols-2">
          {Object.values(INSIGHT_KIND_LABELS).map((label) => (
            <li key={label} className="border-t border-line py-3 text-sm">
              {label}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-muted">
          A record moves through draft, review, approved, published, and archived. The public pages render the published state only. Method notes on how work is recorded stay on{" "}
          <Link href="/resources" className="text-ink underline decoration-line underline-offset-4">
            Resources
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
