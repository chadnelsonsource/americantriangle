import Link from "next/link";

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-night text-band">
      <div className="page flex flex-col gap-4 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 md:py-5">
        <p className="text-sm text-band/80">
          <span className="block text-band">Talent. Technology. Opportunity.</span>
          <span className="mt-1 block">© {new Date().getFullYear()} Americantriangle. All rights reserved.</span>
        </p>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {legal.map((item, index) => (
              <li key={item.href} className="flex items-center gap-4">
                {index > 0 ? <span aria-hidden="true" className="h-3.5 w-px bg-white/30" /> : null}
                <Link href={item.href} className="inline-flex min-h-11 items-center text-band/80 transition-colors hover:text-band">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#top"
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/40 px-5 text-xs font-medium uppercase tracking-[0.14em] text-band transition-colors hover:border-band md:justify-self-end"
        >
          Back to top
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5">
            <path d="M8 12.5V3.5M8 3.5 4 7.5M8 3.5l4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
