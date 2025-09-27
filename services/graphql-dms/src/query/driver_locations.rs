use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::driver_locations;

#[derive(Debug, Clone, Default)]

pub struct Query;

#[Object(name = "DmsDriverLocationQuery")]
impl Query {
    async fn driver_locations(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<driver_locations::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, driver_locations::Model>(
            "select * from crm.driver_locations limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }
    async fn driver_location(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<driver_locations::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, driver_locations::Model>(
            "select * from crm.driver_locations where id = $1",
        )
        .bind(id)
        .fetch_optional(db)
        .await?)
    }
}
