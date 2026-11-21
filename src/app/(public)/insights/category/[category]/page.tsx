import { notFound } from "next/navigation";
import { InsightCategoryNav } from "@/components/marketing/insight-nav";
import { InsightList } from "@/components/marketing/insight-list";
import { PageHero, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";
import { categoryBySlug, INSIGHT_CATEGORIES, insightsInCategory, type InsightCategory } from "@/content/insights";

export function generateStaticParams() {
  return INSIGHT_CATEGORIES.map((category) => ({ category: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const match = categoryBySlug(category);
  if (!match) return {};
  return pageMetadata(match.label, `Published articles in ${match.label}.`, `/insights/category/${match.slug}`);
}

export default async function InsightCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const match = categoryBySlug(category);
  if (!match) notFound();
  const items = insightsInCategory(match.slug as InsightCategory);
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={match.label}
        lede="Published articles in this category. A draft, a review, an approval, or an archived record stays off this page."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/insights", label: "Insights" },
          { label: match.label },
        ]}
      />
      <Section>
        <InsightCategoryNav current={match.slug} />
        <div className="mt-10">
          <InsightList items={items} />
        </div>
      </Section>
    </>
  );
}
