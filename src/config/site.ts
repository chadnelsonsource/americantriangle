import { brandLine, brandSupport } from "@/config/brand";

export const site = {
  name: "Americantriangle",
  title: "Americantriangle",
  description: `${brandSupport} Americantriangle prepares reviewed data, evaluates model outputs, and delivers enterprise applications as projects.`,
  positioning: brandLine,
} as const;

export function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

/** Public origin used for canonical URLs, the sitemap, and social metadata. */
export const siteOrigin = "https://americantriangle.com";

export function canonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? siteOrigin : `${siteOrigin}${normalized}`;
}

export const publicRoutes = [
  "/",
  "/services/data",
  "/services/data/annotation",
  "/services/data/feedback",
  "/services/data/evaluation",
  "/services/intelligence",
  "/services/engineering",
  "/services/engineering/applications",
  "/services/engineering/agents",
  "/platform",
  "/technology",
  "/industries",
  "/solutions",
  "/industries/healthcare",
  "/industries/financial-services",
  "/industries/software",
  "/industries/education",
  "/industries/manufacturing",
  "/industries/retail",
  "/about",
  "/careers",
  "/insights",
  "/insights/search",
  "/insights/category/data-infrastructure",
  "/insights/category/model-training",
  "/insights/category/research-evaluation",
  "/insights/category/enterprise-applications",
  "/insights/category/agents",
  "/insights/category/safety",
  "/insights/category/industry",
  "/insights/category/engineering",
  "/resources",
  "/resources/preference-feedback",
  "/resources/review-decisions",
  "/resources/engineering-milestones",
  "/contributors/join",
  "/partners",
  "/contact",
  "/consultation",
  "/trust",
  "/quality",
  "/privacy",
  "/terms",
  "/cookies",
] as const;

/** Search is a filter, not a document. It stays out of the sitemap. */
export const indexablePublicRoutes = publicRoutes.filter((path) => path !== "/insights/search");
