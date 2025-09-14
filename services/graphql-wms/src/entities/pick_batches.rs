use crate::entities::_generated::pick_batches;
use crate::entities::_generated::sea_orm_active_enums::{PickBatchStatusEnum, PickStrategyEnum};
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertPickBatch {
    pub batch_number: String,
    pub warehouse_id: Uuid,
    pub status: Option<PickBatchStatusEnum>,
    pub strategy: PickStrategyEnum,
    pub priority: Option<i32>,
    pub assigned_user_id: Option<Uuid>,
    pub wave_id: Option<String>,
    pub zone_restrictions: Option<Vec<String>>,
    pub estimated_duration: Option<i32>,
    pub actual_duration: Option<i32>,
    pub total_items: Option<i32>,
    pub completed_items: Option<i32>,
    pub started_at: Option<sea_orm::prelude::DateTime>,
    pub completed_at: Option<sea_orm::prelude::DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePickBatch {
    pub batch_number: Option<String>,
    pub warehouse_id: Option<Uuid>,
    pub status: Option<Option<PickBatchStatusEnum>>,
    pub strategy: Option<PickStrategyEnum>,
    pub priority: Option<Option<i32>>,
    pub assigned_user_id: Option<Option<Uuid>>,
    pub wave_id: Option<Option<String>>,
    pub zone_restrictions: Option<Option<Vec<String>>>,
    pub estimated_duration: Option<Option<i32>>,
    pub actual_duration: Option<Option<i32>>,
    pub total_items: Option<Option<i32>>,
    pub completed_items: Option<Option<i32>>,
    pub started_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub completed_at: Option<Option<sea_orm::prelude::DateTime>>,
}

impl IntoActiveModel<pick_batches::ActiveModel> for InsertPickBatch {
    fn into_active_model(self) -> pick_batches::ActiveModel {
        let mut active_model = pick_batches::ActiveModel::new();
        active_model.batch_number = Set(self.batch_number);
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.status = Set(self.status);
        active_model.strategy = Set(self.strategy);
        active_model.priority = Set(self.priority);
        active_model.assigned_user_id = Set(self.assigned_user_id);
        active_model.wave_id = Set(self.wave_id);
        active_model.zone_restrictions = Set(self.zone_restrictions);
        active_model.estimated_duration = Set(self.estimated_duration);
        active_model.actual_duration = Set(self.actual_duration);
        active_model.total_items = Set(self.total_items);
        active_model.completed_items = Set(self.completed_items);
        active_model.started_at = Set(self.started_at);
        active_model.completed_at = Set(self.completed_at);
        active_model
    }
}

impl IntoActiveModel<pick_batches::ActiveModel> for UpdatePickBatch {
    fn into_active_model(self) -> pick_batches::ActiveModel {
        let mut active_model = pick_batches::ActiveModel::new();
        active_model.batch_number = self.batch_number.map(Set).unwrap_or(NotSet);
        active_model.warehouse_id = self.warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.strategy = self.strategy.map(Set).unwrap_or(NotSet);
        active_model.priority = self.priority.map(Set).unwrap_or(NotSet);
        active_model.assigned_user_id = self.assigned_user_id.map(Set).unwrap_or(NotSet);
        active_model.wave_id = self.wave_id.map(Set).unwrap_or(NotSet);
        active_model.zone_restrictions = self.zone_restrictions.map(Set).unwrap_or(NotSet);
        active_model.estimated_duration = self.estimated_duration.map(Set).unwrap_or(NotSet);
        active_model.actual_duration = self.actual_duration.map(Set).unwrap_or(NotSet);
        active_model.total_items = self.total_items.map(Set).unwrap_or(NotSet);
        active_model.completed_items = self.completed_items.map(Set).unwrap_or(NotSet);
        active_model.started_at = self.started_at.map(Set).unwrap_or(NotSet);
        active_model.completed_at = self.completed_at.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl pick_batches::Model {

}
