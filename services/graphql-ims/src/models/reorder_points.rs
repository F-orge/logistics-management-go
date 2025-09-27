use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub product_id: Uuid,
    pub warehouse_id: Uuid,
    pub threshold: i32,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
