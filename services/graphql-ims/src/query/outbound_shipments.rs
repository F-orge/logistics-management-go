use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::outbound_shipments;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsOutboundShipmentsQuery")]
impl Query {
    async fn outbound_shipments(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<outbound_shipments::Model>> {
        todo!()
    }
    async fn outbound_shipment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<outbound_shipments::Model>> {
        todo!()
    }
}
