import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/users", label: "Users" },
  { href: "/farms", label: "Farms" },
  { href: "/reports", label: "Reports" },
  { href: "/notifications", label: "Notifications" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r bg-muted/20 p-4">
        <div className="mb-6 px-2 text-lg font-semibold">AreFarm Admin</div>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <SignOutButton />
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
