## Purpose

Short, actionable guidance for AI coding agents working in this repo so they can be productive immediately.

## Big picture (what this repo is)

- Backend: Go app using PocketBase (see `main.go`). It imports `migrations` (side-effect) and registers the PocketBase migrate CLI plugin. The server serves frontend static assets from `./dist`.
- Frontend: React app built with Rsbuild and TypeScript under `src/` (see `package.json` and `README.md`). Build output lands in `./dist` and is served by the Go backend in production.
- Persistence: PocketBase data files live under `pb_data/` (SQLite). Migrations live under `migrations/` and follow timestamped filenames (e.g. `1755600044_created_lms_shipments.go`).

## Where to look first (high value files/dirs)

- `main.go` — bootstraps PocketBase, registers migration CLI, and mounts `./dist` as static files.
- `migrations/` — schema + data migrations. Files are timestamped and must be treated as immutable history.
- `pb_data/` — the PocketBase DB folder (do not overwrite without intent).
- `package.json`, `tsconfig.json`, `src/` — frontend build and dev server (pnpm). `README.md` contains basic pnpm commands.
- `Dockerfile` — containerization hints and environment expectations.
- `seed.ts` — placeholder for seeding logic (currently empty); if you need to create data seeds, they tend to be TypeScript scripts that use the PocketBase JS client.

## Key commands / dev workflows

- Frontend development
  - Install: `pnpm install`
  - Dev server: `pnpm dev` (rsbuild dev server, hot reload)
  - Build for production: `pnpm build` (emits `./dist`)

- Backend development
  - Run locally: `go run main.go` (or `go build && ./<binary>`)
  - The backend serves `./dist` at runtime. For full-stack dev you can either run frontend dev server + backend separately, or build the frontend and let backend serve `./dist`.

- Migrations
  - The repo uses PocketBase migrations. `migratecmd.MustRegister(..., Automigrate: true)` means migrations are registered with the app CLI. To inspect/run migrations, run the built binary with the migration subcommand (the plugin registers a `migrate` command on the app root command).
  - Conventions: add new migration files under `migrations/` with a timestamp prefix. Do NOT edit historical migration files — create new ones.

## Project-specific conventions & patterns

- Migration files are timestamp-prefixed Go files. They are applied in lexicographic order. Treat them as immutable history.
- The backend mounts static assets at GET `/{path...}` using `apis.Static(os.DirFS("./dist"), true)` (see `main.go`). If you need to change where static files are served from, edit that line.
- Side-effect imports: `migrations` is imported for registration. When adding new top-level initialization, prefer the same pattern (package init side-effects inside `migrations/`).
- Seeding: `seed.ts` exists but is empty — the common pattern is to use the PocketBase JS client in a TypeScript script to create initial records. Keep seeds idempotent if possible.

## Integration points & external dependencies

- PocketBase (Go) — core server and DB. Check `go.mod` for version (`github.com/pocketbase/pocketbase`).
- Frontend dependencies are managed with pnpm (see `package.json`). The frontend uses Rsbuild + React + Tailwind.
- Persistent DB lives in `pb_data/` (SQLite via modernc.org/sqlite in `go.mod`).

## Safe editing rules for AI agents (must-follow)

- Never modify existing migration files. Create new migration files for schema changes.
- Don't overwrite `pb_data/` unless the change is intentional; treat it as production-like data.
- When changing backend routes or middleware, prefer small, focused edits to `main.go` and register new handlers using PocketBase's OnServe hooks.
- For frontend changes, prefer running `pnpm dev` and testing in the browser; update `src/` and then `pnpm build` for production artifacts.

## Quick examples (how to do common tasks)

- Add a new migration: create a new file in `migrations/` named like `$(unix_ts)_description.go` and follow existing file patterns.
- Run full-stack locally: build frontend `pnpm build`, then run backend `go run main.go` so the backend serves `./dist`.

## Files to inspect when troubleshooting

- `main.go`, `go.mod`, `migrations/`, `pb_data/`, `package.json`, `src/`, `Dockerfile`, `seed.ts`, `README.md`.

## When uncertain — ask these targeted questions

- Do you want a database migration or a data seed? (migrations -> `migrations/`; seeds -> `seed.ts` or a new script)
- Is this a frontend-only change (edit `src/` + `pnpm dev`) or full-stack (also edit Go backend)?

---

If any section is unclear or you'd like explicit examples (a sample migration template or a seed script), tell me which one and I will add it.
