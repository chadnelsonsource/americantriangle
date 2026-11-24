"use server";

import { isRateLimited } from "@/services/operations";
import { INDUSTRY_LABELS, INDUSTRIES, INQUIRY_LABELS, PARTNERSHIP_LABELS, leadResult, reviewLead, routeLead, type Industry, type PartnershipCategory } from "@/services/leads";
import { sendTransactionalEmail } from "@/server/email/send";

export type LeadFormState = {
  status: "idle" | "invalid" | "received" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const attempts = new Map<string, number[]>();

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitLead(_previous: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const reviewed = reviewLead({
    inquiryType: text(formData, "inquiryType"),
    name: text(formData, "name"),
    email: text(formData, "email"),
    organization: text(formData, "organization"),
    jobTitle: text(formData, "jobTitle"),
    industry: text(formData, "industry"),
    message: text(formData, "message"),
    timeline: text(formData, "timeline"),
    scope: text(formData, "scope"),
    details: text(formData, "details"),
    website: text(formData, "website"),
    partnershipCategory: text(formData, "partnershipCategory"),
    capabilities: text(formData, "capabilities"),
    consent: formData.get("consent") === "true",
    companyWebsite: text(formData, "companyWebsite"),
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
  const partnership = reviewed.lead.inquiryType === "partnerships";
  const expert = reviewed.lead.inquiryType === "expert";
  const confirmation = partnership
    ? "We received your partnership proposal by email. This message is not a partnership agreement, a contract, or an endorsement."
    : expert
      ? "We received your expert application by email. No account was created. This message is not an assignment or a job offer."
      : "We received your inquiry by email. No account was created. This message is not a contract or a quote.";
  const emailResult = await sendTransactionalEmail({
    to: reviewed.lead.email,
    subject: "Americantriangle received your inquiry",
    text: confirmation,
  });
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  let teamNotified = false;
  if (notify) {
    const industry = (INDUSTRIES as readonly string[]).includes(reviewed.lead.industry)
      ? INDUSTRY_LABELS[reviewed.lead.industry as Industry]
      : "Not provided";
    const category = (Object.keys(PARTNERSHIP_LABELS) as PartnershipCategory[]).includes(reviewed.lead.partnershipCategory as PartnershipCategory)
      ? PARTNERSHIP_LABELS[reviewed.lead.partnershipCategory as PartnershipCategory]
      : "Not provided";
    const teamResult = await sendTransactionalEmail({
      to: notify,
      subject: `Inquiry: ${INQUIRY_LABELS[reviewed.lead.inquiryType]}`,
      text: [
        "A new inquiry was sent by email.",
        `Area: ${INQUIRY_LABELS[reviewed.lead.inquiryType]}`,
        `Route: ${route}`,
        `Name: ${reviewed.lead.name}`,
        `Email: ${reviewed.lead.email}`,
        `Organization: ${reviewed.lead.organization || "Not provided"}`,
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
    teamNotified = teamResult.ok;
  }
  if (!emailResult.ok && !teamNotified) {
    if (emailResult.error === "email_not_configured") {
      return { status: "error", message: "Email delivery is not configured." };
    }
    return leadResult({
      stored: false,
      emailSent: false,
      reference: emailResult.errorId,
    });
  }
  attempts.set(email, [...prior, now].slice(-5));
  if (!emailResult.ok) {
    return {
      status: "received",
      message: "Your inquiry was sent to the team by email. A confirmation could not be sent to you. No account was created.",
    };
  }
  return { status: "received", message: "Your inquiry was sent by email. No account was created." };
}
