use async_graphql::{Context, InputObject, Object};
use chrono::{NaiveDate, NaiveDateTime};
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::{package_items, packages};

#[derive(Debug, Clone, InputObject)]
pub struct CreatePackageItemInput {
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity: i32,
    pub lot_number: Option<String>,
    pub serial_numbers: Option<Vec<String>>,
    pub expiry_date: Option<NaiveDate>,
    pub unit_weight: Option<f32>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreatePackageInput {
    pub sales_order_id: Uuid,
    pub package_number: String,
    pub warehouse_id: Uuid,
    pub package_type: Option<String>,
    pub weight: Option<f32>,
    pub length: Option<f32>,
    pub width: Option<f32>,
    pub height: Option<f32>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
    pub service_level: Option<String>,
    pub packed_by_user_id: Option<Uuid>,
    pub packed_at: Option<NaiveDateTime>,
    pub shipped_at: Option<NaiveDateTime>,
    pub is_fragile: Option<bool>,
    pub is_hazmat: Option<bool>,
    pub requires_signature: Option<bool>,
    pub insurance_value: Option<Decimal>,
    pub items: Vec<CreatePackageItemInput>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "WmsPackagesMutation")]
impl Mutation {
    async fn create_package(
        &self,
        ctx: &Context<'_>,
        payload: CreatePackageInput,
    ) -> async_graphql::Result<packages::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, packages::Model>(
            "insert into wms.packages (sales_order_id, package_number, warehouse_id, package_type, weight, length, width, height, tracking_number, carrier, service_level, packed_by_user_id, packed_at, shipped_at, is_fragile, is_hazmat, requires_signature, insurance_value) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) returning *",
        )
        .bind(payload.sales_order_id)
        .bind(payload.package_number)
        .bind(payload.warehouse_id)
        .bind(payload.package_type)
        .bind(payload.weight)
        .bind(payload.length)
        .bind(payload.width)
        .bind(payload.height)
        .bind(payload.tracking_number)
        .bind(payload.carrier)
        .bind(payload.service_level)
        .bind(payload.packed_by_user_id)
        .bind(payload.packed_at)
        .bind(payload.shipped_at)
        .bind(payload.is_fragile)
        .bind(payload.is_hazmat)
        .bind(payload.requires_signature)
        .bind(payload.insurance_value)
        .fetch_one(&mut *trx)
        .await?;

        for item in payload.items {
            sqlx::query(
                "insert into wms.package_items (package_id, product_id, batch_id, quantity, lot_number, serial_numbers, expiry_date, unit_weight) values ($1, $2, $3, $4, $5, $6, $7, $8)",
            )
            .bind(result.id)
            .bind(item.product_id)
            .bind(item.batch_id)
            .bind(item.quantity)
            .bind(item.lot_number)
            .bind(item.serial_numbers)
            .bind(item.expiry_date)
            .bind(item.unit_weight)
            .execute(&mut *trx)
            .await?;
        }

        trx.commit().await?;
        Ok(result)
    }

    async fn update_package_tracking_number(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        tracking_number: String,
    ) -> async_graphql::Result<packages::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, packages::Model>(
            "update wms.packages set tracking_number = $1 where id = $2 returning *",
        )
        .bind(tracking_number)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_package(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.packages where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() >= 1 {
            Ok("Package removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove package"))
        }
    }

    async fn add_package_item(
        &self,
        ctx: &Context<'_>,
        package_id: Uuid,
        payload: CreatePackageItemInput,
    ) -> async_graphql::Result<package_items::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, package_items::Model>(
            "insert into wms.package_items (package_id, product_id, batch_id, quantity, lot_number, serial_numbers, expiry_date, unit_weight) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
        )
        .bind(package_id)
        .bind(payload.product_id)
        .bind(payload.batch_id)
        .bind(payload.quantity)
        .bind(payload.lot_number)
        .bind(payload.serial_numbers)
        .bind(payload.expiry_date)
        .bind(payload.unit_weight)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_package_item_quantity(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        quantity: i32,
    ) -> async_graphql::Result<package_items::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, package_items::Model>(
            "update wms.package_items set quantity = $1 where id = $2 returning *",
        )
        .bind(quantity)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_package_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.package_items where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 1 {
            Ok("Package item removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove package item"))
        }
    }
}
