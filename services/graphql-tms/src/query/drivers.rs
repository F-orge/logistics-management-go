use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::drivers;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsDriversQuery")]
impl Query {
    async fn drivers(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<drivers::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, drivers::Model>(
            "select * from tms.drivers limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn driver(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<drivers::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, drivers::Model>("select * from tms.drivers where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
