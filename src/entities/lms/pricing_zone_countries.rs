use crate::entities::_generated::lms_pricing_zone_countries::*;
use async_graphql::InputObject;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreatePricingZoneCountry {
    pub pricing_zone_id: Uuid,
    pub country_code: String,
}

impl IntoActiveModel<ActiveModel> for CreatePricingZoneCountry {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.pricing_zone_id = Set(self.pricing_zone_id);
        active_model.country_code = Set(self.country_code);
        active_model
    }
}
