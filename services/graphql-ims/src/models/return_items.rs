use chrono::{DateTime, Utc};
use uuid::Uuid;

use super::enums::ReturnItemConditionEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub return_id: Uuid,
    pub product_id: Uuid,
    pub quantity_expected: i32,
    pub quantity_received: Option<i32>,
    pub quantity_variance: Option<i32>,
    pub condition: Option<ReturnItemConditionEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
