import { describe, expect, it } from "vitest";
import { isPublicInsight, nextInsightState, publishedInsights, relatedInsights, searchInsights, type Insight } from "./insights";

const published: Insight = {
  slug: "review-record",
  title: "What a stored review contains",
  summary: "A review is a decision stored with the work.",
  category: "research-evaluation",
  kind: "explanation",
  state: "published",
  publishedOn: "2026-11-18",
  updatedOn: "2026-11-18",
  author: { name: "Assigned editor", role: "Editorial" },
  body: ["The review decision stays with the submission."],
  featured: true,
};

describe("insights", () => {
  it("hides every state except a complete published record", () => {
    const hidden: Insight[] = (["draft", "review", "approved", "archived"] as const).map((state) => ({ ...published, slug: state, state, featured: false }));
    const nameless = { ...published, slug: "nameless", author: { name: "", role: "" } };
    expect(publishedInsights([...hidden, nameless, published]).map((item) => item.slug)).toEqual(["review-record"]);
    expect(isPublicInsight(nameless)).toBe(false);
  });

  it("searches published text and leaves drafts out", () => {
    const draft = { ...published, slug: "draft-note", state: "draft" as const, title: "Hidden draft about evaluation" };
    expect(searchInsights("evaluation", [draft, published]).map((item) => item.slug)).toEqual(["review-record"]);
    expect(searchInsights("   ", [draft, published])).toHaveLength(1);
  });

  it("relates published articles in the same category", () => {
    const other = { ...published, slug: "other", title: "Another evaluation note", featured: false };
    const elsewhere = { ...published, slug: "agents", category: "agents" as const, featured: false };
    expect(relatedInsights(published, [published, other, elsewhere]).map((item) => item.slug)).toEqual(["other"]);
  });

  it("moves an article through review before publication", () => {
    expect(nextInsightState("draft", "published").ok).toBe(false);
    expect(nextInsightState("draft", "review").ok).toBe(true);
    expect(nextInsightState("review", "approved").ok).toBe(true);
    expect(nextInsightState("approved", "published").ok).toBe(true);
    expect(nextInsightState("published", "archived").ok).toBe(true);
  });
});
