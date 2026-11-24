import { describe, expect, it } from "vitest";
import { interestFromQuery, leadResult, partnershipCategoryFromQuery, reviewLead, routeLead } from "./leads";

const valid = {
  inquiryType: "model_intelligence",
  name: "Riley Chen",
  email: "riley@example.com",
  organization: "Northwind Labs",
  jobTitle: "Head of evaluation",
  industry: "software",
  message: "We need a reviewed preference set for an internal assistant.",
  timeline: "This quarter",
  scope: "One evaluation set",
  details: "",
  consent: true,
  companyWebsite: "",
};

describe("leads", () => {
  it("accepts a complete inquiry and routes delivery work", () => {
    const result = reviewLead(valid);
    expect(result.ok && result.discardAsSpam).toBe(false);
    if (result.ok && !result.discardAsSpam) expect(result.lead.jobTitle).toBe("Head of evaluation");
    expect(routeLead("model_intelligence")).toBe("delivery");
    expect(routeLead("integrated")).toBe("delivery");
    expect(routeLead("partnerships")).toBe("general");
    expect(routeLead("expert")).toBe("general");
    expect(routeLead("other")).toBe("general");
  });

  it("accepts a submission that leaves the optional fields blank", () => {
    const result = reviewLead({ ...valid, jobTitle: "", timeline: "", scope: "", details: "" });
    expect(result.ok && result.discardAsSpam).toBe(false);
  });

  it("rejects a short description, a missing industry, and missing consent", () => {
    const result = reviewLead({ ...valid, message: "too short", industry: "", consent: false });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.message).toMatch(/20 characters/);
      expect(result.fieldErrors.industry).toMatch(/industry/i);
      expect(result.fieldErrors.consent).toMatch(/Consent/);
    }
  });

  it("discards a filled honeypot without treating it as a stored lead", () => {
    const result = reviewLead({ ...valid, companyWebsite: "https://spam.example" });
    expect(result).toEqual({ ok: true, discardAsSpam: true });
  });

  it("maps older consultation links onto the current areas", () => {
    expect(interestFromQuery("ai_data")).toBe("data_infrastructure");
    expect(interestFromQuery("model_evaluation")).toBe("model_intelligence");
    expect(interestFromQuery("consulting")).toBe("enterprise_applications");
    expect(interestFromQuery("general")).toBe("other");
    expect(interestFromQuery("integrated")).toBe("integrated");
    expect(interestFromQuery(undefined)).toBe("other");
  });

  it("accepts a partnership proposal and drops partnership fields from a project inquiry", () => {
    const result = reviewLead({
      ...valid,
      inquiryType: "partnerships",
      industry: "",
      website: "https://northwind.example",
      partnershipCategory: "research",
      message: "A joint evaluation study with a written method and a recorded result.",
      capabilities: "The group already runs human evaluation studies for research teams.",
    });
    expect(result.ok && result.discardAsSpam).toBe(false);
    if (result.ok && !result.discardAsSpam) {
      expect(result.lead.partnershipCategory).toBe("research");
      expect(result.lead.website).toBe("https://northwind.example");
    }

    const project = reviewLead({ ...valid, website: "https://ignored.example", partnershipCategory: "business", capabilities: "Should not be stored." });
    expect(project.ok && project.discardAsSpam).toBe(false);
    if (project.ok && !project.discardAsSpam) {
      expect(project.lead.website).toBe("");
      expect(project.lead.partnershipCategory).toBe("");
      expect(project.lead.capabilities).toBe("");
    }
  });

  it("rejects a partnership proposal that omits the category, the collaboration, or a valid website", () => {
    const result = reviewLead({
      ...valid,
      inquiryType: "partnerships",
      industry: "",
      partnershipCategory: "",
      message: "too short",
      capabilities: "",
      website: "javascript:alert(1)",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.partnershipCategory).toMatch(/category/i);
      expect(result.fieldErrors.message).toMatch(/20 characters/);
      expect(result.fieldErrors.capabilities).toMatch(/experience/i);
      expect(result.fieldErrors.website).toMatch(/https/i);
    }
    expect(partnershipCategoryFromQuery("talent")).toBe("talent");
    expect(partnershipCategoryFromQuery("unknown")).toBe("");
  });

  it("accepts an expert application without an organization or an account", () => {
    const result = reviewLead({
      inquiryType: "expert",
      name: "Amina Cole",
      email: "amina@example.com",
      organization: "",
      message: "I can score written answers against a rubric the project provides.",
      capabilities: "Writing, research review, and preference comparisons.",
      consent: true,
      companyWebsite: "",
    });
    expect(result.ok).toBe(true);
    if (result.ok && !result.discardAsSpam) {
      expect(result.lead.organization).toBe("");
      expect(result.lead.capabilities).toMatch(/Writing/);
      expect(result.lead.website).toBe("");
    }
  });

  it("rejects an expert application that omits the work or the expertise", () => {
    const result = reviewLead({
      inquiryType: "expert",
      name: "Amina Cole",
      email: "amina@example.com",
      message: "too short",
      capabilities: "",
      consent: false,
      companyWebsite: "",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.message).toMatch(/20 characters/);
      expect(result.fieldErrors.capabilities).toMatch(/expertise/i);
      expect(result.fieldErrors.consent).toMatch(/Consent/);
    }
  });

  it("confirms an inquiry that was sent by email", () => {
    expect(leadResult({ stored: false, emailSent: false }).status).toBe("error");
    expect(leadResult({ stored: false, emailSent: false }).message).toMatch(/could not be sent/);
    expect(leadResult({ stored: false, emailSent: true }).message).toMatch(/sent by email/);
    expect(leadResult({ stored: false, emailSent: false, reference: "11111111-1111-4111-8111-111111111111" }).message).toMatch(/Reference 11111111/);
    expect(leadResult({ stored: false, emailSent: false, reference: "stack at file.ts" }).message).not.toMatch(/file\.ts/);
  });
});
