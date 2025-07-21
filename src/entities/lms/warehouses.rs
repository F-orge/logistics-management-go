// Create/Update structs for lms_warehouses

use crate::entities::_generated::lms_warehouses::*;
use crate::entities::_generated::sea_orm_active_enums::LmsWarehouseType;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateWarehouse {
    pub name: String,
    pub code: String,
    pub address_id: Uuid,
    pub warehouse_type: LmsWarehouseType,
    pub capacity: Option<i32>,
    pub department_id: Option<Uuid>,
    pub is_active: bool,
    pub manager_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateWarehouse {
    pub id: Uuid,
    pub name: Option<String>,
    pub code: Option<String>,
    pub address_id: Option<Uuid>,
    pub warehouse_type: Option<LmsWarehouseType>,
    pub capacity: Option<Option<i32>>,
    pub department_id: Option<Option<Uuid>>,
    pub is_active: Option<bool>,
    pub manager_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<ActiveModel> for CreateWarehouse {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.code = Set(self.code);
        active_model.address_id = Set(self.address_id);
        active_model.warehouse_type = Set(self.warehouse_type);
        active_model.capacity = Set(self.capacity);
        active_model.department_id = Set(self.department_id);
        active_model.is_active = Set(self.is_active);
        active_model.manager_id = Set(self.manager_id);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateWarehouse {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(name) = self.name {
            active_model.name = Set(name);
        }
        if let Some(code) = self.code {
            active_model.code = Set(code);
        }
        if let Some(address_id) = self.address_id {
            active_model.address_id = Set(address_id);
        }
        if let Some(warehouse_type) = self.warehouse_type {
            active_model.warehouse_type = Set(warehouse_type);
        }
        if let Some(capacity) = self.capacity {
            active_model.capacity = Set(capacity);
        }
        if let Some(department_id) = self.department_id {
            active_model.department_id = Set(department_id);
        }
        if let Some(is_active) = self.is_active {
            active_model.is_active = Set(is_active);
        }
        if let Some(manager_id) = self.manager_id {
            active_model.manager_id = Set(manager_id);
        }
        active_model
    }
}
