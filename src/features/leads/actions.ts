"use server";

import { isRateLimited } from "@/services/operations";
import { INDUSTRY_LABELS, INDUSTRIES, INQUIRY_LABELS, PARTNERSHIP_LABELS, leadResult, reviewLead, routeLead, type Industry, type PartnershipCategory } from "@/services/leads";
import { insertLead } from "@/server/repositories/leads";
import { sendTransactionalEmail } from "@/server/email/send";

export type LeadFormState = {
  status: "idle" | "invalid" | "received" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const attempts = new Map<string, number[]>();

export async function submitLead(_previous: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const reviewed = reviewLead({
    inquiryType: formData.get("inquiryType"),
    name: formData.get("name"),
    email: formData.get("email"),
    organization: formData.get("organization"),
    jobTitle: String(formData.get("jobTitle") ?? ""),
    industry: formData.get("industry"),
    message: formData.get("message"),
    timeline: String(formData.get("timeline") ?? ""),
    scope: String(formData.get("scope") ?? ""),
    details: String(formData.get("details") ?? ""),
    website: String(formData.get("website") ?? ""),
    partnershipCategory: String(formData.get("partnershipCategory") ?? ""),
    capabilities: String(formData.get("capabilities") ?? ""),
    consent: formData.get("consent") === "true",
    companyWebsite: String(formData.get("companyWebsite") ?? ""),
  });

  if (!reviewed.ok) return { status: "invalid", message: "Some fields need a correction. The note under each field says what to change.", fieldErrors: reviewed.fieldErrors };
  if (reviewed.discardAsSpam) return { status: "error", message: "The inquiry was not saved." };

  const email = reviewed.lead.email.toLowerCase();
  const now = Date.now();
  const prior = attempts.get(email) ?? [];
  if (isRateLimited(prior, now, 60 * 60 * 1000, 5)) {
    return { status: "error", message: "Too many inquiries from this address. Try again later." };
  }

  const route = routeLead(reviewed.lead.inquiryType);
  const saved = await insertLead(reviewed.lead, route);
  if (!saved.ok && saved.error === "data_store_unconfigured") {
    return { status: "error", message: "The inquiry store is not configured, so this message was not saved." };
  }
  if (!saved.ok) return leadResult({ stored: false, emailSent: false, reference: saved.errorId });
  attempts.set(email, [...prior, now].slice(-5));

  const partnership = reviewed.lead.inquiryType === "partnerships";
  const emailResult = await sendTransactionalEmail({
    to: reviewed.lead.email,
    subject: "Americantriangle received your inquiry",
    text: partnership
      ? "We received your partnership proposal and stored it for review. This message is not a partnership agreement, a contract, or an endorsement."
      : "We received your inquiry and stored it for review. This message is not a contract or a quote.",
  });
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  if (notify) {
    const industry = (INDUSTRIES as readonly string[]).includes(reviewed.lead.industry)
      ? INDUSTRY_LABELS[reviewed.lead.industry as Industry]
      : "Not provided";
    const category = (Object.keys(PARTNERSHIP_LABELS) as PartnershipCategory[]).includes(reviewed.lead.partnershipCategory as PartnershipCategory)
      ? PARTNERSHIP_LABELS[reviewed.lead.partnershipCategory as PartnershipCategory]
      : "Not provided";
    await sendTransactionalEmail({
      to: notify,
      subject: `Inquiry: ${INQUIRY_LABELS[reviewed.lead.inquiryType]}`,
      text: [
        "A new inquiry was stored.",
        `Area: ${INQUIRY_LABELS[reviewed.lead.inquiryType]}`,
        `Route: ${route}`,
        `Name: ${reviewed.lead.name}`,
        `Email: ${reviewed.lead.email}`,
        `Organization: ${reviewed.lead.organization}`,
        `Title: ${reviewed.lead.jobTitle || "Not provided"}`,
        `Industry: ${industry}`,
        `Website: ${reviewed.lead.website || "Not provided"}`,
        `Partnership category: ${category}`,
        `Timeline: ${reviewed.lead.timeline || "Not provided"}`,
        `Scope: ${reviewed.lead.scope || "Not provided"}`,
        "",
        reviewed.lead.message,
        "",
        reviewed.lead.capabilities || "No capabilities provided.",
        "",
        reviewed.lead.details || "No additional information.",
      ].join("\n"),
    });
  }
  return leadResult({ stored: true, emailSent: emailResult.ok, reference: emailResult.ok ? undefined : emailResult.errorId });
}
