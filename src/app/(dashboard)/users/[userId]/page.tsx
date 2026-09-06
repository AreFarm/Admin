import { adminFetch } from "@/lib/api";
import type { AdminUser, Page } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AuditLogEntry {
  id: string;
  action: string;
  actorType: string;
  createdAt: string;
  metadata: Record<string, unknown> | null;
}

interface UserDetail extends AdminUser {
  subscription: { plan: string; status: string } | null;
  _count: { farms: number; poultryHouses: number; devices: number };
}

export default async function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const [user, auditLog] = await Promise.all([
    adminFetch<UserDetail>(`/users/${userId}`),
    adminFetch<Page<AuditLogEntry>>(`/audit-log?targetId=${userId}`),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">{user.displayName ?? user.phone}</h1>
        <p className="text-muted-foreground">{user.phone}</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Plan</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-medium">{user.subscription?.plan ?? "FREE"}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Farms</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-medium">{user._count.farms}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Poultry houses</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-medium">{user._count.poultryHouses}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Devices</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-medium">{user._count.devices}</CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold">Audit log</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLog.items.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-mono text-sm">{entry.action}</TableCell>
                <TableCell>{entry.actorType}</TableCell>
                <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            {auditLog.items.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No audit log entries.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
