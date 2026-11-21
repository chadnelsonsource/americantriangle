"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { signOut } from "@/features/auth/actions";
import { cn } from "@/lib/utils";

function isCurrent(pathname: string, href: string) {
  if (href === "/contributor" || href === "/client" || href === "/internal" || href === "/account") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function WorkspaceShell({
  title,
  links,
  children,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-paper md:grid md:grid-cols-[16rem_1fr]">
      <aside className="border-b border-line bg-canvas md:border-b-0 md:border-r">
        <div className="flex items-center justify-between gap-3 px-4 pt-6">
          <Link href="/" className="font-serif text-xl">
            {title}
          </Link>
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <form action={signOut}>
              <button type="submit" className="min-h-11 rounded-md px-3 text-sm text-muted hover:text-ink">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <nav className="mt-4 flex gap-1 overflow-x-auto px-4 pb-4 md:mt-6 md:flex-col md:overflow-visible md:pb-0" aria-label={title}>
          {links.map((link) => {
            const current = isCurrent(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-md px-3 text-sm text-muted transition-colors hover:bg-card hover:text-ink md:shrink md:whitespace-normal",
                  current && "bg-card font-medium text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 hidden items-center justify-between gap-2 px-4 pb-6 md:flex">
          <ThemeToggle />
          <form action={signOut}>
            <button type="submit" className="min-h-11 rounded-md px-3 text-sm text-muted hover:text-ink">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main id="content" className="min-w-0">
        {children}
      </main>
    </div>
  );
}

export function PageIntro({ title, lede }: { title: string; lede: string }) {
  return (
    <header className="measure">
      <h1 className="heading-title">{title}</h1>
      <p className="mt-3 leading-7 text-muted">{lede}</p>
    </header>
  );
}
