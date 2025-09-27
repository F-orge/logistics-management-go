use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub contact_person: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
