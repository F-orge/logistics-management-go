use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::inventory_batches;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsInventoryBatchesQuery")]
impl Query {
    async fn inventory_batches(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<inventory_batches::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, inventory_batches::Model>(
                "select * from wms.inventory_batches limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn inventory_batch(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inventory_batches::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, inventory_batches::Model>(
                "select * from wms.inventory_batches where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}