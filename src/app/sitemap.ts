import type { MetadataRoute } from "next";
import { publishedInsights } from "@/content/insights";
import { appUrl, publicRoutes } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = appUrl();
  const pages = publicRoutes.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: new Date("2026-11-18"),
  }));
  const articles = publishedInsights().map((article) => ({
    url: new URL(`/insights/${article.slug}`, base).toString(),
    lastModified: new Date(article.updatedOn),
  }));
  return [...pages, ...articles];
}
