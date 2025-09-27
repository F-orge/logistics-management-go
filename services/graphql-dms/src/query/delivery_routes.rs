use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::delivery_routes;

#[derive(Debug, Clone, Default)]

pub struct Query;

#[Object(name = "DmsDeliveryRoutesQuery")]
impl Query {
    async fn delivery_routes(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<delivery_routes::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, delivery_routes::Model>(
            "select * from crm.delivery_routes limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }
    async fn delivery_route(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<delivery_routes::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, delivery_routes::Model>(
            "select * from crm.delivery_routes where id = $1",
        )
        .bind(id)
        .fetch_optional(db)
        .await?)
    }
}
