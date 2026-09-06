import Link from "next/link";
import { adminFetch } from "@/lib/api";
import type { AdminFarm, Page } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function FarmsPage() {
  const page = await adminFetch<Page<AdminFarm>>("/farms");

  return (
    <div>
      <h1 className="text-2xl font-semibold">Farms</h1>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>LGA</TableHead>
            <TableHead>Ponds</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {page.items.map((farm) => (
            <TableRow key={farm.id}>
              <TableCell className="font-medium">{farm.name}</TableCell>
              <TableCell>
                <Link href={`/users/${farm.owner.id}`} className="underline-offset-2 hover:underline">
                  {farm.owner.displayName ?? farm.owner.phone}
                </Link>
              </TableCell>
              <TableCell>{farm.locationLga ?? "—"}</TableCell>
              <TableCell>{farm._count.ponds}</TableCell>
              <TableCell>{new Date(farm.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {page.items.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No farms found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
