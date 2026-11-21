import "server-only";
import { createSupabaseServerClient } from "@/server/db/client";
import { logOperationalEvent } from "@/server/observability/log";
import { safeDatabaseCode } from "@/server/observability/record";
import type { LeadInput } from "@/services/leads";

export type StoredLead = {
  id: string;
  createdAt: string;
  inquiryType: string;
  name: string;
  email: string;
  organization: string;
  website: string;
  partnershipCategory: string;
  message: string;
  capabilities: string;
  details: string;
  route: string;
};

export async function insertLead(lead: LeadInput, route: string): Promise<{ ok: true } | { ok: false; error: "data_store_unconfigured" | "store_failed"; errorId?: string }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "data_store_unconfigured" };
  const { error } = await supabase.from("leads").insert({
    inquiry_type: lead.inquiryType,
    name: lead.name,
    email: lead.email,
    organization: lead.organization,
    job_title: lead.jobTitle,
    industry: lead.industry,
    message: lead.message,
    timeline: lead.timeline,
    scope: lead.scope,
    details: lead.details,
    website: lead.website,
    partnership_category: lead.partnershipCategory,
    capabilities: lead.capabilities,
    route,
  });
  if (error) {
    return {
      ok: false,
      error: "store_failed",
      errorId: logOperationalEvent({ level: "error", event: "leads.insert", code: "store_failed", fields: { databaseCode: safeDatabaseCode(error.code) } }).errorId,
    };
  }
  return { ok: true };
}

export async function listLeads(): Promise<{ ok: true; leads: StoredLead[] } | { ok: false; error: "data_store_unconfigured" | "read_failed"; errorId?: string }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "data_store_unconfigured" };
  const { data, error } = await supabase
    .from("leads")
    .select("id, created_at, inquiry_type, name, email, organization, website, partnership_category, message, capabilities, details, route")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error || !data) {
    return {
      ok: false,
      error: "read_failed",
      errorId: logOperationalEvent({ level: "error", event: "leads.read", code: "read_failed", fields: { databaseCode: safeDatabaseCode(error?.code) } }).errorId,
    };
  }
  return {
    ok: true,
    leads: data.map((row) => ({
      id: String(row.id),
      createdAt: String(row.created_at),
      inquiryType: String(row.inquiry_type),
      name: String(row.name),
      email: String(row.email),
      organization: String(row.organization),
      website: String(row.website ?? ""),
      partnershipCategory: String(row.partnership_category ?? ""),
      message: String(row.message),
      capabilities: String(row.capabilities ?? ""),
      details: String(row.details ?? ""),
      route: String(row.route),
    })),
  };
}
