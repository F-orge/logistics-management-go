// Create/Update structs for lms_pricing_rates

use crate::entities::_generated::lms_pricing_rates::*;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreatePricingRate {
    pub service_id: Uuid,
    pub origin_zone_id: Uuid,
    pub destination_zone_id: Uuid,
    pub weight_min: Decimal,
    pub weight_max: Decimal,
    pub base_rate: Decimal,
    pub per_kg_rate: Decimal,
    pub fuel_surcharge_rate: Option<Decimal>,
    pub effective_date: Date,
    pub expiry_date: Option<Date>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePricingRate {
    pub id: Uuid,
    pub service_id: Option<Uuid>,
    pub origin_zone_id: Option<Uuid>,
    pub destination_zone_id: Option<Uuid>,
    pub weight_min: Option<Decimal>,
    pub weight_max: Option<Decimal>,
    pub base_rate: Option<Decimal>,
    pub per_kg_rate: Option<Decimal>,
    pub fuel_surcharge_rate: Option<Option<Decimal>>,
    pub effective_date: Option<Date>,
    pub expiry_date: Option<Option<Date>>,
}

impl IntoActiveModel<ActiveModel> for CreatePricingRate {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.service_id = Set(self.service_id);
        active_model.origin_zone_id = Set(self.origin_zone_id);
        active_model.destination_zone_id = Set(self.destination_zone_id);
        active_model.weight_min = Set(self.weight_min);
        active_model.weight_max = Set(self.weight_max);
        active_model.base_rate = Set(self.base_rate);
        active_model.per_kg_rate = Set(self.per_kg_rate);
        active_model.fuel_surcharge_rate = Set(self.fuel_surcharge_rate);
        active_model.effective_date = Set(self.effective_date);
        active_model.expiry_date = Set(self.expiry_date);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdatePricingRate {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(service_id) = self.service_id {
            active_model.service_id = Set(service_id);
        }
        if let Some(origin_zone_id) = self.origin_zone_id {
            active_model.origin_zone_id = Set(origin_zone_id);
        }
        if let Some(destination_zone_id) = self.destination_zone_id {
            active_model.destination_zone_id = Set(destination_zone_id);
        }
        if let Some(weight_min) = self.weight_min {
            active_model.weight_min = Set(weight_min);
        }
        if let Some(weight_max) = self.weight_max {
            active_model.weight_max = Set(weight_max);
        }
        if let Some(base_rate) = self.base_rate {
            active_model.base_rate = Set(base_rate);
        }
        if let Some(per_kg_rate) = self.per_kg_rate {
            active_model.per_kg_rate = Set(per_kg_rate);
        }
        if let Some(fuel_surcharge_rate) = self.fuel_surcharge_rate {
            active_model.fuel_surcharge_rate = Set(fuel_surcharge_rate);
        }
        if let Some(effective_date) = self.effective_date {
            active_model.effective_date = Set(effective_date);
        }
        if let Some(expiry_date) = self.expiry_date {
            active_model.expiry_date = Set(expiry_date);
        }
        active_model
    }
}
