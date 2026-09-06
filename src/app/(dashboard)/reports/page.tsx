import { adminFetch } from "@/lib/api";
import type { AdminReport, Page } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { CursorPagination } from "@/components/cursor-pagination";
import { parseCursorParams } from "@/lib/pagination-params";
import { RetryReportButton } from "./retry-button";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ cursor?: string; history?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { cursor, history } = parseCursorParams(resolvedSearchParams);
  const page = await adminFetch<Page<AdminReport>>(`/reports${cursor ? `?cursor=${cursor}` : ""}`);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Reports</h1>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Scope</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {page.items.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.user.phone}</TableCell>
              <TableCell>{report.scope}</TableCell>
              <TableCell>{report.format}</TableCell>
              <TableCell>
                <StatusBadge status={report.status} />
              </TableCell>
              <TableCell>{new Date(report.createdAt).toLocaleString()}</TableCell>
              <TableCell>{report.status === "FAILED" && <RetryReportButton reportId={report.id} />}</TableCell>
            </TableRow>
          ))}
          {page.items.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No reports found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CursorPagination
        basePath="/reports"
        searchParams={resolvedSearchParams}
        history={history}
        currentCursor={cursor}
        nextCursor={page.next_cursor}
        count={page.items.length}
      />
    </div>
  );
}
