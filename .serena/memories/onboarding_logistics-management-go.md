
# Project Onboarding: logistics-management-system

*   **Project Name:** logistics-management-system
*   **Package Manager:** bun
*   **Workspaces:** `packages/*`, `apps/*`
*   **Monorepo Tool:** Turbo
*   **CI/CD:** `justfile` for commands, Docker for containerization.
*   **Structure:**
    *   `apps/backend`: Node.js backend with a `src` directory containing `api`, `auth`, `emails`, `seeds`.
    *   `apps/frontend`: Frontend application with a `src` directory containing `components`, `lib`, `routes`, `styles`.
    *   `packages/db`: Shared database package.
    *   `packages/graphql`: Shared GraphQL package.
    *   `packages/ui`: Shared UI components package.
*   **Commands:**
    *   `bun dev`: Starts the development server for both backend and frontend.
    *   `bun build`: Builds the entire project.
    *   `bun check`: Runs biome to check and fix code.
    *   `just introspect`: Generates database types using `kysely-codegen`.
*   **Database:** The project uses `kysely` as a query builder, as seen in the `introspect` command. Migrations are located in `apps/backend/migrations`.
*   **Styling:** The presence of `packages/ui` suggests a shared component library, likely using a framework like React.
*   **Linting/Formatting:** Biome is used for linting and formatting.
*   **GraphQL:** The project uses GraphQL, with configuration in `graphql.config.yml` and a dedicated package in `packages/graphql`.
