"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/fields";
import { Alert } from "@/components/ui/feedback";
import { createOrganization, type InquiryState } from "@/features/client/actions";
import { useFormFocus } from "@/components/ui/use-form-focus";

const initial: InquiryState = {};

export function OrganizationForm() {
  const [state, action, pending] = useActionState(createOrganization, initial);
  const ref = useFormFocus(state);
  return (
    <form ref={ref} action={action} className="mt-8 grid max-w-xl gap-4">
      {state.message ? <Alert>{state.message}</Alert> : null}
      <TextField label="Organization name" name="organizationName" required />
      <Button type="submit" disabled={pending} aria-busy={pending}>
        {pending ? "Creating" : "Create organization"}
      </Button>
    </form>
  );
}