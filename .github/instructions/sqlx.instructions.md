---
applyTo: '**/*.rs'
---

# SQLx Entity Generation Instruction

This guide describes how to create a Rust module for a database table entity using SQLx and SeaQuery. Follow these steps to ensure consistency and correctness.

## 1. Define Column Enum with SeaQuery

Create a public enum for your table, deriving `sea_query::Iden`. This enum will represent the table and its columns in a type-safe way.

- The enum name should be the PascalCase version of the table name (e.g., `User` for a `user` table).
- Add a `Table` variant.
- Add a variant for each column in PascalCase.
- Use `#[iden(rename = "table_name")]` to specify the actual table name in the database.

**Example (`user.rs`):**
```rust
use sea_query::Iden;

#[derive(Iden)]
#[iden(rename = "user")]
pub enum User {
    Table,
    Id,
    Name,
    Email,
    EmailVerified,
    Image,
    Role,
    Banned,
    BanReason,
    BanExpires,
    CreatedAt,
    UpdatedAt,
}
```

## 2. Create the Main Table Struct

Define a struct that maps directly to the database table's structure.

- Name it `TableNameTable` (e.g., `UserTable`).
- Derive `Clone`, `Debug`, and `sqlx::prelude::FromRow`.
- Add public fields for each column with corresponding Rust types.

**Example (`user.rs`):**
```rust
use chrono::{DateTime, Utc};
use sqlx::prelude::FromRow;
use url::Url;
use uuid::Uuid;

#[derive(Clone, Debug, FromRow)]
pub struct UserTable {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub email_verified: bool,
    pub image: Option<Url>,
    pub role: Option<String>,
    pub banned: bool,
    pub ban_reason: Option<String>,
    pub ban_expires: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
```

## 3. Create Input Structs for Insert and Update Operations

Create separate structs for handling insert and update operations to leverage compile-time validation and type safety.

### Insert Input Struct

- Name it `InsertTableNameInput` (e.g., `InsertUserInput`).
- Derive `Clone`, `Debug`, and `validator::Validate`.
- Add public fields for each column that can be set on insert.
- Use validation attributes (e.g., `#[validate(length(min = 3))]`, `#[validate(email)]`) for input validation.
- Fields that are optional in the database should be of type `Option<T>`.

**Example (`user.rs`):**
```rust
use chrono::{DateTime, Utc};
use url::Url;
use validator::Validate;

#[derive(Clone, Debug, Validate)]
pub struct InsertUserInput {
    #[validate(length(min = 3))]
    pub name: String,
    #[validate(email)]
    pub email: String,
    pub email_verified: bool,
    pub image: Option<Url>,
    pub role: Option<String>,
    pub banned: bool,
    pub ban_reason: Option<String>,
    pub ban_expires: Option<DateTime<Utc>>,
}
```

### Update Input Struct

- Name it `UpdateTableNameInput` (e.g., `UpdateUserInput`).
- Derive `Clone`, `Debug`, and `validator::Validate`.
- All fields should be `Option<T>` or `Option<Option<T>>` to allow for partial updates.
    - Use `Option<T>` for required fields you want to make updatable.
    - Use `Option<Option<T>>` for nullable fields to distinguish between "not provided" (`None`) and "set to null" (`Some(None)`).

**Example (`user.rs`):**
```rust
use chrono::{DateTime, Utc};
use url::Url;
use validator::Validate;

#[derive(Clone, Debug, Validate)]
pub struct UpdateUserInput {
    #[validate(length(min = 3))]
    pub name: Option<String>,
    #[validate(email)]
    pub email: Option<String>,
    pub email_verified: Option<bool>,
    pub image: Option<Option<Url>>,
    pub role: Option<Option<String>>,
    pub banned: Option<bool>,
    pub ban_reason: Option<Option<String>>,
    pub ban_expires: Option<Option<DateTime<Utc>>>,
}
```

## 4. Implement `From` Trait for Query Building

Implement the `From` trait to convert your input structs into `sea-query` statements.

### `From<Insert...>` Implementation

Convert the `InsertTableNameInput` into a `sea_query::InsertStatement`.

- Use `Query::insert()` to start building the query.
- Specify the table with `into_table((Alias::new("schema_name"), YourEnum::Table))`.
- List all columns to be inserted using `.columns([...])`.
- Provide the corresponding values using `.values([...])`. Ensure the order and number of values match the columns.
- Use `.into()` to convert field values to `sea_query::Value`. For `Option` types, this conversion is handled automatically. For complex types like `Url`, you might need to convert them to a primitive type first (e.g., `String`).

**Example (`verification.rs`):**
```rust
use sea_query::{Alias, Query};

impl From<InsertVerificationInput> for sea_query::InsertStatement {
    fn from(value: InsertVerificationInput) -> Self {
        Query::insert()
            .into_table((Alias::new("auth"), Verification::Table))
            .columns([
                Verification::Identifier,
                Verification::Value,
                Verification::ExpiresAt,
            ])
            .values([
                value.identifier.into(),
                value.value.into(),
                value.expires_at.into(),
            ])
            .expect("Failed to convert verification input to sea-query")
            .to_owned()
    }
}
```

### `From<Update...>` Implementation

Convert the `UpdateTableNameInput` into a `sea_query::UpdateStatement`. This implementation should conditionally add values to the update statement only if they are provided (`Some`).

- Use `Query::update()` to start building the query.
- Specify the table with `stmt.table(...)`.
- For each field in the update struct, check if it is `Some`. If it is, add the value to the statement using `stmt.value(YourEnum::ColumnName, value)`.
- For fields of type `Option<Option<T>>`, use `.flatten()` to handle the nested `Option`.

**Example (`user.rs`):**
```rust
use sea_query::{Alias, Query};

impl From<UpdateUserInput> for sea_query::UpdateStatement {
    fn from(value: UpdateUserInput) -> Self {
        let mut stmt = Query::update();
        stmt.table((Alias::new("auth"), User::Table));
        if let Some(name) = value.name {
            stmt.value(User::Name, name);
        }
        if let Some(email) = value.email {
            stmt.value(User::Email, email);
        }
        if let Some(email_verified) = value.email_verified {
            stmt.value(User::EmailVerified, email_verified);
        }
        if let Some(image) = value.image.flatten() {
            stmt.value(User::Image, image.to_string());
        }
        if let Some(role) = value.role.flatten() {
            stmt.value(User::Role, role);
        }
        if let Some(banned) = value.banned {
            stmt.value(User::Banned, banned);
        }
        if let Some(ban_reason) = value.ban_reason.flatten() {
            stmt.value(User::BanReason, ban_reason);
        }
        if let Some(ban_expires) = value.ban_expires.flatten() {
            stmt.value(User::BanExpires, ban_expires);
        }
        stmt.to_owned()
    }
}
```

## 5. Conventions
- Use PascalCase for enums and structs.
- Use snake_case for field names.
- Keep all entity modules in the `src/entities` directory.
- Always add validation to input structs.

---

**Reference:** See `user.rs`, `account.rs`, `session.rs`, and `verification.rs` for complete examples.
---
