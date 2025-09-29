use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDateTime;
use uuid::Uuid;

use crate::models::{enums::InventoryStockStatusEnum, inventory_stock};

#[derive(Debug, Clone, InputObject)]
pub struct CreateInventoryStockInput {
    pub location_id: Uuid,
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity: i32,
    pub reserved_quantity: i32,
    pub status: Option<InventoryStockStatusEnum>,
    pub last_counted_at: Option<NaiveDateTime>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "WmsInventoryStockMutation")]
impl Mutation {
    async fn create_inventory_stock(
        &self,
        ctx: &Context<'_>,
        payload: CreateInventoryStockInput,
    ) -> async_graphql::Result<inventory_stock::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_stock::Model>(
            "insert into wms.inventory_stock (location_id, product_id, batch_id, quantity, reserved_quantity, status, last_counted_at) values ($1, $2, $3, $4, $5, $6, $7) returning *",
        )
        .bind(payload.location_id)
        .bind(payload.product_id)
        .bind(payload.batch_id)
        .bind(payload.quantity)
        .bind(payload.reserved_quantity)
        .bind(payload.status)
        .bind(payload.last_counted_at)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_stock_quantity(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        quantity: i32,
    ) -> async_graphql::Result<inventory_stock::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, inventory_stock::Model>(
            "update wms.inventory_stock set quantity = $1 where id = $2 returning *",
        )
        .bind(quantity)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_inventory_stock(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.inventory_stock where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 1 {
            Ok("Inventory stock removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove inventory stock"))
        }
    }
}
