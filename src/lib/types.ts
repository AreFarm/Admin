// Mirrors apps/api/src/admin/*'s Prisma-shaped JSON responses (Core-Backend repo).
// Kept minimal/local rather than shared — these two repos aren't in one
// monorepo, so this is duplication by design, not an oversight.

export interface Page<T> {
  items: T[];
  next_cursor: string | null;
}

export interface AdminUser {
  id: string;
  phone: string;
  email: string | null;
  displayName: string | null;
  locale: string;
  roleFarmer: boolean;
  createdAt: string;
  deletedAt: string | null;
}

export interface AdminFarm {
  id: string;
  name: string;
  locationLga: string | null;
  createdAt: string;
  owner: { id: string; phone: string; displayName: string | null };
  _count: { ponds: number };
}

export type JobStatus = "QUEUED" | "RUNNING" | "READY" | "SENT" | "FAILED";

export interface AdminReport {
  id: string;
  scope: "FARM" | "POND" | "BATCH";
  format: "PDF" | "CSV";
  status: JobStatus;
  artifactUrl: string | null;
  createdAt: string;
  user: { id: string; phone: string };
}

export interface AdminNotification {
  id: string;
  channel: "SMS" | "PUSH";
  template: string;
  status: JobStatus;
  createdAt: string;
  user: { id: string; phone: string };
}
