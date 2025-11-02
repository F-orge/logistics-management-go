# Agent Guidelines for Logistics Management System

## Build & Development Commands

All commands use `just <command>`. Key commands:

- **Dev server**: `just dev` (backend + frontend + Docker concurrently)
- **Dev backend only**: `just dev-backend`
- **Dev frontend only**: `just dev-frontend`
- **Build**: `just build` (turbo build + format check)
- **Type check**: `just typecheck`
- **Lint & format**: `just lint` or `just check` (Biome auto-fix)
- **Test**: `just test` (runs tests with GraphQL setup preloaded)

## Code Style Guidelines

**Formatting & Linting**: Biome enforces all formatting (120 char line width, 2-space indentation, double quotes, semicolons, trailing commas). Run `bun run check` to auto-fix all files.

**Imports**: Use barrel files (`index.ts`) for clean exports. Import from monorepo workspaces using `@apps/*` and `@packages/*` aliases.

**TypeScript**: Enable strict mode. Avoid `any`; use `unknown`. Prefer interfaces for object shapes. Use explicit type annotations on public APIs. Leverage utility types (`Partial`, `Pick`, `Omit`).

**Naming Conventions**: 
- Files/dirs: `kebab-case`
- Functions/variables: `camelCase`
- Types/interfaces: `PascalCase`
- Database: `snake_case` (tables, columns)
- GraphQL: `camelCase` fields, `PascalCase` types, `SCREAMING_SNAKE_CASE` enums

**Error Handling**: Wrap database operations in `try-catch`. Use custom error types in GraphQL resolvers. Validate inputs with Zod. Use transactions for atomic operations.

## Architecture Notes

**Monorepo**: Bun workspaces with `@apps/*` (backend, frontend) and `@packages/*` (graphql, ui). Use `bun --filter <workspace>` for workspace-specific commands.

**Database**: Kysely query builder with PostgreSQL. Type-safe schemas auto-generated. Migrations in `migrations/`.

**GraphQL**: Yoga server. Schema-first with code generation. See `packages/graphql/` for client generation and Zod validation schemas.

**Frontend**: RSBuild + React 19 + TanStack Router/Query. Tailwind CSS + Radix UI components.

## Reference

See `GUIDELINES.md` for detailed TypeScript, GraphQL, and PostgreSQL best practices.
