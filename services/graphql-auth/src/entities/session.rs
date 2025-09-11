use sea_query::Iden;

use chrono::{DateTime, Utc};
use sqlx::prelude::FromRow;
use uuid::Uuid;

use sea_query::{Alias, Query};
use validator::Validate;

#[derive(Clone, Debug, FromRow)]
pub struct SessionTable {
    pub id: Uuid,
    pub expires_at: DateTime<Utc>,
    pub token: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub ip_address: Option<String>,
    pub user_agent: Option<String>,
    pub user_id: Uuid,
    pub impersonated_by: Option<Uuid>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertSessionInput {
    pub expires_at: DateTime<Utc>,
    #[validate(length(min = 1))]
    pub token: String,
    pub ip_address: Option<String>,
    pub user_agent: Option<String>,
    pub user_id: Uuid,
    pub impersonated_by: Option<Uuid>,
}

impl From<InsertSessionInput> for sea_query::InsertStatement {
    fn from(value: InsertSessionInput) -> Self {
        Query::insert()
            .into_table((Alias::new("auth"), Session::Table))
            .columns([
                Session::ExpiresAt,
                Session::Token,
                Session::IpAddress,
                Session::UserAgent,
                Session::UserId,
                Session::ImpersonatedBy,
            ])
            .values([
                value.expires_at.into(),
                value.token.into(),
                value.ip_address.into(),
                value.user_agent.into(),
                value.user_id.into(),
                value.impersonated_by.into(),
            ])
            .expect("Failed to convert session input to sea-query")
            .to_owned()
    }
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateSessionInput {
    pub expires_at: Option<DateTime<Utc>>,
    #[validate(length(min = 1))]
    pub token: Option<String>,
    pub ip_address: Option<Option<String>>,
    pub user_agent: Option<Option<String>>,
    pub user_id: Option<Uuid>,
    pub impersonated_by: Option<Option<Uuid>>,
}

impl From<UpdateSessionInput> for sea_query::UpdateStatement {
    fn from(value: UpdateSessionInput) -> Self {
        let mut stmt = Query::update();
        stmt.table((Alias::new("auth"), Session::Table));
        if let Some(expires_at) = value.expires_at {
            stmt.value(Session::ExpiresAt, expires_at);
        }
        if let Some(token) = value.token {
            stmt.value(Session::Token, token);
        }
        if let Some(ip_address) = value.ip_address.flatten() {
            stmt.value(Session::IpAddress, ip_address);
        }
        if let Some(user_agent) = value.user_agent.flatten() {
            stmt.value(Session::UserAgent, user_agent);
        }
        if let Some(user_id) = value.user_id {
            stmt.value(Session::UserId, user_id);
        }
        if let Some(impersonated_by) = value.impersonated_by.flatten() {
            stmt.value(Session::ImpersonatedBy, impersonated_by);
        }
        stmt.to_owned()
    }
}

#[derive(Iden)]
#[iden(rename = "session")]
pub enum Session {
    Table,
    Id,
    ExpiresAt,
    Token,
    CreatedAt,
    UpdatedAt,
    IpAddress,
    UserAgent,
    UserId,
    ImpersonatedBy,
}

#[cfg(test)]
mod tests {
    use crate::entities::user::{InsertUserInput, User};

    use super::*;
    use chrono::Utc;
    use rstest::rstest;
    use sea_query::{InsertStatement, PostgresQueryBuilder, Query, UpdateStatement};
    use sqlx::{Executor, PgPool};
    use uuid::Uuid;

    use crate::utils::{dummy_session, dummy_user};

