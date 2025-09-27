use chrono::{DateTime, NaiveDate, Utc};
use uuid::Uuid;

use super::enums::InboundShipmentStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub client_id: Option<Uuid>,
    pub warehouse_id: Uuid,
    pub status: Option<InboundShipmentStatusEnum>,
    pub expected_arrival_date: Option<NaiveDate>,
    pub actual_arrival_date: Option<NaiveDate>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
