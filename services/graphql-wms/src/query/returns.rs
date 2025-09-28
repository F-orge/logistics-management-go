use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::returns;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsReturnsQuery")]
impl Query {
    async fn returns(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<returns::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, returns::Model>(
                "select * from wms.returns limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn return_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<returns::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, returns::Model>(
                "select * from wms.returns where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}