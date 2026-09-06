import { InfoPill } from "@/components/info-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "cn";

const STATS: { label: string; value: string; sub: string; tone?: "critical" | "stale" }[] = [
  { label: "Push acceptance rate", value: "98.2%", sub: "applied ÷ total mutations, 24h" },
  { label: "Rejected", value: "2", sub: "zod validation failures", tone: "critical" },
  { label: "Stale (LWW loss)", value: "2", sub: "client edit older than server", tone: "stale" },
  { label: "Median pull lag", value: "4.1s", sub: "device clock vs server_seq" },
];

const MUTATION_STATUS_STYLES: Record<string, string> = {
  rejected: "bg-status-critical text-white",
  stale: "bg-status-warning text-white",
  duplicate: "bg-muted text-muted-foreground",
};

const MUTATIONS = [
  {
    entity: "LogEntry",
    op: "upsert",
    status: "rejected",
    user: "+2347065558812",
    reason: "payload.qty must be positive",
    when: "2026-09-06 06:41",
  },
  {
    entity: "Pond",
    op: "upsert",
    status: "stale",
    user: "+2348031234567",
    reason: "last_client_ts older than server",
    when: "2026-09-06 05:12",
  },
  {
    entity: "LogEntry",
    op: "upsert",
    status: "duplicate",
    user: "+2348090012345",
    reason: "client_id already applied",
    when: "2026-09-05 21:38",
  },
  {
    entity: "Batch",
    op: "upsert",
    status: "rejected",
    user: "+2348122390045",
    reason: "pond_id not found",
    when: "2026-09-05 17:04",
  },
  {
    entity: "Reminder",
    op: "delete",
    status: "stale",
    user: "+2347033398701",
    reason: "record newer on server",
    when: "2026-09-05 09:50",
  },
];

export default function SyncHealthPage() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Sync health</h1>
        <InfoPill>Proposed screen</InfoPill>
      </div>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        The offline-first sync protocol is the riskiest part of v1 and has no staff-facing
        visibility. Rejected and stale mutations are already recorded per{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">MUTATION_STATUSES</code>{" "}
        — this surfaces them so support can answer &ldquo;my logs disappeared&rdquo; without a
        database session.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div
                className={cn(
                  "mt-1 text-3xl font-semibold tabular-nums",
                  stat.tone === "critical" && "text-status-critical",
                  stat.tone === "stale" && "text-status-warning",
                )}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold">Rejected &amp; stale mutations — last 24h</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Entity</TableHead>
            <TableHead>Op</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>When</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MUTATIONS.map((m, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{m.entity}</TableCell>
              <TableCell className="font-mono text-sm">{m.op}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex h-5 items-center rounded-full px-2 text-xs font-medium",
                    MUTATION_STATUS_STYLES[m.status],
                  )}
                >
                  {m.status}
                </span>
              </TableCell>
              <TableCell>{m.user}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">{m.reason}</TableCell>
              <TableCell className="text-muted-foreground">{m.when}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
