use crate::entities::_generated::{
    driver_schedules, sea_orm_active_enums::DriverScheduleReasonEnum,
};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertDriverSchedule {
    pub driver_id: Uuid,
    pub start_date: Date,
    pub end_date: Date,
    pub reason: Option<DriverScheduleReasonEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDriverSchedule {
    pub driver_id: Option<Uuid>,
    pub start_date: Option<Date>,
    pub end_date: Option<Date>,
    pub reason: Option<Option<DriverScheduleReasonEnum>>,
}

impl IntoActiveModel<driver_schedules::ActiveModel> for InsertDriverSchedule {
    fn into_active_model(self) -> driver_schedules::ActiveModel {
        let mut active_model = driver_schedules::ActiveModel::new();
        active_model.driver_id = Set(self.driver_id);
        active_model.start_date = Set(self.start_date);
        active_model.end_date = Set(self.end_date);
        active_model.reason = Set(self.reason);
        active_model
    }
}

impl IntoActiveModel<driver_schedules::ActiveModel> for UpdateDriverSchedule {
    fn into_active_model(self) -> driver_schedules::ActiveModel {
        let mut active_model = driver_schedules::ActiveModel::new();
        active_model.driver_id = self.driver_id.map(Set).unwrap_or(NotSet);
        active_model.start_date = self.start_date.map(Set).unwrap_or(NotSet);
        active_model.end_date = self.end_date.map(Set).unwrap_or(NotSet);
        active_model.reason = self.reason.map(Set).unwrap_or(NotSet);
        active_model
    }
}
