"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { retryNotification } from "./actions";

export function RetryNotificationButton({ notificationId }: { notificationId: string }) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await retryNotification(notificationId);
      if (result.ok) {
        toast.success("Notification re-queued.");
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
