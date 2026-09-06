"use server";

import { revalidatePath } from "next/cache";
import { adminFetch } from "@/lib/api";

export async function retryNotification(notificationId: string): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await adminFetch(`/notifications/${notificationId}/retry`, { method: "POST" });
    revalidatePath("/notifications");
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Retry failed." };
  }
}
