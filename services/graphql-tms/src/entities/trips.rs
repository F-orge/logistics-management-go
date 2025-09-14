use crate::entities::_generated::{sea_orm_active_enums::TripStatusEnum, trips};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertTrip {
    pub driver_id: Option<Uuid>,
    pub vehicle_id: Option<Uuid>,
    pub status: Option<TripStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTrip {
    pub driver_id: Option<Option<Uuid>>,
    pub vehicle_id: Option<Option<Uuid>>,
    pub status: Option<Option<TripStatusEnum>>,
}

impl IntoActiveModel<trips::ActiveModel> for InsertTrip {
    fn into_active_model(self) -> trips::ActiveModel {
        let mut active_model = trips::ActiveModel::new();
        active_model.driver_id = Set(self.driver_id);
        active_model.vehicle_id = Set(self.vehicle_id);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<trips::ActiveModel> for UpdateTrip {
    fn into_active_model(self) -> trips::ActiveModel {
        let mut active_model = trips::ActiveModel::new();
        active_model.driver_id = self.driver_id.map(Set).unwrap_or(NotSet);
        active_model.vehicle_id = self.vehicle_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl trips::Model {

}
