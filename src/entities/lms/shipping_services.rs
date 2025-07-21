// Create/Update structs for lms_shipping_services

use crate::entities::_generated::lms_shipping_services::*;
use crate::entities::_generated::sea_orm_active_enums::LmsServiceType;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateShippingService {
    pub name: String,
    pub description: Option<String>,
    pub service_type: LmsServiceType,
    pub max_weight: Option<Decimal>,
    pub delivery_time_min: Option<i32>,
    pub delivery_time_max: Option<i32>,
    pub is_active: bool,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateShippingService {
    pub id: Uuid,
    pub name: Option<String>,
    pub description: Option<Option<String>>,
    pub service_type: Option<LmsServiceType>,
    pub max_weight: Option<Option<Decimal>>,
    pub delivery_time_min: Option<Option<i32>>,
    pub delivery_time_max: Option<Option<i32>>,
    pub is_active: Option<bool>,
}

impl IntoActiveModel<ActiveModel> for CreateShippingService {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.description = Set(self.description);
        active_model.service_type = Set(self.service_type);
        active_model.max_weight = Set(self.max_weight);
        active_model.delivery_time_min = Set(self.delivery_time_min);
        active_model.delivery_time_max = Set(self.delivery_time_max);
        active_model.is_active = Set(self.is_active);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateShippingService {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(name) = self.name {
            active_model.name = Set(name);
        }
        if let Some(description) = self.description {
            active_model.description = Set(description);
        }
        if let Some(service_type) = self.service_type {
            active_model.service_type = Set(service_type);
        }
        if let Some(max_weight) = self.max_weight {
            active_model.max_weight = Set(max_weight);
        }
        if let Some(delivery_time_min) = self.delivery_time_min {
            active_model.delivery_time_min = Set(delivery_time_min);
        }
        if let Some(delivery_time_max) = self.delivery_time_max {
            active_model.delivery_time_max = Set(delivery_time_max);
        }
        if let Some(is_active) = self.is_active {
            active_model.is_active = Set(is_active);
        }
        active_model
    }
}
