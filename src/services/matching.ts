export type QualificationStatus =
  | "registered"
  | "profile_incomplete"
  | "pending_assessment"
  | "under_review"
  | "qualified"
  | "rejected"
  | "suspended";

export interface ContributorCandidate {
  qualificationStatus: QualificationStatus;
  skills: readonly string[];
  languages: readonly string[];
  country: string;
  availabilityHours: number;
  assessmentPassedIds: readonly string[];
}

export interface ProjectOpening {
  requiredSkills: readonly string[];
  requiredAssessmentIds: readonly string[];
  requiredLanguages: readonly string[];
  allowedCountries: readonly string[] | null;
  countryRestrictionReason: string | null;
  minAvailabilityHours: number;
  capacity: number;
  assignedCount: number;
}

export interface Eligibility {
  eligible: boolean;
  reasons: string[];
}

export function evaluateEligibility(candidate: ContributorCandidate, opening: ProjectOpening): Eligibility {
  const reasons: string[] = [];

  if (candidate.qualificationStatus !== "qualified") reasons.push("not_qualified");

  for (const skill of opening.requiredSkills) {
    if (!candidate.skills.includes(skill)) reasons.push(`missing_skill:${skill}`);
  }

  for (const assessmentId of opening.requiredAssessmentIds) {
    if (!candidate.assessmentPassedIds.includes(assessmentId)) {
      reasons.push(`missing_assessment:${assessmentId}`);
    }
  }

  for (const language of opening.requiredLanguages) {
    if (!candidate.languages.includes(language)) reasons.push(`missing_language:${language}`);
  }

  if (opening.allowedCountries && opening.allowedCountries.length > 0) {
    if (!opening.countryRestrictionReason?.trim()) {
      reasons.push("country_rule_without_legal_reason");
    } else if (!opening.allowedCountries.includes(candidate.country)) {
      reasons.push("country_not_allowed");
    }
  }

  if (candidate.availabilityHours < opening.minAvailabilityHours) reasons.push("availability");
  if (opening.assignedCount >= opening.capacity) reasons.push("at_capacity");

  return { eligible: reasons.length === 0, reasons };
}

export function canApply(input: { alreadyApplied: boolean; eligibility: Eligibility }): {
  ok: boolean;
  reason: string;
} {
  if (input.alreadyApplied) return { ok: false, reason: "duplicate_application" };
  if (!input.eligibility.eligible) return { ok: false, reason: input.eligibility.reasons[0] ?? "ineligible" };
  return { ok: true, reason: "eligible" };
}

export function canAcceptInvitation(input: {
  alreadyAssigned: boolean;
  eligibility: Eligibility;
}): { ok: boolean; reason: string } {
  if (input.alreadyAssigned) return { ok: false, reason: "duplicate_assignment" };
  if (!input.eligibility.eligible) return { ok: false, reason: input.eligibility.reasons[0] ?? "ineligible" };
  return { ok: true, reason: "eligible" };
}
