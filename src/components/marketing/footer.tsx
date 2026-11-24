import Link from "next/link";
import { BackToTop } from "@/components/marketing/back-to-top";

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-night text-band">
      <div className="page flex flex-col gap-4 pb-20 pt-4 sm:flex-row sm:items-center sm:justify-between md:py-5 md:pr-24">
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
      </div>
      <BackToTop />
    </footer>
  );
}
