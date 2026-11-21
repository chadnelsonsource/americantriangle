import { describe, expect, it } from "vitest";
import { isRateLimited, nextDeliveryState, nextQualification, profileGaps } from "./operations";

describe("operations", () => {
  it("rate limits a fifth attempt inside the window", () => {
    const now = 10_000;
    const stamps = [9_900, 9_800, 9_700, 9_600];
    expect(isRateLimited(stamps, now, 1_000, 4)).toBe(true);
    expect(isRateLimited([1], now, 1_000, 4)).toBe(false);
  });

  it("advances delivery one stage at a time", () => {
    expect(nextDeliveryState("new_inquiry")).toEqual({ ok: true, state: "qualification" });
    expect(nextDeliveryState("support").ok).toBe(false);
  });

  it("tracks profile gaps and qualification", () => {
    expect(profileGaps({ skills: [], education: [], experience: [], languages: [], country: "", timeZone: "", availabilityHours: 0 })).toContain(
      "skills",
    );
    const review = nextQualification("pending_assessment", "assessment_submitted");
    expect(review.ok && review.state).toBe("under_review");
    expect(nextQualification("registered", "qualify").ok).toBe(false);
  });
});
