use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::suppliers;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsSuppliersQuery")]
impl Query {
    async fn suppliers(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<suppliers::Model>> {
        todo!()
    }
    async fn supplier(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<suppliers::Model>> {
        todo!()
    }
}
