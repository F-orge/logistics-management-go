use super::sea_orm_active_enums::SyncStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub record_id: Uuid,
    pub record_type: String,
    pub external_system: String,
    pub external_id: Option<String>,
    pub status: Option<SyncStatusEnum>,
    pub error_message: Option<String>,
    pub request_payload: Option<String>,
    pub response_payload: Option<String>,
    pub last_sync_at: Option<DateTime>,
    pub retry_count: Option<i32>,
    pub next_retry_at: Option<DateTime>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
