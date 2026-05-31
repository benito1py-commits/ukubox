# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The line above is not decoration. This repo pins **Next.js 16.2.1 / React 19**, whose
> App Router APIs differ from older versions baked into training data. Before writing
> Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. Notably:
> `cookies()` is **async** (`await cookies()`), and route handler `params` is a
> **`Promise`** (`{ params }: { params: Promise<{ id: string }> }` → `await params`).

## Commands

```bash
npm run dev      # dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test suite. Type checking happens via the build / editor (`tsc` with `noEmit`).
Path alias `@/*` → `src/*`.

## What this is

UKUXBOX — a package-forwarding ("casillero") site: customers buy in the US (Miami) and
receive in Paraguay. The codebase, identifiers, and comments are in **Spanish**; match
that convention when adding code.

## Architecture: Next.js as a secure proxy to the Helga API

This frontend has no database of its own. All business data comes from the external
**Helga** backend (`helgasys.com`). The critical pattern:

```
Browser → Next.js API route (src/app/api/helga/**) → src/lib/helga/* → Helga API
```

- **Secrets never reach the browser.** `HELGA_CLIENT_ID`, `HELGA_CLIENT_SECRET`,
  `HELGA_APP_ID`, and `HELGA_BASE_URL` live only in server env (`.env.local`).
- **Auth uses OAuth password grant.** `lib/helga/auth.ts` stores the user's
  `access_token` / `refresh_token` in **httpOnly cookies** (`helga_access_token`,
  `helga_refresh_token`). `getValidAccessToken()` reads the access cookie and
  transparently refreshes via the refresh cookie when missing.
- **Two layers, mirrored by feature.** Each domain has a `lib/helga/<feature>.ts` module
  (pure functions that call Helga) and a matching `app/api/helga/<feature>/route.ts`
  (the proxy endpoint the browser hits). Features: `auth`, `ubicacion`, `clientes`,
  `prealertas`, `destinatarios`, `despachos`.

### Adding a Helga-backed endpoint — the established pattern

1. Add a typed function in the relevant `src/lib/helga/<feature>.ts` that calls
   `helgaFetch<T>(path, { method, body, token })` (or `helgaPublicFetch` for endpoints
   needing only `app_id`, e.g. location lookups). Define request/response types in
   `src/lib/helga/types.ts`.
2. Add a route handler under `src/app/api/helga/<feature>/`. The standard body:
   ```ts
   export async function POST(request: NextRequest) {
     try {
       const token = await getValidAccessToken();   // omit for public endpoints
       const body = await request.json();
       const data = await someLibFn(token, body);
       return NextResponse.json(data);
     } catch (error) {
       return handleHelgaError(error);              // always funnel errors here
     }
   }
   ```
3. `handleHelgaError` (`lib/helga/helpers.ts`) translates `HelgaApiError` into the right
   status/body and maps `"Not authenticated"` → 401. Don't hand-roll error responses.

### Helga response envelopes (in `types.ts`)

Helga is inconsistent across endpoint generations — check which envelope an endpoint uses:
- `HelgaResponse<T>` → `{ datos, msg, errores }` (most `/api/casillero/*` endpoints)
- `HelgaV2Response<T>` → `{ success, message, data, errors }` (`/api/v2/*` endpoints)
- `HelgaTokenResponse` → OAuth token payload

Note that some routes are overloaded by body shape (e.g. `despachos/solicitudes` POST is
"list" if the body has `pageSize` and no `paquetes`, otherwise "create").

## Frontend structure

- `src/app/layout.tsx` — root layout (Geist fonts, `lang="es"`, metadata).
- `src/app/sitio/**` — public marketing + account pages, wrapped by `sitio/layout.tsx`
  which adds the shared `Header` / `Footer` (`src/components/layout/`).
- Tailwind CSS **v4** (via `@tailwindcss/postcss`); global styles in `app/globals.css`.
- Icons: `lucide-react`.

## A note on the docs in the repo root

`CASILLERO-PROGRESS.md` and parts of the planning HTML describe a **Supabase**-based
implementation (`src/lib/supabase/`, RLS, migrations). That code does **not** exist in
this tree — the implemented architecture is the Helga proxy described above. Treat those
files as historical/aspirational planning, not a description of the current code.
The `.mcp.json` Supabase/Playwright MCP servers are tooling, not app dependencies.
