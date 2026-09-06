import { Users, Sprout, FileText, Bell } from "lucide-react";
import { adminFetch } from "@/lib/api";
import type { AdminUser, AdminFarm, AdminReport, AdminNotification, Page } from "@/lib/types";
import { countByStatus } from "@/lib/status-meta";
import { StatTile } from "./stat-tile";
import { StatusChart } from "./status-chart";

export default async function OverviewPage() {
  const [users, farms, reports, notifications] = await Promise.all([
    adminFetch<Page<AdminUser>>("/users?limit=200"),
    adminFetch<Page<AdminFarm>>("/farms?limit=200"),
    adminFetch<Page<AdminReport>>("/reports?limit=200"),
    adminFetch<Page<AdminNotification>>("/notifications?limit=200"),
  ]);

  const reportStatusCounts = countByStatus(reports.items);
  const notificationStatusCounts = countByStatus(notifications.items);
  const failedReports = reportStatusCounts.find((s) => s.status === "FAILED")?.count ?? 0;
  const failedNotifications = notificationStatusCounts.find((s) => s.status === "FAILED")?.count ?? 0;

  const suffix = (page: Page<unknown>) => (page.next_cursor ? "+" : "");

  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <p className="mt-2 text-muted-foreground">
        Pick an area from the sidebar — Users for support/account ops, Farms for cross-user data
        oversight, Reports/Notifications for BullMQ worker visibility.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Users" value={`${users.items.length}${suffix(users)}`} icon={Users} />
        <StatTile label="Farms" value={`${farms.items.length}${suffix(farms)}`} icon={Sprout} />
        <StatTile
          label="Failed reports"
          value={String(failedReports)}
          icon={FileText}
          tone={failedReports > 0 ? "critical" : "default"}
        />
        <StatTile
          label="Failed notifications"
          value={String(failedNotifications)}
          icon={Bell}
          tone={failedNotifications > 0 ? "critical" : "default"}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatusChart
          title="Reports by status"
          description={`${reports.items.length} report${reports.items.length === 1 ? "" : "s"}${suffix(reports)} in the queue`}
          data={reportStatusCounts}
        />
        <StatusChart
          title="Notifications by status"
          description={`${notifications.items.length} notification${notifications.items.length === 1 ? "" : "s"}${suffix(notifications)} in the queue`}
          data={notificationStatusCounts}
        />
      </div>
    </div>
  );
}
