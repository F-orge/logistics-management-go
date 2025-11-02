# Development Guidelines

This document provides a set of guidelines and best practices for developing and maintaining the project. Please read and follow these guidelines to ensure consistency, quality, and maintainability of the codebase.

## Table of Contents

- [TypeScript](#typescript)
- [GraphQL](#graphql)
- [PostgreSQL](#postgresql)

---

## TypeScript

This section outlines the best practices and coding standards for writing TypeScript code in this project.

### Compiler Configuration and Strictness

- **Enable Strict Mode (`"strict": true`)**: This is the most fundamental best practice. Enabling `"strict": true` in your `tsconfig.json` activates a suite of strict type-checking options.
- **Keep `tsconfig.json` up-to-date**: Regularly review and update your `tsconfig.json` to benefit from new strictness checks and compiler features.

### Type Usage and Definition

- **Avoid `any` whenever possible**: Using `any` disables TypeScript's type checking. Use specific types, union types, or `unknown`.
- **Prefer `unknown` over `any`**: When you don't know the type of a value, `unknown` is a safer alternative to `any`.
- **Use Type Inference where appropriate**: Let TypeScript infer types when they are obvious from the assignment.
- **Use Explicit Type Annotations for Public APIs and Function Signatures**: For function parameters, return types, and object literals, explicit types improve maintainability and self-documentation.
- **Interfaces vs. Type Aliases**:
    - **Interfaces**: Prefer interfaces for defining the shape of objects.
    - **Type Aliases**: Use type aliases for unions, intersections, primitive types, tuples, or when you need to define a type that is not an object shape.
- **Use Utility Types**: Leverage TypeScript's built-in utility types (e.g., `Partial`, `Readonly`, `Pick`, `Omit`).

### Code Structure and Organization

- **Consistent File Naming Conventions**: Adopt consistent naming patterns for files and directories.
- **Modularization**: Break your code into small, focused modules or components.
- **Use Barrel Files (`index.ts`)**: Barrel files act as single entry points for module exports, making import statements cleaner.

### Coding Style and Practices

- **Don't use `var`**: Always use `let` or `const` instead of `var`.
- **Use Access Modifiers**: Leverage `public`, `private`, and `protected` access modifiers for class members.
- **Keep Functions Pure and Concise**: Write pure functions (functions without side effects) to prevent unpredictable behavior and simplify testing.

### Tooling and Automation

- **Use a Linter (e.g., ESLint with TypeScript plugin)**: A linter enforces consistent coding styles and identifies potential issues.
- **Use a Code Formatter (e.g., Prettier)**: A formatter automatically formats your code to a consistent style.
- **Integrate Linting and Type Checking into CI/CD**: Run ESLint with TypeScript rules and `tsc --noEmit` in your build pipeline.

---

## GraphQL

This section provides guidelines for designing and implementing the GraphQL schema and resolvers.

### Schema Design

- **Design with the UI in mind**: Design the schema based on how data will be used by clients, not just how it's stored in the database.
- **Use specific types for special data**: Use specific types for special data like dates or IDs.
- **Plan for future schema changes**: Invest in the schema design and adding output/input object types where future fields might be added to avoid breaking changes.
- **Avoid API versioning**: Utilize new data types, queries, or mutations, and use deprecation fields to indicate when fields will be removed.

### Naming Conventions

- **Be consistent and symmetric**: Use the same logic and terms throughout the schema.
- **Use `camelCase` for field names, argument names, and directive names**.
- **Use `PascalCase` for types**.
- **Use `SCREAMING_SNAKE_CASE` for enum values**.
- **Start mutation fields with a verb** (e.g., `create`, `update`, `delete`).
- **Use the suffix `Input` when naming input types**.

### Querying and Mutations

- **Name all operations**: Name all queries and mutations to clarify their purpose.
- **Use GraphQL variables**: Use variables to provide arguments, making queries more reusable.
- **Only request the data you need**: Only request the data you need to avoid over-fetching.
- **Use input object types for mutations**: Use input object types for mutations to simplify the structure of GraphQL documents.
- **Return affected objects as a result of mutations**.

### Performance

- **Avoid over-fetching**: Allow clients to specify only the fields they need.
- **Use batched queries with DataLoader**: Use DataLoader to solve the N+1 problem.
- **Implement caching**: Implement caching at various levels (client-side, server-side, edge cache).
- **Implement query complexity analysis, depth limiting, and rate limiting**.

### Security

- **Implement robust authentication and authorization**.
- **Validate and sanitize all inputs**.
- **Turn off introspection in production**.
- **Hide detailed error information in production**.

### Error Handling

- **Provide clear, meaningful, and specific error messages**.
- **Use custom error types and error extensions**.
- **Handle errors gracefully in resolvers**.

---

## PostgreSQL

This section covers the best practices for working with the PostgreSQL database, including schema design (DDL) and query building with Kysely.

### DDL (Data Definition Language)

When defining the database schema, follow these best practices:

- **Naming Conventions**: Use `snake_case` for all identifiers (tables, columns, etc.).
- **Data Types**: Choose the most appropriate data type for each column to optimize for storage and performance.
- **Primary Keys**: Every table must have a primary key. Use `BIGSERIAL` for auto-incrementing integers or `UUID` for unique identifiers.
- **Foreign Keys**: Define foreign key relationships to maintain referential integrity.
- **Constraints**: Use `NOT NULL`, `UNIQUE`, and `CHECK` constraints to enforce data integrity at the database level.
- **Indexing**: Create indexes on columns frequently used in `WHERE` clauses, `JOIN` conditions, and `ORDER BY` clauses to improve query performance.

### Kysely

When using Kysely as the query builder, follow these best practices:

- **Type Safety**: Define your database schema using TypeScript interfaces to ensure type-safe queries.
- **Reusable Query Builders**: Create reusable and composable query builders to keep your code DRY.
- **Error Handling**: Use `try-catch` blocks to handle database errors gracefully.
- **Transactions**: Use transactions for atomic operations to ensure data consistency.
- **Performance**: Select only the columns you need, use appropriate indexes, and implement pagination for large result sets.

---

## AI Integration

To streamline development and improve productivity, we leverage AI assistants with the following tools:

- **Postgres MCP**: For database-related tasks, use the Postgres MCP server. This allows the AI assistant to interact with the PostgreSQL database, analyze performance, and suggest optimizations.
- **Serena MCP**: For TypeScript coding, use the Serena MCP server. This provides the AI assistant with semantic code retrieval and editing capabilities, enabling it to understand and modify the codebase at a symbolic level.
