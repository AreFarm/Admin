import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";

export function StatTile({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "default" | "critical";
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            tone === "critical"
              ? "bg-status-critical/10 text-status-critical"
              : "bg-accent text-accent-foreground",
          )}
        >
          <Icon className="size-5" strokeWidth={2} />
        </span>
        <div>
          <div className="text-2xl font-semibold tabular-nums leading-tight">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}
