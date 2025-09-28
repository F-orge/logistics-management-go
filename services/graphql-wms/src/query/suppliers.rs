use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::suppliers;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsSuppliersQuery")]
impl Query {
    async fn suppliers(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<suppliers::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, suppliers::Model>(
                "select * from wms.suppliers limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn supplier(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<suppliers::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, suppliers::Model>(
                "select * from wms.suppliers where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}