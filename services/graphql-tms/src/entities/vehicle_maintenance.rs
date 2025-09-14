use crate::entities::_generated::{vehicle_maintenance, sea_orm_active_enums::VehicleServiceTypeEnum};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{ActiveValue::{NotSet, Set}, IntoActiveModel};
use uuid::Uuid;
use rust_decimal::Decimal;

#[derive(Debug, Clone, InputObject)]
pub struct InsertVehicleMaintenance {
    pub vehicle_id: Uuid,
    pub service_date: Date,
    pub service_type: Option<VehicleServiceTypeEnum>,
    pub cost: Option<Decimal>,
    pub notes: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateVehicleMaintenance {
    pub vehicle_id: Option<Uuid>,
    pub service_date: Option<Date>,
    pub service_type: Option<Option<VehicleServiceTypeEnum>>,
    pub cost: Option<Option<Decimal>>,
    pub notes: Option<Option<String>>,
}

impl IntoActiveModel<vehicle_maintenance::ActiveModel> for InsertVehicleMaintenance {
    fn into_active_model(self) -> vehicle_maintenance::ActiveModel {
        let mut active_model = vehicle_maintenance::ActiveModel::new();
        active_model.vehicle_id = Set(self.vehicle_id);
        active_model.service_date = Set(self.service_date);
        active_model.service_type = Set(self.service_type);
        active_model.cost = Set(self.cost);
        active_model.notes = Set(self.notes);
        active_model
    }
}

impl IntoActiveModel<vehicle_maintenance::ActiveModel> for UpdateVehicleMaintenance {
    fn into_active_model(self) -> vehicle_maintenance::ActiveModel {
        let mut active_model = vehicle_maintenance::ActiveModel::new();
        active_model.vehicle_id = self.vehicle_id.map(Set).unwrap_or(NotSet);
        active_model.service_date = self.service_date.map(Set).unwrap_or(NotSet);
        active_model.service_type = self.service_type.map(Set).unwrap_or(NotSet);
        active_model.cost = self.cost.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model
    }
}
