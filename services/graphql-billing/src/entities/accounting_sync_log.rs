use crate::entities::_generated::accounting_sync_log;
use crate::entities::_generated::sea_orm_active_enums::SyncStatusEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertAccountingSyncLog {
    pub record_id: Uuid,
    pub record_type: String,
    pub external_system: String,
    pub external_id: Option<String>,
    pub status: Option<SyncStatusEnum>,
    pub error_message: Option<String>,
    pub request_payload: Option<String>,
    pub response_payload: Option<String>,
    pub last_sync_at: Option<sea_orm::prelude::DateTime>,
    pub retry_count: Option<i32>,
    pub next_retry_at: Option<sea_orm::prelude::DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateAccountingSyncLog {
    pub record_id: Option<Uuid>,
    pub record_type: Option<String>,
    pub external_system: Option<String>,
    pub external_id: Option<Option<String>>,
    pub status: Option<Option<SyncStatusEnum>>,
    pub error_message: Option<Option<String>>,
    pub request_payload: Option<Option<String>>,
    pub response_payload: Option<Option<String>>,
    pub last_sync_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub retry_count: Option<Option<i32>>,
    pub next_retry_at: Option<Option<sea_orm::prelude::DateTime>>,
}

impl IntoActiveModel<accounting_sync_log::ActiveModel> for InsertAccountingSyncLog {
    fn into_active_model(self) -> accounting_sync_log::ActiveModel {
        let mut active_model = accounting_sync_log::ActiveModel::new();
        active_model.record_id = Set(self.record_id);
        active_model.record_type = Set(self.record_type);
        active_model.external_system = Set(self.external_system);
        active_model.external_id = Set(self.external_id);
        active_model.status = Set(self.status);
        active_model.error_message = Set(self.error_message);
        active_model.request_payload = Set(self.request_payload);
        active_model.response_payload = Set(self.response_payload);
        active_model.last_sync_at = Set(self.last_sync_at);
        active_model.retry_count = Set(self.retry_count);
        active_model.next_retry_at = Set(self.next_retry_at);
        active_model
    }
}

impl IntoActiveModel<accounting_sync_log::ActiveModel> for UpdateAccountingSyncLog {
    fn into_active_model(self) -> accounting_sync_log::ActiveModel {
        let mut active_model = accounting_sync_log::ActiveModel::new();
        active_model.record_id = self.record_id.map(Set).unwrap_or(NotSet);
        active_model.record_type = self.record_type.map(Set).unwrap_or(NotSet);
        active_model.external_system = self.external_system.map(Set).unwrap_or(NotSet);
        active_model.external_id = self.external_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.error_message = self.error_message.map(Set).unwrap_or(NotSet);
        active_model.request_payload = self.request_payload.map(Set).unwrap_or(NotSet);
        active_model.response_payload = self.response_payload.map(Set).unwrap_or(NotSet);
        active_model.last_sync_at = self.last_sync_at.map(Set).unwrap_or(NotSet);
        active_model.retry_count = self.retry_count.map(Set).unwrap_or(NotSet);
        active_model.next_retry_at = self.next_retry_at.map(Set).unwrap_or(NotSet);
        active_model
    }
}
