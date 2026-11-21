export const INSIGHT_CATEGORIES = [
  { slug: "data-infrastructure", label: "AI Data Infrastructure" },
  { slug: "model-training", label: "AI Model Training & Fine-Tuning" },
  { slug: "research-evaluation", label: "AI Research & Evaluation" },
  { slug: "enterprise-applications", label: "Enterprise AI Applications" },
  { slug: "agents", label: "AI Agents & Automation" },
  { slug: "safety", label: "AI Safety & Responsible AI" },
  { slug: "industry", label: "Industry Applications" },
  { slug: "engineering", label: "Technology & Engineering" },
] as const;

export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number]["slug"];

export const INSIGHT_STATES = ["draft", "review", "approved", "published", "archived"] as const;

export type InsightState = (typeof INSIGHT_STATES)[number];

export const INSIGHT_KINDS = ["explanation", "commentary", "guide", "analysis", "tutorial"] as const;

export type InsightKind = (typeof INSIGHT_KINDS)[number];

export const INSIGHT_KIND_LABELS: Record<InsightKind, string> = {
  explanation: "Technical explanation",
  commentary: "Research commentary",
  guide: "Implementation guide",
  analysis: "Industry analysis",
  tutorial: "Tutorial",
};

const TRANSITIONS: Record<InsightState, readonly InsightState[]> = {
  draft: ["review"],
  review: ["draft", "approved"],
  approved: ["review", "published"],
  published: ["archived"],
  archived: ["draft"],
};

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  category: InsightCategory;
  kind: InsightKind;
  state: InsightState;
  publishedOn: string;
  updatedOn: string;
  author: { name: string; role: string };
  body: readonly string[];
  imageAlt?: string;
  featured?: boolean;
};

export const insights: readonly Insight[] = [];

export function categoryBySlug(slug: string): (typeof INSIGHT_CATEGORIES)[number] | undefined {
  return INSIGHT_CATEGORIES.find((category) => category.slug === slug);
}

export function nextInsightState(current: InsightState, next: InsightState): { ok: true; state: InsightState } | { ok: false; error: "invalid_transition" } {
  if (!TRANSITIONS[current].includes(next)) return { ok: false, error: "invalid_transition" };
  return { ok: true, state: next };
}

export function isPublicInsight(item: Insight): boolean {
  return (
    item.state === "published" &&
    item.author.name.trim().length > 1 &&
    item.author.role.trim().length > 1 &&
    item.title.trim().length > 0 &&
    item.summary.trim().length > 0 &&
    item.body.length > 0 &&
    /^\d{4}-\d{2}-\d{2}$/.test(item.publishedOn) &&
    /^\d{4}-\d{2}-\d{2}$/.test(item.updatedOn)
  );
}

export function publishedInsights(items: readonly Insight[] = insights): Insight[] {
  return items.filter(isPublicInsight);
}

export function insightBySlug(slug: string, items: readonly Insight[] = insights): Insight | undefined {
  return publishedInsights(items).find((item) => item.slug === slug);
}

export function featuredInsight(items: readonly Insight[] = insights): Insight | undefined {
  return publishedInsights(items).find((item) => item.featured);
}

export function latestInsights(items: readonly Insight[] = insights): Insight[] {
  return publishedInsights(items)
    .slice()
    .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}

export function insightsInCategory(category: InsightCategory, items: readonly Insight[] = insights): Insight[] {
  return latestInsights(items).filter((item) => item.category === category);
}

export function relatedInsights(item: Insight, items: readonly Insight[] = insights): Insight[] {
  return insightsInCategory(item.category, items)
    .filter((candidate) => candidate.slug !== item.slug)
    .slice(0, 3);
}

export function searchInsights(query: string, items: readonly Insight[] = insights): Insight[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return latestInsights(items);
  return latestInsights(items).filter((item) => {
    const haystack = [item.title, item.summary, item.body.join(" "), categoryBySlug(item.category)?.label ?? ""].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export function readingMinutes(item: Pick<Insight, "body">): number {
  const words = item.body.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
