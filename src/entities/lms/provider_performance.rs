// Create/Update structs for lms_provider_performance

use crate::entities::_generated::lms_provider_performance::*;
use crate::entities::_generated::sea_orm_active_enums::LmsPerformanceMetricType;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateProviderPerformance {
    pub provider_id: Uuid,
    pub shipment_id: Uuid,
    pub transport_leg_id: Option<Uuid>,
    pub metric_type: LmsPerformanceMetricType,
    pub metric_value: Option<Decimal>,
    pub measurement_date: Date,
    pub notes: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateProviderPerformance {
    pub id: Uuid,
    pub provider_id: Option<Uuid>,
    pub shipment_id: Option<Uuid>,
    pub transport_leg_id: Option<Option<Uuid>>,
    pub metric_type: Option<LmsPerformanceMetricType>,
    pub metric_value: Option<Option<Decimal>>,
    pub measurement_date: Option<Date>,
    pub notes: Option<Option<String>>,
}

impl IntoActiveModel<ActiveModel> for CreateProviderPerformance {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.provider_id = Set(self.provider_id);
        active_model.shipment_id = Set(self.shipment_id);
        active_model.transport_leg_id = Set(self.transport_leg_id);
        active_model.metric_type = Set(self.metric_type);
        active_model.metric_value = Set(self.metric_value);
        active_model.measurement_date = Set(self.measurement_date);
        active_model.notes = Set(self.notes);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateProviderPerformance {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(provider_id) = self.provider_id {
            active_model.provider_id = Set(provider_id);
        }
        if let Some(shipment_id) = self.shipment_id {
            active_model.shipment_id = Set(shipment_id);
        }
        if let Some(transport_leg_id) = self.transport_leg_id {
            active_model.transport_leg_id = Set(transport_leg_id);
        }
        if let Some(metric_type) = self.metric_type {
            active_model.metric_type = Set(metric_type);
        }
        if let Some(metric_value) = self.metric_value {
            active_model.metric_value = Set(metric_value);
        }
        if let Some(measurement_date) = self.measurement_date {
            active_model.measurement_date = Set(measurement_date);
        }
        if let Some(notes) = self.notes {
            active_model.notes = Set(notes);
        }
        active_model
    }
}
