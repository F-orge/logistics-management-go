use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::SalesOrderStatusEnum, sales_orders};

#[derive(Debug, Clone, InputObject)]
pub struct CreateSalesOrderInput {
    pub order_number: String,
    pub client_id: Uuid,
    pub crm_opportunity_id: Option<Uuid>,
    pub status: Option<SalesOrderStatusEnum>,
    pub shipping_address: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateSalesOrderItemInput {
    pub product_id: Uuid,
    pub quantity_ordered: i32,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsSalesOrdersMutation")]
impl Mutation {
    async fn create_sales_order(
        &self,
        ctx: &Context<'_>,
        payload: CreateSalesOrderInput,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    async fn update_sales_order_order_number(
        &self,
        ctx: &Context<'_>,
        order_number: String,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    async fn update_sales_order_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    async fn update_sales_order_opportunity_id(
        &self,
        ctx: &Context<'_>,
        opportunity_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    async fn update_sales_order_status(
        &self,
        ctx: &Context<'_>,
        status: SalesOrderStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    async fn update_sales_order_shipping_address(
        &self,
        ctx: &Context<'_>,
        shipping_address: String,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    async fn remove_sales_order(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    // sub item
    async fn add_sales_order_item(
        &self,
        ctx: &Context<'_>,
        payload: CreateSalesOrderItemInput,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    async fn update_sales_order_item_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    async fn update_sales_order_item_quantity_ordered(
        &self,
        ctx: &Context<'_>,
        quantity_ordered: i32,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }

    async fn remove_sales_order_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        todo!()
    }
}
