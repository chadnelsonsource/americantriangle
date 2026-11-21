import { describe, expect, it } from "vitest";
import { nextEarningsState, nextPaymentState } from "./earnings";

describe("earnings ledger", () => {
  it("keeps work approval, earnings approval, and payout confirmation apart", () => {
    const pending = nextEarningsState("none", "work_approved");
    expect(pending).toEqual({ ok: true, state: "pending" });
    expect(nextEarningsState("pending", "invoice_created")).toEqual({ ok: true, state: "pending" });
    expect(nextEarningsState("pending", "approve_earnings")).toEqual({ ok: true, state: "approved" });
    expect(nextEarningsState("approved", "confirm_payout").ok).toBe(false);
    expect(nextEarningsState("approved", "initiate_payout")).toEqual({ ok: true, state: "payout_initiated" });
    expect(nextEarningsState("payout_initiated", "confirm_payout")).toEqual({ ok: true, state: "paid" });
  });

  it("does not approve earnings before work is approved", () => {
    expect(nextEarningsState("none", "approve_earnings").ok).toBe(false);
  });

  it("allows a failed payout to be initiated again", () => {
    expect(nextEarningsState("payout_initiated", "fail_payout")).toEqual({ ok: true, state: "payout_failed" });
    expect(nextEarningsState("payout_failed", "initiate_payout")).toEqual({
      ok: true,
      state: "payout_initiated",
    });
  });
});

describe("client payments", () => {
  it("ignores invoice creation as a payment success", () => {
    expect(nextPaymentState("requires_payment", "invoice.created")).toEqual({
      ok: true,
      state: "requires_payment",
    });
  });

  it("moves a payment to succeeded once", () => {
    const succeeded = nextPaymentState("requires_payment", "payment_intent.succeeded");
    expect(succeeded.ok && succeeded.state).toBe("succeeded");
    expect(nextPaymentState("succeeded", "payment_intent.succeeded").ok).toBe(false);
  });
});
