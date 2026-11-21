"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/feedback";
import { requestAccountAction, type AccountState } from "@/features/account/actions";
import { useFormFocus } from "@/components/ui/use-form-focus";

const initial: AccountState = {};

export default function AccountPage() {
  const [state, action, pending] = useActionState(requestAccountAction, initial);
  const [kind, setKind] = useState("export");
  const ref = useFormFocus(state);
  return (
    <main id="content" className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-4xl">Account</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Request an export or deletion of your account data. The request is recorded when the audit store is configured. It is not completed by this form alone. Handling is described on the{" "}
        <Link href="/privacy" className="text-ink underline decoration-line underline-offset-4">privacy page</Link>.
      </p>
      <form ref={ref} action={action} className="mt-8 grid max-w-xl gap-4">
        {state.message ? <Alert>{state.message}</Alert> : null}
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Request</legend>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input type="radio" name="kind" value="export" checked={kind === "export"} onChange={() => setKind("export")} className="size-5 accent-copper" />
            Export my data
          </label>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input type="radio" name="kind" value="delete" checked={kind === "delete"} onChange={() => setKind("delete")} className="size-5 accent-copper" />
            Delete my account
          </label>
        </fieldset>
        {kind === "delete" ? (
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input type="checkbox" name="confirm" value="delete" className="size-5 accent-copper" />
            Record a deletion request. This does not delete the account by itself.
          </label>
        ) : null}
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? "Recording" : "Record request"}
        </Button>
      </form>
    </main>
  );
}
