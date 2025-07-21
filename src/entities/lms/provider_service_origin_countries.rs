// Create/Update structs for lms_provider_service_origin_countries

use crate::entities::_generated::lms_provider_service_origin_countries::*;
use async_graphql::InputObject;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateProviderServiceOriginCountry {
    pub provider_service_id: Uuid,
    pub country_code: String,
}

impl IntoActiveModel<ActiveModel> for CreateProviderServiceOriginCountry {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.provider_service_id = Set(self.provider_service_id);
        active_model.country_code = Set(self.country_code);
        active_model
    }
}
