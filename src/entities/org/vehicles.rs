use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

use crate::entities::_generated::org_vehicles::*;
use crate::entities::_generated::sea_orm_active_enums::{OrgVehicleStatus, OrgVehicleType};

#[derive(Debug, Clone, InputObject)]
pub struct CreateVehicle {
    pub vehicle_number: String,
    pub license_plate: String,
    pub vehicle_type: OrgVehicleType,
    pub make: String,
    pub model: String,
    pub year: i32,
    pub capacity_weight: Option<Decimal>,
    pub capacity_volume: Option<Decimal>,
    pub department_id: Option<Uuid>,
    pub warehouse_id: Option<Uuid>,
    pub status: OrgVehicleStatus,
}

impl IntoActiveModel<ActiveModel> for CreateVehicle {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.vehicle_number = Set(self.vehicle_number);
        active_model.license_plate = Set(self.license_plate);
        active_model.vehicle_type = Set(self.vehicle_type);
        active_model.make = Set(self.make);
        active_model.model = Set(self.model);
        active_model.year = Set(self.year);
        active_model.capacity_weight = Set(self.capacity_weight);
        active_model.capacity_volume = Set(self.capacity_volume);
        active_model.department_id = Set(self.department_id);
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.status = Set(self.status);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateVehicle {
    pub id: Uuid,
    pub vehicle_number: Option<String>,
    pub license_plate: Option<String>,
    pub vehicle_type: Option<OrgVehicleType>,
    pub make: Option<String>,
    pub model: Option<String>,
    pub year: Option<i32>,
    pub capacity_weight: Option<Option<Decimal>>,
    pub capacity_volume: Option<Option<Decimal>>,
    pub department_id: Option<Option<Uuid>>,
    pub warehouse_id: Option<Option<Uuid>>,
    pub status: Option<OrgVehicleStatus>,
}

impl IntoActiveModel<ActiveModel> for UpdateVehicle {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(vehicle_number) = self.vehicle_number {
            active_model.vehicle_number = Set(vehicle_number);
        }
        if let Some(license_plate) = self.license_plate {
            active_model.license_plate = Set(license_plate);
        }
        if let Some(vehicle_type) = self.vehicle_type {
            active_model.vehicle_type = Set(vehicle_type);
        }
        if let Some(make) = self.make {
            active_model.make = Set(make);
        }
        if let Some(model) = self.model {
            active_model.model = Set(model);
        }
        if let Some(year) = self.year {
            active_model.year = Set(year);
        }
        if let Some(capacity_weight) = self.capacity_weight {
            active_model.capacity_weight = Set(capacity_weight);
        }
        if let Some(capacity_volume) = self.capacity_volume {
            active_model.capacity_volume = Set(capacity_volume);
        }
        if let Some(department_id) = self.department_id {
            active_model.department_id = Set(department_id);
        }
        if let Some(warehouse_id) = self.warehouse_id {
            active_model.warehouse_id = Set(warehouse_id);
        }
        if let Some(status) = self.status {
            active_model.status = Set(status);
        }

        active_model
    }
}
