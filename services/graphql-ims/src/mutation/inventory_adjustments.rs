use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::InventoryAdjustmentReasonEnum, inventory_adjustments};

#[derive(Debug, Clone, InputObject)]
pub struct CreateInventoryAdjustment {
    pub id: Uuid,
    pub product_id: Uuid,
    pub warehouse_id: Uuid,
    pub user_id: Uuid,
    pub quantity_change: i32,
    pub reason: Option<InventoryAdjustmentReasonEnum>,
    pub notes: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsInventoryAdjustmentsMutation")]
impl Mutation {
    async fn create_inventory_adjustments(
        &self,
        ctx: &Context<'_>,
        payload: CreateInventoryAdjustment,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        todo!()
    }

    async fn update_inventory_adjustments_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        todo!()
    }

    async fn update_inventory_adjustments_warehouse_id(
        &self,
        ctx: &Context<'_>,
        warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        todo!()
    }

    async fn update_inventory_adjustments_user_id(
        &self,
        ctx: &Context<'_>,
        user_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        todo!()
    }

    async fn update_inventory_adjustments_quantity_change(
        &self,
        ctx: &Context<'_>,
        quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        todo!()
    }

    async fn update_inventory_adjustments_reason(
        &self,
        ctx: &Context<'_>,
        reason: InventoryAdjustmentReasonEnum,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        todo!()
    }

    async fn update_inventory_adjustments_notes(
        &self,
        ctx: &Context<'_>,
        notes: String,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        todo!()
    }

    async fn remove_inventory_adjustments(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        todo!()
    }
}
