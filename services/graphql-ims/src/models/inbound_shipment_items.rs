use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub inbound_shipment_id: Uuid,
    pub product_id: Uuid,
    pub expected_quantity: i32,
    pub received_quantity: Option<i32>,
    pub discrepancy_quantity: Option<i32>,
    pub discrepancy_notes: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
