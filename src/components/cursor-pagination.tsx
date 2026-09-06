import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function CursorPagination({
  basePath,
  searchParams,
  history,
  currentCursor,
  nextCursor,
  count,
}: {
  basePath: string;
  /** The page's full resolved searchParams — cursor/history are stripped, everything else (filters) carries over. */
  searchParams: Record<string, string | undefined>;
  history: string[];
  currentCursor?: string;
  nextCursor: string | null;
  count: number;
}) {
  const hasPrev = history.length > 0;
  const hasNext = nextCursor !== null;
  if (!hasPrev && !hasNext) return null;

  const filters = Object.fromEntries(
    Object.entries(searchParams).filter(([key]) => key !== "cursor" && key !== "history"),
  );

  function buildHref(cursor: string, historyStack: string[]) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) params.set(key, value);
    }
    if (cursor) params.set("cursor", cursor);
    if (historyStack.length) params.set("history", historyStack.join(","));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const prevHref = hasPrev ? buildHref(history[history.length - 1], history.slice(0, -1)) : null;
  const nextHref = hasNext ? buildHref(nextCursor!, [...history, currentCursor ?? ""]) : null;
  const navClass = cn(buttonVariants({ variant: "outline", size: "sm" }));

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{count} on this page</p>
      <div className="flex gap-2">
        {prevHref ? (
          <Link href={prevHref} className={navClass}>
            <ChevronLeft className="size-3.5" /> Previous
          </Link>
        ) : (
          <span className={cn(navClass, "pointer-events-none opacity-50")}>
            <ChevronLeft className="size-3.5" /> Previous
          </span>
        )}
        {nextHref ? (
          <Link href={nextHref} className={navClass}>
            Next <ChevronRight className="size-3.5" />
          </Link>
        ) : (
          <span className={cn(navClass, "pointer-events-none opacity-50")}>
            Next <ChevronRight className="size-3.5" />
          </span>
        )}
      </div>
    </div>
  );
}
