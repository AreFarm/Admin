import Link from "next/link";
import { adminFetch } from "@/lib/api";
import type { AdminUser, Page } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CursorPagination } from "@/components/cursor-pagination";
import { parseCursorParams } from "@/lib/pagination-params";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ phone?: string; cursor?: string; history?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { phone } = resolvedSearchParams;
  const { cursor, history } = parseCursorParams(resolvedSearchParams);

  const query = new URLSearchParams();
  if (phone) query.set("phone", phone);
  if (cursor) query.set("cursor", cursor);
  const qs = query.toString();
  const page = await adminFetch<Page<AdminUser>>(`/users${qs ? `?${qs}` : ""}`);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Users</h1>
      <form className="mt-4 max-w-xs">
        <Input name="phone" placeholder="Search by phone…" defaultValue={phone ?? ""} />
      </form>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Phone</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Locale</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {page.items.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link href={`/users/${user.id}`} className="font-medium underline-offset-2 hover:underline">
                  {user.phone}
                </Link>
              </TableCell>
              <TableCell>{user.displayName ?? "—"}</TableCell>
              <TableCell>{user.locale}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {user.roleFarmer && <Badge variant="secondary">Farmer</Badge>}
                  {user.roleSeller && <Badge variant="secondary">Seller</Badge>}
                  {user.roleBuyer && <Badge variant="secondary">Buyer</Badge>}
                  {!user.roleFarmer && !user.roleSeller && !user.roleBuyer && "—"}
                </div>
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {page.items.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CursorPagination
        basePath="/users"
        searchParams={resolvedSearchParams}
        history={history}
        currentCursor={cursor}
        nextCursor={page.next_cursor}
        count={page.items.length}
      />
    </div>
  );
}
