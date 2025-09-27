use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::returns;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "ImsReturnsQuery")]
impl Query {
    async fn returns(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<returns::Model>> {
        todo!()
    }

    async fn r#return(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<returns::Model>> {
        todo!()
    }
}
