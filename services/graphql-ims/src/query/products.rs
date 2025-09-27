use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::products;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsProductsQuery")]
impl Query {
    async fn products(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<products::Model>> {
        todo!()
    }
    async fn product(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<products::Model>> {
        todo!()
    }
}
