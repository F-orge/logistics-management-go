use chrono::{DateTime, Utc};
use uuid::Uuid;

use super::enums::ReturnStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub return_number: String,
    pub sales_order_id: Option<Uuid>,
    pub client_id: Uuid,
    pub status: Option<ReturnStatusEnum>,
    pub reason: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
