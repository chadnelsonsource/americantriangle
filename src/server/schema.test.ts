import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sql = readFileSync(path.join(root, "supabase/migrations/0001_init.sql"), "utf8");

const tables = [
  "profiles",
  "organizations",
  "organization_memberships",
  "contributor_profiles",
  "projects",
  "task_assignments",
  "submissions",
  "reviews",
  "earnings",
  "ledger_entries",
  "webhook_events",
  "leads",
  "internal_notes",
  "invoices",
  "audit_events",
];

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return filesUnder(full);
    return full.endsWith(".ts") || full.endsWith(".tsx") ? [full] : [];
  });
}

describe("schema guard", () => {
  it("enables row level security on sensitive tables", () => {
    for (const table of tables) {
      expect(sql).toContain(`alter table public.${table} enable row level security`);
    }
  });

  it("restricts partnership inserts and leaves inquiry reads on the staff policy", () => {
    const partnership = readFileSync(path.join(root, "supabase/migrations/0004_partnership_inquiries.sql"), "utf8");
    expect(partnership).toContain("partnership_category in ('technology', 'research', 'business', 'talent')");
    expect(partnership).not.toContain("for select");
    expect(sql).toContain("create policy leads_select_staff on public.leads for select to authenticated");
    expect(sql).toContain("using (public.platform_role() in ('project_manager', 'administrator', 'super_administrator'))");
  });

  it("keeps answer keys out of the browser grant", () => {
    expect(sql).toContain("grant select (id, version_id, position, question_type, prompt, choices)");
    expect(sql).not.toMatch(/grant select \(.*answer_key/i);
  });
});

describe("client boundary", () => {
  it("does not import the service-role client from components or app pages", () => {
    const roots = [path.join(root, "src/components"), path.join(root, "src/app")];
    const offenders = roots
      .flatMap(filesUnder)
      .filter((file) => !file.includes(`${path.sep}api${path.sep}`))
      .filter((file) => {
        const source = readFileSync(file, "utf8");
        return source.includes("server/db/admin") || source.includes("SUPABASE_SERVICE_ROLE_KEY");
      });
    expect(offenders).toEqual([]);
  });
});
