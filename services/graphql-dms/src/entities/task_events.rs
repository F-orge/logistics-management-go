use crate::entities::_generated::sea_orm_active_enums::TaskEventStatusEnum;
use crate::entities::_generated::task_events;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertTaskEvent {
    pub delivery_task_id: Uuid,
    pub status: TaskEventStatusEnum,
    pub reason: Option<String>,
    pub notes: Option<String>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub timestamp: Option<sea_orm::prelude::DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTaskEvent {
    pub delivery_task_id: Option<Uuid>,
    pub status: Option<TaskEventStatusEnum>,
    pub reason: Option<Option<String>>,
    pub notes: Option<Option<String>>,
    pub latitude: Option<Option<f32>>,
    pub longitude: Option<Option<f32>>,
    pub timestamp: Option<Option<sea_orm::prelude::DateTime>>,
}

impl IntoActiveModel<task_events::ActiveModel> for InsertTaskEvent {
    fn into_active_model(self) -> task_events::ActiveModel {
        let mut active_model = task_events::ActiveModel::new();
        active_model.delivery_task_id = Set(self.delivery_task_id);
        active_model.status = Set(self.status);
        active_model.reason = Set(self.reason);
        active_model.notes = Set(self.notes);
        active_model.latitude = Set(self.latitude);
        active_model.longitude = Set(self.longitude);
        active_model.timestamp = Set(self.timestamp);
        active_model
    }
}

impl IntoActiveModel<task_events::ActiveModel> for UpdateTaskEvent {
    fn into_active_model(self) -> task_events::ActiveModel {
        let mut active_model = task_events::ActiveModel::new();
        active_model.delivery_task_id = self.delivery_task_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.reason = self.reason.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model.latitude = self.latitude.map(Set).unwrap_or(NotSet);
        active_model.longitude = self.longitude.map(Set).unwrap_or(NotSet);
        active_model.timestamp = self.timestamp.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl task_events::Model {

}
