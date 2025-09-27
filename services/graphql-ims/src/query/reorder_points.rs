use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::reorder_points;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsReorderPointsQuery")]
impl Query {
    async fn reorder_points(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<reorder_points::Model>> {
        todo!()
    }
    async fn reorder_point(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<reorder_points::Model>> {
        todo!()
    }
}
