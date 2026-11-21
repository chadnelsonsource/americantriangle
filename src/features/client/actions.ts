"use server";

import { createSupabaseServerClient } from "@/server/db/client";
import { validateFile } from "@/services/files";

export type InquiryState = { message?: string };

const services = new Set(["data_operations", "model_evaluation", "consulting", "application", "agent", "integration"]);

export async function createInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const service = String(formData.get("service") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const requirements = String(formData.get("requirements") ?? "").trim();
  if (!services.has(service) || name.length < 2 || requirements.length < 20) {
    return { message: "Choose a service, name the work, and describe it in at least 20 characters." };
  }
  const attachment = formData.get("attachment");
  if (attachment instanceof File && attachment.size > 0) {
    const fileCheck = validateFile({ name: attachment.name, type: attachment.type, size: attachment.size });
    if (!fileCheck.ok) return { message: `The attachment was rejected (${fileCheck.reason}).` };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { message: "The project store is not configured, so the inquiry was not saved." };
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { message: "Sign in as a client owner before creating an inquiry." };

  const { data: membership } = await supabase
    .from("organization_memberships")
    .select("organization_id")
    .eq("user_id", userData.user.id)
    .eq("member_role", "owner")
    .limit(1)
    .maybeSingle();

  if (!membership?.organization_id) return { message: "Create your organization on the client home before sending an inquiry." };

  const { error } = await supabase.from("projects").insert({
    organization_id: membership.organization_id,
    name,
    project_type: service,
    delivery_state: "new_inquiry",
  });
  if (error) return { message: "The inquiry could not be saved." };
  return { message: "The project name and service are stored for your organization. The requirements text and any attachment were not saved." };
}

export async function createOrganization(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const name = String(formData.get("organizationName") ?? "").trim();
  if (name.length < 2) return { message: "Enter the organization name." };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { message: "The organization store is not configured, so nothing was created." };
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { message: "Sign in as a client owner first." };
  const { error } = await supabase.from("organizations").insert({ name, created_by: userData.user.id });
  if (error) return { message: "The organization could not be created." };
  return { message: "Organization created. You are the owner." };
}
