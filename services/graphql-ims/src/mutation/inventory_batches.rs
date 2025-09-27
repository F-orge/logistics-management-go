use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use uuid::Uuid;

use crate::models::inventory_batches;

#[derive(Debug, Clone, InputObject)]
pub struct CreateInventoryBatchInput {
    pub product_id: Uuid,
    pub batch_number: String,
    pub expiration_date: Option<NaiveDate>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsInventoryBatchesMutation")]
impl Mutation {
    async fn create_inventory_batch(
        &self,
        ctx: &Context<'_>,
        payload: CreateInventoryBatchInput,
    ) -> async_graphql::Result<inventory_batches::Model> {
        todo!()
    }

    async fn update_inventory_batch_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inventory_batches::Model> {
        todo!()
    }

    async fn update_inventory_batch_number(
        &self,
        ctx: &Context<'_>,
        batch_number: String,
        id: Uuid,
    ) -> async_graphql::Result<inventory_batches::Model> {
        todo!()
    }

    async fn update_inventory_batch_expiration_date(
        &self,
        ctx: &Context<'_>,
        expiration_date: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<inventory_batches::Model> {
        todo!()
    }

    async fn remove_inventory_batch(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<inventory_batches::Model> {
        todo!()
    }
}
