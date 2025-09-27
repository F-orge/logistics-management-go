use chrono::{DateTime, Utc};
use uuid::Uuid;

use super::enums::InventoryAdjustmentReasonEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub product_id: Uuid,
    pub warehouse_id: Uuid,
    pub user_id: Uuid,
    pub quantity_change: i32,
    pub reason: Option<InventoryAdjustmentReasonEnum>,
    pub notes: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
