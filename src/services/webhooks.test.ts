import { describe, expect, it } from "vitest";
import { acceptWebhookEvent, planLedgerEntry, webhookWriteResult } from "./webhooks";

describe("webhook idempotency", () => {
  it("accepts an event once", () => {
    const seen = new Set<string>();
    expect(acceptWebhookEvent(seen, "evt_1").accept).toBe(true);
    seen.add("evt_1");
    expect(acceptWebhookEvent(seen, "evt_1")).toEqual({ accept: false, reason: "duplicate" });
  });

  it("does not draft a second ledger row for a replay", () => {
    const seen = new Set(["evt_1"]);
    const replay = planLedgerEntry(seen, {
      eventId: "evt_1",
      amountCents: 2500,
      currency: "USD",
      direction: "credit",
      reason: "client_payment",
    });
    expect(replay).toEqual({ ok: false, reason: "duplicate" });
  });

  it("retries a failed write and accepts a unique conflict", () => {
    expect(webhookWriteResult(undefined)).toBe("stored");
    expect(webhookWriteResult("23505")).toBe("duplicate");
    expect(webhookWriteResult("08006")).toBe("failed");
  });
});
