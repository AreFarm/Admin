import { createClient } from "@/lib/supabase/server";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

/**
 * Calls the backend's /v1/admin/* API as the current Supabase session,
 * server-side only (Server Components / Route Handlers) — attaches the
 * session's access token as the Bearer credential AdminAuthGuard verifies.
 */
export async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch(`${API_URL}/v1/admin${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${session?.access_token ?? ""}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ code: "unknown", message: res.statusText }));
    throw new ApiError(res.status, body.code ?? "unknown", body.message ?? res.statusText);
  }

  return res.json() as Promise<T>;
}
