// Create/Update structs for lms_addresses

use crate::entities::_generated::lms_addresses::*;
use crate::entities::_generated::sea_orm_active_enums::LmsAddressType;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateAddress {
    pub address_line1: String,
    pub address_line2: Option<String>,
    pub city: String,
    pub state: String,
    pub postal_code: String,
    pub country: String,
    pub address_type: LmsAddressType,
    pub is_validated: bool,
    pub latitude: Option<Decimal>,
    pub longitude: Option<Decimal>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateAddress {
    pub id: Uuid,
    pub address_line1: Option<String>,
    pub address_line2: Option<Option<String>>,
    pub city: Option<String>,
    pub state: Option<String>,
    pub postal_code: Option<String>,
    pub country: Option<String>,
    pub address_type: Option<LmsAddressType>,
    pub is_validated: Option<bool>,
    pub latitude: Option<Option<Decimal>>,
    pub longitude: Option<Option<Decimal>>,
}

impl IntoActiveModel<ActiveModel> for CreateAddress {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.address_line1 = Set(self.address_line1);
        active_model.address_line2 = Set(self.address_line2);
        active_model.city = Set(self.city);
        active_model.state = Set(self.state);
        active_model.postal_code = Set(self.postal_code);
        active_model.country = Set(self.country);
        active_model.address_type = Set(self.address_type);
        active_model.is_validated = Set(self.is_validated);
        active_model.latitude = Set(self.latitude);
        active_model.longitude = Set(self.longitude);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateAddress {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(address_line1) = self.address_line1 {
            active_model.address_line1 = Set(address_line1);
        }
        if let Some(address_line2) = self.address_line2 {
            active_model.address_line2 = Set(address_line2);
        }
        if let Some(city) = self.city {
            active_model.city = Set(city);
        }
        if let Some(state) = self.state {
            active_model.state = Set(state);
        }
        if let Some(postal_code) = self.postal_code {
            active_model.postal_code = Set(postal_code);
        }
        if let Some(country) = self.country {
            active_model.country = Set(country);
        }
        if let Some(address_type) = self.address_type {
            active_model.address_type = Set(address_type);
        }
        if let Some(is_validated) = self.is_validated {
            active_model.is_validated = Set(is_validated);
        }
        if let Some(latitude) = self.latitude {
            active_model.latitude = Set(latitude);
        }
        if let Some(longitude) = self.longitude {
            active_model.longitude = Set(longitude);
        }
        active_model
    }
}
