import Link from "next/link";
import { adminFetch } from "@/lib/api";
import type { AdminUser, Page } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ phone?: string }> }) {
  const { phone } = await searchParams;
  const page = await adminFetch<Page<AdminUser>>(`/users${phone ? `?phone=${encodeURIComponent(phone)}` : ""}`);

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
              <TableCell>{user.roleFarmer ? <Badge variant="secondary">Farmer</Badge> : "—"}</TableCell>
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
    </div>
  );
}
