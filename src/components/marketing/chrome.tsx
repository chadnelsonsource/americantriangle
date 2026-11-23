"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoLink } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { headerNav } from "@/config/catalog";
import { showAccountEntry } from "@/config/site";
import { NavLink } from "@/components/marketing/nav-link";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header relative sticky top-0 z-40 text-ink">
      <div className="page flex items-center justify-between gap-4 py-4">
        <LogoLink />
        <button
          ref={menuButtonRef}
          type="button"
          className="min-h-11 rounded-lg px-3 text-sm text-muted transition-colors hover:bg-line/70 hover:text-ink md:hidden"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {headerNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {showAccountEntry ? (
            <>
              <ButtonLink href="/login" variant="ghost">
                Sign in
              </ButtonLink>
              <ButtonLink href="/consultation" variant="primary" className="rounded-full px-5">
                Get started
              </ButtonLink>
            </>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
      <Dialog id="site-menu" open={open} title="Menu" onClose={() => setOpen(false)}>
        <div>
          <nav aria-label="Primary">
            {headerNav.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenu} />
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            {showAccountEntry ? (
              <>
                <ButtonLink href="/login" variant="secondary">
                  Sign in
                </ButtonLink>
                <ButtonLink href="/consultation" variant="primary" className="rounded-full">
                  Get started
                </ButtonLink>
              </>
            ) : null}
            <ThemeToggle />
          </div>
        </div>
      </Dialog>
    </header>
  );
}
