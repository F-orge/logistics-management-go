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

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmProductsMutations")]
impl Mutation {
    async fn create_product(
        &self,
        ctx: &Context<'_>,
        payload: CreateProductInput,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }
    async fn update_product_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }
    async fn update_product_sku(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        sku: Option<String>,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }
    async fn update_product_price(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        price: Decimal,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }
    async fn update_product_type(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        r#type: Option<ProductType>,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }
    async fn update_product_description(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        description: Option<String>,
    ) -> async_graphql::Result<products::Model> {
        todo!()
    }
    async fn remove_product(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        todo!()
    }
}
