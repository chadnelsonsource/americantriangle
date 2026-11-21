import { describe, expect, it } from "vitest";
import { canReview, earningsGate, nextReviewState } from "./reviews";

describe("reviews", () => {
  it("blocks self review unless a named exception exists", () => {
    expect(canReview({ reviewerId: "a", authorId: "a", exceptionGranted: false }).reason).toBe("self_review");
    expect(canReview({ reviewerId: "a", authorId: "a", exceptionGranted: true }).ok).toBe(true);
  });

  it("walks approval, revision, and dispute", () => {
    expect(nextReviewState("under_review", "approved").ok).toBe(true);
    expect(nextReviewState("under_review", "revision_required").ok).toBe(true);
    expect(nextReviewState("rejected", "disputed").ok).toBe(true);
    expect(nextReviewState("approved", "rejected").ok).toBe(false);
  });

  it("holds earnings until the review is approved", () => {
    expect(earningsGate("revision_required").ok).toBe(false);
    expect(earningsGate("approved").ok).toBe(true);
  });
});
