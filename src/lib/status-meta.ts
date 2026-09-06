import { Clock, Loader, CheckCircle2, XCircle, type LucideIcon } from "lucide-react";
import type { JobStatus } from "@/lib/types";

export const STATUS_META: Record<JobStatus, { label: string; color: string; icon: LucideIcon }> = {
  QUEUED: { label: "Queued", color: "var(--status-neutral)", icon: Clock },
  RUNNING: { label: "Running", color: "var(--status-warning)", icon: Loader },
  READY: { label: "Ready", color: "var(--status-good)", icon: CheckCircle2 },
  SENT: { label: "Sent", color: "var(--status-good)", icon: CheckCircle2 },
  FAILED: { label: "Failed", color: "var(--status-critical)", icon: XCircle },
};

export const JOB_STATUSES: JobStatus[] = ["QUEUED", "RUNNING", "READY", "SENT", "FAILED"];

export function countByStatus<T extends { status: JobStatus }>(items: T[]) {
  const counts = Object.fromEntries(JOB_STATUSES.map((s) => [s, 0])) as Record<JobStatus, number>;
  for (const item of items) counts[item.status]++;
  return JOB_STATUSES.map((status) => ({
    status,
    label: STATUS_META[status].label,
    count: counts[status],
    fill: STATUS_META[status].color,
  }));
}
