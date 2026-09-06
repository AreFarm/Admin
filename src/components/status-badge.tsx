import { Badge } from "@/components/ui/badge";
import type { JobStatus } from "@/lib/types";

const VARIANT: Record<JobStatus, "default" | "secondary" | "destructive" | "outline"> = {
  QUEUED: "outline",
  RUNNING: "secondary",
  READY: "default",
  SENT: "default",
  FAILED: "destructive",
};

export function StatusBadge({ status }: { status: JobStatus }) {
  return <Badge variant={VARIANT[status]}>{status}</Badge>;
}
