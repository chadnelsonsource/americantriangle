"use client";

import { useEffect, useRef } from "react";

export function useFormFocus(token: unknown) {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = ref.current;
    if (!form) return;
    const invalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
    if (invalid) {
      invalid.focus();
      return;
    }
    form.querySelector<HTMLElement>("[role='alert'], [role='status']")?.focus();
  }, [token]);

  return ref;
}
