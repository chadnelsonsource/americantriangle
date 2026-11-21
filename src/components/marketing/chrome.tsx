"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoLink } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { companyNav, dataNav, engineeringNav, intelligenceNav } from "@/config/catalog";
import { NavLink } from "@/components/marketing/nav-link";

const nightToggle = "text-band/80 hover:text-band";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const companyButtonRef = useRef<HTMLButtonElement>(null);
  const servicesPanelRef = useRef<HTMLDivElement>(null);
  const companyPanelRef = useRef<HTMLDivElement>(null);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
    setServicesOpen(false);
    setCompanyOpen(false);
  }

  useEffect(() => {
    if (!servicesOpen && !companyOpen) return;
    const panel = servicesOpen ? servicesPanelRef.current : companyPanelRef.current;
    const button = servicesOpen ? servicesButtonRef.current : companyButtonRef.current;
    function links() {
      return [...(panel?.querySelectorAll<HTMLElement>("a[href]") ?? [])];
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setCompanyOpen(false);
        button?.focus();
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if (event.target === button) return;
      const items = links();
      const index = items.indexOf(document.activeElement as HTMLElement);
      if (index === -1) return;
      event.preventDefault();
      const next = event.key === "ArrowDown" ? (items[index + 1] ?? items[0]) : (items[index - 1] ?? items[items.length - 1]);
      next?.focus();
    }
    function onPointer(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
        setCompanyOpen(false);
      }
    }
    function onFocusOut(event: FocusEvent) {
      const next = event.relatedTarget;
      if (next instanceof Node && headerRef.current?.contains(next)) return;
      setServicesOpen(false);
      setCompanyOpen(false);
    }
    const header = headerRef.current;
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    header?.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      header?.removeEventListener("focusout", onFocusOut);
    };
  }, [servicesOpen, companyOpen]);

  function closeMenus() {
    setOpen(false);
    setServicesOpen(false);
    setCompanyOpen(false);
  }

  return (
    <header ref={headerRef} className="relative sticky top-0 z-40 border-b border-white/10 bg-night text-band">
      <div className="page flex items-center justify-between gap-4 py-4">
        <LogoLink tone="light" />
        <button
          ref={menuButtonRef}
          type="button"
          className="min-h-11 rounded-md px-3 text-sm transition-colors hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <button
            ref={servicesButtonRef}
            type="button"
            className="min-h-11 rounded-md px-3 text-sm text-band/80 transition-colors hover:bg-white/10 hover:text-band aria-expanded:bg-white/10 aria-expanded:text-band"
            aria-expanded={servicesOpen}
            aria-haspopup="true"
            aria-controls={servicesOpen ? "services-menu" : undefined}
            onClick={() => {
              setServicesOpen((value) => !value);
              setCompanyOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" && servicesOpen) {
                event.preventDefault();
                event.stopPropagation();
                servicesPanelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
              }
            }}
          >
            Services
          </button>
          {servicesOpen ? (
            <div id="services-menu" ref={servicesPanelRef} className="menu-panel absolute left-0 right-0 top-full hidden border-y border-white/10 bg-night shadow-raise md:block">
              <div className="page grid gap-8 py-8 md:grid-cols-3">
                <div>
                  <p className="eyebrow px-3 text-band/75">Data infrastructure</p>
                  {dataNav.map((item) => (
                    <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenus} group="Data infrastructure" />
                  ))}
                </div>
                <div>
                  <p className="eyebrow px-3 text-band/75">Model intelligence</p>
                  {intelligenceNav.map((item) => (
                    <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenus} group="Model intelligence" />
                  ))}
                </div>
                <div>
                  <p className="eyebrow px-3 text-band/75">Enterprise applications</p>
                  {engineeringNav.map((item) => (
                    <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenus} group="Enterprise applications" />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          <button
            ref={companyButtonRef}
            type="button"
            className="min-h-11 rounded-md px-3 text-sm text-band/80 transition-colors hover:bg-white/10 hover:text-band aria-expanded:bg-white/10 aria-expanded:text-band"
            aria-expanded={companyOpen}
            aria-haspopup="true"
            aria-controls={companyOpen ? "company-menu" : undefined}
            onClick={() => {
              setCompanyOpen((value) => !value);
              setServicesOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" && companyOpen) {
                event.preventDefault();
                event.stopPropagation();
                companyPanelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
              }
            }}
          >
            Company
          </button>
          {companyOpen ? (
            <div id="company-menu" ref={companyPanelRef} className="menu-panel absolute left-0 right-0 top-full hidden border-y border-white/10 bg-night shadow-raise md:block">
              <div className="page grid gap-1 py-6 sm:grid-cols-2">
                {companyNav.map((item) => (
                  <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenus} />
                ))}
              </div>
            </div>
          ) : null}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="/login" variant="secondary" tone="night">
            Sign in
          </ButtonLink>
          <ButtonLink href="/consultation" variant="accent">
            Get started
          </ButtonLink>
          <ThemeToggle className={nightToggle} />
        </div>
      </div>
      <Dialog id="site-menu" open={open} title="Menu" onClose={() => setOpen(false)}>
        <div>
          <p className="eyebrow text-band/75">Data infrastructure</p>
          {dataNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenus} group="Data infrastructure" />
          ))}
          <p className="eyebrow mt-4 text-band/75">Model intelligence</p>
          {intelligenceNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenus} group="Model intelligence" />
          ))}
          <p className="eyebrow mt-4 text-band/75">Enterprise applications</p>
          {engineeringNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenus} group="Enterprise applications" />
          ))}
          <p className="eyebrow mt-4 text-band/75">Company</p>
          {companyNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenus} />
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <ButtonLink href="/login" variant="secondary" tone="night">
              Sign in
            </ButtonLink>
            <ButtonLink href="/consultation" variant="accent">
              Get started
            </ButtonLink>
            <ThemeToggle className={nightToggle} />
          </div>
        </div>
      </Dialog>
    </header>
  );
}
