"use server";

import { revalidatePath } from "next/cache";
import { adminFetch } from "@/lib/api";

export async function retryReport(reportId: string): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await adminFetch(`/reports/${reportId}/retry`, { method: "POST" });
    revalidatePath("/reports");
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Retry failed." };
  }
}
