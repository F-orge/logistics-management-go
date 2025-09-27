use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::inbound_shipments;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsInboundShipmentsQuery")]
impl Query {
    async fn inbound_shipments(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<inbound_shipments::Model>> {
        todo!()
    }
    async fn inbound_shipment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inbound_shipments::Model>> {
        todo!()
    }
}
