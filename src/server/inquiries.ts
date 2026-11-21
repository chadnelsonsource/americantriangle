import "server-only";
import { listLeads, type StoredLead } from "@/server/repositories/leads";
import { createSupabaseServerClient } from "@/server/db/client";
import { ACCOUNT_STATUSES, authorize, PLATFORM_ROLES, type AccountStatus, type PlatformRole } from "@/services/authorization";

export type InquiryQueue =
  | { status: "unconfigured" }
  | { status: "unauthenticated" }
  | { status: "forbidden" }
  | { status: "read_failed"; errorId?: string }
  | { status: "ready"; leads: StoredLead[] };

function isRole(value: unknown): value is PlatformRole {
  return typeof value === "string" && (PLATFORM_ROLES as readonly string[]).includes(value);
}

function isStatus(value: unknown): value is AccountStatus {
  return typeof value === "string" && (ACCOUNT_STATUSES as readonly string[]).includes(value);
}

export async function readInquiryQueue(): Promise<InquiryQueue> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "unconfigured" };

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { status: "unauthenticated" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("platform_role, account_status")
    .eq("id", userData.user.id)
    .maybeSingle();
  if (!profile || !isRole(profile.platform_role) || !isStatus(profile.account_status)) return { status: "forbidden" };

  const decision = authorize(
    {
      userId: userData.user.id,
      accountStatus: profile.account_status,
      platformRole: profile.platform_role,
      organizationIds: [],
      projectIds: [],
    },
    "inquiry.read",
  );
  if (!decision.allowed) return { status: "forbidden" };

  const listed = await listLeads();
  if (!listed.ok && listed.error === "data_store_unconfigured") return { status: "unconfigured" };
  if (!listed.ok) return { status: "read_failed", errorId: listed.errorId };
  return { status: "ready", leads: listed.leads };
}
