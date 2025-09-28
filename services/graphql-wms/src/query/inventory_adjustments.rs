use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::inventory_adjustments;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsInventoryAdjustmentsQuery")]
impl Query {
    async fn inventory_adjustments(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<inventory_adjustments::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, inventory_adjustments::Model>(
                "select * from wms.inventory_adjustments limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn inventory_adjustment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inventory_adjustments::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, inventory_adjustments::Model>(
                "select * from wms.inventory_adjustments where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}