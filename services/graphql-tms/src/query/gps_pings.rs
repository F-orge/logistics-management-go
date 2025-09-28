use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::gps_pings;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsGpsPingsQuery")]
impl Query {
    async fn gps_pings(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<gps_pings::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, gps_pings::Model>(
            "select * from tms.gps_pings limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn gps_ping(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<gps_pings::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, gps_pings::Model>("select * from tms.gps_pings where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
