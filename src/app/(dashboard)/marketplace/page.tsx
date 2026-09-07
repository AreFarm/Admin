import { InfoPill } from "@/components/info-pill";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "cn";

const TABS = ["Pending", "Flagged", "Approved", "Rejected"] as const;

const TIER_VARIANT = {
  PHOTO: "outline",
  ID: "default",
  PHONE: "outline",
} as const;

const LISTINGS = [
  { listing: "Catfish fingerlings — 500 units", seller: "Tamuno Aremieye", tier: "PHOTO", price: "₦25,000", flags: "—" },
  { listing: "Grower feed — 50kg bag", seller: "Sarah Dogo", tier: "ID", price: "₦18,500", flags: "—" },
  { listing: "Live catfish — 20kg lot", seller: "Emeka Nwosu", tier: "PHONE", price: "₦32,000", flags: "2 reports" },
  { listing: "Aerator pump, 2HP", seller: "Blessing Amadi", tier: "PHOTO", price: "₦65,000", flags: "1 report" },
  { listing: "Tilapia fingerlings — 1000 units", seller: "Sarah Dogo", tier: "ID", price: "₦41,000", flags: "—" },
] as const;

export default function MarketplacePage() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Marketplace</h1>
        <InfoPill>Phase 2 — not built</InfoPill>
      </div>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        Listings moderation, orders and payouts. No backend endpoints exist yet —
        Core-Backend&rsquo;s README states marketplace/payments are intentionally out of v1. This is
        the design target for when Phase 2 lands, not a live screen.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <span
            key={tab}
            className={cn(
              "rounded-lg border px-3 py-1 text-sm font-medium",
              tab === "Pending"
                ? "border-primary/40 bg-accent text-accent-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            {tab}
          </span>
        ))}
      </div>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Listing</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Flags</TableHead>
            <TableHead>Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LISTINGS.map((item) => (
            <TableRow key={item.listing}>
              <TableCell className="font-medium">{item.listing}</TableCell>
              <TableCell>{item.seller}</TableCell>
              <TableCell>
                <Badge variant={TIER_VARIANT[item.tier]}>{item.tier}</Badge>
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell className="text-muted-foreground">{item.flags}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" disabled>
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" disabled>
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
