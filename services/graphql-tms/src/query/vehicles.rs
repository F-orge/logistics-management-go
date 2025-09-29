use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::vehicles;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsVehiclesQuery")]
impl Query {
    async fn vehicles(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<vehicles::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, vehicles::Model>("select * from tms.vehicles limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn vehicle(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<vehicles::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, vehicles::Model>("select * from tms.vehicles where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
