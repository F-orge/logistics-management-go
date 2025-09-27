use chrono::{DateTime, Utc};
use uuid::Uuid;

use super::enums::OutboundShipmentStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub sales_order_id: Uuid,
    pub warehouse_id: Uuid,
    pub status: Option<OutboundShipmentStatusEnum>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
