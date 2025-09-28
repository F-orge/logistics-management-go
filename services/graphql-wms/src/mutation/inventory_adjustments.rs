use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::InventoryAdjustmentReasonEnum, inventory_adjustments};

#[derive(Debug, Clone, InputObject)]
pub struct CreateInventoryAdjustment {
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
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_adjustments::Model>(
            "insert into ims.inventory_adjustments (product_id, warehouse_id, user_id, quantity_change, reason, notes) values ($1, $2, $3, $4, $5, $6) returning *"
        )
        .bind(payload.product_id)
        .bind(payload.warehouse_id)
        .bind(payload.user_id)
        .bind(payload.quantity_change)
        .bind(payload.reason)
        .bind(payload.notes)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_adjustments_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_adjustments::Model>(
            "update ims.inventory_adjustments set product_id = $1 where id = $2 returning *",
        )
        .bind(product_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_adjustments_warehouse_id(
        &self,
        ctx: &Context<'_>,
        warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_adjustments::Model>(
            "update ims.inventory_adjustments set warehouse_id = $1 where id = $2 returning *",
        )
        .bind(warehouse_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_adjustments_user_id(
        &self,
        ctx: &Context<'_>,
        user_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_adjustments::Model>(
            "update ims.inventory_adjustments set user_id = $1 where id = $2 returning *",
        )
        .bind(user_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_adjustments_quantity_change(
        &self,
        ctx: &Context<'_>,
        quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_adjustments::Model>(
            "update ims.inventory_adjustments set quantity_change = $1 where id = $2 returning *",
        )
        .bind(quantity)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_adjustments_reason(
        &self,
        ctx: &Context<'_>,
        reason: InventoryAdjustmentReasonEnum,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_adjustments::Model>(
            "update ims.inventory_adjustments set reason = $1 where id = $2 returning *",
        )
        .bind(reason)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_adjustments_notes(
        &self,
        ctx: &Context<'_>,
        notes: String,
        id: Uuid,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_adjustments::Model>(
            "update ims.inventory_adjustments set notes = $1 where id = $2 returning *",
        )
        .bind(notes)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn remove_inventory_adjustments(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query("delete from ims.inventory_adjustments where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to remove inventory adjustment",
            ));
        }

        Ok("Inventory adjustment removed successfully".into())
    }
}
