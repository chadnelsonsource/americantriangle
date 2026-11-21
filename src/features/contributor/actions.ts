"use server";

import { createSupabaseServerClient } from "@/server/db/client";
import { profileGaps, type ContributorProfileInput } from "@/services/operations";

export type ProfileState = { message?: string };

function list(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function saveContributorProfile(_previous: ProfileState, formData: FormData): Promise<ProfileState> {
  const input: ContributorProfileInput = {
    skills: list(formData.get("skills")),
    education: list(formData.get("education")),
    experience: list(formData.get("experience")),
    languages: list(formData.get("languages")),
    country: String(formData.get("country") ?? ""),
    timeZone: String(formData.get("timeZone") ?? ""),
    availabilityHours: Number(formData.get("availabilityHours") ?? 0),
  };
  const gaps = profileGaps(input);
  if (gaps.length > 0) return { message: `Still needed: ${gaps.join(", ")}.` };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { message: "The profile store is not configured, so nothing was saved." };
  const { data } = await supabase.auth.getUser();
  if (!data.user) return { message: "Sign in before saving a profile." };

  const { error } = await supabase
    .from("contributor_profiles")
    .update({
      skills: input.skills,
      education: input.education,
      experience: input.experience,
      languages: input.languages,
      country: input.country.trim(),
      time_zone: input.timeZone.trim(),
      availability_hours: input.availabilityHours,
      qualification_status: "pending_assessment",
    })
    .eq("user_id", data.user.id);

  if (error) return { message: "The profile could not be saved." };
  return { message: "Profile saved. The next step is an assessment." };
}
