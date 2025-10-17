# Project: Logistics Management System

## Project Overview

This is a full-stack logistics management application built with a modern TypeScript-based technology stack. It appears to be a monorepo, with separate packages for the frontend, backend, database, and UI components.

### Key Technologies:

*   **Package Manager:** [Bun](https://bun.sh/)
*   **Monorepo:** Yes, using Bun workspaces.
*   **Frontend:**
    *   **Framework:** [React](https://react.dev/)
    *   **Build Tool:** [Rsbuild](https://rsbuild.rs/) (using Vite)
    *   **Routing:** [TanStack Router](https://tanstack.com/router)
    *   **Data Fetching:** [TanStack Query](https://tanstack.com/query)
    *   **Forms:** [TanStack Form](https://tanstack.com/form)
    *   **Tables:** [TanStack Table](https://tanstack.com/table)
    *   **State Management:** [Jotai](https://jotai.org/)
    *   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Backend:**
    *   **Framework:** [Hono](https://hono.dev/)
    *   **RPC:** [@orpc](https://github.com/orpc/orpc)
*   **Database:**
    *   **Database:** PostgreSQL
    *   **ORM/Query Builder:** [Drizzle ORM](https://orm.drizzle.team/) and [Kysely](https://kysely.dev/)
    *   **Schema Validation:** [Zod](https://zod.dev/)
*   **Authentication:** [better-auth](https://better-auth.dev/)
*   **Deployment:** Docker (using `docker-compose`)
*   **Task Runner:** [Just](https://just.systems/)
*   **Code Quality:** [Biome](https://biomejs.dev/) for linting and formatting.

## Building and Running

### Development

To start the development server for all services (frontend, backend, packages):

```bash
just dev
```

This will use `docker-compose` to start the database and run the frontend and backend servers in parallel.

You can also run individual components:

*   `just dev-backend`
*   `just dev-frontend`
*   `just dev-packages`

### Production Build

To build the entire application for production:

```bash
bun run build
```

This will build all packages and applications.

### Docker

To build and push the production Docker image:

```bash
just docker-build
just docker-push
```

(Note: This requires environment variables like `DOCKER_REGISTRY_URL` to be set.)

## Development Conventions

*   **Code Style:** Use `biome` for formatting and linting.
    *   `bun run format` to format all code.
    *   `bun run lint` to lint all code.
    *   `bun run check` to check and fix all code.
*   **Type Checking:** Run `bun run typecheck` to check for TypeScript errors in all workspaces.
*   **Database Migrations:** The project uses `drizzle-kit` and `kysely-codegen`. Look for scripts or documentation related to database schema changes. The `just introspect` command is available to generate types from the database schema.
*   **Authentication:** The project uses `better-auth`. The `just auth-generate` command is available to generate the auth schema.
