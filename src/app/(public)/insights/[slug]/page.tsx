import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareLinks } from "@/components/marketing/share-links";
import { PageHero } from "@/components/marketing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { articleMetadata } from "@/config/seo";
import { canonicalUrl, site, siteOrigin } from "@/config/site";
import { categoryBySlug, insightBySlug, INSIGHT_KIND_LABELS, publishedInsights, readingMinutes, relatedInsights } from "@/content/insights";

export function generateStaticParams() {
  return publishedInsights().map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = insightBySlug(slug);
  if (!article) return {};
  return articleMetadata({
    title: article.title,
    description: article.summary,
    path: `/insights/${article.slug}`,
    publishedOn: article.publishedOn,
    updatedOn: article.updatedOn,
    authorName: article.author.name,
  });
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = insightBySlug(slug);
  if (!article) notFound();
  const category = categoryBySlug(article.category);
  const url = canonicalUrl(`/insights/${article.slug}`);
  const related = relatedInsights(article);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          datePublished: article.publishedOn,
          dateModified: article.updatedOn,
          author: { "@type": "Person", name: article.author.name, jobTitle: article.author.role },
          publisher: { "@id": `${siteOrigin}/#organization`, name: site.name },
          mainEntityOfPage: url,
          image: `${siteOrigin}/opengraph-image`,
        }}
      />
      <PageHero
        eyebrow={category?.label ?? "Insights"}
        title={article.title}
        lede={article.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/insights", label: "Insights" },
          { href: `/insights/category/${article.category}`, label: category?.label ?? "Category" },
          { label: article.title },
        ]}
      />
      <article className="page py-16 md:py-24">
        <div className="measure">
        <p className="text-sm text-muted">
          {INSIGHT_KIND_LABELS[article.kind]} · {readingMinutes(article)} min read
        </p>
        <p className="mt-3 text-sm text-muted">
          Published {article.publishedOn}
          {article.updatedOn !== article.publishedOn ? ` · Updated ${article.updatedOn}` : ""}
        </p>
        <p className="mt-3 text-sm">
          {article.author.name}
          <span className="text-muted"> · {article.author.role}</span>
        </p>
        <div className="mt-8 space-y-5 text-base leading-7 text-ink">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {article.imageAlt ? <p className="mt-8 text-sm text-muted">Image description: {article.imageAlt}</p> : null}
        <div className="mt-10 border-t border-line pt-6">
          <ShareLinks url={url} title={article.title} />
        </div>
        <div className="mt-10">
          <h2 className="text-2xl">Related articles</h2>
          {related.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No other published article is in this category.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/insights/${item.slug}`} className="underline decoration-line underline-offset-4">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </article>
    </>
  );
}
