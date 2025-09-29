use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::geofences;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsGeofencesQuery")]
impl Query {
    async fn geofences(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<geofences::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, geofences::Model>("select * from tms.geofence limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn geofence(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<geofences::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, geofences::Model>("select * from tms.geofence where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
