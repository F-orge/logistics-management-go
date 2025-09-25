use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::guards::RequireSession;
use crate::models::user::{self, Model, PrimaryKey};

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "AuthUserQuery")]
impl Query {
    #[graphql(guard = RequireSession)]
    async fn users(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<Model>> {
        let db = ctx.data::<PgPool>()?;

        let users = user::Model::paginate(page, limit, db)
            .await
            .unwrap_or_default();

        Ok(users)
    }
    #[graphql(guard = RequireSession)]
    async fn user(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Model> {
        let db = ctx.data::<PgPool>()?;

        Ok(user::Model::one(&PrimaryKey(id), db).await?)
    }
    #[graphql(guard = RequireSession)]
    async fn me(&self, ctx: &Context<'_>) -> async_graphql::Result<Model> {
        let db = ctx.data::<PgPool>()?;

        let current_user = ctx.data::<user::Model>()?;

        Ok(user::Model::one(&PrimaryKey(current_user.id), db).await?)
    }
}
