# GraphQL Service Operations Instructions

## Overview

This document provides detailed instructions for creating GraphQL services in the logistics management system. The architecture follows a modular approach where each domain (CRM, IMS, TMS, WMS, DMS, Billing, Auth) is implemented as a separate Rust crate under the `services/` directory.

## Service Architecture

### Directory Structure

Each GraphQL service follows this standard structure:

```
services/graphql-{domain}/
├── Cargo.toml
└── src/
    ├── lib.rs           # Main library entry point with MergedObject definitions
    ├── models/          # GraphQL models with data loaders
    │   ├── mod.rs
    │   ├── prelude.rs
    │   └── {entity}.rs  # GraphQL models with relationships
    ├── query/           # Query resolvers
    │   ├── mod.rs
    │   └── {entity}.rs  # Entity query operations
    ├── mutation/        # Mutation resolvers
    │   ├── mod.rs
    │   └── {entity}.rs  # Entity mutation operations
    └── subscription/    # Subscription resolvers (optional)
        └── mod.rs
```

## Implementation Guide

### 1. Create Service Crate

#### 1.1 Cargo.toml Configuration

Create `services/graphql-{domain}/Cargo.toml`:

```toml
[package]
name = "graphql-{domain}"
version.workspace = true
edition.workspace = true
authors.workspace = true

[dependencies]
sqlx.workspace = true
async-graphql.workspace = true
tracing.workspace = true
uuid.workspace = true
serde.workspace = true
chrono.workspace = true
url.workspace = true
anyhow.workspace = true
validator.workspace = true
graphql-auth = { path = "../graphql-auth" }
graphql-core = { path = "../graphql-core" }
rust_decimal.workspace = true
fake.workspace = true

[dev-dependencies]
rstest.workspace = true
```

#### 1.2 Library Entry Point (lib.rs)

Create `src/lib.rs` with the main service structure:

```rust
use async_graphql::MergedObject;

pub mod models;
pub mod mutation;
pub mod query;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "{Domain}Queries")]
pub struct Query(
    query::{entity1}::Query,
    query::{entity2}::Query,
    // Add all entity queries here
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "{Domain}Mutations")]
pub struct Mutation(
    mutation::{entity1}::Mutation,
    mutation::{entity2}::Mutation,
    // Add all entity mutations here
);
```

### 2. Models Implementation

#### 2.1 GraphQL Models with Data Loading

Create `src/models/{entity}.rs`:

```rust
use std::sync::Arc;

use async_graphql::{
    ComplexObject, Context, SimpleObject,
    dataloader::{DataLoader, Loader},
};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow)]
#[graphql(name = "{Domain}{Entity}", complex)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    // Add all entity fields here
    #[graphql(skip)]
    pub owner_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<user::Model>> {
        let loader = ctx.data::<DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.owner_id {
            Ok(loader.load_one(user::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    // Add relationship resolvers here
    async fn related_entity(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<RelatedModel>> {
        let loader = ctx.data::<DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.related_entity_id {
            Ok(loader.load_one(RelatedModel::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }
}

impl Loader<PrimaryKey> for PostgresDataLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Model;

    async fn load(
        &self,
        keys: &[PrimaryKey],
    ) -> Result<std::collections::HashMap<PrimaryKey, Self::Value>, Self::Error> {
        let keys = keys.iter().map(|k| k.0).collect::<Vec<_>>();

        let results =
            sqlx::query_as::<_, Self::Value>("select * from {schema}.{table} where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
```

#### 2.2 Models Module Declaration

Create `src/models/mod.rs`:

```rust
pub mod prelude;

pub mod {entity1};
pub mod {entity2};
// Add all entity modules here
```

### 3. Query Implementation

#### 3.1 Entity Query Resolvers

Create `src/query/{entity}.rs`:

```rust
use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{entity};

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "{Domain}{Entity}Query")]
impl Query {
    async fn {entities}(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<{entity}::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, {entity}::Model>(
                "select * from {schema}.{table} limit $1 offset $2"
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn {entity}(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<{entity}::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, {entity}::Model>(
                "select * from {schema}.{table} where id = $1"
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }

    // Add specialized query methods as needed
    async fn {entities}_by_owner(
        &self,
        ctx: &Context<'_>,
        owner_id: Uuid,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<{entity}::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, {entity}::Model>(
                "select * from {schema}.{table} where owner_id = $1 limit $2 offset $3"
            )
            .bind(owner_id)
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }
}
```

#### 3.2 Query Module Declaration

Create `src/query/mod.rs`:

```rust
pub mod {entity1};
pub mod {entity2};
// Add all entity query modules here
```

### 4. Mutation Implementation

#### 4.1 Entity Mutation Resolvers

Create `src/mutation/{entity}.rs`:

```rust
use async_graphql::{Context, InputObject, Object};
use rust_decimal::Decimal;
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{entity};

#[derive(Debug, Clone, InputObject)]
pub struct Create{Entity}Input {
    pub name: String,
    // Add all required fields for creation
    pub owner_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "{Domain}{Entity}Mutations")]
impl Mutation {
    async fn create_{entity}(
        &self,
        ctx: &Context<'_>,
        payload: Create{Entity}Input,
    ) -> async_graphql::Result<{entity}::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, {entity}::Model>(
            "insert into {schema}.{table} (name, owner_id) values ($1, $2) returning *"
        )
        .bind(payload.name)
        .bind(payload.owner_id)
        .fetch_one(db)
        .await?)
    }

    // Generate individual field update methods
    async fn update_{entity}_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<{entity}::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, {entity}::Model>(
            "update {schema}.{table} set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    // Continue with update methods for each field
    async fn update_{entity}_{field}(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        {field}: Option<FieldType>,
    ) -> async_graphql::Result<{entity}::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, {entity}::Model>(
            "update {schema}.{table} set {field} = $1 where id = $2 returning *",
        )
        .bind({field})
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_{entity}(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<PgPool>()?;
        let result = sqlx::query("delete from {schema}.{table} where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete {entity}"));
        }
        Ok("{Entity} removed successfully".into())
    }
}
```

