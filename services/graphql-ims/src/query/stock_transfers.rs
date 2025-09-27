use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::stock_transfers;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsStockTransfersQuery")]
impl Query {
    async fn stock_transfers(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<stock_transfers::Model>> {
        todo!()
    }
    async fn sales_order(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<stock_transfers::Model>> {
        todo!()
    }
}
