use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::inventory_batches;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsInventoryBatchesQuery")]
impl Query {
    async fn inventory_batches(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<inventory_batches::Model>> {
        todo!()
    }
    async fn inventory_batch(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inventory_batches::Model>> {
        todo!()
    }
}
