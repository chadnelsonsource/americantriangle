import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "accent" | "paper" | "chip";
type Tone = "default" | "night";

const base =
  "pressable inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-pine",
  secondary: "border border-control bg-transparent text-ink hover:border-ink",
  ghost: "text-ink hover:bg-line/70",
  danger: "border border-danger text-danger hover:bg-danger/10",
  accent: "bg-accent text-accent-ink hover:bg-accent-press",
  paper: "bg-band text-night hover:bg-white",
  chip: "border border-control bg-card text-ink hover:border-ink aria-[current=page]:border-ink aria-[current=page]:font-medium",
};

const nightStyles: Partial<Record<Variant, string>> = {
  secondary: "border-white/45 text-band hover:border-band",
  ghost: "text-band hover:bg-white/10",
  chip: "border-white/45 bg-transparent text-band hover:border-band",
};

function classes(variant: Variant, tone: Tone, className?: string) {
  return cn(base, styles[variant], tone === "night" && nightStyles[variant], className);
}

export function Button({
  variant = "primary",
  tone = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; tone?: Tone }) {
  return <button className={cn(classes(variant, tone, className), props["aria-busy"] && "cursor-progress")} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  tone = "default",
  className,
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={classes(variant, tone, className)} {...props}>
      {children}
    </Link>
  );
}
