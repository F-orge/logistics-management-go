## applyTo: 'src/**/*.rs'

# Rust GraphQL API Best Practices: async-graphql & SeaORM

This document outlines the standards and best practices for building high-performance, maintainable, and robust GraphQL APIs in Rust using `async-graphql` and `SeaORM`.

## Core Principles

### 1. Design Philosophy

* **Explicit over implicit**: Be explicit about types, error handling, and data flow. Leverage Rust's type system to prevent runtime errors.
* **Fail fast and gracefully**: All fallible operations (database queries, external API calls) must return a `Result`. Resolvers should propagate errors to the GraphQL response, never panic.
* **Separation of concerns**: Strictly decouple database entities from GraphQL objects. Entities represent the database schema, while GraphQL objects represent the API contract.
* **Performance by design**: Proactively solve performance bottlenecks like the N+1 problem using `DataLoader` where appropriate.

### 2. Naming Conventions

* Use `PascalCase` for all structs, enums, and traits: `UserObject`, `QueryRoot`, `UserLoader`.
* Use `snake_case` for functions, methods, and variables: `get_user_by_id`, `db_connection`.
* Suffix GraphQL objects with `Object`: `UserObject`, `PostObject`. For wrapper objects around a model, a suffix of `Node` is also acceptable (e.g., `DriverNode`).
* Suffix mutation inputs with `Input`: `CreatePostInput`, `UpdateUserInput`.
* Suffix `DataLoader` implementations with `Loader`: `UserLoader`, `PostLoader`.

### 3. Mandatory Requirements

* **Comprehensive Error Handling**: Every resolver that can fail must return an `async_graphql::Result`. Use custom error enums with `thiserror` for clear, specific errors. Avoid using `.unwrap()` or `.expect()` in resolver logic.
* **Decoupled Types**: Never expose `SeaORM` entity models directly in the GraphQL schema. Always define a separate `async_graphql::SimpleObject` or a "Node" wrapper that explicitly defines its GraphQL fields.
* **N+1 Prevention**: Any resolver for a *cacheable, non-parameterized* relation on a list of items *must* use a `DataLoader`. For relations with dynamic arguments (pagination, filtering), direct queries are acceptable but must be documented.
* **Context-Driven State**: All shared state, especially the `DatabaseConnection` and `DataLoader`s, must be managed in the `async-graphql` context, not global statics.

---

## Resolver Structure Best Practices

### 1. Basic Query Resolver

A query resolver fetches a single data entity. It should access the database via the context, handle potential errors, and map the entity model to a GraphQL object.

```rust
// ✅ Good: Clear, handles errors, uses context, and maps types.
use async_graphql::{Context, Object, Result, ID};
use sea_orm::{DatabaseConnection, EntityTrait};
use crate::entities::users;
use crate::graphql::objects::UserObject;

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn user(&self, ctx: &Context<'_>, id: ID) -> Result<Option<UserObject>> {
        // 1. Get database connection from context.
        let db = ctx.data::<DatabaseConnection>()?;
        
        // 2. Safely parse the ID.
        let user_id = id.parse::<i32>()
            .map_err(|_| "Invalid user ID format")?;

        // 3. Fetch data from the database.
        let user_model = users::Entity::find_by_id(user_id)
            .one(db)
            .await?; // The `?` operator propagates DbErr, which async-graphql handles.

        // 4. Map the entity model to the GraphQL object.
        Ok(user_model.map(Into::into))
    }
}
```

### 2. Paginated List Resolver (Top Level)

For fetching a top-level list of resources, it's crucial to support pagination, sorting, and filtering.

**1. Define Input Objects for Sorting and Filtering**

```rust
// in src/graphql/inputs.rs
use async_graphql::{InputObject, Enum};
use crate::entities::_generated::org_departments::Column as DepartmentColumn;

#[derive(Enum, Copy, Clone, Eq, PartialEq)]
pub enum SortOrder { Asc, Desc }

#[derive(Enum, Copy, Clone, Eq, PartialEq)]
pub enum FilterOperator { Equals, Contains, StartsWith, EndsWith }

#[derive(Debug, Clone, InputObject)]
pub struct DepartmentsSort {
    pub column: DepartmentColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct DepartmentFilter {
    pub column: DepartmentColumn,
    pub operator: FilterOperator,
    pub value: String,
}
```

**2. Implement the Top-Level List Resolver**

```rust
// in src/graphql/resolvers/departments_resolver.rs
use sea_orm::{PaginatorTrait, QueryFilter, QueryOrder};
use async_graphql::{Context, Object, Result};
use crate::graphql::nodes::DepartmentsNode;
use crate::entities::_generated::org_departments::{Entity as DepartmentEntity};

#[Object]
impl DepartmentsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<DepartmentsSort>>,
        filter_by: Option<Vec<DepartmentFilter>>,
    ) -> Result<Vec<DepartmentsNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = DepartmentEntity::find();

        // ... apply sorting and filtering logic ...
        
        let departments_page = query
            .paginate(db, limit)
            .fetch_page(page.saturating_sub(1)) // `fetch_page` is 0-indexed
            .await?;

        Ok(departments_page
            .into_iter()
            .map(|model| DepartmentsNode { model })
            .collect())
    }
}
```

---

## Handling Nested Relationships

