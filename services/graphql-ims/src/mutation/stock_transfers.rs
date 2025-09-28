use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::StockTransferStatusEnum, stock_transfers};

#[derive(Debug, Clone, InputObject)]
pub struct CreateStockTransferInput {
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
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, stock_transfers::Model>(
            "insert into ims.stock_transfers (product_id, source_warehouse_id, destination_warehouse_id, quantity, status) values ($1, $2, $3, $4, $5) returning *",
        )
        .bind(payload.product_id)
        .bind(payload.source_warehouse_id)
        .bind(payload.destination_warehouse_id)
        .bind(payload.quantity)
        .bind(payload.status)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_stock_transfer_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, stock_transfers::Model>(
            "update ims.stock_transfers set product_id = $1 where id = $2 returning *",
        )
        .bind(product_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_stock_transfer_source_warehouse_id(
        &self,
        ctx: &Context<'_>,
        source_warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, stock_transfers::Model>(
            "update ims.stock_transfers set source_warehouse_id = $1 where id = $2 returning *",
        )
        .bind(source_warehouse_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_stock_transfer_destination_warehouse_id(
        &self,
        ctx: &Context<'_>,
        destination_warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, stock_transfers::Model>(
            "update ims.stock_transfers set destination_warehouse_id = $1 where id = $2 returning *",
        )
        .bind(destination_warehouse_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_stock_transfer_quantity(
        &self,
        ctx: &Context<'_>,
        quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, stock_transfers::Model>(
            "update ims.stock_transfers set quantity = $1 where id = $2 returning *",
        )
        .bind(quantity)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_stock_transfer_status(
        &self,
        ctx: &Context<'_>,
        status: StockTransferStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<stock_transfers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, stock_transfers::Model>(
            "update ims.stock_transfers set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn remove_stock_transfer(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query("delete from ims.stock_transfers where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;
        trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove stock transfer"));
        }

        Ok("Stock transfer removed successfully".into())
    }
}
