export function isRateLimited(
  timestamps: readonly number[],
  now: number,
  windowMs: number,
  max: number,
): boolean {
  if (max < 1 || windowMs < 1) return true;
  const recent = timestamps.filter((timestamp) => now - timestamp < windowMs && timestamp <= now);
  return recent.length >= max;
}

export const DELIVERY_STATES = [
  "new_inquiry",
  "qualification",
  "discovery",
  "estimation",
  "proposal",
  "contract",
  "kickoff",
  "execution",
  "quality_review",
  "client_approval",
  "delivery",
  "support",
] as const;

export type DeliveryState = (typeof DELIVERY_STATES)[number];

export function nextDeliveryState(
  current: DeliveryState,
): { ok: true; state: DeliveryState } | { ok: false; error: "terminal" } {
  const index = DELIVERY_STATES.indexOf(current);
  const next = DELIVERY_STATES[index + 1];
  if (!next) return { ok: false, error: "terminal" };
  return { ok: true, state: next };
}

export interface ContributorProfileInput {
  skills: readonly string[];
  education: readonly string[];
  experience: readonly string[];
  languages: readonly string[];
  country: string;
  timeZone: string;
  availabilityHours: number;
}

export function profileGaps(input: ContributorProfileInput): string[] {
  const gaps: string[] = [];
  if (input.skills.length === 0) gaps.push("skills");
  if (input.education.length === 0) gaps.push("education");
  if (input.experience.length === 0) gaps.push("experience");
  if (input.languages.length === 0) gaps.push("languages");
  if (!input.country.trim()) gaps.push("country");
  if (!input.timeZone.trim()) gaps.push("timeZone");
  if (!Number.isFinite(input.availabilityHours) || input.availabilityHours <= 0) gaps.push("availability");
  return gaps;
}

export type QualificationEvent = "save_incomplete" | "profile_completed" | "assessment_submitted" | "qualify" | "reject" | "suspend";

export type QualificationStatus =
  | "registered"
  | "profile_incomplete"
  | "pending_assessment"
  | "under_review"
  | "qualified"
  | "rejected"
  | "suspended";

export function nextQualification(
  current: QualificationStatus,
  event: QualificationEvent,
): { ok: true; state: QualificationStatus } | { ok: false; error: "invalid_transition" } {
  const table: Partial<Record<QualificationStatus, Partial<Record<QualificationEvent, QualificationStatus>>>> = {
    registered: { save_incomplete: "profile_incomplete" },
    profile_incomplete: { save_incomplete: "profile_incomplete", profile_completed: "pending_assessment" },
    pending_assessment: { assessment_submitted: "under_review" },
    under_review: { qualify: "qualified", reject: "rejected" },
    qualified: { suspend: "suspended" },
    rejected: {},
    suspended: {},
  };
  const next = table[current]?.[event];
  if (!next) return { ok: false, error: "invalid_transition" };
  return { ok: true, state: next };
}
