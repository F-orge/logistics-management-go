// Create/Update structs for lms_warehouse_inventories

use crate::entities::_generated::lms_warehouse_inventories::*;
use crate::entities::_generated::sea_orm_active_enums::LmsWarehouseInventoryStatus;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateWarehouseInventory {
    pub warehouse_id: Uuid,
    pub shipment_id: Uuid,
    pub package_id: Uuid,
    pub location_code: Option<String>,
    pub status: LmsWarehouseInventoryStatus,
    pub arrived_at: Option<DateTimeWithTimeZone>,
    pub departed_at: Option<DateTimeWithTimeZone>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateWarehouseInventory {
    pub id: Uuid,
    pub warehouse_id: Option<Uuid>,
    pub shipment_id: Option<Uuid>,
    pub package_id: Option<Uuid>,
    pub location_code: Option<Option<String>>,
    pub status: Option<LmsWarehouseInventoryStatus>,
    pub arrived_at: Option<Option<DateTimeWithTimeZone>>,
    pub departed_at: Option<Option<DateTimeWithTimeZone>>,
}

impl IntoActiveModel<ActiveModel> for CreateWarehouseInventory {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.shipment_id = Set(self.shipment_id);
        active_model.package_id = Set(self.package_id);
        active_model.location_code = Set(self.location_code);
        active_model.status = Set(self.status);
        active_model.arrived_at = Set(self.arrived_at);
        active_model.departed_at = Set(self.departed_at);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateWarehouseInventory {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(warehouse_id) = self.warehouse_id {
            active_model.warehouse_id = Set(warehouse_id);
        }
        if let Some(shipment_id) = self.shipment_id {
            active_model.shipment_id = Set(shipment_id);
        }
        if let Some(package_id) = self.package_id {
            active_model.package_id = Set(package_id);
        }
        if let Some(location_code) = self.location_code {
            active_model.location_code = Set(location_code);
        }
        if let Some(status) = self.status {
            active_model.status = Set(status);
        }
        if let Some(arrived_at) = self.arrived_at {
            active_model.arrived_at = Set(arrived_at);
        }
        if let Some(departed_at) = self.departed_at {
            active_model.departed_at = Set(departed_at);
        }
        active_model
    }
}
