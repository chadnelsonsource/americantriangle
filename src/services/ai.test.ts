import { describe, expect, it, vi } from "vitest";
import { invokeModel, type ProviderAdapter } from "./ai";

const request = { purpose: "evaluate" as const, input: "Rank these two answers.", dataHandlingApproved: true };

describe("model gateway", () => {
  it("does not call a provider when data handling is not approved", async () => {
    const complete = vi.fn();
    const adapters: ProviderAdapter[] = [{ name: "openai", complete }];
    const result = await invokeModel({ ...request, dataHandlingApproved: false }, { provider: "openai", apiKey: "sk-test" }, adapters);
    expect(result).toEqual({ ok: false, error: "data_handling_not_approved" });
    expect(complete).not.toHaveBeenCalled();
  });

  it("does not call a provider without a server key", async () => {
    const complete = vi.fn();
    const result = await invokeModel(request, { provider: "anthropic" }, [{ name: "anthropic", complete }]);
    expect(result).toEqual({ ok: false, error: "provider_not_configured" });
    expect(complete).not.toHaveBeenCalled();
  });

  it("returns the adapter result and keeps the key on the call", async () => {
    const complete = vi.fn(async () => ({
      provider: "openai" as const,
      output: "scored",
      usage: { inputTokens: 10, outputTokens: 4 },
    }));
    const result = await invokeModel(request, { provider: "openai", apiKey: "server-key" }, [{ name: "openai", complete }]);
    expect(result.ok).toBe(true);
    expect(complete).toHaveBeenCalledWith(request, "server-key");
  });
});
