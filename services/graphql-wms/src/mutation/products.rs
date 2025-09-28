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
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, products::Model>(
            "insert into ims.products (name, sku, barcode, description, cost_price, length, width, height, volume, weight, status, supplier_id, client_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning *",
        )
        .bind(payload.name)
        .bind(payload.sku)
        .bind(payload.barcode)
        .bind(payload.description)
        .bind(payload.cost_price)
        .bind(payload.length)
        .bind(payload.width)
        .bind(payload.height)
        .bind(payload.volume)
        .bind(payload.weight)
        .bind(payload.status)
        .bind(payload.supplier_id)
        .bind(payload.client_id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_product_name(
        &self,
        ctx: &Context<'_>,
        name: String,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_sku(
        &self,
        ctx: &Context<'_>,
        sku: String,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set sku = $1 where id = $2 returning *",
        )
        .bind(sku)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_barcode(
        &self,
        ctx: &Context<'_>,
        barcode: String,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set barcode = $1 where id = $2 returning *",
        )
        .bind(barcode)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_description(
        &self,
        ctx: &Context<'_>,
        description: String,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set description = $1 where id = $2 returning *",
        )
        .bind(description)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_cost_price(
        &self,
        ctx: &Context<'_>,
        cost_price: Decimal,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set cost_price = $1 where id = $2 returning *",
        )
        .bind(cost_price)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_length(
        &self,
        ctx: &Context<'_>,
        length: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set length = $1 where id = $2 returning *",
        )
        .bind(length)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_width(
        &self,
        ctx: &Context<'_>,
        width: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set width = $1 where id = $2 returning *",
        )
        .bind(width)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_height(
        &self,
        ctx: &Context<'_>,
        height: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set height = $1 where id = $2 returning *",
        )
        .bind(height)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_volume(
        &self,
        ctx: &Context<'_>,
        volume: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set volume = $1 where id = $2 returning *",
        )
        .bind(volume)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_weight(
        &self,
        ctx: &Context<'_>,
        weight: f32,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set weight = $1 where id = $2 returning *",
        )
        .bind(weight)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_status(
        &self,
        ctx: &Context<'_>,
        status: ProductStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_supplier_id(
        &self,
        ctx: &Context<'_>,
        supplier_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set supplier_id = $1 where id = $2 returning *",
        )
        .bind(supplier_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn update_product_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, products::Model>(
            "update ims.products set client_id = $1 where id = $2 returning *",
        )
        .bind(client_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        _ = trx.commit().await?;
        Ok(result)
    }

    async fn remove_product(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query("delete from ims.products where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        _ = trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove product"));
        }

        Ok("Product removed successfully".into())
    }
}
