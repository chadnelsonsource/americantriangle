"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { SelectField, TextArea, TextField } from "@/components/ui/fields";
import { Alert } from "@/components/ui/feedback";
import { createInquiry, type InquiryState } from "@/features/client/actions";
import { useFormFocus } from "@/components/ui/use-form-focus";

const initial: InquiryState = {};

export function InquiryForm() {
  const [state, action, pending] = useActionState(createInquiry, initial);
  const ref = useFormFocus(state);
  return (
    <form ref={ref} action={action} className="mt-8 grid max-w-xl gap-4">
      {state.message ? <Alert>{state.message}</Alert> : null}
      <SelectField label="Service" name="service" defaultValue="data_operations">
        <option value="data_operations">Data annotation or human feedback</option>
        <option value="model_evaluation">Model evaluation</option>
        <option value="consulting">AI consulting</option>
        <option value="application">LLM application</option>
        <option value="agent">AI agent</option>
        <option value="integration">Integration</option>
      </SelectField>
      <TextField label="Project name" name="name" required />
      <TextArea label="Requirements" name="requirements" required />
      <label className="block text-sm" htmlFor="attachment">
        <span className="mb-1 block font-medium">Attachment</span>
        <input id="attachment" name="attachment" type="file" aria-describedby="attachment-hint" className="block min-h-11 w-full text-sm" />
      </label>
      <p id="attachment-hint" className="text-sm leading-6 text-muted">
        This form saves the project name and service type for your organization. The requirements text is checked and is not written to the project record. An attachment is checked for type, size, and file name, and is not stored. See the{" "}
        <Link href="/privacy" className="text-ink underline decoration-line underline-offset-4">privacy page</Link>.
      </p>
      <Button type="submit" disabled={pending} aria-busy={pending}>
        {pending ? "Submitting" : "Submit inquiry"}
      </Button>
    </form>
  );
}
