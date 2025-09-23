use crate::entities::_generated::{carrier_rates, sea_orm_active_enums::CarrierRateUnitEnum};
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::decimal::PositiveDecimal;
use fake::faker::lorem::raw::Word;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertCarrierRate {
    pub carrier_id: Uuid,
    #[dummy(faker = "Word(EN)")]
    pub service_type: Option<String>,
    #[dummy(faker = "Word(EN)")]
    pub origin: Option<String>,
    #[dummy(faker = "Word(EN)")]
    pub destination: Option<String>,
    #[dummy(faker = "PositiveDecimal")]
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

use crate::entities::_generated::carriers;
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl carrier_rates::Model {
    async fn carrier(&self, ctx: &Context<'_>) -> async_graphql::Result<carriers::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = carriers::Entity::find_by_id(self.carrier_id)
            .one(db)
            .await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Carrier not found")),
        }
    }
}
