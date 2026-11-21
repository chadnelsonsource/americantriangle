import { describe, expect, it } from "vitest";
import { buildSnapshot, emptyCounts, settleNotification } from "./metrics";

describe("metrics and notifications", () => {
  it("returns null rates when there are no records", () => {
    const snapshot = buildSnapshot(emptyCounts());
    expect(snapshot.rates.approval).toBeNull();
    expect(snapshot.counts.invoicedCents).toBe(0);
  });

  it("computes rates only from the supplied counts", () => {
    const counts = { ...emptyCounts(), reviewsCompleted: 4, reviewsApproved: 3 };
    expect(buildSnapshot(counts).rates.approval).toBe(0.75);
  });

  it("keeps a committed domain row when email fails", () => {
    expect(settleNotification({ domainCommitted: true, emailOk: false })).toEqual({
      domainStatus: "committed",
      notificationStatus: "failed",
    });
  });
});
