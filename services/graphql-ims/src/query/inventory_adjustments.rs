use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::inventory_adjustments;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsInventoryAdjustmentsQuery")]
impl Query {
    async fn inventory_adjustments(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<inventory_adjustments::Model>> {
        todo!()
    }
    async fn inventory_adjustment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inventory_adjustments::Model>> {
        todo!()
    }
}
