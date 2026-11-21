"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, TextField } from "@/components/ui/fields";
import { Alert } from "@/components/ui/feedback";
import { requestReset, signIn, signUp, type AuthState } from "@/features/auth/actions";
import { useFormFocus } from "@/components/ui/use-form-focus";

const initial: AuthState = {};

export function SignInForm({ nextPath }: { nextPath?: string }) {
  const [state, action, pending] = useActionState(signIn, initial);
  const ref = useFormFocus(state);
  return (
    <form ref={ref} action={action} className="grid gap-4">
      {state.message ? <Alert tone="danger">{state.message}</Alert> : null}
      {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
      <TextField label="Email" name="email" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <TextField label="Password" name="password" type="password" autoComplete="current-password" required hint="At least 12 characters." error={state.fieldErrors?.password} />
      <p className="text-sm leading-6 text-muted">
        Sign-in uses the email and password for an existing account. When authentication is configured, the session is kept in cookies. See the{" "}
        <Link href="/cookies" className="text-ink underline decoration-line underline-offset-4">cookies page</Link>.
      </p>
      <Button type="submit" disabled={pending} aria-busy={pending}>
        {pending ? "Signing in" : "Sign in"}
      </Button>
    </form>
  );
}

export function SignUpForm() {
  const [state, action, pending] = useActionState(signUp, initial);
  const ref = useFormFocus(state);
  return (
    <form ref={ref} action={action} className="grid gap-4">
      {state.message ? <Alert>{state.message}</Alert> : null}
      <RadioGroup
        legend="Account type"
        name="accountKind"
        options={[
          { value: "contributor", label: "Contributor" },
          { value: "client", label: "Client organization owner" },
        ]}
      />
      <TextField label="Full name" name="fullName" autoComplete="name" required error={state.fieldErrors?.fullName} />
      <TextField label="Email" name="email" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <TextField label="Password" name="password" type="password" autoComplete="new-password" required minLength={12} hint="At least 12 characters." error={state.fieldErrors?.password} />
      <p className="text-sm leading-6 text-muted">
        The account stores your name, email, and account type. The password is sent to the authentication service when that service is configured. Creating an account is not employment and does not accept unpublished terms. See the{" "}
        <Link href="/privacy" className="text-ink underline decoration-line underline-offset-4">privacy page</Link> and{" "}
        <Link href="/terms" className="text-ink underline decoration-line underline-offset-4">terms page</Link>.
      </p>
      <Button type="submit" disabled={pending} aria-busy={pending}>
        {pending ? "Creating account" : "Create account"}
      </Button>
    </form>
  );
}

export function ResetForm() {
  const [state, action, pending] = useActionState(requestReset, initial);
  const ref = useFormFocus(state);
  return (
    <form ref={ref} action={action} className="grid gap-4">
      {state.message ? <Alert>{state.message}</Alert> : null}
      <TextField label="Email" name="email" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <p className="text-sm leading-6 text-muted">
        The email is used to send a reset link when sign-in is configured. This form does not add the address to a marketing list.
      </p>
      <Button type="submit" disabled={pending} aria-busy={pending}>
        {pending ? "Sending" : "Send reset link"}
      </Button>
    </form>
  );
}
