import Link from "next/link";
import { cn } from "cn";
import type { JobStatus } from "@/lib/types";
import { JOB_STATUSES } from "@/lib/status-meta";

export function StatusFilterTabs({ basePath, status }: { basePath: string; status?: JobStatus }) {
  const tabs: { value: JobStatus | undefined; label: string }[] = [
    { value: undefined, label: "All" },
    ...JOB_STATUSES.map((s) => ({ value: s, label: s })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = tab.value === status;
        const href = tab.value ? `${basePath}?status=${tab.value}` : basePath;
        return (
          <Link
            key={tab.label}
            href={href}
            className={cn(
              "rounded-lg border px-3 py-1 text-sm font-medium transition-colors",
              active
                ? "border-primary/40 bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
