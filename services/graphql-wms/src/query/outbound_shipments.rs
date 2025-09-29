use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::outbound_shipments;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsOutboundShipmentsQuery")]
impl Query {
    async fn outbound_shipments(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<outbound_shipments::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, outbound_shipments::Model>(
            "select * from wms.outbound_shipments limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn outbound_shipment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<outbound_shipments::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, outbound_shipments::Model>(
            "select * from wms.outbound_shipments where id = $1",
        )
        .bind(id)
        .fetch_optional(db)
        .await?)
    }
}
