use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::bin_thresholds;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsBinThresholdsQuery")]
impl Query {
    async fn bin_thresholds(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<bin_thresholds::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, bin_thresholds::Model>(
            "select * from wms.bin_thresholds limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn bin_threshold(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<bin_thresholds::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, bin_thresholds::Model>(
            "select * from wms.bin_thresholds where id = $1",
        )
        .bind(id)
        .fetch_optional(db)
        .await?)
    }
}
