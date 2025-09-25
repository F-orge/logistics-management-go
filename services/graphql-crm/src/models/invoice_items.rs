use async_graphql::{ComplexObject, Context, SimpleObject};
use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::products;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub invoice_id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    pub quantity: i32,
    pub price: Decimal,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    #[graphql(skip)]
    async fn invoice(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }
    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        todo!()
    }
}
