use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::packages;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsPackagesQuery")]
impl Query {
    async fn packages(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<packages::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, packages::Model>(
                "select * from wms.packages limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn package(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<packages::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, packages::Model>(
                "select * from wms.packages where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}
