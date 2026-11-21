import Link from "next/link";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string; exact: boolean };

export function isCurrentPath(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function NavLink({
  item,
  pathname,
  onNavigate,
  group,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
  group?: string;
}) {
  const current = isCurrentPath(pathname, item);
  const name = group && item.label === "Overview" ? `${group} overview` : undefined;
  return (
    <Link
      href={item.href}
      aria-current={current ? "page" : undefined}
      aria-label={name}
      onClick={onNavigate}
      className={cn("block min-h-11 rounded-md px-3 py-2 text-sm text-band/80 transition-colors hover:bg-white/5 hover:text-band", current && "text-band")}
    >
      {item.label}
    </Link>
  );
}
