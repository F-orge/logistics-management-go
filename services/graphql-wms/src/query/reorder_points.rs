use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::reorder_points;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsReorderPointsQuery")]
impl Query {
    async fn reorder_points(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<reorder_points::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, reorder_points::Model>(
                "select * from wms.reorder_points limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn reorder_point(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<reorder_points::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, reorder_points::Model>(
                "select * from wms.reorder_points where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}