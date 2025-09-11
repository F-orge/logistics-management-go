use chrono::{DateTime, Utc};
use sea_query::Iden;
use sqlx::prelude::FromRow;
use uuid::Uuid;

#[derive(Iden)]
#[iden(rename = "account")]
pub enum Account {
    Table,
    Id,
    AccountId,
    ProviderId,
    UserId,
    AccessToken,
    RefreshToken,
    IdToken,
    AccessTokenExpiresAt,
    RefreshTokenExpiresAt,
    Scope,
    Password,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct AccountTable {
    pub id: Uuid,
    pub account_id: String,
    pub provider_id: String,
    pub user_id: Uuid,
    pub access_token: Option<String>,
    pub refresh_token: Option<String>,
    pub id_token: Option<String>,
    pub access_token_expires_at: Option<DateTime<Utc>>,
    pub refresh_token_expires_at: Option<DateTime<Utc>>,
    pub scope: Option<String>,
    pub password: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

use sea_query::{Alias, Query};
use validator::Validate;

#[derive(Clone, Debug, Validate)]
pub struct InsertAccountInput {
    #[validate(length(min = 1))]
    pub account_id: String,
    #[validate(length(min = 1))]
    pub provider_id: String,
    pub user_id: Uuid,
    pub access_token: Option<String>,
    pub refresh_token: Option<String>,
    pub id_token: Option<String>,
    pub access_token_expires_at: Option<DateTime<Utc>>,
    pub refresh_token_expires_at: Option<DateTime<Utc>>,
    pub scope: Option<String>,
    #[validate(length(min = 10, max = 128))]
    pub password: Option<String>,
}

impl From<InsertAccountInput> for sea_query::InsertStatement {
    fn from(value: InsertAccountInput) -> Self {
        Query::insert()
            .into_table((Alias::new("auth"), Account::Table))
            .columns([
                Account::AccountId,
                Account::ProviderId,
                Account::UserId,
                Account::AccessToken,
                Account::RefreshToken,
                Account::IdToken,
                Account::AccessTokenExpiresAt,
                Account::RefreshTokenExpiresAt,
                Account::Scope,
                Account::Password,
            ])
            .values([
                value.account_id.into(),
                value.provider_id.into(),
                value.user_id.into(),
                value.access_token.into(),
                value.refresh_token.into(),
                value.id_token.into(),
                value.access_token_expires_at.into(),
                value.refresh_token_expires_at.into(),
                value.scope.into(),
                value.password.into(),
            ])
            .expect("Failed to convert account input to sea-query")
            .to_owned()
    }
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateAccountInput {
    #[validate(length(min = 1))]
    pub account_id: Option<String>,
    #[validate(length(min = 1))]
    pub provider_id: Option<String>,
    pub user_id: Option<Uuid>,
    pub access_token: Option<Option<String>>,
    pub refresh_token: Option<Option<String>>,
    pub id_token: Option<Option<String>>,
    pub access_token_expires_at: Option<Option<DateTime<Utc>>>,
    pub refresh_token_expires_at: Option<Option<DateTime<Utc>>>,
    pub scope: Option<Option<String>>,
    #[validate(length(min = 10, max = 128))]
    pub password: Option<Option<String>>,
}

impl From<UpdateAccountInput> for sea_query::UpdateStatement {
    fn from(value: UpdateAccountInput) -> Self {
        let mut stmt = Query::update();
        stmt.table((Alias::new("auth"), Account::Table));
        if let Some(account_id) = value.account_id {
            stmt.value(Account::AccountId, account_id);
        }
        if let Some(provider_id) = value.provider_id {
            stmt.value(Account::ProviderId, provider_id);
        }
        if let Some(user_id) = value.user_id {
            stmt.value(Account::UserId, user_id);
        }
        if let Some(access_token) = value.access_token.flatten() {
            stmt.value(Account::AccessToken, access_token);
        }
        if let Some(refresh_token) = value.refresh_token.flatten() {
            stmt.value(Account::RefreshToken, refresh_token);
        }
        if let Some(id_token) = value.id_token.flatten() {
            stmt.value(Account::IdToken, id_token);
        }
        if let Some(access_token_expires_at) = value.access_token_expires_at.flatten() {
            stmt.value(Account::AccessTokenExpiresAt, access_token_expires_at);
        }
        if let Some(refresh_token_expires_at) = value.refresh_token_expires_at.flatten() {
            stmt.value(Account::RefreshTokenExpiresAt, refresh_token_expires_at);
        }
        if let Some(scope) = value.scope.flatten() {
            stmt.value(Account::Scope, scope);
        }
        if let Some(password) = value.password.flatten() {
            stmt.value(Account::Password, password);
        }
        stmt.to_owned()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::entities::user::{InsertUserInput, User};
    use chrono::Utc;
    use rstest::rstest;
    use sea_query::{InsertStatement, PostgresQueryBuilder, Query, UpdateStatement};
    use sqlx::{Executor, PgPool};
    use uuid::Uuid;

    use crate::utils::{dummy_account, dummy_user};

    #[rstest]
    #[case::basic(InsertAccountInput {
        account_id: "acc_123".to_string(),
        provider_id: "provider_abc".to_string(),
        user_id: Uuid::nil(), // will be replaced in test
        access_token: Some("access_token_value".to_string()),
        refresh_token: Some("refresh_token_value".to_string()),
        id_token: Some("id_token_value".to_string()),
        access_token_expires_at: Some(Utc::now() + chrono::Duration::days(1)),
        refresh_token_expires_at: Some(Utc::now() + chrono::Duration::days(2)),
        scope: Some("read write".to_string()),
        password: Some("supersecretpassword".to_string()),
    }, true)]
    #[case::minimal(InsertAccountInput {
        account_id: "acc_min".to_string(),
        provider_id: "prov_min".to_string(),
        user_id: Uuid::nil(),
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: Some("1234567890".to_string()),
    }, true)]
    #[case::invalid_empty_ids(InsertAccountInput {
        account_id: "".to_string(),
        provider_id: "".to_string(),
        user_id: Uuid::nil(),
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: Some("1234567890".to_string()),
    }, false)]
    #[case::invalid_short_password(InsertAccountInput {
        account_id: "acc_shortpw".to_string(),
        provider_id: "prov_shortpw".to_string(),
        user_id: Uuid::nil(),
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: Some("short".to_string()),
    }, false)]
    #[case::long_password(InsertAccountInput {
        account_id: "acc_longpw".to_string(),
        provider_id: "prov_longpw".to_string(),
        user_id: Uuid::nil(),
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: Some("a".repeat(128)),
    }, true)]
    #[case::null_password(InsertAccountInput {
        account_id: "acc_nullpw".to_string(),
        provider_id: "prov_nullpw".to_string(),
        user_id: Uuid::nil(),
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: None,
    }, true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_insert_account(
        dummy_user: InsertUserInput,
        #[case] mut input: InsertAccountInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        let dummy_user = InsertStatement::from(dummy_user)
            .returning(Query::returning().column(User::Id))
            .to_owned();

        let (user_id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_user.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        input.user_id = user_id;

        if input.validate().is_ok() == success {
            return Ok(());
        }

        let sql = InsertStatement::from(input).to_string(PostgresQueryBuilder);

        let result = pool.execute(&*sql).await;

        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());

        Ok(())
    }

    #[rstest]
    #[case::basic(UpdateAccountInput {
        account_id: Some("acc_456".to_string()),
        provider_id: Some("provider_xyz".to_string()),
        user_id: None,
        access_token: Some(Some("new_access_token".to_string())),
        refresh_token: Some(Some("new_refresh_token".to_string())),
        id_token: Some(Some("new_id_token".to_string())),
        access_token_expires_at: Some(Some(Utc::now() + chrono::Duration::days(3))),
        refresh_token_expires_at: Some(Some(Utc::now() + chrono::Duration::days(4))),
        scope: Some(Some("admin".to_string())),
        password: Some(Some("anothersecretpassword".to_string())),
    }, true)]
    #[case::minimal(UpdateAccountInput {
        account_id: Some("acc_min_upd".to_string()),
        provider_id: Some("prov_min_upd".to_string()),
        user_id: None,
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: Some(Some("1234567890".to_string())),
    }, true)]
    #[case::invalid_empty_ids(UpdateAccountInput {
        account_id: Some("".to_string()),
        provider_id: Some("".to_string()),
        user_id: None,
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: Some(Some("1234567890".to_string())),
    }, false)]
    #[case::invalid_short_password(UpdateAccountInput {
        account_id: Some("acc_shortpw_upd".to_string()),
        provider_id: Some("prov_shortpw_upd".to_string()),
        user_id: None,
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: Some(Some("short".to_string())),
    }, false)]
    #[case::long_password(UpdateAccountInput {
        account_id: Some("acc_longpw_upd".to_string()),
        provider_id: Some("prov_longpw_upd".to_string()),
        user_id: None,
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: Some(Some("a".repeat(128))),
    }, true)]
    #[case::null_password(UpdateAccountInput {
        account_id: Some("acc_nullpw_upd".to_string()),
        provider_id: Some("prov_nullpw_upd".to_string()),
        user_id: None,
        access_token: None,
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: Some(None),
    }, true)]
    #[case::single_field(UpdateAccountInput {
        account_id: None,
        provider_id: None,
        user_id: None,
        access_token: Some(Some("only_access_token".to_string())),
        refresh_token: None,
        id_token: None,
        access_token_expires_at: None,
        refresh_token_expires_at: None,
        scope: None,
        password: None,
    }, true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_update_account(
        dummy_user: InsertUserInput,
        mut dummy_account: InsertAccountInput,
        #[case] input: UpdateAccountInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        let dummy_user = InsertStatement::from(dummy_user)
            .returning(Query::returning().column(User::Id))
            .to_owned();

        let (user_id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_user.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        dummy_account.user_id = user_id;

        let dummy_account = InsertStatement::from(dummy_account)
            .returning(Query::returning().column(Account::Id))
            .to_owned();

        let (account_id,) =
            sqlx::query_as::<_, (Uuid,)>(&dummy_account.to_string(PostgresQueryBuilder))
                .fetch_one(&pool)
                .await?;

        if input.validate().is_ok() == success {
            return Ok(());
        }

        let mut sql: UpdateStatement = From::<UpdateStatement>::from(input.into());

        let sql = sql
            .and_where(sea_query::Expr::col(Account::Id).eq(account_id))
            .to_string(PostgresQueryBuilder);

        let result = pool.execute(&*sql).await;

        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());

        Ok(())
    }
}
