// Create/Update structs for lms_pricing_zones

use crate::entities::_generated::lms_pricing_zones::*;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreatePricingZone {
    pub name: String,
    pub zone_code: String,
    pub countries: Json,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePricingZone {
    pub id: Uuid,
    pub name: Option<String>,
    pub zone_code: Option<String>,
}

impl IntoActiveModel<ActiveModel> for CreatePricingZone {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.zone_code = Set(self.zone_code);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdatePricingZone {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(name) = self.name {
            active_model.name = Set(name);
        }
        if let Some(zone_code) = self.zone_code {
            active_model.zone_code = Set(zone_code);
        }
        active_model
    }
}
