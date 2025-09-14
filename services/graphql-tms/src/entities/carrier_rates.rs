use crate::entities::_generated::{carrier_rates, sea_orm_active_enums::CarrierRateUnitEnum};
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertCarrierRate {
    pub carrier_id: Uuid,
    pub service_type: Option<String>,
    pub origin: Option<String>,
    pub destination: Option<String>,
    pub rate: Decimal,
    pub unit: Option<CarrierRateUnitEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCarrierRate {
    pub carrier_id: Option<Uuid>,
    pub service_type: Option<Option<String>>,
    pub origin: Option<Option<String>>,
    pub destination: Option<Option<String>>,
    pub rate: Option<Decimal>,
    pub unit: Option<Option<CarrierRateUnitEnum>>,
}

impl IntoActiveModel<carrier_rates::ActiveModel> for InsertCarrierRate {
    fn into_active_model(self) -> carrier_rates::ActiveModel {
        let mut active_model = carrier_rates::ActiveModel::new();
        active_model.carrier_id = Set(self.carrier_id);
        active_model.service_type = Set(self.service_type);
        active_model.origin = Set(self.origin);
        active_model.destination = Set(self.destination);
        active_model.rate = Set(self.rate);
        active_model.unit = Set(self.unit);
        active_model
    }
}

impl IntoActiveModel<carrier_rates::ActiveModel> for UpdateCarrierRate {
    fn into_active_model(self) -> carrier_rates::ActiveModel {
        let mut active_model = carrier_rates::ActiveModel::new();
        active_model.carrier_id = self.carrier_id.map(Set).unwrap_or(NotSet);
        active_model.service_type = self.service_type.map(Set).unwrap_or(NotSet);
        active_model.origin = self.origin.map(Set).unwrap_or(NotSet);
        active_model.destination = self.destination.map(Set).unwrap_or(NotSet);
        active_model.rate = self.rate.map(Set).unwrap_or(NotSet);
        active_model.unit = self.unit.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl carrier_rates::Model {

}
