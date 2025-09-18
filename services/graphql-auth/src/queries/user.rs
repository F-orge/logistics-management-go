use async_graphql::{Object, SimpleObject};
use chrono::{Duration, Utc};
use sea_orm::{
    ActiveModelBehavior, ActiveModelTrait, ActiveValue::Set, ColumnTrait, DatabaseConnection,
    EntityTrait, PaginatorTrait, QueryFilter, TransactionTrait,
};
use url::Url;
use uuid::Uuid;

use crate::entities::_generated::{account, session, user};
use crate::guards::{RequireSession, RoleGuard, Roles};

#[Object(name = "Users")]
impl user::Entity {
    #[graphql(
        name = "users",
        guard = RoleGuard::new(Roles::Admin).or(RoleGuard::new(Roles::Developer)))
    ]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<user::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = user::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();

        Ok(result)
    }

    #[graphql(name = "user",guard = RequireSession)]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<user::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = user::Entity::find_by_id(id).one(db).await?;

        Ok(result)
    }

    #[graphql(guard = RequireSession)]
    async fn me(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<user::Model> {
        let current_user = ctx.data::<user::Model>()?;

        Ok(current_user.to_owned())
    }
}

#[derive(Debug, Default)]

pub struct Mutations;

#[derive(Clone, Debug, SimpleObject)]
pub struct SignInResponse {
    token: String,
    user: user::Model,
}

#[Object(name = "AuthUserMutations")]
impl Mutations {
    async fn sign_in_email(
        &self,
        ctx: &async_graphql::Context<'_>,
        email: String,
        password: String,
    ) -> async_graphql::Result<SignInResponse> {
        // register the user
        let db = ctx.data::<DatabaseConnection>()?;

        // todo: optimize this to be one call only
        let user = user::Entity::find()
            .filter(user::Column::Email.eq(email))
            .one(db)
            .await?
            .ok_or(async_graphql::Error::new("Invalid email or password"))?;

        let _ = account::Entity::find()
            .filter(account::Column::UserId.eq(user.id))
            .filter(account::Column::Password.eq(password))
            .one(db)
            .await?
            .ok_or(async_graphql::Error::new("Invalid email or password"))?;

        // generate a new session for this user
        let mut session_insert = session::ActiveModel::new();

        session_insert.user_id = Set(user.id);
        session_insert.expires_at = Set((Utc::now() + Duration::seconds(3600)).naive_utc());
        session_insert.token = Set(Uuid::new_v4().to_string());
        // todo: get the user-agent and ip via request

        let new_session = session_insert.insert(db).await?;

        Ok(SignInResponse {
            token: new_session.token,
            user,
        })
    }

    async fn sign_up_email(
        &self,
        ctx: &async_graphql::Context<'_>,
        name: String,
        email: String,
        password: String,
        role: Option<String>,
        image: Option<Url>,
    ) -> async_graphql::Result<user::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let trx = db.begin().await?;

        let mut user_insert = user::ActiveModel::new();

        user_insert.email = Set(email);
        user_insert.email_verified = Set(Some(false));
        user_insert.role = Set(role);
        user_insert.image = Set(image.map(|url| url.to_string()));
        user_insert.name = Set(name);

        let new_user = user_insert.insert(&trx).await?;

        // add the password to account
        let mut account_insert = account::ActiveModel::new();

        account_insert.password = Set(Some(password));
        account_insert.user_id = Set(new_user.id);
        account_insert.account_id = Set(new_user.id.to_string());
        account_insert.provider_id = Set(new_user.id.to_string());

        _ = account_insert.insert(&trx).await?;

        _ = trx.commit().await?;

        Ok(new_user)
    }

    async fn refresh_token(
        &self,
        _ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<user::Entity> {
        todo!()
    }
}
