# Copilot Instructions - ETMAR Logistics Management System

## Project Overview

This is a comprehensive logistics management system for ETMAR Logistics built with modern TypeScript technologies. The system handles CRM, inventory management, and customer portals in a full-stack application.

## Tech Stack & Architecture

- **Frontend**: TanStack Start (file-based React router) + React 19
- **Backend**: Nitro v2 server with Bun runtime 
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with admin/bearer plugins
- **UI**: Radix UI components + Tailwind CSS + shadcn/ui patterns
- **Build Tools**: Vite + Rsbuild + Biome (linting/formatting)
- **Package Manager**: Bun
- **Development**: Docker Compose + justfile automation

## Project Structure Patterns

### File-Based Routing (TanStack Start)
- Routes defined in `src/routes/` using TanStack Start conventions
- Use `createFileRoute` for route definitions, not `createLazyFileRoute`
- Route components should be function declarations in same file as route
- Special files: `__root.tsx`, `index.tsx`, `_layout.tsx`, `-not-found.tsx`

```tsx
// Pattern: Route definition with component
export const Route = createFileRoute('/dashboard/users')({
  component: UsersComponent,
  loader: async ({ params }) => { /* loader logic */ },
})

function UsersComponent() {
  const data = Route.useLoaderData()
  return <div>Users</div>
}
```

### Database Schema Organization

**Schema Structure:**
- Main auth tables: `src/db/schemas/better-auth.ts` (generated from Better Auth)
- Domain schemas: `src/db/schemas/crm/` (CRM entities)
- Schema helpers: `src/db/schemas/helpers.ts` (common entity fields)
- Schema index: `src/db/schemas/index.ts` (barrel exports)

**Entity Patterns:**
- All entities use `entityFields` from helpers (id, createdAt, updatedAt, deletedAt)
- CRM entities use `crmSchema` PostgreSQL schema for namespacing
- UUID primary keys with `gen_random_uuid()` defaults
- Consistent indexing patterns for performance
- Owner references link to `user.id` from Better Auth

```typescript
// Pattern: CRM entity definition
export const crmContacts = crmSchema.table(
  "contacts",
  {
    ...entityFields,
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    ownerId: text("owner_id").notNull().references(() => user.id),
  },
  (table) => [
    index("idx_crm_contacts_email").on(table.email),
    index("idx_crm_contacts_owner_id").on(table.ownerId),
  ],
);
```

### Authentication Architecture

- Better Auth with Drizzle adapter for PostgreSQL
- Factory pattern: `authFactory(dbClient)` for testing/different DB instances
- Plugins: `bearer()`, `admin()`, `reactStartCookies()`
- Schema auto-generated: run `just auth-generate` to update

## Development Workflows

### Essential Commands (via justfile)
```bash
just dev              # Start development server (bun vite dev)
just build            # Production build 
just check            # Biome lint/format check with fixes
just auth-generate    # Generate Better Auth schema
just drizzle-generate # Generate Drizzle migrations
just drizzle-migrate  # Run database migrations  
just drizzle-studio   # Open Drizzle Studio
```

### Docker Development
- Use `compose.dev.yaml` for local development with hot reload
- Production uses prebuilt images defined in `compose.yaml`
- Environment variables pattern: `DOCKER_*` prefix for container config

### Code Quality
- **Biome**: Single tool for linting, formatting, import organization
- **Configuration**: `biome.json` with single quotes, space indentation
- **Pre-commit**: Run `just check` before commits

## Component & UI Patterns

### UI Component Organization
- Base components: `src/components/ui/` (shadcn/ui style)
- App components: `src/components/` (app-specific)
- Custom UI: `src/components/ui/kibo-ui/` (project-specific extensions)

### Form Patterns
- Use TanStack Form with Zod validation (`@tanstack/zod-adapter`)
- Radix UI primitives for consistent accessibility
- Form fields follow shadcn/ui patterns in `src/components/ui/`

### State Management
- TanStack Query for server state
- Jotai for client state when needed
- Better Auth session management

## Database Development

### Migration Workflow
1. Modify schema files in `src/db/schemas/`
2. Run `just drizzle-generate` to create migration
3. Run `just drizzle-migrate` to apply to database
4. Use `just drizzle-studio` for data inspection

### Seeding & Testing Data
- Seed factory in `src/db/index.ts` using drizzle-seed
- Faker.js integration for realistic test data
- Pattern: `seedFactory(dbClient)` for different database instances

## Existing Instruction Files

Reference these for specific coding patterns:
- `.github/instructions/tanstack.instructions.md` - TanStack Router conventions
- `.github/instructions/entity.instructions.md` - Database entity patterns  
- `.github/instructions/relationship.instructions.md` - GraphQL relationship resolvers
- `.github/instructions/fake-data.instructions.md` - Test data generation

## Environment & Deployment

### Local Development
- Requires: Bun, Docker (for PostgreSQL)
- Environment file: `.env` (not committed)
- Database: PostgreSQL 17 via Docker Compose

### Production Deployment
- Docker build: `just docker-build` (with version checking)
- Bun runtime optimized for performance
- Nitro v2 preset for Bun deployment target

## Task Management & Development Workflow

### Mandatory Todo Tracking
- **ALWAYS create todos** when working on multi-step coding tasks
- Use the `manage_todo_list` tool to create, track, and complete tasks
- Break down complex work into specific, actionable items
- Mark todos as `in-progress` before starting work, `completed` when finished
- Essential for maintaining task visibility and demonstrating progress

**Todo Usage Rules:**
```
1. Plan tasks by writing todo list with specific, actionable items
2. Mark ONE todo as in-progress before starting work
3. Complete the work for that specific todo
4. Mark that todo as completed IMMEDIATELY
5. Move to next todo and repeat
```

**When to create todos:**
- Complex multi-step implementations
- Feature additions spanning multiple files
- Refactoring tasks with dependencies
- Any work requiring more than one logical step

## Key Conventions

1. **File Naming**: kebab-case for files, PascalCase for components
2. **Import Organization**: Biome auto-organizes imports
3. **Schema Naming**: snake_case for database, camelCase for TypeScript
4. **Error Handling**: Use Result patterns, avoid throwing errors in loaders
5. **Type Safety**: Leverage Drizzle's type inference, avoid manual typing
6. **Task Tracking**: MANDATORY todo creation for all multi-step coding tasks