Real-world objects often have many relationships. A `Department` might have a `manager` (to-one), and multiple `users` (to-many). Resolving these fields efficiently is critical.

### 1. Simple Relations (To-One or Unfiltered To-Many)

For simple relations that don't take arguments, `DataLoader` is the **mandatory** solution to prevent the N+1 problem.

```rust
// ✅ Best Practice: Use DataLoader for simple, cacheable relations.

#[Object]
impl DepartmentsNode {
    async fn id(&self) -> Uuid { self.model.id }
    // ... other primitive fields ...

    // This to-one relation is a perfect use case for DataLoader.
    async fn manager(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<AuthUsersNodes>> {
        let loader = ctx.data::<DataLoader<UserLoader>>()?;
        let manager_model = loader.load_one(self.model.manager_id).await?;
        Ok(manager_model.map(|model| AuthUsersNodes { model }))
    }
}
```

### 2. Parameterized Relations (Paginated/Filtered To-Many)

For nested to-many relations where the client needs to provide arguments (like pagination, sorting, or filtering), the `DataLoader` pattern is no longer suitable because the result is not simply keyed by the parent ID.

In this scenario, the resolver for the relation should accept the arguments directly and perform a targeted database query.

```rust
// ✅ Best Practice: Embed pagination and filtering arguments directly into the nested resolver.

use crate::graphql::backend::org::department_users::{DepartmentUsersNodes, DepartmentUserFilter, DepartmentUsersSort};

#[Object]
impl DepartmentsNode {
    // ... other fields like id, name, manager ...

    /// Fetches a paginated and filterable list of users within this specific department.
    async fn users(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<DepartmentUsersSort>>,
        filter_by: Option<Vec<DepartmentUserFilter>>,
    ) -> async_graphql::Result<Vec<DepartmentUsersNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;
        
        // Start query, but immediately filter by the parent's ID.
        let mut query = DepartmentUserEntity::find()
            .filter(DepartmentUserColumn::DepartmentId.eq(self.model.id));

        // Apply dynamic sorting from arguments
        if let Some(sorts) = sort_by {
            // ... sorting logic ...
        }

        // Apply dynamic filtering from arguments
        if let Some(filters) = filter_by {
            // ... filtering logic ...
        }

        let user_page = query
            .paginate(db, limit)
            .fetch_page(page.saturating_sub(1))
            .await?;

        Ok(user_page
            .into_iter()
            .map(|model| DepartmentUsersNodes { model })
            .collect())
    }
}
```

#### **Heads Up: The N+1 Trade-off** 🚨

This pattern is cleaner from a schema design perspective, but it has a critical performance implication: **it intentionally performs one database query per parent node.**

If you run a query like this:

```graphql
query GetDepartmentUsers {
  departments(limit: 5) { # 1 query
    name
    users(limit: 10) { # 5 queries (one for each department)
      id
    }
  }
}
```

This will result in **6 total database queries**. While this is an N+1 query pattern, it is often an **acceptable trade-off** for the functionality it provides. The alternative—fetching all users for all departments and then paginating in memory—is far less efficient for the database.

**Guideline**: Use this direct query pattern for parameterized nested relations, but be mindful of the performance. Avoid allowing clients to request nested pages on a large number of parent nodes simultaneously. For simple, non-parameterized relations, `DataLoader` remains the required pattern.

---

## Project Integration

### 1. Dependency Setup (`Cargo.toml`)

```toml
[dependencies]
async-graphql = { version = "7.0", features = ["axum", "dataloader", "log"] }
axum = "0.7"
tokio = { version = "1", features = ["full"] }
sea-orm = { version = "0.12", features = [ "sqlx-postgres", "runtime-tokio-rustls", "macros" ] }
serde = { version = "1.0", features = ["derive"] }
thiserror = "1.0"
dotenv = "0.15"
uuid = { version = "1", features = ["v4", "serde"] }
itertools = "0.12"
```

### 2. Web Server Integration (`axum`)

Your `main.rs` is the composition root. It's responsible for setting up the database connection, building the schema with all necessary `DataLoader`s, and launching the web server.

```rust
// src/main.rs
use async_graphql::{http::GraphiQLSource, EmptySubscription, Schema, dataloader::DataLoader};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{extract::Extension, response::{Html, IntoResponse}, routing::get, Router, Server};
use sea_orm::{Database, DatabaseConnection};
use std::{env, sync::Arc};

// ... import your modules and loaders ...
use crate::graphql::{QueryRoot, MutationRoot, loaders::*};

type AppSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

async fn graphql_handler(schema: Extension<AppSchema>, req: GraphQLRequest) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}

async fn graphiql() -> impl IntoResponse {
    Html(GraphiQLSource::build().endpoint("/").finish())
}

#[tokio::main]
async fn main() {
    // ...
    let db_arc = Arc::new(db);

    let schema = Schema::build(QueryRoot, MutationRoot, EmptySubscription)
        .data(db_arc.clone())
        .data(DataLoader::new(UserLoader { db: db_arc.clone() }, tokio::spawn))
        // Note: We don't create a DataLoader for the paginated `users` relation.
        .finish();

    let app = Router::new()
        .route("/", get(graphiql).post(graphql_handler))
        .layer(Extension(schema));

    // ...
    Server::bind(&"0.0.0.0:8000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
```