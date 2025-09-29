use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::trips;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsTripsQuery")]
impl Query {
    async fn trips(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<trips::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, trips::Model>("select * from tms.trips limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn trip(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<trips::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, trips::Model>("select * from tms.trips where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
