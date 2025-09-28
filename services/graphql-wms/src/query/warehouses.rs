use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::warehouses;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsWarehousesQuery")]
impl Query {
    async fn warehouses(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<warehouses::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, warehouses::Model>(
                "select * from wms.warehouses limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn warehouse(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<warehouses::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, warehouses::Model>(
                "select * from wms.warehouses where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}
