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
