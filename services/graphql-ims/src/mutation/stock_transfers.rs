use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::StockTransferStatusEnum, stock_transfers};

#[derive(Debug, Clone, InputObject)]
pub struct CreateStockTransferInput {
    pub id: Uuid,
    pub product_id: Uuid,
    pub source_warehouse_id: Uuid,
    pub destination_warehouse_id: Uuid,
    pub quantity: i32,
    pub status: Option<StockTransferStatusEnum>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsStockTransfersMutation")]
impl Mutation {
    async fn create_stock_transfer(
        &self,
        ctx: &Context<'_>,
        payload: CreateStockTransferInput,
    ) -> async_graphql::Result<stock_transfers::Model> {
        todo!()
    }

    async fn update_stock_transfer_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        todo!()
    }

    async fn update_stock_transfer_source_warehouse_id(
        &self,
        ctx: &Context<'_>,
        source_warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        todo!()
    }

    async fn update_stock_transfer_destination_warehouse_id(
        &self,
        ctx: &Context<'_>,
        destination_warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        todo!()
    }

    async fn update_stock_transfer_quantity(
        &self,
        ctx: &Context<'_>,
        quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        todo!()
    }

    async fn update_stock_transfer_status(
        &self,
        ctx: &Context<'_>,
        status: StockTransferStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        todo!()
    }

    async fn remove_stock_transfer(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        todo!()
    }
}
