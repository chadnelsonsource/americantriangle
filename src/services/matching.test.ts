import { describe, expect, it } from "vitest";
import { canAcceptInvitation, canApply, evaluateEligibility, type ContributorCandidate, type ProjectOpening } from "./matching";

const candidate: ContributorCandidate = {
  qualificationStatus: "qualified",
  skills: ["python", "annotation"],
  languages: ["en"],
  country: "US",
  availabilityHours: 10,
  assessmentPassedIds: ["assess-1"],
};

const opening: ProjectOpening = {
  requiredSkills: ["python"],
  requiredAssessmentIds: ["assess-1"],
  requiredLanguages: ["en"],
  allowedCountries: null,
  countryRestrictionReason: null,
  minAvailabilityHours: 5,
  capacity: 2,
  assignedCount: 0,
};

describe("matching", () => {
  it("accepts a qualified contributor who meets every rule", () => {
    expect(evaluateEligibility(candidate, opening).eligible).toBe(true);
  });

  it("rejects an unqualified contributor and a duplicate application", () => {
    const eligibility = evaluateEligibility({ ...candidate, qualificationStatus: "under_review" }, opening);
    expect(canApply({ alreadyApplied: false, eligibility }).reason).toBe("not_qualified");
    expect(canApply({ alreadyApplied: true, eligibility: evaluateEligibility(candidate, opening) }).reason).toBe(
      "duplicate_application",
    );
  });

  it("rejects a country limit that has no legal reason", () => {
    const result = evaluateEligibility(candidate, {
      ...opening,
      allowedCountries: ["US"],
      countryRestrictionReason: "  ",
    });
    expect(result.reasons).toContain("country_rule_without_legal_reason");
  });

  it("rejects a second assignment and a full project", () => {
    const full = evaluateEligibility(candidate, { ...opening, assignedCount: 2 });
    expect(canAcceptInvitation({ alreadyAssigned: false, eligibility: full }).reason).toBe("at_capacity");
    expect(
      canAcceptInvitation({ alreadyAssigned: true, eligibility: evaluateEligibility(candidate, opening) }).reason,
    ).toBe("duplicate_assignment");
  });
});
