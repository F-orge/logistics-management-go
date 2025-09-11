
# SQLx Test Instructions

This guide provides instructions on how to write integration tests for database operations using `sqlx::test` in combination with `rstest`. This pattern is used across the project to ensure that database queries and entity logic work as expected.

## 1. Overview

We use `sqlx::test` to run functions as integration tests against a real database. This macro handles:
-   Creating a test database.
-   Running migrations to set up the schema.
-   Providing a connection pool (`PgPool`) to the test function.
-   Cleaning up the database after the test.

We use `rstest` to:
-   Create fixtures for test data.
-   Create parameterized tests to cover multiple scenarios efficiently.

## 2. Setting up a Test Function

To create a database integration test, you need to annotate your test function with `#[sqlx::test]`.

-   **`migrations`**: You must specify the path to the migrations directory. The path is relative to the crate root. For services under `services/`, this is typically `../../migrations`.
-   **`PgPool`**: `sqlx::test` automatically provides a `PgPool` instance as an argument to your test function.

When combining with `rstest`, you need to tell `rstest` to ignore the `PgPool` argument, as it's managed by `sqlx::test`. This is done using `#[ignore]`.

**Basic Structure:**
```rust
#[cfg(test)]
mod tests {
    use sqlx::PgPool;
    use rstest::rstest;

    #[rstest]
    #[sqlx::test(migrations = "../../migrations")]
    async fn my_test(#[ignore] pool: PgPool) -> anyhow::Result<()> {
        // Test logic here
        Ok(())
    }
}
```

## 3. Using Fixtures for Test Data

Use `rstest` fixtures to create reusable test data. This keeps your tests clean and focused.

**Example (`user.rs`):**
A fixture to create an `InsertStatement` for a dummy user. This can be used in other tests that require a user to exist.
```rust
use rstest::fixture;
use sea_query::{InsertStatement, Query};
use crate::entities::user::{InsertUserInput, User};

#[fixture]
fn dummy_user() -> InsertStatement {
    InsertStatement::from(InsertUserInput {
        name: "john doe".into(),
        email: "johndoe@email.com".into(),
        email_verified: false,
        image: None,
        role: None,
        banned: false,
        ban_reason: None,
        ban_expires: None,
    })
    .returning(Query::returning().column(User::Id))
    .to_owned()
}
```

## 4. Parameterized Tests with `#[case]`

Use `#[rstest]` with `#[case]` to test multiple scenarios for a single function. This is especially useful for testing validation and edge cases for insert and update operations.

-   Define cases with different inputs.
-   Add a `success: bool` parameter to indicate whether the operation should succeed or fail.

**Example (`verification.rs`):**
Testing `InsertVerificationInput` with various inputs.
```rust
#[rstest]
#[case::basic(InsertVerificationInput {
    identifier: "user@email.com".to_string(),
    value: "token123".to_string(),
    expires_at: Utc::now() + chrono::Duration::hours(1),
}, true)]
#[case::empty_identifier(InsertVerificationInput {
    identifier: "".to_string(),
    value: "token123".to_string(),
    expires_at: Utc::now() + chrono::Duration::hours(1),
}, false)]
#[sqlx::test(migrations = "../../migrations")]
async fn test_insert_verification(
    #[case] input: InsertVerificationInput,
    #[case] success: bool,
    #[ignore] pool: PgPool,
) -> anyhow::Result<()> {
    // First, check validation logic
    if input.validate().is_ok() != success {
        // If validation behaves as expected for this case, no need to hit the DB.
        // Or, if it fails validation when it should, the test for that case is done.
        return Ok(());
    }

    // If validation passes, test the database operation
    let sql = InsertStatement::from(input).to_string(PostgresQueryBuilder);
    let result = pool.execute(&*sql).await;

    assert_eq!(result.is_ok(), success, "DB operation failed: {}", result.unwrap_err());

    Ok(())
}
```

## 5. Testing Insert Operations

When testing an insert operation that depends on another entity (e.g., a `Company` needs an `Owner`), follow this pattern:

1.  Use a fixture to get an insert statement for the dependency (e.g., `dummy_owner`).
2.  Execute the dependency insert statement and fetch its generated ID.
3.  Set the foreign key field on your main input struct.
4.  Execute and assert the main insert operation.

**Example (`companies.rs`):**
```rust
#[sqlx::test(migrations = "../../migrations")]
async fn test_insert_companies(
    dummy_owner: InsertStatement, // Fixture for owner
    #[case] mut input: InsertCompaniesInput,
    #[case] success: bool,
    #[ignore] pool: PgPool,
) -> anyhow::Result<()> {
    // 1. Create the owner and get its ID
    let (user_id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_owner.to_string(PostgresQueryBuilder))
        .fetch_one(&pool)
        .await?;

    // 2. Set the owner_id for the company
    input.owner_id = user_id;

    if input.validate().is_ok() != success {
        return Ok(());
    }

    // 3. Perform the company insertion
    let sql = InsertStatement::from(input).to_string(PostgresQueryBuilder);
    let result = pool.execute(&*sql).await;

    assert_eq!(result.is_ok(), success, "Insert failed: {}", result.unwrap_err());

    Ok(())
}
```

## 6. Testing Update Operations

For update tests:

1.  Insert a dummy record to update.
2.  Fetch its ID.
3.  Construct an `UpdateStatement` from your `Update...Input` struct.
4.  Add a `WHERE` clause to the statement to target the dummy record by its ID.
5.  Execute the update and assert the result.

**Example (`session.rs`):**
```rust
#[sqlx::test(migrations = "../../migrations")]
async fn test_update_session(
    dummy_user: &InsertStatement,
    mut dummy_session: InsertSessionInput,
    #[case] input: UpdateSessionInput,
    #[case] success: bool,
    #[ignore] pool: PgPool,
) -> anyhow::Result<()> {
    // Create a user for the session
    let (user_id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_user.to_string(PostgresQueryBuilder))
        .fetch_one(&pool)
        .await?;
    dummy_session.user_id = user_id;

    // 1. Insert a dummy session to be updated
    let insert_sql = InsertStatement::from(dummy_session)
        .returning(Query::returning().column(Session::Id))
        .to_string(PostgresQueryBuilder);
    let (id,) = sqlx::query_as::<_, (Uuid,)>(&insert_sql)
        .fetch_one(&pool)
        .await?;

    if input.validate().is_ok() != success {
        return Ok(());
    }

    // 2. Create the update statement and add a WHERE clause
    let mut stmt: UpdateStatement = input.into();
    let sql = stmt
        .and_where(sea_query::Expr::col(Session::Id).eq(id))
        .to_string(PostgresQueryBuilder);

    // 3. Execute and assert
    let result = pool.execute(&*sql).await;
    assert_eq!(result.is_ok(), success, "Update failed: {}", result.unwrap_err());

    Ok(())
}
```
