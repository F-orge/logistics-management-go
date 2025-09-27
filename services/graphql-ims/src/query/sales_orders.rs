use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::sales_orders;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsSalesOrdersQuery")]
impl Query {
    async fn sales_orders(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<sales_orders::Model>> {
        todo!()
    }
    async fn sales_order(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<sales_orders::Model>> {
        todo!()
    }
}
