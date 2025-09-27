use chrono::{DateTime, NaiveDate, Utc};
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub product_id: Uuid,
    pub batch_number: String,
    pub expiration_date: Option<NaiveDate>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
