"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { retryReport } from "./actions";

export function RetryReportButton({ reportId }: { reportId: string }) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await retryReport(reportId);
      if (result.ok) {
        toast.success("Report re-queued.");
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Button size="sm" variant="outline" onClick={handleClick} disabled={pending}>
      {pending ? "Retrying…" : "Retry"}
    </Button>
  );
}
