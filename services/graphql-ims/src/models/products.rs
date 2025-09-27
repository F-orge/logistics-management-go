use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use uuid::Uuid;

use super::enums::ProductStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
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
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
