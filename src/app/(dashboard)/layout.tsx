import { Sprout } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./sign-out-button";
import { NavLinks } from "./nav-links";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="flex w-60 shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar p-4 text-sidebar-foreground">
        <div className="mb-6 flex items-center gap-2 px-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Sprout className="size-4" strokeWidth={2.25} />
          </span>
          <span className="text-base font-semibold tracking-tight">AreFarm Admin</span>
        </div>
        <NavLinks />
        <div className="mt-4 border-t border-sidebar-border pt-3">
          {user?.email && (
            <p className="truncate px-2 pb-2 text-sm text-sidebar-foreground/60">{user.email}</p>
          )}
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
