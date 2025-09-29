use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::shipment_legs;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsShipmentLegsQuery")]
impl Query {
    async fn shipment_legs(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<shipment_legs::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, shipment_legs::Model>(
            "select * from tms.shipment_legs limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn shipment_leg(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<shipment_legs::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, shipment_legs::Model>(
            "select * from tms.shipment_legs where id = $1",
        )
        .bind(id)
        .fetch_optional(db)
        .await?)
    }
}
