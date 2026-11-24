"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckField, TextArea, TextField } from "@/components/ui/fields";
import { Alert } from "@/components/ui/feedback";
import { submitLead, type LeadFormState } from "@/features/leads/actions";
import { useFormFocus } from "@/components/ui/use-form-focus";

const initial: LeadFormState = { status: "idle" };

export function ExpertApplicationForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  const ref = useFormFocus(state);
  const [draft, setDraft] = useState({
    name: "",
    email: "",
    organization: "",
    capabilities: "",
    message: "",
    consent: false,
  });

  return (
    <form ref={ref} action={action} className="grid max-w-3xl gap-8" noValidate>
      <input type="hidden" name="inquiryType" value="expert" />
      {state.status === "received" ? <Alert tone="success">{state.message}</Alert> : null}
      {state.status === "error" || state.status === "invalid" ? <Alert tone="danger">{state.message}</Alert> : null}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-4 text-xl text-ink">Your application</legend>
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
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={draft.email}
          onChange={(event) => setDraft({ ...draft, email: event.target.value })}
          error={state.fieldErrors?.email}
        />
        <div className="sm:col-span-2">
          <TextField
            label="Organization"
            name="organization"
            autoComplete="organization"
            hint="Optional. Leave this blank if you are applying on your own."
            value={draft.organization}
            onChange={(event) => setDraft({ ...draft, organization: event.target.value })}
            error={state.fieldErrors?.organization}
          />
        </div>
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="mb-4 text-xl text-ink">The work you can do</legend>
        <TextArea
          label="Areas of expertise"
          name="capabilities"
          required
          hint="Software, mathematics, science, writing, finance, business, legal, healthcare, or another area you can show."
          value={draft.capabilities}
          onChange={(event) => setDraft({ ...draft, capabilities: event.target.value })}
          error={state.fieldErrors?.capabilities}
        />
        <TextArea
          label="What you can review or prepare"
          name="message"
          required
          hint="Name the kind of task. This does not assign work."
          value={draft.message}
          onChange={(event) => setDraft({ ...draft, message: event.target.value })}
          error={state.fieldErrors?.message}
        />
      </fieldset>

      <div className="grid gap-4">
        <CheckField
          label="I agree to be contacted about this application."
          name="consent"
          checked={draft.consent}
          onChange={(event) => setDraft({ ...draft, consent: event.target.checked })}
          error={state.fieldErrors?.consent}
        />
        <p className="text-sm leading-6 text-muted">
          No account or sign-in is required. Your name, email, organization if you add one, expertise, and description are sent by email. This does not create an account, an assignment, or a job offer. The{" "}
          <Link href="/privacy" className="text-ink underline decoration-line underline-offset-4">
            privacy page
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-ink underline decoration-line underline-offset-4">
            terms page
          </Link>{" "}
          describe the product. Counsel has not issued binding text.
        </p>
        <div className="trap" aria-hidden="true">
          <label htmlFor="companyWebsite">Website</label>
          <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? "Sending" : "Submit application"}
        </Button>
      </div>
    </form>
  );
}