    #[rstest]
    #[case::basic(InsertSessionInput {
        expires_at: Utc::now(),
        token: "sessiontoken123".to_string(),
        ip_address: Some("127.0.0.1".to_string()),
        user_agent: Some("Mozilla/5.0".to_string()),
        user_id: Uuid::new_v4(),
        impersonated_by: None,
    }, true)]
    #[case::invalid_token(InsertSessionInput {
        expires_at: Utc::now(),
        token: "".to_string(),
        ip_address: None,
        user_agent: None,
        user_id: Uuid::new_v4(),
        impersonated_by: None,
    }, false)]
    #[case::null_optionals(InsertSessionInput {
        expires_at: Utc::now(),
        token: "tokennullopt".to_string(),
        ip_address: None,
        user_agent: None,
        user_id: Uuid::new_v4(),
        impersonated_by: None,
    }, true)]
    #[case::long_token(InsertSessionInput {
        expires_at: Utc::now(),
        token: "a".repeat(256),
        ip_address: Some("10.0.0.1".to_string()),
        user_agent: Some("TestAgent/1.0".to_string()),
        user_id: Uuid::new_v4(),
        impersonated_by: None,
    }, true)]
    #[case::impersonated(InsertSessionInput {
        expires_at: Utc::now(),
        token: "impersonatedtoken".to_string(),
        ip_address: Some("192.168.0.1".to_string()),
        user_agent: Some("Impersonator/2.0".to_string()),
        user_id: Uuid::new_v4(),
        impersonated_by: Some(Uuid::new_v4()),
    }, true)]
    #[case::expired(InsertSessionInput {
        expires_at: Utc::now() - chrono::Duration::days(1),
        token: "expiredtoken".to_string(),
        ip_address: Some("8.8.8.8".to_string()),
        user_agent: Some("ExpiredAgent".to_string()),
        user_id: Uuid::new_v4(),
        impersonated_by: None,
    }, true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_insert_session(
        dummy_user: InsertUserInput,
        #[case] mut input: InsertSessionInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        let dummy_user = InsertStatement::from(dummy_user)
            .returning(Query::returning().column(User::Id))
            .to_owned();

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_user.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        input.user_id = id;

        if input.validate().is_ok() == success {
            return Ok(());
        }

        let sql = InsertStatement::from(input).to_string(PostgresQueryBuilder);

        let result = pool.execute(&*sql).await;

        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());

        Ok(())
    }

    #[rstest]
    #[case::basic(UpdateSessionInput {
        expires_at: Some(Utc::now()),
        token: Some("updatedtoken456".to_string()),
        ip_address: Some(Some("192.168.1.1".to_string())),
        user_agent: Some(Some("Chrome/100.0".to_string())),
        user_id: Some(Uuid::new_v4()),
        impersonated_by: Some(None),
    }, true)]
    #[case::invalid_token(UpdateSessionInput {
        expires_at: Some(Utc::now()),
        token: Some("".to_string()),
        ip_address: None,
        user_agent: None,
        user_id: None,
        impersonated_by: None,
    }, false)]
    #[case::null_optionals(UpdateSessionInput {
        expires_at: None,
        token: Some("nulloptupdate".to_string()),
        ip_address: Some(None),
        user_agent: Some(None),
        user_id: None,
        impersonated_by: None,
    }, true)]
    #[case::long_token(UpdateSessionInput {
        expires_at: Some(Utc::now()),
        token: Some("b".repeat(256)),
        ip_address: Some(Some("172.16.0.1".to_string())),
        user_agent: Some(Some("LongAgent/3.0".to_string())),
        user_id: Some(Uuid::new_v4()),
        impersonated_by: Some(None),
    }, true)]
    #[case::impersonated(UpdateSessionInput {
        expires_at: Some(Utc::now()),
        token: Some("impersonatedupdate".to_string()),
        ip_address: Some(Some("10.10.10.10".to_string())),
        user_agent: Some(Some("ImpersonatorUpdate/4.0".to_string())),
        user_id: Some(Uuid::new_v4()),
        impersonated_by: Some(Some(Uuid::new_v4())),
    }, true)]
    #[case::expired(UpdateSessionInput {
        expires_at: Some(Utc::now() - chrono::Duration::days(2)),
        token: Some("expiredupdate".to_string()),
        ip_address: Some(Some("9.9.9.9".to_string())),
        user_agent: Some(Some("ExpiredUpdateAgent".to_string())),
        user_id: Some(Uuid::new_v4()),
        impersonated_by: Some(None),
    }, true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_update_session(
        dummy_user: InsertUserInput,
        mut dummy_session: InsertSessionInput,
        #[case] input: UpdateSessionInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        let dummy_user = InsertStatement::from(dummy_user)
            .returning(Query::returning().column(User::Id))
            .to_owned();

        let (user_id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_user.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        dummy_session.user_id = user_id;

        let mut dummy_session = InsertStatement::from(dummy_session.clone());

        let dummy_session = dummy_session.returning(Query::returning().column(Session::Id));

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_session.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        if input.validate().is_ok() == success {
            return Ok(());
        }

        let mut sql: UpdateStatement = From::<UpdateStatement>::from(input.into());

        let sql = sql
            .and_where(sea_query::Expr::col(Session::Id).eq(id))
            .to_string(PostgresQueryBuilder);

        let result = pool.execute(&*sql).await;

        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());

        Ok(())
    }
}
