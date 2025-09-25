use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::tags;

#[derive(Debug, Clone, InputObject)]
pub struct CreateTagInput {
    pub name: String,
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmTagsMutations")]
impl Mutation {
    async fn create_tag(
        &self,
        ctx: &Context<'_>,
        payload: CreateTagInput,
    ) -> async_graphql::Result<tags::Model> {
        todo!()
    }
    async fn update_tag_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<tags::Model> {
        todo!()
    }
    async fn remove_tag(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        todo!()
    }
}
