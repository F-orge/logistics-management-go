use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::pick_batches;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsPickBatchesQuery")]
impl Query {
    async fn pick_batches(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<pick_batches::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, pick_batches::Model>(
                "select * from wms.pick_batches limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn pick_batch(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<pick_batches::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, pick_batches::Model>(
                "select * from wms.pick_batches where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}
