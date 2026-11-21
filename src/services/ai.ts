export const PROVIDERS = ["openai", "anthropic", "google", "openai_compatible"] as const;

export type ProviderName = (typeof PROVIDERS)[number];

export type ModelPurpose = "generate" | "structured" | "classify" | "embed" | "evaluate" | "summarize" | "score";

export interface ModelRequest {
  purpose: ModelPurpose;
  input: string;
  dataHandlingApproved: boolean;
}

export interface ModelResult {
  provider: ProviderName;
  output: string;
  usage: { inputTokens: number; outputTokens: number };
}

export interface ProviderAdapter {
  name: ProviderName;
  complete(request: ModelRequest, apiKey: string): Promise<ModelResult>;
}

export function selectAdapter(name: ProviderName, adapters: readonly ProviderAdapter[]): ProviderAdapter | undefined {
  return adapters.find((adapter) => adapter.name === name);
}

export async function invokeModel(
  request: ModelRequest,
  env: { provider: ProviderName; apiKey?: string },
  adapters: readonly ProviderAdapter[],
): Promise<{ ok: true; result: ModelResult } | { ok: false; error: string }> {
  if (!request.dataHandlingApproved) return { ok: false, error: "data_handling_not_approved" };
  if (!request.input.trim()) return { ok: false, error: "empty_input" };
  if (!env.apiKey) return { ok: false, error: "provider_not_configured" };
  const adapter = selectAdapter(env.provider, adapters);
  if (!adapter) return { ok: false, error: "adapter_missing" };
  const result = await adapter.complete(request, env.apiKey);
  return { ok: true, result };
}

export function usageCostCents(usage: { inputTokens: number; outputTokens: number }, inputPerMillion: number, outputPerMillion: number): number {
  const cost = (usage.inputTokens / 1_000_000) * inputPerMillion + (usage.outputTokens / 1_000_000) * outputPerMillion;
  return Math.round(cost);
}
