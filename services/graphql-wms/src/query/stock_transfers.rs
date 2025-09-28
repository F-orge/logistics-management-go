use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::stock_transfers;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsStockTransfersQuery")]
impl Query {
    async fn stock_transfers(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<stock_transfers::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, stock_transfers::Model>(
                "select * from wms.stock_transfers limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn stock_transfer(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<stock_transfers::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, stock_transfers::Model>(
                "select * from wms.stock_transfers where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}