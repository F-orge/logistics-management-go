use chrono::{DateTime, Utc};
use sea_query::{Alias, Iden, Query};
use sqlx::prelude::FromRow;
use url::Url;
use uuid::Uuid;
use validator::Validate;

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

impl From<InsertUserInput> for sea_query::InsertStatement {
    fn from(value: InsertUserInput) -> Self {
        Query::insert()
            .into_table((Alias::new("auth"), User::Table))
            .columns([
                User::Name,
                User::Email,
                User::EmailVerified,
                User::Image,
                User::Role,
                User::Banned,
                User::BanReason,
                User::BanExpires,
            ])
            .values([
                value.name.into(),
                value.email.into(),
                value.email_verified.into(),
                value.image.map(|u| u.to_string()).into(),
                value.role.into(),
                value.banned.into(),
                value.ban_reason.into(),
                value.ban_expires.into(),
            ])
            .expect("Failed to convert user input to sea-query")
            .to_owned()
    }
}

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

#[cfg(test)]
mod sqlx_test {
    use sea_query::{Expr, InsertStatement, PostgresQueryBuilder, Query, UpdateStatement};
    use sqlx::{Executor, PgPool};
    use uuid::Uuid;
    use validator::Validate;

    use crate::entities::user::{InsertUserInput, UpdateUserInput, User};

    #[rstest::rstest]
    #[case::minimal(InsertUserInput {
      name: "john doe".into(),
      email: "johndoe@email.com".into(),
      email_verified: false,
      image: None,
      role: None,
      banned: false,
      ban_reason: None,
      ban_expires: None,
    },true)]
    #[case::all_fields(InsertUserInput {
        name: "Jane Smith".into(),
        email: "jane.smith@email.com".into(),
        email_verified: true,
        image: Some(url::Url::parse("https://example.com/avatar.png").unwrap()),
        role: Some("admin".into()),
        banned: true,
        ban_reason: Some("Violation of terms".into()),
        ban_expires: Some(chrono::Utc::now() + chrono::Duration::days(30)),
    },true)]
    #[case::empty(InsertUserInput {
        name: "".into(),
        email: "".into(),
        email_verified: false,
        image: None,
        role: None,
        banned: false,
        ban_reason: None,
        ban_expires: None,
    },false)]
    #[case::banned_user(InsertUserInput {
        name: "Banned User".into(),
        email: "banned@email.com".into(),
        email_verified: true,
        image: None,
        role: Some("user".into()),
        banned: true,
        ban_reason: Some("Spamming".into()),
        ban_expires: Some(chrono::Utc::now() + chrono::Duration::days(7)),
    },true)]
    #[case::future_ban(InsertUserInput {
        name: "Future Ban".into(),
        email: "futureban@email.com".into(),
        email_verified: true,
        image: None,
        role: None,
        banned: true,
        ban_reason: Some("Scheduled ban".into()),
        ban_expires: Some(chrono::Utc::now() + chrono::Duration::days(365)),
    },true)]
    #[case::past_ban(InsertUserInput {
        name: "Past Ban".into(),
        email: "pastban@email.com".into(),
        email_verified: true,
        image: None,
        role: None,
        banned: true,
        ban_reason: Some("Expired ban".into()),
        ban_expires: Some(chrono::Utc::now() - chrono::Duration::days(365)),
    },true)]
    #[case::invalid_email(InsertUserInput {
        name: "Invalid Email".into(),
        email: "not-an-email".into(),
        email_verified: false,
        image: None,
        role: None,
        banned: false,
        ban_reason: None,
        ban_expires: None,
    },false)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_insert_operations(
        #[case] input: InsertUserInput,
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

    #[rstest::fixture]
    #[once]
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

    #[rstest::rstest]
    #[case::minimal(UpdateUserInput {
        name: Some("john doe".into()),
        email: Some("johndoe@email.com".into()),
        email_verified: Some(false),
        image: Some(None),
        role: Some(None),
        banned: Some(false),
        ban_reason: Some(None),
        ban_expires: Some(None),
    },true)]
    #[case::all_fields(UpdateUserInput {
        name: Some("Jane Smith".into()),
        email: Some("jane.smith@email.com".into()),
        email_verified: Some(true),
        image: Some(Some(url::Url::parse("https://example.com/avatar.png").unwrap())),
        role: Some(Some("admin".into())),
        banned: Some(true),
        ban_reason: Some(Some("Violation of terms".into())),
        ban_expires: Some(Some(chrono::Utc::now() + chrono::Duration::days(30))),
    },true)]
    #[case::email_only(UpdateUserInput {
        name: None,
        email: Some("new@email.com".into()),
        email_verified: None,
        image: None,
        role: None,
        banned: None,
        ban_reason: None,
        ban_expires: None,
    },true)]
    #[case::invalid_email(UpdateUserInput {
        name: Some("Valid Name".into()),
        email: Some("not-an-email".into()),
        email_verified: None,
        image: None,
        role: None,
        banned: None,
        ban_reason: None,
        ban_expires: None,
    },false)]
    #[case::short_name(UpdateUserInput {
        name: Some("ab".into()),
        email: Some("shortname@email.com".into()),
        email_verified: None,
        image: None,
        role: None,
        banned: None,
        ban_reason: None,
        ban_expires: None,
    },false)]
    #[case::none(UpdateUserInput {
        name: None,
        email: None,
        email_verified: None,
        image: None,
        role: None,
        banned: None,
        ban_reason: None,
        ban_expires: None,
    },true)]
    #[case::optional_nulls(UpdateUserInput {
        name: Some("Optional Nulls".into()),
        email: Some("optional@email.com".into()),
        email_verified: Some(false),
        image: Some(None),
        role: Some(None),
        banned: Some(true),
        ban_reason: Some(None),
        ban_expires: Some(None),
    },true)]
    #[case::banned_user(UpdateUserInput {
        name: Some("Banned User".into()),
        email: Some("banned@email.com".into()),
        email_verified: Some(true),
        image: None,
        role: Some(Some("user".into())),
        banned: Some(true),
        ban_reason: Some(Some("Spamming".into())),
        ban_expires: Some(Some(chrono::Utc::now() + chrono::Duration::days(7))),
    },true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_update_operations(
        dummy_user: &InsertStatement,
        #[case] input: UpdateUserInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        let (id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_user.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        if input.validate().is_ok() == success {
            return Ok(());
        }

        let mut sql: UpdateStatement = From::<UpdateStatement>::from(input.into());

        let sql = sql
            .and_where(Expr::col(User::Id).eq(id))
            .to_string(PostgresQueryBuilder);

        let result = pool.execute(&*sql).await;

        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());

        Ok(())
    }
}
