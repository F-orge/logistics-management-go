use async_graphql::SimpleObject;
use chrono::{DateTime, Utc};
use uuid::Uuid;

use super::enums::RecordType;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub file_name: String,
    pub file_path: String,
    pub mime_type: Option<String>,
    pub record_id: Option<Uuid>,
    pub record_type: Option<RecordType>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
