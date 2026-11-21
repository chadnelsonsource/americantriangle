import { describe, expect, it } from "vitest";
import { buildLogRecord, emailOutcome, integrationHealth, providerOutage, publicHealth, visibleErrorReference, withReference } from "./record";

describe("operational log record", () => {
  it("keeps the code and drops secrets, addresses, and message text", () => {
    const record = buildLogRecord({
      now: "2026-11-20T00:00:00.000Z",
      errorId: "11111111-1111-4111-8111-111111111111",
      level: "error",
      event: "leads.insert",
      code: "store_failed",
      fields: {
        databaseCode: "23505",
        eventId: "evt_123",
        password: "correct horse",
        email: "person@example.com",
        message: "private inquiry text",
        signature: "whsec_test_secret",
        note: "person@example.com",
        token: "sk_live_abc123",
      },
    });
    const encoded = JSON.stringify(record);
    expect(record).toMatchObject({ event: "leads.insert", code: "store_failed", databaseCode: "23505", eventId: "evt_123" });
    expect(encoded).not.toMatch(/correct horse|person@example.com|private inquiry|whsec_|sk_live|password|signature/i);
  });

  it("rejects an event name or code that is not a stable identifier", () => {
    const record = buildLogRecord({
      now: "2026-11-20T00:00:00.000Z",
      errorId: "not a digest",
      level: "warn",
      event: "User typed this",
      code: "Bad Code",
    });
    expect(record.event).toBe("app.unknown");
    expect(record.code).toBe("unknown");
    expect(record.errorId).toBe("unknown");
  });
});

describe("failure references", () => {
  it("shows a digest and a recorded reference, and hides a stack", () => {
    expect(visibleErrorReference("abc_DEF-123456")).toBe("abc_DEF-123456");
    expect(visibleErrorReference("Error: secret at file.ts:12")).toBeNull();
    expect(withReference("The request was not recorded.", "11111111-1111-4111-8111-111111111111")).toMatch(/Reference 11111111/);
    expect(withReference("The request was not recorded.", "stack trace")).toBe("The request was not recorded.");
  });

  it("logs a provider outage and leaves a rejected credential unlogged by status", () => {
    expect(providerOutage(503)).toBe(true);
    expect(providerOutage(400)).toBe(false);
    expect(emailOutcome({ configured: false, providerError: true, thrown: false })).toEqual({ ok: false, error: "email_not_configured" });
    expect(emailOutcome({ configured: true, providerError: false, thrown: true })).toEqual({ ok: false, error: "email_failed" });
    expect(emailOutcome({ configured: true, providerError: false, thrown: false })).toEqual({ ok: true });
  });
});

describe("health", () => {
  it("returns liveness without integration details", () => {
    expect(publicHealth()).toEqual({ status: "ok" });
  });

  it("reports presence of environment values and leaves monitoring uninstalled", () => {
    const health = integrationHealth({
      database: true,
      privilegedDatabase: false,
      email: false,
      payments: true,
      jobs: false,
    });
    expect(health.monitoring).toBe("not_installed");
    expect(health.integrations.find((item) => item.id === "database")?.state).toBe("configured");
    expect(health.integrations.find((item) => item.id === "email")?.state).toBe("off");
    expect(JSON.stringify(health)).not.toMatch(/sk_|service_role|dsn/i);
  });
});
