export type LogLevel = "info" | "warn" | "error";

export type LogFields = Record<string, string | number | boolean | null | undefined>;

const secretKey = /password|secret|token|authorization|cookie|api[-_]?key|dsn|credential|signature|email|message|body|payload|subject|phone|name/i;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const secretValue = /\b(?:sk|rk|whsec|pk)_(?:live|test)?_?[A-Za-z0-9]+|Bearer\s+\S+|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/gi;
const eventName = /^[a-z][a-z0-9._]{0,63}$/;
const eventCode = /^[a-z][a-z0-9_]{0,63}$/;
const identifier = /^[A-Za-z0-9_.:-]{1,80}$/;
const referenceId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type IntegrationId = "database" | "privilegedDatabase" | "email" | "payments" | "jobs";

const integrationLabels: Record<IntegrationId, string> = {
  database: "Database",
  privilegedDatabase: "Privileged database",
  email: "Email",
  payments: "Payments",
  jobs: "Background jobs",
};

export function safeDatabaseCode(code: unknown): string | null {
  return typeof code === "string" && /^[0-9A-Z]{5}$/.test(code) ? code : null;
}

export function visibleErrorReference(digest: unknown): string | null {
  return typeof digest === "string" && /^[A-Za-z0-9_-]{6,64}$/.test(digest) ? digest : null;
}

export function withReference(message: string, errorId: string | undefined): string {
  if (!errorId || !referenceId.test(errorId)) return message;
  return `${message} Reference ${errorId}.`;
}

export function providerOutage(status: unknown): boolean {
  return typeof status === "number" && status >= 500 && status < 600;
}

export function emailOutcome(input: { configured: boolean; providerError: boolean; thrown: boolean }): { ok: true } | { ok: false; error: "email_not_configured" | "email_failed" } {
  if (!input.configured) return { ok: false, error: "email_not_configured" };
  if (input.providerError || input.thrown) return { ok: false, error: "email_failed" };
  return { ok: true };
}

export function publicHealth(): { status: "ok" } {
  return { status: "ok" };
}

export function integrationHealth(flags: Record<IntegrationId, boolean>): {
  monitoring: "not_installed";
  integrations: { id: IntegrationId; label: string; state: "configured" | "off" }[];
} {
  return {
    monitoring: "not_installed",
    integrations: (Object.keys(integrationLabels) as IntegrationId[]).map((id) => ({
      id,
      label: integrationLabels[id],
      state: flags[id] ? "configured" : "off",
    })),
  };
}

export function buildLogRecord(input: {
  now: string;
  errorId: string;
  level: LogLevel;
  event: string;
  code: string;
  fields?: LogFields;
}): { time: string; level: LogLevel; event: string; code: string; errorId: string } & Record<string, string | number | boolean | null> {
  return {
    time: input.now,
    level: input.level,
    event: eventName.test(input.event) ? input.event : "app.unknown",
    code: eventCode.test(input.code) ? input.code : "unknown",
    errorId: visibleErrorReference(input.errorId) ?? "unknown",
    ...sanitizeFields(input.fields ?? {}),
  };
}

function sanitizeFields(fields: LogFields): Record<string, string | number | boolean | null> {
  const out: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue;
    if (!/^[A-Za-z][A-Za-z0-9]{0,40}$/.test(key) || secretKey.test(key)) continue;
    if (key === "databaseCode") {
      const code = safeDatabaseCode(value);
      if (code) out.databaseCode = code;
      continue;
    }
    if (typeof value === "string") {
      const cleaned = value.replace(emailPattern, "[redacted]").replace(secretValue, "[redacted]");
      if (identifier.test(cleaned)) out[key] = cleaned;
      continue;
    }
    if (typeof value === "number" && Number.isFinite(value)) out[key] = value;
    if (typeof value === "boolean") out[key] = value;
  }
  return out;
}
