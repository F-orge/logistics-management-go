use async_graphql::{Context, InputObject, Object};
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::{enums::ProductStatusEnum, products};

#[derive(Debug, Clone, InputObject)]
pub struct CreateImsProductInput {
    pub name: String,
    pub sku: String,
    pub barcode: Option<String>,
    pub description: Option<String>,
    pub cost_price: Option<Decimal>,
    pub length: Option<f32>,
    pub width: Option<f32>,
    pub height: Option<f32>,
    pub volume: Option<f32>,
    pub weight: Option<f32>,
    pub status: Option<ProductStatusEnum>,
    pub supplier_id: Option<Uuid>,
    pub client_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsProductsMutation")]
impl Mutation {
    async fn create_product(
        &self,
        ctx: &Context<'_>,
        payload: CreateImsProductInput,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_name(
        &self,
        ctx: &Context<'_>,
        name: String,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_sku(
        &self,
        ctx: &Context<'_>,
        sku: String,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_barcode(
        &self,
        ctx: &Context<'_>,
        barcode: String,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_description(
        &self,
        ctx: &Context<'_>,
        description: String,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_cost_price(
        &self,
        ctx: &Context<'_>,
        cost_price: Decimal,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_length(
        &self,
        ctx: &Context<'_>,
        length: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_width(
        &self,
        ctx: &Context<'_>,
        width: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_height(
        &self,
        ctx: &Context<'_>,
        height: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_volume(
        &self,
        ctx: &Context<'_>,
        volume: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_weight(
        &self,
        ctx: &Context<'_>,
        weight: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_status(
        &self,
        ctx: &Context<'_>,
        status: ProductStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_supplier_id(
        &self,
        ctx: &Context<'_>,
        supplier_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn update_product_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }

    async fn remove_outbound_shipment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }
}