#### 4.2 Mutation Module Declaration

Create `src/mutation/mod.rs`:

```rust
pub mod {entity1};
pub mod {entity2};
// Add all entity mutation modules here
```

### 5. Database Integration and Input Types

#### 5.1 Input Types for Mutations

Create input types directly in your mutation files or in separate input modules:

Create input types for your mutations:

```rust
use async_graphql::InputObject;
use fake::Dummy;
use fake::faker::{
    // Import relevant fake data generators
    name::raw::Name,
    internet::raw::SafeEmail,
};
use fake::locales::EN;
use rust_decimal::Decimal;
use uuid::Uuid;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct Create{Entity}Input {
    #[dummy(faker = "Name(EN)")]
    pub name: String,
    
    // Add all fields with appropriate fake data generators
    #[dummy(faker = "SafeEmail(EN)")]
    pub email: Option<String>,

    pub owner_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct Update{Entity}Input {
    pub name: Option<String>,
    
    // Use Option<Option<T>> for nullable fields that can be set to null
    pub email: Option<Option<String>>,
    
    pub owner_id: Option<Option<Uuid>>,
}
```

#### 5.2 Database Schema Patterns#### 5.2 Entity Module Declaration

Create `src/entities/mod.rs`:

```rust
pub mod _generated;

pub mod {entity1};
pub mod {entity2};
// Add all entity modules here
```

### 6. Service Integration

#### 6.1 Add to Main Application

In the main `src/lib.rs`, add your new service:

```rust
#[derive(Debug, SimpleObject, Default)]
pub struct Query {
    auth: graphql_auth::Query,
    #[graphql(guard = RequireSession)]
    crm: graphql_crm::Query,
    #[graphql(guard = RequireSession)]
    {your_domain}: graphql_{your_domain}::Query,
}

#[derive(Debug, SimpleObject, Default)]
pub struct Mutations {
    auth: graphql_auth::Mutation,
    #[graphql(guard = RequireSession)]
    crm: graphql_crm::Mutation,
    #[graphql(guard = RequireSession)]
    {your_domain}: graphql_{your_domain}::Mutation,
}
```

#### 6.2 Add Dependency

In the main `Cargo.toml`, add:

```toml
[dependencies]
# ... existing dependencies ...
graphql-{your_domain} = { path = "./services/graphql-{your_domain}" }
```

### 7. Key Patterns and Best Practices

### 1. Data Loading Strategy

- Use `async_graphql::dataloader::DataLoader` with `PostgresDataLoader` for efficient N+1 query prevention
- Implement `Loader` trait for each model's `PrimaryKey`
- Load related entities using data loaders in `ComplexObject` implementations

### 2. Error Handling

- Use `async_graphql::Result<T>` for all resolver return types
- Leverage `?` operator for automatic error propagation
- Use meaningful error messages for user-facing errors

### 3. Security and Authorization

- Apply `RequireSession` guard to protect endpoints that require authentication
- Use context data to access user session information
- Validate user permissions within resolvers when needed

### 4. Database Operations

- Use raw SQL queries with `sqlx::query_as::<_, Model>` for type safety
- Follow the schema naming pattern: `{domain}.{table}`
- Always use UUIDs for primary keys
- Include `created_at` and `updated_at` timestamps
- Use `sqlx::query_as!` macro when possible for compile-time query validation

### 5. Input Validation

- Use `validator` crate attributes on input types
- Implement custom validation logic in resolvers when needed
- Provide clear validation error messages

### 6. Testing Strategy

- Use `rstest` for parameterized tests
- Create test fixtures with `fake` crate
- Test both success and error scenarios
- Mock database interactions for unit tests

### 8. Code Generation and Database Operations

- Focus on SQLX-based implementations for direct database queries
- Use `sqlx::query_as!` macro for compile-time query validation when possible
- Keep database schema migrations organized and versioned
- Use database views for complex query operations when needed

### 9. GraphQL Schema Design

- Use descriptive names for GraphQL types: `{Domain}{Entity}`
- Group related operations under domain-specific query/mutation objects
- Use `MergedObject` to compose service-level schemas
- Provide pagination for list queries (page, limit parameters)

### 10. Migration and Database Schema

When creating new services, ensure your database migrations follow the established patterns:

```sql
-- migrations/{timestamp}_{domain}.up.sql
CREATE SCHEMA IF NOT EXISTS {domain};

CREATE TABLE {domain}.{table} (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    -- Add your fields here
    owner_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes and triggers as needed
CREATE INDEX idx_{table}_owner_id ON {domain}.{table}(owner_id);
```

### 11. Code Review Checklist

- [ ] Service follows the established directory structure
- [ ] All entities have proper GraphQL models with data loaders
- [ ] Query and mutation resolvers are properly implemented
- [ ] Input types include fake data generators for testing
- [ ] Error handling is consistent across all resolvers
- [ ] Security guards are applied where appropriate
- [ ] Database queries use the correct schema naming
- [ ] All dependencies are properly declared
- [ ] Tests cover both success and error scenarios

This architecture ensures consistency, maintainability, and scalability across all GraphQL services in the logistics management system.