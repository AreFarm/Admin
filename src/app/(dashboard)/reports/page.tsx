import { adminFetch } from "@/lib/api";
import type { AdminReport, JobStatus, Page } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { StatusFilterTabs } from "@/components/status-filter-tabs";
import { CursorPagination } from "@/components/cursor-pagination";
import { parseCursorParams } from "@/lib/pagination-params";
import { RetryReportButton } from "./retry-button";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ cursor?: string; history?: string; status?: JobStatus }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { status } = resolvedSearchParams;
  const { cursor, history } = parseCursorParams(resolvedSearchParams);

  const query = new URLSearchParams();
  if (status) query.set("status", status);
  if (cursor) query.set("cursor", cursor);
  const qs = query.toString();
  const page = await adminFetch<Page<AdminReport>>(`/reports${qs ? `?${qs}` : ""}`);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Reports</h1>
      <div className="mt-4">
        <StatusFilterTabs basePath="/reports" status={status} />
      </div>
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
