# AreFarm Admin

Staff dashboard for AreFarm — support/account ops, cross-user farm/data
oversight, and operational visibility into the backend's BullMQ workers
(Reports, Notifications). Talks to the
[Core-Backend](https://github.com/AreFarm/Core-Backend) API's `/v1/admin/*`
surface; nothing here talks to the database directly.

Not part of the v1 farmer-facing MVP — this is the staff-only tool, built
against the backend's admin API.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase Auth for staff sign-in (email+password) — **separate from** the
  farmer phone+OTP auth in the backend; gated further by an `ADMIN_EMAILS`
  allowlist on the backend side (no staff-role table yet)

## Setup

```bash
pnpm install
cp .env.example .env.local   # fill in the three vars below
pnpm dev                      # http://localhost:3001 (or whatever port's free)
```

| Var | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Same Supabase project as the backend — Settings → API Keys |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page — the **anon/publishable** key, never the service_role/secret one |
| `API_URL` | The backend's URL (`http://localhost:3000` for local dev against Core-Backend, or its Render URL) |

Your Supabase Auth user's email also needs to be in the backend's
`ADMIN_EMAILS` env var, or every API call will 403.

## Structure

```
src/
├─ app/
│  ├─ login/            # Supabase Auth sign-in (Client Component)
│  └─ (dashboard)/       # everything else — gated by proxy.ts
│     ├─ users/          # support/account ops + AuditLog
│     ├─ farms/          # cross-user farm oversight
│     ├─ reports/        # Reports queue + retry FAILED
│     └─ notifications/  # NotificationJob queue + retry FAILED
├─ lib/
│  ├─ api.ts             # server-only fetch wrapper → backend /v1/admin/*
│  ├─ supabase/          # browser + server Supabase clients
│  └─ types.ts           # local copies of the backend's admin response shapes
└─ proxy.ts              # refreshes the Supabase session, redirects to /login
```

`src/lib/types.ts` deliberately duplicates shapes already defined in
Core-Backend's Prisma schema — these are two separate repos, not one
monorepo, so there's no shared-types package to import from.
