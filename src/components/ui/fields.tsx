import { cn } from "@/lib/utils";

export const fieldControl =
  "min-h-11 w-full max-w-full rounded-md border border-control bg-paper px-3 text-base text-ink transition-colors placeholder:text-muted aria-invalid:border-danger";

function FieldError({ name, error }: { name: string; error: string }) {
  return (
    <span id={`${name}-error`} className="mt-1 block text-danger">
      <span className="sr-only">Error: </span>
      {error}
    </span>
  );
}

function describedBy(name: string, hint?: string, error?: string) {
  const ids = [hint ? `${name}-hint` : null, error ? `${name}-error` : null].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

export function TextField({
  label,
  name,
  error,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; error?: string; hint?: string }) {
  return (
    <label className="block text-sm" htmlFor={name}>
      <span className="mb-1 block font-medium">{label}</span>
      {hint ? (
        <span id={`${name}-hint`} className="mb-2 block text-muted">
          {hint}
        </span>
      ) : null}
      <input id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={describedBy(name, hint, error)} className={fieldControl} {...props} />
      {error ? <FieldError name={name} error={error} /> : null}
    </label>
  );
}

export function TextArea({
  label,
  name,
  error,
  hint,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string; error?: string; hint?: string }) {
  return (
    <label className="block text-sm" htmlFor={name}>
      <span className="mb-1 block font-medium">{label}</span>
      {hint ? (
        <span id={`${name}-hint`} className="mb-2 block text-muted">
          {hint}
        </span>
      ) : null}
      <textarea id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={describedBy(name, hint, error)} className={cn(fieldControl, "min-h-32 py-2")} {...props} />
      {error ? <FieldError name={name} error={error} /> : null}
    </label>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; name: string; error?: string; hint?: string }) {
  return (
    <label className="block text-sm" htmlFor={name}>
      <span className="mb-1 block font-medium">{label}</span>
      {hint ? (
        <span id={`${name}-hint`} className="mb-2 block text-muted">
          {hint}
        </span>
      ) : null}
      <select id={name} name={name} className={fieldControl} aria-invalid={Boolean(error)} aria-describedby={describedBy(name, hint, error)} {...props}>
        {children}
      </select>
      {error ? <FieldError name={name} error={error} /> : null}
    </label>
  );
}

export function CheckField({
  label,
  name,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; error?: string }) {
  return (
    <label className="flex min-h-11 items-start gap-3 py-2 text-sm" htmlFor={name}>
      <input
        {...props}
        id={name}
        name={name}
        type="checkbox"
        value="true"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-0.5 size-5 shrink-0 accent-copper"
      />
      <span>
        {label}
        {error ? <FieldError name={name} error={error} /> : null}
      </span>
    </label>
  );
}

export function RadioGroup({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label key={option.value} className="flex min-h-11 items-center gap-3 text-sm">
            <input type="radio" name={name} value={option.value} className="size-5 shrink-0 accent-copper" defaultChecked={option.value === options[0]?.value} />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
