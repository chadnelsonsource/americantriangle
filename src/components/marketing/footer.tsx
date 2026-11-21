import Link from "next/link";
import { LogoLink } from "@/components/brand/logo";
import { companyNav, dataNav, engineeringNav, intelligenceNav } from "@/config/catalog";

const columns = [
  { title: "Data infrastructure", links: dataNav },
  { title: "Model intelligence", links: intelligenceNav },
  { title: "Enterprise applications", links: engineeringNav },
  {
    title: "Company",
    links: [
      ...companyNav,
      { href: "/privacy", label: "Privacy", exact: true },
      { href: "/terms", label: "Terms", exact: true },
      { href: "/cookies", label: "Cookies", exact: true },
    ],
  },
  {
    title: "Work",
    links: [
      { href: "/consultation", label: "Start a project", exact: true },
      { href: "/contributors/join", label: "Join as an expert", exact: false },
      { href: "/login", label: "Sign in", exact: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-night text-band">
      <div className="page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-5">
          <LogoLink tone="light" />
          <p className="measure mt-4 text-sm leading-6 text-band/75">
            Data infrastructure, model intelligence, and enterprise applications. Use one division, or combine them.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="eyebrow text-band/75">{column.title}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {column.links.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    aria-label={item.label === "Overview" ? `${column.title} overview` : undefined}
                    className="inline-flex min-h-11 items-center text-band/80 transition-colors hover:text-band"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="page py-5 text-xs text-band/75">© {new Date().getFullYear()} Americantriangle</p>
      </div>
    </footer>
  );
}
