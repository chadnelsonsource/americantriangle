import { z } from "zod";

export const INTERESTS = [
  "data_infrastructure",
  "model_intelligence",
  "enterprise_applications",
  "integrated",
  "partnerships",
  "expert",
  "other",
] as const;

export type InquiryType = (typeof INTERESTS)[number];

export const INQUIRY_TYPES = INTERESTS;

export const PROJECT_INQUIRY_TYPES = INTERESTS.filter(
  (type): type is Exclude<InquiryType, "partnerships" | "expert"> => type !== "partnerships" && type !== "expert",
);

export type ProjectInquiryType = (typeof PROJECT_INQUIRY_TYPES)[number];

export const INQUIRY_LABELS: Record<InquiryType, string> = {
  data_infrastructure: "AI Data Infrastructure",
  model_intelligence: "AI Model Training, Research & Evaluation",
  enterprise_applications: "Enterprise AI Applications",
  integrated: "Integrated AI Solutions",
  partnerships: "Strategic Partnerships",
  expert: "Expert application",
  other: "Other",
};

const LEGACY_INTERESTS: Record<string, InquiryType> = {
  ai_data: "data_infrastructure",
  model_evaluation: "model_intelligence",
  consulting: "enterprise_applications",
  custom_development: "enterprise_applications",
  general: "other",
};

export const INDUSTRIES = [
  "healthcare",
  "financial-services",
  "software",
  "education",
  "manufacturing",
  "retail",
  "other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const INDUSTRY_LABELS: Record<Industry, string> = {
  healthcare: "Healthcare and life sciences",
  "financial-services": "Financial services",
  software: "Technology and software",
  education: "Education and research",
  manufacturing: "Manufacturing and industrial operations",
  retail: "Retail and e-commerce",
  other: "Other",
};

export const PARTNERSHIP_CATEGORIES = ["technology", "research", "business", "talent"] as const;

export type PartnershipCategory = (typeof PARTNERSHIP_CATEGORIES)[number];

export const PARTNERSHIP_LABELS: Record<PartnershipCategory, string> = {
  technology: "Technology partnerships",
  research: "Research partnerships",
  business: "Business partnerships",
  talent: "Talent and expert collaboration",
};

export function partnershipCategoryFromQuery(value: string | undefined): PartnershipCategory | "" {
  if (value && (PARTNERSHIP_CATEGORIES as readonly string[]).includes(value)) return value as PartnershipCategory;
  return "";
}

const optionalText = (max: number, message: string) => z.string().trim().max(max, message).optional().default("");

function acceptableWebsite(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}

export const leadSchema = z
  .object({
    inquiryType: z.enum(INTERESTS, { errorMap: () => ({ message: "Choose an area of interest." }) }),
    name: z.string().trim().max(120, "Enter your full name in 120 characters or fewer.").optional().default(""),
    email: z.string().trim().max(200, "Enter a valid business email.").optional().default(""),
    organization: z.string().trim().max(200, "Enter the company name in 200 characters or fewer.").optional().default(""),
    jobTitle: optionalText(120, "Job title must be 120 characters or fewer."),
    industry: z.string().trim().max(80, "Choose an industry.").optional().default(""),
    message: z.string().trim().max(5000, "The description must be 5000 characters or fewer.").optional().default(""),
    timeline: optionalText(120, "Timeline must be 120 characters or fewer."),
    scope: optionalText(200, "Scope or budget must be 200 characters or fewer."),
    details: optionalText(2000, "Additional information must be 2000 characters or fewer."),
    website: z.string().trim().max(200, "Website must be 200 characters or fewer.").optional().default(""),
    partnershipCategory: z.string().trim().max(40).optional().default(""),
    capabilities: optionalText(2000, "Relevant experience must be 2000 characters or fewer."),
    consent: z.boolean().optional().default(false),
    companyWebsite: z.string().max(200).optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.name.trim().length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["name"], message: "Enter your full name." });
    }
    if (!z.string().email().safeParse(data.email).success) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: "Enter a valid business email." });
    }
    if (data.inquiryType !== "expert" && data.organization.trim().length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["organization"], message: "Enter the company name." });
    }
    if (data.consent !== true) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["consent"], message: "Consent is required before we contact you about this inquiry." });
    }
    if (data.inquiryType === "expert") {
      if (data.organization.trim().length === 1) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["organization"], message: "Enter an organization name, or leave it blank." });
      }
      if (data.message.trim().length < 20) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["message"], message: "Describe the work you can do in at least 20 characters." });
      }
      if (data.capabilities.trim().length < 20) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["capabilities"], message: "Name your areas of expertise in at least 20 characters." });
      }
      return;
    }
    if (data.inquiryType === "partnerships") {
      if (!(PARTNERSHIP_CATEGORIES as readonly string[]).includes(data.partnershipCategory)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["partnershipCategory"], message: "Choose a partnership category." });
      }
      if (data.message.trim().length < 20) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["message"], message: "Describe the proposed collaboration in at least 20 characters." });
      }
      if (data.capabilities.trim().length < 20) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["capabilities"], message: "Describe the relevant experience in at least 20 characters." });
      }
      if (!acceptableWebsite(data.website)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["website"], message: "Enter a website starting with https://, or leave it blank." });
      }
      return;
    }
    if (!(INDUSTRIES as readonly string[]).includes(data.industry)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["industry"], message: "Choose an industry." });
    }
    if (data.message.trim().length < 20) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["message"], message: "Describe the project in at least 20 characters." });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;

export function interestFromQuery(value: string | undefined): InquiryType {
  if (value && (INTERESTS as readonly string[]).includes(value)) return value as InquiryType;
  if (value && value in LEGACY_INTERESTS) return LEGACY_INTERESTS[value];
  return "other";
}

export function reviewLead(
  input: unknown,
):
  | { ok: true; lead: LeadInput; discardAsSpam: false }
  | { ok: true; discardAsSpam: true }
  | { ok: false; fieldErrors: Record<string, string> } {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }
  if (parsed.data.companyWebsite.trim().length > 0) return { ok: true, discardAsSpam: true };
  if (parsed.data.inquiryType === "expert") {
    return { ok: true, lead: { ...parsed.data, website: "", partnershipCategory: "" }, discardAsSpam: false };
  }
  if (parsed.data.inquiryType === "partnerships") return { ok: true, lead: parsed.data, discardAsSpam: false };
  return { ok: true, lead: { ...parsed.data, website: "", partnershipCategory: "", capabilities: "" }, discardAsSpam: false };
}

export function routeLead(inquiryType: InquiryType): "delivery" | "general" {
  if (inquiryType === "partnerships" || inquiryType === "expert" || inquiryType === "other") return "general";
  return "delivery";
}

export function leadResult(input: { stored: boolean; emailSent: boolean; reference?: string }): { status: "received" | "error"; message: string } {
  const reference = input.reference && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input.reference) ? ` Reference ${input.reference}.` : "";
  if (!input.emailSent) return { status: "error", message: `The inquiry could not be sent.${reference}` };
  return { status: "received", message: "Your inquiry was sent by email. No account was created." };
}
