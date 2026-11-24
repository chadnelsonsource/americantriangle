import { ArticleSearch } from "@/components/marketing/article-search";
import { InsightList } from "@/components/marketing/insight-list";
import { PageHero, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";
import { searchInsights } from "@/content/insights";

export const metadata = pageMetadata("Search articles", "Search published Americantriangle articles. This page is a filter and is not indexed.", "/insights/search", { index: false });

export default async function InsightSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params.q ?? "";
  const items = searchInsights(query);
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Search published articles."
        lede="The search reads published titles, summaries, and article text. Unpublished records are not in the results."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/insights", label: "Insights" },
          { label: "Search" },
        ]}
      />
      <Section>
        <ArticleSearch id="insight-search" defaultValue={query} />
        <div className="mt-10">
          <InsightList items={items} />
        </div>
      </Section>
    </>
  );
}
