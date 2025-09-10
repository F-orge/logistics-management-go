use chrono::{DateTime, Utc};
use sea_query::Iden;
use sea_query::{Alias, Query};
use sqlx::prelude::FromRow;
use uuid::Uuid;

#[derive(Iden)]
#[iden(rename = "verification")]
pub enum Verification {
    Table,
    Id,
    Identifier,
    Value,
    ExpiresAt,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct VerificationTable {
    pub id: Uuid,
    pub identifier: String,
    pub value: String,
    pub expires_at: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

use validator::Validate;

#[derive(Clone, Debug, Validate)]
pub struct InsertVerificationInput {
    #[validate(length(min = 1))]
    pub identifier: String,
    #[validate(length(min = 1))]
    pub value: String,
    pub expires_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateVerificationInput {
    #[validate(length(min = 1))]
    pub identifier: Option<String>,
    #[validate(length(min = 1))]
    pub value: Option<String>,
    pub expires_at: Option<DateTime<Utc>>,
}

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

impl From<UpdateVerificationInput> for sea_query::UpdateStatement {
    fn from(value: UpdateVerificationInput) -> Self {
        let mut stmt = Query::update();
        stmt.table((Alias::new("auth"), Verification::Table));
        if let Some(identifier) = value.identifier {
            stmt.value(Verification::Identifier, identifier);
        }
        if let Some(val) = value.value {
            stmt.value(Verification::Value, val);
        }
        if let Some(expires_at) = value.expires_at {
            stmt.value(Verification::ExpiresAt, expires_at);
        }
        stmt.to_owned()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::Utc;
    use rstest::{fixture, rstest};
    use sea_query::{Expr, InsertStatement, PostgresQueryBuilder, UpdateStatement};
    use sqlx::{Executor, PgPool};

    #[fixture]
    fn dummy_verification() -> InsertVerificationInput {
        InsertVerificationInput {
            identifier: "dummy@email.com".to_string(),
            value: "dummytoken".to_string(),
            expires_at: Utc::now() + chrono::Duration::hours(1),
        }
    }

    #[rstest]
    #[case::basic(InsertVerificationInput {
        identifier: "user@email.com".to_string(),
        value: "token123".to_string(),
        expires_at: Utc::now() + chrono::Duration::hours(1),
    }, true)]
    #[case::minimal(InsertVerificationInput {
        identifier: "a".to_string(),
        value: "b".to_string(),
        expires_at: Utc::now() + chrono::Duration::minutes(5),
    }, true)]
    #[case::empty_identifier(InsertVerificationInput {
        identifier: "".to_string(),
        value: "token123".to_string(),
        expires_at: Utc::now() + chrono::Duration::hours(1),
    }, false)]
    #[case::empty_value(InsertVerificationInput {
        identifier: "user@email.com".to_string(),
        value: "".to_string(),
        expires_at: Utc::now() + chrono::Duration::hours(1),
    }, false)]
    #[case::expired_token(InsertVerificationInput {
        identifier: "expired@email.com".to_string(),
        value: "expiredtoken".to_string(),
        expires_at: Utc::now() - chrono::Duration::hours(1),
    }, true)]
    #[case::long_value(InsertVerificationInput {
        identifier: "long@email.com".to_string(),
        value: "a".repeat(256),
        expires_at: Utc::now() + chrono::Duration::hours(1),
    }, true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_insert_verification(
        #[case] input: InsertVerificationInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        if input.validate().is_ok() == success {
            return Ok(());
        }
        let sql = InsertStatement::from(input).to_string(PostgresQueryBuilder);
        let result = pool.execute(&*sql).await;
        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());
        Ok(())
    }

    #[rstest]
    #[case::basic(UpdateVerificationInput {
        identifier: Some("user@email.com".to_string()),
        value: Some("token456".to_string()),
        expires_at: Some(Utc::now() + chrono::Duration::hours(2)),
    }, true)]
    #[case::minimal(UpdateVerificationInput {
        identifier: Some("a".to_string()),
        value: Some("b".to_string()),
        expires_at: Some(Utc::now() + chrono::Duration::minutes(5)),
    }, true)]
    #[case::nulls(UpdateVerificationInput {
        identifier: None,
        value: None,
        expires_at: None,
    }, true)]
    #[case::empty_identifier(UpdateVerificationInput {
        identifier: Some("".to_string()),
        value: Some("token456".to_string()),
        expires_at: Some(Utc::now() + chrono::Duration::hours(2)),
    }, false)]
    #[case::empty_value(UpdateVerificationInput {
        identifier: Some("user@email.com".to_string()),
        value: Some("".to_string()),
        expires_at: Some(Utc::now() + chrono::Duration::hours(2)),
    }, false)]
    #[case::expired_token(UpdateVerificationInput {
        identifier: Some("expired@email.com".to_string()),
        value: Some("expiredtoken".to_string()),
        expires_at: Some(Utc::now() - chrono::Duration::hours(1)),
    }, true)]
    #[case::long_value(UpdateVerificationInput {
        identifier: Some("long@email.com".to_string()),
        value: Some("a".repeat(256)),
        expires_at: Some(Utc::now() + chrono::Duration::hours(1)),
    }, true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_update_verification(
        dummy_verification: InsertVerificationInput,
        #[case] input: UpdateVerificationInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        if input.validate().is_ok() == success {
            return Ok(());
        }

        let insert_sql = InsertStatement::from(dummy_verification)
            .returning(Query::returning().column(Verification::Id))
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&insert_sql)
            .fetch_one(&pool)
            .await?;

        let mut stmt: UpdateStatement = input.into();
        let sql = stmt
            .and_where(Expr::col(Verification::Id).eq(id))
            .to_string(PostgresQueryBuilder);
        let result = pool.execute(&*sql).await;
        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());
        Ok(())
    }
}
