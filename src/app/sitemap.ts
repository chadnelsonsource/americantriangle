import type { MetadataRoute } from "next";
import { insightsInCategory, publishedInsights, type InsightCategory } from "@/content/insights";
import { canonicalUrl, indexablePublicRoutes } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = indexablePublicRoutes.filter((path) => {
    const prefix = "/insights/category/";
    if (!path.startsWith(prefix)) return true;
    return insightsInCategory(path.slice(prefix.length) as InsightCategory).length > 0;
  }).map((path) => ({
    url: canonicalUrl(path),
    lastModified: new Date("2026-11-18"),
  }));
  const articles = publishedInsights().map((article) => ({
    url: canonicalUrl(`/insights/${article.slug}`),
    lastModified: new Date(article.updatedOn),
  }));
  return [...pages, ...articles];
}
