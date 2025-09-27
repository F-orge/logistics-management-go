use chrono::{DateTime, Utc};
use uuid::Uuid;

use super::enums::StockTransferStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub product_id: Uuid,
    pub source_warehouse_id: Uuid,
    pub destination_warehouse_id: Uuid,
    pub quantity: i32,
    pub status: Option<StockTransferStatusEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
