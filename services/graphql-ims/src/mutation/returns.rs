use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{
    enums::{ReturnItemConditionEnum, ReturnStatusEnum},
    returns,
};

#[derive(Debug, Clone, InputObject)]
pub struct CreateReturnInput {
    pub return_number: String,
    pub sales_order_id: Option<Uuid>,
    pub client_id: Uuid,
    pub status: Option<ReturnStatusEnum>,
    pub reason: Option<String>,
    pub items: Vec<CreateReturnItemInput>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateReturnItemInput {
    pub product_id: Uuid,
    pub quantity_expected: i32,
    pub quantity_received: Option<i32>,
    pub quantity_variance: Option<i32>,
    pub condition: Option<ReturnItemConditionEnum>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsReturnsMutation")]
impl Mutation {
    async fn create_return(
        &self,
        ctx: &Context<'_>,
        payload: CreateReturnInput,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_number(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_sales_order_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_client_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_reason(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn remove_return(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    // sub item
    async fn add_return_item(
        &self,
        ctx: &Context<'_>,
        payload: CreateReturnItemInput,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_item_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_item_quantity_expected(
        &self,
        ctx: &Context<'_>,
        quantity_expected: i32,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_item_quantity_received(
        &self,
        ctx: &Context<'_>,
        quantity_recieved: i32,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_item_quantity_variance(
        &self,
        ctx: &Context<'_>,
        quantity_variance: i32,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn update_return_item_condition(
        &self,
        ctx: &Context<'_>,
        condition: String,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }

    async fn remove_return_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        todo!()
    }
}
