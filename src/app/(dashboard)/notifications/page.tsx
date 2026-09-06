import { adminFetch } from "@/lib/api";
import type { AdminNotification, Page } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { RetryNotificationButton } from "./retry-button";

export default async function NotificationsPage() {
  const page = await adminFetch<Page<AdminNotification>>("/notifications");

  return (
    <div>
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Channel</TableHead>
            <TableHead>Template</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {page.items.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell>{notification.user.phone}</TableCell>
              <TableCell>{notification.channel}</TableCell>
              <TableCell className="font-mono text-sm">{notification.template}</TableCell>
              <TableCell>
                <StatusBadge status={notification.status} />
              </TableCell>
              <TableCell>{new Date(notification.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                {notification.status === "FAILED" && <RetryNotificationButton notificationId={notification.id} />}
              </TableCell>
            </TableRow>
          ))}
          {page.items.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No notifications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
