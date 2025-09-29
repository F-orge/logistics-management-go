use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::carriers;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsCarriersQuery")]
impl Query {
    async fn carriers(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<carriers::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, carriers::Model>("select * from tms.carriers limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn carrier(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<carriers::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, carriers::Model>("select * from tms.carriers where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
