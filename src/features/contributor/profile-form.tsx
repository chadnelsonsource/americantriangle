"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/fields";
import { Alert } from "@/components/ui/feedback";
import { saveContributorProfile, type ProfileState } from "@/features/contributor/actions";
import { useFormFocus } from "@/components/ui/use-form-focus";

const initial: ProfileState = {};

export function ProfileForm() {
  const [state, action, pending] = useActionState(saveContributorProfile, initial);
  return (
    <form action={action} className="mt-8 grid max-w-xl gap-4">
      <TextField label="Skills, comma separated" name="skills" required />
      <TextField label="Education, comma separated" name="education" required />
      <TextField label="Experience, comma separated" name="experience" required />
      <TextField label="Languages, comma separated" name="languages" required />
      <TextField label="Country" name="country" autoComplete="country-name" required />
      <TextField label="Time zone" name="timeZone" placeholder="America/New_York" required />
      <TextField label="Availability, hours per week" name="availabilityHours" type="number" min={1} required />
      <Button type="submit" disabled={pending}>
        {pending ? "Saving" : "Save profile"}
      </Button>
      {state.message ? <Alert>{state.message}</Alert> : null}
    </form>
  );
}
