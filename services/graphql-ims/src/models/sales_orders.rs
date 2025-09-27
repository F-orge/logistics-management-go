use chrono::{DateTime, Utc};
use uuid::Uuid;

use super::enums::SalesOrderStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub order_number: String,
    pub client_id: Uuid,
    pub crm_opportunity_id: Option<Uuid>,
    pub status: Option<SalesOrderStatusEnum>,
    pub shipping_address: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
