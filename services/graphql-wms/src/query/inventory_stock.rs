use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::inventory_stock;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsInventoryStockQuery")]
impl Query {
    async fn inventory_stock(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<inventory_stock::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, inventory_stock::Model>(
                "select * from wms.inventory_stock limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn inventory_stock_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inventory_stock::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, inventory_stock::Model>(
                "select * from wms.inventory_stock where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}
