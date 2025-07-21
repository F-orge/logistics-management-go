// Create/Update structs for lms_shipping_service_max_dimensions

use crate::entities::_generated::lms_shipping_service_max_dimensions::*;
use async_graphql::InputObject;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateShippingServiceMaxDimension {
    pub shipping_service_id: Uuid,
    pub length: Option<Decimal>,
    pub width: Option<Decimal>,
    pub height: Option<Decimal>,
}

impl IntoActiveModel<ActiveModel> for CreateShippingServiceMaxDimension {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.shipping_service_id = Set(self.shipping_service_id);
        active_model.length = Set(self.length);
        active_model.width = Set(self.width);
        active_model.height = Set(self.height);
        active_model
    }
}
