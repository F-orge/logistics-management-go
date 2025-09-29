use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::routes;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsRoutesQuery")]
impl Query {
    async fn routes(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<routes::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, routes::Model>("select * from tms.routes limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn route(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<routes::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, routes::Model>("select * from tms.routes where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
