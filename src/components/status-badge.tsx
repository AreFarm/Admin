import { Badge } from "@/components/ui/badge";
import type { JobStatus } from "@/lib/types";

const VARIANT: Record<JobStatus, "default" | "secondary" | "destructive" | "outline"> = {
  QUEUED: "outline",
  RUNNING: "secondary",
  READY: "default",
  SENT: "default",
  FAILED: "destructive",
};

// FAILED reads as a solid red pill (not the soft/tinted default "destructive"
// look) to match READY/SENT's solid green — status color should never be subtle.
const CLASS_NAME: Partial<Record<JobStatus, string>> = {
  FAILED: "bg-status-critical text-white",
};

export function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <Badge variant={VARIANT[status]} className={CLASS_NAME[status]}>
      {status}
    </Badge>
  );
}
