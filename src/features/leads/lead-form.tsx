"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckField, SelectField, TextArea, TextField } from "@/components/ui/fields";
import { Alert } from "@/components/ui/feedback";
import { submitLead, type LeadFormState } from "@/features/leads/actions";
import { useFormFocus } from "@/components/ui/use-form-focus";
import { cn } from "@/lib/utils";
import { INDUSTRY_LABELS, INDUSTRIES, INQUIRY_LABELS, PROJECT_INQUIRY_TYPES, type ProjectInquiryType } from "@/services/leads";

const initial: LeadFormState = { status: "idle" };

export function LeadForm({ defaultType = "other", className }: { defaultType?: ProjectInquiryType; className?: string }) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const ref = useFormFocus(state);
  const [draft, setDraft] = useState({
    inquiryType: defaultType,
    name: "",
    email: "",
    organization: "",
    jobTitle: "",
    industry: "",
    message: "",
    timeline: "",
    scope: "",
    details: "",
    consent: false,
  });

  return (
    <form ref={ref} action={action} className={cn("grid gap-8", className)} noValidate>
      {state.status === "received" ? <Alert tone="success">{state.message}</Alert> : null}
      {state.status === "error" || state.status === "invalid" ? <Alert tone="danger">{state.message}</Alert> : null}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-4 text-xl text-ink">Your organization</legend>
        <TextField
          label="Full name"
          name="name"
          autoComplete="name"
          required
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          error={state.fieldErrors?.name}
        />
        <TextField
          label="Business email"
          name="email"
          type="email"
          autoComplete="email"
          required
          hint="Use a work address when you have one."
          value={draft.email}
          onChange={(event) => setDraft({ ...draft, email: event.target.value })}
          error={state.fieldErrors?.email}
        />
        <TextField
          label="Company name"
          name="organization"
          autoComplete="organization"
          required
          value={draft.organization}
          onChange={(event) => setDraft({ ...draft, organization: event.target.value })}
          error={state.fieldErrors?.organization}
        />
        <TextField
          label="Job title"
          name="jobTitle"
          autoComplete="organization-title"
          hint="Optional."
          value={draft.jobTitle}
          onChange={(event) => setDraft({ ...draft, jobTitle: event.target.value })}
          error={state.fieldErrors?.jobTitle}
        />
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="mb-4 text-xl text-ink">The work</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Industry"
            name="industry"
            required
            value={draft.industry}
            onChange={(event) => setDraft({ ...draft, industry: event.target.value })}
            error={state.fieldErrors?.industry}
          >
            <option value="">Choose an industry</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {INDUSTRY_LABELS[industry]}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Area of interest"
            name="inquiryType"
            required
            hint="This routes the inquiry. It does not start the work."
            value={draft.inquiryType}
            onChange={(event) => setDraft({ ...draft, inquiryType: event.target.value as ProjectInquiryType })}
            error={state.fieldErrors?.inquiryType}
          >
            {PROJECT_INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {INQUIRY_LABELS[type]}
              </option>
            ))}
          </SelectField>
        </div>
        <TextArea
          label="Project description"
          name="message"
          required
          hint="What you need done, the material involved, and any constraint the team should know."
          value={draft.message}
          onChange={(event) => setDraft({ ...draft, message: event.target.value })}
          error={state.fieldErrors?.message}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Expected timeline"
            name="timeline"
            hint="Optional. A range is enough."
            value={draft.timeline}
            onChange={(event) => setDraft({ ...draft, timeline: event.target.value })}
            error={state.fieldErrors?.timeline}
          />
          <TextField
            label="Estimated scope or budget"
            name="scope"
            hint="Optional. This is not a quote."
            value={draft.scope}
            onChange={(event) => setDraft({ ...draft, scope: event.target.value })}
            error={state.fieldErrors?.scope}
          />
        </div>
        <TextArea
          label="Additional information"
          name="details"
          hint="Optional. Anything that did not fit above."
          value={draft.details}
          onChange={(event) => setDraft({ ...draft, details: event.target.value })}
          error={state.fieldErrors?.details}
        />
      </fieldset>

      <div className="grid gap-4">
        <CheckField
          label="I agree to be contacted about this inquiry."
          name="consent"
          checked={draft.consent}
          onChange={(event) => setDraft({ ...draft, consent: event.target.checked })}
          error={state.fieldErrors?.consent}
        />
        <p className="text-sm leading-6 text-muted">
          No account or sign-in is required. Your name, email, company, title if you add one, industry, area of interest, description, and any timeline, scope, or notes are sent by email. This does not create a contract.  The{" "}
          <Link href="/privacy" className="text-ink underline decoration-line underline-offset-4">privacy page</Link> and{" "}
          <Link href="/terms" className="text-ink underline decoration-line underline-offset-4">terms page</Link> describe the product. Counsel has not issued binding text.
        </p>
        <div className="trap" aria-hidden="true">
          <label htmlFor="companyWebsite">Website</label>
          <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" className="w-full sm:w-fit" disabled={pending} aria-busy={pending}>
          {pending ? "Sending" : "Submit inquiry"}
        </Button>
      </div>
    </form>
  );
}
