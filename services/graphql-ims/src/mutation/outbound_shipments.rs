use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::OutboundShipmentStatusEnum, outbound_shipments};

#[derive(Debug, Clone, InputObject)]
pub struct CreateOutboundShipmentInput {
    pub sales_order_id: Uuid,
    pub warehouse_id: Uuid,
    pub status: Option<OutboundShipmentStatusEnum>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
    pub items: Vec<CreateOutboundShipmentItemInput>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateOutboundShipmentItemInput {
    pub id: Uuid,
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity_shipped: i32,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsOutboundShipmentsMutation")]
impl Mutation {
    async fn create_outbound_shipment(
        &self,
        ctx: &Context<'_>,
        payload: CreateOutboundShipmentInput,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn update_outbound_shipment_sales_order_id(
        &self,
        ctx: &Context<'_>,
        sales_order_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn update_outbound_shipment_warehouse_id(
        &self,
        ctx: &Context<'_>,
        warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn update_outbound_shipment_status(
        &self,
        ctx: &Context<'_>,
        status: OutboundShipmentStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn update_outbound_shipment_tracking_number(
        &self,
        ctx: &Context<'_>,
        tracking_number: String,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn update_outbound_shipment_carrier(
        &self,
        ctx: &Context<'_>,
        carrier: String,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn remove_outbound_shipment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    // sub item
    async fn add_outbound_shipment_item(
        &self,
        ctx: &Context<'_>,
        payload: CreateOutboundShipmentItemInput,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn update_outbound_shipment_item_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn update_outbound_shipment_item_batch_id(
        &self,
        ctx: &Context<'_>,
        batch_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn update_outbound_shipment_item_quantity_shipped(
        &self,
        ctx: &Context<'_>,
        quantity_shipped: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }

    async fn remove_outbound_shipment_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }
}
