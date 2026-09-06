"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Sprout, FileText, Bell, RefreshCcw, Store, SlidersHorizontal } from "lucide-react";
import { cn } from "cn";

const NAV = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: Users },
  { href: "/farms", label: "Farms", icon: Sprout },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/sync-health", label: "Sync health", icon: RefreshCcw, badge: "NEW" },
  { href: "/marketplace", label: "Marketplace", icon: Store, badge: "NEW" },
  { href: "/config", label: "Config & flags", icon: SlidersHorizontal, badge: "NEW" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon className="size-4 shrink-0" strokeWidth={2} />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span
                className={cn(
                  "rounded-md border px-1.5 py-0.5 text-[0.65rem] leading-none font-semibold tracking-wide",
                  active ? "border-sidebar-primary-foreground/40" : "border-sidebar-border text-sidebar-foreground/80",
                )}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
