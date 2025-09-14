use crate::entities::_generated::{sea_orm_active_enums::VehicleStatusEnum, vehicles};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertVehicle {
    pub registration_number: String,
    pub model: Option<String>,
    pub capacity_volume: Option<f32>,
    pub capacity_weight: Option<f32>,
    pub status: Option<VehicleStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateVehicle {
    pub registration_number: Option<String>,
    pub model: Option<Option<String>>,
    pub capacity_volume: Option<Option<f32>>,
    pub capacity_weight: Option<Option<f32>>,
    pub status: Option<Option<VehicleStatusEnum>>,
}

impl IntoActiveModel<vehicles::ActiveModel> for InsertVehicle {
    fn into_active_model(self) -> vehicles::ActiveModel {
        let mut active_model = vehicles::ActiveModel::new();
        active_model.registration_number = Set(self.registration_number);
        active_model.model = Set(self.model);
        active_model.capacity_volume = Set(self.capacity_volume);
        active_model.capacity_weight = Set(self.capacity_weight);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<vehicles::ActiveModel> for UpdateVehicle {
    fn into_active_model(self) -> vehicles::ActiveModel {
        let mut active_model = vehicles::ActiveModel::new();
        active_model.registration_number = self.registration_number.map(Set).unwrap_or(NotSet);
        active_model.model = self.model.map(Set).unwrap_or(NotSet);
        active_model.capacity_volume = self.capacity_volume.map(Set).unwrap_or(NotSet);
        active_model.capacity_weight = self.capacity_weight.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}
