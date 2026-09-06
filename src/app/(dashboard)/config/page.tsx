import { InfoPill } from "@/components/info-pill";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FLAGS = [
  {
    title: "Marketplace (Phase 2)",
    description: "Exposes listings, orders and escrow payouts to farmer accounts.",
    envVar: "FEATURE_MARKETPLACE",
    enabled: false,
  },
  {
    title: "SMS fallback via Africa's Talking",
    description: "When a push token is missing or fails, retry the notification over SMS.",
    envVar: "AT_API_KEY",
    enabled: true,
  },
  {
    title: "Izon (ijc) locale",
    description: "Catalog passes key parity but copy is still under review by native speakers.",
    envVar: "FEATURE_LOCALE_IJC",
    enabled: false,
  },
  {
    title: "Server-side PDF reports",
    description: "Route report generation through the BullMQ worker instead of on-device CSV only.",
    envVar: "FEATURE_PDF_REPORTS",
    enabled: true,
  },
];

const STAFF = [{ email: "ebi@arefarm.ng", added: "2026-02-01", lastSeen: "Today, 09:12" }];

export default function ConfigPage() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Config &amp; flags</h1>
        <InfoPill>Proposed screen</InfoPill>
      </div>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        Everything here is currently an env var on Render — changing one needs a redeploy, and the
        staff allowlist lives in{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">ADMIN_EMAILS</code> with no
        role table behind it. A config surface would remove that deploy step.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {FLAGS.map((flag) => (
          <Card key={flag.envVar}>
            <CardContent className="flex items-center justify-between gap-4">
              <div>
                <div className="font-medium">{flag.title}</div>
                <div className="text-sm text-muted-foreground">{flag.description}</div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">{flag.envVar}</div>
              </div>
              <Switch defaultChecked={flag.enabled} disabled />
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold">Staff allowlist</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Added</TableHead>
            <TableHead>Last seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {STAFF.map((s) => (
            <TableRow key={s.email}>
              <TableCell className="font-medium">{s.email}</TableCell>
              <TableCell className="text-muted-foreground">{s.added}</TableCell>
              <TableCell className="text-muted-foreground">{s.lastSeen}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
