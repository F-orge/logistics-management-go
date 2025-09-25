use async_graphql::{Context, InputObject, Object};
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::enums::ProductType;
use crate::models::products;

#[derive(Debug, Clone, InputObject)]
pub struct CreateProductInput {
    pub name: String,
    pub sku: Option<String>,
    pub price: Decimal,
    pub r#type: Option<ProductType>,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "CrmProductsMutations")]
impl Mutation {
    async fn create_product(
        &self,
        ctx: &Context<'_>,
        payload: CreateProductInput,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, products::Model>(
            "insert into crm.products (name, sku, price, type, description) values ($1,$2,$3,$4,$5) returning *"
        )
        .bind(payload.name)
        .bind(payload.sku)
        .bind(payload.price)
        .bind(payload.r#type)
        .bind(payload.description)
        .fetch_one(db)
        .await?)
    }
    async fn update_product_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, products::Model>(
            "update crm.products set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_product_sku(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        sku: Option<String>,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, products::Model>(
            "update crm.products set sku = $1 where id = $2 returning *",
        )
        .bind(sku)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_product_price(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        price: Decimal,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, products::Model>(
            "update crm.products set price = $1 where id = $2 returning *",
        )
        .bind(price)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_product_type(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        r#type: Option<ProductType>,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, products::Model>(
            "update crm.products set type = $1 where id = $2 returning *",
        )
        .bind(r#type)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_product_description(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        description: Option<String>,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, products::Model>(
            "update crm.products set description = $1 where id = $2 returning *",
        )
        .bind(description)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn remove_product(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from crm.products where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete product"));
        }
        Ok("Product removed successfully".into())
    }
}
