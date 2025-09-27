use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use uuid::Uuid;

use crate::models::{enums::InboundShipmentStatusEnum, inbound_shipments};

#[derive(Debug, Clone, InputObject)]
pub struct CreateInboundShipmentInput {
    pub id: Uuid,
    pub client_id: Option<Uuid>,
    pub warehouse_id: Uuid,
    pub status: Option<InboundShipmentStatusEnum>,
    pub expected_arrival_date: Option<NaiveDate>,
    pub actual_arrival_date: Option<NaiveDate>,
    pub items: Vec<CreateInboundShipmentItemInput>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateInboundShipmentItemInput {
    pub product_id: Uuid,
    pub expected_quantity: i32,
    pub received_quantity: Option<i32>,
    pub discrepancy_quantity: Option<i32>,
    pub discrepancy_notes: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsInboundShipmentsMutation")]
impl Mutation {
    async fn create_inbound_shipment(
        &self,
        ctx: &Context<'_>,
        payload: CreateInboundShipmentInput,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_warehouse_id(
        &self,
        ctx: &Context<'_>,
        warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_status(
        &self,
        ctx: &Context<'_>,
        status: InboundShipmentStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_expected_arrival_date(
        &self,
        ctx: &Context<'_>,
        arrival_date: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_actual_arrival_date(
        &self,
        ctx: &Context<'_>,
        actual_arrival_date: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn remove_inbound_shipment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        todo!()
    }

    // sub item
    async fn add_inbound_shipment_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateInboundShipmentItemInput,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_item_product(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_item_expected_quantity(
        &self,
        ctx: &Context<'_>,
        expected_quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_item_recieved_quantity(
        &self,
        ctx: &Context<'_>,
        recieved_quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_item_discrepancy_quantity(
        &self,
        ctx: &Context<'_>,
        discrepancy_quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn update_inbound_shipment_item_discrepancy_notes(
        &self,
        ctx: &Context<'_>,
        discrepancy_notes: String,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        todo!()
    }

    async fn remove_inbound_shipment_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        todo!()
    }
}
