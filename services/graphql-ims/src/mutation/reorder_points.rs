use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::reorder_points;

#[derive(Debug, Clone, InputObject)]
pub struct CreateReorderPointInput {
    pub product_id: Uuid,
    pub warehouse_id: Uuid,
    pub threshold: i32,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsReorderPointsMutation")]
impl Mutation {
    async fn create_reorder_point(
        &self,
        ctx: &Context<'_>,
        payload: CreateReorderPointInput,
    ) -> async_graphql::Result<reorder_points::Model> {
        todo!()
    }

    async fn update_reorder_point_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<reorder_points::Model> {
        todo!()
    }

    async fn update_reorder_point_warehouse_id(
        &self,
        ctx: &Context<'_>,
        warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<reorder_points::Model> {
        todo!()
    }

    async fn update_reorder_point_threshold(
        &self,
        ctx: &Context<'_>,
        threshold: i32,
        id: Uuid,
    ) -> async_graphql::Result<reorder_points::Model> {
        todo!()
    }

    async fn remove_reorder_point(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<reorder_points::Model> {
        todo!()
    }
}
