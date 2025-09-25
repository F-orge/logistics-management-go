use async_graphql::SimpleObject;
use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use uuid::Uuid;

use super::enums::ProductType;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub sku: Option<String>,
    pub price: Decimal,
    pub r#type: Option<ProductType>,
    pub description: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
