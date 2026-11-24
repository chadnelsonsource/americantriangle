"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckField, SelectField, TextArea, TextField } from "@/components/ui/fields";
import { Alert } from "@/components/ui/feedback";
import { submitLead, type LeadFormState } from "@/features/leads/actions";
import { useFormFocus } from "@/components/ui/use-form-focus";
import { PARTNERSHIP_CATEGORIES, PARTNERSHIP_LABELS, type PartnershipCategory } from "@/services/leads";

const initial: LeadFormState = { status: "idle" };

export function PartnershipForm({ defaultCategory = "" }: { defaultCategory?: PartnershipCategory | "" }) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const ref = useFormFocus(state);
  const [draft, setDraft] = useState({
    name: "",
    email: "",
    organization: "",
    website: "",
    partnershipCategory: defaultCategory,
    message: "",
    capabilities: "",
    details: "",
    consent: false,
  });

  return (
    <form ref={ref} action={action} className="grid max-w-3xl gap-8" noValidate>
      <input type="hidden" name="inquiryType" value="partnerships" />
      {state.status === "received" ? <Alert tone="success">{state.message}</Alert> : null}
      {state.status === "error" || state.status === "invalid" ? <Alert tone="danger">{state.message}</Alert> : null}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-4 text-xl text-ink">Your organization</legend>
        <TextField
          label="Name"
          name="name"
          autoComplete="name"
          required
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          error={state.fieldErrors?.name}
        />
        <TextField
          label="Professional email"
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
          label="Organization"
          name="organization"
          autoComplete="organization"
          required
          value={draft.organization}
          onChange={(event) => setDraft({ ...draft, organization: event.target.value })}
          error={state.fieldErrors?.organization}
        />
        <TextField
          label="Website"
          name="website"
          type="url"
          autoComplete="url"
          hint="Optional. Include https://."
          value={draft.website}
          onChange={(event) => setDraft({ ...draft, website: event.target.value })}
          error={state.fieldErrors?.website}
        />
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="mb-4 text-xl text-ink">The collaboration</legend>
        <SelectField
          label="Partnership category"
          name="partnershipCategory"
          required
          hint="The category routes the proposal. It does not create a partnership."
          value={draft.partnershipCategory}
          onChange={(event) => setDraft({ ...draft, partnershipCategory: event.target.value as PartnershipCategory | "" })}
          error={state.fieldErrors?.partnershipCategory}
        >
          <option value="">Choose a category</option>
          {PARTNERSHIP_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {PARTNERSHIP_LABELS[category]}
            </option>
          ))}
        </SelectField>
        <TextArea
          label="Proposed collaboration"
          name="message"
          required
          hint="What the two organizations would do together, and what would stay out of scope."
          value={draft.message}
          onChange={(event) => setDraft({ ...draft, message: event.target.value })}
          error={state.fieldErrors?.message}
        />
        <TextArea
          label="Relevant experience or capabilities"
          name="capabilities"
          required
          hint="The work, technology, or expertise you would bring. This is not a customer list."
          value={draft.capabilities}
          onChange={(event) => setDraft({ ...draft, capabilities: event.target.value })}
          error={state.fieldErrors?.capabilities}
        />
        <TextArea
          label="Additional details"
          name="details"
          hint="Optional. Anything that did not fit above."
          value={draft.details}
          onChange={(event) => setDraft({ ...draft, details: event.target.value })}
          error={state.fieldErrors?.details}
        />
      </fieldset>

      <div className="grid gap-4">
        <CheckField
          label="I agree to be contacted about this proposal."
          name="consent"
          checked={draft.consent}
          onChange={(event) => setDraft({ ...draft, consent: event.target.checked })}
          error={state.fieldErrors?.consent}
        />
        <p className="text-sm leading-6 text-muted">
          No account or sign-in is required. Your name, email, organization, website if you add one, category, proposed collaboration, experience, and any additional details are sent by email. A proposal is not an agreement, a listing, or an endorsement. The{" "}
          <Link href="/privacy" className="text-ink underline decoration-line underline-offset-4">privacy page</Link> and{" "}
          <Link href="/terms" className="text-ink underline decoration-line underline-offset-4">terms page</Link> describe the product. Counsel has not issued binding text.
        </p>
        <div className="trap" aria-hidden="true">
          <label htmlFor="companyWebsite">Company website</label>
          <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? "Sending" : "Submit proposal"}
        </Button>
      </div>
    </form>
  );
}
