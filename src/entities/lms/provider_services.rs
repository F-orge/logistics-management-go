// Create/Update structs for lms_provider_services

use crate::entities::_generated::lms_provider_services::*;
use crate::entities::_generated::sea_orm_active_enums::{LmsServiceType, LmsTransportMode};
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateProviderService {
    pub provider_id: Uuid,
    pub service_name: String,
    pub service_type: LmsServiceType,
    pub transport_mode: LmsTransportMode,
    pub max_weight: Option<Decimal>,
    pub transit_time_min: Option<i32>,
    pub transit_time_max: Option<i32>,
    pub cutoff_time: Option<Time>,
    pub tracking_available: bool,
    pub insurance_available: bool,
    pub is_active: bool,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateProviderService {
    pub id: Uuid,
    pub provider_id: Option<Uuid>,
    pub service_name: Option<String>,
    pub service_type: Option<LmsServiceType>,
    pub transport_mode: Option<LmsTransportMode>,
    pub max_weight: Option<Option<Decimal>>,
    pub transit_time_min: Option<Option<i32>>,
    pub transit_time_max: Option<Option<i32>>,
    pub cutoff_time: Option<Option<Time>>,
    pub tracking_available: Option<bool>,
    pub insurance_available: Option<bool>,
    pub is_active: Option<bool>,
}

impl IntoActiveModel<ActiveModel> for CreateProviderService {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.provider_id = Set(self.provider_id);
        active_model.service_name = Set(self.service_name);
        active_model.service_type = Set(self.service_type);
        active_model.transport_mode = Set(self.transport_mode);
        active_model.max_weight = Set(self.max_weight);
        active_model.transit_time_min = Set(self.transit_time_min);
        active_model.transit_time_max = Set(self.transit_time_max);
        active_model.cutoff_time = Set(self.cutoff_time);
        active_model.tracking_available = Set(self.tracking_available);
        active_model.insurance_available = Set(self.insurance_available);
        active_model.is_active = Set(self.is_active);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateProviderService {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(provider_id) = self.provider_id {
            active_model.provider_id = Set(provider_id);
        }
        if let Some(service_name) = self.service_name {
            active_model.service_name = Set(service_name);
        }
        if let Some(service_type) = self.service_type {
            active_model.service_type = Set(service_type);
        }
        if let Some(transport_mode) = self.transport_mode {
            active_model.transport_mode = Set(transport_mode);
        }
        if let Some(max_weight) = self.max_weight {
            active_model.max_weight = Set(max_weight);
        }
        if let Some(transit_time_min) = self.transit_time_min {
            active_model.transit_time_min = Set(transit_time_min);
        }
        if let Some(transit_time_max) = self.transit_time_max {
            active_model.transit_time_max = Set(transit_time_max);
        }
        if let Some(cutoff_time) = self.cutoff_time {
            active_model.cutoff_time = Set(cutoff_time);
        }
        if let Some(tracking_available) = self.tracking_available {
            active_model.tracking_available = Set(tracking_available);
        }
        if let Some(insurance_available) = self.insurance_available {
            active_model.insurance_available = Set(insurance_available);
        }
        if let Some(is_active) = self.is_active {
            active_model.is_active = Set(is_active);
        }
        active_model
    }
}
