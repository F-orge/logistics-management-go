use crate::entities::_generated::disputes;
use crate::entities::_generated::sea_orm_active_enums::DisputeStatusEnum;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertDispute {
    pub line_item_id: Uuid,
    pub client_id: Uuid,
    pub reason: String,
    pub status: Option<DisputeStatusEnum>,
    pub disputed_amount: Option<Decimal>,
    pub resolution_notes: Option<String>,
    pub submitted_at: Option<sea_orm::prelude::DateTime>,
    pub resolved_at: Option<sea_orm::prelude::DateTime>,
    pub resolved_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDispute {
    pub line_item_id: Option<Uuid>,
    pub client_id: Option<Uuid>,
    pub reason: Option<String>,
    pub status: Option<Option<DisputeStatusEnum>>,
    pub disputed_amount: Option<Option<Decimal>>,
    pub resolution_notes: Option<Option<String>>,
    pub submitted_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub resolved_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub resolved_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<disputes::ActiveModel> for InsertDispute {
    fn into_active_model(self) -> disputes::ActiveModel {
        let mut active_model = disputes::ActiveModel::new();
        active_model.line_item_id = Set(self.line_item_id);
        active_model.client_id = Set(self.client_id);
        active_model.reason = Set(self.reason);
        active_model.status = Set(self.status);
        active_model.disputed_amount = Set(self.disputed_amount);
        active_model.resolution_notes = Set(self.resolution_notes);
        active_model.submitted_at = Set(self.submitted_at);
        active_model.resolved_at = Set(self.resolved_at);
        active_model.resolved_by_user_id = Set(self.resolved_by_user_id);
        active_model
    }
}

impl IntoActiveModel<disputes::ActiveModel> for UpdateDispute {
    fn into_active_model(self) -> disputes::ActiveModel {
        let mut active_model = disputes::ActiveModel::new();
        active_model.line_item_id = self.line_item_id.map(Set).unwrap_or(NotSet);
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.reason = self.reason.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.disputed_amount = self.disputed_amount.map(Set).unwrap_or(NotSet);
        active_model.resolution_notes = self.resolution_notes.map(Set).unwrap_or(NotSet);
        active_model.submitted_at = self.submitted_at.map(Set).unwrap_or(NotSet);
        active_model.resolved_at = self.resolved_at.map(Set).unwrap_or(NotSet);
        active_model.resolved_by_user_id = self.resolved_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl disputes::Model {

}
